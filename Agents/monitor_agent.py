import json
import os
import time
from typing import TypedDict, Literal
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# --- Configuration ---
DATA_FILE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "simulation_data", "mumbai_flood_scenario.json")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Global State for Streaming Simulation
# In a production app, this would be in a database (Redis/Postgres)
CURRENT_INDEX = 0

# --- State Definition ---
class AgentState(TypedDict):
    tweet_id: str
    tweet_text: str
    user: str
    timestamp: str
    metrics: dict
    is_crisis: bool
    analysis_reasoning: str

# --- Nodes ---

def ingest_data(state: AgentState):
    """
    Simulates reading from a live Twitter feed by reading the next item 
    from a local JSON file based on a global index.
    """
    global CURRENT_INDEX
    
    # Load Data
    try:
        with open(DATA_FILE_PATH, "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Data file not found at {DATA_FILE_PATH}")
        return {"tweet_text": "Error: No Data", "is_crisis": False}

    # Loop back if we reach the end
    if CURRENT_INDEX >= len(data):
        print("--- [Stream Reset] Reached end of dataset, looping back to start ---")
        CURRENT_INDEX = 0
    
    # Fetch the tweet
    tweet = data[CURRENT_INDEX]
    
    # Simulate Stream Logging
    print(f"\n--- [Live Feed Simulation] ---")
    print(f"Stream Index: {CURRENT_INDEX}")
    print(f"Picked up Tweet ID: {tweet['id']}")
    print(f"User: {tweet['user']} | Time: {tweet['timestamp']}")
    print(f"Content: {tweet['text']}")
    print(f"------------------------------\n")
    
    # Increment for next run
    CURRENT_INDEX += 1
    
    return {
        "tweet_id": tweet["id"],
        "tweet_text": tweet["text"],
        "user": tweet["user"],
        "timestamp": tweet["timestamp"],
        "metrics": tweet["metrics"]
    }

def filter_content(state: AgentState):
    """
    Uses LLM to filter out noise (cricket, food, etc.) and identify potential crisis events.
    """
    print("--- [Monitor Agent] Filtering Content... ---")
    
    tweet_text = state["tweet_text"]
    
    # Initialize LLM
    llm = ChatGroq(
        model="llama-3.1-8b-instant", # Using a smaller, faster model to avoid rate limits
        temperature=0,
        api_key=GROQ_API_KEY
    )
    
    # Prompt
    system = "You are an expert crisis monitoring AI for Mumbai."
    human = (
        "Analyze this tweet: '{text}'. \n"
        "Is it reporting a CRITICAL CRISIS event (flood, fire, collapse, dam burst, waterlogging) that requires verification? \n"
        "Ignore general weather chat ('nice rain'), traffic complaints, cricket, or food. \n"
        "Return ONLY a JSON object: {{ \"is_crisis\": true/false, \"reason\": \"short explanation\" }}"
    )
    
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])
    chain = prompt | llm
    
    try:
        response = chain.invoke({"text": tweet_text})
        content = response.content.strip()
        
        # Basic JSON parsing (robustness for demo)
        # Llama3 usually returns clean JSON if asked, but let's be safe
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
            
        result = json.loads(content)
        is_crisis = result.get("is_crisis", False)
        reason = result.get("reason", "No reason provided")
        
    except Exception as e:
        print(f"LLM Error: {e}")
        is_crisis = False
        reason = "Error in processing"

    print(f"Crisis Detected: {is_crisis}")
    print(f"Reason: {reason}")
    
    return {
        "is_crisis": is_crisis,
        "analysis_reasoning": reason
    }

# --- Conditional Logic ---

def route_tweet(state: AgentState):
    """
    Determines the next step based on crisis detection.
    """
    if state["is_crisis"]:
        return "researcher_agent"
    else:
        return "end"

# --- Graph Construction ---

workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("monitor_node", ingest_data)
workflow.add_node("filter_node", filter_content)

# Define Edges
workflow.set_entry_point("monitor_node")
workflow.add_edge("monitor_node", "filter_node")

# Conditional Edge
workflow.add_conditional_edges(
    "filter_node",
    route_tweet,
    {
        "researcher_agent": END, # Placeholder: In full system, this would point to the next agent
        "end": END
    }
)

# Compile
monitor_agent_app = workflow.compile()

# --- Execution Helper (For Demo) ---
if __name__ == "__main__":
    # Simulate running the agent multiple times to show the "Stream"
    print("Starting Monitor Agent Loop (Press Ctrl+C to stop)...")
    
    try:
        for i in range(10): # Run 10 iterations for demo
            print(f"\n>>> Iteration {i+1} <<<")
            initial_state = {} # State is populated by ingest_data
            result = monitor_agent_app.invoke(initial_state)
            
            if result["is_crisis"]:
                print(">>> ACTION: Triggering Researcher Agent! <<<")
            else:
                print(">>> ACTION: Ignored (Noise) <<<")
                
            time.sleep(2) # Pause for readability
            
    except KeyboardInterrupt:
        print("Stopping...")
