const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Helper to create the Executive Briefing HTML block
function buildBriefingSection({
  trackName,
  badgePillClass,
  badgeIcon,
  trackTitle,
  trackSubtitle,
  instructorQuote,
  whyDesc,
  whyBullets,
  whatDesc,
  whatBullets,
  howDesc,
  howBullets,
  whereDesc,
  whereBullets,
  marketTitle,
  metricTrend,
  metricTrendSub,
  metricSalary,
  metricSalarySub,
  metricReqs,
  metricReqsSub,
  rolesList,
  toolsList,
  salaryList,
  sectorsList
}) {
  return `
      <!-- ========================================================================= -->
      <!-- EXECUTIVE ARCHITECTURE BRIEFING: WHY, WHAT, HOW, WHERE & JOB MARKET       -->
      <!-- ========================================================================= -->
      <section class="subject-briefing-wrap" id="sec-executive-briefing" style="margin-top:24px;">

        <!-- 1. Executive Intro Banner -->
        <div class="subject-intro-banner">
          <div class="intro-badge-row">
            <span class="intro-badge-pill ${badgePillClass}">
              <i data-lucide="${badgeIcon}" style="width:12px;height:12px;"></i> ${trackName}
            </span>
            <span class="intro-badge-pill" style="background:rgba(255,255,255,0.06);border:1px solid var(--border-subtle);color:var(--text-muted);">
              Enterprise IT Architecture
            </span>
            <span class="intro-badge-pill" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#10b981;">
              Zero to Hero Curriculum
            </span>
          </div>
          <h2 class="intro-title">${trackTitle}</h2>
          <p class="intro-subtitle">${trackSubtitle}</p>
          <div class="intro-instructor-quote">
            <i data-lucide="sparkles" style="width:20px;height:20px;color:#a855f7;flex-shrink:0;"></i>
            <div>
              <strong>Lead Instructor Architectural Insight (&copy; Venkata Bhattaram):</strong>
              "${instructorQuote}"
            </div>
          </div>
        </div>

        <!-- 2. The 4 Fundamental Pillars Grid: WHY, WHAT, HOW, WHERE IT IS USED -->
        <div class="pillars-matrix-grid">
          
          <!-- PILLAR 1: WHY -->
          <div class="pillar-card pillar-card-why">
            <div class="pillar-head">
              <div class="pillar-icon-box icon-box-why">
                <i data-lucide="help-circle" style="width:20px;height:20px;"></i>
              </div>
              <div class="pillar-label-group">
                <span class="pillar-kicker" style="color:#ef4444;">Pillar 01 &bull; Catalyst</span>
                <h3 class="pillar-title">Why It Exists</h3>
              </div>
            </div>
            <p class="pillar-desc">${whyDesc}</p>
            <ul class="pillar-list">
              ${whyBullets.map(b => `<li><i data-lucide="alert-circle" style="color:#ef4444;"></i> <span>${b}</span></li>`).join('\n              ')}
            </ul>
          </div>

          <!-- PILLAR 2: WHAT -->
          <div class="pillar-card pillar-card-what">
            <div class="pillar-head">
              <div class="pillar-icon-box icon-box-what">
                <i data-lucide="layers" style="width:20px;height:20px;"></i>
              </div>
              <div class="pillar-label-group">
                <span class="pillar-kicker" style="color:#3b82f6;">Pillar 02 &bull; Foundations</span>
                <h3 class="pillar-title">What It Is</h3>
              </div>
            </div>
            <p class="pillar-desc">${whatDesc}</p>
            <ul class="pillar-list">
              ${whatBullets.map(b => `<li><i data-lucide="check-circle-2" style="color:#3b82f6;"></i> <span>${b}</span></li>`).join('\n              ')}
            </ul>
          </div>

          <!-- PILLAR 3: HOW -->
          <div class="pillar-card pillar-card-how">
            <div class="pillar-head">
              <div class="pillar-icon-box icon-box-how">
                <i data-lucide="cpu" style="width:20px;height:20px;"></i>
              </div>
              <div class="pillar-label-group">
                <span class="pillar-kicker" style="color:#10b981;">Pillar 03 &bull; Mechanics</span>
                <h3 class="pillar-title">How It Works</h3>
              </div>
            </div>
            <p class="pillar-desc">${howDesc}</p>
            <ul class="pillar-list">
              ${howBullets.map(b => `<li><i data-lucide="cog" style="color:#10b981;"></i> <span>${b}</span></li>`).join('\n              ')}
            </ul>
          </div>

          <!-- PILLAR 4: WHERE IT IS USED -->
          <div class="pillar-card pillar-card-where">
            <div class="pillar-head">
              <div class="pillar-icon-box icon-box-where">
                <i data-lucide="globe" style="width:20px;height:20px;"></i>
              </div>
              <div class="pillar-label-group">
                <span class="pillar-kicker" style="color:#f59e0b;">Pillar 04 &bull; Production</span>
                <h3 class="pillar-title">Where It Is Used</h3>
              </div>
            </div>
            <p class="pillar-desc">${whereDesc}</p>
            <ul class="pillar-list">
              ${whereBullets.map(b => `<li><i data-lucide="arrow-right-circle" style="color:#f59e0b;"></i> <span>${b}</span></li>`).join('\n              ')}
            </ul>
          </div>

        </div>

        <!-- 3. JOB MARKET ANALYSIS (ACTIVE BRIEFING PLACEHOLDER) -->
        <div class="job-market-card" id="sec-job-market">
          <div class="job-market-header">
            <div class="job-market-title-wrap">
              <div class="job-market-icon">
                <i data-lucide="trending-up" style="width:22px;height:22px;"></i>
              </div>
              <div>
                <h3 class="job-market-title">${marketTitle}</h3>
                <span class="job-market-subtitle">Industry hiring demand, compensation benchmarks, and enterprise talent landscape</span>
              </div>
            </div>
            <div class="job-market-badge">
              <i data-lucide="bar-chart-3" style="width:14px;height:14px;"></i>
              Job Market Analysis (Active Briefing Placeholder)
            </div>
          </div>

          <!-- Quick Metrics Row -->
          <div class="job-market-metrics">
            <div class="metric-pill">
              <span class="metric-kicker">Hiring Demand Trend</span>
              <span class="metric-value" style="color:#10b981;">${metricTrend}</span>
              <span class="metric-sub">${metricTrendSub}</span>
            </div>
            <div class="metric-pill">
              <span class="metric-kicker">Median Base Salary</span>
              <span class="metric-value">${metricSalary}</span>
              <span class="metric-sub">${metricSalarySub}</span>
            </div>
            <div class="metric-pill">
              <span class="metric-kicker">Active Job Openings</span>
              <span class="metric-value" style="color:#38bdf8;">${metricReqs}</span>
              <span class="metric-sub">${metricReqsSub}</span>
            </div>
            <div class="metric-pill">
              <span class="metric-kicker">Hiring Urgency</span>
              <span class="metric-value" style="color:#f59e0b;">Critical</span>
              <span class="metric-sub">Tier-1 Core Competency</span>
            </div>
          </div>

          <!-- 4-Column Breakdown Grid -->
          <div class="job-market-columns">
            <div class="job-column-box">
              <h4 class="job-col-title">
                <i data-lucide="briefcase" style="width:14px;height:14px;color:#7c3aed;"></i>
                Key Roles &amp; Titles
              </h4>
              <ul class="job-tag-list">
                ${rolesList.map(r => `<li><i data-lucide="chevron-right"></i> <span><strong>${r.title}:</strong> ${r.sub}</span></li>`).join('\n                ')}
              </ul>
            </div>

            <div class="job-column-box">
              <h4 class="job-col-title">
                <i data-lucide="wrench" style="width:14px;height:14px;color:#3b82f6;"></i>
                Core Tech Stack
              </h4>
              <ul class="job-tag-list">
                ${toolsList.map(t => `<li><i data-lucide="check"></i> <span>${t}</span></li>`).join('\n                ')}
              </ul>
            </div>

            <div class="job-column-box">
              <h4 class="job-col-title">
                <i data-lucide="dollar-sign" style="width:14px;height:14px;color:#10b981;"></i>
                Salary Tiers (US Base)
              </h4>
              <ul class="job-tag-list">
                ${salaryList.map(s => `<li><i data-lucide="arrow-up-right"></i> <span><strong>${s.level}:</strong> ${s.range}</span></li>`).join('\n                ')}
              </ul>
            </div>

            <div class="job-column-box">
              <h4 class="job-col-title">
                <i data-lucide="building-2" style="width:14px;height:14px;color:#f59e0b;"></i>
                Top Hiring Sectors
              </h4>
              <ul class="job-tag-list">
                ${sectorsList.map(v => `<li><i data-lucide="target"></i> <span>${v}</span></li>`).join('\n                ')}
              </ul>
            </div>
          </div>

          <!-- Footnote -->
          <div class="job-market-footnote">
            <span><i data-lucide="info" style="width:13px;height:13px;display:inline-block;vertical-align:middle;color:#a855f7;"></i> <strong>Section Status:</strong> Dedicated Job Market Analysis Placeholder &mdash; Aggregated industry salary ranges, hiring momentum, and required competencies.</span>
            <span>Refreshed Bi-Weekly &bull; Source: LinkedIn Talent Telemetry &amp; Industry Tech Compensation Surveys</span>
          </div>
        </div>

      </section>
      <!-- ========================================================================= -->
`;
}

