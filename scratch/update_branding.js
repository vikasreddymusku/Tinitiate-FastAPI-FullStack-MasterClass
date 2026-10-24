const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace eyebrow
html = html.replace(
  '<div class="poster-brand-eyebrow">EMULATION SOFTWARE TECHNOLOGIES • 2026 EDITION</div>',
  '<div class="poster-brand-eyebrow">TINITIATE AI • 2026 EDITION</div>'
);

// Replace contact strip contents
const oldStripBlock = `            <div style="display:flex;align-items:center;gap:8px;color:#38bdf8;">
              <i data-lucide="phone" style="width:16px;height:16px;"></i>
              <span>9462395967</span>
            </div>
            <div style="color:var(--text-muted);opacity:0.4;">|</div>
            <div style="display:flex;align-items:center;gap:8px;color:#34d399;">
              <i data-lucide="mail" style="width:16px;height:16px;"></i>
              <span>info@emulationsofttech.com</span>
            </div>
            <div style="color:var(--text-muted);opacity:0.4;">|</div>
            <div style="display:flex;align-items:center;gap:8px;color:#a78bfa;">
              <i data-lucide="globe" style="width:16px;height:16px;"></i>
              <span>training@tinitiate.com • tinitiate.com</span>
            </div>`;

const newStripBlock = `            <div style="display:flex;align-items:center;gap:8px;color:#38bdf8;">
              <i data-lucide="mail" style="width:16px;height:16px;"></i>
              <a href="mailto:contact@tinitiateai.com" style="color:inherit;text-decoration:none;">contact@tinitiateai.com</a>
            </div>
            <div style="color:var(--text-muted);opacity:0.4;">|</div>
            <div style="display:flex;align-items:center;gap:8px;color:#a78bfa;">
              <i data-lucide="globe" style="width:16px;height:16px;"></i>
              <a href="https://tinitiateai.com" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">tinitiateai.com</a>
            </div>`;

const countBefore = (html.match(/9462395967/g) || []).length;
console.log('Phone occurrences before:', countBefore);

html = html.split(oldStripBlock).join(newStripBlock);

const countAfter = (html.match(/9462395967/g) || []).length;
console.log('Phone occurrences after:', countAfter);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done updating branding in index.html');
