const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Microsoft Purview Sandbox - Interactive Demo Lab | Tinitiate MasterClass Academy</title>
  <meta name="description" content="Explore live interactive simulators, data cataloging sandboxes, and lineage playgrounds for Microsoft Purview taught by Venkata Bhattaram.">
  <link rel="icon" type="image/png" href="../../favicon.png">
  <link rel="stylesheet" href="../../assets/css/master-global-layout.css">
  <script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>
  <script src="../../assets/js/master-global-nav.js" defer></script>
  <style>
    .demo-hero {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(6, 78, 59, 0.95) 100%);
      border: 1px solid rgba(16, 185, 129, 0.35);
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
      background: rgba(16, 185, 129, 0.25);
      border: 1px solid rgba(16, 185, 129, 0.5);
      color: #6ee7b7;
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
      background: #059669;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(5, 150, 105, 0.35);
    }
    .demo-btn-primary:hover {
      background: #047857;
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
      color: #34d399;
      font-family: monospace;
      font-size: 0.8rem;
      padding: 14px;
      border-radius: 8px;
      height: 180px;
      overflow-y: auto;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <header class="master-top-nav">
    <div class="master-top-nav-inner">
      <a href="../../index.html" class="master-brand-wrap" aria-label="Tinitiate MasterClass Academy">
        <img src="../../tinitiate_header-banner.png" alt="Tinitiate Logo" class="master-brand-logo">
        <span class="master-brand-badge">Azure Purview Governance</span>
      </a>

      <!-- Primary Navigation Links -->
      <nav class="master-menu-links">
        <a href="../../index.html" class="master-nav-btn" title="Main Academy Portal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </a>
        <a href="index.html" class="master-nav-btn" title="Purview Governance Home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
          <span>Governance Home</span>
        </a>
        <a href="demo.html" class="master-nav-btn subject-home-btn" title="Purview Interactive Demo" style="border-color:rgba(124,58,237,0.5);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Interactive Demo</span>
        </a>

        <!-- Subjects DropDown with Mega Menu -->
        <div class="master-dropdown" id="subjectsDropdown">
          <button type="button" class="master-dropdown-toggle" onclick="toggleSubjectsDropdown(event)" aria-haspopup="true" aria-expanded="false" title="Explore All Subjects">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            <span>Subjects</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </nav>

      <!-- Right Actions: Instructor Rotating Border Beam + LinkedIn + GitHub -->
      <div class="master-nav-actions">
        <div class="master-instructor-beam" title="Lead Course Instructor &amp; Enterprise Architect">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
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

  <div class="master-layout-container" style="max-width:1440px;margin:24px auto;padding:0 24px;display:grid;grid-template-columns:260px 1fr;gap:24px;">
    <!-- Left Sidebar: Course Topics & Navigation -->
    <aside class="sidebar-topics" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:20px;height:fit-content;">
      <div class="sidebar-header" style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:0.95rem;color:#0f172a;margin-bottom:16px;">
        <i data-lucide="shield-check" style="width:18px;height:18px;color:#059669;"></i>
        <span>Purview Governance</span>
      </div>
      <div class="sidebar-menu-list" style="display:flex;flex-direction:column;gap:6px;">
        <a href="index.html" class="sidebar-link" style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.86rem;color:#475569;">
          <i data-lucide="book-open" style="width:16px;height:16px;"></i>
          <span>Course Home</span>
        </a>
        <a href="demo.html" class="sidebar-link active" style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.86rem;background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;">
          <i data-lucide="play-circle" style="width:16px;height:16px;"></i>
          <span>Interactive Demo Lab</span>
        </a>
        <a href="lineage.html" class="sidebar-link" style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.86rem;color:#475569;">
          <i data-lucide="git-branch" style="width:16px;height:16px;"></i>
          <span>Column-Level Lineage</span>
        </a>
        <a href="policy-steward-matrix.html" class="sidebar-link" style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.86rem;color:#475569;">
          <i data-lucide="users" style="width:16px;height:16px;"></i>
          <span>Policy & Steward Matrix</span>
        </a>
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
        <h1 class="demo-title">Microsoft Purview Governance Lab</h1>
        <p class="demo-subtitle">
          Hands-on interactive simulator designed to demonstrate real-world Azure Purview data map scanning, automated classification, column lineage graphs, and policy stewardship.
        </p>
      </section>

      <!-- Sandbox Area -->
      <section class="demo-card">
        <div class="demo-controls-bar">
          <div style="display:flex;align-items:center;gap:12px;">
            <button class="demo-btn demo-btn-primary" onclick="runPurviewScan()">
              <i data-lucide="play"></i>
              <span>Trigger Purview Scan</span>
            </button>
            <button class="demo-btn demo-btn-secondary" onclick="resetPurviewDemo()">
              <i data-lucide="rotate-ccw"></i>
              <span>Reset Assets</span>
            </button>
          </div>
          <div style="font-size:0.82rem;font-weight:700;color:#059669;">
            Status: Active Sandbox Simulation
          </div>
        </div>

        <div class="demo-grid">
          <div class="demo-subcard">
            <div class="demo-subcard-title">
              <i data-lucide="database" style="color:#059669;width:18px;height:18px;"></i>
              <span>Asset Classification Pipeline</span>
            </div>
            <p style="font-size:0.85rem;color:#64748b;line-height:1.5;">
              Simulate scanning Azure SQL, ADLS Gen2, and PowerBI datasets with automated PII detection, SSN masking, and sensitivity label assignment.
            </p>
            <div id="scanResults" style="margin-top:14px;font-size:0.82rem;font-family:monospace;background:#f1f5f9;padding:12px;border-radius:8px;color:#334155;">
              Ready. Click "Trigger Purview Scan" to run simulated metadata classification.
            </div>
          </div>

          <div class="demo-subcard">
            <div class="demo-subcard-title">
              <i data-lucide="terminal" style="color:#059669;width:18px;height:18px;"></i>
              <span>Live Purview Audit Telemetry</span>
            </div>
            <div id="demoTerminal" class="demo-log-terminal">
[PURVIEW] Connected to Azure Data Map telemetry engine.
[SYSTEM] Ready for interactive asset scanning and policy verification.
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <script>
    if (window.lucide) {
      lucide.createIcons();
    }

    function runPurviewScan() {
      const term = document.getElementById('demoTerminal');
      const res = document.getElementById('scanResults');
      term.innerHTML += "\\n[SCAN] Initiating discovery scan on adls-gen2-curated...";
      term.innerHTML += "\\n[SCAN] Found 14,280 Parquet partitions.";
      term.innerHTML += "\\n[CLASSIFY] Detected 4 CreditCard PII patterns -> Auto-labeled 'Confidential'.";
      term.innerHTML += "\\n[CATALOG] Published schema metadata to Purview Unified Data Map.";
      term.scrollTop = term.scrollHeight;
      res.innerHTML = "<strong>Scan Completed:</strong> 14,280 assets scanned. 4 PII classifications applied. Compliance: 100%.";
    }

    function resetPurviewDemo() {
      document.getElementById('demoTerminal').innerHTML = "[PURVIEW] Telemetry reset to baseline state.";
      document.getElementById('scanResults').innerHTML = "Ready. Click \\"Trigger Purview Scan\\" to run simulated metadata classification.";
    }
  </script>
</body>
</html>
`;

fs.writeFileSync('data-governence/purview-sandbox/demo.html', htmlContent, 'utf8');
console.log('Created data-governence/purview-sandbox/demo.html successfully');
