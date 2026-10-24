window.FASTAPI_MODULES = [
  {
    "id": "python",
    "title": "01 · Python for APIs",
    "category": "Foundation",
    "lab": "request",
    "topics": [
      {
        "id": "python-python-environments",
        "title": "Python environments",
        "meaning": "Each project uses a selected interpreter and isolated installed packages.",
        "change": "Change interpreter or virtual environment and the available libraries change.",
        "failure": "The editor runs one environment while the server uses another and imports fail."
      },
      {
        "id": "python-python-types-and-annotated",
        "title": "Python types and Annotated",
        "meaning": "Type hints describe intended values; Annotated attaches FastAPI parameter or dependency metadata.",
        "change": "Change int to str and the request parser and OpenAPI docs reflect a different contract.",
        "failure": "An invalid integer path parameter produces HTTP 422 before your endpoint executes."
      },
      {
        "id": "python-functions-and-scopes",
        "title": "Functions and scopes",
        "meaning": "Functions group a unit of work; names resolve through local, enclosing, and module scopes.",
        "change": "Pass data as function arguments rather than hiding shared global state.",
        "failure": "Accidentally shared mutable state can leak across simultaneous requests."
      },
      {
        "id": "python-classes-and-dataclasses",
        "title": "Classes and dataclasses",
        "meaning": "Classes model behaviors and structured data; dataclasses generate boilerplate for plain Python objects.",
        "change": "Replace a plain dict with a class and callers use attributes rather than string keys.",
        "failure": "A dataclass is not a Pydantic request validator; malformed input may slip through."
      },
      {
        "id": "python-decorators",
        "title": "Decorators",
        "meaning": "A decorator wraps or registers a function; @app.get registers an endpoint without immediately running it.",
        "change": "Add an HTTP decorator and the route table changes when the app imports.",
        "failure": "Confusing registration time with request time leads to incorrect side effects."
      },
      {
        "id": "python-exceptions-and-context-managers",
        "title": "Exceptions and context managers",
        "meaning": "Exceptions interrupt ordinary control flow; context managers guarantee cleanup.",
        "change": "Raise HTTPException to intentionally return an HTTP error; use with/yield to release resources.",
        "failure": "Catching every error and returning HTTP 200 hides genuine failures."
      },
      {
        "id": "python-modules-and-package-imports",
        "title": "Modules and package imports",
        "meaning": "Packages split a service into reusable Python modules.",
        "change": "Move routers to a package and include them from the application factory.",
        "failure": "Circular imports or missing __init__.py in certain layouts prevent startup."
      },
      {
        "id": "python-asyncio-fundamentals",
        "title": "Asyncio fundamentals",
        "meaning": "The event loop schedules coroutines and resumes them after awaited I/O.",
        "change": "Replace blocking network waits with an async client to allow overlapping requests.",
        "failure": "Calling time.sleep() inside async def blocks the event loop."
      },
      {
        "id": "python-package-managers-and-locks",
        "title": "Package managers and locks",
        "meaning": "pip or uv installs dependencies; lock files support reproducible environments.",
        "change": "Pin or lock dependencies and deployments become more repeatable.",
        "failure": "Unpinned incompatible dependencies can change behavior between machines."
      },
      {
        "id": "python-environment-configuration",
        "title": "Environment configuration",
        "meaning": "Settings are injected through process environment or secret managers, not hard-coded into source.",
        "change": "Switch DATABASE_URL and the service points to a different database.",
        "failure": "Commit secrets or forget required variables and production becomes insecure or fails."
      }
    ],
    "code": "# Create a virtual environment\npython -m venv .venv\n# Activate it, then install a reproducible dependency set\npython -m pip install fastapi uvicorn\n\nfrom typing import Annotated\nfrom fastapi import FastAPI, Path\napp = FastAPI()\n\n@app.get(\"/items/{item_id}\")\ndef get_item(item_id: Annotated[int, Path(gt=0)]):\n    return {\"id\": item_id}"
  },
  {
    "id": "http",
    "title": "02 · HTTP, Browser & APIs",
    "category": "Foundation",
    "lab": "request",
    "topics": [
      {
        "id": "http-http-request-anatomy",
        "title": "HTTP request anatomy",
        "meaning": "A request contains a method, URL, headers and sometimes a body.",
        "change": "Change the method, body or header and the server follows a different branch.",
        "failure": "Missing Content-Type or malformed JSON may prevent body parsing."
      },
      {
        "id": "http-http-response-anatomy",
        "title": "HTTP response anatomy",
        "meaning": "The response contains a status, headers and a body.",
        "change": "Return status 201 after creation instead of incorrectly reusing 200 for everything.",
        "failure": "A 204 response cannot meaningfully include JSON body content."
      },
      {
        "id": "http-get-post-put-patch-delete",
        "title": "GET POST PUT PATCH DELETE",
        "meaning": "HTTP methods express reading, creating, replacing, partially editing and deleting resources.",
        "change": "Switch GET to POST and GET-only routes reject the old request with 405.",
        "failure": "Treating unsafe operations as GET makes retries, caching and crawlers risky."
      },
      {
        "id": "http-status-codes-2xx-4xx-5xx",
        "title": "Status codes 2xx 4xx 5xx",
        "meaning": "2xx indicates success, 4xx a client-side problem and 5xx a server-side failure.",
        "change": "Set 404 for missing objects, 401 for missing credentials and 403 for insufficient privileges.",
        "failure": "Returning 200 for exceptions confuses clients and monitoring."
      },
      {
        "id": "http-url-and-query-parameters",
        "title": "URL and query parameters",
        "meaning": "Path segments identify resources; query strings typically filter and paginate.",
        "change": "Add ?limit=5 to narrow the result set without introducing a new route.",
        "failure": "Unexpected or malformed query values cause validation errors."
      },
      {
        "id": "http-headers-and-media-types",
        "title": "Headers and media types",
        "meaning": "Headers communicate content type, accepted responses, auth credentials, caching and tracing.",
        "change": "Add Authorization or Accept and middleware and handlers can interpret the new values.",
        "failure": "Sensitive credentials should not appear in logged header dumps."
      },
      {
        "id": "http-cookies-and-sessions",
        "title": "Cookies and sessions",
        "meaning": "Cookies are browser-managed data; session IDs can reference server-side login state.",
        "change": "Switch bearer header to an HttpOnly cookie and credential transport and CSRF considerations change.",
        "failure": "Cookies without appropriate SameSite and CSRF defenses can expose state-changing requests."
      },
      {
        "id": "http-idempotency-and-retries",
        "title": "Idempotency and retries",
        "meaning": "Repeated idempotent operations preserve intended effects even after network retries.",
        "change": "Add an idempotency key to payment-like POST requests to avoid duplicate side effects.",
        "failure": "A client times out, retries a POST and creates a duplicate order."
      },
      {
        "id": "http-dns-tls-and-proxies",
        "title": "DNS TLS and proxies",
        "meaning": "DNS finds services; TLS encrypts traffic; reverse proxies forward requests.",
        "change": "Enable HTTPS termination and correct proxy trust so generated URLs are accurate.",
        "failure": "Trusting arbitrary forwarded headers can enable host or IP spoofing."
      },
      {
        "id": "http-cors-preflight",
        "title": "CORS preflight",
        "meaning": "Browsers preflight some cross-origin requests and enforce allowed origins.",
        "change": "Allow a specific frontend origin and OPTIONS preflight can succeed.",
        "failure": "Wildcard origin combined with credentialed requests is not a safe valid policy."
      },
      {
        "id": "http-caching-headers-and-etags",
        "title": "Caching headers and ETags",
        "meaning": "Cache-Control and validators decide when clients may reuse or revalidate content.",
        "change": "Change cache duration or ETag and client request patterns change.",
        "failure": "Caching personalized responses in public caches may leak private data."
      },
      {
        "id": "http-rest-resources-and-openapi",
        "title": "REST resources and OpenAPI",
        "meaning": "Resources use stable paths; OpenAPI describes operations, schemas and security.",
        "change": "Add an endpoint and FastAPI can expose it in /openapi.json and /docs.",
        "failure": "Documentation becomes misleading when response models are omitted or wrong."
      }
    ],
    "code": "GET /api/items?limit=2 HTTP/1.1\nHost: localhost:8000\nAccept: application/json\nAuthorization: Bearer <token>\n\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n[{\"id\": 1, \"name\": \"Notebook\"}]"
  },
  {
    "id": "startup",
    "title": "03 · Starting FastAPI",
    "category": "Backend",
    "lab": "request",
    "topics": [
      {
        "id": "startup-fastapi-application-instance",
        "title": "FastAPI application instance",
        "meaning": "FastAPI() creates the ASGI application that owns routes and middleware.",
        "change": "Create the app and the ASGI server has an object to serve.",
        "failure": "Point the server to the wrong module or variable and startup fails."
      },
      {
        "id": "startup-asgi-and-uvicorn",
        "title": "ASGI and Uvicorn",
        "meaning": "ASGI is the Python server/application interface; Uvicorn serves HTTP and WebSockets.",
        "change": "Run uvicorn app.main:app --reload for local development.",
        "failure": "Using --reload as a production worker strategy is inappropriate."
      },
      {
        "id": "startup-first-get-and-post-endpoint",
        "title": "First GET and POST endpoint",
        "meaning": "Decorators register path operations at import time.",
        "change": "Add a @app.post endpoint and POST requests now have a handler.",
        "failure": "Sending the wrong method produces 405, even if the path exists."
      },
      {
        "id": "startup-automatic-swagger-ui-and-redoc",
        "title": "Automatic Swagger UI and ReDoc",
        "meaning": "FastAPI builds interactive API documentation from OpenAPI metadata.",
        "change": "Declare request and response schemas and docs immediately become more useful.",
        "failure": "Exposing sensitive undocumented internal endpoints can broaden attack surface."
      },
      {
        "id": "startup-application-lifespan",
        "title": "Application lifespan",
        "meaning": "A lifespan context creates and cleans up application-wide resources.",
        "change": "Initialize clients at startup and close them on shutdown.",
        "failure": "Creating connections per import or forgetting cleanup leaks resources."
      },
      {
        "id": "startup-application-factory",
        "title": "Application factory",
        "meaning": "A factory constructs app instances with chosen settings and routes.",
        "change": "Build a testing app separately and isolate its dependencies.",
        "failure": "Hidden global state can make test fixtures interfere with each other."
      },
      {
        "id": "startup-routers-with-apirouter",
        "title": "Routers with APIRouter",
        "meaning": "APIRouter groups related operations before inclusion in the main app.",
        "change": "include_router adds all declared routes and can prepend a shared prefix.",
        "failure": "Define a router but forget include_router and every route returns 404."
      },
      {
        "id": "startup-tags-descriptions-and-metadata",
        "title": "Tags descriptions and metadata",
        "meaning": "Operation metadata feeds OpenAPI grouping and descriptive documentation.",
        "change": "Add tags and summary, and docs rearrange without modifying behavior.",
        "failure": "Treating documentation metadata as an authorization check leaves routes open."
      },
      {
        "id": "startup-request-lifecycle",
        "title": "Request lifecycle",
        "meaning": "ASGI scope, middleware, routing, validation, dependencies and endpoints form the request pipeline.",
        "change": "Add a dependency and it executes before the endpoint function.",
        "failure": "An error in middleware can prevent all matching endpoints from running."
      }
    ],
    "code": "from contextlib import asynccontextmanager\nfrom fastapi import FastAPI, APIRouter\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # Initialize shared clients here\n    yield\n    # Close shared clients here\n\napp = FastAPI(title=\"My API\", lifespan=lifespan)\nrouter = APIRouter(prefix=\"/api\", tags=[\"Items\"])\n\n@router.get(\"/items\")\ndef list_items():\n    return [{\"id\": 1}]\n\napp.include_router(router)"
  },
  {
    "id": "routes",
    "title": "04 · Routing & Live Route Mutations",
    "category": "Backend",
    "lab": "routes",
    "topics": [
      {
        "id": "routes-path-operation-matching",
        "title": "Path operation matching",
        "meaning": "The router matches an HTTP method and a concrete URL pattern.",
        "change": "Add GET /items and the lab will show 200 instead of 404.",
        "failure": "A path exists but the method is absent: HTTP 405."
      },
      {
        "id": "routes-static-versus-dynamic-routes",
        "title": "Static versus dynamic routes",
        "meaning": "Static paths like /users/me are distinct from parameter paths like /users/{id}.",
        "change": "Put /users/me before a broad /users/{id} route so me is not treated as an ID.",
        "failure": "Order-sensitive matching can send a static request to the wrong function."
      },
      {
        "id": "routes-path-parameter-validation",
        "title": "Path parameter validation",
        "meaning": "FastAPI parses and validates annotated path values before calling your function.",
        "change": "Change id from str to int and /users/alice becomes HTTP 422.",
        "failure": "Invalid path values fail validation; the endpoint does not run."
      },
      {
        "id": "routes-query-parameters-defaults",
        "title": "Query parameters defaults",
        "meaning": "Query parameters can be required, optional or constrained.",
        "change": "Add Query(ge=1, le=100) and invalid page sizes return 422.",
        "failure": "Omitting a required query argument produces 422."
      },
      {
        "id": "routes-route-methods-and-status-codes",
        "title": "Route methods and status codes",
        "meaning": "One URL can have different handlers for GET, POST or DELETE.",
        "change": "Add POST /items and clients can now create instead of only list.",
        "failure": "A method mismatch returns 405 and an Allow header can identify valid methods."
      },
      {
        "id": "routes-router-prefixes",
        "title": "Router prefixes",
        "meaning": "APIRouter(prefix='/api/v1') prepends that segment to included paths.",
        "change": "Change the prefix and old URLs become 404 until clients migrate.",
        "failure": "Combining a prefix and child path with repeated segments creates awkward URLs."
      },
      {
        "id": "routes-router-inclusion",
        "title": "Router inclusion",
        "meaning": "include_router mounts a router's operations into an application.",
        "change": "Toggle router inclusion and all of its paths appear or disappear.",
        "failure": "Defining router handlers alone does not expose them to HTTP."
      },
      {
        "id": "routes-route-name-and-reverse-lookup",
        "title": "Route name and reverse lookup",
        "meaning": "Named routes let code generate URLs without hardcoding strings.",
        "change": "Rename a path but preserve names and URL generation updates.",
        "failure": "Duplicate names or broken url_path_for calls can surprise clients."
      },
      {
        "id": "routes-path-convertors-and-catch-all-paths",
        "title": "Path convertors and catch-all paths",
        "meaning": "Starlette convertors control segment matching; {path:path} captures slashes.",
        "change": "Change /files/{name} to /files/{path:path} and nested paths start matching.",
        "failure": "Catch-all routes declared early may shadow more specific paths."
      },
      {
        "id": "routes-trailing-slash-redirect",
        "title": "Trailing slash redirect",
        "meaning": "FastAPI generally redirects between a route with and without its ending slash.",
        "change": "Switch redirect_slashes and clients may see a 307 or a 404.",
        "failure": "Clients or proxies may mishandle unexpected redirects."
      },
      {
        "id": "routes-api-versioning",
        "title": "API versioning",
        "meaning": "Versioned prefixes help maintain contracts while introducing breaking changes.",
        "change": "Introduce /api/v2 while continuing to serve /api/v1.",
        "failure": "Replacing an existing version without migration breaks older clients."
      },
      {
        "id": "routes-mounted-subapplications",
        "title": "Mounted subapplications",
        "meaning": "app.mount nests independent ASGI apps with their own docs and lifespan behavior.",
        "change": "Mount /admin and requests route to a different application.",
        "failure": "Confusing mount with include_router leads to missing main OpenAPI operations."
      },
      {
        "id": "routes-host-based-routing-and-proxies",
        "title": "Host-based routing and proxies",
        "meaning": "Starlette can use host-based routing; reverse proxies may apply a base path.",
        "change": "Change root_path or host rules and externally visible URLs change.",
        "failure": "Misconfigured host/proxy rules break docs, redirects, or security boundaries."
      },
      {
        "id": "routes-websocket-routes",
        "title": "WebSocket routes",
        "meaning": "WebSocket endpoints use a protocol upgrade, not an ordinary GET handler.",
        "change": "Add @app.websocket and a socket handshake can be accepted.",
        "failure": "Sending regular HTTP to a WebSocket-only path is not equivalent to connecting."
      },
      {
        "id": "routes-endpoint-dependencies",
        "title": "Endpoint dependencies",
        "meaning": "Dependencies can be set on a single operation or an entire router.",
        "change": "Add a security dependency to a router and every child endpoint enforces it.",
        "failure": "Protect only one endpoint while leaving its sibling routes exposed."
      }
    ],
    "code": "from typing import Annotated\nfrom fastapi import FastAPI, APIRouter, Path, Query\napp = FastAPI()\nrouter = APIRouter(prefix=\"/api/v1\", tags=[\"Items\"])\n\n@router.get(\"/items/{item_id}\")\ndef item(item_id: Annotated[int, Path(gt=0)],\n         verbose: bool = False):\n    return {\"id\": item_id, \"verbose\": verbose}\n\n@router.post(\"/items\", status_code=201)\ndef create_item(name: str):\n    return {\"name\": name}\n\napp.include_router(router)"
  },
  {
    "id": "validation",
    "title": "05 · Pydantic & Request Validation",
    "category": "Backend",
    "lab": "request",
    "topics": [
      {
        "id": "validation-basemodel-and-nested-models",
        "title": "BaseModel and nested models",
        "meaning": "Pydantic validates typed nested request objects and serializes them into structured data.",
        "change": "Make a nested field required and requests missing it return 422.",
        "failure": "Passing an unrelated JSON shape produces structured validation errors."
      },
      {
        "id": "validation-field-constraints",
        "title": "Field constraints",
        "meaning": "Field(gt=0, min_length=...) declares business input constraints.",
        "change": "Set quantity gt=0 and quantity -1 stops before database insertion.",
        "failure": "Loose input rules may allow impossible state into persistence."
      },
      {
        "id": "validation-field-aliases",
        "title": "Field aliases",
        "meaning": "Aliases map external API names to internal model fields.",
        "change": "Rename external camelCase keys without renaming every Python attribute.",
        "failure": "Without explicit alias rules, expected frontend keys may be ignored or rejected."
      },
      {
        "id": "validation-field-validators",
        "title": "Field validators",
        "meaning": "Custom validators enforce rules not captured by simple types.",
        "change": "Add an email domain or cross-field rule and invalid requests return 422.",
        "failure": "Validators that mutate unrelated state cause confusing repeated behavior."
      },
      {
        "id": "validation-model-validators",
        "title": "Model validators",
        "meaning": "Model-level validators compare fields or enforce cross-field invariants.",
        "change": "Require end_date after start_date and reject inconsistent objects.",
        "failure": "Missing cross-field validation allows logically invalid combinations."
      },
      {
        "id": "validation-before-after-and-wrap-modes",
        "title": "Before after and wrap modes",
        "meaning": "Pydantic validators can normalize raw input before coercion and inspect parsed output.",
        "change": "Switch validator stage and input normalization occurs at a different time.",
        "failure": "Converting too eagerly can hide invalid original input."
      },
      {
        "id": "validation-strict-versus-coercive-parsing",
        "title": "Strict versus coercive parsing",
        "meaning": "Strict parsing requires more exact types; default parsing can coerce some values.",
        "change": "Enable strict mode and a string '3' is no longer always accepted as an integer.",
        "failure": "Assuming all string numbers are rejected causes surprising API contracts."
      },
      {
        "id": "validation-unions-discriminators-and-enums",
        "title": "Unions discriminators and enums",
        "meaning": "Union chooses among types; discriminators mark tagged variants; Enum limits allowed values.",
        "change": "Add a new event type and the schema accepts a new tagged payload.",
        "failure": "Overlapping unions can validate a payload as an unintended shape."
      },
      {
        "id": "validation-optional-nullable-and-missing",
        "title": "Optional nullable and missing",
        "meaning": "A value can be omitted, present with null, or present with a concrete value.",
        "change": "Give a field a default and omission becomes accepted.",
        "failure": "Optional[T] alone does not always mean a field may be omitted in Pydantic v2."
      },
      {
        "id": "validation-json-schema-generation",
        "title": "JSON schema generation",
        "meaning": "Typed models produce JSON Schema which FastAPI includes in OpenAPI.",
        "change": "Add a Field description and generated client documentation becomes richer.",
        "failure": "Changing schema keys can break generated frontend clients."
      },
      {
        "id": "validation-settings-management",
        "title": "Settings management",
        "meaning": "pydantic-settings validates environment-driven configuration.",
        "change": "Require a database URL and fail during startup if configuration is missing.",
        "failure": "Use the wrong environment and connect to production from local tests."
      }
    ],
    "code": "from typing import Annotated\nfrom pydantic import BaseModel, Field, field_validator\nfrom fastapi import FastAPI\n\nclass ItemIn(BaseModel):\n    name: str = Field(min_length=2)\n    price: float = Field(gt=0)\n\n    @field_validator(\"name\")\n    @classmethod\n    def trim_name(cls, value: str) -> str:\n        return value.strip()\n\napp = FastAPI()\n@app.post(\"/items\", status_code=201)\ndef create(item: ItemIn):\n    return item"
  },
  {
    "id": "responses",
    "title": "06 · Responses, Errors & Files",
    "category": "Backend",
    "lab": "request",
    "topics": [
      {
        "id": "responses-response-model-and-output-filtering",
        "title": "response_model and output filtering",
        "meaning": "Response models validate and filter returned data to the declared public shape.",
        "change": "Exclude password_hash from the response model and it is never serialized to clients.",
        "failure": "Returning database objects without response filtering can expose private columns."
      },
      {
        "id": "responses-jsonresponse-htmlresponse-fileresponse",
        "title": "JSONResponse HTMLResponse FileResponse",
        "meaning": "Response classes control headers, media types and body representation.",
        "change": "Switch to HTMLResponse and a browser renders HTML rather than JSON.",
        "failure": "Mismatched Content-Type can cause clients to parse a response incorrectly."
      },
      {
        "id": "responses-streamingresponse",
        "title": "StreamingResponse",
        "meaning": "StreamingResponse sends chunks incrementally rather than buffering the entire output.",
        "change": "Stream generated reports instead of building one enormous response in RAM.",
        "failure": "A slow or disconnected client requires generator cleanup and backpressure thinking."
      },
      {
        "id": "responses-httpexception-and-custom-handlers",
        "title": "HTTPException and custom handlers",
        "meaning": "Raise HTTPException for expected errors; exception handlers centralize responses.",
        "change": "Add a 404 handler and all missing-resource errors use a consistent shape.",
        "failure": "Catching unexpected errors and returning 200 hides broken code."
      },
      {
        "id": "responses-validation-error-details",
        "title": "Validation error details",
        "meaning": "422 errors locate invalid path/query/body fields with structured details.",
        "change": "Change input constraints and the error loc path changes to the violated field.",
        "failure": "Displaying raw internal exception traces to clients can leak information."
      },
      {
        "id": "responses-response-headers-and-cookies",
        "title": "Response headers and cookies",
        "meaning": "Handlers can set cache, download, security and cookie headers.",
        "change": "Mark a cookie HttpOnly Secure SameSite and browsers enforce different handling.",
        "failure": "Setting Secure incorrectly in local HTTP development can make cookies appear missing."
      },
      {
        "id": "responses-redirectresponse",
        "title": "RedirectResponse",
        "meaning": "Redirects send 3xx status plus Location for client navigation.",
        "change": "Return 307 or 308 to preserve method during a redirect.",
        "failure": "Unexpected redirects can drop auth in a cross-origin client flow."
      },
      {
        "id": "responses-uploads-and-multipart-forms",
        "title": "Uploads and multipart forms",
        "meaning": "UploadFile handles incoming files, usually via multipart/form-data.",
        "change": "Add a file size/content-type policy and malformed uploads are rejected.",
        "failure": "Trusting filenames or declared MIME types alone is unsafe."
      },
      {
        "id": "responses-static-files-and-templates",
        "title": "Static files and templates",
        "meaning": "StaticFiles serves assets; Jinja2Templates renders server-side HTML.",
        "change": "Mount /static and add templates when server-rendered content is needed.",
        "failure": "Serving private files as public static assets exposes information."
      },
      {
        "id": "responses-pagination-and-filtering",
        "title": "Pagination and filtering",
        "meaning": "Paging, sorting and filters bound response size and improve UX.",
        "change": "Change offset to cursor pagination and the next-page contract changes.",
        "failure": "Unbounded collection endpoints create latency and memory pressure."
      }
    ],
    "code": "from fastapi import FastAPI, HTTPException, Response\nfrom pydantic import BaseModel\napp = FastAPI()\nclass PublicUser(BaseModel):\n    id: int\n    username: str\n\n@app.get(\"/users/{id}\", response_model=PublicUser)\ndef user(id: int, response: Response):\n    if id != 1:\n        raise HTTPException(404, \"Not found\")\n    response.headers[\"Cache-Control\"] = \"private, no-store\"\n    return {\"id\": 1, \"username\": \"ada\", \"password_hash\": \"hidden\"}"
  },
  {
    "id": "dependencies",
    "title": "07 · Dependency Injection & Middleware",
    "category": "Backend",
    "lab": "request",
    "topics": [
      {
        "id": "dependencies-depends-and-annotated",
        "title": "Depends and Annotated",
        "meaning": "Depends declares resources and shared rules FastAPI resolves before calling an endpoint.",
        "change": "Add Depends(get_db) and the endpoint receives a session automatically.",
        "failure": "Forget to add Depends and FastAPI may parse the parameter as user input instead."
      },
      {
        "id": "dependencies-dependency-graphs",
        "title": "Dependency graphs",
        "meaning": "Dependencies can depend on other dependencies and form a reusable graph.",
        "change": "Add get_current_user under require_admin and access control runs transitively.",
        "failure": "A failing shared dependency short-circuits endpoint execution."
      },
      {
        "id": "dependencies-per-request-dependency-caching",
        "title": "Per-request dependency caching",
        "meaning": "Repeated matching dependencies are normally evaluated once per request.",
        "change": "Set use_cache=False and repeated dependencies can execute again.",
        "failure": "Unexpected database queries appear if caching is disabled without reason."
      },
      {
        "id": "dependencies-yield-cleanup",
        "title": "Yield cleanup",
        "meaning": "Dependencies with yield acquire resources and release them at the proper lifecycle phase.",
        "change": "Use yield for DB session cleanup and connections are returned when the request finishes.",
        "failure": "Closing a session too early breaks streaming that still needs database access."
      },
      {
        "id": "dependencies-dependency-overrides-for-tests",
        "title": "Dependency overrides for tests",
        "meaning": "app.dependency_overrides lets tests replace external integrations.",
        "change": "Override get_db with an isolated test DB and production data remains untouched.",
        "failure": "Tests that forget to clear overrides contaminate later results."
      },
      {
        "id": "dependencies-function-middleware",
        "title": "Function middleware",
        "meaning": "Middleware wraps request and response handling for logging, timing and headers.",
        "change": "Add a middleware and it observes eligible requests before and after routing.",
        "failure": "Reading request bodies incorrectly in middleware can interfere with downstream code."
      },
      {
        "id": "dependencies-cors-middleware",
        "title": "CORS middleware",
        "meaning": "CORSMiddleware returns headers browsers check before sharing responses with frontend JS.",
        "change": "Specify the correct allowed origin and credential policy.",
        "failure": "A permissive wildcard configuration can expose unintended cross-origin access."
      },
      {
        "id": "dependencies-trustedhost-and-https-redirect",
        "title": "TrustedHost and HTTPS redirect",
        "meaning": "Host and HTTPS middleware add inbound-host and scheme constraints.",
        "change": "Enable trusted hosts and unexpected Host headers are rejected.",
        "failure": "Misconfigured forwarding can cause endless redirects behind a proxy."
      },
      {
        "id": "dependencies-contextvars-and-request-ids",
        "title": "Contextvars and request IDs",
        "meaning": "Request-scoped context can carry trace/correlation identifiers across async functions.",
        "change": "Add X-Request-ID and logs from one request become traceable.",
        "failure": "Global variables reused across requests cause data contamination."
      },
      {
        "id": "dependencies-middleware-order",
        "title": "Middleware order",
        "meaning": "ASGI middleware is nested; ordering determines which wrapper runs first.",
        "change": "Move error, CORS, and tracing middleware and behavior at failure boundaries changes.",
        "failure": "A middleware installed in the wrong layer may omit headers on errors."
      }
    ],
    "code": "from typing import Annotated\nfrom fastapi import Depends, FastAPI, HTTPException\napp = FastAPI()\n\ndef get_current_user():\n    return {\"name\": \"ada\", \"role\": \"viewer\"}\n\ndef require_admin(user=Depends(get_current_user)):\n    if user[\"role\"] != \"admin\":\n        raise HTTPException(403, \"Forbidden\")\n    return user\n\n@app.get(\"/admin\")\ndef admin(user: Annotated[dict, Depends(require_admin)]):\n    return {\"hello\": user[\"name\"]}"
  },
  {
    "id": "auth",
    "title": "08 · Authentication, Tokens & Authorization",
    "category": "Security",
    "lab": "auth",
    "topics": [
      {
        "id": "auth-authentication-versus-authorization",
        "title": "Authentication versus authorization",
        "meaning": "Authentication establishes identity; authorization decides the identity's permitted actions.",
        "change": "Log in as a different role and allowed API actions change.",
        "failure": "A valid token proves neither admin privileges nor access to every resource."
      },
      {
        "id": "auth-password-hashing-and-argon2",
        "title": "Password hashing and Argon2",
        "meaning": "Password hashing protects stored credentials; Argon2 is a modern password hashing choice.",
        "change": "Change raw password handling to salted hashing and the DB stores hashes not passwords.",
        "failure": "Encrypting or hashing with a fast general-purpose hash is inappropriate for password storage."
      },
      {
        "id": "auth-bearer-tokens",
        "title": "Bearer tokens",
        "meaning": "A client sends Authorization: Bearer <token> and an authentication dependency validates it.",
        "change": "Remove the header and protected endpoints return 401.",
        "failure": "Treating presence of any string as proof of valid authentication is insecure."
      },
      {
        "id": "auth-jwt-header-payload-signature",
        "title": "JWT header payload signature",
        "meaning": "JWT commonly consists of encoded header, claims payload and a cryptographic signature.",
        "change": "Change one claim after signing and signature verification must reject the token.",
        "failure": "Decoding base64 without signature validation is NOT token verification."
      },
      {
        "id": "auth-jwt-expiration-nbf-iat",
        "title": "JWT expiration nbf iat",
        "meaning": "Claims exp, nbf and iat describe expiration, not-before and issuance time.",
        "change": "Advance the clock past exp and a correctly validating API rejects the JWT.",
        "failure": "Ignoring exp or large clock skew permits stale credentials."
      },
      {
        "id": "auth-jwt-issuer-audience-subject",
        "title": "JWT issuer audience subject",
        "meaning": "Claims iss, aud and sub bind tokens to the issuer, intended service and subject.",
        "change": "Change audience and the wrong target API must reject the token.",
        "failure": "An API accepts a signed token that was intended for a different service."
      },
      {
        "id": "auth-jwt-signing-algorithms-and-key-rotation",
        "title": "JWT signing algorithms and key rotation",
        "meaning": "Algorithms such as HS256 and RS256 differ in key ownership and trust boundaries.",
        "change": "Rotate signing keys and validate using trusted key IDs while old tokens age out.",
        "failure": "Trusting an unapproved alg or arbitrary jku/JWKS URL creates verification risk."
      },
      {
        "id": "auth-access-versus-refresh-tokens",
        "title": "Access versus refresh tokens",
        "meaning": "Short-lived access tokens authorize API requests; refresh tokens obtain new access tokens.",
        "change": "Expire access token then use a valid refresh token to issue replacement credentials.",
        "failure": "Long-lived refresh tokens in browser storage can extend an account compromise."
      },
      {
        "id": "auth-refresh-rotation-and-revocation",
        "title": "Refresh rotation and revocation",
        "meaning": "Rotation replaces refresh credentials; revocation invalidates them server-side.",
        "change": "Reuse a previously rotated refresh token and a secure implementation detects it.",
        "failure": "Stateless JWT access tokens are not instantly revoked without extra mechanisms."
      },
      {
        "id": "auth-oauth-2-0-authorization-code",
        "title": "OAuth 2.0 authorization code",
        "meaning": "Authorization code flow delegates user authorization to an identity provider.",
        "change": "Start authorization, receive a code, exchange it securely for tokens.",
        "failure": "Mixing OAuth authorization with proof of identity without OIDC validation is wrong."
      },
      {
        "id": "auth-pkce-code-verifier-and-challenge",
        "title": "PKCE code verifier and challenge",
        "meaning": "PKCE binds authorization-code exchange to the originating client.",
        "change": "Provide the matching verifier in the token exchange and the authorization succeeds.",
        "failure": "An intercepted authorization code alone should not redeem without the verifier."
      },
      {
        "id": "auth-openid-connect-and-id-tokens",
        "title": "OpenID Connect and ID tokens",
        "meaning": "OIDC adds authenticated identity and an ID token atop OAuth.",
        "change": "Validate an ID token with issuer, audience, nonce and signature checks.",
        "failure": "An access token is not interchangeable with an ID token."
      },
      {
        "id": "auth-oauth-scopes-and-consent",
        "title": "OAuth scopes and consent",
        "meaning": "Scopes represent delegated API permissions requested or granted by an authorization server.",
        "change": "Remove write:items scope and writes should fail even if identity remains valid.",
        "failure": "Checking login alone while ignoring required scopes over-grants access."
      },
      {
        "id": "auth-roles-and-permissions-rbac-abac",
        "title": "Roles and permissions RBAC ABAC",
        "meaning": "RBAC groups permissions by role; ABAC considers user, resource and context.",
        "change": "Change role from viewer to editor and POST may become allowed.",
        "failure": "Checking only a client-supplied role field lets users elevate privileges."
      },
      {
        "id": "auth-api-keys-and-service-accounts",
        "title": "API keys and service accounts",
        "meaning": "API keys identify callers; service accounts authenticate non-human workloads.",
        "change": "Replace user tokens with a scoped service credential for machine integrations.",
        "failure": "Hard-coded or logged API keys can be stolen and replayed."
      },
      {
        "id": "auth-sessions-and-httponly-cookies",
        "title": "Sessions and HttpOnly cookies",
        "meaning": "Server-side sessions use an opaque cookie to look up state; HttpOnly limits JS access.",
        "change": "Revoke the server session and a stale cookie no longer authorizes requests.",
        "failure": "CSRF protections must be considered for cookie-authenticated writes."
      },
      {
        "id": "auth-csrf-xss-and-cors",
        "title": "CSRF XSS and CORS",
        "meaning": "CSRF abuses ambient credentials; XSS executes attacker script; CORS is a browser isolation policy.",
        "change": "Enable appropriate CSRF token, SameSite cookie, CSP and input output safeguards.",
        "failure": "CORS by itself does not prevent CSRF or malicious backend clients."
      },
      {
        "id": "auth-401-versus-403",
        "title": "401 versus 403",
        "meaning": "401 indicates missing or invalid authentication; 403 indicates a known identity lacks access.",
        "change": "Remove a token to get 401; add a valid viewer token to an admin route to get 403.",
        "failure": "Returning 403 to every unauthenticated user complicates correct login flows."
      },
      {
        "id": "auth-oidc-discovery-and-jwks",
        "title": "OIDC discovery and JWKS",
        "meaning": "OIDC discovery describes identity provider endpoints; JWKS publishes public verification keys.",
        "change": "Rotate provider keys and update trusted JWKS cache to validate new signatures.",
        "failure": "Do not download arbitrary JWKS addresses supplied inside untrusted tokens."
      },
      {
        "id": "auth-sso-saml-and-enterprise-federation",
        "title": "SSO SAML and enterprise federation",
        "meaning": "Single sign-on delegates credentials to an identity provider; SAML is another enterprise federation protocol.",
        "change": "Connect an enterprise IdP and users can access several applications with centralized identity.",
        "failure": "Skipping assertion signature, audience or replay checks defeats federation security."
      },
      {
        "id": "auth-mfa-passkeys-and-webauthn",
        "title": "MFA passkeys and WebAuthn",
        "meaning": "MFA demands an additional factor; passkeys use public-key authentication.",
        "change": "Enable phishing-resistant authentication and password-only attackers lose a path.",
        "failure": "Treating SMS as equally phishing-resistant as FIDO2/WebAuthn is misleading."
      }
    ],
    "code": "from datetime import datetime, timedelta, timezone\nimport jwt  # pip install PyJWT\nfrom fastapi import Depends, HTTPException, status\nfrom fastapi.security import OAuth2PasswordBearer\n\noauth2_scheme = OAuth2PasswordBearer(tokenUrl=\"/auth/token\")\n\ndef issue_access_token(secret: str, subject: str):\n    return jwt.encode({\n        \"sub\": subject, \"iss\": \"my-api\", \"aud\": \"my-web\",\n        \"exp\": datetime.now(timezone.utc) + timedelta(minutes=15),\n    }, secret, algorithm=\"HS256\")\n\ndef verify_access_token(token: str, secret: str):\n    try:\n        return jwt.decode(token, secret, algorithms=[\"HS256\"],\n                          issuer=\"my-api\", audience=\"my-web\")\n    except jwt.PyJWTError:\n        raise HTTPException(status.HTTP_401_UNAUTHORIZED, \"Invalid token\")"
  },
  {
    "id": "database",
    "title": "09 · Databases, ORMs & Migrations",
    "category": "Data",
    "lab": "database",
    "topics": [
      {
        "id": "database-relational-database-fundamentals",
        "title": "Relational database fundamentals",
        "meaning": "Tables, primary keys and foreign keys express persistent relationships.",
        "change": "Add a foreign key and the database rejects broken references.",
        "failure": "Treating all IDs as free-text loses referential integrity."
      },
      {
        "id": "database-sqlite-and-postgresql",
        "title": "SQLite and PostgreSQL",
        "meaning": "SQLite is embedded for simple use; PostgreSQL supports multi-client production workloads.",
        "change": "Change the database URL and a compatible ORM can connect to a different engine.",
        "failure": "SQLite-specific shortcuts may not scale to production contention."
      },
      {
        "id": "database-sqlalchemy-2-x-orm-mapping",
        "title": "SQLAlchemy 2.x ORM mapping",
        "meaning": "Mapped classes correspond to tables and tracked rows.",
        "change": "Add a mapped column and the Python representation changes, but DB needs migration.",
        "failure": "Adding ORM fields does not automatically update an existing production table."
      },
      {
        "id": "database-sqlmodel-integration",
        "title": "SQLModel integration",
        "meaning": "SQLModel combines Pydantic and SQLAlchemy ideas for common API models.",
        "change": "Swap to SQLModel and model declaration style becomes more concise.",
        "failure": "Using the same public input schema for every database shape leaks internal columns."
      },
      {
        "id": "database-session-lifecycle",
        "title": "Session lifecycle",
        "meaning": "A session tracks DB operations, flushes SQL and participates in transactions.",
        "change": "Create one session per request and clean it with a yield dependency.",
        "failure": "Sharing Session or AsyncSession across concurrent tasks can cause failures."
      },
      {
        "id": "database-transactions-commit-rollback",
        "title": "Transactions commit rollback",
        "meaning": "A transaction groups several writes into a single all-or-nothing unit.",
        "change": "Add rollback after a failure and no partial order is committed.",
        "failure": "Committing after each row can leave half-finished business actions."
      },
      {
        "id": "database-relationships-and-joins",
        "title": "Relationships and joins",
        "meaning": "Joins and ORM relationships connect entities through keys.",
        "change": "Add relationship loading and one API response may include child objects.",
        "failure": "Unbounded lazy loads can trigger N+1 query problems."
      },
      {
        "id": "database-indexes-and-query-plans",
        "title": "Indexes and query plans",
        "meaning": "Indexes speed some lookups at storage/write cost; plans reveal database work.",
        "change": "Add an index for frequent filtering and query execution may change.",
        "failure": "Index every column and inserts slow while disk use grows."
      },
      {
        "id": "database-pagination-and-cursor-indexes",
        "title": "Pagination and cursor indexes",
        "meaning": "Pagination keeps large result sets manageable; stable ordering is essential.",
        "change": "Switch OFFSET to a cursor and deep-page performance can improve.",
        "failure": "Unstable sorting causes duplicate or skipped rows between pages."
      },
      {
        "id": "database-alembic-schema-migrations",
        "title": "Alembic schema migrations",
        "meaning": "Migration revisions incrementally evolve database schemas across environments.",
        "change": "Add a nullable column migration then upgrade the DB safely.",
        "failure": "Editing ORM models without migration makes code and schema diverge."
      },
      {
        "id": "database-connection-pooling",
        "title": "Connection pooling",
        "meaning": "Pools reuse DB connections instead of opening one per request.",
        "change": "Increase pool size carefully to handle planned concurrency.",
        "failure": "An excessive pool can overwhelm PostgreSQL max_connections."
      },
      {
        "id": "database-async-sqlalchemy-and-asyncpg",
        "title": "Async SQLAlchemy and asyncpg",
        "meaning": "AsyncSession uses async-capable drivers for non-blocking database I/O.",
        "change": "Switch engine, session and driver together for an async DB path.",
        "failure": "Using a synchronous driver inside async code can block the event loop."
      },
      {
        "id": "database-n-1-and-eager-loading",
        "title": "N+1 and eager loading",
        "meaning": "N+1 happens when fetching a list triggers another query per row.",
        "change": "Use selectinload to reduce queries and improve response time.",
        "failure": "Unchecked eager loading can also load too much unrelated data."
      },
      {
        "id": "database-optimistic-locking",
        "title": "Optimistic locking",
        "meaning": "A version column detects concurrent changes before overwriting data.",
        "change": "Add version checking and stale updates return a conflict.",
        "failure": "Last-write-wins without detection silently loses an editor's changes."
      },
      {
        "id": "database-nosql-redis-and-document-stores",
        "title": "NoSQL Redis and document stores",
        "meaning": "Redis supports caching and ephemeral state; document stores serve different access patterns.",
        "change": "Add a cache and read paths may avoid the primary DB for hot data.",
        "failure": "Treat a cache as an authoritative record and stale data corrupts decisions."
      },
      {
        "id": "database-db-migrations-zero-downtime",
        "title": "DB migrations zero downtime",
        "meaning": "Backward-compatible expand/migrate/contract changes support rolling deployments.",
        "change": "Add a new optional column before switching readers and writers.",
        "failure": "Dropping columns while old application workers still use them causes outages."
      }
    ],
    "code": "from sqlalchemy import create_engine, select\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session\n\nclass Base(DeclarativeBase): pass\nclass Item(Base):\n    __tablename__ = \"items\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    name: Mapped[str]\n\nengine = create_engine(\"sqlite:///./app.db\")\nBase.metadata.create_all(engine)  # Demonstration only: use Alembic for real migrations\nwith Session(engine) as db, db.begin():\n    db.add(Item(name=\"Notebook\"))\nwith Session(engine) as db:\n    print(db.scalars(select(Item)).all())"
  },
  {
    "id": "async",
    "title": "10 · Async, WebSockets & Streaming",
    "category": "Backend",
    "lab": "async",
    "topics": [
      {
        "id": "async-coroutines-and-await",
        "title": "Coroutines and await",
        "meaning": "An async def creates a coroutine; await suspends it during compatible asynchronous work.",
        "change": "Run multiple awaited network waits and overlapping I/O reduces total wall time.",
        "failure": "CPU-bound loops still block the event loop without separate execution."
      },
      {
        "id": "async-sync-versus-async-endpoints",
        "title": "Sync versus async endpoints",
        "meaning": "FastAPI uses a thread pool for sync def handlers and the event loop for async def.",
        "change": "Change blocking code to a supported sync route or use non-blocking async clients.",
        "failure": "Putting blocking requests calls inside async def stops other coroutines."
      },
      {
        "id": "async-event-loop-tasks-and-gather",
        "title": "Event loop tasks and gather",
        "meaning": "Tasks schedule independent coroutine work, gather joins results.",
        "change": "Use asyncio.gather for independent API calls and observe overlap.",
        "failure": "Fire-and-forget tasks without lifecycle management can lose errors on shutdown."
      },
      {
        "id": "async-timeouts-cancellation-shielding",
        "title": "Timeouts cancellation shielding",
        "meaning": "Timeouts limit waits and cancellation signals unneeded work to stop.",
        "change": "Add asyncio.timeout and a slow dependency returns a controlled error.",
        "failure": "Suppressing cancellation can make shutdowns or disconnect handling hang."
      },
      {
        "id": "async-thread-pools-and-cpu-bound-tasks",
        "title": "Thread pools and CPU-bound tasks",
        "meaning": "Blocking sync work can use threads; heavy CPU computation often needs processes/workers.",
        "change": "Move expensive inference to a task worker and HTTP returns quickly.",
        "failure": "Threads do not magically parallelize CPU-bound pure-Python code."
      },
      {
        "id": "async-websocket-handshake-messages",
        "title": "WebSocket handshake messages",
        "meaning": "WebSocket upgrades a connection and supports two-way message streams.",
        "change": "Connect, send and close and the server maintains a live conversation.",
        "failure": "A closed socket must be handled; otherwise broadcasts fail."
      },
      {
        "id": "async-server-sent-events",
        "title": "Server-Sent Events",
        "meaning": "SSE streams one-way server events over HTTP for live dashboards.",
        "change": "Swap polling for SSE and the browser receives pushed updates.",
        "failure": "Reverse-proxy buffering can prevent events from appearing promptly."
      },
      {
        "id": "async-streaming-and-backpressure",
        "title": "Streaming and backpressure",
        "meaning": "Streaming sends bytes gradually; backpressure slows producers when consumers lag.",
        "change": "Lower consumer read speed and observe a growing queue or paused producer.",
        "failure": "Unbounded queues can exhaust application memory."
      },
      {
        "id": "async-connection-managers",
        "title": "Connection managers",
        "meaning": "Connection managers track active WebSocket clients and shared subscriptions.",
        "change": "Add a new subscriber and broadcast fan-out changes.",
        "failure": "In-memory managers do not work across multiple instances without shared pub/sub."
      },
      {
        "id": "async-graceful-shutdown",
        "title": "Graceful shutdown",
        "meaning": "Shutdown stops new work and drains or cancels active tasks before closing resources.",
        "change": "Add cleanup hooks and resources release consistently.",
        "failure": "Abrupt termination can abandon in-flight operations."
      }
    ],
    "code": "import asyncio\nfrom fastapi import FastAPI, WebSocket\napp = FastAPI()\n\nasync def read_partner(name: str):\n    await asyncio.sleep(0.2)  # Simulates I/O, not a real API request\n    return name\n\n@app.get(\"/aggregate\")\nasync def aggregate():\n    return await asyncio.gather(read_partner(\"A\"), read_partner(\"B\"))\n\n@app.websocket(\"/ws\")\nasync def ws(socket: WebSocket):\n    await socket.accept()\n    try:\n        while True:\n            await socket.send_text(await socket.receive_text())\n    except Exception:\n        await socket.close()"
  },
  {
    "id": "frontend",
    "title": "11 · React & TypeScript",
    "category": "Frontend",
    "lab": "fullstack",
    "topics": [
      {
        "id": "frontend-html-css-and-browser-dom",
        "title": "HTML CSS and browser DOM",
        "meaning": "HTML provides structure; CSS styles it; browser events respond to interaction.",
        "change": "Add a form control and the page can collect user input before an API call.",
        "failure": "Using only decorative buttons without handlers creates dead-end interfaces."
      },
      {
        "id": "frontend-typescript-basics",
        "title": "TypeScript basics",
        "meaning": "TypeScript checks data shapes and function contracts before compilation.",
        "change": "Change an API response type and the frontend compiler can flag incompatible usage.",
        "failure": "Types disappear at runtime; client code still must handle untrusted network data."
      },
      {
        "id": "frontend-react-components-and-props",
        "title": "React components and props",
        "meaning": "Components turn UI into reusable functions accepting props.",
        "change": "Add an ItemCard component and a list renders one card per item.",
        "failure": "Mutating props directly breaks predictable component behavior."
      },
      {
        "id": "frontend-usestate-and-controlled-inputs",
        "title": "useState and controlled inputs",
        "meaning": "React state captures mutable UI values and re-renders when set.",
        "change": "Edit a controlled input and the next request body reflects the new state.",
        "failure": "Reading stale state immediately after an update can give old values."
      },
      {
        "id": "frontend-useeffect-and-subscriptions",
        "title": "useEffect and subscriptions",
        "meaning": "Effects synchronize with outside systems and clean up subscriptions.",
        "change": "Add an effect cleanup and old listeners are removed on unmount.",
        "failure": "Unmanaged effects can cause duplicate API calls and memory leaks."
      },
      {
        "id": "frontend-react-router",
        "title": "React Router",
        "meaning": "Client-side routing maps URLs to components without full page reloads.",
        "change": "Add /items/:id and the frontend shows a detail view.",
        "failure": "A frontend route is not the same as a FastAPI backend route."
      },
      {
        "id": "frontend-forms-and-schema-validation",
        "title": "Forms and schema validation",
        "meaning": "Forms collect, validate and submit structured user values.",
        "change": "Require a price and show inline errors before sending.",
        "failure": "Client validation is optional convenience; server validation remains required."
      },
      {
        "id": "frontend-fetch-api-and-abortcontroller",
        "title": "Fetch API and AbortController",
        "meaning": "fetch sends HTTP requests; AbortController cancels obsolete work.",
        "change": "Navigate away during a request and abort a stale fetch.",
        "failure": "Trying to parse an empty 204 response as JSON throws."
      },
      {
        "id": "frontend-tanstack-query-and-caching",
        "title": "TanStack Query and caching",
        "meaning": "A server-state library caches requests and tracks staleness, loading and errors.",
        "change": "Invalidate an items query after POST and the list refreshes.",
        "failure": "Using stale cache indefinitely can show an item after it was deleted."
      },
      {
        "id": "frontend-react-accessibility",
        "title": "React accessibility",
        "meaning": "Semantic elements, focus state and ARIA make controls usable with keyboard and assistive tech.",
        "change": "Make a card a button and keyboard users can activate it.",
        "failure": "Clickable divs without keyboard or focus behavior exclude users."
      },
      {
        "id": "frontend-error-boundaries-and-suspense",
        "title": "Error boundaries and suspense",
        "meaning": "Boundaries manage rendering errors; Suspense coordinates supported async UI.",
        "change": "Add fallback components for loading and failures.",
        "failure": "An error boundary does not catch every async event handler exception."
      },
      {
        "id": "frontend-build-tooling-vite",
        "title": "Build tooling Vite",
        "meaning": "Vite develops and bundles TypeScript and React for deployment.",
        "change": "Set VITE_API_URL and client requests target the configured backend.",
        "failure": "Bundling secrets in VITE_ variables exposes them to every browser."
      }
    ],
    "code": "type Item = { id: number; name: string };\n\nasync function loadItems(signal?: AbortSignal): Promise<Item[]> {\n  const response = await fetch('/api/items', { signal });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  return response.json();\n}\n\n// Browser UI state, route state, and server state are different concerns.\n// Validate API responses at runtime where correctness matters."
  },
  {
    "id": "integration",
    "title": "12 · React ↔ FastAPI Integration",
    "category": "Full Stack",
    "lab": "fullstack",
    "topics": [
      {
        "id": "integration-full-request-round-trip",
        "title": "Full request round trip",
        "meaning": "A frontend event triggers HTTP; the backend validates and fetches data; React renders the response.",
        "change": "Click Save and trace every step from DOM to database and back.",
        "failure": "A missing backend route returns 404 although the frontend page loads."
      },
      {
        "id": "integration-cors-and-preflight",
        "title": "CORS and preflight",
        "meaning": "Browsers enforce cross-origin access and may send OPTIONS before a request.",
        "change": "Add the precise frontend origin and the preflight succeeds.",
        "failure": "Changing CORS on the browser cannot authorize a server that denies it."
      },
      {
        "id": "integration-api-contract-and-generated-clients",
        "title": "API contract and generated clients",
        "meaning": "OpenAPI describes shared schemas used by frontend type generators.",
        "change": "Change a backend field and regenerate the typed client to catch mismatches.",
        "failure": "Frontend and backend versions drift if contracts are not tested."
      },
      {
        "id": "integration-login-and-token-storage",
        "title": "Login and token storage",
        "meaning": "The UI gathers credentials and sends an appropriately protected request.",
        "change": "Switch from Authorization header to HttpOnly cookie and transport/CSRF rules change.",
        "failure": "Storing long-lived tokens in localStorage increases exposure after XSS."
      },
      {
        "id": "integration-loading-empty-error-and-success",
        "title": "Loading empty error and success",
        "meaning": "Every async UI needs distinct waiting, empty, failure and success states.",
        "change": "Force 500 or 404 and the interface should show a helpful error rather than a blank area.",
        "failure": "Only testing the happy path leaves users stuck on errors."
      },
      {
        "id": "integration-optimistic-updates",
        "title": "Optimistic updates",
        "meaning": "Optimistic UI immediately updates the screen and rolls back if the API rejects.",
        "change": "Delete an item optimistically then simulate 409 to see the rollback.",
        "failure": "Without rollback, UI claims a change persisted when it did not."
      },
      {
        "id": "integration-file-upload-end-to-end",
        "title": "File upload end-to-end",
        "meaning": "Forms send multipart data; backend validates and stores it appropriately.",
        "change": "Add a file to the request and track progress and validation.",
        "failure": "Trusting client file extensions invites unsafe uploads."
      },
      {
        "id": "integration-pagination-filtering-sorting",
        "title": "Pagination filtering sorting",
        "meaning": "UI control state becomes query parameters and DB query clauses.",
        "change": "Change page size and backend response content changes.",
        "failure": "An unindexed sort across huge data sets can degrade performance."
      },
      {
        "id": "integration-react-deployment-and-base-urls",
        "title": "React deployment and base URLs",
        "meaning": "Frontend static assets and API services may deploy to different origins.",
        "change": "Point the built SPA at correct API URL or same-origin proxy.",
        "failure": "Hard-coded localhost URLs break for real users."
      },
      {
        "id": "integration-error-contracts-and-retry-ux",
        "title": "Error contracts and retry UX",
        "meaning": "An error shape and retry policy align frontend behavior with backend outcomes.",
        "change": "Set 429 with Retry-After and the UI delays and retries responsibly.",
        "failure": "Blindly retrying non-idempotent POST can create duplicates."
      },
      {
        "id": "integration-websocket-reconnect",
        "title": "WebSocket reconnect",
        "meaning": "The frontend can re-establish a dropped socket and resubscribe.",
        "change": "Simulate network loss and watch reconnect/backoff states.",
        "failure": "Immediate infinite retry loops overload a recovering server."
      }
    ],
    "code": "// React client -> HTTP -> FastAPI -> database -> JSON -> React\nconst response = await fetch(`${API_BASE}/api/items`, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'New item' }),\n});\nif (!response.ok) {\n  const problem = await response.json().catch(() => ({}));\n  throw new Error(problem.detail ?? `HTTP ${response.status}`);\n}\nconst created = await response.json();"
  },
  {
    "id": "testing",
    "title": "13 · Testing, TDD & Contract Safety",
    "category": "Quality",
    "lab": "request",
    "topics": [
      {
        "id": "testing-unit-tests-and-fixtures",
        "title": "Unit tests and fixtures",
        "meaning": "Unit tests isolate business logic; fixtures create reusable setup and cleanup.",
        "change": "Replace external DB calls with fixtures and tests become repeatable.",
        "failure": "Tests using production credentials can damage real resources."
      },
      {
        "id": "testing-fastapi-testclient",
        "title": "FastAPI TestClient",
        "meaning": "TestClient exercises ASGI routes without opening a public server.",
        "change": "Add a test for unknown routes and assert 404.",
        "failure": "Testing only the Python function bypasses dependency and HTTP validation paths."
      },
      {
        "id": "testing-asyncclient-and-asgitransport",
        "title": "AsyncClient and ASGITransport",
        "meaning": "HTTPX can test async ASGI apps and concurrent request workflows.",
        "change": "Use ASGITransport with test lifespan handling and avoid external network dependencies.",
        "failure": "Forgetting startup/lifespan can leave test resources uninitialized."
      },
      {
        "id": "testing-dependency-overrides",
        "title": "Dependency overrides",
        "meaning": "Tests replace get_db, auth or outbound API dependencies.",
        "change": "Inject a fake user and test 403 behavior deterministically.",
        "failure": "Leaving overrides configured after a test can contaminate the suite."
      },
      {
        "id": "testing-integration-tests-with-temporary-db",
        "title": "Integration tests with temporary DB",
        "meaning": "Integration tests verify route, transaction and persistence together.",
        "change": "Use an isolated test database and verify commit or rollback.",
        "failure": "Tests depending on previous suite data become flaky."
      },
      {
        "id": "testing-contract-testing-and-openapi",
        "title": "Contract testing and OpenAPI",
        "meaning": "Contracts check status codes, paths and schemas shared by clients.",
        "change": "Remove a response field and a compatibility test catches the breaking change.",
        "failure": "Schema snapshots without review can bless accidental API changes."
      },
      {
        "id": "testing-playwright-end-to-end-tests",
        "title": "Playwright end-to-end tests",
        "meaning": "Browser tests exercise React forms, networking and accessibility flows.",
        "change": "Click Save and assert the item appears and persists on reload.",
        "failure": "Mocking all network behavior hides real cross-origin or backend failures."
      },
      {
        "id": "testing-property-based-and-fuzz-testing",
        "title": "Property-based and fuzz testing",
        "meaning": "Generated inputs explore combinations developers might not anticipate.",
        "change": "Feed random invalid payloads and confirm no unhandled 500 error.",
        "failure": "Invalid strings can expose validation gaps that happy-path tests miss."
      },
      {
        "id": "testing-security-tests",
        "title": "Security tests",
        "meaning": "Tests probe unauthorized access, scopes, injection, CSRF, rate limiting and leaks.",
        "change": "Remove the admin scope and assert protected route returns 403.",
        "failure": "A route passes happy-path auth but leaks other users' records."
      },
      {
        "id": "testing-load-and-performance-tests",
        "title": "Load and performance tests",
        "meaning": "Load tests expose queueing, latency and saturation with realistic traffic patterns.",
        "change": "Increase concurrent users and observe latency and error rates.",
        "failure": "Treating synthetic frontend animation timings as production benchmarks is misleading."
      },
      {
        "id": "testing-test-pyramid-and-ci-gates",
        "title": "Test pyramid and CI gates",
        "meaning": "Balance unit, integration and browser coverage; CI blocks regressions.",
        "change": "Add a failing test and deployment should stop.",
        "failure": "Only running tests locally allows regressions to merge unnoticed."
      }
    ],
    "code": "from fastapi.testclient import TestClient\nfrom app.main import app\n\ndef test_health():\n    response = TestClient(app).get(\"/health\")\n    assert response.status_code == 200\n    assert response.json()[\"status\"] == \"ok\"\n\ndef test_unknown_route():\n    assert TestClient(app).get(\"/does-not-exist\").status_code == 404"
  },
  {
    "id": "workers",
    "title": "14 · Workers, Queues & Jobs",
    "category": "Backend",
    "lab": "async",
    "topics": [
      {
        "id": "workers-backgroundtasks",
        "title": "BackgroundTasks",
        "meaning": "FastAPI BackgroundTasks runs simple work after responding in the same application process.",
        "change": "Queue a small notification task so HTTP can return before sending it.",
        "failure": "Process crashes can lose in-process tasks; it is not a durable job queue."
      },
      {
        "id": "workers-redis-fundamentals",
        "title": "Redis fundamentals",
        "meaning": "Redis can store caches, locks and queue coordination depending on architecture.",
        "change": "Add a TTL to cached data and stale entries expire.",
        "failure": "Cache values without tenant keys can leak data across customers."
      },
      {
        "id": "workers-celery-and-brokers",
        "title": "Celery and brokers",
        "meaning": "A broker hands durable tasks to workers outside the HTTP process.",
        "change": "Enqueue work and a separate worker performs it.",
        "failure": "Publishing a job does not guarantee exactly-once execution."
      },
      {
        "id": "workers-retries-and-exponential-backoff",
        "title": "Retries and exponential backoff",
        "meaning": "Retry transient failures with increasing delay and jitter.",
        "change": "Simulate downstream 503 and the next attempt waits longer.",
        "failure": "Retrying permanent validation errors wastes resources."
      },
      {
        "id": "workers-idempotent-jobs",
        "title": "Idempotent jobs",
        "meaning": "Jobs should tolerate duplicate delivery without duplicate side effects.",
        "change": "Use a stable order ID as an idempotency key.",
        "failure": "Duplicate delivery charges a customer twice without safeguards."
      },
      {
        "id": "workers-dead-letter-queues",
        "title": "Dead-letter queues",
        "meaning": "Repeatedly failing messages move to inspection/quarantine rather than looping forever.",
        "change": "Exhaust retry attempts and route the event to a dead-letter queue.",
        "failure": "No monitoring of dead letters silently loses business outcomes."
      },
      {
        "id": "workers-schedules-and-periodic-tasks",
        "title": "Schedules and periodic tasks",
        "meaning": "Schedulers trigger jobs at intervals or times with clear timezone semantics.",
        "change": "Add a nightly cleanup and it runs independently of API traffic.",
        "failure": "Multiple schedulers can trigger duplicate jobs if leader election is absent."
      },
      {
        "id": "workers-task-progress-and-polling",
        "title": "Task progress and polling",
        "meaning": "Long jobs expose an ID and status that clients poll or subscribe to.",
        "change": "Return 202 and /jobs/{id} instead of keeping an HTTP request open.",
        "failure": "Returning 200 immediately without tracking makes failures invisible."
      },
      {
        "id": "workers-outbox-pattern",
        "title": "Outbox pattern",
        "meaning": "The outbox pattern couples a DB write with an event record transactionally.",
        "change": "Commit business row and outbox event together, then publish asynchronously.",
        "failure": "Write DB then publish externally without coordination and messages get lost."
      },
      {
        "id": "workers-event-driven-architecture",
        "title": "Event-driven architecture",
        "meaning": "Consumers react to messages and decouple producers from downstream work.",
        "change": "Add an event consumer without modifying the original HTTP route.",
        "failure": "Event schema changes require compatibility and replay planning."
      }
    ],
    "code": "from fastapi import FastAPI, BackgroundTasks\napp = FastAPI()\n\ndef send_notification(order_id: int):\n    print(f\"Notify about order {order_id}\")\n\n@app.post(\"/orders\", status_code=202)\ndef create_order(tasks: BackgroundTasks):\n    tasks.add_task(send_notification, 42)\n    return {\"id\": 42, \"state\": \"queued\"}\n\n# Production-critical durable jobs need a broker and worker."
  },
  {
    "id": "production",
    "title": "15 · Deployment, Docker & CI/CD",
    "category": "Operations",
    "lab": "deploy",
    "topics": [
      {
        "id": "production-docker-images-and-containers",
        "title": "Docker images and containers",
        "meaning": "Images package code/dependencies; containers execute isolated app processes.",
        "change": "Build and run an image and the same app runs in another environment.",
        "failure": "Copying .env secrets into an image leaks them in artifacts."
      },
      {
        "id": "production-docker-compose-services",
        "title": "Docker Compose services",
        "meaning": "Compose coordinates backend, frontend, PostgreSQL and optionally Redis locally.",
        "change": "Add a PostgreSQL service and API service DNS name becomes available.",
        "failure": "The DB container being started does not guarantee it is ready for queries."
      },
      {
        "id": "production-asgi-workers-and-scaling",
        "title": "ASGI workers and scaling",
        "meaning": "Process workers use separate memory and share traffic through a server/proxy.",
        "change": "Increase replicas and capacity may rise until DB or downstream limits dominate.",
        "failure": "In-memory sessions or WebSocket lists do not automatically share across workers."
      },
      {
        "id": "production-reverse-proxies-and-https",
        "title": "Reverse proxies and HTTPS",
        "meaning": "A reverse proxy terminates TLS, routes requests and handles headers.",
        "change": "Configure trusted proxy headers and external scheme/URLs are accurate.",
        "failure": "Trusting all forwarded headers can allow origin or IP spoofing."
      },
      {
        "id": "production-health-readiness-liveness",
        "title": "Health readiness liveness",
        "meaning": "Liveness indicates the process runs; readiness indicates it can safely serve traffic.",
        "change": "Disable DB connectivity and readiness becomes unhealthy without killing the pod.",
        "failure": "A health check that always returns OK hides a broken dependency."
      },
      {
        "id": "production-kubernetes-basics",
        "title": "Kubernetes basics",
        "meaning": "Deployments, Services, Ingress, ConfigMaps and Secrets manage container workloads.",
        "change": "Scale replicas and Service distributes traffic across available pods.",
        "failure": "Rolling pods without backwards-compatible schema migration can break requests."
      },
      {
        "id": "production-environment-and-secrets-management",
        "title": "Environment and secrets management",
        "meaning": "Runtime config separates code from confidential production settings.",
        "change": "Rotate JWT signing keys and database secrets with an explicit rollout plan.",
        "failure": "Putting JWT secrets into frontend bundles makes every token forgeable."
      },
      {
        "id": "production-ci-with-github-actions",
        "title": "CI with GitHub Actions",
        "meaning": "CI installs, lints, tests and builds on every change.",
        "change": "Add a failing test and a deployment pipeline should refuse promotion.",
        "failure": "Deploying directly from untested commits creates avoidable outages."
      },
      {
        "id": "production-cd-rolling-blue-green-canary",
        "title": "CD rolling blue green canary",
        "meaning": "Deployment strategies release new behavior with rollback options.",
        "change": "Send 10% of traffic to a new version before full rollout.",
        "failure": "New and old code incompatible with one DB schema causes downtime."
      },
      {
        "id": "production-database-backups-and-restore",
        "title": "Database backups and restore",
        "meaning": "Backups protect persisted business state; restore drills prove recoverability.",
        "change": "Take a backup and test restoring to an isolated environment.",
        "failure": "A backup never tested for restore may be useless in an incident."
      },
      {
        "id": "production-rate-limiting-and-api-gateways",
        "title": "Rate limiting and API gateways",
        "meaning": "Gateways enforce quotas, authentication/routing and request policies at service edges.",
        "change": "Limit clients per key and excess requests receive 429.",
        "failure": "Per-process counters give inconsistent quotas across replicas."
      },
      {
        "id": "production-configuration-for-production",
        "title": "Configuration for production",
        "meaning": "Disable debug tracebacks, set allowed hosts and CORS, manage TLS and logs.",
        "change": "Change dev to production configuration and public attack surface shrinks.",
        "failure": "Using --reload or exposing /docs without access policy may be inappropriate."
      }
    ],
    "code": "# Local development (example)\ndocker compose up --build\n\n# Deployment checks\nGET /health       # process is running\nGET /ready        # DB connectivity verified\n\n# Do not bake secrets into Docker images.\n# Configure trusted proxy headers and TLS at the edge."
  },
  {
    "id": "architecture",
    "title": "16 · System Design & Advanced APIs",
    "category": "Architecture",
    "lab": "fullstack",
    "topics": [
      {
        "id": "architecture-layered-architecture",
        "title": "Layered architecture",
        "meaning": "Separate routers, services, repositories and integration adapters by responsibility.",
        "change": "Move business rules out of endpoints and they can be unit tested.",
        "failure": "Too many layers for a small app create complexity without value."
      },
      {
        "id": "architecture-clean-architecture-and-boundaries",
        "title": "Clean architecture and boundaries",
        "meaning": "Domain rules remain independent of HTTP and database adapters.",
        "change": "Swap persistence drivers without rewriting core business logic.",
        "failure": "Making every service depend on FastAPI Request ties code to transport details."
      },
      {
        "id": "architecture-microservices-versus-modular-monolith",
        "title": "Microservices versus modular monolith",
        "meaning": "Service boundaries trade independent deployment for network and coordination overhead.",
        "change": "Split a domain into services only when scaling/team boundaries justify it.",
        "failure": "Distributed services without observability make debugging difficult."
      },
      {
        "id": "architecture-api-gateway-and-bff",
        "title": "API gateway and BFF",
        "meaning": "A gateway routes and enforces policy; a backend-for-frontend shapes APIs for a specific UI.",
        "change": "Add a BFF and mobile/web clients can receive tailored responses.",
        "failure": "Duplicated auth logic across gateway and application creates blind spots."
      },
      {
        "id": "architecture-graphql-and-strawberry",
        "title": "GraphQL and Strawberry",
        "meaning": "GraphQL offers client-selected fields and typed schema; it is an alternative API style.",
        "change": "Expose GraphQL endpoint beside REST and clients ask for different projections.",
        "failure": "N+1 resolver lookups can devastate DB performance."
      },
      {
        "id": "architecture-grpc-and-protocol-buffers",
        "title": "gRPC and Protocol Buffers",
        "meaning": "gRPC uses typed service definitions and binary messages for inter-service RPC.",
        "change": "Switch an internal call from JSON REST to a protobuf contract.",
        "failure": "Browsers cannot directly use ordinary native gRPC without appropriate bridging."
      },
      {
        "id": "architecture-api-webhooks-and-signatures",
        "title": "API webhooks and signatures",
        "meaning": "Webhooks deliver events to client servers and often use request signing.",
        "change": "Sign webhook bodies and receivers can verify authenticity.",
        "failure": "Not checking replay timestamps enables duplicate or forged side effects."
      },
      {
        "id": "architecture-distributed-transactions-and-sagas",
        "title": "Distributed transactions and sagas",
        "meaning": "A saga coordinates compensating actions across systems without a shared database transaction.",
        "change": "Add compensation when payment succeeds but inventory fails.",
        "failure": "Assuming distributed side effects are atomic causes stuck orders."
      },
      {
        "id": "architecture-multi-tenancy",
        "title": "Multi-tenancy",
        "meaning": "Tenant isolation can use row, schema or database boundaries.",
        "change": "Add tenant_id to all query filters and users see only their own records.",
        "failure": "Forgetting one filter or authorizing by client-provided tenant ID leaks data."
      },
      {
        "id": "architecture-rate-limiting-quotas-and-billing",
        "title": "Rate limiting quotas and billing",
        "meaning": "Plans determine consumption ceilings, costs and fairness.",
        "change": "Change per-user quota and rejected requests carry 429 consistently.",
        "failure": "Rate limiting by spoofable client IP allows bypass."
      },
      {
        "id": "architecture-api-compatibility-and-deprecation",
        "title": "API compatibility and deprecation",
        "meaning": "Semantic versions, compatibility testing and sunset headers support API changes.",
        "change": "Deprecate /v1 and direct clients to /v2 with migration guidance.",
        "failure": "Deleting a production route without warning breaks consumers."
      },
      {
        "id": "architecture-domain-driven-design",
        "title": "Domain-driven design",
        "meaning": "Bounded contexts align APIs and data around consistent domain vocabulary.",
        "change": "Move order billing rules into a payment domain service.",
        "failure": "A shared catch-all data model allows unrelated domains to interfere."
      }
    ],
    "code": "# Modular monolith project layout\napp/\n  main.py             # ASGI app, routers, middleware\n  api/items.py        # HTTP contract\n  schemas.py          # Pydantic input/output\n  services/items.py   # Business rules\n  repositories.py     # Persistence access\n  db.py               # Engine/session lifecycle\n  security.py         # Credential verification\n  settings.py         # Validated environment config"
  },
  {
    "id": "reliability",
    "title": "17 · Observability, Security & Performance",
    "category": "Operations",
    "lab": "deploy",
    "topics": [
      {
        "id": "reliability-structured-logging",
        "title": "Structured logging",
        "meaning": "Structured logs carry searchable fields such as trace ID, route and status.",
        "change": "Add a correlation ID and one request can be followed through services.",
        "failure": "Logging credentials or JWTs creates serious privacy and security exposure."
      },
      {
        "id": "reliability-metrics-and-percentiles",
        "title": "Metrics and percentiles",
        "meaning": "Counters, histograms and gauges reveal error rates, throughput and tail latency.",
        "change": "Increase simulated request load and watch p95 diverge from the average.",
        "failure": "Averages can hide the slowest user experiences."
      },
      {
        "id": "reliability-opentelemetry-tracing",
        "title": "OpenTelemetry tracing",
        "meaning": "Spans correlate frontend, API, dependency and database operation timing.",
        "change": "Propagate trace context and one request appears as a multi-service waterfall.",
        "failure": "Missing propagation makes traces fragmented."
      },
      {
        "id": "reliability-prometheus-grafana-and-alerts",
        "title": "Prometheus Grafana and alerts",
        "meaning": "Metrics exporters and dashboards support monitoring and alerting.",
        "change": "Set a threshold on error rate and trigger an incident warning.",
        "failure": "Alerting on every tiny fluctuation creates noise and fatigue."
      },
      {
        "id": "reliability-profiling-and-flame-graphs",
        "title": "Profiling and flame graphs",
        "meaning": "Profilers identify hot functions and costly code paths.",
        "change": "Replace repeated work with caching and observe the changed hotspot.",
        "failure": "Optimizing without measurements can worsen system performance."
      },
      {
        "id": "reliability-load-shedding-and-circuit-breakers",
        "title": "Load shedding and circuit breakers",
        "meaning": "Circuit breakers reduce cascading failure when dependencies degrade.",
        "change": "Trip breaker after repeated failures and requests fail fast or use fallback.",
        "failure": "Blindly retrying a failing dependency amplifies outages."
      },
      {
        "id": "reliability-cache-invalidation",
        "title": "Cache invalidation",
        "meaning": "Caches need explicit TTL or invalidation rules after writes.",
        "change": "Edit an item and invalidate its key so later reads return new content.",
        "failure": "Missing invalidation causes stale or inconsistent UI."
      },
      {
        "id": "reliability-owasp-api-security-top-10",
        "title": "OWASP API Security Top 10",
        "meaning": "Common API risks include broken object-level authorization, authentication flaws and unsafe consumption.",
        "change": "Add a resource-owner check and cross-user read is rejected.",
        "failure": "Authentication alone does not stop IDOR/BOLA data leaks."
      },
      {
        "id": "reliability-sql-injection-and-parameterization",
        "title": "SQL injection and parameterization",
        "meaning": "Parameterized queries separate user data from SQL syntax.",
        "change": "Use ORM bound parameters and apostrophes remain data, not executable SQL.",
        "failure": "Concatenating raw user strings into SQL can alter query behavior."
      },
      {
        "id": "reliability-ssrf-file-upload-and-deserialization",
        "title": "SSRF file upload and deserialization",
        "meaning": "Outbound URLs, files and decoded objects are untrusted security boundaries.",
        "change": "Restrict hosts, file size/type and parsers to approved behavior.",
        "failure": "Fetching arbitrary user URLs can reach internal services."
      },
      {
        "id": "reliability-secrets-rotation-and-incident-response",
        "title": "Secrets rotation and incident response",
        "meaning": "Key rotation and incident procedures limit damage after compromise.",
        "change": "Revoke a leaked API key and clients with old credentials lose access.",
        "failure": "Rotating a signing key without a transition can log out all users."
      },
      {
        "id": "reliability-service-level-indicators-and-objectives",
        "title": "Service level indicators and objectives",
        "meaning": "SLIs measure reliability; SLOs set expected service targets and error budgets.",
        "change": "Tighten SLO and operational decisions prioritize reliability.",
        "failure": "Treating every 100% target as achievable can harm engineering judgment."
      }
    ],
    "code": "# Instrumentation example (conceptual)\n# Every request should record route, status, duration, trace ID\n# Never log Authorization headers or token payloads.\n# Database and outbound HTTP spans are children of the inbound span.\n# Alert on sustained error rate and p95 latency, not random animation values."
  },
  {
    "id": "capstone",
    "title": "18 · End-to-End Enterprise Capstone",
    "category": "Capstone",
    "lab": "fullstack",
    "topics": [
      {
        "id": "capstone-project-requirements-and-personas",
        "title": "Project requirements and personas",
        "meaning": "Define actors, user stories, permission boundaries, and expected status codes before writing endpoints.",
        "change": "Add a new editor persona and access rules and UI controls change.",
        "failure": "Skipping authorization requirements causes rework and potential leaks."
      },
      {
        "id": "capstone-route-and-schema-design",
        "title": "Route and schema design",
        "meaning": "Design /api/v1 contracts with sample JSON and clear error shapes.",
        "change": "Add a new route and update OpenAPI and client types.",
        "failure": "A UI link to an unregistered backend route gives 404."
      },
      {
        "id": "capstone-identity-and-roles",
        "title": "Identity and roles",
        "meaning": "Users log in with hashed passwords and gain server-validated privileges.",
        "change": "Make one account admin and protected routes enforce the role on the server.",
        "failure": "Hiding an admin button does not secure an admin API endpoint."
      },
      {
        "id": "capstone-crud-and-transaction-workflows",
        "title": "CRUD and transaction workflows",
        "meaning": "Create, list, read, update, and delete records with predictable errors.",
        "change": "Insert an item and inspect database row and updated React state.",
        "failure": "Missing input validation allows bad records or unhelpful 500 errors."
      },
      {
        "id": "capstone-frontend-forms-and-queries",
        "title": "Frontend forms and queries",
        "meaning": "React pages submit validated inputs and render server state and errors.",
        "change": "Change item name and the UI invalidates/refetches its list.",
        "failure": "Optimistic UI without rollback can misrepresent failed writes."
      },
      {
        "id": "capstone-background-jobs-and-events",
        "title": "Background jobs and events",
        "meaning": "Long-running tasks expose state and retry policy instead of blocking requests.",
        "change": "Queue a report job and track pending, running, done and failed states.",
        "failure": "A lost task is invisible unless state is persisted and monitored."
      },
      {
        "id": "capstone-tests-and-quality-gates",
        "title": "Tests and quality gates",
        "meaning": "Unit/integration/end-to-end tests protect key flows, including errors.",
        "change": "Remove a route and the contract test must fail before deployment.",
        "failure": "A smoke test that only loads the home page misses backend failures."
      },
      {
        "id": "capstone-docker-and-environment-setup",
        "title": "Docker and environment setup",
        "meaning": "Local compose starts frontend, API, database and configured services.",
        "change": "Swap SQLite to PostgreSQL and the API's DB URL switches drivers.",
        "failure": "Shipping demo environment secrets in production is unsafe."
      },
      {
        "id": "capstone-deployment-and-rollout",
        "title": "Deployment and rollout",
        "meaning": "Ship tested images with health probes and secret injection.",
        "change": "Roll a version forward and backwards with schema compatibility.",
        "failure": "Breaking DB migrations can make application rollback impossible."
      },
      {
        "id": "capstone-observability-and-troubleshooting",
        "title": "Observability and troubleshooting",
        "meaning": "Trace a failed UI action through HTTP, dependencies, DB and logs.",
        "change": "Force a 401 or 500 and watch the flow stop at the correct layer.",
        "failure": "No correlation IDs leaves teams guessing where requests failed."
      }
    ],
    "code": "# Run the complete example included with this course\n# Terminal 1: backend (see fullstack-example/README.md)\nuvicorn app.main:app --reload\n\n# Terminal 2: React application\nnpm run dev\n\n# Explore:\nGET /docs\nPOST /auth/register\nPOST /auth/token\nGET /api/items\nPOST /api/items"
  }
];
