const fs = require('fs');
const path = require('path');

const deDir = path.join(__dirname, '..', 'data-engineering');
const files = fs.readdirSync(deDir).filter(f => f.endsWith('.html'));

function buildTopNav() {
  return `  <!-- ========================================================================= -->
  <!-- TOP MENU BAR: Unified Master Header Across All Subjects                   -->
  <!-- ========================================================================= -->
  <header class="master-top-nav">
    <div class="master-top-nav-inner">
      <a href="../index.html" class="master-brand-wrap" aria-label="Tinitiate MasterClass Academy">
        <img src="../tinitiate_header-banner.png" alt="Tinitiate Logo" class="master-brand-logo">
        <span class="master-brand-title">MasterClass Academy</span>
      </a>

      <!-- Primary Navigation Links (NO LOCAL NAVIGATION IN HEADER) -->
      <nav class="master-menu-links">
        <a href="../index.html" class="master-nav-btn" title="Main Academy Portal">
          <i data-lucide="home" style="width:14px;height:14px;"></i>
          <span>Home</span>
        </a>

        <!-- Current Subject Home (Only in this subject) -->
        <a href="index.html" class="master-nav-btn subject-home-btn" title="Data Engineering Home" style="background:rgba(2,132,199,0.12);border-color:rgba(2,132,199,0.35);color:#38bdf8;">
          <i data-lucide="database" style="width:14px;height:14px;"></i>
          <span>Data Engineering Home</span>
        </a>

        <!-- Subjects DropDown -->
        <div class="master-dropdown" id="subjectsDropdown">
          <button type="button" class="master-dropdown-toggle" onclick="toggleSubjectsDropdown(event)" aria-haspopup="true" aria-expanded="false" title="Explore All Subjects">
            <i data-lucide="grid" style="width:14px;height:14px;"></i>
            <span>Subjects</span>
            <i data-lucide="chevron-down" style="width:13px;height:13px;transition:transform 0.2s ease;"></i>
          </button>
          <div class="master-dropdown-menu">
            <a href="../automation-ml-ai-agentic/index.html" class="master-dropdown-item">
              <span class="dropdown-item-icon icon-ai"><i data-lucide="bot" style="width:16px;height:16px;"></i></span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">&gt; AI Home</span>
                <span class="dropdown-item-sub">Automation, GenAI &amp; Agentic Loops</span>
              </div>
            </a>
            <a href="index.html" class="master-dropdown-item">
              <span class="dropdown-item-icon icon-de"><i data-lucide="database" style="width:16px;height:16px;"></i></span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">&gt; Data Engineering Home</span>
                <span class="dropdown-item-sub">Lakehouse, Warehouses &amp; Real-Time</span>
              </div>
            </a>
            <a href="../data-governence/purview-sandbox/index.html" class="master-dropdown-item">
              <span class="dropdown-item-icon icon-gov"><i data-lucide="shield" style="width:16px;height:16px;"></i></span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">&gt; Data Governance Home</span>
                <span class="dropdown-item-sub">Purview Catalog, Lineage &amp; Stewards</span>
              </div>
            </a>
            <a href="../pyspark/index.html" class="master-dropdown-item">
              <span class="dropdown-item-icon icon-spark"><i data-lucide="zap" style="width:16px;height:16px;"></i></span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">&gt; PySpark Home</span>
                <span class="dropdown-item-sub">Cluster Architecture, DAG &amp; Streaming</span>
              </div>
            </a>
          </div>
        </div>
      </nav>

      <!-- Right Actions: Instructor + LinkedIn + GitHub + Theme Toggle -->
      <div class="master-nav-actions">
        <div class="master-instructor-chip" title="Lead Course Instructor &amp; Enterprise Architect">
          <i data-lucide="award" style="width:13px;height:13px;color:#38bdf8;"></i>
          <span class="master-inst-label">Instructor:</span>
          <span class="master-inst-name">Venkata Bhattaram</span>
          <a href="https://www.linkedin.com/in/venkata-bhattaram/" target="_blank" rel="noopener noreferrer" class="master-social-btn linkedin" title="Venkata Bhattaram on LinkedIn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>
          </a>
          <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="master-social-btn github" title="Venkata Bhattaram on GitHub">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </header>`;
}

