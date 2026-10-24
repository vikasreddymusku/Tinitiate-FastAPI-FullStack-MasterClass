const fs = require('fs');
const path = require('path');
const { SUBJECTS, ensureAssets, buildHeaderHtml, buildFooterHtml, ROOT_DIR } = require('./template_helpers');

function createDemoPage(subject, demoContent) {
  ensureAssets(subject.folder);
  const headerHtml = buildHeaderHtml(subject, true, 1);
  const footerHtml = buildFooterHtml(1);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject.badge} - Interactive Simulator &amp; Live Demo Lab | Tinitiate MasterClass Academy</title>
  <meta name="description" content="Explore live interactive simulators, architecture sandboxes, and hands-on playgrounds for ${subject.badge} taught by Venkata Bhattaram.">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="stylesheet" href="../assets/css/master-global-layout.css">
  <script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>
  <script src="../assets/js/master-global-nav.js" defer></script>
  <style>
    .demo-hero {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 27, 75, 0.95) 100%);
      border: 1px solid rgba(139, 92, 246, 0.35);
      border-radius: 16px;
      padding: 28px 32px;
      margin-bottom: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    }
    .demo-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(124, 58, 237, 0.25);
      border: 1px solid rgba(139, 92, 246, 0.5);
      color: #c4b5fd;
      margin-bottom: 12px;
    }
    .demo-title {
      font-size: 2rem;
      font-weight: 900;
      color: #ffffff;
      margin: 0 0 10px 0;
      letter-spacing: -0.02em;
    }
    .demo-subtitle {
      font-size: 0.95rem;
      color: #94a3b8;
      max-width: 820px;
      line-height: 1.5;
      margin: 0;
    }
    .demo-card {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .demo-controls-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      background: #f8fafc;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      margin-bottom: 20px;
    }
    .demo-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
    }
    .demo-btn-primary {
      background: #7c3aed;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
    }
    .demo-btn-primary:hover {
      background: #6d28d9;
      transform: translateY(-1px);
    }
    .demo-btn-secondary {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
    }
    .demo-btn-secondary:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 18px;
    }
    .demo-subcard {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px;
    }
    .demo-subcard-title {
      font-size: 1rem;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }
    .demo-log-terminal {
      background: #0f172a;
      color: #38bdf8;
      font-family: monospace;
      font-size: 0.8rem;
      padding: 14px;
      border-radius: 8px;
      height: 180px;
      overflow-y: auto;
      line-height: 1.5;
    }
    .demo-status-pill {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
    }
    .status-active { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
  </style>
</head>
<body>
  ${headerHtml}

  <div class="master-layout-container">
    <!-- Left Sidebar: Course Topics & Navigation -->
    <aside class="sidebar-topics">
      <div class="sidebar-header">
        <i data-lucide="layers" style="width:18px;height:18px;color:#7c3aed;"></i>
        <span>${subject.badge}</span>
      </div>
      <div class="sidebar-menu-list">
        <a href="index.html" class="sidebar-link">
          <i data-lucide="book-open"></i>
          <span>Course Home</span>
        </a>
        <a href="demo.html" class="sidebar-link active">
          <i data-lucide="play-circle"></i>
          <span>Interactive Demo Lab</span>
        </a>
        <div style="margin-top:16px;padding:12px;background:#f1f5f9;border-radius:8px;font-size:0.8rem;color:#64748b;">
          <strong>💡 Demo Mode:</strong> Test and simulate real-world production architectures interactively without needing cloud accounts.
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="master-content-area">
      <!-- Demo Hero Banner -->
      <section class="demo-hero">
        <div class="demo-badge-pill">
          <i data-lucide="flask-conical" style="width:14px;height:14px;"></i>
          <span>Interactive Laboratory</span>
        </div>
        <h1 class="demo-title">${subject.badge} Simulator</h1>
        <p class="demo-subtitle">
          Hands-on interactive simulator designed to demonstrate real-world system behaviors, throughput dynamics, fault isolation, and enterprise best practices in ${subject.subtitle}.
        </p>
      </section>

      ${demoContent}
    </main>

    <!-- Right Sidebar: In-Page Navigation -->
    <aside class="sidebar-inpage-nav">
      <div class="inpage-nav-title">Lab Scenarios</div>
      <ul class="inpage-nav-list">
        <li><a href="#lab-runner" class="inpage-link active">1. Pipeline Simulator</a></li>
        <li><a href="#lab-terminal" class="inpage-link">2. Live Event Stream</a></li>
        <li><a href="#lab-metrics" class="inpage-link">3. Telemetry &amp; KPIs</a></li>
      </ul>
    </aside>
  </div>

  ${footerHtml}

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    });
  </script>
