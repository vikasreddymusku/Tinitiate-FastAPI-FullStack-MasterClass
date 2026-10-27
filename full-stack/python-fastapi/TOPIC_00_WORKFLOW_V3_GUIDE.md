# Topic 00 — Workflow V3: Deep Backend Theater

## Open

Serve the project root with `python -m http.server 8008`. Open:

- `http://localhost:8008/full-stack/python-fastapi/workflow-v3.html` — V3 Deep Backend Theater
- `http://localhost:8008/full-stack/python-fastapi/workflow-v2.html` — V2 cinematic (unchanged)
- `http://localhost:8008/full-stack/python-fastapi/workflow.html` — V1 original (unchanged)

## What is new

Seven backend stations, each with an animated miniature mechanism, four navigable internal actions, concrete input/output values, beginner explanations and an optional technical deep dive. Scenarios: bank transfer, sneaker checkout, food order. All share the existing scenario engine so error outcomes match the supported state. V3 provides a separate new HTML, CSS, data and JS set; V1/V2 were not modified.

Choose a scenario and press the action button on the customer phone. Watch the paper plane move, click any station to inspect it, and use the inner arrows or progress bars to explore microsteps. Failure presets model routing, validation, authentication, business rule and downstream service errors. Learners can correct the settings and retry.

## Accuracy limitations

This is an educational state simulation, not a real bank, payment processor, restaurant, cryptographic JWT checker or HTTP server. ASGI/Uvicorn handling, route matching, validation, dependencies and middleware are described conceptually. Middleware and dependency/body validation ordering depend on app design; this simplified journey is not a guaranteed FastAPI execution trace. Bank and commerce workflows omit production-grade distributed payment reconciliation, account locks, cryptographic verification and idempotency infrastructure. The example projects under `workflow-example/` and `fullstack-example/` are separate.

## Key files

- `workflow-v3.html` — page (V1 and V2 kept)
- `assets/js/workflow-v3.js` — plane, player, mini-machines, event binding
- `assets/js/workflow-v3-content.js` — detailed scene-aware station model
- `assets/css/workflow-v3.css` — full motion and responsive layouts
- `assets/js/workflow-engine.js` — existing scenario state and outcomes

## Test summary

Syntax checks: Node `--check` for both new JS files. Visual tests: Chromium via Playwright with isolated HTML/CSS/JS resources, including desktop and 390px mobile, and scenario path checks. The visual tests exercise browser interaction but are not proof of production payment/auth/database correctness.
