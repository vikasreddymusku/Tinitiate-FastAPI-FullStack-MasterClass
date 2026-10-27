# Topic 00 V4 — Developer Learning Studio

The V4 page is `workflow-v4.html`, designed to coexist with V1 (`workflow.html`), V2 (`workflow-v2.html`), and V3 (`workflow-v3.html`). **V1–V3 remain unchanged.** The complete Tinitiate Academy header, navigation and footer are retained.

## Run the academy

From the extracted project root (the directory containing the main `index.html`):

```powershell
cd C:\Code\Tinitiate-FastAPI-FullStack-MasterClass
python -m http.server 8008
```

Open **http://localhost:8008/full-stack/python-fastapi/workflow-v4.html**. Type or paste the URL without extra Markdown punctuation.

## Getting started

1. Start with **Banking**. Anita has ₹400 and initially tries to transfer ₹500. Tap **Send Money** and watch the paper-plane request pass through the web server, middleware, routing, validation, identity, and Python rules, where the insufficient-balance check rejects it with this demonstration API's `409` response.
2. Click a machine to inspect its own animated explanation; the code panel highlights the relevant illustrative Python. The logs identify which checkpoints were reached and include application instrumentation examples.
3. Click **Fix & Retry** to adjust the amount and observe a successful transfer with balances updated together.
4. Switch to **Shopping** and **Ordering** for inventory/payment checks and restaurant/database/notification scenarios.
5. Use **HTTP Methods** to understand GET/POST/PUT/PATCH/DELETE; click **Try ... on this action** to see why using an unsupported method on the current endpoint returns `405`.
6. Use the **JWT and Authentication** four-step explainer to learn why credentials and permissions exist. Change identity in **Try It Yourself** to test missing token (`401`), expired token (`401`), and insufficient permission (`403`).
7. Use **Compare Success/Error**, **Code/HTTP Data/Models** tabs, the **Application Logs** filter and clickable log entries to identify exactly where a simulated request stopped.

## What is and isn't real

- All interactions in `workflow-v4.html` use an in-browser deterministic model. The page does **not** send actual bank transfers, process payments, validate cryptographic JWT signatures, persist database writes, or contact external services.
- Logs tagged `app.*` and `uvicorn.access` are **illustrative examples** of output a deliberately instrumented application *could* produce. Normal Uvicorn logging does not automatically report each middleware, validation, authentication, or business-rule checkpoint. The illustrative access log appears on response delivery.
- The seven-machine map is a **teaching sequence**, not a universal claim about FastAPI's exact internal execution order. In real FastAPI applications dependency resolution, validation, middleware wrapping, and error handling depend on route and dependency structure.
- `409` for insufficient bank funds is a deliberate example API choice; production HTTP error contracts depend on application design. FastAPI typically returns `422` for invalid request model data unless the handler is customized.
- Companion actual Python backend: `workflow-example/app.py`; its tests are in `workflow-example/tests/`. Run separately using its `README.md`. It is not a live source for the V4 page.
- The code shown in V4 is a simplified **illustrative teaching pattern**, not a drop-in complete production transfer implementation. Production work needs signed JWT verification, account authorization, row-level consistency, locking, idempotency, audit logs, transaction isolation and careful payment orchestration.

## Teaching features

- Separate scenario-selected, editable customer apps
- Seven stage-specific animated mechanisms, selected by the same step state that drives explanations and logs
- A motion-animated request/reply paper plane with controls for play/pause, previous/next, reset and slow/normal/fast playback
- Route/method, validation, identity, business-rule and downstream-service failure presets
- Stage-specific code highlighting, HTTP request/response viewer, request models and conceptual explanations
- Illustrated developer logs (filter, click to inspect, copy)
- HTTP method rationale and authentication/JWT basics
- Success-versus-failure comparison; Fix & Retry
- Narrow and wide layouts, keyboard focus styling and reduced-motion support

## Developer files

- `workflow-v4.html`
- `assets/css/workflow-v4.css`
- `assets/js/workflow-v4.js`
- Shared deterministic scenario model: `assets/js/workflow-engine.js`

For verification, the updated build was checked with browser-rendered scenarios (22 presets), permission failures, method mismatch, Fix & Retry, code tabs and responsive width tests. Five existing companion-backend tests passed during packaging.
