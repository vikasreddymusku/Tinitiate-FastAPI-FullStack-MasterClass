# FastAPI Full-Stack Interactive MasterClass · Course Coverage

**18 modules / 214 clickable topics / 6 browser labs.**

Every topic below has a clickable deep-dive page at `learn.html?topic=<id>` containing: a specific explanation, the effect of modifying the concept, a failure scenario, a selectable cause/effect visualization, a step-through request flow, a module-scoped reference code pattern, a knowledge check and links to a corresponding lab.

The six browser labs are explicitly educational **simulations**. For actual executable HTTP requests, JWT signing/verification, SQLAlchemy persistence and React integration, use `fullstack-example/` and its setup instructions. Several enterprise services (OIDC IdP, Kubernetes, Celery, distributed telemetry) are covered conceptually but are **not deployed** by the sample app.

## Curriculum index

### 01 · Python for APIs (10 topics) · Foundation

**Lab:** `demo.html?lab=request`

- [Python environments](learn.html?topic=python-python-environments)
- [Python types and Annotated](learn.html?topic=python-python-types-and-annotated)
- [Functions and scopes](learn.html?topic=python-functions-and-scopes)
- [Classes and dataclasses](learn.html?topic=python-classes-and-dataclasses)
- [Decorators](learn.html?topic=python-decorators)
- [Exceptions and context managers](learn.html?topic=python-exceptions-and-context-managers)
- [Modules and package imports](learn.html?topic=python-modules-and-package-imports)
- [Asyncio fundamentals](learn.html?topic=python-asyncio-fundamentals)
- [Package managers and locks](learn.html?topic=python-package-managers-and-locks)
- [Environment configuration](learn.html?topic=python-environment-configuration)

### 02 · HTTP, Browser & APIs (12 topics) · Foundation

**Lab:** `demo.html?lab=request`

- [HTTP request anatomy](learn.html?topic=http-http-request-anatomy)
- [HTTP response anatomy](learn.html?topic=http-http-response-anatomy)
- [GET POST PUT PATCH DELETE](learn.html?topic=http-get-post-put-patch-delete)
- [Status codes 2xx 4xx 5xx](learn.html?topic=http-status-codes-2xx-4xx-5xx)
- [URL and query parameters](learn.html?topic=http-url-and-query-parameters)
- [Headers and media types](learn.html?topic=http-headers-and-media-types)
- [Cookies and sessions](learn.html?topic=http-cookies-and-sessions)
- [Idempotency and retries](learn.html?topic=http-idempotency-and-retries)
- [DNS TLS and proxies](learn.html?topic=http-dns-tls-and-proxies)
- [CORS preflight](learn.html?topic=http-cors-preflight)
- [Caching headers and ETags](learn.html?topic=http-caching-headers-and-etags)
- [REST resources and OpenAPI](learn.html?topic=http-rest-resources-and-openapi)

### 03 · Starting FastAPI (9 topics) · Backend

**Lab:** `demo.html?lab=request`

- [FastAPI application instance](learn.html?topic=startup-fastapi-application-instance)
- [ASGI and Uvicorn](learn.html?topic=startup-asgi-and-uvicorn)
- [First GET and POST endpoint](learn.html?topic=startup-first-get-and-post-endpoint)
- [Automatic Swagger UI and ReDoc](learn.html?topic=startup-automatic-swagger-ui-and-redoc)
- [Application lifespan](learn.html?topic=startup-application-lifespan)
- [Application factory](learn.html?topic=startup-application-factory)
- [Routers with APIRouter](learn.html?topic=startup-routers-with-apirouter)
- [Tags descriptions and metadata](learn.html?topic=startup-tags-descriptions-and-metadata)
- [Request lifecycle](learn.html?topic=startup-request-lifecycle)

### 04 · Routing & Live Route Mutations (15 topics) · Backend

**Lab:** `demo.html?lab=routes`

- [Path operation matching](learn.html?topic=routes-path-operation-matching)
- [Static versus dynamic routes](learn.html?topic=routes-static-versus-dynamic-routes)
- [Path parameter validation](learn.html?topic=routes-path-parameter-validation)
- [Query parameters defaults](learn.html?topic=routes-query-parameters-defaults)
- [Route methods and status codes](learn.html?topic=routes-route-methods-and-status-codes)
- [Router prefixes](learn.html?topic=routes-router-prefixes)
- [Router inclusion](learn.html?topic=routes-router-inclusion)
- [Route name and reverse lookup](learn.html?topic=routes-route-name-and-reverse-lookup)
- [Path convertors and catch-all paths](learn.html?topic=routes-path-convertors-and-catch-all-paths)
- [Trailing slash redirect](learn.html?topic=routes-trailing-slash-redirect)
- [API versioning](learn.html?topic=routes-api-versioning)
- [Mounted subapplications](learn.html?topic=routes-mounted-subapplications)
- [Host-based routing and proxies](learn.html?topic=routes-host-based-routing-and-proxies)
- [WebSocket routes](learn.html?topic=routes-websocket-routes)
- [Endpoint dependencies](learn.html?topic=routes-endpoint-dependencies)

