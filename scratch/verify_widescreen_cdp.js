const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\player1\\.gemini\\antigravity-ide\\brain\\65af9f85-1f3f-4767-87b5-f7628eda7a2a';

async function main() {
  // Test at 1920x1080 widescreen!
  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1920,1080',
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

  console.log('Connected to page at 1920x1080!');

  // Snap 1 at 1920x1080
  await evaluate('scrollToSnap(1)');
  await new Promise(r => setTimeout(r, 700));
  await captureScreenshot('widescreen_snap_1.png');

  // Snap 2 at 1920x1080
  await evaluate('scrollToSnap(2)');
  await evaluate('showSlide(1)');
  await new Promise(r => setTimeout(r, 700));
  await captureScreenshot('widescreen_snap_2.png');

  // Snap 3 at 1920x1080
  await evaluate('scrollToSnap(3)');
  await new Promise(r => setTimeout(r, 700));
  await captureScreenshot('widescreen_snap_3.png');

  ws.close();
  edge.kill();
  console.log('Finished capturing widescreen snapshots!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
