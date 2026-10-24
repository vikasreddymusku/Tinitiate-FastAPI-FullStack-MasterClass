const fs = require('fs');
const path = require('path');

const purviewDir = path.join(__dirname, '..', 'data-governence', 'purview-sandbox');
const files = ['index.html', 'lineage.html', 'policy-steward-matrix.html'];

function buildTopNav() {
  return `  <!-- ========================================================================= -->
  <!-- TOP MENU BAR: Unified Master Header Across All Subjects                   -->
  <!-- ========================================================================= -->
  <header class="master-top-nav" style="position:relative;width:100%;margin-bottom:20px;">
    <div class="master-top-nav-inner" style="max-width:1440px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:64px;">
      <a href="../../index.html" class="master-brand-wrap" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
        <img src="../../tinitiate_header-banner.png" alt="Tinitiate Logo" class="master-brand-logo" style="height:32px;">
        <span class="master-brand-title" style="font-weight:800;font-size:1.02rem;color:#0f172a;">MasterClass Academy</span>
      </a>

      <!-- Primary Navigation Links -->
      <nav class="master-menu-links" style="display:flex;align-items:center;gap:8px;">
        <a href="../../index.html" class="master-nav-btn" title="Main Academy Portal" style="text-decoration:none;font-weight:600;padding:6px 12px;border-radius:6px;color:#475569;display:inline-flex;align-items:center;gap:6px;">
          <span>Home</span>
        </a>

        <!-- Current Subject Home -->
        <a href="index.html" class="master-nav-btn subject-home-btn" title="Data Governance Home" style="text-decoration:none;font-weight:700;padding:6px 12px;border-radius:6px;background:#ecfdf5;border:1px solid #a7f3d0;color:#059669;display:inline-flex;align-items:center;gap:6px;">
          <span>Data Governance Home</span>
        </a>

        <!-- Subjects DropDown -->
        <div class="master-dropdown" id="subjectsDropdown" style="position:relative;display:inline-block;">
          <button type="button" class="master-dropdown-toggle" onclick="toggleSubjectsDropdown(event)" aria-haspopup="true" aria-expanded="false" title="Explore All Subjects" style="cursor:pointer;padding:6px 12px;border-radius:6px;border:1px solid #cbd5e1;background:#ffffff;color:#334155;font-weight:600;">
            <span>Subjects ▾</span>
          </button>
          <div class="master-dropdown-menu" style="display:none;position:absolute;top:100%;left:0;min-width:260px;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:8px;box-shadow:0 10px 25px rgba(0,0,0,0.1);z-index:1000;flex-direction:column;gap:6px;">
            <a href="../../automation-ml-ai-agentic/index.html" style="padding:6px 10px;text-decoration:none;color:#1e293b;font-size:0.85rem;display:block;border-radius:4px;">&gt; AI Home</a>
            <a href="../../data-engineering/index.html" style="padding:6px 10px;text-decoration:none;color:#1e293b;font-size:0.85rem;display:block;border-radius:4px;">&gt; Data Engineering Home</a>
            <a href="index.html" style="padding:6px 10px;text-decoration:none;color:#059669;font-weight:bold;font-size:0.85rem;display:block;border-radius:4px;background:#f0fdf4;">&gt; Data Governance Home</a>
            <a href="../../pyspark/index.html" style="padding:6px 10px;text-decoration:none;color:#1e293b;font-size:0.85rem;display:block;border-radius:4px;">&gt; PySpark Home</a>
          </div>
        </div>
      </nav>

      <!-- Right Actions: Instructor + LinkedIn + GitHub -->
      <div class="master-nav-actions" style="display:flex;align-items:center;gap:12px;">
        <div style="font-size:0.82rem;display:flex;align-items:center;gap:6px;background:#f8fafc;padding:4px 10px;border-radius:999px;border:1px solid #e2e8f0;">
          <span style="color:#64748b;">Instructor:</span>
          <strong style="color:#0f172a;">Venkata Bhattaram</strong>
          <a href="https://www.linkedin.com/in/venkata-bhattaram/" target="_blank" rel="noopener noreferrer" style="color:#0a66c2;display:inline-flex;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>
          </a>
          <a href="https://github.com/venkata-bcs" target="_blank" rel="noopener noreferrer" style="color:#1e293b;display:inline-flex;">
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
  <footer class="master-footer" style="width:100%;border-top:1px solid #e2e8f0;background:#ffffff;padding:24px 16px;margin-top:40px;">
    <div style="max-width:1440px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <img src="../../tinitiate_header-banner.png" alt="Tinitiate" style="height:24px;">
        <span style="font-size:0.8rem;color:#64748b;">&copy; 2026 Tinitiate AI IT Training &bull; Designed &amp; Instructed by <strong>Venkata Bhattaram</strong></span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;font-size:0.8rem;">
        <a href="../../index.html" style="color:#0284c7;text-decoration:none;">🏠 Academy Home</a> &bull;
        <a href="../../automation-ml-ai-agentic/index.html" style="color:#0284c7;text-decoration:none;">🤖 AI</a> &bull;
        <a href="../../data-engineering/index.html" style="color:#0284c7;text-decoration:none;">🗄️ Data Engineering</a> &bull;
        <a href="index.html" style="color:#059669;font-weight:bold;text-decoration:none;">🛡️ Governance</a> &bull;
        <a href="../../pyspark/index.html" style="color:#0284c7;text-decoration:none;">⚡ PySpark</a>
      </div>
    </div>
  </footer>
  <script src="../../assets/js/master-global-nav.js" defer></script>`;
}

files.forEach(file => {
  const filePath = path.join(purviewDir, file);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  if (!html.includes('master-top-nav')) {
    html = html.replace('<body', '<body style="display:flex;flex-direction:column;min-height:100vh;padding:0;margin:0;"');
    html = html.replace(/(<body[^>]*>)/i, `$1\n${buildTopNav()}\n<div style="flex:1;width:100%;display:flex;justify-content:center;padding:20px;">`);
    html = html.replace('</body>', `</div>\n${buildFooter()}\n</body>`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated purview-sandbox/${file}`);
  }
});
