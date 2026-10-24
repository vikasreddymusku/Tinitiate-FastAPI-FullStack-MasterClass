const { execSync } = require('child_process');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\player1\\.gemini\\antigravity-ide\\brain\\65af9f85-1f3f-4767-87b5-f7628eda7a2a';

for (let i = 2; i <= 5; i++) {
  const outImg = path.join(outDir, `ai_demo_snap_${i}.png`);
  try {
    execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outImg}" "http://localhost:3344/automation-ml-ai-agentic/demo.html#snap-${i}"`);
    console.log(`Captured snap ${i} to ${outImg}`);
  } catch (e) {
    console.error(`Error capturing snap ${i}:`, e.message);
  }
}
