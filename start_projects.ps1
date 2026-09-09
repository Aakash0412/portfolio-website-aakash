Write-Host "Starting AI Business Dashboard..."
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass", "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='AI Business Dashboard Backend'; cd projects\ai-business-dashboard\backend; python -m venv venv; .\venv\Scripts\activate; pip install -r requirements.txt; uvicorn main:app --port 8001 --host 0.0.0.0"

Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass", "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='AI Business Dashboard Frontend'; cd projects\ai-business-dashboard\frontend; npm install; npm run dev"


Write-Host "Starting AI Resume Screener..."
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass", "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='AI Resume Screener Backend'; cd projects\ai-resume-screener\backend; python -m venv venv; .\venv\Scripts\activate; pip install -r requirements.txt; python app.py"

Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass", "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='AI Resume Screener Frontend'; cd projects\ai-resume-screener\frontend; npm install; npm run dev"


Write-Host "Starting AI Startup Validator..."
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass", "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='AI Startup Validator Backend'; cd projects\ai-startup-validator\backend; python -m venv venv; .\venv\Scripts\activate; pip install -r requirements.txt; python main.py"

Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass", "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='AI Startup Validator Frontend'; cd projects\ai-startup-validator\frontend; npm install; npm run dev"
