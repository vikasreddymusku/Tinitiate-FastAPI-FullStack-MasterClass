# FastAPI Workflow V5 — Organization Point of View

## What V5 adds

- A new **workflow-v5.html** page that keeps V1–V4 intact.
- Teaching from the **organization point of view**:
  - **Banking** — same-bank transfer
  - **Banking** — interbank transfer
  - **Shopping Mall / Store** — checkout and order creation
  - **Restaurant** — food order and kitchen queue
- A **dynamic request journey** with play / pause / step controls.
- A detailed explanation of:
  - request creation
  - routing
  - middleware / context
  - validation
  - authentication / identity
  - Python business rules
  - database writes / services
  - response
- **Live data views** that switch between before / during / after states.
- **Developer-facing visibility** with logs and code.

## Main file

- `full-stack/python-fastapi/workflow-v5.html`

## Supporting files

- `full-stack/python-fastapi/assets/css/workflow-v5.css`
- `full-stack/python-fastapi/assets/js/workflow-v5.js`

## Notes

This V5 implementation is focused on clarity, organization-side explanation, and visible state changes.
It is designed as the next foundation for even deeper additions such as:

- richer middleware visualization
- explicit OAuth / JWT / RBAC branches
- queue retry / rollback / compensation visuals
- more detailed error-path playback
- deeper shopping and restaurant fulfillment stages
