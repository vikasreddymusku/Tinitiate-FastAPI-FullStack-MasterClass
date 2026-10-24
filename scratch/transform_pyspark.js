const fs = require('fs');
const path = require('path');

const pysparkDir = path.join(__dirname, '..', 'pyspark');

const pysparkTopics = [
  { id: 'hub', file: 'index.html', title: 'PySpark Overview', badge: 'HUB' },
  { id: 'topic-1', file: 'cluster-architecture.html', title: '1. Cluster Setup & Sizer', badge: '01' },
  { id: 'topic-2', file: 'cloud-storage.html', title: '2. Cloud Storage Ingestion', badge: '02' },
  { id: 'topic-3', file: 'rdbms-jdbc.html', title: '3. Parallel RDBMS JDBC', badge: '03' },
  { id: 'topic-4', file: 'mpp-warehouses.html', title: '4. MPP Warehouses & Staging', badge: '04' },
  { id: 'topic-5', file: 'dag-execution.html', title: '5. DAG, Stages & Tasks', badge: '05' },
  { id: 'topic-6', file: 'shuffle-partitioning.html', title: '6. Shuffle & Partitioning', badge: '06' },
  { id: 'topic-7', file: 'streaming-cdc.html', title: '7. Streaming & CDC', badge: '07' },
];

const subtopicsMap = {
  'cluster-architecture.html': [
    { id: 'sec-race', title: 'Laptop vs Cluster Race' },
    { id: 'sec-kitchen', title: 'Kitchen Team Analogy' },
    { id: 'sec-topology', title: 'Visual Cluster Topology' },
    { id: 'sec-memory', title: 'Storage & Memory Breakdown' },
    { id: 'sec-sizer', title: 'Hardware Sizing Calculator' }
  ],
  'cloud-storage.html': [
    { id: 'sec-cloud-selector', title: 'Cloud Connector Studio' },
    { id: 'sec-committers', title: 'Zero-Rename Committers' },
    { id: 'sec-partition-layout', title: 'Hive Directory Partitioning' }
  ],
  'rdbms-jdbc.html': [
    { id: 'sec-jdbc-simulator', title: 'Parallel JDBC Simulator' },
    { id: 'sec-partition-columns', title: 'Partition Column Selection' },
    { id: 'sec-db-connection-pool', title: 'Connection Pool Saturation' }
  ],
  'mpp-warehouses.html': [
    { id: 'sec-mpp-simulator', title: 'MPP Ingestion Simulator' },
    { id: 'sec-staging-flow', title: 'Cloud Storage Staging Flow' },
    { id: 'sec-arrow-flight', title: 'Arrow Flight High-Throughput' }
  ],
  'dag-execution.html': [
    { id: 'sec-dag-simulator', title: 'Interactive DAG Simulator' },
    { id: 'sec-dag-visualizer', title: 'Visual DAG-Stage-Task Graph' },
    { id: 'sec-narrow-wide-ops', title: 'Narrow vs Wide Transformations' },
    { id: 'sec-catalyst-optimizer', title: 'Catalyst Logical & Physical Plan' }
  ],
  'shuffle-partitioning.html': [
    { id: 'sec-node-anatomy', title: 'Node Anatomy: CPU + RAM' },
    { id: 'sec-scheduling-pipeline', title: '5-Step Task Scheduling' },
    { id: 'sec-ingestion-dashboard', title: '50-Row Ingestion & Shuffle' },
    { id: 'sec-shuffle-network', title: 'Multi-Host Network Exchange' },
    { id: 'sec-df-dag-studio', title: 'DataFrame & DAG Execution' },
    { id: 'sec-skew-mitigation', title: 'Skew Mitigation & Salting' }
  ],
  'streaming-cdc.html': [
    { id: 'sec-streaming-sim', title: 'Streaming Stress Simulator' },
    { id: 'sec-streaming-arch', title: 'Partitions & Cores Golden Rule' },
    { id: 'sec-cdc-patterns', title: 'Debezium CDC WAL Patterns' }
  ],
  'index.html': [
    { id: 'sec-hero-banner', title: 'Overview & Fast Tracks' },
    { id: 'sec-simulators', title: 'Interactive Simulators (4)' },
    { id: 'sec-step-1', title: 'Module 01: Cluster Architecture' },
    { id: 'sec-step-2', title: 'Module 02: Cloud Storage' },
    { id: 'sec-step-3', title: 'Module 03: RDBMS Parallel JDBC' },
    { id: 'sec-step-4', title: 'Module 04: MPP Warehouses' },
    { id: 'sec-step-5', title: 'Module 05: DAG Stages & Tasks' },
    { id: 'sec-step-6', title: 'Module 06: Shuffle & Sizing' },
    { id: 'sec-step-7', title: 'Module 07: Real-Time Streaming' }
  ]
};

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
        <a href="index.html" class="master-nav-btn subject-home-btn" title="PySpark Architecture Home">
          <i data-lucide="zap" style="width:14px;height:14px;"></i>
          <span>PySpark Home</span>
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
            <a href="../data-engineering/index.html" class="master-dropdown-item">
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
            <a href="index.html" class="master-dropdown-item">
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

        <button type="button" class="theme-toggle-btn" onclick="toggleTheme()" title="Switch Theme">
          <i data-lucide="sun" id="theme-toggle-icon" style="width:14px;height:14px;"></i>
          <span id="theme-toggle-label">Theme</span>
        </button>
      </div>
    </div>
  </header>`;
}

function buildLeftSidebar(currentFile) {
  return `    <!-- ========================================================================= -->
    <!-- LEFT SIDEBAR: All Topics Navigation on Left for all                       -->
    <!-- ========================================================================= -->
    <aside class="sidebar-topics-nav" id="sidebarTopicsNav" aria-label="PySpark Topics Navigation">
      <div class="sidebar-header-box">
        <span class="sidebar-header-title">
          <i data-lucide="layers" style="width:14px;height:14px;"></i>
          PySpark Topics
        </span>
        <span style="font-size:0.72rem;color:var(--text-muted);font-family:var(--font-mono);">7 TOPICS</span>
      </div>

      <ul class="sidebar-topics-list">
        ${pysparkTopics.map(t => {
          const isActive = t.file === currentFile;
          return `<li class="sidebar-topic-item">
          <a href="${t.file}" class="sidebar-topic-link${isActive ? ' active' : ''}">
            <span class="sidebar-topic-badge">${t.badge}</span>
            <span>${t.title}</span>
          </a>
        </li>`;
        }).join('\n        ')}
      </ul>
    </aside>`;
}

function buildRightSidebar(subtopics) {
  if (!subtopics || subtopics.length === 0) return '';
  return `    <!-- ========================================================================= -->
    <!-- RIGHT SIDEBAR: In Page Navigation on Right (On This Page)                 -->
    <!-- ========================================================================= -->
    <aside class="sidebar-inpage-nav" id="sidebarInpageNav" aria-label="In-Page Table of Contents">
      <div class="inpage-header-box">
        <span class="inpage-header-title">
          <i data-lucide="compass" style="width:14px;height:14px;"></i>
          On This Page
        </span>
        <span style="font-size:0.7rem;color:var(--text-muted);font-family:var(--font-mono);">${subtopics.length} SECTIONS</span>
      </div>

      <ul class="inpage-list">
        ${subtopics.map((st, i) => `
        <li class="inpage-item">
          <a href="#${st.id}" class="inpage-link${i === 0 ? ' active' : ''}">
            <span class="inpage-step-num">${String(i + 1).padStart(2, '0')}</span>
            <span>${st.title}</span>
          </a>
        </li>`).join('')}
      </ul>
    </aside>`;
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
          <a href="../data-engineering/index.html" class="master-footer-link">🗄️ Data Engineering</a>
          <a href="../data-governence/purview-sandbox/index.html" class="master-footer-link">🛡️ Data Governance</a>
          <a href="index.html" class="master-footer-link">⚡ PySpark Architecture</a>
        </div>
      </div>
    </div>
  </footer>
  <script src="../assets/js/master-global-nav.js" defer></script>`;
}

