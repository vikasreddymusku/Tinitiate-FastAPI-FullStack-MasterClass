# Topic 00 — How Python FastAPI Works

Start at [`workflow.html`](workflow.html). It is the first, beginner-friendly FastAPI lesson. It comes before [`routing.html`](routing.html) and links back to the original academy and to the larger 18-module course.

## Teaching sequence

1. **The five helpers:** frontend, Uvicorn/server, FastAPI, Python business logic and database.
2. **One click / five steps:** interactive explanations before any advanced terminology.
3. **Three labs:** bank transfer, sneaker checkout and food delivery.
4. **Each lab contains nine checkpoints:** browser → server → middleware → router → validation → identity → Python rules → services/data → response.
5. **Learn by changing:** editable inputs, preset failure modes, response codes, highlights, before/after state, code, fixes, timed playback and step-by-step controls.
6. **Challenge yourself:** three comprehension questions and an optional developer-notes panel.

## Scenarios and expected outcomes

| Scenario | Success | Examples of failures |
| --- | --- | --- |
| Bank transfer | `200`, sender 1500→1000 and friend 200→700 | `401` missing/expired login, `403` limited account, `404` removed route, `405` wrong method, `422` invalid amount, `409` insufficient money, `503` database outage |
| Shop | `201`, inventory 5→4 | `401`, `403`, `404`, `405`, `422` invalid quantity, `409` sold out/declined payment, `502` unavailable gateway |
| Food delivery | `202`, accepted order; notification scheduled | `401`, `403`, `404`, `405`, `422` missing meal, `409` restaurant closed, `503` database outage. Worker downtime delays the notification but **does not change** the `202` acceptance response. |

All examples are deterministic and clearly marked as simulations. In particular, the browser does **not** perform real JWT verification, real fund movement, payment authorization or background execution. The timeline is a conceptual model, not a trace of real FastAPI internals; certain stages overlap or execute through dependencies and middleware that wrap the request.

## Runnable FastAPI counterpart

See [`workflow-example/README.md`](workflow-example/README.md) for the actual sample Python app and local HTTP tests. Its `/docs` includes three runnable routes and a `/demo-state` endpoint. Test this code separately from the browser simulations.

## Manual verification performed

- 22 scenario presets + 19 focused model checks via Node.
- Five FastAPI backend tests through `TestClient`.
- Browser-based DOM checks for all three scenarios, error outcomes, interactive quiz and developer panel, at desktop 1440px and mobile 390px viewports. Checks showed no JavaScript errors or horizontal overflow in the tested configurations.

## Limitations and safety

- These are educational examples, not production banking, payments or SSO systems.
- The code snippets in the visualizer are illustrative. Some support functions are intentionally omitted; use the separate runnable app for complete code.
- Demo credentials are not real JWTs. Never use them in real applications.
- Real checkout requires idempotency, durable processing and external payment recovery. Real bank transfers require significantly stronger controls.
- The academy's standard shared header/footer and pre-existing FastAPI modules are retained.