### 05 · Pydantic & Request Validation (11 topics) · Backend

**Lab:** `demo.html?lab=request`

- [BaseModel and nested models](learn.html?topic=validation-basemodel-and-nested-models)
- [Field constraints](learn.html?topic=validation-field-constraints)
- [Field aliases](learn.html?topic=validation-field-aliases)
- [Field validators](learn.html?topic=validation-field-validators)
- [Model validators](learn.html?topic=validation-model-validators)
- [Before after and wrap modes](learn.html?topic=validation-before-after-and-wrap-modes)
- [Strict versus coercive parsing](learn.html?topic=validation-strict-versus-coercive-parsing)
- [Unions discriminators and enums](learn.html?topic=validation-unions-discriminators-and-enums)
- [Optional nullable and missing](learn.html?topic=validation-optional-nullable-and-missing)
- [JSON schema generation](learn.html?topic=validation-json-schema-generation)
- [Settings management](learn.html?topic=validation-settings-management)

### 06 · Responses, Errors & Files (10 topics) · Backend

**Lab:** `demo.html?lab=request`

- [response_model and output filtering](learn.html?topic=responses-response-model-and-output-filtering)
- [JSONResponse HTMLResponse FileResponse](learn.html?topic=responses-jsonresponse-htmlresponse-fileresponse)
- [StreamingResponse](learn.html?topic=responses-streamingresponse)
- [HTTPException and custom handlers](learn.html?topic=responses-httpexception-and-custom-handlers)
- [Validation error details](learn.html?topic=responses-validation-error-details)
- [Response headers and cookies](learn.html?topic=responses-response-headers-and-cookies)
- [RedirectResponse](learn.html?topic=responses-redirectresponse)
- [Uploads and multipart forms](learn.html?topic=responses-uploads-and-multipart-forms)
- [Static files and templates](learn.html?topic=responses-static-files-and-templates)
- [Pagination and filtering](learn.html?topic=responses-pagination-and-filtering)

### 07 · Dependency Injection & Middleware (10 topics) · Backend

**Lab:** `demo.html?lab=request`

- [Depends and Annotated](learn.html?topic=dependencies-depends-and-annotated)
- [Dependency graphs](learn.html?topic=dependencies-dependency-graphs)
- [Per-request dependency caching](learn.html?topic=dependencies-per-request-dependency-caching)
- [Yield cleanup](learn.html?topic=dependencies-yield-cleanup)
- [Dependency overrides for tests](learn.html?topic=dependencies-dependency-overrides-for-tests)
- [Function middleware](learn.html?topic=dependencies-function-middleware)
- [CORS middleware](learn.html?topic=dependencies-cors-middleware)
- [TrustedHost and HTTPS redirect](learn.html?topic=dependencies-trustedhost-and-https-redirect)
- [Contextvars and request IDs](learn.html?topic=dependencies-contextvars-and-request-ids)
- [Middleware order](learn.html?topic=dependencies-middleware-order)

### 08 · Authentication, Tokens & Authorization (21 topics) · Security

**Lab:** `demo.html?lab=auth`

