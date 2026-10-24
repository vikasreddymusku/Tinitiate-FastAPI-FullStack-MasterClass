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
    '--remote-debugging-port=9222',
    '--window-size=1440,920',
    'http://localhost:3344/automation-ml-ai-agentic/demo.html'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
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

  console.log('Connected to page for Snap 1 & 2 verification!');

  // Snap 1
  await evaluate('scrollToSnap(1)');
  await new Promise(r => setTimeout(r, 700));
  await captureScreenshot('verified_snap_1_new.png');

  // Snap 2 - Slide 1 with Ticker
  await evaluate('scrollToSnap(2)');
  await evaluate('showSlide(1)');
  await new Promise(r => setTimeout(r, 700));
  await captureScreenshot('verified_snap_2_new.png');

  // Snap 2 - Slide 5 (Fundamental Technologies)
  await evaluate('showSlide(5)');
  await new Promise(r => setTimeout(r, 700));
  await captureScreenshot('verified_snap_2_slide5.png');

  ws.close();
  edge.kill();
  console.log('Finished capturing Snap 1 and Snap 2!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
