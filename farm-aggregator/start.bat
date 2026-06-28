@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  npm install
)
if not exist .env (
  echo ERROR: .env file not found. Copy .env.example to .env and fill in your keys.
  pause
  exit /b 1
)
echo Starting Farm Aggregator...
node index.js
pause
