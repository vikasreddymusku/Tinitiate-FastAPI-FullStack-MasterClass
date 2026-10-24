const { execSync } = require('child_process');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\player1\\.gemini\\antigravity-ide\\brain\\65af9f85-1f3f-4767-87b5-f7628eda7a2a';
const outImg = path.join(outDir, 'ai_demo_snap_view.png');

execSync(`"${edgePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${outImg}" http://localhost:3344/automation-ml-ai-agentic/demo.html`);
console.log('Successfully captured', outImg);
