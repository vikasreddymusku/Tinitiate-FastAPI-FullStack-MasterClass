const fs = require('fs');
const path = require('path');
const { ROOT_DIR, DOMAINS, ensureAssets, buildMegaDropdownHtml } = require('./mega_menu_helpers');

// Full detailed metadata for all new subjects
const SUBJECT_METADATA = {
  // FOUNDATIONAL
  'foundational': {
    title: 'Foundational Computer Science & Software Engineering',
    badge: 'Foundational CS & Architecture',
    tagline: 'The timeless bedrock of software architecture: Data Structures, Authentication, APIs, Microservices, OOP, and Design Patterns.',
    accentColor: '#38bdf8',
    why: 'Frameworks come and go, but foundational engineering principles dictate whether large enterprise systems scale to millions of requests or collapse under technical debt.',
    what: 'Deep-dive mastery across Data Structures, Zero-Trust Authentication, API Protocols (REST, GraphQL, gRPC), Distributed Microservices, Object-Oriented Principles, and GoF Design Patterns.',
    how: 'Study the underlying algorithmic mechanics, evaluate architectural tradeoffs, and implement clean, resilient, and decoupled system components.',
    where: 'Essential in every Fortune 500 tier-1 engineering organization, hyperscale cloud platform, and mission-critical enterprise stack.',
    techStack: 'Data Structures, OAuth 2.0, JWT, REST, GraphQL, gRPC, Docker, Kafka, SOLID, GoF Patterns',
    salaryTiers: { mid: '$125,000 – $155,000', senior: '$160,000 – $210,000', principal: '$220,000 – $310,000+' },
    simTitle: 'Enterprise Foundational Architecture Visualizer',
    simDesc: 'Explore how data structures, authentication protocols, and design patterns interact across a high-throughput enterprise API gateway.',
    simSteps: ['Client Request Dispatched', 'JWT Token Validation (OIDC/PKCE)', 'API Gateway Routing (gRPC/REST)', 'In-Memory Cache (LRU HashMap)', 'Microservice Event Stream']
  },
  'foundational/data-structures': {
    title: 'Data Structures & Algorithmic Foundations',
    badge: 'Data Structures & Big-O',
    tagline: 'Master Trees, Graphs, HashTables, Heaps, and Tries with rigorous asymptotic time & space complexity analysis.',
    accentColor: '#38bdf8',
    why: 'Inefficient algorithmic choices compound exponentially under big data and low-latency cloud systems, turning millisecond queries into hours of compute.',
    what: 'Complete coverage of Arrays, HashMaps with collision resolution, Binary Search Trees, AVL/Red-Black Trees, Heaps, Graph traversals (BFS/DFS), and Tries.',
    how: 'Compare memory locality vs pointer indirection, cache friendliness, and worst-case vs amortized Big-O performance across distributed workloads.',
    where: 'High-frequency trading engines, database storage engines (B-Trees, LSM-Trees), search indexing, and real-time routing algorithms.',
    techStack: 'HashMaps, B-Trees, AVL Trees, Min/Max Heaps, Adjacency Lists, Tries, Big-O Notation',
    salaryTiers: { mid: '$130,000 – $160,000', senior: '$165,000 – $215,000', principal: '$225,000 – $320,000+' },
    simTitle: 'Data Structure Tree & HashMap Memory Visualizer',
    simDesc: 'Simulate key insertion, collision buckets, binary tree rebalancing, and heapify operations in real time.',
    simSteps: ['Hash Key Computed (Murmur3)', 'Bucket Collision Handled (Red-Black Tree)', 'Binary Search Tree Traversed', 'Min-Heap Heapify Up Triggered', 'Asymptotic Complexity Calculated']
  },
  'foundational/authentication': {
    title: 'Modern Enterprise Authentication & Authorization',
    badge: 'Auth & Zero Trust',
    tagline: 'Master OAuth 2.0, OpenID Connect (OIDC), JWT Token Lifecycles, SAML, and PKCE Zero-Trust architectures.',
    accentColor: '#38bdf8',
    why: 'Security breaches and privilege escalation represent catastrophic enterprise risks. Modern cloud applications require cryptographically verifiable zero-trust identity.',
    what: 'The complete authorization spectrum: OAuth 2.0 Authorization Code flow with PKCE, OpenID Connect claims, asymmetric JWT verification (RS256), SAML SSO, and RBAC/ABAC policies.',
    how: 'Decouple identity providers (Keycloak, Okta, Azure AD) from downstream microservices using cryptographically signed claims and automated token rotation.',
    where: 'Enterprise Single Sign-On (SSO), banking API gateways, multi-tenant SaaS platforms, and HIPAA/FedRAMP compliant ecosystems.',
    techStack: 'OAuth 2.0, OIDC, JWT, SAML 2.0, PKCE, mTLS, Okta, Keycloak, RS256, ABAC',
    salaryTiers: { mid: '$135,000 – $165,000', senior: '$170,000 – $225,000', principal: '$230,000 – $330,000+' },
    simTitle: 'OAuth 2.0 & OIDC PKCE Token Handshake Simulator',
    simDesc: 'Trace the cryptographic authorization code exchange, PKCE code verifier validation, and JWT payload inspection.',
    simSteps: ['Client Initiates Auth Code Request', 'User Consent & IdP Authorization', 'Token Exchange with PKCE Verifier', 'RS256 Signature Validated', 'Access Token & Refresh Token Issued']
  },
  'foundational/apis': {
    title: 'Enterprise API Architecture & Protocol Engineering',
    badge: 'API Architecture',
    tagline: 'Master RESTful API design, GraphQL schemas, high-performance gRPC protobufs, and real-time WebSockets.',
    accentColor: '#38bdf8',
    why: 'In a distributed world, APIs are the enterprise software contracts. Choosing the wrong protocol causes over-fetching, high serialization overhead, and latency bottlenecks.',
    what: 'Comparative engineering across OpenAPI 3.0 REST, GraphQL resolvers and Apollo federation, binary gRPC streaming with Protocol Buffers, and bi-directional WebSockets.',
    how: 'Design clean schema contracts, implement idempotent methods, manage rate limiting, API gateways (Kong, Envoy), and distributed tracing.',
    where: 'Microservice mesh communications, low-latency mobile backend-for-frontend (BFF) layers, financial ticker feeds, and real-time collaboration apps.',
    techStack: 'REST, GraphQL, gRPC, Protobuf, WebSockets, OpenAPI 3.0, Envoy, Kong, HTTP/2, HTTP/3',
    salaryTiers: { mid: '$130,000 – $160,000', senior: '$165,000 – $220,000', principal: '$225,000 – $315,000+' },
    simTitle: 'Protocol Benchmark Simulator: REST vs GraphQL vs gRPC',
    simDesc: 'Compare packet sizes, serialization speed, network roundtrips, and throughput across REST, GraphQL, and binary gRPC.',
    simSteps: ['REST JSON Endpoint Queried (3 Roundtrips)', 'GraphQL Single Query Dispatched', 'gRPC Protobuf Binary Frame Streamed', 'Payload Compression Calculated', 'Network Latency Compared']
  },
  'foundational/microservices': {
    title: 'Distributed Microservices & Event-Driven Systems',
    badge: 'Microservices & Mesh',
    tagline: 'Architect resilient decoupled services using Sagas, CQRS, Event Sourcing, Circuit Breakers, and Service Mesh.',
    accentColor: '#38bdf8',
    why: 'Monoliths create organizational and deployment gridlock. However, distributed microservices introduce network fallibility, distributed transactions, and data consistency challenges.',
    what: 'Distributed architecture patterns: Event Choreography vs Orchestration Sagas, Command Query Responsibility Segregation (CQRS), Outbox pattern, and Istio Service Mesh.',
    how: 'Utilize Apache Kafka for asynchronous event buses, resilience patterns (Polly, Resilience4j circuit breakers), and OpenTelemetry for distributed correlation tracing.',
    where: 'Global e-commerce order workflows, ride-share dispatch systems, financial payment processing, and scalable streaming backends.',
    techStack: 'Kafka, Docker, Kubernetes, Istio, CQRS, Sagas, Circuit Breaker, Outbox Pattern, OpenTelemetry',
    salaryTiers: { mid: '$135,000 – $170,000', senior: '$175,000 – $230,000', principal: '$235,000 – $340,000+' },
    simTitle: 'Distributed Saga Orchestrator & Circuit Breaker Simulator',
    simDesc: 'Step through a multi-service order saga with automated compensating transactions when a downstream payment fails.',
    simSteps: ['Order Created (Pending State)', 'Inventory Reserved Successfully', 'Payment Service Invocation (Simulated Failure)', 'Compensating Transaction Triggered', 'Inventory Unreserved & Order Cancelled']
  },
  'foundational/oop': {
    title: 'Object-Oriented Programming & SOLID Principles',
    badge: 'OOP & SOLID',
    tagline: 'Master encapsulation, polymorphism, abstraction, composition over inheritance, and the 5 SOLID engineering tenets.',
    accentColor: '#38bdf8',
    why: 'Code bases with tightly coupled classes rot quickly into unmaintainable spaghetti code where simple feature requests break dozens of unrelated modules.',
    what: 'Deep inspection of Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion (SOLID) across Python, Java, and C#.',
    how: 'Refactor fragile inheritance hierarchies into composable interfaces, implement dependency injection containers, and enforce loose coupling.',
    where: 'Enterprise application cores, domain-driven design (DDD) entities, SDKs, and modular enterprise libraries.',
    techStack: 'SOLID Principles, Dependency Injection, Interface Segregation, Domain-Driven Design, Refactoring',
    salaryTiers: { mid: '$125,000 – $155,000', senior: '$160,000 – $210,000', principal: '$220,000 – $300,000+' },
    simTitle: 'SOLID Principles Code Refactoring & Coupling Visualizer',
    simDesc: 'Observe architectural coupling metrics drop as tightly bound monolithic classes are refactored into SOLID interfaces.',
    simSteps: ['Monolithic Class Inspected (High Coupling)', 'Single Responsibility Applied', 'Dependency Injection Injected', 'Open/Closed Interface Implemented', 'Coupling Score Reduced by 74%']
  },
  'foundational/design-patterns': {
    title: 'GoF Software Design Patterns in Modern Architecture',
    badge: 'Design Patterns',
    tagline: 'Master Creational, Structural, and Behavioral patterns (Factory, Strategy, Observer, Decorator, Adapter).',
    accentColor: '#38bdf8',
    why: 'Software engineers frequently reinvent the wheel with flawed ad-hoc architectures instead of leveraging proven, battle-tested Gang of Four (GoF) design patterns.',
    what: 'Comprehensive breakdown of Creational (Factory, Singleton, Builder), Structural (Adapter, Decorator, Composite), and Behavioral (Strategy, Observer, Command) patterns.',
    how: 'Apply patterns naturally to solve real-world problems: dynamic payment processors with Strategy, real-time event pub/sub with Observer, and legacy wrappers with Adapter.',
    where: 'Framework internals (Spring, ASP.NET, React), UI component libraries, enterprise plugin architectures, and financial transaction engines.',
    techStack: 'Strategy, Factory Method, Observer, Decorator, Adapter, Builder, Command, Singleton',
    salaryTiers: { mid: '$130,000 – $160,000', senior: '$165,000 – $215,000', principal: '$225,000 – $315,000+' },
    simTitle: 'Interactive Design Patterns Architecture Lab',
    simDesc: 'Switch dynamically between Strategy, Observer, and Factory patterns to observe message flow and object lifecycles.',
    simSteps: ['Strategy Pattern: Payment Gateway Selected', 'Factory Pattern: Instance Instantiated', 'Observer Pattern: 4 Subscribers Notified', 'Decorator Pattern: Logging & Encryption Wrapped', 'Pattern Decoupling Verified']
  },

  // AI & AGENTIC
  'ai': {
    title: 'Artificial Intelligence, Foundation Models & Agentic Systems',
    badge: 'AI & Agentic Systems',
    tagline: 'From LLM foundations to autonomous agent swarms: LangGraph, AWS Bedrock, Azure Foundry, Claude SDK, and Gemini SDK.',
    accentColor: '#a855f7',
    why: 'Static prompt engineering is dead. Production AI requires cyclical state machines, deterministic tool calling harnesses, and multi-model cloud infrastructure.',
    what: 'The full enterprise AI stack: LangGraph cyclic DAGs, AWS Bedrock foundation model orchestration, Azure AI Foundry prompt evaluation, Anthropic Claude SDK, and Google Gemini SDK.',
    how: 'Build autonomous agents equipped with MCP tool contracts, persistent memory checkpoints, multi-agent consensus, and automated guardrail evaluation.',
    where: 'Autonomous customer engineering agents, real-time code synthesis, medical diagnosis assistants, and automated enterprise operations.',
    techStack: 'LangGraph, AWS Bedrock, Azure AI Foundry, Claude SDK, Google Gemini SDK, MCP Protocol, Vector Databases',
    salaryTiers: { mid: '$145,000 – $185,000', senior: '$185,000 – $250,000', principal: '$255,000 – $380,000+' },
    simTitle: 'Multi-Agent Consensus & Execution Playground',
    simDesc: 'Dispatch user tasks to specialized agent nodes (Planner, Tool Exec, Evaluator) and watch real-time state transitions.',
    simSteps: ['Prompt Ingestion & Intent Analysis', 'Planner Node Generates Execution DAG', 'Tool Agent Invokes External APIs', 'Evaluator Checks Grounding & Guardrails', 'Final Synthesized Response Emitted']
  },
  'ai/langgraph': {
    title: 'LangGraph Cyclic State Graphs & Multi-Agent Architecture',
    badge: 'LangGraph State Machines',
    tagline: 'Master cyclic multi-agent graphs, state channels, human-in-the-loop approvals, and durable persistence.',
    accentColor: '#a855f7',
    why: 'Linear chains fail on complex tasks that require self-reflection, automated retries, and looping until verification passes.',
    what: 'Core LangGraph mechanics: StateGraph definition, conditional edges, parallel sub-graphs, channel reducers, SQLite/Postgres checkpointers, and human-in-the-loop interrupts.',
    how: 'Design graphs where agents can route back to themselves or peer nodes, evaluate intermediate results, and pause for human confirmation before destructive actions.',
    where: 'Automated software bug fixing bots, complex multi-step financial compliance audits, and autonomous research synthesis agents.',
    techStack: 'LangGraph, StateGraph, Checkpointers, Human-in-the-Loop, Reducers, Conditional Edges, LangSmith',
    salaryTiers: { mid: '$150,000 – $190,000', senior: '$190,000 – $260,000', principal: '$260,000 – $390,000+' },
    simTitle: 'LangGraph Cyclic State Machine Simulator',
    simDesc: 'Watch state flow through graph nodes with conditional branching, error self-correction loops, and state checkpoints.',
    simSteps: ['Initial State Initialized in Channel', 'Researcher Node Fetches Context', 'Critic Node Evaluates Output (Score < 80%)', 'Loop Back: Researcher Node Refines Search', 'Critic Node Approves -> Output Node Reached']
  },
  'ai/aws-bedrock': {
    title: 'AWS Bedrock Foundation Models & Enterprise Agentic AI',
    badge: 'AWS Bedrock AI',
    tagline: 'Deploy production AI with Amazon Titan, Claude 3.5, Llama 3, Bedrock Knowledge Bases, and Guardrails.',
    accentColor: '#a855f7',
    why: 'Enterprise compliance demands serverless foundation models hosted within private VPC boundaries without training on customer data.',
    what: 'AWS Bedrock architecture: Multi-model invocation (Anthropic Claude, Meta Llama, Amazon Titan), Bedrock Agents with action groups, Vector Knowledge Bases (OpenSearch Serverless), and Guardrails.',
    how: 'Integrate AWS Lambda action groups with OpenAPI specs, configure PII masking with Bedrock Guardrails, and automate RAG vector retrieval.',
    where: 'Enterprise customer care bots, AWS cloud architecture co-pilots, and internal secure knowledge search.',
    techStack: 'AWS Bedrock, Claude 3.5 Sonnet, OpenSearch Serverless, Bedrock Guardrails, Lambda Action Groups, IAM',
    salaryTiers: { mid: '$145,000 – $180,000', senior: '$180,000 – $245,000', principal: '$250,000 – $360,000+' },
    simTitle: 'AWS Bedrock Model Routing & Guardrails Simulator',
    simDesc: 'Test prompt filtering through Bedrock Guardrails, Knowledge Base vector retrieval, and Lambda action group execution.',
    simSteps: ['Prompt Dispatched to Bedrock Endpoint', 'Bedrock Guardrail Checks for PII / Toxicity', 'Knowledge Base Vector Query in OpenSearch', 'Claude 3.5 Sonnet Synthesizes Grounded Answer', 'Latency & Token Consumption Reported']
  },
  'ai/azure-foundry': {
    title: 'Azure AI Foundry & Enterprise Model Evaluation',
    badge: 'Azure AI Foundry',
    tagline: 'Build, evaluate, and deploy enterprise AI apps with Azure AI Studio, Prompt Flow, and automated safety metrics.',
    accentColor: '#a855f7',
    why: 'Enterprises need standardized CI/CD pipelines to benchmark LLM accuracy, groundedness, and safety before promoting models to production.',
    what: 'Azure AI Foundry features: Model catalog (OpenAI, Mistral, Meta), Prompt Flow DAG authoring, evaluation metrics (Groundedness, Relevance, Fluency), and Content Safety filters.',
    how: 'Construct visual Prompt Flows, link to Azure AI Search vector indexes, run batch evaluation runs against ground-truth datasets, and deploy managed endpoints.',
    where: 'Enterprise Microsoft 365 copilots, Azure enterprise customer intelligence, and regulated financial decision support.',
    techStack: 'Azure AI Foundry, Azure OpenAI, Prompt Flow, Azure AI Search, Content Safety, Python SDK',
    salaryTiers: { mid: '$145,000 – $185,000', senior: '$185,000 – $250,000', principal: '$255,000 – $370,000+' },
    simTitle: 'Azure Prompt Flow Execution & Groundedness Evaluator',
    simDesc: 'Execute a multi-step Azure Prompt Flow and review automated Groundedness and Relevance evaluation scores.',
    simSteps: ['Prompt Flow Node 1: Query Embedding', 'Prompt Flow Node 2: Azure AI Search Retrieval', 'Prompt Flow Node 3: GPT-4o Synthesis', 'Evaluation Run: Groundedness Metric Computed (0.94)', 'Model Deployment Ready in Azure']
  },
  'ai/claude-sdk': {
    title: 'Anthropic Claude SDK & Advanced Agentic Patterns',
    badge: 'Claude SDK',
    tagline: 'Master Anthropic Claude 3.5 Sonnet/Opus SDK, structured tool calling, prompt caching, and vision reasoning.',
    accentColor: '#a855f7',
    why: 'Claude 3.5 Sonnet leads world benchmarks in code synthesis and reasoning. Harnessing its SDK unlocks prompt caching cost savings up to 90% and precise tool use.',
    what: 'Deep-dive into Anthropic Python/TypeScript SDKs: Tool definitions with JSON schema, multi-turn message loops, Prompt Caching (`cache_control`), and streaming output.',
    how: 'Implement resilient agent loops with tool calling, parse structured tool requests, handle cache hits/misses, and leverage 200k token context windows.',
    where: 'Autonomous coding agents (similar to Cursor / Claude Engineer), legal contract analysis, and multi-modal image/diagram reasoning.',
    techStack: 'Anthropic SDK, Claude 3.5 Sonnet, Prompt Caching, Tool Calling, Vision API, Python, TypeScript',
    salaryTiers: { mid: '$150,000 – $190,000', senior: '$190,000 – $260,000', principal: '$265,000 – $390,000+' },
    simTitle: 'Claude 3.5 SDK Tool Calling & Prompt Caching Simulator',
    simDesc: 'Simulate sending a 50k token context with cache breakpoints, executing tool calls, and measuring token savings.',
    simSteps: ['System Prompt with 50K Tokens Sent', 'Cache Write Breakpoint Created', 'Subsequent Request: Cache Read Hit (90% Cost Reduction)', 'Claude Issues Structured Tool Call (`fetch_sql_data`)', 'Tool Result Fed Back & Final Answer Emitted']
  },
  'ai/google-gemini-sdk': {
    title: 'Google Gemini SDK & 2M Token Multimodal Architecture',
    badge: 'Google Gemini SDK',
    tagline: 'Leverage Google Gemini 1.5 Pro/Flash, 2M token context windows, audio/video multimodality, and context caching.',
    accentColor: '#a855f7',
    why: 'Gemini offers the world’s largest native context window (2M tokens) and native audio/video understanding, enabling entire codebases or hours of video to be processed in a single prompt.',
    what: 'Google GenAI SDK (Python/Node): Gemini 1.5 Pro and Flash invocation, Context Caching, Function Calling, Native Audio/Video tokens, and Grounding with Google Search.',
    how: 'Upload large PDFs or video streams, create explicit context caches to reduce latency and cost, define typed function declarations, and stream responses.',
    where: 'Full codebase repository understanding, video meeting summarization, multi-lingual audio translation, and multimodal document search.',
    techStack: 'Google GenAI SDK, Gemini 1.5 Pro, Gemini 1.5 Flash, 2M Context Window, Context Caching, Multimodal Audio/Video',
    salaryTiers: { mid: '$145,000 – $185,000', senior: '$185,000 – $250,000', principal: '$255,000 – $375,000+' },
    simTitle: 'Gemini 2M Context Cache & Multimodal Processing Lab',
    simDesc: 'Simulate ingesting video frames and a full repository, activating context cache, and executing zero-shot reasoning.',
    simSteps: ['1M Token Codebase Uploaded to Gemini Context', 'Context Cache Activated (1 hour TTL)', 'Zero-Shot Search Executed Across Entire Repo', 'Function Call Emitted with Accurate File Line Pointer', 'Response Streamed in 120ms']
  },

  // DATA ENGINEERING
  'data-engineering/onprem-pandas-polars-sql': {
    title: 'On-Premises Data Engineering: Pandas 2.0, Polars & SQL',
    badge: 'Pandas, Polars & SQL',
    tagline: 'High-performance local data engineering: Apache Arrow backends, Polars LazyFrames, vectorized computation, and local SQL engines.',
    accentColor: '#0284c7',
    why: 'Not every workload requires expensive distributed cloud clusters. Single-machine multi-core vectorized engines (Polars) can process 100M+ rows in seconds at near-zero cloud cost.',
    what: 'Mastering modern on-prem data engineering: Pandas 2.0 with PyArrow backends, Polars multi-threaded Rust engine with LazyFrames, and local SQLite/DuckDB SQL pipelines.',
    how: 'Write query plans with Polars Lazy API to enable predicate pushdown and projection pruning, handle out-of-core memory streaming, and benchmark against Pandas.',
    where: 'On-premise enterprise servers, edge computing nodes, data science experimentation, and cost-optimized ETL batch pipelines.',
    techStack: 'Polars, Pandas 2.0, PyArrow, SQLite, DuckDB, Python, Rust, Vectorized SQL, Parquet',
    salaryTiers: { mid: '$125,000 – $155,000', senior: '$160,000 – $215,000', principal: '$220,000 – $310,000+' },
    simTitle: 'Vectorized Engine Benchmark: Pandas vs Polars LazyFrame',
    simDesc: 'Simulate running an aggregate join on 10 million rows and observe memory consumption, CPU utilization, and execution time.',
    simSteps: ['10M Rows Loaded into Memory', 'Pandas 1.x Baseline Execution (18.4s, High RAM)', 'Polars LazyFrame Plan Constructed (Predicate Pushdown)', 'Multi-Core Vectorized SIMD Execution (0.68s)', 'Arrow Memory Zero-Copy Result Emitted']
  },
  'data-engineering/duckdb': {
    title: 'DuckDB: In-Process Columnar Analytical OLAP',
    badge: 'DuckDB OLAP',
    tagline: 'The SQLite of analytics: Zero-dependency in-process OLAP, direct Parquet querying, vectorized execution, and zero-copy Arrow integration.',
    accentColor: '#0284c7',
    why: 'Traditional data warehouses require heavy server setups and network hops. DuckDB brings blazing-fast analytical SQL directly into Python, Node, or the browser.',
    what: 'DuckDB architectural mastery: Vectorized columnar query execution, reading remote S3/HTTP Parquet files with HTTP range requests, window functions, and DuckDB-WASM.',
    how: 'Query gigabyte-scale datasets directly from S3 without downloading entire files, integrate seamlessly with MotherDuck cloud, and embed inside FastAPI microservices.',
    where: 'Embedded analytics dashboards, serverless data pipelines, local Parquet data lake exploration, and in-browser WASM analytics.',
    techStack: 'DuckDB, Parquet, Apache Arrow, MotherDuck, DuckDB-WASM, SQL, Python, S3 HTTP Range Requests',
    salaryTiers: { mid: '$130,000 – $165,000', senior: '$165,000 – $225,000', principal: '$230,000 – $325,000+' },
    simTitle: 'DuckDB In-Process Analytical Query & Parquet Scan Simulator',
    simDesc: 'Execute columnar SQL queries against simulated S3 Parquet files with automatic partition and column projection pruning.',
    simSteps: ['Remote Parquet Metadata Header Read via HTTP Range', 'Column Pruning: Only 2 of 24 Columns Read', 'Vectorized SIMD Engine Processes 100K Chunk Batches', 'Aggregated Window Results Produced in 42ms', 'Zero-Copy Export to Apache Arrow Table']
  },

  // DATA GOVERNANCE
  'data-governence/atlas': {
    title: 'Apache Atlas: Open-Source Enterprise Metadata & Lineage',
    badge: 'Apache Atlas',
    tagline: 'Enterprise metadata repository, automated classification propagation, and end-to-end data lineage graphs.',
    accentColor: '#10b981',
    why: 'Enterprises must maintain regulatory compliance (GDPR, BCBS 239) and understand data provenance across hybrid and on-premises Hadoop/Spark/Kafka stacks.',
    what: 'Apache Atlas architecture: Core Type System (Entities, Traits, Classifications), JanusGraph backing index, automated metadata ingestion from Hive/Spark/Kafka, and lineage REST APIs.',
    how: 'Define custom data classification tags (PII, Confidential), establish automated lineage hooks from Spark DAGs, and propagate tags downstream through transformations.',
    where: 'Tier-1 banks, insurance carriers, and healthcare enterprises running hybrid on-premise and private cloud data platforms.',
    techStack: 'Apache Atlas, JanusGraph, Apache Kafka, Apache Hive, OpenLineage, Apache Ranger, REST APIs',
    salaryTiers: { mid: '$130,000 – $165,000', senior: '$170,000 – $225,000', principal: '$230,000 – $330,000+' },
    simTitle: 'Apache Atlas Lineage Graph & Tag Propagation Lab',
    simDesc: 'Trace data flowing from Source to Data Lake to Warehouse and watch PII classifications propagate automatically across downstream entities.',
    simSteps: ['Kafka Topic Entity Created (`customer_events`)', 'PII Tag Applied to `ssn_number` Attribute', 'Spark Job Ingestion Step Triggered', 'Atlas Graph Automatically Traverses Lineage Edge', 'Downstream Gold Table Inherits PII Security Tag']
  },
  'data-governence/unity': {
    title: 'Databricks Unity Catalog: Unified Governance & ABAC',
    badge: 'Unity Catalog',
    tagline: 'Master Databricks 3-level namespace (`catalog.schema.table`), fine-grained row/column filters, and automated audit logs.',
    accentColor: '#10b981',
    why: 'Managing fragmented access policies across AWS, Azure, and GCP creates security gaps and audit failures. Unity Catalog unifies data and AI governance under a single pane.',
    what: 'Unity Catalog mechanics: 3-level namespace, Attribute-Based Access Control (ABAC), dynamic column masking functions, row filter predicates, and system table audit logging.',
    how: 'Configure data isolation per workspace, write SQL security policies (`MASK_SSN(ssn, CURRENT_USER())`), and track column-level lineage automatically across notebooks and jobs.',
    where: 'Multi-cloud enterprise Databricks lakehouses, financial compliance reporting, and enterprise GenAI model cataloging.',
    techStack: 'Databricks Unity Catalog, Delta Lake, SQL Row Filters, Column Masking, System Tables, SCIM, ABAC',
    salaryTiers: { mid: '$140,000 – $175,000', senior: '$175,000 – $240,000', principal: '$245,000 – $350,000+' },
    simTitle: 'Databricks Unity Catalog 3-Level Namespace & Masking Lab',
    simDesc: 'Toggle user roles (Analyst vs Admin) to observe dynamic column masking and row filtering applied in real time.',
    simSteps: ['Role Selected: Business Analyst (Non-Admin)', 'Unity Catalog Query Dispatched (`prod.finance.transactions`)', 'Row Filter Applied: Only US Region Returned', 'Column Mask Applied: Credit Card Masked (`****-****-****-1234`)', 'Audit Log Entry Written to `system.access.audit`']
  },

  // FULL STACK
  'full-stack': {
    title: 'Full Stack Enterprise Systems Architecture',
    badge: 'Full Stack Master Hub',
    tagline: 'End-to-end modern software engineering: Python FastAPI, Node.js React Next.js, C#/.NET Core, and Java Spring Boot.',
    accentColor: '#f43f5e',
    why: 'Modern engineers must bridge the gap between high-performance backends and reactive, accessible user interfaces to ship production-grade products.',
    what: 'Mastering the top 4 enterprise full stack ecosystems: Python FastAPI microservices, Node.js React 19 Next.js App Router, C# ASP.NET Core 8 with EF Core, and Java Spring Boot 3.',
    how: 'Design end-to-end distributed systems: typed REST/gRPC backends, reactive server-side rendered frontends, database migrations, and CI/CD pipelines.',
    where: 'Enterprise SaaS products, internal developer platforms, financial client portals, and cloud-native consumer applications.',
    techStack: 'FastAPI, Next.js, React, ASP.NET Core, Spring Boot, PostgreSQL, Docker, TailwindCSS, TypeScript',
    salaryTiers: { mid: '$130,000 – $165,000', senior: '$165,000 – $225,000', principal: '$230,000 – $330,000+' },
    simTitle: 'Full Stack Request Lifecycle Simulator: Client to DB',
    simDesc: 'Trace an end-to-end transaction from Next.js frontend through API Gateway to Microservice backend and Database cluster.',
    simSteps: ['Client Triggers Next.js Server Action', 'Hydrated Request Reaches API Gateway', 'Microservice Processes Request with Async ORM', 'Database Commit Completed with Read Replica Sync', 'Reactive UI Updates with Zero Re-render']
  },
  'full-stack/python-fastapi': {
    title: 'Python FastAPI: Modern Async High-Performance APIs',
    badge: 'FastAPI Microservices',
    tagline: 'Master async/await, Pydantic v2 schemas, dependency injection, SQLAlchemy 2.0, and automated OpenAPI Swagger documentation.',
    accentColor: '#f43f5e',
    why: 'Python is the language of data and AI, but traditional frameworks (Django/Flask) were synchronous and slow. FastAPI delivers Node/Go speeds with Python elegance.',
    what: 'FastAPI complete architecture: Starlette ASGI core, Pydantic v2 validation, OAuth2 JWT security integration, async database sessions with SQLAlchemy 2.0 / asyncpg, and background tasks.',
    how: 'Construct clean layered architectures (Router -> Service -> Repository), leverage dependency injection for database sessions, and export OpenAPI contracts.',
    where: 'AI model inference APIs, high-throughput data microservices, real-time IoT feeds, and modern enterprise backends.',
    techStack: 'FastAPI, Pydantic v2, Uvicorn, SQLAlchemy 2.0, asyncpg, Alembic, Docker, Pytest, Celery',
    salaryTiers: { mid: '$130,000 – $160,000', senior: '$165,000 – $220,000', principal: '$225,000 – $320,000+' },
    simTitle: 'FastAPI Async Request & Pydantic Validation Lab',
    simDesc: 'Send payloads to an async FastAPI endpoint, test Pydantic schema validation, and observe sub-millisecond execution times.',
    simSteps: ['HTTP POST Payload Dispatched', 'Pydantic v2 Schema Validation Executed', 'Async Dependency Injects DB Session', 'Non-Blocking Async Database Query Awaited', 'Auto-Generated OpenAPI Swagger Specs Updated']
  },
  'full-stack/nodejs-react-nextjs': {
    title: 'Node.js, React 19 & Next.js App Router Architecture',
    badge: 'Node, React & Next.js',
    tagline: 'Master React Server Components (RSC), Next.js App Router, streaming SSR, Server Actions, and Node.js microservices.',
    accentColor: '#f43f5e',
    why: 'Client-side heavy SPAs suffer from slow initial loads and SEO penalties. React 19 and Next.js unify frontend and backend with hybrid server-driven rendering.',
    what: 'Deep-dive into React 19 and Next.js: App Router file-system routing, Server vs Client components, Suspense streaming, Server Actions, and Node.js event loops.',
    how: 'Optimize Core Web Vitals, implement zero-bundle-size server components, build resilient Node API endpoints, and deploy to Vercel/Docker clusters.',
    where: 'Enterprise customer web apps, e-commerce storefronts, SaaS dashboards, and content platforms.',
    techStack: 'Next.js 15, React 19, TypeScript, Node.js, Server Actions, Suspense, TailwindCSS, Prisma, PostgreSQL',
    salaryTiers: { mid: '$130,000 – $165,000', senior: '$165,000 – $225,000', principal: '$230,000 – $325,000+' },
    simTitle: 'Next.js Server Components & Streaming SSR Simulator',
    simDesc: 'Watch how React Server Components render on the server and stream chunks to the client with selective hydration.',
    simSteps: ['Request Received by Next.js Server', 'Server Component Fetches Data Directly from DB', 'HTML Shell Streamed Immediately (First Contentful Paint)', 'Suspense Boundary Resolves Heavy Slow Component', 'Client-Side Interactivity Hydrated with Zero Extra Bundle']
  },
  'full-stack/dotnet-csharp': {
    title: 'C# and .NET 8 Full Stack Enterprise Architecture',
    badge: 'C# / .NET 8 Stack',
    tagline: 'Build ultra-fast enterprise apps with ASP.NET Core 8 Web API, Entity Framework Core, Blazor, and Clean Architecture.',
    accentColor: '#f43f5e',
    why: '.NET is a global enterprise powerhouse running critical financial and industrial backends with unmatched throughput, memory efficiency, and C# type safety.',
    what: 'Full .NET 8 architecture: Minimal APIs vs Controllers, Entity Framework Core with compiled queries, Clean Architecture / MediatR CQRS, and Blazor / React frontends.',
    how: 'Design testable Domain-Driven applications, implement generic repositories with specification patterns, configure Serilog and OpenTelemetry, and deploy to Azure.',
    where: 'Global tier-1 banking platforms, healthcare ERPs, insurance policy engines, and enterprise back-office management.',
    techStack: '.NET 8, C#, ASP.NET Core, Entity Framework Core, MediatR, Blazor, SQL Server, Docker, Azure',
    salaryTiers: { mid: '$130,000 – $160,000', senior: '$165,000 – $220,000', principal: '$225,000 – $315,000+' },
    simTitle: '.NET 8 Web API Clean Architecture & CQRS Simulator',
    simDesc: 'Dispatch a Command through MediatR pipeline behaviors to EF Core and observe compiled SQL query execution.',
    simSteps: ['API Request Handled by Minimal API Route', 'MediatR Pipeline Validation Behavior Invoked', 'Handler Executes Business Domain Logic', 'EF Core Generates Parameterized SQL Query', 'Compiled Entity Emitted with Sub-Millisecond Latency']
  },
  'full-stack/java-fullstack': {
    title: 'Java Full Stack: Spring Boot 3 & Microservices',
    badge: 'Java Spring Boot 3',
    tagline: 'Master Java 21, Spring Boot 3, Spring Security 6, Hibernate JPA, Spring Cloud, and enterprise microservices.',
    accentColor: '#f43f5e',
    why: 'Java remains the dominant enterprise language across Fortune 500 infrastructure. Spring Boot 3 with Java 21 Virtual Threads delivers massive concurrency at scale.',
    what: 'Spring Boot 3 ecosystem: Spring Data JPA, Hibernate second-level caching, Spring Security with OAuth2/JWT, Spring Cloud Gateway, and Virtual Threads (Project Loom).',
    how: 'Structure multi-module Gradle/Maven enterprise services, implement transactional boundaries with `@Transactional`, manage schema migrations with Flyway, and containerize.',
    where: 'Global banking payment rails, airline booking reservations, telecom billing systems, and government enterprise portals.',
    techStack: 'Java 21, Spring Boot 3, Spring Security 6, Hibernate, PostgreSQL, Docker, Kubernetes, Maven',
    salaryTiers: { mid: '$130,000 – $165,000', senior: '$165,000 – $225,000', principal: '$230,000 – $325,000+' },
    simTitle: 'Java Spring Boot 3 Virtual Threads & JPA Simulator',
    simDesc: 'Simulate high-concurrency requests processed by Java 21 Virtual Threads without pinning carrier OS threads.',
    simSteps: ['10,000 Concurrent Requests Received', 'Java 21 Virtual Thread Spawned Per Request', 'Spring Security Filter Validates Bearer Token', 'Hibernate Query Optimized via 2nd Level Cache', 'Response Dispatched with Near-Zero Memory Overhead']
  }
};

