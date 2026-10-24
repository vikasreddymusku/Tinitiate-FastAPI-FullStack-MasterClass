const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profileDir = path.join(__dirname, 'edge_profile_mega_verify');

if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

const edgeProcess = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  '--window-size=1440,1050',
  '--remote-debugging-port=9226',
  `--user-data-dir=${profileDir}`,
  'http://localhost:3344/index.html'
]);

setTimeout(async () => {
  try {
    const listRes = await fetchJson('http://127.0.0.1:9226/json');
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
        if (msg.method === 'Runtime.consoleAPICalled') {
          console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value));
        }
        if (msg.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER EXCEPTION]', msg.params.exceptionDetails);
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

      // 1. Open the Subjects Mega Menu
      await send('Runtime.evaluate', {
        expression: `
          const dd = document.getElementById('subjectsDropdown');
          if (dd) {
            dd.classList.add('open');
            const menu = dd.querySelector('.master-dropdown-menu');
            if (menu) menu.style.display = 'flex';
          }
        `
      });
      await sleep(600);

      // Capture Mega Menu Opened Screenshot
      let shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, '..', 'mega_menu_opened_view.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved mega_menu_opened_view.png');

      // 2. Navigate to foundational/data-structures/index.html
      await send('Page.navigate', { url: 'http://localhost:3344/foundational/data-structures/index.html' });
      await sleep(1000);

      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, '..', 'data_structures_index_view.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved data_structures_index_view.png');

      // 3. Navigate to foundational/data-structures/demo.html and click execute
      await send('Page.navigate', { url: 'http://localhost:3344/foundational/data-structures/demo.html' });
      await sleep(1000);

      // Trigger simulation run
      await send('Runtime.evaluate', {
        expression: `runSimulation();`
      });
      await sleep(1500);

      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, '..', 'data_structures_demo_view.png'), Buffer.from(shot.data, 'base64'));
      console.log('Saved data_structures_demo_view.png');

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
