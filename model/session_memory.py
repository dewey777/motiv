from typing import List, Dict, Optional, Tuple

# Simple in-memory storage
_history_store: Dict[str, List[Dict[str, str]]] = {}
_user_profile_store: Dict[str, Dict] = {}
_counseling_state_store: Dict[str, Dict] = {} # Stores counseling state (phase, turn_count)
_selected_experts_store: Dict[str, List[str]] = {} # Stores the list of selected experts for the session


def load_history(session_id: str) -> List[Dict[str, str]]:
    """Loads the entire conversation history for a session ID."""
    history = _history_store.get(session_id, [])
    print(f"\n[Memory] Loading history for session '{session_id}'. ({len(history)} messages total)")
    return history

def save_history(session_id: str, history: List[Dict[str, str]]):
    """Saves (overwrites) the conversation history for a session ID."""
    print(f"[Memory] Saving new history for session '{session_id}'. ({len(history)} messages total)")
    _history_store[session_id] = history

def save_user_profile(session_id: str, user_profile: Dict):
    """Saves the user profile information for a session ID."""
    print(f"[Memory] Saving user profile for session '{session_id}'.")
    _user_profile_store[session_id] = user_profile

def load_user_profile(session_id: str) -> Optional[Dict]:
    """Loads the user profile information for a session ID."""
    print(f"[Memory] Loading user profile for session '{session_id}'.")
    return _user_profile_store.get(session_id)

def load_counseling_state(session_id: str) -> Tuple[str, int]:
    """Loads the counseling state (phase, turn count)."""
    state = _counseling_state_store.get(session_id, {"phase": "Exploration", "turn_count": 0})
    print(f"[Memory] Loading state for session '{session_id}': {state}")
    return state["phase"], state["turn_count"]

def save_counseling_state(session_id: str, phase: str, turn_count: int):
    """Saves the counseling state (phase, turn count)."""
    state = {"phase": phase, "turn_count": turn_count}
    print(f"[Memory] Saving state for session '{session_id}': {state}")
    _counseling_state_store[session_id] = state

def save_selected_experts(session_id: str, expert_names: List[str]):
    """Saves the list of selected experts for the session."""
    print(f"[Memory] Saving selected experts for session '{session_id}': {expert_names}")
    _selected_experts_store[session_id] = expert_names

def load_selected_experts(session_id: str) -> Optional[List[str]]:
    """Loads the list of selected experts for the session."""
    experts = _selected_experts_store.get(session_id)
    if experts:
        print(f"[Memory] Loading selected experts for session '{session_id}': {experts}")
    else:
        print(f"[Memory] No selected experts found for session '{session_id}'.")
    return experts 