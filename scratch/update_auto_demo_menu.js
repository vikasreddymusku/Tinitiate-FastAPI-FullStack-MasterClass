const fs = require('fs');

const f = 'automation-ml-ai-agentic/demo.html';
let c = fs.readFileSync(f, 'utf8');

const targetMenu = `<div class="sidebar-menu-list">
        <a href="index.html" class="sidebar-link">
          <i data-lucide="book-open"></i>
          <span>Course Home</span>
        </a>
        <a href="demo.html" class="sidebar-link active">
          <i data-lucide="play-circle"></i>
          <span>Interactive Demo Lab</span>
        </a>`;

const replacementMenu = `<div class="sidebar-menu-list">
        <a href="index.html" class="sidebar-link">
          <i data-lucide="book-open"></i>
          <span>Course Home</span>
        </a>
        <a href="demo.html" class="sidebar-link active">
          <i data-lucide="play-circle"></i>
          <span>Interactive Demo Lab</span>
        </a>
        <a href="ai.html" class="sidebar-link">
          <i data-lucide="sparkles"></i>
          <span>AI Foundation</span>
        </a>
        <a href="ml.html" class="sidebar-link">
          <i data-lucide="cpu"></i>
          <span>Machine Learning</span>
        </a>
        <a href="genai.html" class="sidebar-link">
          <i data-lucide="bot"></i>
          <span>GenAI & LLMs</span>
        </a>
        <a href="agents.html" class="sidebar-link">
          <i data-lucide="network"></i>
          <span>Autonomous Agents</span>
        </a>
        <a href="agentic-loops.html" class="sidebar-link">
          <i data-lucide="repeat"></i>
          <span>Agentic Loops</span>
        </a>`;

if (c.includes(targetMenu)) {
  c = c.replace(targetMenu, replacementMenu);
  fs.writeFileSync(f, c, 'utf8');
  console.log('Updated automation-ml-ai-agentic/demo.html sidebar list');
} else {
  console.log('Target menu not found in demo.html');
}