</body>
</html>`;

  const destFile = path.join(ROOT_DIR, subject.folder, 'demo.html');
  fs.writeFileSync(destFile, fullHtml, 'utf8');
  console.log('Created demo.html for:', subject.folder);
}

// 1. AI Demo
createDemoPage(SUBJECTS[0], `
      <section class="demo-card" id="lab-runner">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="demo-status-pill status-active">Engine Ready</span>
            <span style="font-size:0.85rem;color:#64748b;font-weight:600;">Scenario: ReAct Agent Multi-Tool Pipeline</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="demo-btn demo-btn-primary" onclick="runAiDemoStep()">
              <i data-lucide="play" style="width:14px;height:14px;"></i> Run Next Step
            </button>
            <button type="button" class="demo-btn demo-btn-secondary" onclick="resetAiDemo()">
              <i data-lucide="rotate-ccw" style="width:14px;height:14px;"></i> Reset Loop
            </button>
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="brain" style="color:#7c3aed;"></i> Agent State &amp; Scratchpad</div>
            <p style="font-size:0.85rem;color:#64748b;"><strong>Current Goal:</strong> "Analyze customer complaints across 50 PDFs, query SQL database for user tiers, and draft personalized retention emails."</p>
            <div id="aiStateCard" style="background:#f1f5f9;padding:12px;border-radius:8px;font-size:0.82rem;font-weight:700;color:#1e293b;">
              Status: Initialized (Awaiting first tool dispatch)
            </div>
          </div>

          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="cpu" style="color:#2563eb;"></i> Active MCP Tool Invocation</div>
            <div id="aiToolCard" style="background:#eff6ff;border:1px solid #bfdbfe;padding:12px;border-radius:8px;font-size:0.82rem;color:#1e40af;">
              Tools Mounted: <code>vector_search_rag()</code>, <code>postgres_query()</code>, <code>email_dispatch()</code>
            </div>
          </div>
        </div>

        <div style="margin-top:20px;" id="lab-terminal">
          <div style="font-size:0.85rem;font-weight:800;color:#0f172a;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
            <i data-lucide="terminal" style="width:16px;height:16px;color:#0284c7;"></i> Live Execution Stream
          </div>
          <div class="demo-log-terminal" id="aiTerminal">
[SYSTEM] Agent initialized with Model: Claude 3.7 Sonnet (Temperature: 0.1)
[SYSTEM] Model Context Protocol (MCP) servers connected: 3 active endpoints.
[READY] Press "Run Next Step" to start autonomous reasoning loop...
          </div>
        </div>
      </section>

      <script>
        let aiStep = 0;
        const aiSteps = [
          "[THOUGHT] Parsing user goal... I need to retrieve top 5 PDF complaint summaries using vector_search_rag().\\n[ACTION] Invoking vector_search_rag(query='shipping delay grievances', top_k=5)...\\n[OBSERVATION] Retrieved 5 relevant chunks (Cosine similarity: 0.89).",
          "[THOUGHT] 5 complaints identified for Enterprise accounts. Now verifying SLA terms in PostgreSQL...\\n[ACTION] Invoking postgres_query(sql='SELECT tier, sla_hours FROM customers WHERE status=\\'active\\'')...\\n[OBSERVATION] 3 accounts exceed 24hr SLA limit.",
          "[THOUGHT] Root cause confirmed. Drafting custom compensation credit and sending retention notice...\\n[ACTION] Invoking email_dispatch(recipients=3, template='priority_credit')...\\n[RESULT] Workflow completed autonomously with 0 human intervention!"
        ];
        function runAiDemoStep() {
          const term = document.getElementById('aiTerminal');
          const state = document.getElementById('aiStateCard');
          if (aiStep < aiSteps.length) {
            term.innerHTML += '\\n' + aiSteps[aiStep];
            term.scrollTop = term.scrollHeight;
            state.textContent = 'Step ' + (aiStep + 1) + ' of ' + aiSteps.length + ' Completed';
            aiStep++;
          }
        }
        function resetAiDemo() {
          aiStep = 0;
          document.getElementById('aiTerminal').innerHTML = '[SYSTEM] Agent re-initialized.\\n[READY] Click "Run Next Step" to start loop.';
          document.getElementById('aiStateCard').textContent = 'Status: Initialized';
        }
      </script>
