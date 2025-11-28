import time
from typing import TypedDict, List, Optional, Dict, Any
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv

# Import agent logic
from Agents.monitor_agent import ingest_data, filter_content
from Agents.cluster_agent import cluster_node
from Agents.verifier_agent import verifier_agent_node
from Agents.response_agent import response_agent_node

# Load env vars
load_dotenv()

# --- Shared State Definition ---
class AgentState(TypedDict):
    # Data from Monitor Agent
    tweet_id: Optional[str]
    tweet_text: Optional[str]
    user: Optional[str]
    timestamp: Optional[str]
    post_date: Optional[str]
    metrics: Optional[Dict[str, Any]]
    
    # Analysis from Monitor Agent
    is_crisis: bool
    analysis_reasoning: Optional[str]
    
    # Data for/from Cluster Agent
    image_url: Optional[str]
    visual_evidence: Optional[str]
    metadata_check: Optional[str]
    search_queries: Optional[List[str]]
    search_results: Optional[List[str]]
    final_dossier: Optional[Dict[str, Any]]

    # Data from Verifier Agent
    truth_score: Optional[int]
    verdict: Optional[str]
    short_reasoning: Optional[str]
    visual_class: Optional[str]
    
    # Data from Response Agent
    generated_response: Optional[Dict[str, Any]]

# --- Router ---
def route_monitor_output(state: AgentState):
    """
    Determines the next step based on the Monitor Agent's analysis.
    """
    if state.get("is_crisis"):
        print(">>> [Router] Crisis Detected -> Routing to Cluster Agent")
        return "cluster_node"
    else:
        print(">>> [Router] No Crisis -> Ending Workflow")
        return END

# --- Graph Construction ---
workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("monitor_ingest", ingest_data)
workflow.add_node("monitor_filter", filter_content)
workflow.add_node("cluster_node", cluster_node)
workflow.add_node("verifier_agent_node", verifier_agent_node)
workflow.add_node("response_agent_node", response_agent_node)

# Set Entry Point
workflow.set_entry_point("monitor_ingest")

# Define Edges
# 1. Ingest -> Filter
workflow.add_edge("monitor_ingest", "monitor_filter")

# 2. Filter -> Router -> (Cluster OR End)
workflow.add_conditional_edges(
    "monitor_filter",
    route_monitor_output,
    {
        "cluster_node": "cluster_node",
        END: END
    }
)

# 3. Cluster -> Verifier
workflow.add_edge("cluster_node", "verifier_agent_node")

# 4. Verifier -> Response
workflow.add_edge("verifier_agent_node", "response_agent_node")

# 5. Response -> End
workflow.add_edge("response_agent_node", END)

# Compile
app = workflow.compile()

# --- Execution Block ---
if __name__ == "__main__":
    print("--- Starting FactGuard System (Live Simulation) ---")
    print("Press Ctrl+C to stop.")
    
    try:
        # Loop to simulate a continuous stream of tweets
        while True:
            print("\n" + "="*50)
            print(">>> Processing Next Tweet in Stream...")
            
            # Invoke the graph with an empty state (ingest_node will populate it)
            result = app.invoke({})
            
            # Optional: Print summary of the run
            if result.get("is_crisis"):
                print("\n[System] \u2705 Workflow Completed: Crisis Verified & Response Drafted.")
                print(f"Verdict: {result.get('verdict')} (Score: {result.get('truth_score')})")
                print(f"Reasoning: {result.get('short_reasoning')}")
                if result.get("generated_response"):
                    print(f"\n[Draft Tweet] \n{result['generated_response'].get('response_tweet')}")
            else:
                print("\n[System] \u23ed Workflow Ended: Tweet Ignored.")
            
            # Wait a bit before the next tweet to make it readable
            time.sleep(5)
            
    except KeyboardInterrupt:
        print("\n[System] Simulation Stopped.")