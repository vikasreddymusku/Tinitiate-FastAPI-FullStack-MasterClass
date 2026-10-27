# FastAPI Workflow V6 — Animated Execution Update

**V6 now includes an actual browser execution timeline (instructional simulation)** in addition to the approved dashboard layout. The original V1–V5 pages remain available and unchanged.

## Run

```powershell
cd C:\Code\Tinitiate-FastAPI-FullStack-MasterClass
python -m http.server 8008
```

Open `http://localhost:8008/full-stack/python-fastapi/workflow-v6.html`.

## How to explore

1. Select Same Bank, Other Bank, Store, or Restaurant.
2. Click the customer's Send Money / Buy Now / Place Order button, or the new **Play request** control.
3. Watch the packet move between organizations and backend stages, observe the active work animation, read the corresponding micro-actions, and inspect the logs.
4. Use Pause, Previous, Next, Reset, and playback Speed to examine each operation.
5. Choose an Experiment (insufficient balance, expired credential, receiving bank timeout, out of stock, payment decline, restaurant closed, kitchen queue failure, etc.) and replay to see processing stop at the right stage.
6. Re-enable Successful request and replay to see the normal result. Click the existing database Before/During/After controls in the bank view to inspect the example ledger.

## Simulation versus production

This is a **deterministic educational simulation**, not a live FastAPI request inspector. The visible logs are modeled, not real Uvicorn logs. The simulated accounts, stock, payments, and orders are example data held in browser state. No real money, orders, payments, or bank-network activity occurs. The separate runnable backend examples included with the academy are independent of this browser-only cinematic page.

## Motion and accuracy

- Moving request packet and illuminated stages update together.
- Debug text, code focus, and log line generation are synchronized with the execution checkpoint.
- Database writes become visible only after the appropriate step in the normal scenario; failure paths do not produce subsequent success logs.
- A receiving-bank outage results in an **unconfirmed / pending** transfer rather than a false success. It does not automatically double debit the sender.
- Animation preferences respect `prefers-reduced-motion`.

The screenshots are conceptual target art, not runnable original source files. The page keeps the V6 dashboard hierarchy but it is not a pixel-perfect reproduction of the generated mockups, nor does it contain real 3D rendered machine art.