`);

// 2. Data Engineering Demo
createDemoPage(SUBJECTS[1], `
      <section class="demo-card" id="lab-runner">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="demo-status-pill status-active">Lakehouse Live</span>
            <span style="font-size:0.85rem;color:#64748b;font-weight:600;">Medallion Multi-Tier Ingestion (Bronze &rarr; Silver &rarr; Gold)</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="demo-btn demo-btn-primary" onclick="ingestBatch()">
              <i data-lucide="database" style="width:14px;height:14px;"></i> Ingest 10,000 Records
            </button>
            <button type="button" class="demo-btn demo-btn-secondary" onclick="resetDeDemo()">
              <i data-lucide="rotate-ccw" style="width:14px;height:14px;"></i> Reset Lakehouse
            </button>
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title"><span style="color:#b45309;">🥉 Bronze Tier</span> (Raw Append)</div>
            <p style="font-size:0.82rem;color:#64748b;">Raw JSON &amp; CDC events stored immutably with ingestion timestamps.</p>
            <div style="font-size:1.3rem;font-weight:900;color:#0f172a;" id="bronzeCount">0 Records</div>
          </div>
          <div class="demo-subcard">
            <div class="demo-subcard-title"><span style="color:#64748b;">🥈 Silver Tier</span> (Cleaned &amp; Deduplicated)</div>
            <p style="font-size:0.82rem;color:#64748b;">Schema validation, type casting, and deduplication via Delta MERGE.</p>
            <div style="font-size:1.3rem;font-weight:900;color:#0284c7;" id="silverCount">0 Records</div>
          </div>
          <div class="demo-subcard">
            <div class="demo-subcard-title"><span style="color:#eab308;">🥇 Gold Tier</span> (Business Aggregates)</div>
            <p style="font-size:0.82rem;color:#64748b;">Dimensional models and aggregates optimized for BI dashboards.</p>
            <div style="font-size:1.3rem;font-weight:900;color:#16a34a;" id="goldCount">0 Records</div>
          </div>
        </div>

        <div style="margin-top:20px;" id="lab-terminal">
          <div class="demo-log-terminal" id="deTerminal">
[LAKEHOUSE] Storage Tier: ADLS Gen2 / AWS S3 Delta Lake
[READY] Click "Ingest 10,000 Records" to simulate Bronze -> Silver -> Gold automated pipeline.
          </div>
        </div>
      </section>

      <script>
        let deCount = 0;
        function ingestBatch() {
          deCount += 10000;
          document.getElementById('bronzeCount').textContent = deCount.toLocaleString() + ' Records';
          const silver = Math.round(deCount * 0.98); // 2% corrupt dropped
          const gold = Math.round(silver * 0.4); // Aggregated
          document.getElementById('silverCount').textContent = silver.toLocaleString() + ' Records';
          document.getElementById('goldCount').textContent = gold.toLocaleString() + ' Records';
          const term = document.getElementById('deTerminal');
          term.innerHTML += '\\n[INGEST] Ingested 10,000 records into Bronze Delta Table (Raw CDC).\\n[TRANSFORM] Silver MERGE executed. 9,800 valid rows committed, 200 malformed dropped to quarantine.\\n[AGGREGATE] Gold dimensional tables refreshed with zero-downtime ACID transactions.';
          term.scrollTop = term.scrollHeight;
        }
        function resetDeDemo() {
          deCount = 0;
          document.getElementById('bronzeCount').textContent = '0 Records';
          document.getElementById('silverCount').textContent = '0 Records';
          document.getElementById('goldCount').textContent = '0 Records';
          document.getElementById('deTerminal').innerHTML = '[READY] Lakehouse tables cleared. Click Ingest to simulate flow.';
        }
      </script>
