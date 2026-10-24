const fs = require('fs');
const path = require('path');

const dir = 'data-engineering';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const demoLiNonActive = `        <li>
          <a href="demo.html">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="play-circle" style="width:16px;height:16px;color:#10b981;"></i>
              <span>Interactive Demo Lab</span>
            </span>
            <span class="badge-status">Demo</span>
          </a>
        </li>`;

const demoLiActive = `        <li>
          <a href="demo.html" class="current">
            <span style="display:flex;align-items:center;gap:8px;">
              <i data-lucide="play-circle" style="width:16px;height:16px;color:#10b981;"></i>
              <span>Interactive Demo Lab</span>
            </span>
            <span class="badge-status">Active</span>
          </a>
        </li>`;

for (const f of files) {
  if (f === 'demo.html') continue;
  const filePath = path.join(dir, f);
  let c = fs.readFileSync(filePath, 'utf8');

  const menuMatch = c.match(/<ul[^>]*class=["']site-menu["'][^>]*>([\s\S]*?)<\/ul>/i);
  if (menuMatch) {
    if (!menuMatch[1].includes('demo.html')) {
      const indexLiRegex = /(<li>\s*<a\s+href="index\.html"[^>]*>[\s\S]*?<\/a>\s*<\/li>)/i;
      const match = c.match(indexLiRegex);
      if (match) {
        c = c.replace(match[0], match[0] + '\n' + demoLiNonActive);
        fs.writeFileSync(filePath, c, 'utf8');
        console.log(`Updated ${f}: inserted demo.html in site-menu right after index.html`);
      } else {
        console.log(`Could not find index.html li in ${f}`);
      }
    } else {
      console.log(`${f} site-menu already has demo.html`);
    }
  }
}