- [Authentication versus authorization](learn.html?topic=auth-authentication-versus-authorization)
- [Password hashing and Argon2](learn.html?topic=auth-password-hashing-and-argon2)
- [Bearer tokens](learn.html?topic=auth-bearer-tokens)
- [JWT header payload signature](learn.html?topic=auth-jwt-header-payload-signature)
- [JWT expiration nbf iat](learn.html?topic=auth-jwt-expiration-nbf-iat)
- [JWT issuer audience subject](learn.html?topic=auth-jwt-issuer-audience-subject)
- [JWT signing algorithms and key rotation](learn.html?topic=auth-jwt-signing-algorithms-and-key-rotation)
- [Access versus refresh tokens](learn.html?topic=auth-access-versus-refresh-tokens)
- [Refresh rotation and revocation](learn.html?topic=auth-refresh-rotation-and-revocation)
- [OAuth 2.0 authorization code](learn.html?topic=auth-oauth-2-0-authorization-code)
- [PKCE code verifier and challenge](learn.html?topic=auth-pkce-code-verifier-and-challenge)
- [OpenID Connect and ID tokens](learn.html?topic=auth-openid-connect-and-id-tokens)
- [OAuth scopes and consent](learn.html?topic=auth-oauth-scopes-and-consent)
- [Roles and permissions RBAC ABAC](learn.html?topic=auth-roles-and-permissions-rbac-abac)
- [API keys and service accounts](learn.html?topic=auth-api-keys-and-service-accounts)
- [Sessions and HttpOnly cookies](learn.html?topic=auth-sessions-and-httponly-cookies)
- [CSRF XSS and CORS](learn.html?topic=auth-csrf-xss-and-cors)
- [401 versus 403](learn.html?topic=auth-401-versus-403)
- [OIDC discovery and JWKS](learn.html?topic=auth-oidc-discovery-and-jwks)
- [SSO SAML and enterprise federation](learn.html?topic=auth-sso-saml-and-enterprise-federation)
- [MFA passkeys and WebAuthn](learn.html?topic=auth-mfa-passkeys-and-webauthn)

### 09 · Databases, ORMs & Migrations (16 topics) · Data

**Lab:** `demo.html?lab=database`

- [Relational database fundamentals](learn.html?topic=database-relational-database-fundamentals)
- [SQLite and PostgreSQL](learn.html?topic=database-sqlite-and-postgresql)
- [SQLAlchemy 2.x ORM mapping](learn.html?topic=database-sqlalchemy-2-x-orm-mapping)
- [SQLModel integration](learn.html?topic=database-sqlmodel-integration)
- [Session lifecycle](learn.html?topic=database-session-lifecycle)
- [Transactions commit rollback](learn.html?topic=database-transactions-commit-rollback)
- [Relationships and joins](learn.html?topic=database-relationships-and-joins)
- [Indexes and query plans](learn.html?topic=database-indexes-and-query-plans)
- [Pagination and cursor indexes](learn.html?topic=database-pagination-and-cursor-indexes)
- [Alembic schema migrations](learn.html?topic=database-alembic-schema-migrations)
- [Connection pooling](learn.html?topic=database-connection-pooling)
- [Async SQLAlchemy and asyncpg](learn.html?topic=database-async-sqlalchemy-and-asyncpg)
- [N+1 and eager loading](learn.html?topic=database-n-1-and-eager-loading)
- [Optimistic locking](learn.html?topic=database-optimistic-locking)
- [NoSQL Redis and document stores](learn.html?topic=database-nosql-redis-and-document-stores)
- [DB migrations zero downtime](learn.html?topic=database-db-migrations-zero-downtime)

### 10 · Async, WebSockets & Streaming (10 topics) · Backend

**Lab:** `demo.html?lab=async`

- [Coroutines and await](learn.html?topic=async-coroutines-and-await)
- [Sync versus async endpoints](learn.html?topic=async-sync-versus-async-endpoints)
- [Event loop tasks and gather](learn.html?topic=async-event-loop-tasks-and-gather)
- [Timeouts cancellation shielding](learn.html?topic=async-timeouts-cancellation-shielding)
- [Thread pools and CPU-bound tasks](learn.html?topic=async-thread-pools-and-cpu-bound-tasks)
- [WebSocket handshake messages](learn.html?topic=async-websocket-handshake-messages)
- [Server-Sent Events](learn.html?topic=async-server-sent-events)
- [Streaming and backpressure](learn.html?topic=async-streaming-and-backpressure)
- [Connection managers](learn.html?topic=async-connection-managers)
- [Graceful shutdown](learn.html?topic=async-graceful-shutdown)

### 11 · React & TypeScript (12 topics) · Frontend

**Lab:** `demo.html?lab=fullstack`

- [HTML CSS and browser DOM](learn.html?topic=frontend-html-css-and-browser-dom)
- [TypeScript basics](learn.html?topic=frontend-typescript-basics)
- [React components and props](learn.html?topic=frontend-react-components-and-props)
- [useState and controlled inputs](learn.html?topic=frontend-usestate-and-controlled-inputs)
- [useEffect and subscriptions](learn.html?topic=frontend-useeffect-and-subscriptions)
- [React Router](learn.html?topic=frontend-react-router)
- [Forms and schema validation](learn.html?topic=frontend-forms-and-schema-validation)
- [Fetch API and AbortController](learn.html?topic=frontend-fetch-api-and-abortcontroller)
- [TanStack Query and caching](learn.html?topic=frontend-tanstack-query-and-caching)
- [React accessibility](learn.html?topic=frontend-react-accessibility)
- [Error boundaries and suspense](learn.html?topic=frontend-error-boundaries-and-suspense)
- [Build tooling Vite](learn.html?topic=frontend-build-tooling-vite)

