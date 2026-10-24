const fs = require('fs');
const path = require('path');

function findFiles(dir, ext) {
  let res = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name === 'node_modules' || item.name === '.git' || item.name === 'scratch') continue;
    const p = path.join(dir, item.name);
    if (item.isDirectory()) {
      res = res.concat(findFiles(p, ext));
    } else if (item.name.endsWith(ext)) {
      res.push(p);
    }
  }
  return res;
}

const htmlFiles = findFiles('.', '.html');
let updatedCount = 0;

for (const f of htmlFiles) {
  let c = fs.readFileSync(f, 'utf8');
  let original = c;

  // Remove Google Fonts links
  c = c.replace(/<link[^>]*href=["']https:\/\/fonts\.googleapis\.com[^"']*["'][^>]*>\s*/gi, '');
  c = c.replace(/<link[^>]*rel=["']preconnect["'][^>]*fonts\.g[^>]*>\s*/gi, '');

  // Replace JetBrains Mono / Plus Jakarta Sans with CSS vars
  c = c.replace(/font-family\s*:\s*['"]?(?:Plus Jakarta Sans|Inter|Space Grotesk)['"]?[^;\"']*/gi, 'font-family: var(--font-sans)');
  c = c.replace(/font-family\s*:\s*['"]?JetBrains Mono['"]?[^;\"']*/gi, 'font-family: var(--font-mono)');

  if (c !== original) {
    fs.writeFileSync(f, c, 'utf8');
    updatedCount++;
    console.log('Cleaned fonts in: ' + f);
  }
}

console.log(`Total files cleaned: ${updatedCount}`);
