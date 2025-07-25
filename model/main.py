import os
import google.generativeai as genai
from typing import Dict, Optional, List
from dotenv import load_dotenv
import time
import ast

from session_memory import (
    load_history, save_history, 
    load_user_profile, save_user_profile,
    load_counseling_state, save_counseling_state,
    load_selected_experts, save_selected_experts
)
from agents import (
    COUNSELOR_SYSTEM_PROMPT, 
    CBT_EXPERT_PROMPT, 
    EFT_EXPERT_PROMPT,
    GOTTMAN_METHOD_EXPERT_PROMPT,
    SOLUTION_FOCUSED_EXPERT_PROMPT,
    FINANCIAL_PSYCHOLOGY_EXPERT_PROMPT,
    PSYCHIATRIST_PROMPT,
    OBGYN_EXPERT_PROMPT,
    UROLOGIST_EXPERT_PROMPT,
    LAWYER_EXPERT_PROMPT,
    ROUTER_PROMPT_TEMPLATE
)
from context_manager import get_recent_history

# Load .env file at the start of the script
load_dotenv()

# Configure how many turns of conversation history to maintain
MAX_CONVERSATION_TURNS = 10 

ALL_EXPERTS = {
    "CBT Expert": CBT_EXPERT_PROMPT,
    "EFT Expert": EFT_EXPERT_PROMPT,
    "Gottman Method Expert": GOTTMAN_METHOD_EXPERT_PROMPT,
    "Solution-Focused Expert": SOLUTION_FOCUSED_EXPERT_PROMPT,
    "Financial Psychology Expert": FINANCIAL_PSYCHOLOGY_EXPERT_PROMPT,
    "Psychiatrist": PSYCHIATRIST_PROMPT,
    "OB/GYN Expert": OBGYN_EXPERT_PROMPT,
    "Urologist Expert": UROLOGIST_EXPERT_PROMPT,
    "Lawyer Expert": LAWYER_EXPERT_PROMPT,
}

def _run_single_expert_analysis(expert_name: str, expert_prompt: str, context_str: str) -> Dict[str, str]:
    """Internal function to run a single expert analysis and return the result."""
    try:
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=expert_prompt)
        response = model.generate_content(context_str)
        return {"name": expert_name, "report": response.text}
    except Exception as e:
        return {"name": expert_name, "report": f"Error during analysis: {e}"}

def run_expert_analysis(session_id: str, short_history: list, user_question: str) -> Dict[str, str]:
    """Runs the selected expert agents to receive analysis reports."""
    print("\n[Swarm] Starting expert analysis for the selected team...")

    selected_expert_names = load_selected_experts(session_id)
    if not selected_expert_names:
        print("[Error] No selected experts found for this session. Aborting analysis.")
        return {}
    
    history_str = "\n".join([f"{msg['role']}: {msg['parts']}" for msg in short_history])
    context_to_analyze = f"""
[Previous Conversation]
{history_str}

[User's New Question]
{user_question}
"""
    
    experts_to_run = {name: ALL_EXPERTS[name] for name in selected_expert_names if name in ALL_EXPERTS}
    
    analysis_results = {}
    for name, prompt in experts_to_run.items():
        print(f"- Starting {name} analysis...")
        result = _run_single_expert_analysis(name, prompt, context_to_analyze)
        analysis_results[result["name"]] = result["report"]
        print(f"- {name} analysis complete.")
        time.sleep(1) # To avoid rate limiting
            
    return analysis_results

def select_expert_team(user_profile: Dict) -> List[str]:
    """Uses a router agent to select the most relevant team of experts."""
    print("\n[Router] Selecting expert team based on initial user info...")
    
    router_prompt = ROUTER_PROMPT_TEMPLATE.format(
        user_initial_chart=user_profile,
        expert_list="\n".join([f"- {name}" for name in ALL_EXPERTS.keys()])
    )
    
    router_model = genai.GenerativeModel('gemini-1.5-flash')
    router_response = router_model.generate_content(router_prompt)
    
    try:
        selected_experts = ast.literal_eval(router_response.text)
        print(f"[Router] Selected team: {selected_experts}")
        return selected_experts
    except (ValueError, SyntaxError) as e:
        print(f"[Router] Error parsing expert list: {e}. Defaulting to standard team.")
        return ["CBT Expert", "EFT Expert", "Psychiatrist"] # Fallback

