import google.generativeai as genai
import os

# CONFIGURATION
# WARNING: Do not commit this file to public repositories with the API key exposed.
API_KEY = "AIzaSyDpBFA_fcl5h5DPa52SRrwlRd46Rp1Zwe4"

def configure_genai():
    """Configures the Gemini API with the provided key."""
    genai.configure(api_key=API_KEY)
    print("Gemini API configured successfully.")

def test_generation():
    """Tests a simple text generation."""
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content("Hello, how are you today?")
        print("\n--- Test Response from Gemini ---")
        print(response.text)
        print("---------------------------------")
    except Exception as e:
        print(f"Error calling Gemini API: {e}")

if __name__ == "__main__":
    print(f"Using API Key: {API_KEY[:5]}...{API_KEY[-5:]}")
    
    try:
        configure_genai()
        
        # Uncomment the next line to run the test if you have the library installed
        # test_generation()
        
        print("\nNote: To run this script, ensure you have the 'google-generativeai' library installed.")
        print("Run: pip install google-generativeai")
        
    except Exception as e:
        print(f"Initialization failed: {e}")
