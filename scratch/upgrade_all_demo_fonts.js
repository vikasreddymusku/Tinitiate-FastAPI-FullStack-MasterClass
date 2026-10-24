const fs = require('fs');
const path = 'c:/work/GIT-CODE/interactive-ui/automation-ml-ai-agentic/demo.html';

let content = fs.readFileSync(path, 'utf8');

// Add the JS handlers for Lightbox and 30s Evolution Tour
const scriptMarker = '// --------------------------------------------------------------------------\n    // 1. SNAP SCROLLER & SCROLLSPY';

const newJsHandlers = `// --------------------------------------------------------------------------
    // 0. SNAP 1: 30s EVOLUTION TOUR & LIGHTBOX MODAL (RULES TO AI AGENTS)
    // --------------------------------------------------------------------------
    let currentEpoch = 1;
    const totalEpochs = 4;
    let tourPlaying = false;
    let tourSeconds = 0;
    const tourTotalSeconds = 30;
    let tourInterval = null;

    function openImageLightbox() {
      const modal = document.getElementById('imageLightboxModal');
      if (modal) modal.classList.add('active');
    }

    function closeImageLightbox() {
      const modal = document.getElementById('imageLightboxModal');
      if (modal) modal.classList.remove('active');
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeImageLightbox();
    });

    function selectEpochStage(idx) {
      currentEpoch = idx;
      for (let i = 1; i <= 4; i++) {
        const tab = document.getElementById('epochTab' + i);
        const panel = document.getElementById('epochPanel' + i);
        if (tab) tab.classList.toggle('active', i === idx);
        if (panel) panel.classList.toggle('active', i === idx);
      }
      const pct = (idx / totalEpochs) * 100;
      const fill = document.getElementById('epochScrubberFill');
      if (fill) fill.style.width = pct + '%';
      if (window.lucide) lucide.createIcons();
    }

    function toggleTourPlay() {
      tourPlaying = !tourPlaying;
      const icon = document.getElementById('tourPlayIcon');
      const txt = document.getElementById('tourPlayText');

      if (tourPlaying) {
        if (txt) txt.textContent = 'Pause Tour';
        if (icon) icon.setAttribute('data-lucide', 'pause');
        tourInterval = setInterval(tickTour, 1000);
      } else {
        if (txt) txt.textContent = 'Play 30s Tour';
        if (icon) icon.setAttribute('data-lucide', 'play');
        clearInterval(tourInterval);
        tourInterval = null;
      }
      if (window.lucide) lucide.createIcons();
    }

    function tickTour() {
      tourSeconds += 1;
      if (tourSeconds > tourTotalSeconds) {
        tourSeconds = 0;
      }

      const sStr = tourSeconds < 10 ? '0' + tourSeconds : tourSeconds;
      const timeEl = document.getElementById('tourTimeText');
      if (timeEl) timeEl.textContent = '00:' + sStr + ' / 00:30';

      const epochIdx = Math.min(4, Math.floor(tourSeconds / 7.5) + 1);
      if (epochIdx !== currentEpoch) {
        selectEpochStage(epochIdx);
      }

      const pct = (tourSeconds / tourTotalSeconds) * 100;
      const fill = document.getElementById('epochScrubberFill');
      if (fill) fill.style.width = pct + '%';
    }

    ` + scriptMarker;

if (content.includes(scriptMarker)) {
  content = content.replace(scriptMarker, newJsHandlers);
  console.log("Injected 30s Evolution Tour and Lightbox JS handlers!");
} else {
  console.error("Could not find scriptMarker!");
}

// 2. Upgrade all remaining micro-fonts across the entire document
// Left Sidebar menu items
content = content.replace(/font-size:\s*0\.68rem;/g, 'font-size: 0.85rem;');
content = content.replace(/font-size:\s*0\.74rem;/g, 'font-size: 0.88rem;');
content = content.replace(/font-size:\s*0\.76rem;/g, 'font-size: 0.92rem;');
content = content.replace(/font-size:\s*0\.78rem;/g, 'font-size: 0.94rem;');
content = content.replace(/font-size:\s*0\.72rem;/g, 'font-size: 0.90rem;');
content = content.replace(/font-size:\s*0\.7rem;/g, 'font-size: 0.88rem;');
content = content.replace(/font-size:\s*0\.65rem;/g, 'font-size: 0.85rem;');
content = content.replace(/font-size:\s*0\.66rem;/g, 'font-size: 0.88rem;');
content = content.replace(/font-size:\s*0\.75rem;/g, 'font-size: 0.92rem;');

// Ensure code blocks and terminal screens have crisp, comfortable line-height and presentation font size
content = content.replace(/\.sim-terminal-screen\s*\{[^}]*\}/s, `.sim-terminal-screen {
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 14px 16px;
      font-family: var(--font-mono);
      font-size: 0.94rem;
      line-height: 1.55;
      color: #38bdf8;
      height: 230px;
      overflow-y: auto;
      white-space: pre-wrap;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
    }`);

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully updated demo.html typography and scripts!");