`);

// 3. PySpark Demo
createDemoPage(SUBJECTS[2], `
      <section class="demo-card" id="lab-runner">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="demo-status-pill status-active">Spark Driver Online</span>
            <span style="font-size:0.85rem;color:#64748b;font-weight:600;">PySpark DAG Execution &amp; AQE Shuffle Coalesce Lab</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="demo-btn demo-btn-primary" onclick="runSparkDag()">
              <i data-lucide="zap" style="width:14px;height:14px;"></i> Trigger Action (.count())
            </button>
            <button type="button" class="demo-btn demo-btn-secondary" onclick="resetSparkDemo()">
              <i data-lucide="rotate-ccw" style="width:14px;height:14px;"></i> Reset Cluster
            </button>
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="cpu" style="color:#ea580c;"></i> Driver Node</div>
            <p style="font-size:0.82rem;color:#64748b;">Catalyst Optimizer parses code into Logical &amp; Physical DAG plans.</p>
            <div style="font-size:0.85rem;font-weight:700;color:#0f172a;" id="driverState">Status: Awaiting Action</div>
          </div>
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="layers" style="color:#2563eb;"></i> Shuffle Partitions (AQE)</div>
            <p style="font-size:0.82rem;color:#64748b;">Adaptive Query Execution automatically coalesces 200 partitions down.</p>
            <div style="font-size:0.85rem;font-weight:700;color:#0284c7;" id="partitionState">200 Default &rarr; 8 Coalesced</div>
          </div>
        </div>

        <div style="margin-top:20px;" id="lab-terminal">
          <div class="demo-log-terminal" id="sparkTerminal">
[SPARK-SESSION] Spark 3.5.0 initialized. Executors: 4 Workers (16 vCPUs, 64GB RAM).
[CATALYST] Transformations (filter, select, groupBy) recorded in lazy DAG execution plan.
[READY] Click "Trigger Action" to evaluate lazy transformations...
          </div>
        </div>
      </section>

      <script>
        function runSparkDag() {
          const term = document.getElementById('sparkTerminal');
          document.getElementById('driverState').textContent = 'Action Running: .count()';
          term.innerHTML += '\\n[JOB 01] Action triggered! Catalyst generates physical plan.\\n[STAGE 0] Narrow Transformation (Map/Filter): 100% localized, zero network shuffle!\\n[SHUFFLE] Wide Transformation (groupBy): Adaptive Query Execution dynamically coalesced 200 partitions into 8 optimal stages!\\n[COMPLETED] Job finished in 1.42s. Result: 24,500,000 rows.';
          term.scrollTop = term.scrollHeight;
        }
        function resetSparkDemo() {
          document.getElementById('driverState').textContent = 'Status: Awaiting Action';
          document.getElementById('sparkTerminal').innerHTML = '[SPARK-SESSION] Spark 3.5.0 ready.\\n[READY] Trigger action to start DAG execution.';
        }
      </script>
