const fs = require('fs');
const path = require('path');
const { SUBJECTS, ensureAssets, buildHeaderHtml, buildFooterHtml, ROOT_DIR } = require('./template_helpers');

const SUBJECT_DETAILS = {
  'data-governence': {
    heroTitle: 'Enterprise Data Governance & Purview MasterClass',
    heroSubtitle: 'Master data catalogs, automated sensitive data discovery, end-to-end column lineage, and data steward governance matrix across multi-cloud environments.',
    why: 'In modern cloud architectures, uncataloged data becomes a "data swamp." Enterprise regulations (GDPR, HIPAA, CCPA) require tracking every data origin and strictly auditing access to sensitive PII.',
    what: 'A unified governance framework leveraging Microsoft Purview, Apache Atlas, and Apache Ranger to automate asset discovery, scan metadata, trace lineage, and enforce dynamic masking policies.',
    how: 'Connect automated scanners to Azure ADLS, AWS S3, Snowflake, and SQL databases. Purview builds an enterprise data graph showing asset origins, transformations, and consumer dashboards.',
    where: 'Used by Fortune 500 banks, healthcare providers, retail giants, and SaaS companies to guarantee data trust, regulatory compliance, and confident executive decision-making.',
    modules: [
      { id: 'gov-catalog', title: '1. Purview Data Map & Catalog', desc: 'Automate asset scanning, metadata curation, and business glossary terminology across multi-cloud storage.' },
      { id: 'gov-lineage', title: '2. Column-Level Data Lineage', desc: 'Trace data provenance from raw database tables through ETL transformations directly into BI dashboards.' },
      { id: 'gov-stewards', title: '3. Data Stewardship & Policies', desc: 'Define access approval workflows, sensitive data masking rules, and steward accountability matrices.' },
      { id: 'gov-sandbox', title: '4. Dedicated Purview Interactive Sandbox', desc: 'Live hands-on interactive sandbox to test lineage graphs, policy stewardship, and atlas schema graphs.', link: 'purview-sandbox/index.html' }
    ]
  },
  'aws-dataengineering': {
    heroTitle: 'AWS Data Engineering Architecture MasterClass',
    heroSubtitle: 'Build resilient, multi-terabyte data pipelines with Amazon S3, AWS Glue, EMR Serverless, Amazon Redshift, Kinesis, Athena, and AWS Lake Formation.',
    why: 'Amazon Web Services powers over 30% of global cloud infrastructure. Enterprises need data engineers who know how to architect cost-optimized, secure, and auto-scaling AWS data lakes and warehouses.',
    what: 'A complete architectural curriculum covering serverless ETL (Glue), distributed big data compute (EMR Spark), real-time streaming (Kinesis), and cloud data warehousing (Redshift).',
    how: 'Ingest batch & real-time events into S3 raw lakes, use Glue Crawlers & Data Catalog for schema discovery, run PySpark jobs on EMR/Glue, and query petabytes via Athena and Redshift Serverless.',
    where: 'Every modern enterprise hosted on AWS needing automated data loading, customer 360 analytics, machine learning feature stores, and automated reporting pipelines.',
    modules: [
      { id: 'aws-s3-lake', title: '1. Amazon S3 Data Lakehouse', desc: 'Design secure, partitioned S3 storage architectures with Lake Formation fine-grained column access control.' },
      { id: 'aws-glue-etl', title: '2. AWS Glue 4.0 Serverless ETL', desc: 'Author serverless PySpark jobs, dynamic frame transformations, and automated Glue Data Catalog crawlers.' },
      { id: 'aws-redshift', title: '3. Amazon Redshift Serverless', desc: 'Provision scalable Redshift clusters, execute high-throughput COPY pipelines, and optimize distribution keys.' },
      { id: 'aws-streaming', title: '4. Kinesis Streaming & Firehose', desc: 'Ingest high-velocity real-time event streams into S3 and OpenSearch with micro-batch transformations.' }
    ]
  },
  'azure-dataengineering': {
    heroTitle: 'Azure Data Engineering & Microsoft Fabric MasterClass',
    heroSubtitle: 'Engineer enterprise Lakehouses with Azure Data Factory (ADF), Azure Synapse Analytics, ADLS Gen2, Microsoft Fabric OneLake, and Databricks on Azure.',
    why: 'Microsoft Azure dominates enterprise corporate IT. Knowledge of Azure Data Factory, ADLS Gen2, and the modern Microsoft Fabric ecosystem is among the most sought-after skillsets globally.',
    what: 'An end-to-end enterprise specialization on building orchestrated data pipelines, hierarchical lakehouse storage, serverless SQL pools, and unified OneLake architectures.',
    how: 'Orchestrate multi-step pipelines in ADF, write delta parquet files to ADLS Gen2, transform with Synapse / Databricks notebooks, and expose data models via Microsoft Fabric OneLake.',
    where: 'Global corporate enterprises running Microsoft ecosystems, banking institutions, healthcare organizations, and government agencies migrating on-premises SQL to cloud Lakehouses.',
    modules: [
      { id: 'azure-adls', title: '1. ADLS Gen2 & OneLake Architecture', desc: 'Configure hierarchical namespaces, ACL permissions, and unified OneLake shortcuts across tenants.' },
      { id: 'azure-adf', title: '2. Azure Data Factory (ADF) Pipelines', desc: 'Build fault-tolerant pipelines with Copy activities, Data Flows, parameterization, and event triggers.' },
      { id: 'azure-synapse', title: '3. Azure Synapse Analytics', desc: 'Leverage Dedicated SQL Pools, Serverless SQL on Data Lake files, and Apache Spark pools for analytics.' },
      { id: 'azure-fabric', title: '4. Microsoft Fabric Lakehouse & Delta', desc: 'Work with the new unified Fabric SaaS analytics platform, direct lake PowerBI mode, and shortcut virtualization.' }
    ]
  },
  'databricks-dataengineering': {
    heroTitle: 'Databricks Lakehouse & Apache Spark MasterClass',
    heroSubtitle: 'Master the Unified Lakehouse platform: Delta Lake ACID transactions, Unity Catalog 3-level governance, Delta Live Tables (DLT), and Photon engine optimization.',
    why: 'Databricks pioneered the Lakehouse architecture, combining the ACID reliability and performance of data warehouses with the open, cost-effective storage of data lakes.',
    what: 'A deep architectural dive into the Databricks Lakehouse platform: Delta Lake internal transaction logs, Unity Catalog access control, declarative DLT pipelines, and Databricks SQL.',
    how: 'Write declarative Python / SQL pipelines in Delta Live Tables, enforce data quality expectations, leverage Unity Catalog across multi-cloud workspaces, and accelerate queries with Photon.',
    where: 'High-growth tech companies, Fortune 500 enterprises, and modern data teams replacing complex two-tier warehouse/lake setups with a unified Lakehouse platform.',
    modules: [
      { id: 'db-delta-lake', title: '1. Delta Lake Deep Dive & Time Travel', desc: 'Understand _delta_log transaction protocols, ACID guarantees, schema enforcement, and version rollback.' },
      { id: 'db-unity-catalog', title: '2. Unity Catalog Multi-Cloud Governance', desc: 'Implement 3-level namespace (catalog.schema.table), attribute-based access control, and centralized lineage.' },
      { id: 'db-dlt', title: '3. Delta Live Tables (DLT) Pipelines', desc: 'Build automated, declarative streaming and batch pipelines with built-in data quality expectations.' },
      { id: 'db-photon', title: '4. Photon Engine & Databricks SQL', desc: 'Optimize query throughput using Databricks C++ vectorized execution engine and serverless SQL warehouses.' }
    ]
  },
  'snowflake-dataengineering': {
    heroTitle: 'Snowflake Cloud Data Platform MasterClass',
    heroSubtitle: 'Architect modern cloud data solutions with Snowflake Virtual Warehouses, Snowpark Python, Streams & Tasks CDC, Cortex AI, and Data Clean Rooms.',
    why: 'Snowflake pioneered the separation of storage and compute, eliminating concurrency bottlenecks and revolutionizing enterprise data sharing with zero-copy cloning and instant elasticity.',
    what: 'A master-level curriculum covering multi-cluster virtual warehouses, Snowpark DataFrame pipelines, automated change data capture (Streams & Tasks), and Snowflake Cortex AI functions.',
    how: 'Ingest semi-structured JSON with VARIANT, scale warehouses from X-Small to 4X-Large instantly, write Snowpark Python code executed natively in Snowflake, and automate CDC pipelines.',
    where: 'Every modern data-driven company looking for zero-maintenance cloud warehousing, instant data sharing without copying files, and unified analytical computing.',
    modules: [
      { id: 'snow-architecture', title: '1. Snowflake Architecture & Micro-Partitions', desc: 'Master immutable micro-partitioning, clustering depth, zero-copy cloning, and time travel mechanisms.' },
      { id: 'snow-warehouses', title: '2. Virtual Warehouses & Auto-Scaling', desc: 'Configure multi-cluster warehouses, credit consumption optimization, and automated suspend/resume policies.' },
      { id: 'snow-snowpark', title: '3. Snowpark Python & Stored Procedures', desc: 'Author scalable DataFrames in Python, train machine learning models, and execute secure user-defined functions.' },
      { id: 'snow-streams-tasks', title: '4. Continuous CDC with Streams & Tasks', desc: 'Build event-driven data transformation pipelines tracking table changes with offset-free stream semantics.' }
    ]
  }
};

