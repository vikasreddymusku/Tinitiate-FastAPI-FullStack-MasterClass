const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Inline SVG icons for instant, 100% reliable rendering without Lucide timing issues
const SVGS = {
  home: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  grid: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  chevron: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  bot: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`,
  db: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`,
  shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  zap: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  award: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`
};

function generateHeader({
  level = 1,
  subjectKey = '',
  brandBadge = 'MasterClass Academy'
}) {
  const rootPrefix = level === 0 ? '' : (level === 1 ? '../' : '../../');
  const aiHref = `${rootPrefix}automation-ml-ai-agentic/index.html`;
  const deHref = `${rootPrefix}data-engineering/index.html`;
  const govHref = `${rootPrefix}data-governence/purview-sandbox/index.html`;
  const sparkHref = `${rootPrefix}pyspark/index.html`;
  const homeHref = `${rootPrefix}index.html`;
  const logoSrc = `${rootPrefix}tinitiate_header-banner.png`;

  let currentSubjectBtn = '';
  if (subjectKey === 'pyspark') {
    currentSubjectBtn = `
        <a href="index.html" class="master-nav-btn subject-home-btn" title="PySpark Architecture Home">
          ${SVGS.zap}
          <span>PySpark Home</span>
        </a>`;
  } else if (subjectKey === 'de') {
    currentSubjectBtn = `
        <a href="index.html" class="master-nav-btn subject-home-btn" title="Data Engineering Home">
          ${SVGS.db}
          <span>Data Engineering Home</span>
        </a>`;
  } else if (subjectKey === 'ai') {
    currentSubjectBtn = `
        <a href="index.html" class="master-nav-btn subject-home-btn" title="AI Systems Home">
          ${SVGS.bot}
          <span>AI Systems Home</span>
        </a>`;
  } else if (subjectKey === 'gov') {
    currentSubjectBtn = `
        <a href="index.html" class="master-nav-btn subject-home-btn" title="Data Governance Home">
          ${SVGS.shield}
          <span>Governance Home</span>
        </a>`;
  }

  return `  <!-- ========================================================================= -->
  <!-- TOP MENU BAR: Unified Royal Violet Theme & Visual Dropdown                -->
  <!-- ========================================================================= -->
  <header class="master-top-nav">
    <div class="master-top-nav-inner">
      <a href="${homeHref}" class="master-brand-wrap" aria-label="Tinitiate MasterClass Academy">
        <img src="${logoSrc}" alt="Tinitiate Logo" class="master-brand-logo">
        <span class="master-brand-badge">${brandBadge}</span>
      </a>

      <!-- Primary Navigation Links (NO LOCAL NAVIGATION IN HEADER) -->
      <nav class="master-menu-links">
        <a href="${homeHref}" class="master-nav-btn" title="Main Academy Portal">
          ${SVGS.home}
          <span>Home</span>
        </a>${currentSubjectBtn}

        <!-- Subjects DropDown with Bulletproof Bridge & SVGs -->
        <div class="master-dropdown" id="subjectsDropdown">
          <button type="button" class="master-dropdown-toggle" onclick="toggleSubjectsDropdown(event)" aria-haspopup="true" aria-expanded="false" title="Explore All Subjects">
            ${SVGS.grid}
            <span>Subjects</span>
            ${SVGS.chevron}
          </button>
          <div class="master-dropdown-menu">
            <a href="${aiHref}" class="master-dropdown-item">
              <span class="dropdown-item-icon icon-ai">${SVGS.bot}</span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">&gt; AI Home</span>
                <span class="dropdown-item-sub">Automation, GenAI &amp; Agentic Loops</span>
              </div>
            </a>
            <a href="${deHref}" class="master-dropdown-item">
              <span class="dropdown-item-icon icon-de">${SVGS.db}</span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">&gt; Data Engineering Home</span>
                <span class="dropdown-item-sub">Lakehouse, Warehouses &amp; Real-Time</span>
              </div>
            </a>
            <a href="${govHref}" class="master-dropdown-item">
              <span class="dropdown-item-icon icon-gov">${SVGS.shield}</span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">&gt; Data Governance Home</span>
                <span class="dropdown-item-sub">Purview Catalog, Lineage &amp; Stewards</span>
              </div>
            </a>
            <a href="${sparkHref}" class="master-dropdown-item">
              <span class="dropdown-item-icon icon-spark">${SVGS.zap}</span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">&gt; PySpark Home</span>
                <span class="dropdown-item-sub">Cluster Architecture, DAG &amp; Streaming</span>
              </div>
            </a>
          </div>
        </div>
      </nav>

      <!-- Right Actions: Instructor Rotating Border Beam + LinkedIn + GitHub -->
      <div class="master-nav-actions">
        <div class="master-instructor-beam" title="Lead Course Instructor &amp; Enterprise Architect">
          ${SVGS.award}
          <span class="inst-label">Instructor:</span>
          <span class="inst-name">Venkata Bhattaram</span>
        </div>

        <a href="https://www.linkedin.com/in/venkata-bhattaram/" target="_blank" rel="noopener noreferrer" class="master-nav-social-btn linkedin" title="Venkata Bhattaram on LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>
          <span>LinkedIn</span>
        </a>

        <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="master-nav-social-btn github" title="Venkata Bhattaram on GitHub">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </header>`;
}

function updateFileHeader(filePath, headerConfig) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace header
  const newHeader = generateHeader(headerConfig);
  if (html.includes('<header')) {
    html = html.replace(/<header[\s\S]*?<\/header>/i, newHeader);
  } else {
    html = html.replace(/<body[^>]*>/i, `$& \n${newHeader}`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

// 1. Root
updateFileHeader(path.join(rootDir, 'index.html'), { level: 0, subjectKey: '', brandBadge: 'MasterClass Academy' });
console.log('Synced root index.html header with SVGs');

// 2. PySpark
const pysparkDir = path.join(rootDir, 'pyspark');
fs.readdirSync(pysparkDir).filter(f => f.endsWith('.html')).forEach(f => {
  updateFileHeader(path.join(pysparkDir, f), { level: 1, subjectKey: 'pyspark', brandBadge: 'PySpark Architecture' });
  console.log(`Synced pyspark/${f} header`);
});

// 3. Data Engineering
const deDir = path.join(rootDir, 'data-engineering');
fs.readdirSync(deDir).filter(f => f.endsWith('.html')).forEach(f => {
  updateFileHeader(path.join(deDir, f), { level: 1, subjectKey: 'de', brandBadge: 'Data Engineering MasterClass' });
  console.log(`Synced data-engineering/${f} header`);
});

// 4. Automation AI
const aiDir = path.join(rootDir, 'automation-ml-ai-agentic');
fs.readdirSync(aiDir).filter(f => f.endsWith('.html') && !f.includes('-old')).forEach(f => {
  updateFileHeader(path.join(aiDir, f), { level: 1, subjectKey: 'ai', brandBadge: 'AI & Agentic Systems' });
  console.log(`Synced automation-ml-ai-agentic/${f} header`);
});

// 5. Governance Purview Sandbox
const govDir = path.join(rootDir, 'data-governence', 'purview-sandbox');
fs.readdirSync(govDir).filter(f => f.endsWith('.html')).forEach(f => {
  updateFileHeader(path.join(govDir, f), { level: 2, subjectKey: 'gov', brandBadge: 'Azure Purview Governance' });
  console.log(`Synced purview-sandbox/${f} header`);
});
