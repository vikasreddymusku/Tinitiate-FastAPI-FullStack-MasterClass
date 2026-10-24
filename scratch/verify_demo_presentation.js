const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\player1\\.gemini\\antigravity-ide\\brain\\65af9f85-1f3f-4767-87b5-f7628eda7a2a';

async function main() {
  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9223',
    '--window-size=1920,1080',
    'http://localhost:3344/automation-ml-ai-agentic/demo.html'
  ]);

  await new Promise(r => setTimeout(r, 2200));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9223/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = targets.find(t => t.type === 'page' && t.url.includes('demo.html'));
  if (!page) {
    console.error('Page target not found');
    edge.kill();
    return;
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise(resolve => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res?.result?.value;
  }

  async function captureScreenshot(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(path.join(outDir, filename), buffer);
    console.log(`Saved screenshot: ${filename}`);
  }

  console.log('Connected! Verifying presentation screens...');

  // 1. Snap 1 Default (Epoch 1)
  await evaluate('scrollToSnap(1)');
  await new Promise(r => setTimeout(r, 600));
  await captureScreenshot('verified_snap1_presentation.png');

  // 2. Snap 1 Epoch 4 (Agentic AI)
  await evaluate('selectEpochStage(4)');
  await new Promise(r => setTimeout(r, 600));
  await captureScreenshot('verified_snap1_epoch4_agentic.png');

  // 3. Snap 1 Lightbox Modal
  await evaluate('openImageLightbox()');
  await new Promise(r => setTimeout(r, 600));
  await captureScreenshot('verified_snap1_lightbox.png');
  await evaluate('closeImageLightbox()');
  await new Promise(r => setTimeout(r, 400));

  // 4. Snap 2 - Slides 1, 2, 3, 4
  await evaluate('scrollToSnap(2)');
  await evaluate('showSlide(1)');
  await new Promise(r => setTimeout(r, 600));
  await captureScreenshot('verified_snap2_slide1_auto.png');

  await evaluate('showSlide(2)');
  await new Promise(r => setTimeout(r, 600));
  await captureScreenshot('verified_snap2_slide2_ml.png');

  await evaluate('showSlide(3)');
  await new Promise(r => setTimeout(r, 600));
  await captureScreenshot('verified_snap2_slide3_genai.png');

  await evaluate('showSlide(4)');
  await new Promise(r => setTimeout(r, 600));
  await captureScreenshot('verified_snap2_slide4_syllabus.png');

  // 5. Snap 3 - Remotion Video
  await evaluate('scrollToSnap(3)');
  await new Promise(r => setTimeout(r, 600));
  await captureScreenshot('verified_snap3_remotion.png');

  ws.close();
  edge.kill();
  console.log('Done! All screenshots captured.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
