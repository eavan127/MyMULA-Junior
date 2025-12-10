@echo off
TITLE MyMULA AI Launcher

echo ===================================================
echo      Starting MyMULA Junior AI System 🚀
echo ===================================================
echo.

:: 1. Start the Python Backend Server in a new minimized window
echo [1/2] Launching AI Intelligence Server...
start "MyMULA AI Backend" /min "D:\tools\Python 312\python.exe" py_chatbot_server.py

:: 2. Wait 2 seconds for server to initialize
timeout /t 2 /nobreak >nul

:: 3. Open the Chatbox in default browser
echo [2/2] Opening Chat Interface...
start ai_chatbox.html

echo.
echo ===================================================
echo      ✅ System Started Successfully!
echo      (Keep the minimized backend window open)
echo ===================================================
echo.
pause
