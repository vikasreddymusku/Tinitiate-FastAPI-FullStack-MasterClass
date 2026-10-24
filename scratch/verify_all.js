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
let issues = [];

console.log('=== VERIFYING SUBJECTS (Total: ' + dirs.length + ') ===');
for (const d of dirs) {
  const indexPath = path.join(d, 'index.html');
  const demoPath = path.join(d, 'demo.html');
  const hasIndex = fs.existsSync(indexPath);
  const hasDemo = fs.existsSync(demoPath);

  if (!hasIndex) {
    issues.push(`Missing index.html in ${d}`);
  }
  if (!hasDemo) {
    issues.push(`Missing demo.html in ${d}`);
  }

  // Check sidebar if present
  if (hasIndex) {
    const content = fs.readFileSync(indexPath, 'utf8');
    // Check if there is a site-menu or sidebar-topics-list or sidebar-menu-list
    const siteMenu = content.match(/<ul[^>]*class=["'](?:site-menu|sidebar-topics-list)["'][^>]*>([\s\S]*?)<\/ul>/i);
    const divMenu = content.match(/<div[^>]*class=["']sidebar-menu-list["'][^>]*>([\s\S]*?)<\/div>/i);

    if (siteMenu) {
      const lis = [...siteMenu[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
      const firstIsIndex = lis[0] && lis[0][0].includes('index.html');
      const secondIsDemo = lis[1] && lis[1][0].includes('demo.html');
      if (!firstIsIndex || !secondIsDemo) {
        issues.push(`Sidebar list order issue in ${indexPath}: [0] is ${lis[0] ? 'index' : 'unknown'}, [1] is ${secondIsDemo ? 'demo' : 'NOT demo'}`);
      } else {
        console.log(`✓ ${d}: site-menu list order verified (index.html -> demo.html)`);
      }
    } else if (divMenu) {
      const links = [...divMenu[1].matchAll(/<a[^>]*href=["'][^"']*["'][^>]*>[\s\S]*?<\/a>/gi)];
      const firstIsIndex = links[0] && links[0][0].includes('index.html');
      const secondIsDemo = links[1] && links[1][0].includes('demo.html');
      if (!firstIsIndex || !secondIsDemo) {
        issues.push(`Sidebar div-menu order issue in ${indexPath}: [0] is ${links[0] ? 'index' : 'unknown'}, [1] is ${secondIsDemo ? 'demo' : 'NOT demo'}`);
      } else {
        console.log(`✓ ${d}: div-menu order verified (index.html -> demo.html)`);
      }
    } else {
      // Top nav has index -> demo
      const hasTopNavDemo = content.includes('href="demo.html"');
      if (!hasTopNavDemo) {
        issues.push(`demo.html not linked in ${indexPath}`);
      } else {
        console.log(`✓ ${d}: demo.html exists and linked in navigation`);
      }
    }
  }
}

console.log('\n=== VERIFYING GLOBAL FONTS ===');
const masterCss = fs.readFileSync('assets/css/master-global-layout.css', 'utf8');
const hasHelveticaRoot = masterCss.includes('--font-sans: "Helvetica Neue"');
const hasHelveticaBody = masterCss.includes('font-family: var(--font-sans) !important');
console.log('master-global-layout.css --font-sans:', hasHelveticaRoot ? '✓ YES' : '✗ NO');
console.log('master-global-layout.css html, body font-family:', hasHelveticaBody ? '✓ YES' : '✗ NO');

if (!hasHelveticaRoot || !hasHelveticaBody) {
  issues.push('master-global-layout.css font configuration missing');
}

console.log('\n=== VERIFICATION SUMMARY ===');
if (issues.length === 0) {
  console.log('ALL CHECKS PASSED PERFECTLY!');
} else {
  console.log('ISSUES DETECTED:', issues);
}