// -----------------------------------------------------------------------------
// 1. UPDATE PYSPARK INDEX
// -----------------------------------------------------------------------------
function updatePySpark() {
  const filePath = path.join(rootDir, 'pyspark', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already injected
  if (content.includes('id="sec-executive-briefing"')) {
    console.log('PySpark index already has executive briefing, skipping duplicate injection');
    return;
  }

  const briefingHtml = buildBriefingSection({
    trackName: 'PySpark & Distributed Computing',
    badgePillClass: 'badge-pill-amber',
    badgeIcon: 'zap',
    trackTitle: 'Architecting High-Throughput Distributed Compute at Scale',
    trackSubtitle: 'Why modern enterprises transition beyond single-node Python (Pandas/NumPy) into memory-optimized Apache Spark clusters capable of crunching multi-terabyte datasets in seconds.',
    instructorQuote: 'A single laptop with Pandas runs out of memory at 15 Gigabytes. PySpark is not just another Python library—it is a distributed cluster operating system that chops petabytes of data into bite-sized partitions, distributes them across dozens of worker nodes, and executes parallel transformations in RAM without touching disk.',
    whyDesc: 'Single-node data tools crash with Out-Of-Memory (OOM) errors when datasets exceed server RAM. Traditional databases cannot execute complex graph or machine learning transformations at scale.',
    whyBullets: [
      'Overcomes single-node RAM bottlenecks with distributed JVM memory pools',
      'Eliminates slow MapReduce disk writes through resilient in-memory DAG caching',
      'Unified API for Batch processing, Real-Time Streaming, SQL, and Machine Learning',
      'Prevents cluster crashes using Catalyst Query Optimizer and Tungsten bytecode generation'
    ],
    whatDesc: 'Apache Spark is an open-source, distributed general-purpose compute engine. PySpark provides the Python API binding that bridges Python developer productivity with distributed JVM speed.',
    whatBullets: [
      '<strong>Driver & Worker Architecture:</strong> Central coordinator managing distributed executors',
      '<strong>DataFrames & Datasets:</strong> Strongly-typed, columnar, partitioned distributed tables',
      '<strong>Catalyst Optimizer:</strong> Automatic predicate pushdown and join reordering',
      '<strong>Structured Streaming:</strong> Micro-batch and continuous low-latency stream processing'
    ],
    howDesc: 'PySpark evaluates code lazily. When an action is called, the Driver analyzes the lineage graph, builds a Directed Acyclic Graph (DAG), splits it into Stages at shuffle boundaries, and schedules Tasks onto Worker cores.',
    howBullets: [
      '<strong>Lazy Evaluation:</strong> Plans the entire execution graph before moving a single byte',
      '<strong>Narrow vs Wide Dependencies:</strong> Pipelined maps vs cross-network shuffle stages',
      '<strong>Partitioning Strategy:</strong> Hash, Range, and Round-Robin partition distribution',
      '<strong>Executor Cores:</strong> The 5-core golden rule balancing HDFS/S3 I/O with JVM GC overhead'
    ],
    whereDesc: 'Deployed in mission-critical architectures across every Fortune 500 company handling multi-terabyte to petabyte workloads.',
    whereBullets: [
      '<strong>Cloud Lakehouses:</strong> Daily ELT pipelines writing ACID Delta Lake and Parquet datasets',
      '<strong>Real-Time Fraud Detection:</strong> Scoring millions of credit card swipes per minute with Kafka',
      '<strong>AdTech & Telematics:</strong> Crunching clickstreams and GPS sensor streams across 100+ worker nodes',
      '<strong>AI/ML Feature Stores:</strong> Parallel preprocessing for LLM embeddings and deep learning models'
    ],
    marketTitle: 'PySpark & Distributed Big Data Job Market Landscape',
    metricTrend: '+34% YoY',
    metricTrendSub: '&uarr; Driven by Lakehouse & AI Demands',
    metricSalary: '$140K &ndash; $215K',
    metricTrendSub: '&uarr; US Base + Equity Tier',
    metricReqs: '14,800+',
    metricReqsSub: 'Active Job Requisitions Globally',
    rolesList: [
      { title: 'PySpark Data Engineer', sub: 'ETL pipelines, Delta Lake, cluster optimization' },
      { title: 'Distributed Systems Architect', sub: 'Cluster sizing, JVM tuning, cloud fabric' },
      { title: 'Lakehouse Platform Engineer', sub: 'Databricks, Spark on EKS/K8s, CI/CD' },
      { title: 'Real-Time Streaming Engineer', sub: 'Structured Streaming, Kafka, CDC pipelines' }
    ],
    toolsList: [
      'Apache Spark 3.x & PySpark',
      'Databricks & Delta Lake / Apache Iceberg',
      'AWS EMR / Azure Synapse / GCP Dataproc',
      'Kubernetes (K8s) & YARN Resource Managers',
      'Kafka, Debezium CDC & Arrow Flight'
    ],
    salaryList: [
      { level: 'Entry / Mid-Level (1-3 yrs)', range: '$115,000 &ndash; $145,000' },
      { level: 'Senior PySpark Engineer (4-7 yrs)', range: '$150,000 &ndash; $195,000' },
      { level: 'Lead / Staff Architect (8+ yrs)', range: '$200,000 &ndash; $265,000+' }
    ],
    sectorsList: [
      'Global Investment Banks & Fintech (JPMorgan, Goldman Sachs)',
      'Big Tech & Hyperscalers (Amazon, Microsoft, Google, Meta)',
      'Healthcare Analytics & Genomic Sequencing',
      'E-Commerce & High-Volume Retail (Walmart, Target, Shopify)'
    ]
  });

  // Inject right before the 4 Simulators showcase
  const searchAnchor = '<!-- 4 STANDALONE HARDWARE STRESS SIMULATORS SHOWCASE -->';
  if (content.includes(searchAnchor)) {
    content = content.replace(searchAnchor, `${briefingHtml}\n\n        ${searchAnchor}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully injected Executive Briefing into pyspark/index.html');
  } else {
    console.error('Could not find search anchor in pyspark/index.html');
  }
}

// -----------------------------------------------------------------------------
// 2. UPDATE DATA ENGINEERING INDEX
// -----------------------------------------------------------------------------
function updateDataEngineering() {
  const filePath = path.join(rootDir, 'data-engineering', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('id="sec-executive-briefing"')) {
    console.log('Data Engineering index already has executive briefing, skipping');
    return;
  }

  const briefingHtml = buildBriefingSection({
    trackName: 'Modern Data Engineering & Lakehouses',
    badgePillClass: 'badge-pill-sky',
    badgeIcon: 'database',
    trackTitle: 'The Arteries of Enterprise Intelligence: Modern Data Stack Architecture',
    trackSubtitle: 'How petabytes of disparate transactional records, IoT telemetry, and SaaS events are captured, cleansed, modeled, and staged into high-speed analytical lakehouses and data warehouses.',
    instructorQuote: 'Without Data Engineers, AI and Data Science cannot exist! A data scientist is like an executive chef who wants to cook a Michelin-star meal, but the Data Engineer is the entire agricultural supply chain, purification plant, and refrigerated freight system that delivers fresh, clean ingredients in milliseconds. If the data is late, corrupted, or stale, the AI starves.',
    whyDesc: 'Enterprise data is fragmented across 50+ relational databases, SaaS apps, and event streams. Without data engineering pipelines, business analytics stall, metrics disagree, and machine learning models fail.',
    whyBullets: [
      'Eliminates data silos by consolidating transactional OLTP and streaming sources',
      'Enforces ACID transaction guarantees, schema validation, and zero data loss',
      'Transforms raw unstructured logs into clean, modeled, query-ready dimensional schemas',
      'Powers enterprise self-service BI and real-time operational decision making'
    ],
    whatDesc: 'The engineering discipline dedicated to designing, building, maintaining, and optimizing data infrastructure, pipelines, and storage architectures across the full lifecycle from ingestion to consumption.',
    whatBullets: [
      '<strong>Medallion Architecture:</strong> Bronze (raw), Silver (cleansed), Gold (curated business marts)',
      '<strong>Lakehouse Paradigm:</strong> Combines data lake scale/cost with data warehouse ACID performance',
      '<strong>ELT vs ETL:</strong> High-speed raw cloud loading followed by in-warehouse SQL/dbt transformations',
      '<strong>Modern Data Stack:</strong> Cloud Storage, Spark/Flink, Snowflake/BigQuery, dbt, and Airflow'
    ],
    howDesc: 'Data Engineers build orchestrated pipelines using event-driven CDC (Change Data Capture) or batch micro-loaders. Data is ingested into distributed object storage, transformed via distributed compute engines, tested with automated quality gates, and published.',
    howBullets: [
      '<strong>Ingestion:</strong> Debezium Kafka CDC and batch REST connectors',
      '<strong>Storage & File Formats:</strong> Columnar Parquet, ORC, Delta Lake, and Apache Iceberg',
      '<strong>Transformation:</strong> dbt SQL models, modular DAG dependencies, and dimensional modeling',
      '<strong>Orchestration & Observability:</strong> Apache Airflow, Dagster, Monte Carlo data reliability'
    ],
    whereDesc: 'Data Engineering is the foundational backbone of modern digital enterprises across banking, healthcare, retail, logistics, and government.',
    whereBullets: [
      '<strong>Customer 360 Platforms:</strong> Unifying purchase history, support tickets, and app clickstreams',
      '<strong>Financial Risk & Regulatory Reporting:</strong> Auditable, lineage-tracked balance sheet data marts',
      '<strong>Real-Time Supply Chain Optimization:</strong> Live inventory tracking across global warehouses',
      '<strong>AI/LLM Data Prep:</strong> Ingesting, chunking, and embedding millions of documents for RAG'
    ],
    marketTitle: 'Data Engineering Job Market & Career Telemetry',
    metricTrend: '+41% YoY',
    metricTrendSub: '#1 Most In-Demand Data Role',
    metricSalary: '$135K &ndash; $205K',
    metricTrendSub: 'US Median Base Compensation',
    metricReqs: '26,500+',
    metricReqsSub: 'Active US Data Engineering Requisitions',
    rolesList: [
      { title: 'Data Engineer / Senior DE', sub: 'Pipeline architecture, cloud warehouses, dbt' },
      { title: 'Lakehouse Architect', sub: 'Databricks, Delta Lake, Snowflake, Iceberg' },
      { title: 'Analytics Engineer', sub: 'Data modeling, semantic layers, dbt, SQL marts' },
      { title: 'Streaming Data Engineer', sub: 'Apache Kafka, Flink, CDC, real-time ingestion' }
    ],
    toolsList: [
      'SQL (Advanced Window Functions, CTEs) & Python',
      'Snowflake, Google BigQuery, Amazon Redshift',
      'dbt (Data Build Tool) & Apache Airflow / Dagster',
      'Delta Lake, Apache Iceberg, Apache Parquet',
      'Apache Kafka, Debezium CDC & Spark'
    ],
    salaryList: [
      { level: 'Entry / Junior DE (1-2 yrs)', range: '$105,000 &ndash; $135,000' },
      { level: 'Senior Data Engineer (3-6 yrs)', range: '$145,000 &ndash; $190,000' },
      { level: 'Staff / Principal DE Architect (7+ yrs)', range: '$195,000 &ndash; $260,000+' }
    ],
    sectorsList: [
      'Financial Services & Fintech (Stripe, Robinhood, Visa)',
      'Enterprise SaaS (Salesforce, Snowflake, Datadog)',
      'Healthcare Networks & Biotechnology (UnitedHealth, Moderna)',
      'Logistics, Airlines & Supply Chain (FedEx, Uber, Delta)'
    ]
  });

  // Inject right after </section> of welcome
  const searchAnchor = '<!-- Section 2: What is Data Engineering? -->';
  if (content.includes(searchAnchor)) {
    content = content.replace(searchAnchor, `${briefingHtml}\n\n      ${searchAnchor}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully injected Executive Briefing into data-engineering/index.html');
  } else {
    console.error('Could not find search anchor in data-engineering/index.html');
  }
}

// -----------------------------------------------------------------------------
// 3. UPDATE AI / GENAI / AGENTIC INDEX
// -----------------------------------------------------------------------------
function updateAutomationAI() {
  const filePath = path.join(rootDir, 'automation-ml-ai-agentic', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('id="sec-executive-briefing"')) {
    console.log('AI index already has executive briefing, skipping');
    return;
  }

  const briefingHtml = buildBriefingSection({
    trackName: 'Automation, ML, GenAI & Agentic Systems',
    badgePillClass: 'badge-pill-violet',
    badgeIcon: 'bot',
    trackTitle: 'From Deterministic Heuristics to Autonomous Multi-Agent Reasoning',
    trackSubtitle: 'A structured architectural path taking software developers and systems engineers from foundational automation scripts to statistical machine learning, foundation LLMs, RAG, and autonomous Agentic workflows.',
    instructorQuote: 'Artificial Intelligence is not magic—it is a continuum of cognitive automation. We begin with deterministic rules and cron jobs, advance to statistical predictive patterns in ML, scale to generative foundation models, and culminate in autonomous agentic loops where AI observes, plans, executes tools, reflects on errors, and achieves enterprise goals independently.',
    whyDesc: 'Manual human workflows and rigid hard-coded rules cannot scale to complex, unstructured, and ambiguous enterprise environments. Organizations need cognitive systems that perceive, learn, and act autonomously.',
    whyBullets: [
      'Replaces brittle manual processes with self-adapting machine learning models',
      'Unlocks unstructured enterprise knowledge (PDFs, transcripts, audio, images) with GenAI',
      'Reduces operational toil and human error across customer service and IT operations',
      'Empowers software systems with dynamic goal-driven multi-step reasoning and tool execution'
    ],
    whatDesc: 'The unified hierarchy of cognitive computing: Deterministic Automation (RPA), Statistical Machine Learning (Regression, Classification, Deep Learning), Generative AI (LLMs, Transformers, RAG), and Autonomous Agentic Loops (ReAct, Multi-Agent swarms).',
    whatBullets: [
      '<strong>4-Tier Spectrum:</strong> Automation &rarr; ML &rarr; Generative AI &rarr; Autonomous Agents',
      '<strong>Foundation Models:</strong> Large Language Models, embeddings, and multimodal neural nets',
      '<strong>RAG Architectures:</strong> Vector databases, semantic retrieval, and context augmentation',
      '<strong>Agentic Protocols:</strong> Tool calling, ReAct loops, Model Context Protocol (MCP), and human-in-the-loop'
    ],
    howDesc: 'Raw data is transformed into vectorized representations. Models evaluate prompts, retrieve verified external context via vector search, formulate reasoning trajectories, execute API tools, and iteratively refine outputs until objectives are accomplished.',
    howBullets: [
      '<strong>Vector Embeddings:</strong> High-dimensional mathematical representations of semantics',
      '<strong>Hybrid RAG Retrieval:</strong> BM25 keyword matching + Dense Vector similarity search',
      '<strong>Agent Reasoning Cycle:</strong> Observe state &rarr; Plan next action &rarr; Invoke tool &rarr; Evaluate result',
      '<strong>Guardrails & Safety:</strong> Output sanitization, hallucination checks, and token budget policies'
    ],
    whereDesc: 'Production enterprise AI has moved beyond chat widgets into core operational infrastructure across every sector.',
    whereBullets: [
      '<strong>Autonomous Support Agents:</strong> Multi-turn customer resolution with live DB access',
      '<strong>AI Coding & DevOps Engineers:</strong> Automated code generation, PR review, and incident triage',
      '<strong>Clinical Intelligence:</strong> Accelerated drug molecule simulation and medical record summarization',
      '<strong>Algorithmic Finance:</strong> Sentiment-driven trading, automated underwriting, and AML detection'
    ],
    marketTitle: 'AI, GenAI & Agentic Systems Job Market Telemetry',
    metricTrend: '+78% YoY',
    metricTrendSub: 'Highest Growing Tech Category',
    metricSalary: '$150K &ndash; $240K',
    metricTrendSub: 'US Median Base Compensation',
    metricReqs: '31,200+',
    metricReqsSub: 'Global AI & GenAI Job Requisitions',
    rolesList: [
      { title: 'AI Application Engineer', sub: 'LLM APIs, LangChain, LlamaIndex, Python' },
      { title: 'Generative AI Architect', sub: 'Enterprise RAG, Vector DBs, Model Fine-Tuning' },
      { title: 'Autonomous Agent Developer', sub: 'ReAct loops, MCP protocols, multi-agent frameworks' },
      { title: 'MLOps / LLMOps Engineer', sub: 'Model serving, latency optimization, observability' }
    ],
    toolsList: [
      'Python, PyTorch, Hugging Face Transformers',
      'OpenAI, Anthropic Claude & Google Gemini APIs',
      'LangChain, LlamaIndex & AutoGen / CrewAI',
      'Pinecone, Qdrant, Chroma & pgvector',
      'Model Context Protocol (MCP) & FastEmbed'
    ],
    salaryList: [
      { level: 'AI Engineer (1-3 yrs)', range: '$130,000 &ndash; $165,000' },
      { level: 'Senior AI / GenAI Architect (4-7 yrs)', range: '$170,000 &ndash; $235,000' },
      { level: 'Staff / Principal AI Scientist (8+ yrs)', range: '$240,000 &ndash; $330,000+' }
    ],
    sectorsList: [
      'Big Tech & AI Labs (OpenAI, Anthropic, Google, Microsoft)',
      'Enterprise Software & Productivity (Salesforce, ServiceNow)',
      'Healthcare, BioTech & Pharmaceuticals (Pfizer, Roche)',
      'Defense, Aerospace & Cybersecurity (CrowdStrike, Palantir)'
    ]
  });

  // Inject right after welcome section (before Target Roles)
  const searchAnchor = '<!-- ========================================================================= -->\n      <!-- SUBTOPIC: target-roles [START] -->';
  const altAnchor = '<section class="content-section" id="target-roles">';
  if (content.includes(searchAnchor)) {
    content = content.replace(searchAnchor, `${briefingHtml}\n\n      ${searchAnchor}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully injected Executive Briefing into automation-ml-ai-agentic/index.html');
  } else if (content.includes(altAnchor)) {
    content = content.replace(altAnchor, `${briefingHtml}\n\n      ${altAnchor}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully injected Executive Briefing into automation-ml-ai-agentic/index.html via altAnchor');
  } else {
    console.error('Could not find search anchor in automation-ml-ai-agentic/index.html');
  }
}

// -----------------------------------------------------------------------------
// 4. UPDATE PURVIEW / DATA GOVERNANCE INDEX
// -----------------------------------------------------------------------------
function updatePurviewGovernance() {
  const filePath = path.join(rootDir, 'data-governence', 'purview-sandbox', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('id="sec-executive-briefing"')) {
    console.log('Purview governance index already has executive briefing, skipping');
    return;
  }

  const briefingHtml = buildBriefingSection({
    trackName: 'Data Governance & Microsoft Purview',
    badgePillClass: 'badge-pill-emerald',
    badgeIcon: 'shield-check',
    trackTitle: 'Enterprise Data Governance, Cataloging & Regulatory Lineage',
    trackSubtitle: 'Establishing the foundational guardrails of trust, compliance, security, and classification across multi-cloud databases, lakehouses, and AI training pipelines.',
    instructorQuote: 'Without rigorous Data Governance, a Data Lake inevitably degrades into a toxic Data Swamp. When sensitive customer data is leaked, regulations like GDPR or HIPAA are violated with millions in fines, and AI models hallucinate on unverified records. Governance is not bureaucracy—it is the digital chain of custody that makes data valuable, secure, and legally actionable.',
    whyDesc: 'Unregulated enterprise data estates face severe regulatory fines, unauthorized data exposure, orphan tables, and AI compliance failures. Organizations must know where their sensitive data lives, who owns it, and how it flows.',
    whyBullets: [
      'Prevents multimillion-dollar regulatory fines under GDPR, CCPA, HIPAA, and EU AI Act',
      'Eliminates dark data and shadow IT across fragmented cloud subscriptions',
      'Establishes automated end-to-end lineage from source OLTP systems to executive dashboards',
      'Ensures AI models are trained exclusively on audited, consent-verified datasets'
    ],
    whatDesc: 'The holistic framework of policies, metadata discovery, automated classification, end-to-end lineage tracking, and data stewardship enforced through unified platforms like Microsoft Purview.',
    whatBullets: [
      '<strong>Data Map & Discovery:</strong> Automated crawlers indexing metadata across cloud and on-prem',
      '<strong>Classification & Sensitivity Labels:</strong> Regex and NLP tagging for SSNs, PII, and financial data',
      '<strong>Column-Level Lineage:</strong> Visual graphs tracing data origins and downstream impact',
      '<strong>Business Glossary & Stewardship:</strong> Formal data asset ownership and dictionary definitions'
    ],
    howDesc: 'Purview automated scanning engines crawl storage accounts and relational databases. Classifiers inspect data samples, sensitivity labels are applied automatically, and lineage telemetry is extracted from SQL query plans and Spark execution logs.',
    howBullets: [
      '<strong>Automated Scanning:</strong> Connectors for Azure SQL, ADLS Gen2, Snowflake, AWS S3, and Power BI',
      '<strong>Lineage Extraction:</strong> Apache Atlas REST APIs and OpenLineage event streaming',
      '<strong>Access & Security Policies:</strong> Integration with Microsoft Entra ID and RBAC policies',
      '<strong>Data Stewardship Workflows:</strong> Automated review approval loops for glossary terms'
    ],
    whereDesc: 'Required by law and enterprise policy across banking, healthcare, retail, pharmaceuticals, and public sector organizations.',
    whereBullets: [
      '<strong>Global Banking & Capital Markets:</strong> BCBS 239 risk data aggregation and SOX compliance',
      '<strong>Healthcare Systems & Insurers:</strong> Protecting PHI / HIPAA records across analytics platforms',
      '<strong>Mergers & Acquisitions:</strong> Auditing newly acquired enterprise data estates for technical debt',
      '<strong>Enterprise AI Governance:</strong> Verifying data provenance and licensing rights for LLM corpora'
    ],
    marketTitle: 'Data Governance & Purview Talent Landscape',
    metricTrend: '+31% YoY',
    metricTrendSub: 'Accelerated by Global AI Regulations',
    metricSalary: '$125K &ndash; $185K',
    metricTrendSub: 'US Median Base Compensation',
    metricReqs: '9,400+',
    metricReqsSub: 'Active Data Governance Requisitions',
    rolesList: [
      { title: 'Data Governance Architect', sub: 'Purview implementation, metadata frameworks' },
      { title: 'Enterprise Data Steward', sub: 'Glossary curation, asset ownership, quality rules' },
      { title: 'Compliance & Lineage Specialist', sub: 'Regulatory audits, column-level DAG tracing' },
      { title: 'AI Data Governance Lead', sub: 'AI ethics, model training data licensing, privacy' }
    ],
    toolsList: [
      'Microsoft Purview (Data Map, Data Catalog, Data Lineage)',
      'Apache Atlas & OpenLineage REST APIs',
      'Collibra & Alation Enterprise Catalogs',
      'Snowflake Horizon & AWS Glue Data Catalog',
      'SQL, Python & Azure Policy Automation'
    ],
    salaryList: [
      { level: 'Data Governance Analyst (1-3 yrs)', range: '$95,000 &ndash; $125,000' },
      { level: 'Senior Purview / Governance Architect (4-7 yrs)', range: '$140,000 &ndash; $185,000' },
      { level: 'Director / Chief Data Governance Officer (8+ yrs)', range: '$190,000 &ndash; $250,000+' }
    ],
    sectorsList: [
      'Healthcare, Hospitals & Life Sciences (Kaiser, Pfizer)',
      'Banking, Financial Services & Insurance (Citi, Prudential)',
      'Government Agencies, Defense & Intelligence',
      'Multi-National Retail & Consumer Goods (Nike, Procter & Gamble)'
    ]
  });

  // Inject right above the React sandbox container
  const searchAnchor = '<div style="flex:1;width:100%;display:flex;justify-content:center;padding:20px;">';
  if (content.includes(searchAnchor)) {
    content = content.replace(searchAnchor, `<div style="max-width:1440px;margin:0 auto;padding:0 24px;width:100%;">\n${briefingHtml}\n</div>\n\n    ${searchAnchor}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully injected Executive Briefing into data-governence/purview-sandbox/index.html');
  } else {
    console.error('Could not find search anchor in data-governence/purview-sandbox/index.html');
  }
}

// -----------------------------------------------------------------------------
// 5. UPDATE ROOT ACADEMY PORTAL (INDEX.HTML)
// -----------------------------------------------------------------------------
function updateRootIndex() {
  const filePath = path.join(rootDir, 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('id="sec-executive-briefing"')) {
    console.log('Root index already has executive briefing, skipping');
    return;
  }

  const briefingHtml = buildBriefingSection({
    trackName: 'Tinitiate MasterClass Academy',
    badgePillClass: 'badge-pill-violet',
    badgeIcon: 'sparkles',
    trackTitle: 'The Unified Enterprise Data &amp; AI Engineering Lifecycle',
    trackSubtitle: 'How the 4 cornerstone disciplines of modern technology interconnect: Data Engineering creates the pipelines, PySpark crunches at cluster scale, Data Governance guarantees compliance, and AI delivers autonomous intelligence.',
    instructorQuote: 'Modern enterprise systems are an interconnected living organism. If you only understand machine learning but cannot build data pipelines in Spark, your models will never see production. If you can build pipelines but neglect governance, your enterprise will face regulatory catastrophe. Our academy teaches the complete full-stack lifecycle with zero-code visual explainers first, followed by production blueprints.',
    whyDesc: 'Isolated technical silos create catastrophic project failure. Data scientists complain of dirty data, data engineers complain of unfeasible AI requests, and governance teams block deployments due to unvetted compliance.',
    whyBullets: [
      'Breaks down silos between Data Engineering, Distributed Compute, Governance, and AI',
      'Provides a unified, holistic mental model of how data travels from edge sensor to autonomous agent',
      'Accelerates career transition by giving professionals complete full-lifecycle mastery',
      'Teaches architecture through living interactive simulators rather than dry theoretical slides'
    ],
    whatDesc: 'The 4 Flagship Tracks of Tinitiate MasterClass Academy: 1) Modern Data Engineering & Lakehouses, 2) PySpark Cluster Architecture, 3) Automation, ML, GenAI & Agentic Loops, and 4) Data Governance & Purview.',
    whatBullets: [
      '<strong>Track 1: Data Engineering:</strong> Lakehouses, Snowflake, Medallion schemas, dbt, and Kafka',
      '<strong>Track 2: PySpark Distributed Compute:</strong> 5-Cores rule, Catalyst, Tungsten, and Shuffle math',
      '<strong>Track 3: AI & Agentic Systems:</strong> Vector search, RAG, tool-calling agents, and MCP protocol',
      '<strong>Track 4: Data Governance:</strong> Microsoft Purview, automated scanning, and column-level lineage'
    ],
    howDesc: 'Learners experience each technology through 3 progressive pedagogical tiers: 1) Intuitive real-world mental models & analogies, 2) Interactive 2D/3D hardware and network simulators, and 3) Copyable production blueprints and architecture code.',
    howBullets: [
      '<strong>Interactive Simulators:</strong> Live CPU core saturation, memory heap calculators, and network shuffle buses',
      '<strong>Visual Architecture Posters:</strong> High-resolution diagrams illustrating every data hop',
      '<strong>Zero-Code Explainers First:</strong> Master the "Why" and "What" before memorizing syntactical details',
      '<strong>Enterprise Blueprint Code:</strong> Tested Python, PySpark, SQL, and YAML configuration scripts'
    ],
    whereDesc: 'Graduates and professionals apply these cross-functional competencies across the entire global digital economy.',
    whereBullets: [
      '<strong>Fortune 500 Enterprise Transformations:</strong> Migrating on-prem Hadoop clusters to cloud Lakehouses',
      '<strong>AI Product Engineering:</strong> Building enterprise multi-agent workflows with verified context',
      '<strong>Regulated Industries:</strong> Ensuring bank and hospital data infrastructures meet stringent compliance',
      '<strong>High-Frequency Tech:</strong> Scaling sub-second streaming pipelines handling billions of events daily'
    ],
    marketTitle: 'Enterprise Data & AI Master Talent Market Briefing',
    metricTrend: '+52% YoY',
    metricTrendSub: 'Cross-Functional Skill Demand',
    metricSalary: '$145K &ndash; $235K',
    metricTrendSub: 'Average US Full-Stack Data & AI Base',
    metricReqs: '82,000+',
    metricReqsSub: 'Combined Global Open Requisitions',
    rolesList: [
      { title: 'Full-Stack Data & AI Architect', sub: 'End-to-end Lakehouse, PySpark, and GenAI systems' },
      { title: 'Enterprise Data Engineering Lead', sub: 'Modern data stack, cloud pipelines, Medallion architecture' },
      { title: 'Generative AI & Agentic Engineer', sub: 'Autonomous loops, tool integration, Vector DBs' },
      { title: 'Data Governance & Purview Principal', sub: 'Metadata fabrics, compliance guardrails, lineage' }
    ],
    toolsList: [
      'Python, PySpark, SQL, dbt, Apache Kafka',
      'Databricks, Snowflake, BigQuery, Delta Lake',
      'LangChain, LlamaIndex, MCP Protocol, OpenAI',
      'Microsoft Purview, Apache Atlas, OpenLineage',
      'AWS, Azure, Google Cloud & Kubernetes'
    ],
    salaryList: [
      { level: 'Mid-Level Practitioner (2-4 yrs)', range: '$125,000 &ndash; $160,000' },
      { level: 'Senior Data/AI Engineer (5-8 yrs)', range: '$165,000 &ndash; $220,000' },
      { level: 'Principal Enterprise Architect (8+ yrs)', range: '$225,000 &ndash; $320,000+' }
    ],
    sectorsList: [
      'Global Tier-1 Financial Institutions & Hedge Funds',
      'Silicon Valley Hyperscalers & AI Research Labs',
      'Healthcare, Pharmaceuticals & Medical Device Giants',
      'Global E-Commerce, Retail & Autonomous Mobility'
    ]
  });

  // Inject right before Flagship section
  const searchAnchor = '<!-- =======================================================================\n         SECTION 1: THE 3 FLAGSHIP MASTERCLASS HUBS (DIRECT LINKS & SUMMARIES)\n         ======================================================================= -->';
  const altAnchor = '<section class="flagship-section" id="flagship-hubs">';
  
  if (content.includes(searchAnchor)) {
    content = content.replace(searchAnchor, `${briefingHtml}\n\n    ${searchAnchor}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully injected Executive Briefing into root index.html');
  } else if (content.includes(altAnchor)) {
    content = content.replace(altAnchor, `${briefingHtml}\n\n    ${altAnchor}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully injected Executive Briefing into root index.html via altAnchor');
  } else {
    console.error('Could not find search anchor in root index.html');
  }
}

// Run all updates
console.log('Starting Executive Architecture Briefing updates across all 5 index pages...');
updatePySpark();
updateDataEngineering();
updateAutomationAI();
updatePurviewGovernance();
updateRootIndex();
console.log('All index page updates complete!');
