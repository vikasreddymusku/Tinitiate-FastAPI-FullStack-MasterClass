const fs = require('fs');
const path = require('path');

const dir = 'pyspark';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const demoLiNonActive = `        <li class="sidebar-topic-item">
          <a href="demo.html" class="sidebar-topic-link">
            <span class="sidebar-topic-badge" style="background:rgba(16,185,129,0.18);color:#10b981;border:1px solid rgba(16,185,129,0.3);">DEMO</span>
            <span>Interactive Demo Lab</span>
          </a>
        </li>`;

const demoLiActive = `        <li class="sidebar-topic-item">
          <a href="demo.html" class="sidebar-topic-link active">
            <span class="sidebar-topic-badge" style="background:#10b981;color:#ffffff;border:1px solid #10b981;">DEMO</span>
            <span>Interactive Demo Lab</span>
          </a>
        </li>`;

for (const f of files) {
  if (f === 'demo.html') continue;
  const filePath = path.join(dir, f);
  let c = fs.readFileSync(filePath, 'utf8');

  const menuMatch = c.match(/<ul[^>]*class=["']sidebar-topics-list["'][^>]*>([\s\S]*?)<\/ul>/i);
  if (menuMatch) {
    if (!menuMatch[1].includes('demo.html')) {
      const indexLiRegex = /(<li\s+class=["']sidebar-topic-item["']>\s*<a\s+href="index\.html"[^>]*>[\s\S]*?<\/a>\s*<\/li>)/i;
      const match = c.match(indexLiRegex);
      if (match) {
        c = c.replace(match[0], match[0] + '\n' + demoLiNonActive);
        fs.writeFileSync(filePath, c, 'utf8');
        console.log(`Updated ${f}: inserted demo.html in sidebar-topics-list right after index.html`);
      } else {
        console.log(`Could not find index.html li in ${f}`);
      }
    } else {
      console.log(`${f} already has demo.html in sidebar-topics-list`);
    }
  }
}