`);

// 4. Data Governance Demo
createDemoPage(SUBJECTS[3], `
      <section class="demo-card" id="lab-runner">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="demo-status-pill status-active">Catalog Online</span>
            <span style="font-size:0.85rem;color:#64748b;font-weight:600;">Microsoft Purview &amp; Apache Atlas Lineage Scanner</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="demo-btn demo-btn-primary" onclick="runGovernanceScan()">
              <i data-lucide="shield" style="width:14px;height:14px;"></i> Run Automated Lineage Scan
            </button>
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="lock" style="color:#16a34a;"></i> PII Classification</div>
            <p style="font-size:0.82rem;color:#64748b;">Automated detection of SSN, Credit Cards, and Email fields.</p>
            <div style="font-size:0.85rem;font-weight:700;color:#16a34a;">14 Sensitive Assets Tagged &amp; Masked</div>
          </div>
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="network" style="color:#7c3aed;"></i> Lineage Chain</div>
            <p style="font-size:0.82rem;color:#64748b;">Source PostgreSQL &rarr; ADF Pipeline &rarr; Delta Table &rarr; PowerBI</p>
            <div style="font-size:0.85rem;font-weight:700;color:#7c3aed;">4 Hops Tracked End-to-End</div>
          </div>
        </div>

        <div style="margin-top:20px;" id="lab-terminal">
          <div class="demo-log-terminal" id="govTerminal">
[PURVIEW] Connected to Microsoft Purview Unified Governance Portal.
[SCANNER] Ready to extract lineage and schema metadata from enterprise endpoints.
          </div>
        </div>
      </section>

      <script>
        function runGovernanceScan() {
          const term = document.getElementById('govTerminal');
          term.innerHTML += '\\n[SCAN] Discovering assets across S3, Azure ADLS Gen2, and Snowflake...\\n[CLASSIFIER] Pattern matched: CreditCardNumber (High Sensitivity) found in sales_raw_tbl.\\n[MASKING] Dynamic data masking applied: column masked to XXXX-XXXX-XXXX-1234 for analyst roles.\\n[LINEAGE] Column-level lineage verified: sales_raw -> adf_etl -> delta_silver -> bi_report. All compliant!';
          term.scrollTop = term.scrollHeight;
        }
      </script>
`);

// 5. AWS Data Engineering Demo
createDemoPage(SUBJECTS[4], `
      <section class="demo-card" id="lab-runner">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="demo-status-pill status-active">AWS Cloud Active</span>
            <span style="font-size:0.85rem;color:#64748b;font-weight:600;">AWS Glue ETL &amp; Redshift Serverless Pipeline Simulator</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="demo-btn demo-btn-primary" onclick="runAwsJob()">
              <i data-lucide="cloud" style="width:14px;height:14px;"></i> Trigger Glue ETL Job
            </button>
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="hard-drive" style="color:#d97706;"></i> Amazon S3 Raw Lake</div>
            <p style="font-size:0.82rem;color:#64748b;">Landing bucket receiving JSON logs from Kinesis Firehose.</p>
            <div style="font-weight:700;color:#0f172a;">s3://enterprise-data-lake-raw/</div>
          </div>
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="database" style="color:#dc2626;"></i> Amazon Redshift Serverless</div>
            <p style="font-size:0.82rem;color:#64748b;">Auto-scaling RPU clusters serving analytic queries.</p>
            <div style="font-weight:700;color:#dc2626;">64 RPU Provisioned</div>
          </div>
        </div>

        <div style="margin-top:20px;" id="lab-terminal">
          <div class="demo-log-terminal" id="awsTerminal">
[AWS-GLUE] AWS Glue 4.0 Serverless Runtime (DPU capacity: 10).
[READY] Trigger job to run PySpark transform and load into Redshift Serverless.
          </div>
        </div>
      </section>

      <script>
        function runAwsJob() {
          const term = document.getElementById('awsTerminal');
          term.innerHTML += '\\n[GLUE] Starting job run_id: jr_9a87f1... Allocating 10 DPUs.\\n[S3] Reading parquet files with partition pushdown... 500,000 records processed.\\n[REDSHIFT] Executing Redshift COPY command from S3 with IAM role authorization...\\n[SUCCESS] Loaded 500,000 rows into Redshift Serverless analytics table in 4.2 seconds!';
          term.scrollTop = term.scrollHeight;
        }
      </script>
