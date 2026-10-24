const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to copy banner image files if not present in folder
function ensureAssets(folder) {
  const targetDir = path.join(ROOT_DIR, folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  ['tinitiate_header-banner.png', 'tinitiate_header-banner-dark.png', 'favicon.png'].forEach(file => {
    const src = path.join(ROOT_DIR, file);
    const dest = path.join(targetDir, file);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  });
}

const SUBJECTS = [
  {
    folder: 'automation-ml-ai-agentic',
    title: '> AI Home',
    badge: 'AI & Agentic Systems',
    subtitle: 'Automation, GenAI & Agentic Loops',
    iconClass: 'icon-ai',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>'
  },
  {
    folder: 'data-engineering',
    title: '> Data Engineering Home',
    badge: 'Data Engineering',
    subtitle: 'Lakehouse, Warehouses & Real-Time',
    iconClass: 'icon-de',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>'
  },
  {
    folder: 'pyspark',
    title: '> PySpark Home',
    badge: 'PySpark Deep Dive',
    subtitle: 'Cluster Architecture, DAG & Streaming',
    iconClass: 'icon-spark',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
  },
  {
    folder: 'data-governence',
    title: '> Data Governance Home',
    badge: 'Data Governance',
    subtitle: 'Purview Catalog, Lineage & Stewards',
    iconClass: 'icon-gov',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>'
  },
  {
    folder: 'aws-dataengineering',
    title: '> AWS Data Engineering Home',
    badge: 'AWS Data Engineering',
    subtitle: 'EMR, Glue, Redshift, Kinesis & S3',
    iconClass: 'icon-aws',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>'
  },
  {
    folder: 'azure-dataengineering',
    title: '> Azure Data Engineering Home',
    badge: 'Azure Data Engineering',
    subtitle: 'Fabric, Synapse, ADF & ADLS Gen2',
    iconClass: 'icon-azure',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>'
  },
  {
    folder: 'databricks-dataengineering',
    title: '> Databricks Lakehouse Home',
    badge: 'Databricks Lakehouse',
    subtitle: 'Unity Catalog, Delta Lake & Photon',
    iconClass: 'icon-databricks',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'
  },
  {
    folder: 'snowflake-dataengineering',
    title: '> Snowflake Cloud Data Home',
    badge: 'Snowflake Cloud Data',
    subtitle: 'Snowpark, Warehouses, Streams & Cortex',
    iconClass: 'icon-snowflake',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><line x1="12" x2="12" y1="10" y2="14"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="20" x2="4" y1="4" y2="20"/><line x1="4" x2="20" y1="4" y2="20"/></svg>'
  }
];

function buildDropdownHtml(relPrefix) {
  const items = SUBJECTS.map(s => {
    return `            <a href="${relPrefix}${s.folder}/index.html" class="master-dropdown-item">
              <span class="dropdown-item-icon ${s.iconClass}">${s.svg}</span>
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">${s.title}</span>
                <span class="dropdown-item-sub">${s.subtitle}</span>
              </div>
            </a>`;
  }).join('\n');

  return `<div class="master-dropdown" id="subjectsDropdown">
          <button type="button" class="master-dropdown-toggle" onclick="toggleSubjectsDropdown(event)" aria-haspopup="true" aria-expanded="false" title="Explore All Subjects">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            <span>Subjects</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="master-dropdown-menu">
${items}
          </div>
        </div>`;
}

function buildHeaderHtml(subject, isDemoPage, depth = 1) {
  const relPrefix = depth === 1 ? '../' : depth === 2 ? '../../' : '';
  const homeLink = `${relPrefix}index.html`;
  const subjectHomeLink = depth === 1 ? 'index.html' : `${relPrefix}${subject.folder}/index.html`;
  const demoLink = depth === 1 ? 'demo.html' : `${relPrefix}${subject.folder}/demo.html`;
  const logoPath = `${relPrefix}tinitiate_header-banner.png`;

  return `<header class="master-top-nav">
    <div class="master-top-nav-inner">
      <a href="${homeLink}" class="master-brand-wrap" aria-label="Tinitiate MasterClass Academy">
        <img src="${logoPath}" alt="Tinitiate Logo" class="master-brand-logo">
        <span class="master-brand-badge">${subject.badge}</span>
      </a>

      <!-- Primary Navigation Links (NO LOCAL NAVIGATION IN HEADER) -->
      <nav class="master-menu-links">
        <a href="${homeLink}" class="master-nav-btn" title="Main Academy Portal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </a>
        <a href="${subjectHomeLink}" class="master-nav-btn ${!isDemoPage ? 'subject-home-btn' : ''}" title="${subject.badge} Home">
          ${subject.svg}
          <span>${subject.badge} Home</span>
        </a>
        <a href="${demoLink}" class="master-nav-btn ${isDemoPage ? 'subject-home-btn' : ''}" title="${subject.badge} Interactive Demo" style="border-color:rgba(124,58,237,0.5);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Interactive Demo</span>
        </a>

        <!-- Subjects DropDown with Bulletproof Bridge & SVGs -->
        ${buildDropdownHtml(relPrefix)}
      </nav>

      <!-- Right Actions: Instructor Rotating Border Beam + LinkedIn + GitHub -->
      <div class="master-nav-actions">
        <div class="master-instructor-beam" title="Lead Course Instructor &amp; Enterprise Architect">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
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

function buildFooterHtml(depth = 1) {
  const relPrefix = depth === 1 ? '../' : depth === 2 ? '../../' : '';
  const portalLinks = SUBJECTS.map(s => {
    return `<a href="${relPrefix}${s.folder}/index.html" class="footer-portal-chip">${s.title.replace('&gt; ', '')}</a>`;
  }).join('\n          ');

  return `<footer class="site-footer">
    <div class="footer-container">
      <div class="footer-main-grid">

        <!-- Column 1: Company Profile & Social Channels -->
        <div class="footer-col">
          <div class="footer-col-title">
            <i data-lucide="building-2" style="color:#38bdf8;width:22px;height:22px;"></i>
            <span>Tinitiate AI Academy</span>
          </div>
          <p class="footer-col-desc">
            Industry-aligned IT training curriculum designed to transition software engineers, cloud architects, and data professionals into high-impact AI, GenAI, and Distributed Lakehouse Engineering roles.
          </p>
          <span class="footer-contact-label">Company Social Channels</span>
          <div class="footer-socials-grid">
            <a href="https://linkedin.com/company/tinitiate" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate LinkedIn">
              <span class="footer-social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg></span>
              <span>LinkedIn</span>
            </a>
            <a href="https://youtube.com/@tinitiate" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate YouTube">
              <span class="footer-social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0000"><path d="M21.58 7.19a2.76 2.76 0 0 0-1.95-1.95C17.9 4.75 12 4.75s-5.9 0-7.63.49a2.76 2.76 0 0 0-1.95 1.95A28.84 28.84 0 0 0 2 12a28.84 28.84 0 0 0 .42 4.81 2.76 2.76 0 0 0 1.95 1.95c1.73.49 7.63.49 7.63.49s5.9 0 7.63-.49a2.76 2.76 0 0 0 1.95-1.95A28.84 28.84 0 0 0 22 12a28.84 28.84 0 0 0-.42-4.81ZM10 15V9l5.2 3L10 15Z"/></svg></span>
              <span>YouTube</span>
            </a>
            <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Tinitiate GitHub">
              <span class="footer-social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg></span>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <!-- Column 2: Lead Instructor Profiles -->
        <div class="footer-col">
          <div class="footer-col-title">
            <i data-lucide="user-check" style="color:#a855f7;width:22px;height:22px;"></i>
            <span>Venkata Bhattaram</span>
          </div>
          <p class="footer-col-desc">
            Lead AI Instructor &amp; Enterprise Architect. Connect directly for course consultations, curriculum design, and technical advisory.
          </p>
          <span class="footer-contact-label">Venkata Bhattaram's Profiles</span>
          <div class="footer-socials-grid">
            <a href="https://www.linkedin.com/in/venkata-bhattaram/" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Venkata Bhattaram LinkedIn">
              <span class="footer-social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg></span>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="Venkata Bhattaram GitHub">
              <span class="footer-social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg></span>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <!-- Column 3: Contact & Call Us -->
        <div class="footer-col">
          <div class="footer-col-title">
            <i data-lucide="phone-call" style="color:#22c55e;width:22px;height:22px;"></i>
            <span>Contact &amp; Call Us</span>
          </div>
          <div class="footer-contact-block">
            <div class="footer-contact-item">
              <div class="footer-contact-icon"><i data-lucide="mail" style="width:18px;height:18px;"></i></div>
              <div class="footer-contact-details">
                <span class="footer-contact-label">Email Support</span>
                <a href="mailto:contact@tinitiateai.com" class="footer-web-link">contact@tinitiateai.com</a>
              </div>
            </div>
            <div class="footer-contact-item">
              <div class="footer-contact-icon"><i data-lucide="globe" style="width:18px;height:18px;"></i></div>
              <div class="footer-contact-details">
                <span class="footer-contact-label">Official Portal</span>
                <a href="https://tinitiateai.com" target="_blank" rel="noopener noreferrer" class="footer-web-link">tinitiateai.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Curriculum Portals Bar -->
      <div class="footer-portals-bar">
        <span class="footer-contact-label" style="margin:0;">MasterClass Portals:</span>
        <div class="footer-portals-list">
          <a href="${relPrefix}index.html" class="footer-portal-chip">🏠 Academy Home</a>
          ${portalLinks}
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom-bar">
        <div>
          &copy; 2026 <strong>Venkata Bhattaram</strong> &bull; <a href="https://tinitiateai.com" target="_blank" rel="noopener noreferrer" style="color:#ffffff;text-decoration:none;font-weight:700;">TinitiateAI.com</a> &bull; All Rights Reserved.
        </div>
        <div class="footer-bottom-links">
          <span>Lead Instructor: <strong>Venkata Bhattaram</strong></span>
          <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer">github.com/venkata-bcs</a>
        </div>
      </div>
    </div>
  </footer>`;
}

module.exports = {
  SUBJECTS,
  ensureAssets,
  buildDropdownHtml,
  buildHeaderHtml,
  buildFooterHtml,
  ROOT_DIR
};

console.log('Template generator module ready.');
