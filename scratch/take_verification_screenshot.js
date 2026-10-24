const { execSync } = require('child_process');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\player1\\.gemini\\antigravity-ide\\brain\\65af9f85-1f3f-4767-87b5-f7628eda7a2a';

try {
  const deOut = path.join(outDir, 'de_sidebar_verified.png');
  execSync(`"${edgePath}" --headless --disable-gpu --window-size=1400,900 --screenshot="${deOut}" http://localhost:3344/data-engineering/index.html`);
  console.log('Captured de_sidebar_verified.png');

  const pyOut = path.join(outDir, 'pyspark_sidebar_verified.png');
  execSync(`"${edgePath}" --headless --disable-gpu --window-size=1400,900 --screenshot="${pyOut}" http://localhost:3344/pyspark/index.html`);
  console.log('Captured pyspark_sidebar_verified.png');
} catch (e) {
  console.error('Screenshot error:', e.message);
}