`);

// 6. Azure Data Engineering Demo
createDemoPage(SUBJECTS[5], `
      <section class="demo-card" id="lab-runner">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="demo-status-pill status-active">Azure Fabric Ready</span>
            <span style="font-size:0.85rem;color:#64748b;font-weight:600;">Azure Data Factory (ADF) &amp; Synapse Lakehouse Runner</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="demo-btn demo-btn-primary" onclick="runAdfPipeline()">
              <i data-lucide="play" style="width:14px;height:14px;"></i> Trigger ADF Pipeline
            </button>
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="git-commit" style="color:#0284c7;"></i> Pipeline Activities</div>
            <p style="font-size:0.82rem;color:#64748b;">Lookup &rarr; Validation &rarr; Copy Data &rarr; Webhook Notification</p>
            <div style="font-weight:700;color:#0284c7;" id="adfStatus">Status: Idle</div>
          </div>
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="layers" style="color:#0ea5e9;"></i> Azure Data Lake (ADLS Gen2)</div>
            <p style="font-size:0.82rem;color:#64748b;">Hierarchical namespace enabled with Delta format tables.</p>
            <div style="font-weight:700;color:#0f172a;">abfss://synapse-lakehouse@adls.core.windows.net</div>
          </div>
        </div>

        <div style="margin-top:20px;" id="lab-terminal">
          <div class="demo-log-terminal" id="adfTerminal">
[AZURE] Connected to Azure Data Factory v2.
[READY] Click "Trigger ADF Pipeline" to execute copy activity with AutoResolveIntegrationRuntime.
          </div>
        </div>
      </section>

      <script>
        function runAdfPipeline() {
          const term = document.getElementById('adfTerminal');
          document.getElementById('adfStatus').textContent = 'Running: Copy Activity (8 Workers)';
          term.innerHTML += '\\n[ADF] Triggered pipeline: PL_Ingest_Sales_Daily.\\n[ACTIVITY 1] Lookup metadata from Azure SQL Database: Succeeded.\\n[ACTIVITY 2] Copy Data to ADLS Gen2 Delta Parquet: 1,200,000 rows copied at 45 MB/s.\\n[ACTIVITY 3] Fabric Synapse Notebook execution: Materialized Gold views.\\n[STATUS] Pipeline Run Succeeded (200 OK).';
          term.scrollTop = term.scrollHeight;
        }
      </script>
`);

// 7. Databricks Demo
createDemoPage(SUBJECTS[6], `
      <section class="demo-card" id="lab-runner">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="demo-status-pill status-active">Photon Engine Online</span>
            <span style="font-size:0.85rem;color:#64748b;font-weight:600;">Databricks Delta Live Tables (DLT) &amp; Time Travel Simulator</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="demo-btn demo-btn-primary" onclick="runDltPipeline()">
              <i data-lucide="flame" style="width:14px;height:14px;"></i> Run Delta Live Table (DLT)
            </button>
            <button type="button" class="demo-btn demo-btn-secondary" onclick="runTimeTravel()">
              <i data-lucide="history" style="width:14px;height:14px;"></i> Delta Time Travel
            </button>
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="shield-check" style="color:#ef4444;"></i> Unity Catalog Governance</div>
            <p style="font-size:0.82rem;color:#64748b;">3-Level Namespace: <code>prod_catalog.marketing.campaign_leads</code></p>
            <div style="font-weight:700;color:#ef4444;">Access Control: Role-Based RBAC Active</div>
          </div>
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="zap" style="color:#ea580c;"></i> Photon C++ Vectorized Engine</div>
            <p style="font-size:0.82rem;color:#64748b;">Hardware-optimized native vectorized query processing.</p>
            <div style="font-weight:700;color:#0f172a;">Speedup: 3.8x faster than standard JVM Spark</div>
          </div>
        </div>

        <div style="margin-top:20px;" id="lab-terminal">
          <div class="demo-log-terminal" id="dbTerminal">
