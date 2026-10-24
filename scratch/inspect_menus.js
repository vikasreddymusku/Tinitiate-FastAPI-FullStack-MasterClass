const fs = require('fs');

const testFiles = [
  'data-engineering/index.html',
  'pyspark/index.html',
  'automation-ml-ai-agentic/index.html',
  'data-governence/purview-sandbox/index.html',
  'ai/aws-bedrock/index.html',
  'foundational/apis/index.html',
  'aws-dataengineering/index.html'
];

for (const f of testFiles) {
  if (!fs.existsSync(f)) continue;
  const c = fs.readFileSync(f, 'utf8');
  console.log('=== FILE: ' + f + ' ===');
  // find sidebar or menu
  const menuMatch = c.match(/<ul[^>]*class=\"[^\"]*(?:site-menu|nav-menu|sidebar-nav|course-menu|modules-list)[^\"]*\"[\s\S]*?<\/ul>/i) ||
                    c.match(/<aside[^>]*class=\"[^\"]*site-nav-panel[^\"]*\"[\s\S]*?<\/aside>/i) ||
                    c.match(/<nav[^>]*class=\"[^\"]*(?:sidebar|subnav)[^\"]*\"[\s\S]*?<\/nav>/i);
  if (menuMatch) {
    const listItems = menuMatch[0].match(/<li[\s\S]*?<\/li>/gi);
    console.log('Found menu with', listItems ? listItems.length : 0, 'items');
    if (listItems) {
      console.log('First 3 items:\n' + listItems.slice(0, 3).join('\n---\n'));
    }
  } else {
    console.log('No standard menu regex match, looking for <ul ...');
    const uls = c.match(/<ul[\s\S]*?<\/ul>/gi);
    if (uls) {
      console.log('Found', uls.length, 'ul elements. First ul preview:\n' + uls[0].slice(0, 300));
    }
  }
}
