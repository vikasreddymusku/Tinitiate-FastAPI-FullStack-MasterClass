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

const report = [];

for (const d of subjectDirs) {
  const files = fs.readdirSync(d).filter(f => f.endsWith('.html'));
  const hasDemo = files.includes('demo.html');
  const indexFile = path.join(d, 'index.html');
  const indexContent = fs.readFileSync(indexFile, 'utf8');

  // Check what kind of sidebar or navigation exists
  const hasSiteMenu = indexContent.includes('site-menu');
  const hasSidebarTopics = indexContent.includes('sidebar-topics');
  const hasSidebarTopicsList = indexContent.includes('sidebar-topics-list');
  const hasDemoInIndex = indexContent.includes('demo.html');

  report.push({
    dir: d,
    hasDemo,
    filesCount: files.length,
    hasSiteMenu,
    hasSidebarTopics,
    hasSidebarTopicsList,
    hasDemoInIndex
  });
}

console.log(JSON.stringify(report, null, 2));
