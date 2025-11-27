import json
import os
from typing import TypedDict, List, Optional
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv
from tavily import TavilyClient

# Load environment variables
load_dotenv()

# --- Configuration ---
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

# --- State Definition ---
class AgentState(TypedDict):
    # Input from Monitor Agent
    tweet_id: str
    tweet_text: str
    user: str
    timestamp: str
    metrics: dict
    is_crisis: bool
    image_url: Optional[str] # Added for Cluster Agent
    
    # Internal State for Cluster Agent
    visual_evidence: str
    metadata_check: str
    search_queries: List[str]
    search_results: List[str]
    final_dossier: dict

# --- Tools ---

def vision_analysis(image_url: str):
    """
    Simulates or performs visual analysis using a Vision LLM.
    For this hackathon demo, if no URL is provided, return 'No image'.
    If a URL is provided, we can try to use Groq Vision or a mock.
    """
    if not image_url:
        return "No image attached to the claim."
    
    # Placeholder for actual Vision API call
    # In a real scenario:
    # llm = ChatGroq(model="llama-3.2-90b-vision-preview", api_key=GROQ_API_KEY)
    # response = llm.invoke(...)
    
    return f"Image analysis for {image_url}: [Simulated] Image appears to show a flooded street. Signboard 'Andheri East' visible. Metadata date: 2024."

def tavily_search(queries: List[str]):
    """
    Performs searches for the generated queries using Tavily.
    """
    if not TAVILY_API_KEY:
        return ["Error: TAVILY_API_KEY not found."]
    
    client = TavilyClient(api_key=TAVILY_API_KEY)
    all_results = []
    
    print(f"--- [Cluster Agent] Searching Tavily for {len(queries)} queries... ---")
    
    for query in queries:
        try:
            # Search with context
            response = client.search(query, search_depth="basic", max_results=2)
            results = response.get("results", [])
            for res in results:
                all_results.append(f"Source: {res['title']} ({res['url']})\nContent: {res['content']}")
        except Exception as e:
            print(f"Search Error for '{query}': {e}")
            
    return all_results

# --- Nodes ---

def cluster_node(state: AgentState):
    """
    The main logic for the OSINT Investigator (Cluster Agent).
    Executes the 4-Step Forensic Loop.
    """
    print("\n>>> [Cluster Agent] Activated <<<")
    print(f"Analyzing Claim: {state['tweet_text']}")
    
    # --- Step 1: Visual & Metadata Forensics ---
    image_url = state.get("image_url")
    visual_evidence = vision_analysis(image_url)
    print(f"Step 1 Visual: {visual_evidence}")
    
    # --- Step 2: Strategic Query Generation ---
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0,
        api_key=GROQ_API_KEY
    )
    
    query_gen_prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a Senior OSINT Investigator. Generate 3 distinct search queries to verify this claim."),
        ("human", 
         "Claim: '{text}'\n\n"
         "Generate 3 queries strictly following this format:\n"
         "1. Broad Keyword Variation\n"
         "2. Boolean Verification (Target official sites)\n"
         "3. Linguistic Pattern Check (Exact quotes)\n\n"
         "Return ONLY a JSON list of strings, e.g., [\"query1\", \"query2\", \"query3\"]"
        )
    ])
    
    chain = query_gen_prompt | llm
    try:
        response = chain.invoke({"text": state["tweet_text"]})
        content = response.content.strip()
        # Clean JSON
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        search_queries = json.loads(content)
    except Exception as e:
        print(f"Query Gen Error: {e}")
        # Fallback queries
        search_queries = [
            f"{state['tweet_text']} fact check",
            f"{state['tweet_text']} Mumbai news",
            "Mumbai disaster management official updates"
        ]
        
    print(f"Step 2 Queries: {search_queries}")
    
    # --- Step 3: Source Clustering ---
    search_results = tavily_search(search_queries)
    print(f"Step 3 Results: Found {len(search_results)} snippets.")
    
    # --- Step 4: Evidence Dossier ---
    dossier_prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a Senior OSINT Investigator. Summarize the evidence."),
        ("human", 
         "Claim: '{text}'\n"
         "Visual Evidence: {visual}\n"
         "Search Results: {results}\n\n"
         "Create a JSON Evidence Dossier with fields: 'visual_evidence', 'metadata_check', 'search_cluster' (list of summaries), 'conclusion_hint'.\n"
         "Return ONLY JSON."
        )
    ])
    
    dossier_chain = dossier_prompt | llm
    try:
        results_text = "\n".join(search_results[:5]) # Limit context
        response = dossier_chain.invoke({
            "text": state["tweet_text"], 
            "visual": visual_evidence,
            "results": results_text
        })
        content = response.content.strip()
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        final_dossier = json.loads(content)
    except Exception as e:
        print(f"Dossier Gen Error: {e}")
        final_dossier = {"error": "Failed to generate dossier"}

    print(f"Step 4 Dossier: {json.dumps(final_dossier, indent=2)}")
    
    return {
        "visual_evidence": visual_evidence,
        "search_queries": search_queries,
        "search_results": search_results,
        "final_dossier": final_dossier
    }

# --- Graph Construction ---

workflow = StateGraph(AgentState)
workflow.add_node("cluster_node", cluster_node)
workflow.set_entry_point("cluster_node")
workflow.add_edge("cluster_node", END)

cluster_agent_app = workflow.compile()

# --- Execution Helper ---
if __name__ == "__main__":
    # Test with a sample crisis tweet
    sample_state = {
        "tweet_id": "123",
        "tweet_text": "BREAKING: Dam burst in North Mumbai! Run for your lives! #DamBurst",
        "user": "@rohit_cricket",
        "timestamp": "5m ago",
        "metrics": {"likes": 1000, "retweets": 500},
        "is_crisis": True,
        "image_url": None
    }
    
    print("Running Cluster Agent Test...")
    cluster_agent_app.invoke(sample_state)
