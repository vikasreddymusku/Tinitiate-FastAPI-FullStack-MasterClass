(function(){
  const sceneButtons = document.querySelectorAll('.v6-switch-btn');
  const scenes = document.querySelectorAll('.v6-scene');
  sceneButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sceneButtons.forEach(b => b.classList.remove('active'));
      scenes.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const scene = document.getElementById('scene-' + btn.dataset.scene);
      if (scene) scene.classList.add('active');
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  });

  const sameBankState = {
    before: {
      accounts: [
        ['1001','Anita','₹2,000','ACTIVE'],
        ['1002','Rahul','₹700','ACTIVE']
      ],
      updated: [
        ['1001','Anita','₹2,000','ACTIVE'],
        ['1002','Rahul','₹700','ACTIVE']
      ],
      transactions: [
        ['—','—','—','—','NO ROW','—']
      ],
      ledger: [
        ['—','—','—','—','—','—','—']
      ]
    },
    during: {
      accounts: [
        ['1001','Anita','₹2,000','ACTIVE'],
        ['1002','Rahul','₹700','ACTIVE']
      ],
      updated: [
        ['1001','Anita','₹1,500','ACTIVE'],
        ['1002','Rahul','₹1,200','ACTIVE']
      ],
      transactions: [
        ['T100893','1001','1002','₹500','PROCESSING','2024-06-18 09:41:12'],
        ['T100893','1001','1002','₹500','SUCCESS','2024-06-18 09:41:12']
      ],
      ledger: [
        ['L9001','T100893','1001','DEBIT','₹500','₹1,500','2024-06-18 09:41:12'],
        ['L9002','T100893','1002','CREDIT','₹500','₹1,200','2024-06-18 09:41:12']
      ]
    },
    after: {
      accounts: [
        ['1001','Anita','₹1,500','ACTIVE'],
        ['1002','Rahul','₹1,200','ACTIVE']
      ],
      updated: [
        ['1001','Anita','₹1,500','ACTIVE'],
        ['1002','Rahul','₹1,200','ACTIVE']
      ],
      transactions: [
        ['T100893','1001','1002','₹500','SUCCESS','2024-06-18 09:41:12']
      ],
      ledger: [
        ['L9001','T100893','1001','DEBIT','₹500','₹1,500','2024-06-18 09:41:12'],
        ['L9002','T100893','1002','CREDIT','₹500','₹1,200','2024-06-18 09:41:12']
      ]
    }
  };

  function rowHtml(cells, rowIndex, type){
    const tr = document.createElement('tr');
    if (type === 'transactions' && rowIndex === 1) tr.classList.add('v6-outline-green');
    cells.forEach((cell, i) => {
      const td = document.createElement('td');
      td.textContent = cell;
      if ((type === 'accounts' && rowIndex === 0 && i === 2) || (type === 'updated' && i===2 && rowIndex<2 && (cell==='₹1,500' || cell==='₹1,200'))) {
        td.style.fontWeight = '900';
        td.style.color = cell.includes('1,200') ? '#7dffbd' : (cell.includes('1,500') ? '#ff9cab' : '#ffe07f');
      }
      if (type === 'transactions' && i===4) {
        td.innerHTML = cell === 'SUCCESS' ? '<span class="v6-chip-pos">SUCCESS</span>' : cell === 'PROCESSING' ? '<span class="v6-chip-neutral">PROCESSING</span>' : cell;
      }
      if (type === 'ledger' && i===3) {
        td.innerHTML = cell === 'DEBIT' ? '<span class="v6-chip-neg">DEBIT</span>' : '<span class="v6-chip-pos">CREDIT</span>';
      }
      tr.appendChild(td);
    });
    return tr;
  }

  function renderSameBank(view){
    const state = sameBankState[view];
    const map = {
      'samebank-accounts': ['accounts', state.accounts],
      'samebank-updated': ['updated', state.updated],
      'samebank-transactions': ['transactions', state.transactions],
      'samebank-ledger': ['ledger', state.ledger]
    };
    Object.entries(map).forEach(([id,[type,rows]]) => {
      const tbody = document.getElementById(id);
      if (!tbody) return;
      tbody.innerHTML = '';
      rows.forEach((row, index) => tbody.appendChild(rowHtml(row, index, type)));
    });
  }
  renderSameBank('during');

  document.querySelectorAll('[data-view-group="samebank"] .v6-view-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-view-group="samebank"] .v6-view-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSameBank(tab.dataset.view);
    });
  });

  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.dataset.copyTarget);
      if (!target) return;
      const text = target.innerText;
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => btn.textContent = old, 1200);
      } catch (e) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(target);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  });
})();
