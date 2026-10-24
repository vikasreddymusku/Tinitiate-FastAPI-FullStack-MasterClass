const fs = require('fs');

let html = fs.readFileSync('automation-ml-ai-agentic/demo.html', 'utf8');

// Update .snap-inner-wrap to natural flow where main cards fill remaining height with flex: 1
html = html.replace(
  /\.snap-inner-wrap \{[\s\S]*?\}/,
  `.snap-inner-wrap {
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      box-sizing: border-box;
      gap: 14px;
    }`
);

// Ensure Remotion player card expands cleanly
html = html.replace(
  '.remotion-screen {\n      flex: 1;\n      min-height: 400px;',
  `.remotion-screen {
      flex: 1;
      min-height: 440px;`
);

fs.writeFileSync('automation-ml-ai-agentic/demo.html', html, 'utf8');
console.log('Polished natural flex filling for all snaps!');
