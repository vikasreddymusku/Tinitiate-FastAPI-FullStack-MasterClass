# masterclass-interactive-web-training-center

## NEW · Topic-by-topic MasterClass (Lesson 01: Routing)

**Start here:** `full-stack/python-fastapi/routing.html` (linked from the FastAPI homepage).

This is a redesigned, explanation-first learning journey. It begins with a library-door story, teaches each line of a first FastAPI app, then unlocks a route explorer with editable method, address, typed path parameters, query parameters, APIRouter prefix, registration order, and custom routes. The page shows a 5-stop request journey, prediction, explanation, corrective action, generated Python code, and three mini-missions. It includes handling demonstrations for HTTP 200, 201, 204, 307, 404, 405, and 422, with specific explanations for route-not-found versus record-not-found.

**Run the portal (from this project root):**

```sh
python -m http.server 8008
```

Then open `http://localhost:8008/full-stack/python-fastapi/routing.html`.

The browser lab is a deterministic educational simulation, **not** an actual HTTP server or an IDE modifying Python source. The code it generates is illustrative FastAPI Python, which was compiled and tested through FastAPI's TestClient against representative inputs. The larger existing course and its demos remain intact. The supplied `fastapi_vault.html` is a design reference, not a dependency or a secure JWT verifier.

**Lesson scope:** fast-path endpoints; HTTP verbs; route decorators and handlers; path/query parameters; fixed vs dynamic precedence; method mismatches; route mutation, deletion and registration order; APIRouter prefix; 307 slash redirect; validation errors; 404 for unmatched path vs 404 raised by a function; reading generated code; troubleshooting.

**Next detailed lesson:** Requests & Pydantic Validation (not built yet). The existing broad concept index is retained separately.

---


## Python FastAPI Full-Stack Interactive MasterClass (new)

Open `full-stack/python-fastapi/index.html` in a local web server. The original academy site navigation and footer are preserved. This FastAPI expansion includes 18 modules / 214 clickable topic deep-dives, a draggable rotating concept constellation and 6 interactive learning labs (routing, tokens + OAuth2/OIDC, request execution, database, async, full-stack).

**Start the portal locally:** `python -m http.server 8008` from this repository root, then visit http://localhost:8008/full-stack/python-fastapi/index.html .

**Run the backend and React capstone:** follow `full-stack/python-fastapi/fullstack-example/README.md`.

**Full index:** `full-stack/python-fastapi/FASTAPI_COURSE_COVERAGE.md`.

Note: visual labs simulate system behavior and do not cryptographically sign tokens or run SQL. The separate reference application executes genuine FastAPI and SQLAlchemy operations.