[DATABRICKS] Runtime 14.3 LTS (Apache Spark 3.5.0, Scala 2.12).
[READY] Test Delta Live Tables pipeline or Delta Time Travel recovery.
          </div>
        </div>
      </section>

      <script>
        function runDltPipeline() {
          const term = document.getElementById('dbTerminal');
          term.innerHTML += '\\n[DLT] Initializing Delta Live Tables pipeline: dlt_customer_events...\\n[EXPECTATION] Quality rule "valid_id": (id IS NOT NULL) evaluated 100% PASS.\\n[DELTA MERGE] Photon engine applied ACID upsert to Delta Lake. Version updated to v4.';
          term.scrollTop = term.scrollHeight;
        }
        function runTimeTravel() {
          const term = document.getElementById('dbTerminal');
          term.innerHTML += '\\n[TIME-TRAVEL] Querying: SELECT * FROM customer_events VERSION AS OF 2;\\n[SNAPSHOT] Rollback snapshot retrieved from Delta _delta_log transaction log. 0 data loss!';
          term.scrollTop = term.scrollHeight;
        }
      </script>
`);

// 8. Snowflake Demo
createDemoPage(SUBJECTS[7], `
      <section class="demo-card" id="lab-runner">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="demo-status-pill status-active">Snowflake Cloud Online</span>
            <span style="font-size:0.85rem;color:#64748b;font-weight:600;">Multi-Cluster Virtual Warehouse Auto-Scaling Simulator</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="demo-btn demo-btn-primary" onclick="scaleSnowflake()">
              <i data-lucide="trending-up" style="width:14px;height:14px;"></i> Inject Query Surge (Auto-Scale)
            </button>
            <button type="button" class="demo-btn demo-btn-secondary" onclick="resetSnowflake()">
              <i data-lucide="rotate-ccw" style="width:14px;height:14px;"></i> Idle Suspend
            </button>
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="server" style="color:#0284c7;"></i> Virtual Warehouse Clusters</div>
            <p style="font-size:0.82rem;color:#64748b;">Decoupled Compute: Compute scales independently of Centralized Storage.</p>
            <div style="font-size:1.2rem;font-weight:900;color:#0284c7;" id="whSize">Size: X-SMALL (1 Cluster)</div>
          </div>
          <div class="demo-subcard">
            <div class="demo-subcard-title"><i data-lucide="code" style="color:#06b6d4;"></i> Snowpark Python Runtime</div>
            <p style="font-size:0.82rem;color:#64748b;">Execute native Python DataFrames inside Snowflake secure sandboxes.</p>
            <div style="font-weight:700;color:#0f172a;">snowpark.session.Session Active</div>
          </div>
        </div>

        <div style="margin-top:20px;" id="lab-terminal">
          <div class="demo-log-terminal" id="snowTerminal">
[SNOWFLAKE] Edition: Enterprise Edition on AWS us-east-1.
[WAREHOUSE] COMPUTE_WH auto-suspend set to 60 seconds (zero idle credit waste).
[READY] Click "Inject Query Surge" to simulate multi-cluster auto-scaling.
          </div>
        </div>
      </section>

      <script>
        function scaleSnowflake() {
          document.getElementById('whSize').textContent = 'Size: LARGE (3 Multi-Clusters Running)';
          const term = document.getElementById('snowTerminal');
          term.innerHTML += '\\n[SURGE] Inflow: 40 concurrent analytical queries queued.\\n[AUTO-SCALE] Multi-cluster warehouse triggered! Spin up Cluster 2 and Cluster 3 in under 1 second.\\n[EXECUTION] All 40 queries processed concurrently without queuing latency.\\n[CREDITS] Warehouse will automatically spin down after 60s idle threshold.';
          term.scrollTop = term.scrollHeight;
        }
        function resetSnowflake() {
          document.getElementById('whSize').textContent = 'Size: X-SMALL (1 Cluster - Suspended)';
          document.getElementById('snowTerminal').innerHTML = '[SNOWFLAKE] Warehouse auto-suspended. Zero compute credits consumed.';
        }
      </script>
`);

console.log('Successfully generated all demo.html pages!');
