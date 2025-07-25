# theraphy_ai/context_manager.py
from typing import List, Dict

def get_recent_history(history: List[Dict[str, str]], max_turns: int) -> List[Dict[str, str]]:
    """
    Returns only the most recent N 'turns' from the full conversation history.
    A "turn" consists of one user message and one model response.
    """
    # 1 turn consists of 2 messages (user, model).
    max_messages = max_turns * 2
    
    # If the total history is less than the max messages, return it as is.
    if len(history) <= max_messages:
        print(f"[ContextManager] History length ({len(history)}) is within the limit ({max_messages}). Returning full history.")
        return history
    
    # If the max messages are exceeded, slice and return only the recent history.
    recent_history = history[-max_messages:]
    print(f"[ContextManager] Truncating history from {len(history)} to the last {len(recent_history)} messages.")
    return recent_history 