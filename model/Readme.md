# AI Relationship Counselor: Dr. Helen

This project is a multi-agent AI chatbot for relationship counseling.

## Setup

1.  **Navigate to the project directory:**
    ```bash
    cd motiv/model
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Set up your API Key:**
    Create a `.env` file and add your key:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

## How to Run

1.  Run the main script:
    ```bash
    python main.py
    ```

2.  Answer the initial questions when prompted.

### Example Initial Answers

> **1. How long have you been married?**
> `5 years`

> **2. Briefly, what is the main source of conflict?**
> `We are a dual-income couple, but I feel like I'm the only one doing all the housework.`

> **3. When a conflict arises, what is your typical reaction?**
> `Tries to talk immediatley to resolve issues.`

> **4. On a scale of 1 (very emotional) to 10 (very rational), how would you describe your response style?**
> `2`

After providing the initial info, you can start the conversation with Dr. Helen.

> 'We're a dual-income couple and we both work long hours, but I feel like I'm shouldering the entire burden of the housework. I'm exhausted and starting to feel really resentful. I've tried to talk to my husband about it, but he just says he's tired too and nothing ever changes. How can I get him to see this as our shared responsibility?'
