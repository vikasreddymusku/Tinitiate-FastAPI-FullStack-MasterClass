const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profileDir = path.join(__dirname, 'edge_profile_tab_screen');

if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

const edgeProcess = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  '--window-size=1440,1100',
  '--remote-debugging-port=9224',
  `--user-data-dir=${profileDir}`,
  'http://localhost:3344/index.html'
]);

setTimeout(async () => {
  try {
    const listRes = await fetchJson('http://127.0.0.1:9224/json');
    const target = listRes.find(p => p.url.includes('index.html')) || listRes[0];
    if (!target) {
      console.error('No page found');
      cleanup();
      return;
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);

    ws.onopen = async () => {
      let id = 1;
      const pending = new Map();

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && pending.has(msg.id)) {
          const resolve = pending.get(msg.id);
          pending.delete(msg.id);
          resolve(msg.result);
        }
      };

      function send(method, params = {}) {
        return new Promise((resolve) => {
          const reqId = id++;
          pending.set(reqId, resolve);
          ws.send(JSON.stringify({ id: reqId, method, params }));
        });
      }

      await send('Runtime.enable');
      await send('Page.enable');

      // Scroll to #flagship-roadmaps
      await send('Runtime.evaluate', {
        expression: `document.getElementById('flagship-roadmaps').scrollIntoView({ behavior: 'instant', block: 'start' })`
      });

      await sleep(500);

      // Screenshot 1: AI tab active
      let shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, '..', 'ai_tab_active.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved ai_tab_active.png');

      // Click DE tab
      await send('Runtime.evaluate', {
        expression: `document.getElementById('rtab-de').click(); document.getElementById('flagship-roadmaps').scrollIntoView({ behavior: 'instant', block: 'start' });`
      });
      await sleep(500);

      // Screenshot 2: DE tab active
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, '..', 'de_tab_active.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved de_tab_active.png');

      // Click Gov tab
      await send('Runtime.evaluate', {
        expression: `document.getElementById('rtab-gov').click(); document.getElementById('flagship-roadmaps').scrollIntoView({ behavior: 'instant', block: 'start' });`
      });
      await sleep(500);

      // Screenshot 3: Gov tab active
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, '..', 'gov_tab_active.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved gov_tab_active.png');

      cleanup();
    };

  } catch (err) {
    console.error('Error:', err);
    cleanup();
  }
}, 2500);

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function cleanup() {
  edgeProcess.kill();
  process.exit(0);
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}