function getRelPrefix(depth) {
  return depth === 0 ? '' : depth === 1 ? '../' : '../../';
}

function buildIndexHtml(folder, meta, depth) {
  const relPrefix = getRelPrefix(depth);
  const dropdownHtml = buildMegaDropdownHtml(relPrefix);
  const homeLink = `${relPrefix}index.html`;
  const demoLink = 'demo.html';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title} | Tinitiate MasterClass Academy</title>
  <link rel="icon" type="image/png" href="${relPrefix}favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${relPrefix}assets/css/master-global-layout.css">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="theme-dark">

  <!-- Master Top Navigation Bar -->
  <header class="master-top-nav">
    <div class="master-top-nav-inner">
      <a href="${homeLink}" class="master-brand-wrap" aria-label="Tinitiate MasterClass Academy">
        <img src="${relPrefix}tinitiate_header-banner.png" alt="Tinitiate Logo" class="master-brand-logo">
        <span class="master-brand-badge">${meta.badge}</span>
      </a>

      <nav class="master-menu-links">
        <a href="${homeLink}" class="master-nav-btn" title="Main Academy Portal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </a>
        <a href="index.html" class="master-nav-btn subject-home-btn" title="${meta.title}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
          <span>${meta.badge}</span>
        </a>
        <a href="${demoLink}" class="master-nav-btn" title="Launch Interactive Demo" style="border-color:rgba(124,58,237,0.5);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Interactive Demo</span>
        </a>

        ${dropdownHtml}
      </nav>

      <div class="master-nav-actions">
        <div class="master-instructor-beam" title="Lead Course Instructor &amp; Enterprise Architect">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          <span class="inst-label">Instructor:</span>
          <span class="inst-name">Venkata Bhattaram</span>
        </div>
        <a href="https://www.linkedin.com/in/venkata-bhattaram/" target="_blank" rel="noopener noreferrer" class="master-nav-social-btn linkedin" title="Venkata Bhattaram LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="master-nav-social-btn github" title="Venkata Bhattaram GitHub">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Banner -->
  <main class="page-main-wrap" style="max-width:1400px;margin:0 auto;padding:32px 24px;">
    
    <section class="subject-hero-card" style="background:radial-gradient(ellipse at top right, rgba(124,58,237,0.18), transparent 70%), rgba(15,23,42,0.75);border:1px solid rgba(255,255,255,0.1);border-radius:18px;padding:40px;margin-bottom:32px;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap;">
        <span style="font-size:0.75rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:${meta.accentColor};background:rgba(255,255,255,0.06);padding:4px 12px;border-radius:20px;border:1px solid ${meta.accentColor}44;">
          Tinitiate MasterClass Academy • 2026 Edition
        </span>
        <span style="font-size:0.75rem;font-weight:700;color:#10b981;background:rgba(16,185,129,0.12);padding:4px 12px;border-radius:20px;border:1px solid rgba(16,185,129,0.3);">
          Zero to Hero Architecture
        </span>
      </div>
      <h1 style="font-size:2.4rem;font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 14px 0;">
        ${meta.title}
      </h1>
      <p style="font-size:1.1rem;color:#cbd5e1;max-width:860px;line-height:1.6;margin:0 0 28px 0;">
        ${meta.tagline}
      </p>

      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;">
        <a href="${demoLink}" style="display:inline-flex;align-items:center;gap:10px;padding:12px 24px;border-radius:10px;background:linear-gradient(135deg, #7c3aed, #4f46e5);color:#fff;font-weight:700;text-decoration:none;box-shadow:0 10px 25px rgba(124,58,237,0.4);transition:all 0.2s ease;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Launch Interactive Demo Lab</span>
        </a>
        <a href="#sec-pillars" style="display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#f1f5f9;font-weight:600;text-decoration:none;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          <span>Explore Architecture Pillars</span>
        </a>
      </div>
    </section>

    <!-- 4-Pillars Matrix: WHY, WHAT, HOW, WHERE -->
    <section id="sec-pillars" class="pillars-matrix-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;margin-bottom:36px;">
      
      <!-- Pillar 1: WHY -->
      <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:24px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(239,68,68,0.15);display:flex;align-items:center;justify-content:center;color:#ef4444;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
          </div>
          <div>
            <span style="font-size:0.75rem;font-weight:800;color:#ef4444;text-transform:uppercase;">Pillar 01 &bull; Catalyst</span>
            <h3 style="font-size:1.1rem;font-weight:700;color:#ffffff;margin:0;">Why It Matters</h3>
          </div>
        </div>
        <p style="font-size:0.9rem;color:#cbd5e1;line-height:1.6;margin:0;">
          ${meta.why}
        </p>
      </div>

      <!-- Pillar 2: WHAT -->
      <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(2,132,199,0.3);border-radius:14px;padding:24px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(2,132,199,0.15);display:flex;align-items:center;justify-content:center;color:#38bdf8;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <div>
            <span style="font-size:0.75rem;font-weight:800;color:#38bdf8;text-transform:uppercase;">Pillar 02 &bull; Topology</span>
            <h3 style="font-size:1.1rem;font-weight:700;color:#ffffff;margin:0;">What It Covers</h3>
          </div>
        </div>
        <p style="font-size:0.9rem;color:#cbd5e1;line-height:1.6;margin:0;">
          ${meta.what}
        </p>
      </div>

      <!-- Pillar 3: HOW -->
      <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(16,185,129,0.3);border-radius:14px;padding:24px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(16,185,129,0.15);display:flex;align-items:center;justify-content:center;color:#10b981;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
          <div>
            <span style="font-size:0.75rem;font-weight:800;color:#10b981;text-transform:uppercase;">Pillar 03 &bull; Execution</span>
            <h3 style="font-size:1.1rem;font-weight:700;color:#ffffff;margin:0;">How It Operates</h3>
          </div>
        </div>
        <p style="font-size:0.9rem;color:#cbd5e1;line-height:1.6;margin:0;">
          ${meta.how}
        </p>
      </div>

      <!-- Pillar 4: WHERE -->
      <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(168,85,247,0.3);border-radius:14px;padding:24px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(168,85,247,0.15);display:flex;align-items:center;justify-content:center;color:#c084fc;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <div>
            <span style="font-size:0.75rem;font-weight:800;color:#c084fc;text-transform:uppercase;">Pillar 04 &bull; Real-World</span>
            <h3 style="font-size:1.1rem;font-weight:700;color:#ffffff;margin:0;">Where It Is Applied</h3>
          </div>
        </div>
        <p style="font-size:0.9rem;color:#cbd5e1;line-height:1.6;margin:0;">
          ${meta.where}
        </p>
      </div>

    </section>

    <!-- Job Market Dynamic Analysis Placeholder -->
    <section class="job-market-box" style="background:rgba(15,23,42,0.75);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;margin-bottom:36px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <span style="font-size:0.75rem;font-weight:800;color:#a855f7;text-transform:uppercase;letter-spacing:0.05em;">
            Industry Telemetry &bull; 2026 Edition
          </span>
          <h3 style="font-size:1.3rem;font-weight:700;color:#ffffff;margin:4px 0 0 0;">Job Market Dynamics &amp; Career Trajectory</h3>
        </div>
        <span style="font-size:0.8rem;font-weight:700;color:#38bdf8;background:rgba(56,189,248,0.12);padding:6px 14px;border-radius:20px;border:1px solid rgba(56,189,248,0.3);">
          High Enterprise Demand Track
        </span>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:20px;">
        <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px;">
          <h4 style="font-size:0.92rem;font-weight:700;color:#38bdf8;margin:0 0 10px 0;">Target Tech Competencies</h4>
          <p style="font-size:0.85rem;color:#cbd5e1;line-height:1.6;margin:0;">${meta.techStack}</p>
        </div>

        <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px;">
          <h4 style="font-size:0.92rem;font-weight:700;color:#10b981;margin:0 0 10px 0;">Compensation Ranges (US Base)</h4>
          <ul style="list-style:none;padding:0;margin:0;font-size:0.85rem;color:#cbd5e1;line-height:1.7;">
            <li><strong>Mid-Level:</strong> ${meta.salaryTiers.mid}</li>
            <li><strong>Senior Architect:</strong> ${meta.salaryTiers.senior}</li>
            <li><strong>Principal Enterprise Lead:</strong> ${meta.salaryTiers.principal}</li>
          </ul>
        </div>

        <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px;">
          <h4 style="font-size:0.92rem;font-weight:700;color:#f59e0b;margin:0 0 10px 0;">Key Hiring Sectors</h4>
          <p style="font-size:0.85rem;color:#cbd5e1;line-height:1.6;margin:0;">Global FinTech, Silicon Valley AI Labs, Cloud Hyperscalers, Healthcare BioTech, and Enterprise SaaS.</p>
        </div>
      </div>

      <div style="margin-top:20px;font-size:0.78rem;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <span><strong>Section Status:</strong> Dedicated Job Market Analysis Placeholder &mdash; Aggregated industry salary ranges and talent momentum.</span>
        <span>Source: LinkedIn Talent Insights &bull; Refreshed Bi-Weekly</span>
      </div>
    </section>

    <!-- Interactive Simulator Launchpad Banner -->
    <section style="background:linear-gradient(135deg, rgba(124,58,237,0.15), rgba(15,23,42,0.85));border:1px solid rgba(124,58,237,0.35);border-radius:16px;padding:32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;margin-bottom:40px;">
      <div>
        <span style="font-size:0.75rem;font-weight:800;color:#c084fc;text-transform:uppercase;letter-spacing:0.05em;">Hands-On Engineering Simulator</span>
        <h3 style="font-size:1.4rem;font-weight:700;color:#ffffff;margin:4px 0 8px 0;">${meta.simTitle}</h3>
        <p style="font-size:0.95rem;color:#cbd5e1;margin:0;max-width:720px;">${meta.simDesc}</p>
      </div>
      <a href="${demoLink}" style="display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border-radius:10px;background:#7c3aed;color:#ffffff;font-weight:700;text-decoration:none;box-shadow:0 10px 25px rgba(124,58,237,0.4);transition:all 0.2s ease;">
        <span>Open Live Simulator Lab</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </section>

  </main>

  <!-- Master Footer -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-main-grid">
        <div class="footer-col">
          <div class="footer-col-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
            <span>Tinitiate AI Academy</span>
          </div>
          <p class="footer-col-desc">
            Industry-aligned IT training curriculum designed to transition software engineers, cloud architects, and data professionals into high-impact AI, GenAI, and Distributed Lakehouse Engineering roles.
          </p>
          <span class="footer-contact-label">Company Social Channels</span>
          <div class="footer-socials-grid">
            <a href="https://linkedin.com/company/tinitiate" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>
            </a>
            <a href="https://youtube.com/@tinitiate" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-col-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            <span>Instructor &bull; Venkata Bhattaram</span>
          </div>
          <p class="footer-col-desc">
            Principal Enterprise Architect and Lead Instructor at Tinitiate AI. Over two decades architecting distributed computing, lakehouse telemetry, and multi-agent AI ecosystems for Fortune 500 enterprises.
          </p>
          <div class="footer-instructor-card">
            <div class="footer-inst-avatar">VB</div>
            <div class="footer-inst-info">
              <span class="footer-inst-name">Venkata Bhattaram</span>
              <span class="footer-inst-role">Chief Architect &amp; Lead Trainer</span>
            </div>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-col-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Academy Inquiries</span>
          </div>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href="mailto:contact@tinitiateai.com" class="footer-web-link">contact@tinitiateai.com</a>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <a href="https://tinitiateai.com" target="_blank" rel="noopener noreferrer" class="footer-web-link">tinitiateai.com</a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div class="footer-copy">
          &copy; 2026 <strong>Venkata Bhattaram</strong> &bull; <a href="https://tinitiateai.com" target="_blank" rel="noopener noreferrer" style="color:#ffffff;text-decoration:none;font-weight:700;">TinitiateAI.com</a> &bull; All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>

  <script src="${relPrefix}assets/js/master-global-nav.js"></script>
  <script>
    if (window.lucide) {
      lucide.createIcons();
    }
  </script>
