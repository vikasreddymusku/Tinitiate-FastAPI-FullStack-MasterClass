const fs = require('fs');

// Read the master top navigation and mega-menu from index.html to ensure 100% fidelity
const indexHtml = fs.readFileSync('automation-ml-ai-agentic/index.html', 'utf8');

// Extract the header from index.html
const headerMatch = indexHtml.match(/<header class="master-top-nav">[\s\S]*?<\/header>/i);
if (!headerMatch) {
  console.error('Could not find master-top-nav header in index.html');
  process.exit(1);
}
let masterHeader = headerMatch[0];

// In the masterHeader, ensure demo.html has active styling if needed, and links are correct relative to automation-ml-ai-agentic
masterHeader = masterHeader.replace(/class="master-nav-btn subject-home-btn" title="AI Systems Home"/g, 'class="master-nav-btn" title="AI Systems Home"');
masterHeader = masterHeader.replace(/<a href="demo\.html" class="master-nav-btn" title="Interactive Demo">/g, '<a href="demo.html" class="master-nav-btn subject-home-btn" title="Interactive Demo">');

// Extract footer from index.html
const footerMatch = indexHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/i) || 
                    indexHtml.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
let siteFooter = footerMatch ? footerMatch[0] : '';

console.log('Found masterHeader length:', masterHeader.length);
console.log('Found siteFooter length:', siteFooter.length);