### 12 · React ↔ FastAPI Integration (11 topics) · Full Stack

**Lab:** `demo.html?lab=fullstack`

- [Full request round trip](learn.html?topic=integration-full-request-round-trip)
- [CORS and preflight](learn.html?topic=integration-cors-and-preflight)
- [API contract and generated clients](learn.html?topic=integration-api-contract-and-generated-clients)
- [Login and token storage](learn.html?topic=integration-login-and-token-storage)
- [Loading empty error and success](learn.html?topic=integration-loading-empty-error-and-success)
- [Optimistic updates](learn.html?topic=integration-optimistic-updates)
- [File upload end-to-end](learn.html?topic=integration-file-upload-end-to-end)
- [Pagination filtering sorting](learn.html?topic=integration-pagination-filtering-sorting)
- [React deployment and base URLs](learn.html?topic=integration-react-deployment-and-base-urls)
- [Error contracts and retry UX](learn.html?topic=integration-error-contracts-and-retry-ux)
- [WebSocket reconnect](learn.html?topic=integration-websocket-reconnect)

### 13 · Testing, TDD & Contract Safety (11 topics) · Quality

**Lab:** `demo.html?lab=request`

- [Unit tests and fixtures](learn.html?topic=testing-unit-tests-and-fixtures)
- [FastAPI TestClient](learn.html?topic=testing-fastapi-testclient)
- [AsyncClient and ASGITransport](learn.html?topic=testing-asyncclient-and-asgitransport)
- [Dependency overrides](learn.html?topic=testing-dependency-overrides)
- [Integration tests with temporary DB](learn.html?topic=testing-integration-tests-with-temporary-db)
- [Contract testing and OpenAPI](learn.html?topic=testing-contract-testing-and-openapi)
- [Playwright end-to-end tests](learn.html?topic=testing-playwright-end-to-end-tests)
- [Property-based and fuzz testing](learn.html?topic=testing-property-based-and-fuzz-testing)
- [Security tests](learn.html?topic=testing-security-tests)
- [Load and performance tests](learn.html?topic=testing-load-and-performance-tests)
- [Test pyramid and CI gates](learn.html?topic=testing-test-pyramid-and-ci-gates)

### 14 · Workers, Queues & Jobs (10 topics) · Backend

**Lab:** `demo.html?lab=async`

- [BackgroundTasks](learn.html?topic=workers-backgroundtasks)
- [Redis fundamentals](learn.html?topic=workers-redis-fundamentals)
- [Celery and brokers](learn.html?topic=workers-celery-and-brokers)
- [Retries and exponential backoff](learn.html?topic=workers-retries-and-exponential-backoff)
- [Idempotent jobs](learn.html?topic=workers-idempotent-jobs)
- [Dead-letter queues](learn.html?topic=workers-dead-letter-queues)
- [Schedules and periodic tasks](learn.html?topic=workers-schedules-and-periodic-tasks)
- [Task progress and polling](learn.html?topic=workers-task-progress-and-polling)
- [Outbox pattern](learn.html?topic=workers-outbox-pattern)
- [Event-driven architecture](learn.html?topic=workers-event-driven-architecture)

### 15 · Deployment, Docker & CI/CD (12 topics) · Operations

**Lab:** `demo.html?lab=deploy`

- [Docker images and containers](learn.html?topic=production-docker-images-and-containers)
- [Docker Compose services](learn.html?topic=production-docker-compose-services)
- [ASGI workers and scaling](learn.html?topic=production-asgi-workers-and-scaling)
- [Reverse proxies and HTTPS](learn.html?topic=production-reverse-proxies-and-https)
- [Health readiness liveness](learn.html?topic=production-health-readiness-liveness)
- [Kubernetes basics](learn.html?topic=production-kubernetes-basics)
- [Environment and secrets management](learn.html?topic=production-environment-and-secrets-management)
- [CI with GitHub Actions](learn.html?topic=production-ci-with-github-actions)
- [CD rolling blue green canary](learn.html?topic=production-cd-rolling-blue-green-canary)
- [Database backups and restore](learn.html?topic=production-database-backups-and-restore)
- [Rate limiting and API gateways](learn.html?topic=production-rate-limiting-and-api-gateways)
- [Configuration for production](learn.html?topic=production-configuration-for-production)

