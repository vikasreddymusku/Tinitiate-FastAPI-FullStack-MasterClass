const fs = require('fs');
const path = require('path');
const { ROOT_DIR, buildMegaDropdownHtml } = require('./mega_menu_helpers');

function findDropdownBounds(content) {
  const start = content.indexOf('<div class="master-dropdown" id="subjectsDropdown">');
  if (start === -1) return null;
  let depth = 0;
  let idx = start;
  while (idx < content.length) {
    if (content.startsWith('<div', idx) && /[\s>]/.test(content[idx + 4] || '')) {
      depth++;
      idx += 4;
    } else if (content.startsWith('</div>', idx)) {
      depth--;
      idx += 6;
      if (depth === 0) {
        return { start, end: idx };
      }
    } else {
      idx++;
    }
  }
  return null;
}

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (file === 'scratch' || file === 'node_modules' || file === '.git' || file === '.gemini' || file.startsWith('edge_profile')) return;
    if (file.endsWith('-old.html')) return;
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = getHtmlFiles(ROOT_DIR);
console.log(`Discovered ${htmlFiles.length} HTML files across project.`);

let updatedCount = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('id="subjectsDropdown"')) return;

  const relFromRoot = path.relative(ROOT_DIR, filePath);
  const segments = relFromRoot.split(path.sep);
  const depth = segments.length - 1;
  const relPrefix = depth === 0 ? '' : depth === 1 ? '../' : depth === 2 ? '../../' : '../../../';

  const newMegaDropdown = buildMegaDropdownHtml(relPrefix);

  const bounds = findDropdownBounds(content);
  if (bounds) {
    content = content.slice(0, bounds.start) + newMegaDropdown + content.slice(bounds.end);

    // Verify master-global-layout.css link
    const cssPath = `${relPrefix}assets/css/master-global-layout.css`;
    if (!content.includes('master-global-layout.css')) {
      content = content.replace('</head>', `  <link rel="stylesheet" href="${cssPath}">\n</head>`);
    }

    // Verify master-global-nav.js link
    const jsPath = `${relPrefix}assets/js/master-global-nav.js`;
    if (!content.includes('master-global-nav.js')) {
      content = content.replace('</body>', `  <script src="${jsPath}"></script>\n</body>`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Cleanly Synced Mega Menu: ${relFromRoot} (depth ${depth})`);
  } else {
    console.warn(`Could not find bounds in: ${relFromRoot}`);
  }
});

console.log(`\nSuccessfully updated 5-Domain Mega Menu cleanly across ${updatedCount} HTML files!`);
