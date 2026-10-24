const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function generateAIFooter(level = 1) {
  const rootPrefix = level === 0 ? '' : (level === 1 ? '../' : '../../');
  return `  <!-- ========================================================================= -->
  <!-- SITE FOOTER: AI MasterClass Premium High-Contrast Black Footer            -->
  <!-- ========================================================================= -->
  <footer class="site-footer">
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
          <a href="${rootPrefix}index.html" class="footer-portal-chip">🏠 Academy Home</a>
          <a href="${rootPrefix}automation-ml-ai-agentic/index.html" class="footer-portal-chip">🤖 AI Systems Hub</a>
          <a href="${rootPrefix}data-engineering/index.html" class="footer-portal-chip">🗄️ Data Engineering Hub</a>
          <a href="${rootPrefix}data-governence/purview-sandbox/index.html" class="footer-portal-chip">🛡️ Data Governance</a>
          <a href="${rootPrefix}pyspark/index.html" class="footer-portal-chip">⚡ PySpark Architecture</a>
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
  </footer>
  <script src="${rootPrefix}assets/js/master-global-nav.js" defer></script>`;
}

function updateFooter(filePath, level) {
  let html = fs.readFileSync(filePath, 'utf8');
  const footerHtml = generateAIFooter(level);

  // Replace any existing <footer ... </footer> (or .master-footer, .site-footer)
  if (html.includes('<footer')) {
    html = html.replace(/<footer[\s\S]*?<\/footer>/i, footerHtml);
  } else {
    // Insert before </body>
    html = html.replace(/<\/body>/i, `${footerHtml}\n</body>`);
  }

  // Remove duplicate script tags of master-global-nav.js if multiple
  const navScriptTag = `<script src="${level === 0 ? '' : (level === 1 ? '../' : '../../')}assets/js/master-global-nav.js" defer></script>`;
  let parts = html.split(navScriptTag);
  if (parts.length > 2) {
    html = parts.slice(0, -1).join('') + navScriptTag + parts[parts.length - 1];
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

// 1. Root
updateFooter(path.join(rootDir, 'index.html'), 0);
console.log('Updated root index.html footer');

// 2. PySpark
const pysparkDir = path.join(rootDir, 'pyspark');
fs.readdirSync(pysparkDir).filter(f => f.endsWith('.html')).forEach(f => {
  updateFooter(path.join(pysparkDir, f), 1);
  console.log(`Updated pyspark/${f} footer`);
});

// 3. Data Engineering
const deDir = path.join(rootDir, 'data-engineering');
fs.readdirSync(deDir).filter(f => f.endsWith('.html')).forEach(f => {
  updateFooter(path.join(deDir, f), 1);
  console.log(`Updated data-engineering/${f} footer`);
});

// 4. Automation AI
const aiDir = path.join(rootDir, 'automation-ml-ai-agentic');
fs.readdirSync(aiDir).filter(f => f.endsWith('.html') && !f.includes('-old')).forEach(f => {
  updateFooter(path.join(aiDir, f), 1);
  console.log(`Updated automation-ml-ai-agentic/${f} footer`);
});

// 5. Governance Purview Sandbox
const govDir = path.join(rootDir, 'data-governence', 'purview-sandbox');
fs.readdirSync(govDir).filter(f => f.endsWith('.html')).forEach(f => {
  updateFooter(path.join(govDir, f), 2);
  console.log(`Updated purview-sandbox/${f} footer`);
});
