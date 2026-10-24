const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profileDir = path.join(__dirname, 'edge_profile_tab_test');

if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

const edgeProcess = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  '--remote-debugging-port=9223',
  `--user-data-dir=${profileDir}`,
  'http://localhost:3344/index.html'
]);

setTimeout(async () => {
  try {
    const listRes = await fetchJson('http://127.0.0.1:9223/json');
    console.log('Pages:', listRes.length);
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
          console.log('[BROWSER EXCEPTION]', msg.params.exceptionDetails);
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
      await send('Console.enable');

      // Test tab switching
      const testResult = await send('Runtime.evaluate', {
        expression: `(function() {
          const res = {};
          
          // Check initial state
          res.initialAiActive = document.getElementById('rpanel-ai').classList.contains('active');
          res.initialDeActive = document.getElementById('rpanel-de').classList.contains('active');
          res.initialGovActive = document.getElementById('rpanel-gov').classList.contains('active');
          
          // Click DE tab
          const btnDe = document.getElementById('rtab-de');
          if (btnDe) {
            btnDe.click();
            res.afterDeClick_AiActive = document.getElementById('rpanel-ai').classList.contains('active');
            res.afterDeClick_DeActive = document.getElementById('rpanel-de').classList.contains('active');
            res.afterDeClick_GovActive = document.getElementById('rpanel-gov').classList.contains('active');
            
            const panelDe = document.getElementById('rpanel-de');
            const style = window.getComputedStyle(panelDe);
            res.panelDeDisplay = style.display;
            res.panelDeHeight = panelDe.offsetHeight;
          } else {
            res.btnDeFound = false;
          }

          // Click Gov tab
          const btnGov = document.getElementById('rtab-gov');
          if (btnGov) {
            btnGov.click();
            res.afterGovClick_AiActive = document.getElementById('rpanel-ai').classList.contains('active');
            res.afterGovClick_DeActive = document.getElementById('rpanel-de').classList.contains('active');
            res.afterGovClick_GovActive = document.getElementById('rpanel-gov').classList.contains('active');
            
            const panelGov = document.getElementById('rpanel-gov');
            const styleGov = window.getComputedStyle(panelGov);
            res.panelGovDisplay = styleGov.display;
            res.panelGovHeight = panelGov.offsetHeight;
          } else {
            res.btnGovFound = false;
          }

          return JSON.stringify(res, null, 2);
        })()`
      });

      console.log('Test evaluation result:', testResult.result.value);

      cleanup();
    };

  } catch (err) {
    console.error('Error:', err);
    cleanup();
  }
}, 2500);

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
