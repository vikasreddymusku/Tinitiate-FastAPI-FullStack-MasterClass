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

const subjectDirs = findSubjectDirs('.');

for (const d of subjectDirs) {
  const indexPath = path.join(d, 'index.html');
  const c = fs.readFileSync(indexPath, 'utf8');
  const hasSidebar = c.includes('sidebar-topics') || c.includes('site-nav-panel') || c.includes('sidebar-topics-list') || c.includes('site-menu');
  console.log(d.padEnd(40) + ' -> hasSidebar: ' + hasSidebar);
}
