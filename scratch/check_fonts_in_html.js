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
let fontCounts = {};
let filesWithNonHelvetica = [];

for (const h of htmlFiles) {
  const c = fs.readFileSync(h, 'utf8');
  const m = c.match(/font-family\s*:\s*([^;\"'}]+)/gi);
  if (m) {
    for (const font of m) {
      fontCounts[font.trim()] = (fontCounts[font.trim()] || 0) + 1;
      if (!font.includes('Helvetica') && !font.includes('monospace') && !font.includes('inherit')) {
        filesWithNonHelvetica.push({ file: h, font: font.trim() });
      }
    }
  }
}

console.log('Font counts:');
console.log(JSON.stringify(fontCounts, null, 2));

console.log('Files with non-helvetica inline/style font-family count:', filesWithNonHelvetica.length);
if (filesWithNonHelvetica.length > 0) {
  console.log('Sample files:', filesWithNonHelvetica.slice(0, 15));
}
