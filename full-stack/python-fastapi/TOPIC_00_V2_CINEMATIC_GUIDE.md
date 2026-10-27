# Topic 00 — Cinematic Workflow V2

## V1/V2 comparison

- **V1**: `workflow.html` — original visual workflow lab; unchanged except for a V2 link.
- **V2**: `workflow-v2.html` — separate split-screen, paper-plane request flow.

The full Tinitiate header, footer, other modules, and routing lesson are retained.

## Learning experience

1. Learn what Python/FastAPI do before the lab.
2. Select Banking, Shopping, or Food Ordering.
3. Perform the action in the simulated customer app.
4. Follow the curved paper-plane request to Uvicorn, middleware, routing, validation, identity, business logic, and data/services.
5. Watch the engine-room visualization and short teacher explanation at each checkpoint.
6. Follow the response back to the phone, inspect status and before/after values.
7. Try failure presets, change advanced configuration, and use Fix and Retry.
8. Pause, continue, step backward/forward, restart, and change playback speed.

**The stage is a browser-based teaching model**; it does not send money, make purchases or submit real food orders. Browser simulations simplify real FastAPI request ordering and external side effects. A separate real API example remains at `workflow-example/`.

## Local start

From the project root:

```powershell
python -m http.server 8008
```

- V2: http://localhost:8008/full-stack/python-fastapi/workflow-v2.html
- V1: http://localhost:8008/full-stack/python-fastapi/workflow.html

## V2 files

- `workflow-v2.html`
- `assets/css/workflow-v2.css`
- `assets/js/workflow-v2.js`
- Existing shared `assets/js/workflow-engine.js`