function createSubjectIndexPage(subject) {
  ensureAssets(subject.folder);
  const details = SUBJECT_DETAILS[subject.folder];
  if (!details) return;

  const headerHtml = buildHeaderHtml(subject, false, 1);
  const footerHtml = buildFooterHtml(1);

  const modulesHtml = details.modules.map((m, idx) => {
    return `
      <!-- ========================================================================= -->
      <!-- SUBTOPIC: ${m.id} [START] -->
      <!-- ========================================================================= -->
      <section class="content-section" id="${m.id}">
        <div class="section-title-wrap">
          <div>
            <h2>${m.title}</h2>
            <p style="margin:4px 0 0 0;font-size:0.92rem;color:var(--text-muted);">
              ${m.desc}
            </p>
          </div>
        </div>

        <div class="demo-card" style="margin-top:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
            <div>
              <strong style="color:#0f172a;font-size:1.05rem;">Module ${idx + 1} Core Learning Objectives</strong>
              <p style="margin:6px 0 0 0;font-size:0.88rem;color:#64748b;">
                Production architectural patterns, code examples, hands-on lab exercises, and interview master guides for ${m.title}.
              </p>
            </div>
            ${m.link ? `<a href="${m.link}" class="demo-btn demo-btn-primary"><i data-lucide="external-link" style="width:14px;height:14px;"></i> Open Dedicated Sandbox &rarr;</a>` : `<a href="demo.html" class="demo-btn demo-btn-secondary"><i data-lucide="play" style="width:14px;height:14px;"></i> Launch Interactive Demo &rarr;</a>`}
          </div>
        </div>
      </section>
      <!-- ========================================================================= -->
      <!-- SUBTOPIC: ${m.id} [END] -->
      <!-- ========================================================================= -->
    `;
  }).join('\n');

  const inpageLinksHtml = details.modules.map(m => `<li><a href="#${m.id}" class="inpage-link">${m.title}</a></li>`).join('\n        ');

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${details.heroTitle} | Tinitiate MasterClass Academy</title>
  <meta name="description" content="${details.heroSubtitle} Comprehensive enterprise curriculum taught by Venkata Bhattaram.">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="stylesheet" href="../assets/css/master-global-layout.css">
  <script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>
  <script src="../assets/js/master-global-nav.js" defer></script>
  <style>
    .subject-hero {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 27, 75, 0.95) 100%);
      border: 1px solid rgba(139, 92, 246, 0.35);
      border-radius: 16px;
      padding: 32px 36px;
      margin-bottom: 28px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    }
    .subject-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 14px;
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
    .subject-title {
      font-size: 2.1rem;
      font-weight: 900;
      color: #ffffff;
      margin: 0 0 10px 0;
      letter-spacing: -0.02em;
    }
    .subject-subtitle {
      font-size: 0.98rem;
      color: #94a3b8;
      max-width: 860px;
      line-height: 1.55;
      margin: 0 0 20px 0;
    }
    .why-what-how-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }
    .why-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    .why-card-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .why-card-text {
      font-size: 0.86rem;
      color: #475569;
      line-height: 1.5;
      margin: 0;
    }
    .placeholder-box {
      background: #f8fafc;
      border: 1.5px dashed #cbd5e1;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 28px;
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
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .demo-btn-primary {
      background: #7c3aed;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
    }
    .demo-btn-primary:hover {
      background: #6d28d9;
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
  </style>
</head>
<body>
  ${headerHtml}

  <div class="master-layout-container">
    <!-- Left Sidebar: Course Topics -->
    <aside class="sidebar-topics">
      <div class="sidebar-header">
        <i data-lucide="layers" style="width:18px;height:18px;color:#7c3aed;"></i>
        <span>${subject.badge}</span>
      </div>
      <div class="sidebar-menu-list">
        <a href="index.html" class="sidebar-link active">
          <i data-lucide="book-open"></i>
          <span>Course Home</span>
        </a>
        <a href="demo.html" class="sidebar-link">
          <i data-lucide="play-circle"></i>
          <span>Interactive Demo Lab</span>
        </a>
        ${details.modules.map(m => `
        <a href="#${m.id}" class="sidebar-link">
          <i data-lucide="chevron-right"></i>
          <span>${m.title}</span>
        </a>
        `).join('')}
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="master-content-area">
      <!-- Hero Banner -->
      <section class="subject-hero">
        <div class="subject-badge-pill">
          <i data-lucide="award" style="width:14px;height:14px;"></i>
          <span>MasterClass Specialization</span>
        </div>
        <h1 class="subject-title">${details.heroTitle}</h1>
        <p class="subject-subtitle">
          ${details.heroSubtitle}
        </p>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <a href="demo.html" class="demo-btn demo-btn-primary">
            <i data-lucide="play" style="width:14px;height:14px;"></i> Launch Interactive Demo Lab &rarr;
          </a>
          <a href="#intro-overview" class="demo-btn demo-btn-secondary">
            <i data-lucide="file-text" style="width:14px;height:14px;"></i> Why, What &amp; How &rarr;
          </a>
        </div>
      </section>

      <!-- Intro Section: Why, What, How & Where -->
      <section class="content-section" id="intro-overview">
        <div class="section-title-wrap">
          <div>
            <h2>Architecture Fundamentals: Why, What, How &amp; Where</h2>
            <p style="margin:4px 0 0 0;font-size:0.92rem;color:var(--text-muted);">
              Essential mental models and business justification before diving into code and implementation.
            </p>
          </div>
        </div>

        <div class="why-what-how-grid">
          <div class="why-card">
            <div class="why-card-title"><i data-lucide="help-circle" style="color:#ef4444;"></i> 1. Why It Matters</div>
            <p class="why-card-text">${details.why}</p>
          </div>
          <div class="why-card">
            <div class="why-card-title"><i data-lucide="layers" style="color:#3b82f6;"></i> 2. What It Is</div>
            <p class="why-card-text">${details.what}</p>
          </div>
          <div class="why-card">
            <div class="why-card-title"><i data-lucide="cpu" style="color:#10b981;"></i> 3. How It Works</div>
            <p class="why-card-text">${details.how}</p>
          </div>
          <div class="why-card">
            <div class="why-card-title"><i data-lucide="globe" style="color:#8b5cf6;"></i> 4. Where It Is Used</div>
            <p class="why-card-text">${details.where}</p>
          </div>
        </div>
      </section>

      <!-- Job Market Analysis (Placeholder) -->
      <section class="content-section" id="job-market-analysis">
        <div class="section-title-wrap">
          <div>
            <h2>Job Market Analysis &amp; Industry Hiring Demand</h2>
            <p style="margin:4px 0 0 0;font-size:0.92rem;color:var(--text-muted);">
              Current compensation metrics, enterprise demand, and credential expectations for ${subject.badge}.
            </p>
          </div>
        </div>
        <div class="placeholder-box">
          <span style="display:inline-block;padding:3px 10px;border-radius:999px;font-size:0.75rem;font-weight:800;background:#e2e8f0;color:#475569;margin-bottom:8px;">Placeholder Section</span>
          <h3 style="margin:0 0 8px 0;color:#0f172a;font-size:1.15rem;">Job Market Analysis &amp; Industry Trends</h3>
          <p style="margin:0 auto;max-width:700px;font-size:0.88rem;color:#64748b;line-height:1.5;">
            This section will detail global hiring volume, salary benchmarks, required certifications (AWS, Azure, Databricks, Snowflake), and geographic hotspots across Fortune 500 enterprises.
          </p>
        </div>
      </section>

      <!-- Detailed Course Modules -->
      ${modulesHtml}
    </main>

    <!-- Right Sidebar: In-Page Navigation -->
    <aside class="sidebar-inpage-nav">
      <div class="inpage-nav-title">On This Page</div>
      <ul class="inpage-nav-list">
        <li><a href="#intro-overview" class="inpage-link active">Why, What &amp; How</a></li>
        <li><a href="#job-market-analysis" class="inpage-link">Job Market Analysis</a></li>
        ${inpageLinksHtml}
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

  const destFile = path.join(ROOT_DIR, subject.folder, 'index.html');
  fs.writeFileSync(destFile, fullHtml, 'utf8');
  console.log('Created placeholder index.html for:', subject.folder);
}

// Generate the 5 index pages
createSubjectIndexPage(SUBJECTS[3]); // data-governence
createSubjectIndexPage(SUBJECTS[4]); // aws-dataengineering
createSubjectIndexPage(SUBJECTS[5]); // azure-dataengineering
createSubjectIndexPage(SUBJECTS[6]); // databricks-dataengineering
createSubjectIndexPage(SUBJECTS[7]); // snowflake-dataengineering

console.log('All placeholder index.html pages created successfully!');
