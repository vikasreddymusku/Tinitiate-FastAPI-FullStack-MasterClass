const fs = require('fs');
const path = require('path');

function getDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'node_modules' && d.name !== 'scratch')
    .map(d => path.join(dir, d.name));
}

// Find all directories that contain an index.html
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
console.log('Found ' + subjectDirs.length + ' subject directories:');
subjectDirs.forEach(d => {
  const files = fs.readdirSync(d).filter(f => f.endsWith('.html'));
  console.log(d + ' (' + files.length + ' html files):', files.slice(0, 8).join(', '));
});
