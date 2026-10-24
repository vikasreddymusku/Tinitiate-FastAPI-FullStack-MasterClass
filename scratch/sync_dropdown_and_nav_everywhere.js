const fs = require('fs');
const path = require('path');
const { SUBJECTS, buildDropdownHtml, ROOT_DIR } = require('./template_helpers');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (file === 'scratch' || file === 'node_modules' || file === '.git' || file === '.gemini') return;
    if (file.endsWith('-old.html')) return; // skip backups
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = getHtmlFiles(ROOT_DIR);
console.log('Processing', htmlFiles.length, 'HTML files...');

let updatedCount = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('id="subjectsDropdown"')) return;

  const relFromRoot = path.relative(ROOT_DIR, filePath);
  const segments = relFromRoot.split(path.sep);
  const depth = segments.length - 1; // 0 for root, 1 for pyspark/index.html, 2 for purview-sandbox/index.html
  const relPrefix = depth === 0 ? '' : depth === 1 ? '../' : '../../';

  // Generate the new 8-subject dropdown block
  const newDropdown = buildDropdownHtml(relPrefix);

  // Match the dropdown container
  const ddRegex = /<div class="master-dropdown" id="subjectsDropdown">[\s\S]*?<\/div>\s*<\/div>/;
  if (ddRegex.test(content)) {
    content = content.replace(ddRegex, newDropdown);

    // If it is in a subject folder (depth = 1) and not demo.html itself, ensure a Demo button exists in master-menu-links
    if (depth === 1 && !filePath.endsWith('demo.html')) {
      if (!content.includes('href="demo.html"') && !content.includes("href='demo.html'")) {
        // Insert after the subject-home-btn
        const subjectHomeRegex = /(<a href="index\.html" class="master-nav-btn[^"]*"[^>]*>[\s\S]*?<\/a>)/;
        if (subjectHomeRegex.test(content)) {
          const demoBtnHtml = `$1\n        <a href="demo.html" class="master-nav-btn" title="Interactive Demo">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Demo</span>
        </a>`;
          content = content.replace(subjectHomeRegex, demoBtnHtml);
        }
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${relFromRoot} (depth ${depth})`);
  }
});

console.log(`Successfully synced dropdown and navigation in ${updatedCount} HTML files!`);
