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
  const p = path.join(d, 'index.html');
  const c = fs.readFileSync(p, 'utf8');
  
  // Find all matches where index.html is linked
  const indexMatches = [...c.matchAll(/<a\s+[^>]*href=["'](?:index\.html|\.\/index\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  console.log('Dir:', d, '| index.html occurrences in links:', indexMatches.length);
  indexMatches.forEach((m, idx) => {
    // print surrounding 100 chars
    const start = Math.max(0, m.index - 50);
    const end = Math.min(c.length, m.index + m[0].length + 150);
    console.log(`  [Link ${idx}] parent context:`, c.substring(start, end).replace(/\s+/g, ' '));
  });
}
