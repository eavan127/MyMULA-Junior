import google.generativeai as genai

KEY = "AIzaSyDpBFA_fcl5h5DPa52SRrwlRd46Rp1Zwe4"
genai.configure(api_key=KEY)

print(f"Testing Key: {KEY[:10]}...")

try:
    print("Attempting to list models...")
    for m in genai.list_models():
        print(f"SUCCESS! Found model: {m.name}")
        break
    print("Key is VALID! ✅")
except Exception as e:
    print("\n❌ Key Verification FAILED.")
    print(f"Error Message: {e}")
