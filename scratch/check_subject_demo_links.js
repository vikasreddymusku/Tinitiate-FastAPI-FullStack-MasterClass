const fs = require('fs');
const path = require('path');

function findSubjectDirs(dir) {
  let res = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const hasIndex = entries.some(e => e.isFile() && e.name === 'index.html');
  if (hasIndex && dir !== '.') {
    res.push(dir);
  }
  for (const e of entries) {
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules' && e.name !== 'scratch' && e.name !== 'assets') {
      res = res.concat(findSubjectDirs(path.join(dir, e.name)));
    }
  }
  return res;
}

const dirs = findSubjectDirs('.');
for (const d of dirs) {
  const indexPath = path.join(d, 'index.html');
  const c = fs.readFileSync(indexPath, 'utf8');
  const demoPath = path.join(d, 'demo.html');
  const hasDemoFile = fs.existsSync(demoPath);
  
  // Check if demo is linked in c
  const demoLinked = c.includes('demo.html');
  console.log(`${d.padEnd(42)} | demo.html file: ${hasDemoFile} | demo linked in index: ${demoLinked}`);
}
