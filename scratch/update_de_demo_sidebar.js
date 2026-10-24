const fs = require('fs');

const f = 'data-engineering/demo.html';
let c = fs.readFileSync(f, 'utf8');

const siteNavPanel = `    <!-- LEFT: Inpage Navigation -->
    <aside class="site-nav-panel" aria-label="Course Navigation" style="background:#ffffff;border-right:1px solid #e5e7eb;padding:24px 18px;width:260px;flex-shrink:0;">
      <div class="nav-title" style="font-size:0.75rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;margin-bottom:12px;">Course Modules</div>
      <ul class="site-menu" style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;">
        <li>
          <a href="index.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="home" style="width:16px;height:16px;color:#7c3aed;"></i>
              <span>Home</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="demo.html" class="current" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:700;background:#f5f3ff;color:#7c3aed;border:1px solid #ddd6fe;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="play-circle" style="width:16px;height:16px;color:#10b981;"></i>
              <span>Interactive Demo Lab</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#7c3aed;color:#ffffff;">Active</span>
          </a>
        </li>
        <li>
          <a href="db-explainer.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="database" style="width:16px;height:16px;color:#2563eb;"></i>
              <span>DB Explainer</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="file-formats.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="file-spreadsheet" style="width:16px;height:16px;color:#0284c7;"></i>
              <span>File Formats</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="data-lake.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="cloud" style="width:16px;height:16px;color:#d97706;"></i>
              <span>Data Lake</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="batch-loading.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="repeat" style="width:16px;height:16px;color:#16a34a;"></i>
              <span>Batch Loading</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="real-time.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="zap" style="width:16px;height:16px;color:#dc2626;"></i>
              <span>Real Time</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="data-warehouse.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="layers" style="width:16px;height:16px;color:#475569;"></i>
              <span>Data Warehouse</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="data-lakehouse.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="git-merge" style="width:16px;height:16px;color:#059669;"></i>
              <span>Data Lakehouse</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="data-mesh.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#7c3aed;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="network" style="width:16px;height:16px;color:#7c3aed;"></i>
              <span>Data Mesh</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
        <li>
          <a href="data-fabric.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:0.86rem;font-weight:600;color:#374151;">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="cpu" style="width:16px;height:16px;color:#b91c1c;"></i>
              <span>Data Fabric</span>
            </span>
            <span class="badge-status" style="font-size:0.7rem;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#6b7280;">Module</span>
          </a>
        </li>
      </ul>
    </aside>`;

// Replace <aside class="sidebar-topics"> ... </aside> in demo.html
const asideRegex = /<aside class="sidebar-topics">[\s\S]*?<\/aside>/i;
if (c.match(asideRegex)) {
  c = c.replace(asideRegex, siteNavPanel);
  fs.writeFileSync(f, c, 'utf8');
  console.log('Updated data-engineering/demo.html sidebar!');
} else {
  console.log('sidebar-topics not found in demo.html');
}
