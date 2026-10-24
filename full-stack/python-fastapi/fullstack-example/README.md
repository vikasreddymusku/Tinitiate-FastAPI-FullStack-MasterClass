# Tinitiate Python FastAPI Full-Stack — runnable reference implementation

This is the **real executable sample** for the interactive course. The six browser workbench labs are educational simulations; this project runs actual HTTP endpoints, credential verification, SQLAlchemy transactions and React requests.

## Included

- FastAPI, OpenAPI at `/docs`, typed Pydantic v2 schemas and correct 2xx/4xx validation handling
- OAuth2 password-form demonstration, Argon2 password hashes, short-lived HS256 JWT access tokens with server-enforced algorithm, issuer and audience checks
- Rotating opaque refresh credentials, stored **hashed** in SQL; refresh replay is rejected, logout revokes the refresh credential
- Role-aware admin dependency, owner-scoped item CRUD (IDOR/BOLA check), CORS for local frontend, readiness and health endpoints
- SQLAlchemy 2.x (SQLite for easiest local start, optional PostgreSQL via Compose)
- React + TypeScript browser app demonstrating register/login/refresh/CRUD and actual HTTP status logging
- Pytest tests for 404, 405, 422, 401, 403, registration, CRUD, tenant isolation, token rotation and revocation

## Option A — Fastest local start (Python + Node)

Use **Python 3.11+**, **Node 20+**. On Windows PowerShell:

```powershell
cd full-stack/python-fastapi/fullstack-example/backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
$env:JWT_SECRET = python -c "import secrets; print(secrets.token_urlsafe(48))"
uvicorn app.main:app --reload
```

The API runs at http://127.0.0.1:8000 and Swagger UI at http://127.0.0.1:8000/docs. The default database for local mode is a SQLite file in the backend working directory. In a **second terminal**:

```powershell
cd full-stack/python-fastapi/fullstack-example/frontend
npm install
npm run dev
```

Open http://localhost:5173, register, log in and create items. For tests from the `backend` folder:

```powershell
python -m pytest -q
```

Linux/macOS: use `python3 -m venv .venv; source .venv/bin/activate`, then `export JWT_SECRET="$(python -c 'import secrets; print(secrets.token_urlsafe(48))')"`.

## Option B — PostgreSQL + Docker Compose

From the `fullstack-example` directory:

```powershell
Copy-Item .env.example .env
# Edit .env and replace the placeholder with your own random JWT_SECRET
# Run `python -c "import secrets; print(secrets.token_urlsafe(48))"` to generate it
docker compose up --build
```

PostgreSQL is accessible to the API over the Compose service network. Open http://localhost:5173 and http://localhost:8000/docs. The database username/password in compose are **intentionally local-development only**; change them and use a secrets manager before any deployment. `docker compose down -v` **deletes local database data**.

## Understand the full stack

| User action | HTTP request | Server action | Database / UI consequence |
|---|---|---|---|
| Register | POST `/auth/register` | Pydantic validation, Argon2 hashing | User row committed; no login yet |
| Log in | POST `/auth/token` | Password verified; JWT signed; opaque refresh token stored hashed | React stores session credentials in memory |
| Create item | POST `/api/items` | JWT signature+claims validated; typed body checked | Owner-scoped DB row committed; list refetched |
| Invalid item | POST `/api/items` | Pydantic blocks invalid values | HTTP 422; no row inserted |
| Missing JWT | GET `/api/items` | OAuth2 bearer dependency rejects | HTTP 401 |
| Another user's row | GET `/api/items/{id}` | Ownership check rejects | HTTP 404 (ID hidden) |
| Refresh | POST `/auth/refresh` | Hashed refresh token looked up, rotated | New credentials returned, prior refresh rejected |
| Log out | POST `/auth/logout` | Refresh record revoked | Further refresh rejected, **access JWT still valid until expiry** |

## Security and production caveats

This is a *teaching example*, not a fully audited identity service or production deployment. Password form is shown because it supports FastAPI's docs and local teaching; for real third-party login and enterprise SSO prefer modern external authorization servers with **OAuth2 authorization code + PKCE and OIDC**. This example does **not** implement the full OAuth2 authorization server, OIDC identity provider, JWKS rotation, MFA, client consent, API gateway or CSRF-protected secure-cookie session system; those are taught in the course's conceptual lessons and browser lab. Tokens in the React example are held in component memory instead of localStorage. A real deployment should generally use a vetted auth provider or secure BFF and HttpOnly cookies with an explicit CSRF strategy.

Before production, add Alembic migrations instead of `create_all`, stronger password abuse and rate-limit controls, refresh-token replay incident response, token/session revocation strategy, audit trails, tenant scoping as needed, secret rotation, deployment hardening, observability, HTTPS reverse proxy, CI/CD and database backups. Run `ENVIRONMENT=production` only with a securely supplied `JWT_SECRET`.

**Source references:** [FastAPI tutorials](https://fastapi.tiangolo.com/tutorial/), [FastAPI security](https://fastapi.tiangolo.com/tutorial/security/), [Pydantic models](https://docs.pydantic.dev/latest/), [SQLAlchemy 2.x](https://docs.sqlalchemy.org/en/20/).