// Process each file
pysparkTopics.forEach(t => {
  const filePath = path.join(pysparkDir, t.file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // 1. In head, ensure master-global-layout.css is linked
  if (!html.includes('master-global-layout.css')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="../assets/css/master-global-layout.css">\n</head>');
  }
  
  // 2. Replace <header>...</header> with unified master top nav
  html = html.replace(/<header[\s\S]*?<\/header>/i, buildTopNav());
  
  // 3. Replace <aside ... id="inpageSidebar"[\s\S]*?<\/aside>
  // Notice we now put Left Sidebar (topics) BEFORE the main content, and Right Sidebar (inpage) AFTER or at the end of layout
  const subtopics = subtopicsMap[t.file] || [];
  const leftSidebarHtml = buildLeftSidebar(t.file);
  const rightSidebarHtml = buildRightSidebar(subtopics);
  
  // Replace layout container class with master-layout-3col
  html = html.replace(/class=["'][^"']*pyspark-layout-with-sidebar[^"']*["']/i, 'class="master-layout-3col"');
  
  // Replace the old aside with the Left Sidebar
  html = html.replace(/<aside[\s\S]*?<\/aside>/i, leftSidebarHtml);
  
  // Now we need to insert the Right Sidebar right before </main> or after </main>
  // In the 3-column layout grid: [Left Aside, Main, Right Aside]
  // Let's find </main> and put rightSidebarHtml right after it!
  if (!html.includes('sidebar-inpage-nav')) {
    html = html.replace(/<\/main>/i, `</main>\n\n${rightSidebarHtml}`);
  }
  
  // 4. Mark subtopics with clear delimitation comments
  subtopics.forEach(st => {
    const secRegex = new RegExp(`(<section[^>]*id=["']${st.id}["'][^>]*>)`, 'i');
    if (secRegex.test(html)) {
      html = html.replace(secRegex, (match) => {
        // Add delimitation comment and class
        let updated = match;
        if (!updated.includes('subtopic-block')) {
          updated = updated.replace(/class=["']([^"']*)["']/, 'class="$1 subtopic-block" data-subtopic="' + st.id + '"');
        }
        return `\n      <!-- ========================================================================= -->\n      <!-- SUBTOPIC: ${st.id} | ${st.title} [START] -->\n      <!-- ========================================================================= -->\n      ${updated}`;
      });
      
      // Also add closing delimitation comment before the next section or end of section
      // We can also find </section> associated with that or leave start and end markers
    }
  });
  
  // 5. Replace footer
  html = html.replace(/<footer[\s\S]*?<\/footer>/i, buildFooter());
  
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${t.file}: length = ${html.length}`);
});
