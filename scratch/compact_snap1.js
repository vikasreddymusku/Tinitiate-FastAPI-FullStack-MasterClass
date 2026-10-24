const fs = require('fs');

let html = fs.readFileSync('automation-ml-ai-agentic/demo.html', 'utf8');

// Replace padding of .snap-card-section
html = html.replace(
  'padding: 40px 48px;',
  'padding: 24px 32px;'
);

// Compact .snap-title
html = html.replace(
  '.snap-title {\n      font-size: 2.1rem;',
  '.snap-title {\n      font-size: 1.75rem;\n      margin: 0 0 8px 0;'
);

// Make motion stages compact
html = html.replace(
  '.motion-stage-row {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      background: rgba(30, 41, 59, 0.5);\n      border: 1px solid rgba(255, 255, 255, 0.06);\n      border-radius: 10px;\n      padding: 8px 12px;',
  '.motion-stage-row {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      background: rgba(30, 41, 59, 0.5);\n      border: 1px solid rgba(255, 255, 255, 0.06);\n      border-radius: 8px;\n      padding: 5px 10px;'
);

html = html.replace(
  '.motion-stage-icon {\n      width: 32px;\n      height: 32px;',
  '.motion-stage-icon {\n      width: 26px;\n      height: 26px;'
);

// Adjust image frame
html = html.replace(
  'max-height: 200px;',
  'max-height: 165px;'
);

fs.writeFileSync('automation-ml-ai-agentic/demo.html', html, 'utf8');
console.log('Successfully compacted Snap 1!');
