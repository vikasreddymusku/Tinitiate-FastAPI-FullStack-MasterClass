const fs = require('fs');

const files = [
  'data-governence/purview-sandbox/index.html',
  'data-governence/purview-sandbox/lineage.html',
  'data-governence/purview-sandbox/policy-steward-matrix.html'
];

for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('href="demo.html"')) {
    const target = '<span>Governance Home</span>\n        </a>';
    const addition = `\n        <a href="demo.html" class="master-nav-btn" title="Purview Interactive Demo Lab" style="border-color:rgba(16,185,129,0.5);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Interactive Demo</span>
        </a>`;
    if (c.includes(target)) {
      c = c.replace(target, target + addition);
      fs.writeFileSync(f, c, 'utf8');
      console.log('Updated ' + f);
    } else {
      console.log('Target not found in ' + f);
    }
  } else {
    console.log('Already has demo in ' + f);
  }
}