</body>
</html>`;
}

function buildDemoHtml(folder, meta, depth) {
  const relPrefix = getRelPrefix(depth);
  const dropdownHtml = buildMegaDropdownHtml(relPrefix);
  const homeLink = `${relPrefix}index.html`;

  const stepsList = meta.simSteps.map((st, i) => {
    return `<div class="sim-step-node" id="step-node-${i}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;transition:all 0.2s ease;">
      <div class="sim-step-num" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;color:#cbd5e1;">0${i+1}</div>
      <div style="font-size:0.9rem;font-weight:600;color:#f1f5f9;">${st}</div>
    </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.badge} - Interactive Simulator &amp; Live Demo Lab | Tinitiate MasterClass Academy</title>
  <link rel="icon" type="image/png" href="${relPrefix}favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${relPrefix}assets/css/master-global-layout.css">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="theme-dark">

  <!-- Master Top Navigation Bar -->
  <header class="master-top-nav">
    <div class="master-top-nav-inner">
      <a href="${homeLink}" class="master-brand-wrap" aria-label="Tinitiate MasterClass Academy">
        <img src="${relPrefix}tinitiate_header-banner.png" alt="Tinitiate Logo" class="master-brand-logo">
        <span class="master-brand-badge">${meta.badge} Demo</span>
      </a>

      <nav class="master-menu-links">
        <a href="${homeLink}" class="master-nav-btn" title="Main Academy Portal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </a>
        <a href="index.html" class="master-nav-btn" title="${meta.title}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
          <span>${meta.badge}</span>
        </a>
        <a href="demo.html" class="master-nav-btn subject-home-btn" title="Interactive Simulator">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Interactive Demo</span>
        </a>

        ${dropdownHtml}
      </nav>

      <div class="master-nav-actions">
        <div class="master-instructor-beam" title="Lead Course Instructor &amp; Enterprise Architect">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          <span class="inst-label">Instructor:</span>
          <span class="inst-name">Venkata Bhattaram</span>
        </div>
        <a href="https://www.linkedin.com/in/venkata-bhattaram/" target="_blank" rel="noopener noreferrer" class="master-nav-social-btn linkedin" title="Venkata Bhattaram LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="master-nav-social-btn github" title="Venkata Bhattaram GitHub">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </header>

  <main class="page-main-wrap" style="max-width:1400px;margin:0 auto;padding:32px 24px;">
    
    <!-- Simulator Title Header -->
    <div style="margin-bottom:28px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:0.75rem;font-weight:800;color:${meta.accentColor};background:rgba(255,255,255,0.06);padding:4px 12px;border-radius:20px;border:1px solid ${meta.accentColor}44;">
          LIVE LAB &bull; ARCHITECTURAL SIMULATOR
        </span>
        <span style="font-size:0.75rem;font-weight:700;color:#10b981;background:rgba(16,185,129,0.12);padding:4px 12px;border-radius:20px;">
          Telemetry Connected
        </span>
      </div>
      <h1 style="font-size:2.2rem;font-weight:800;color:#ffffff;margin:0 0 8px 0;">
        ${meta.simTitle}
      </h1>
      <p style="font-size:1rem;color:#cbd5e1;margin:0;">
        ${meta.simDesc}
      </p>
    </div>

    <!-- Simulator Workspace Grid -->
    <div style="display:grid;grid-template-columns:1fr 380px;gap:24px;margin-bottom:40px;">
      
      <!-- Left Column: Visual Execution Canvas -->
      <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:20px;">
        
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:14px;">
          <h3 style="font-size:1.1rem;font-weight:700;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${meta.accentColor}" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            <span>Live Architectural Execution Flow</span>
          </h3>
          <span id="sim-status-badge" style="font-size:0.75rem;font-weight:700;color:#38bdf8;background:rgba(56,189,248,0.12);padding:3px 10px;border-radius:12px;">
            IDLE / READY
          </span>
        </div>

        <!-- Interactive Diagram Steps -->
        <div style="display:flex;flex-direction:column;gap:10px;">
