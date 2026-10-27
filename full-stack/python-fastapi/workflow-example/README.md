# Topic 00 — Real FastAPI Companion

The main academy page is an educational browser simulation. **This folder is a runnable local FastAPI application** showing the same request/response ideas with FastAPI, Pydantic and SQLite.

## Run on Windows PowerShell

```powershell
cd full-stack\python-fastapi\workflow-example
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app:app --reload
```

Open <http://127.0.0.1:8000/docs>. Send an `Authorization` header with the demo-only value `Bearer demo-customer`. Review the example request payloads at `/docs`, then inspect `/demo-state` before and after requests.

## Test

```powershell
python -m pytest -q
```

The tests cover 200/201/202, 401/403/404/405/409/422/502/503, transaction rollback and background confirmation.

**Never use demo credentials or this application to handle real money, cards, identities or production orders.** The application intentionally uses hardcoded local demo credentials, mock payment outcomes, a toy inventory, and a SQLite database. Its example code is educational; actual banking, payment processing and enterprise identity integration require much more security and operational design. The page's illustrated snippets also omit necessary definitions; this folder is the runnable sample.