def generate_gemini_response(
    session_id: str,
    user_question: str,
    user_initial_chart: Optional[Dict] = None
) -> str:
    """
    [Multi-agent Swarm & Phased Counseling with Fixed Team] Generates a final response.
    """
    print(f"\n--- Starting Final Response Generation (Session ID: {session_id}) ---")
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not found.")
        genai.configure(api_key=api_key)

        history = load_history(session_id)
        
        # --- First Turn: Routing and Simple Response ---
        if not history:
            # 1a. Save user profile
            user_profile = user_initial_chart or {}
            save_user_profile(session_id, user_profile)
            
            # 1b. Select and save expert team
            selected_team = select_expert_team(user_profile)
            save_selected_experts(session_id, selected_team)

            # 1c. Generate simple first response without expert analysis
            model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=COUNSELOR_SYSTEM_PROMPT)
            print("[State] Generating simple first response...")
            prompt = f"[User Information]\n{user_profile}\n\n[First Question]\n{user_question}"
            response = model.generate_content(prompt)
            ai_response = response.text
            
            updated_history = [{'role': 'user', 'parts': [prompt]}, {'role': 'model', 'parts': [ai_response]}]
            save_counseling_state(session_id, "Exploration", 1)
            save_history(session_id, updated_history)
            return ai_response

        # --- Subsequent Turns ---
        user_profile = load_user_profile(session_id)
        phase, turn_count = load_counseling_state(session_id)

        # 2. Update counseling phase
        turn_count += 1
        # Modified for a faster 5-turn conclusion
        if 1 <= turn_count < 3: phase = "Exploration"
        elif 3 <= turn_count < 5: phase = "Insight"
        else: phase = "Action"
        save_counseling_state(session_id, phase, turn_count)

        # 3. Run expert analysis with the fixed team
        short_history = get_recent_history(history, max_turns=MAX_CONVERSATION_TURNS)
        analysis_reports = run_expert_analysis(session_id, short_history, user_question)
        
        if analysis_reports:
            reports_str = "\n\n".join([f"--- {name} Report ---\n{report}" for name, report in analysis_reports.items()])
        else:
            reports_str = "[Expert Reports]\nNo expert reports were generated for this turn."

        history_str_for_prompt = "\n".join([f"{msg['role']}: {msg['parts']}" for msg in short_history])

        # 4. Construct final prompt
        phase_instruction = ""
        if phase == "Exploration":
            phase_instruction = "You are currently in the **'Exploration'** phase. Do not offer solutions or jump to conclusions. Instead, focus on asking deep, open-ended **'questions'** to verify aspects of the expert analyses that the user may not yet be aware of."
        elif phase == "Insight":
            phase_instruction = "You are currently in the **'Insight'** phase. It's time to move beyond questions. Synthesize the expert analyses to offer one or two **'key insights'** that help the user see their problem from a new perspective. Use gentle framing like, 'I wonder if...' or 'It seems as though...'"
        elif phase == "Action":
            phase_instruction = "You are currently in the **'Action'** phase. It's time to propose an **'action plan'** for concrete change. Suggest one or two small, practical actions the user can realistically try."

        final_prompt = f"""
[Situation]
You are the lead counselor, 'Dr. Helen'. You are in turn **#{turn_count}** of the conversation, and the current counseling phase is **'{phase}'**.
You have received the following analysis reports from your selected team of expert colleagues:

{reports_str}

[Previous Conversation with User]
{history_str_for_prompt}

[User's New Question]
{user_question}

[User Profile Analysis]
{user_profile}

[Instruction]
Your primary task is to perform the role corresponding to the **current counseling phase ('{phase}')**.
{phase_instruction}

**[Common Guidelines]**
- **Response Style:** Adjust the ratio of empathy to analysis based on the user's 'Emotional-Rational Index'.
- **Response Structure:** Maintain a structure of [Empathize & Validate] -> [Core Content (Question/Insight/Suggestion)] -> [A small next step], but adapt the nature of the core content to the phase.
- **Brevity:** Keep the entire response concise, within 5-6 sentences.
- **Tone and Attitude:** Naturally weave the expert analyses into your own insights, and always maintain the warm, empathetic tone of 'Dr. Helen'.
"""
        # 5. Generate final response
        final_model = genai.GenerativeModel('gemini-2.5-flash', system_instruction=COUNSELOR_SYSTEM_PROMPT)
        final_response = final_model.generate_content(final_prompt)
        ai_response = final_response.text
        
        # 6. Save history
        updated_history = history + [
            {'role': 'user', 'parts': [user_question]},
            {'role': 'model', 'parts': [ai_response]}
        ]
        save_history(session_id, updated_history)

        return ai_response

    except (ValueError, KeyError) as e:
        return f"Error: {e}"
    except Exception as e:
        return f"An error occurred while calling the model: {e}"

if __name__ == "__main__":
    session_id = f"user_{os.getpid()}"
    
    print("="*50)
    print("Welcome to the AI Relationship Counselor 'Dr. Helen'.")
    print("To begin, please provide some initial information.")
    print("="*50)

    # --- Collect user information at the start ---
    marriage_duration = input("1. How long have you been married? (e.g., 5 years, 6 months): ")
    main_conflict = input("2. Briefly, what is the main source of conflict you are facing?: ")
    user_tendency = input("3. When a conflict arises, what is your typical reaction? (e.g., I try to talk it out, I need some space): ")

    # Validate Emotional-Rational Index
    er_index = 0
    while True:
        try:
            er_index_str = input("4. On a scale of 1 (very emotional) to 10 (very rational), how would you describe your response style?: ")
            er_index = int(er_index_str)
            if 1 <= er_index <= 10:
                break
            else:
                print("Invalid input. Please enter a number between 1 and 10.")
        except ValueError:
            print("Invalid input. Please enter a whole number.")

    user_info = {
        "Marriage Duration": marriage_duration,
        "Main Conflict Source": main_conflict,
        "User's Tendency": user_tendency,
        "Emotional-Rational Index (1:Very Emotional, 10:Very Rational)": er_index
    }

    print("\nThank you for sharing. Now, let's start the session.")
    print("="*50)
    print("AI Relationship Counselor 'Dr. Helen'")
    print(f"(Session ID: {session_id})")
    print("Please enter your first question.")
    print("To end the conversation, type 'exit'.")
    print("="*50)

    is_first_turn = True
    while True:
        try:
            user_question = input("\nYou: ")
        except KeyboardInterrupt:
            print("\n\nCounseling session ended. Please feel free to return anytime.")
            break
            
        if user_question.lower() == 'exit':
            print("\nCounseling session ended. Please feel free to return anytime.")
            break

        if is_first_turn:
            response = generate_gemini_response(session_id, user_question, user_initial_chart=user_info)
            is_first_turn = False
        else:
            response = generate_gemini_response(session_id, user_question)
        
        print(f"\n\033[94mDr. Helen:\033[0m {response}")

    print("\n=== Conversation Ended ===")