${stepsList}
        </div>

        <!-- Metrics Dashboard -->
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-top:12px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);">
          <div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.75rem;color:#94a3b8;display:block;">Latency</span>
            <span id="metric-latency" style="font-size:1.2rem;font-weight:800;color:#10b981;">0 ms</span>
          </div>
          <div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.75rem;color:#94a3b8;display:block;">Throughput</span>
            <span id="metric-throughput" style="font-size:1.2rem;font-weight:800;color:#38bdf8;">0 req/s</span>
          </div>
          <div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.75rem;color:#94a3b8;display:block;">State Checkpoint</span>
            <span id="metric-state" style="font-size:1.2rem;font-weight:800;color:#c084fc;">Clean</span>
          </div>
        </div>

      </div>

      <!-- Right Column: Control Panel & Telemetry Stream -->
      <div style="display:flex;flex-direction:column;gap:20px;">
        
        <!-- Controls Card -->
        <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;">
          <h3 style="font-size:1.05rem;font-weight:700;color:#ffffff;margin:0 0 16px 0;">Simulator Controls</h3>
          
          <div style="display:flex;flex-direction:column;gap:12px;">
            <button type="button" onclick="runSimulation()" id="btn-run" style="width:100%;padding:12px;border-radius:10px;background:linear-gradient(135deg, #7c3aed, #4f46e5);border:none;color:#fff;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 20px rgba(124,58,237,0.4);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Execute End-to-End Simulation</span>
            </button>
            <button type="button" onclick="stepSimulation()" id="btn-step" style="width:100%;padding:10px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#f1f5f9;font-weight:600;cursor:pointer;">
              Step-by-Step Inspection
            </button>
            <button type="button" onclick="resetSimulation()" id="btn-reset" style="width:100%;padding:10px;border-radius:10px;background:transparent;border:1px solid rgba(239,68,68,0.3);color:#fca5a5;font-weight:600;cursor:pointer;">
              Reset Architecture State
            </button>
          </div>
        </div>

        <!-- Telemetry Stream Logs -->
        <div style="background:rgba(10,15,30,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:20px;flex:1;display:flex;flex-direction:column;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <span style="font-size:0.75rem;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Live Telemetry Stream</span>
            <button onclick="clearLogs()" style="background:none;border:none;color:#64748b;font-size:0.75rem;cursor:pointer;">Clear</button>
          </div>
          <div id="sim-log-terminal" style="font-family:'JetBrains Mono', monospace;font-size:0.78rem;color:#cbd5e1;line-height:1.5;overflow-y:auto;max-height:260px;display:flex;flex-direction:column;gap:6px;">
            <div style="color:#64748b;">[System initialized. Ready for execution.]</div>
          </div>
        </div>

      </div>

    </div>

  </main>

  <!-- Master Footer -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-main-grid">
        <div class="footer-col">
          <div class="footer-col-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
            <span>Tinitiate AI Academy</span>
          </div>
          <p class="footer-col-desc">
            Industry-aligned IT training curriculum designed to transition software engineers, cloud architects, and data professionals into high-impact AI, GenAI, and Distributed Lakehouse Engineering roles.
          </p>
          <span class="footer-contact-label">Company Social Channels</span>
          <div class="footer-socials-grid">
            <a href="https://linkedin.com/company/tinitiate" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>
            </a>
            <a href="https://youtube.com/@tinitiate" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-col-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            <span>Instructor &bull; Venkata Bhattaram</span>
          </div>
          <p class="footer-col-desc">
            Principal Enterprise Architect and Lead Instructor at Tinitiate AI. Over two decades architecting distributed computing, lakehouse telemetry, and multi-agent AI ecosystems for Fortune 500 enterprises.
          </p>
          <div class="footer-instructor-card">
            <div class="footer-inst-avatar">VB</div>
            <div class="footer-inst-info">
              <span class="footer-inst-name">Venkata Bhattaram</span>
              <span class="footer-inst-role">Chief Architect &amp; Lead Trainer</span>
            </div>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-col-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Academy Inquiries</span>
          </div>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href="mailto:contact@tinitiateai.com" class="footer-web-link">contact@tinitiateai.com</a>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <a href="https://tinitiateai.com" target="_blank" rel="noopener noreferrer" class="footer-web-link">tinitiateai.com</a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div class="footer-copy">
          &copy; 2026 <strong>Venkata Bhattaram</strong> &bull; <a href="https://tinitiateai.com" target="_blank" rel="noopener noreferrer" style="color:#ffffff;text-decoration:none;font-weight:700;">TinitiateAI.com</a> &bull; All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>

  <script src="${relPrefix}assets/js/master-global-nav.js"></script>
  <script>
    let currentStep = -1;
    const totalSteps = ${meta.simSteps.length};
    const stepsData = ${JSON.stringify(meta.simSteps)};
    let isRunning = false;

    function log(msg, color = '#cbd5e1') {
      const term = document.getElementById('sim-log-terminal');
      const time = new Date().toISOString().substring(11, 19);
      const row = document.createElement('div');
      row.style.color = color;
      row.innerHTML = \`<span style="color:#64748b;">[\${time}]</span> \${msg}\`;
      term.appendChild(row);
      term.scrollTop = term.scrollHeight;
    }

    function clearLogs() {
      document.getElementById('sim-log-terminal').innerHTML = '';
    }

    function setActiveStep(idx) {
      for (let i = 0; i < totalSteps; i++) {
        const el = document.getElementById('step-node-' + i);
        if (!el) continue;
        if (i < idx) {
          el.style.background = 'rgba(16,185,129,0.12)';
          el.style.borderColor = 'rgba(16,185,129,0.4)';
          el.querySelector('.sim-step-num').style.background = '#10b981';
          el.querySelector('.sim-step-num').style.color = '#fff';
        } else if (i === idx) {
          el.style.background = 'rgba(124,58,237,0.25)';
          el.style.borderColor = '#7c3aed';
          el.querySelector('.sim-step-num').style.background = '#7c3aed';
          el.querySelector('.sim-step-num').style.color = '#fff';
        } else {
          el.style.background = 'rgba(255,255,255,0.03)';
          el.style.borderColor = 'rgba(255,255,255,0.08)';
          el.querySelector('.sim-step-num').style.background = 'rgba(255,255,255,0.08)';
          el.querySelector('.sim-step-num').style.color = '#cbd5e1';
        }
      }
    }

    function stepSimulation() {
      if (currentStep >= totalSteps - 1) {
        resetSimulation();
      }
      currentStep++;
      setActiveStep(currentStep);
      document.getElementById('sim-status-badge').textContent = 'STEP ' + (currentStep + 1) + ' / ' + totalSteps;
      document.getElementById('sim-status-badge').style.color = '#c084fc';

      const latency = Math.floor(Math.random() * 45) + 12;
      const throughput = Math.floor(Math.random() * 5000) + 1200;
      document.getElementById('metric-latency').textContent = latency + ' ms';
      document.getElementById('metric-throughput').textContent = throughput.toLocaleString() + ' req/s';
      document.getElementById('metric-state').textContent = 'Step ' + (currentStep + 1);

      log('Executing: <strong>' + stepsData[currentStep] + '</strong> (latency: ' + latency + 'ms)', '#38bdf8');
    }

    async function runSimulation() {
      if (isRunning) return;
      isRunning = true;
      resetSimulation();
      document.getElementById('sim-status-badge').textContent = 'EXECUTING PIPELINE...';
      document.getElementById('sim-status-badge').style.color = '#10b981';
      log('Starting automated end-to-end execution...', '#a855f7');

      for (let i = 0; i < totalSteps; i++) {
        currentStep = i;
        setActiveStep(i);
        const latency = Math.floor(Math.random() * 30) + 8;
        document.getElementById('metric-latency').textContent = latency + ' ms';
        document.getElementById('metric-throughput').textContent = (Math.floor(Math.random() * 4000) + 2000).toLocaleString() + ' req/s';
        document.getElementById('metric-state').textContent = 'Active (0' + (i + 1) + ')';
        log('Completed: ' + stepsData[i] + ' [' + latency + 'ms]', '#10b981');
        await new Promise(r => setTimeout(r, 600));
      }

      document.getElementById('sim-status-badge').textContent = 'PIPELINE COMPLETED (OK)';
      document.getElementById('metric-state').textContent = 'Verified (100%)';
      log('Pipeline execution successfully finalized with zero faults.', '#34d399');
      isRunning = false;
    }

    function resetSimulation() {
      currentStep = -1;
      setActiveStep(-1);
      document.getElementById('sim-status-badge').textContent = 'IDLE / READY';
      document.getElementById('sim-status-badge').style.color = '#38bdf8';
      document.getElementById('metric-latency').textContent = '0 ms';
      document.getElementById('metric-throughput').textContent = '0 req/s';
      document.getElementById('metric-state').textContent = 'Clean';
      log('Simulation reset to clean state.', '#94a3b8');
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  </script>
</body>
</html>`;
}

// Main Execution Function
async function generateAll() {
  console.log('Generating all requested subject folders and placeholder files...');

  let createdCount = 0;

  for (const [folderRel, meta] of Object.entries(SUBJECT_METADATA)) {
    const fullDir = path.join(ROOT_DIR, folderRel);
    ensureAssets(fullDir);

    const segments = folderRel.split('/');
    const depth = segments.length; // e.g. 'foundational' = 1, 'foundational/data-structures' = 2

    // 1. index.html
    const indexPath = path.join(fullDir, 'index.html');
    const indexContent = buildIndexHtml(folderRel, meta, depth);
    fs.writeFileSync(indexPath, indexContent, 'utf8');

    // 2. demo.html
    const demoPath = path.join(fullDir, 'demo.html');
    const demoContent = buildDemoHtml(folderRel, meta, depth);
    fs.writeFileSync(demoPath, demoContent, 'utf8');

    createdCount += 2;
    console.log(`Created index.html and demo.html in ${folderRel} (depth ${depth})`);
  }

  console.log(`Successfully generated ${createdCount} pages across all subjects!`);
}

generateAll();