### 16 · System Design & Advanced APIs (12 topics) · Architecture

**Lab:** `demo.html?lab=fullstack`

- [Layered architecture](learn.html?topic=architecture-layered-architecture)
- [Clean architecture and boundaries](learn.html?topic=architecture-clean-architecture-and-boundaries)
- [Microservices versus modular monolith](learn.html?topic=architecture-microservices-versus-modular-monolith)
- [API gateway and BFF](learn.html?topic=architecture-api-gateway-and-bff)
- [GraphQL and Strawberry](learn.html?topic=architecture-graphql-and-strawberry)
- [gRPC and Protocol Buffers](learn.html?topic=architecture-grpc-and-protocol-buffers)
- [API webhooks and signatures](learn.html?topic=architecture-api-webhooks-and-signatures)
- [Distributed transactions and sagas](learn.html?topic=architecture-distributed-transactions-and-sagas)
- [Multi-tenancy](learn.html?topic=architecture-multi-tenancy)
- [Rate limiting quotas and billing](learn.html?topic=architecture-rate-limiting-quotas-and-billing)
- [API compatibility and deprecation](learn.html?topic=architecture-api-compatibility-and-deprecation)
- [Domain-driven design](learn.html?topic=architecture-domain-driven-design)

### 17 · Observability, Security & Performance (12 topics) · Operations

**Lab:** `demo.html?lab=deploy`

- [Structured logging](learn.html?topic=reliability-structured-logging)
- [Metrics and percentiles](learn.html?topic=reliability-metrics-and-percentiles)
- [OpenTelemetry tracing](learn.html?topic=reliability-opentelemetry-tracing)
- [Prometheus Grafana and alerts](learn.html?topic=reliability-prometheus-grafana-and-alerts)
- [Profiling and flame graphs](learn.html?topic=reliability-profiling-and-flame-graphs)
- [Load shedding and circuit breakers](learn.html?topic=reliability-load-shedding-and-circuit-breakers)
- [Cache invalidation](learn.html?topic=reliability-cache-invalidation)
- [OWASP API Security Top 10](learn.html?topic=reliability-owasp-api-security-top-10)
- [SQL injection and parameterization](learn.html?topic=reliability-sql-injection-and-parameterization)
- [SSRF file upload and deserialization](learn.html?topic=reliability-ssrf-file-upload-and-deserialization)
- [Secrets rotation and incident response](learn.html?topic=reliability-secrets-rotation-and-incident-response)
- [Service level indicators and objectives](learn.html?topic=reliability-service-level-indicators-and-objectives)

### 18 · End-to-End Enterprise Capstone (10 topics) · Capstone

**Lab:** `demo.html?lab=fullstack`

- [Project requirements and personas](learn.html?topic=capstone-project-requirements-and-personas)
- [Route and schema design](learn.html?topic=capstone-route-and-schema-design)
- [Identity and roles](learn.html?topic=capstone-identity-and-roles)
- [CRUD and transaction workflows](learn.html?topic=capstone-crud-and-transaction-workflows)
- [Frontend forms and queries](learn.html?topic=capstone-frontend-forms-and-queries)
- [Background jobs and events](learn.html?topic=capstone-background-jobs-and-events)
- [Tests and quality gates](learn.html?topic=capstone-tests-and-quality-gates)
- [Docker and environment setup](learn.html?topic=capstone-docker-and-environment-setup)
- [Deployment and rollout](learn.html?topic=capstone-deployment-and-rollout)
- [Observability and troubleshooting](learn.html?topic=capstone-observability-and-troubleshooting)

## Navigation

- Start at [`index.html`](index.html) for the motion-graphics concept map, search and 18-module atlas.
- Click any node or lesson title to open its deep dive; use the left outline to jump between 214 topics.
- Click **Open matching lab** from a lesson to test related conditions and see corresponding status/trace updates.
- Run the separate [`fullstack-example`](fullstack-example/README.md) to explore actual backend and React behavior.

## Curriculum reference sources

- FastAPI: https://fastapi.tiangolo.com/tutorial/
- FastAPI Advanced: https://fastapi.tiangolo.com/advanced/
- Pydantic v2: https://docs.pydantic.dev/latest/
- SQLAlchemy 2.x: https://docs.sqlalchemy.org/en/20/
- OAuth 2.0 Security Best Current Practice: https://www.rfc-editor.org/rfc/rfc9700
