const fs = require('fs');

let html = fs.readFileSync('automation-ml-ai-agentic/demo.html', 'utf8');

// Update CSS for compact, crisp presentation in Snap 1
const cssToReplace = `    .evolution-image-frame img {
      width: 100%;
      height: auto;
      border-radius: 10px;
      display: block;
      transition: transform 0.3s ease;
    }`;

const cssReplacement = `    .evolution-image-frame img {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      object-position: center;
      border-radius: 10px;
      display: block;
      transition: transform 0.3s ease;
    }`;

html = html.replace(cssToReplace, cssReplacement);

// Make motion graphic stages slightly more compact to fit perfectly
html = html.replace('.motion-flow-container {', `.motion-flow-container {
      gap: 6px;`);
html = html.replace('.what-is-ai-card {', `.what-is-ai-card {
      padding: 14px 20px;
      margin-bottom: 16px;`);
html = html.replace('.evolution-dual-grid {', `.evolution-dual-grid {
      margin-bottom: 16px;`);

fs.writeFileSync('automation-ml-ai-agentic/demo.html', html, 'utf8');
console.log('Polished Snap 1 sizing!');
