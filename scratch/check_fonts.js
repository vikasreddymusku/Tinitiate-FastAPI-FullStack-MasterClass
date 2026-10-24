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
const cssFiles = findFiles('.', '.css');

console.log('HTML files count:', htmlFiles.length);
console.log('CSS files:', cssFiles);

let googleFonts = [];
for (const f of [...htmlFiles, ...cssFiles]) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('fonts.googleapis.com')) {
    googleFonts.push(f);
  }
}
console.log('Files with fonts.googleapis.com:', googleFonts);
