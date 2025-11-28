import json
import os
from datetime import datetime
from typing import TypedDict, Optional, Dict, Any
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# --- Configuration ---
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# --- State Definition ---
class AgentState(TypedDict):
    # Input
    tweet_text: str
    truth_score: int
    verdict: str
    short_reasoning: str
    
    # Output
    generated_response: Dict[str, Any]

# --- Nodes ---

def response_agent_node(state: AgentState):
    """
    The Spokesperson (Response Agent).
    Drafts a public-facing response tweet based on the verdict.
    """
    print("\n>>> [Response Agent] Activated <<<")
    
    # Initialize LLM
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.7, # Slightly higher temperature for empathetic tone
        api_key=GROQ_API_KEY
    )
    
    # Construct Prompt
    response_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are FactGuard, an AI automated crisis assistant. You must draft a response tweet (max 280 chars) that is Professional, Empathetic, and Authoritative.

Tone Rules based on Verdict:

If FALSE (Truth Score < 20):
Style: Urgent Correction.
Start with: "⚠️ Fact Check: This claim is FALSE."
Body: Briefly explain why (e.g., "Image is from 2018"). Cite the correct source.
End with: "Please stop sharing misinformation. 🛑"

If MISLEADING (Truth Score 21-50):
Style: Contextual Clarification.
Start with: "⚠️ Context Alert: This is Misleading."
Body: Explain the nuance (e.g., "The event happened, but 5 years ago").

If TRUE (Truth Score > 80):
Style: Public Safety Alert.
Start with: "✅ Confirmed:"
Body: Validate the info and add safety advice (e.g., "Avoid the area.").

If UNVERIFIED (Truth Score 51-79):
Style: Neutral Holding Statement.
Start with: "⚖️ Verifying:"
Body: State that you are checking sources and will update soon.

Formatting Rules:
Keep it under 280 characters.
Use Indian English nuances (e.g., polite but firm).
Crucial: Do not lecture the user. Correct the fact, don't insult the person.

Output Schema: Return ONLY a JSON object:
{{
  "response_tweet": "<String: The final tweet text>",
  "generated_at": "<String: Timestamp>",
  "status": "Ready to Publish"
}}"""),
        ("human", 
         "Original Tweet: '{tweet_text}'\n"
         "Verdict: {verdict}\n"
         "Truth Score: {truth_score}\n"
         "Reasoning: {short_reasoning}\n\n"
         "Draft Response:"
        )
    ])
    
    chain = response_prompt | llm
    
    try:
        response = chain.invoke({
            "tweet_text": state.get("tweet_text", ""),
            "verdict": state.get("verdict", "UNVERIFIED"),
            "truth_score": state.get("truth_score", 50),
            "short_reasoning": state.get("short_reasoning", "Under investigation.")
        })
        
        content = response.content.strip()
        # Clean JSON if needed
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
            
        result_json = json.loads(content)
        
        print(f"Generated Response: {result_json.get('response_tweet')}")
        
        return {
            "generated_response": result_json
        }
        
    except Exception as e:
        print(f"Response Agent Error: {e}")
        return {
            "generated_response": {
                "response_tweet": "⚠️ Error: Unable to generate response.",
                "status": "Error"
            }
        }

# --- Graph Construction ---

workflow = StateGraph(AgentState)
workflow.add_node("response_agent_node", response_agent_node)
workflow.set_entry_point("response_agent_node")
workflow.add_edge("response_agent_node", END)

response_agent_app = workflow.compile()

# --- Execution Helper ---
if __name__ == "__main__":
    # Test with a sample state (False Claim)
    sample_state = {
        "tweet_text": "Dam cracked in North Mumbai",
        "truth_score": 0,
        "verdict": "FALSE",
        "short_reasoning": "BMC Official Handle denies any cracks.",
        "generated_response": {}
    }
    
    print("Running Response Agent Test...")
    result = response_agent_app.invoke(sample_state)
    print(json.dumps(result, indent=2))