function buildFooter() {
  return `  <!-- ========================================================================= -->
  <!-- SITE FOOTER: Consistent Footer Across All Pages                           -->
  <!-- ========================================================================= -->
  <footer class="master-footer">
    <div class="master-footer-inner">
      <div class="master-footer-brand-box">
        <img src="../tinitiate_header-banner.png" alt="Tinitiate Logo" class="master-footer-logo">
        <div class="master-footer-copy-text">
          <span>&copy; 2026 Tinitiate AI IT Training &bull; Designed &amp; Instructed by</span>
          <span class="master-footer-author">Venkata Bhattaram</span>
          <div class="master-footer-social-links">
            <a href="https://www.linkedin.com/in/venkata-bhattaram/" target="_blank" rel="noopener noreferrer" class="master-social-btn linkedin" title="Venkata Bhattaram on LinkedIn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>
            </a>
            <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="master-social-btn github" title="Venkata Bhattaram on GitHub">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="master-footer-subjects-nav">
        <span class="master-footer-subject-tag">Portals:</span>
        <div class="master-footer-subject-links">
          <a href="../index.html" class="master-footer-link">🏠 Academy Home</a>
          <a href="../automation-ml-ai-agentic/index.html" class="master-footer-link">🤖 AI Systems</a>
          <a href="index.html" class="master-footer-link">🗄️ Data Engineering</a>
          <a href="../data-governence/purview-sandbox/index.html" class="master-footer-link">🛡️ Data Governance</a>
          <a href="../pyspark/index.html" class="master-footer-link">⚡ PySpark Architecture</a>
        </div>
      </div>
    </div>
  </footer>
  <script src="../assets/js/master-global-nav.js" defer></script>`;
}

files.forEach(file => {
  const filePath = path.join(deDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Add global stylesheet
  if (!html.includes('master-global-layout.css')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="../assets/css/master-global-layout.css">\n</head>');
  }

  // Replace header
  html = html.replace(/<header[\s\S]*?<\/header>/i, buildTopNav());

  // Replace footer
  html = html.replace(/<footer[\s\S]*?<\/footer>/i, buildFooter());

  // Swap Left and Right in layout:
  // In topic pages: <nav class="inpage-nav-panel"> ... </nav> was left, <aside class="site-nav-panel"> was right.
  // We extract inpage-nav-panel and site-nav-panel and swap them so site-nav-panel is on the LEFT, and inpage-nav-panel is on the RIGHT.
  const inpageMatch = html.match(/<nav class="inpage-nav-panel"[\s\S]*?<\/nav>/i);
  const siteNavMatch = html.match(/<aside class="site-nav-panel"[\s\S]*?<\/aside>/i);

  if (inpageMatch && siteNavMatch) {
    const inpageHtml = inpageMatch[0];
    const siteNavHtml = siteNavMatch[0];

    // Remove both first
    html = html.replace(inpageHtml, '___PLACEHOLDER_LEFT___');
    html = html.replace(siteNavHtml, '___PLACEHOLDER_RIGHT___');

    // Put siteNavHtml on left, inpageHtml on right
    html = html.replace('___PLACEHOLDER_LEFT___', siteNavHtml);
    html = html.replace('___PLACEHOLDER_RIGHT___', inpageHtml);
  }

  // Subtopic delimitation for sections
  const secRegex = /(<section[^>]*id=["']([^"']+)["'][^>]*>)/gi;
  html = html.replace(secRegex, (match, fullTag, secId) => {
    if (html.includes(`SUBTOPIC: ${secId}`)) return match;
    return `\n      <!-- ========================================================================= -->\n      <!-- SUBTOPIC: ${secId} [START] -->\n      <!-- ========================================================================= -->\n      ${match}`;
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated data-engineering/${file}`);
});
