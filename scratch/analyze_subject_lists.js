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
  const htmlFiles = fs.readdirSync(d).filter(f => f.endsWith('.html'));
  console.log(`\n=== Subject: ${d} (${htmlFiles.length} files: ${htmlFiles.join(', ')}) ===`);
  const indexPath = path.join(d, 'index.html');
  const content = fs.readFileSync(indexPath, 'utf8');
  
  // check for lists containing index.html
  const ulMatches = [...content.matchAll(/<ul[^>]*>([\s\S]*?)<\/ul>/gi)];
  let foundInUl = false;
  ulMatches.forEach((ul, i) => {
    if (ul[1].includes('index.html')) {
      foundInUl = true;
      console.log(`  Found index.html in <ul> #${i}:`);
      const lis = [...ul[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
      lis.slice(0, 4).forEach((li, liIdx) => {
        console.log(`    li #${liIdx}: ${li[0].replace(/\s+/g, ' ').substring(0, 100)}...`);
      });
    }
  });

  // check for div menus containing index.html
  const divMatches = [...content.matchAll(/<(?:div|nav)[^>]*class=["'][^"']*(?:sidebar-menu-list|site-menu|sidebar-topics)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|nav)>/gi)];
  divMatches.forEach((dm, i) => {
    if (dm[1].includes('index.html')) {
      console.log(`  Found index.html in menu container #${i}:`);
      const links = [...dm[1].matchAll(/<a[^>]*href=["'][^"']*["'][^>]*>[\s\S]*?<\/a>/gi)];
      links.slice(0, 4).forEach((l, lIdx) => {
        console.log(`    link #${lIdx}: ${l[0].replace(/\s+/g, ' ').substring(0, 100)}...`);
      });
    }
  });
}
