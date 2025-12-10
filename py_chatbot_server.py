from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

# Create Flask App
app = Flask(__name__)
# Enable CORS for all domains (for development simplicity)
CORS(app)

# 1. CONFIGURE GEMINI API
# Ideally, use environment variables: API_KEY = os.getenv("GEMINI_API_KEY")
API_KEY = "AIzaSyDpBFA_fcl5h5DPa52SRrwlRd46Rp1Zwe4"  # Hardcoded for demo/hackathon speed
genai.configure(api_key=API_KEY)

# 2. DEFINE SYSTEM PROMPT & MODEL
SYSTEM_PROMPT = """You are the MyMULA App Assistant.
Your persona: Friendly, helpful, concise, and professional.

Your capabilities:
1. Explain how to link a child account (Profile > Add Family > Scan Birth Cert).
2. Explain approval process (Push Notification > Face ID).
3. Explain document uploads (Documents Tab).
4. If a user asks to navigate, you can verify their intent but you cannot physically move them unless the frontend handles it.

Rules:
- Keep answers short (under 3-4 sentences).
- Use emojis to be friendly.
- Do NOT make up features that don't exist.
"""

# Initialize Model
# Using 'gemini-pro' as it's the stable text model
model = genai.GenerativeModel('gemini-pro')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        history = data.get('history', [])

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Construct Chat Session
        # Gemini Python SDK handles history via start_chat
        chat_session = model.start_chat(history=[])

        # Add manual history context if needed, or just send the unified prompt
        # For simplicity in this demo, we'll wrap the user message with system prompt context
        # continuously or rely on the stateless request if we don't maintain server-side sessions.
        
        # Simple Stateless Approach:
        # We combine System Prompt + Conversation History (if passed) + Current Message
        
        full_context = f"{SYSTEM_PROMPT}\n\n"
        for msg in history:
            role = "User" if msg['role'] == 'user' else "Assistant"
            full_context += f"{role}: {msg['parts'][0]['text']}\n"
        
        full_context += f"User: {user_message}\nAssistant:"

        response = model.generate_content(full_context)

        return jsonify({
            "response": response.text
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🤖 MyMULA AI Server running on http://localhost:5000")
    app.run(port=5000, debug=True)
