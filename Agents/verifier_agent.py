import json
import os
from datetime import datetime
from typing import TypedDict, List, Optional, Dict, Any
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# --- Configuration ---
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# --- State Definition ---
# This must match or be a subset of the main graph's AgentState
class AgentState(TypedDict):
    # Input
    tweet_text: str
    post_date: str
    final_dossier: Dict[str, Any] # Expecting a dict here, will convert to string for prompt
    
    # Output
    truth_score: int
    verdict: str
    short_reasoning: str
    visual_class: str

# --- Nodes ---

def verifier_agent_node(state: AgentState):
    """
    The Judge (Verifier Agent).
    Performs Natural Language Inference (NLI) to judge the claim based on evidence.
    """
    print("\n>>> [Verifier Agent] Activated <<<")
    tweet_text = state.get('tweet_text') or state.get('raw_text', 'No text provided')
    print(f"Judging Claim: {tweet_text}")
    
    # Dynamic Simulation Time
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Initialize LLM
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.0,
        api_key=GROQ_API_KEY
    )
    
    # Prepare Evidence Dossier String
    # Cluster agent outputs 'final_dossier', but standalone test might use 'evidence_dossier'
    evidence = state.get("final_dossier") or state.get("evidence_dossier", {})
    if isinstance(evidence, dict):
        evidence_str = json.dumps(evidence, indent=2)
    else:
        evidence_str = str(evidence)

    # Construct Prompt
    verifier_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are the High Court Judge of Information. You do NOT search the internet. You only judge the case based on the provided EVIDENCE_DOSSIER.

Your Protocols:

Temporal Forensic Check:
Compare the SIMULATION_TIME (Current Time) and the CLAIM_POST_DATE with any dates mentioned in the EVIDENCE_DOSSIER.
Rule: If the evidence shows the event happened years ago (e.g., 2018) but the Claim implies it is happening now, this is a "ZOMBIE RUMOR". Verdict = MISLEADING.

Source Hierarchy Weighting:
Tier 1 (Supreme): Official handles (Police, BMC, Disaster Management, Government). If they deny it, the Claim is FALSE (Score 0-10).
Tier 2 (Trusted): Major News (NDTV, BBC, Times of India). If they confirm it, Claim is TRUE (Score 90-100).
Tier 3 (Noise): Random tweets, blogs, or "User reports". If this is the only evidence, Claim is UNVERIFIED (Score 50).

Scoring Rubric (0-100):
0-20 (FALSE): Explicit debunking found or official denial.
21-50 (MISLEADING/OUT OF CONTEXT): Real photo from wrong location/time.
51-75 (UNVERIFIED): Insufficient evidence.
76-100 (TRUE): Corroborated by Tier 1 or Tier 2 sources.

Output Schema: Return ONLY a JSON object (no markdown):
{{
  "truth_score": <int>,
  "verdict": "<String: TRUE | FALSE | MISLEADING | UNVERIFIED>",
  "short_reasoning": "<String: 1 sentence summary citing the deciding factor.>",
  "visual_class": "<String: red | yellow | green>"
}}"""),
        ("human", 
         "Current Simulation Time: {simulation_time}\n"
         "Claim Post Date: {post_date}\n\n"
         "Claim: '{tweet_text}'\n\n"
         "Evidence Dossier:\n{evidence_dossier}\n\n"
         "Verdict:"
        )
    ])
    
    chain = verifier_prompt | llm
    
    try:
        response = chain.invoke({
            "simulation_time": current_time,
            "post_date": state.get("post_date", "Unknown"),
            "tweet_text": tweet_text,
            "evidence_dossier": evidence_str
        })
        
        content = response.content.strip()
        # Clean JSON if needed
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
            
        result_json = json.loads(content)
        
        # Update state with results
        print(f"Verdict: {result_json.get('verdict')} (Score: {result_json.get('truth_score')})")
        
        return {
            "truth_score": result_json.get("truth_score"),
            "verdict": result_json.get("verdict"),
            "short_reasoning": result_json.get("short_reasoning"),
            "visual_class": result_json.get("visual_class")
        }
        
    except Exception as e:
        print(f"Verifier Agent Error: {e}")
        # Fallback error state
        return {
            "truth_score": 50,
            "verdict": "UNVERIFIED",
            "short_reasoning": "Error during verification process.",
            "visual_class": "yellow"
        }

# --- Graph Construction ---

workflow = StateGraph(AgentState)
workflow.add_node("verifier_agent_node", verifier_agent_node)
workflow.set_entry_point("verifier_agent_node")
workflow.add_edge("verifier_agent_node", END)

verifier_agent_app = workflow.compile()

# --- Execution Helper ---
if __name__ == "__main__":
    # Test with a sample state
    sample_state = {
        "tweet_text": "Dam cracked in North Mumbai",
        "post_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "final_dossier": {
            "visual_evidence": "Image shows a generic dam, no cracks visible.",
            "search_cluster": [
                "Source: BMC Official Handle (twitter.com/mybmc)\nContent: Rumors about dam cracks are FALSE. Please do not panic.",
                "Source: Times of India\nContent: No reports of dam damage in Mumbai."
            ],
            "conclusion_hint": "Official denial found."
        },
        "truth_score": 0,
        "verdict": "",
        "short_reasoning": "",
        "visual_class": ""
    }
    
    print("Running Verifier Agent Test...")
    result = verifier_agent_app.invoke(sample_state)
    print(json.dumps(result, indent=2))
