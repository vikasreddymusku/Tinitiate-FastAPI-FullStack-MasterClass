const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'automation-ml-ai-agentic', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Find and replace the existing broken word cloud block
const existingStart = '<!-- ========================================================================= -->\n        <!-- INTERACTIVE ANIMATED AI TERMS & BUZZWORDS WORD CLOUD                      -->';
const existingEnd = '<div class="interactive-container">';

const startIndex = html.indexOf(existingStart);
const endIndex = html.indexOf(existingEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate existing word cloud boundaries');
  process.exit(1);
}

const newWordCloudComponent = `<!-- ========================================================================= -->
        <!-- INTERACTIVE 3D ANIMATED AI TERMS & BUZZWORDS WORD CLOUD                   -->
        <!-- ========================================================================= -->
        <div class="ai-word-cloud-card" id="ai-word-cloud-widget">
          <div class="word-cloud-header">
            <div class="word-cloud-title-wrap">
              <div class="word-cloud-icon-box">
                <i data-lucide="cloud" style="width:22px;height:22px;"></i>
              </div>
              <div>
                <h3 style="margin:0;font-size:1.25rem;font-weight:900;color:var(--text-main);">
                  3D Interactive AI Buzzwords &amp; Terms Constellation
                </h3>
                <span style="font-size:0.8rem;color:var(--text-muted);">
                  Spin the 3D sphere with your mouse. Click any AI buzzword to inspect its plain-English mental model and jump straight to its interview guide below.
                </span>
              </div>
            </div>

            <!-- Controls -->
            <div class="word-cloud-controls">
              <div class="cloud-filter-group">
                <button type="button" class="cloud-filter-btn active" data-cat="all" onclick="filterCloudCategory('all', this)">All (28)</button>
                <button type="button" class="cloud-filter-btn" data-cat="llm" onclick="filterCloudCategory('llm', this)">LLMs &amp; Brain</button>
                <button type="button" class="cloud-filter-btn" data-cat="rag" onclick="filterCloudCategory('rag', this)">RAG &amp; Vectors</button>
                <button type="button" class="cloud-filter-btn" data-cat="agent" onclick="filterCloudCategory('agent', this)">Agents &amp; MCP</button>
                <button type="button" class="cloud-filter-btn" data-cat="tuning" onclick="filterCloudCategory('tuning', this)">Tuning &amp; Safety</button>
              </div>

              <div class="cloud-action-btns">
                <button type="button" class="cloud-action-btn" id="btn-cloud-motion" onclick="toggleCloudRotation()" title="Pause or Resume 3D Spin">
                  <i data-lucide="pause" style="width:13px;height:13px;" id="icon-cloud-motion"></i>
                  <span id="label-cloud-motion">Pause Spin</span>
                </button>
                <button type="button" class="cloud-action-btn" onclick="resetCloudView()" title="Center Sphere">
                  <i data-lucide="rotate-ccw" style="width:13px;height:13px;"></i>
                  <span>Center View</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 3D Canvas Stage -->
          <div class="word-cloud-canvas-wrapper" id="canvasWrapper">
            <canvas id="wordCloudCanvas"></canvas>
            <div class="cloud-hint-badge">
              <i data-lucide="hand" style="width:12px;height:12px;"></i>
              <span>Drag or move cursor to spin 3D sphere &bull; Click any term to inspect</span>
            </div>
          </div>

          <!-- Active Term Live Inspector Ribbon -->
          <div class="word-cloud-inspector" id="wordCloudInspector">
            <div class="inspector-term-pill">
              <span class="inspector-badge" id="inspCategoryBadge">Core Brain</span>
              <strong class="inspector-name" id="inspTermName">LLM (Large Language Model)</strong>
            </div>
            <p class="inspector-metaphor" id="inspMetaphor">
              <strong>Mental Model:</strong> A brilliant student who read the whole internet; calculates which word mathematically makes the most sense to come next.
            </p>
            <button type="button" class="inspector-jump-btn" onclick="jumpToActiveCloudTerm()">
              <span>Jump to Deep Dive</span>
              <i data-lucide="arrow-down" style="width:14px;height:14px;"></i>
            </button>
          </div>
        </div>

        <style>
          /* 3D Animated Word Cloud Sphere Styles */
          .ai-word-cloud-card {
            background: var(--bg-card, #ffffff);
            border: 1.5px solid var(--border-subtle, rgba(226, 232, 240, 0.8));
            border-radius: var(--radius-xl, 16px);
            padding: 22px 24px;
            margin-bottom: 24px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .word-cloud-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 14px;
            padding-bottom: 14px;
            border-bottom: 1px dashed var(--border-subtle, rgba(226, 232, 240, 0.8));
          }

          .word-cloud-title-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .word-cloud-icon-box {
            width: 42px;
            height: 42px;
            border-radius: 11px;
            background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);
            flex-shrink: 0;
          }

          .word-cloud-controls {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
          }

          .cloud-filter-group {
            display: flex;
            align-items: center;
            gap: 4px;
            background: var(--bg-elevated, #f1f5f9);
            padding: 4px;
            border-radius: 999px;
            border: 1px solid var(--border-subtle, rgba(226, 232, 240, 0.8));
          }

          .cloud-filter-btn {
            background: transparent;
            border: none;
            padding: 5px 12px;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--text-muted, #64748b);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .cloud-filter-btn:hover {
            color: var(--text-main, #0f172a);
          }

          .cloud-filter-btn.active {
            background: #7c3aed;
            color: #ffffff;
            box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
          }

          .cloud-action-btns {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .cloud-action-btn {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--text-muted, #64748b);
            background: var(--bg-elevated, #f8fafc);
            border: 1px solid var(--border-subtle, rgba(226, 232, 240, 0.8));
            cursor: pointer;
            transition: all 0.18s ease;
          }

          .cloud-action-btn:hover {
            color: var(--text-main, #0f172a);
            background: rgba(124, 58, 237, 0.08);
            border-color: rgba(124, 58, 237, 0.4);
          }

          /* 3D Canvas Container */
          .word-cloud-canvas-wrapper {
            position: relative;
            width: 100%;
            height: 420px;
            border-radius: 14px;
            overflow: hidden;
            background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 100%);
            border: 1px solid rgba(139, 92, 246, 0.35);
            box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.65);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          #wordCloudCanvas {
            display: block;
            width: 100%;
            height: 100%;
            cursor: grab;
          }

          #wordCloudCanvas:active {
            cursor: grabbing;
          }

          .cloud-hint-badge {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 14px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            font-size: 0.72rem;
            color: #cbd5e1;
            pointer-events: none;
            letter-spacing: 0.02em;
          }

          /* Inspector Ribbon */
          .word-cloud-inspector {
            background: var(--bg-elevated, #f8fafc);
            border: 1.5px solid var(--border-subtle, rgba(226, 232, 240, 0.8));
            border-radius: 12px;
            padding: 12px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            animation: fadeIn 0.25s ease;
          }

          .inspector-term-pill {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .inspector-badge {
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 6px;
            background: rgba(124, 58, 237, 0.15);
            color: #7c3aed;
            border: 1px solid rgba(124, 58, 237, 0.3);
          }

          .inspector-name {
            font-size: 1.02rem;
            font-weight: 800;
            color: var(--text-main, #0f172a);
          }

          .inspector-metaphor {
            margin: 0;
            font-size: 0.86rem;
            color: var(--text-muted, #475569);
            flex: 1;
            min-width: 260px;
            line-height: 1.45;
          }

          .inspector-jump-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #7c3aed;
            color: #ffffff;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
          }

          .inspector-jump-btn:hover {
            background: #6d28d9;
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(124, 58, 237, 0.4);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>

        <script>
        // =====================================================================
        // 3D INTERACTIVE SPHERICAL WORD CLOUD ENGINE
        // =====================================================================
        (function() {
          const AI_TERMS = [
            { id: 'term-llm', text: 'LLM', cat: 'llm', badge: 'Core Brain', metaphor: 'A brilliant student who read the whole internet; calculates which word mathematically makes the most sense to come next.' },
            { id: 'term-llm', text: 'Transformer', cat: 'llm', badge: 'Neural Model', metaphor: 'The revolutionary neural network architecture using self-attention to weigh connections between all words in a sentence.' },
            { id: 'term-tokens', text: 'Tokens', cat: 'llm', badge: 'Model Currency', metaphor: 'The syllables and text chunks that models consume as units (1,000 tokens ≈ 750 English words).' },
            { id: 'term-tokens', text: 'Context Window', cat: 'llm', badge: 'Short-Term RAM', metaphor: 'The active working memory of an LLM during an ongoing session (e.g. 128k to 2M tokens).' },
            { id: 'term-temperature', text: 'Temperature', cat: 'llm', badge: 'Creativity Dial', metaphor: 'A randomness setting: 0.0 is deterministic and robotic for code/SQL, while 0.8+ is creative for brainstorming.' },
            { id: 'term-prompts', text: 'System Prompt', cat: 'llm', badge: 'Core Persona', metaphor: 'The immutable background instruction that establishes who the model is, its constraints, and safety guidelines.' },
            { id: 'term-prompts', text: 'Zero-Shot vs Few-Shot', cat: 'llm', badge: 'Prompt Paradigm', metaphor: 'Asking the model directly with zero examples vs providing 2-3 sample demonstrations in the prompt.' },
            { id: 'term-llm', text: 'Multimodal', cat: 'llm', badge: 'Vision & Audio', metaphor: 'Models capable of seeing images, processing audio, and understanding video in addition to raw text.' },
            { id: 'term-rag', text: 'RAG', cat: 'rag', badge: 'Enterprise Standard', metaphor: 'Retrieval-Augmented Generation: An open-book exam where the model looks up real internal company documents before answering.' },
            { id: 'term-embeddings', text: 'Vector Embeddings', cat: 'rag', badge: 'Semantic Math', metaphor: 'Translating words and paragraphs into high-dimensional numerical coordinates where similar concepts sit close together.' },
            { id: 'term-embeddings', text: 'Vector DB', cat: 'rag', badge: 'Semantic Index', metaphor: 'Databases (Pinecone, Qdrant, Chroma) engineered to perform nearest-neighbor searches across millions of embedding vectors in milliseconds.' },
            { id: 'term-rag', text: 'Semantic Search', cat: 'rag', badge: 'Intent Retrieval', metaphor: 'Searching documents by conceptual meaning rather than exact keyword matches (e.g., query feline matches cat).' },
            { id: 'term-rag', text: 'Chunking', cat: 'rag', badge: 'Data Prep', metaphor: 'Splitting massive PDF manuals into optimal semantic chunks (500-1000 tokens) with overlap so context is never severed.' },
            { id: 'term-rag', text: 'Reranker', cat: 'rag', badge: 'Relevance Filter', metaphor: 'A secondary specialized cross-encoder model that scores the top retrieved documents to feed only the highest quality context to the LLM.' },
            { id: 'term-embeddings', text: 'Cosine Similarity', cat: 'rag', badge: 'Distance Metric', metaphor: 'Mathematical measurement of the angle between two embedding vectors to quantify how closely their meanings align.' },
            { id: 'term-agentic', text: 'Agents', cat: 'agent', badge: 'Autonomous Actor', metaphor: 'Autonomous software systems that do not just answer questions—they observe, create plans, use tools, and loop until goals are met.' },
            { id: 'term-mcp', text: 'MCP Protocol', cat: 'agent', badge: 'Universal USB-C', metaphor: 'Model Context Protocol: The open standard connecting LLMs safely to local file systems, GitHub repos, and enterprise SQL databases.' },
            { id: 'term-agentic', text: 'ReAct Loops', cat: 'agent', badge: 'Reason + Act', metaphor: 'Reasoning + Acting iterative loops: The agent thinks through the problem, takes an external action, inspects the result, and repeats.' },
            { id: 'term-harness', text: 'AI Harness', cat: 'agent', badge: 'Execution Runtime', metaphor: 'The software harness and testing infrastructure that invokes models, manages state, executes function calls, and parses output.' },
            { id: 'term-harness', text: 'Tool Calling', cat: 'agent', badge: 'Function Calling', metaphor: 'The model emitting structured JSON specifying which external API function to run and with what exact parameters.' },
            { id: 'term-agentic', text: 'Multi-Agent Swarm', cat: 'agent', badge: 'Collaborative AI', metaphor: 'Teams of specialized agents (e.g. Researcher, Code Writer, Security Critic) passing messages to achieve complex workflows.' },
            { id: 'term-finetuning', text: 'Fine-Tuning', cat: 'tuning', badge: 'Specialization', metaphor: 'Sending a general foundation doctor model to a specialty residency to master company tone, specialized jargon, or novel tasks.' },
            { id: 'term-finetuning', text: 'LoRA', cat: 'tuning', badge: 'Low-Rank Adaptation', metaphor: 'Training small lightweight adapter layers (a pair of low-rank matrices) without touching the massive base model weights.' },
            { id: 'term-evaluator', text: 'Evaluators', cat: 'tuning', badge: 'LLM-as-a-Judge', metaphor: 'Automated benchmark test suites and referee LLMs that grade the accuracy, relevance, and safety of production model answers.' },
            { id: 'term-guardrails', text: 'Guardrails', cat: 'tuning', badge: 'Safety Bouncer', metaphor: 'Software boundary layers intercepting prompts and outputs to block jailbreaks, PII leaks, prompt injections, and toxic responses.' },
            { id: 'term-hallucination', text: 'Hallucination', cat: 'tuning', badge: 'False Conviction', metaphor: 'When an AI confidently invents false facts, incorrect citations, or nonexistent APIs because it lacks verified ground-truth context.' },
            { id: 'term-cot', text: 'Chain-of-Thought', cat: 'tuning', badge: 'Reasoning Steps', metaphor: 'Instructing the model to think step by step before answering, drastically reducing mathematical and logic errors.' },
            { id: 'term-quantization', text: 'Quantization', cat: 'tuning', badge: 'Model Compression', metaphor: 'Compressing heavy 16-bit floating point weights into 4-bit or 8-bit integers so big models fit into consumer GPU memory.' }
          ];

          const CAT_COLORS = {
            llm: { main: '#c084fc', glow: '#a855f7', bg: 'rgba(168, 85, 247, 0.25)' },
            rag: { main: '#38bdf8', glow: '#0284c7', bg: 'rgba(56, 189, 248, 0.25)' },
            agent: { main: '#4ade80', glow: '#16a34a', bg: 'rgba(74, 222, 128, 0.25)' },
            tuning: { main: '#facc15', glow: '#ca8a04', bg: 'rgba(250, 204, 21, 0.25)' }
          };

          let canvas, ctx;
          let width = 800, height = 420;
          let radius = 160;
          let items = [];
          let currentFilter = 'all';
          let isRotating = true;
          let activeIndex = 0;
          let hoveredIndex = -1;
          let mouseX = 0, mouseY = 0;
          let isDragging = false;
          let lastMouseX = 0, lastMouseY = 0;
          let velX = 0.003, velY = 0.004;

          function createSphericalPoints() {
            const count = AI_TERMS.length;
            items = AI_TERMS.map((term, i) => {
              // Fibonacci sphere distribution
              const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
              const theta = Math.PI * (1 + Math.sqrt(5)) * i;

              return {
                data: term,
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.cos(phi),
                z: radius * Math.sin(phi) * Math.sin(theta),
                screenX: 0,
                screenY: 0,
                scale: 1,
                alpha: 1,
                box: { x1: 0, y1: 0, x2: 0, y2: 0 }
              };
            });
          }

          function resizeCanvas() {
            if (!canvas) return;
            const rect = canvas.parentElement.getBoundingClientRect();
            width = rect.width || 800;
            height = rect.height || 420;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            radius = Math.min(width, height) * 0.38;
            createSphericalPoints();
          }

          function rotateX(angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            items.forEach(p => {
              const y1 = p.y * cos - p.z * sin;
              const z1 = p.z * cos + p.y * sin;
              p.y = y1;
              p.z = z1;
            });
          }

          function rotateY(angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            items.forEach(p => {
              const x1 = p.x * cos - p.z * sin;
              const z1 = p.z * cos + p.x * sin;
              p.x = x1;
              p.z = z1;
            });
          }

          function render() {
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            const perspective = 340;

            // Apply rotation
            if (isRotating && !isDragging) {
              rotateY(velY);
              rotateX(velX);
            }

            // Project 3D to 2D
            items.forEach(p => {
              const distance = perspective / (perspective - p.z);
              p.scale = distance;
              p.screenX = centerX + p.x * distance;
              p.screenY = centerY + p.y * distance;

              // Alpha based on depth
              const normalizedZ = (p.z + radius) / (2 * radius);
              p.alpha = Math.max(0.25, Math.min(1.0, 0.35 + 0.65 * normalizedZ));
            });

            // Sort by Z for proper 3D layering (back to front)
            const sortedIndices = items.map((_, i) => i).sort((a, b) => items[a].z - items[b].z);

            // Draw each item
            sortedIndices.forEach(idx => {
              const p = items[idx];
              const term = p.data;
              const isMatch = currentFilter === 'all' || term.cat === currentFilter;
              const isHovered = hoveredIndex === idx;
              const isSelected = activeIndex === idx;

              const colors = CAT_COLORS[term.cat] || CAT_COLORS.llm;
              const baseFontSize = 13;
              const fontSize = Math.round(baseFontSize * p.scale * (isHovered ? 1.25 : 1));

              ctx.font = '800 ' + fontSize + 'px Inter, system-ui, sans-serif';
              const textMetrics = ctx.measureText(term.text);
              const textW = textMetrics.width;
              const textH = fontSize;

              // Save bounding box for mouse picking
              p.box = {
                x1: p.screenX - textW / 2 - 8,
                y1: p.screenY - textH / 2 - 5,
                x2: p.screenX + textW / 2 + 8,
                y2: p.screenY + textH / 2 + 5
              };

              ctx.save();
              ctx.globalAlpha = isMatch ? p.alpha : p.alpha * 0.15;

              // Draw background pill for front items or hovered items
              if ((p.z > 0 && isMatch) || isHovered) {
                const padX = 8 * p.scale;
                const padY = 4 * p.scale;
                const boxW = textW + padX * 2;
                const boxH = textH + padY * 2;
                const boxX = p.screenX - boxW / 2;
                const boxY = p.screenY - boxH / 2;
                const r = 6 * p.scale;

                ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.2)' : colors.bg;
                ctx.strokeStyle = isHovered ? '#ffffff' : (isSelected ? colors.main : 'rgba(255, 255, 255, 0.12)');
                ctx.lineWidth = isHovered ? 2 : 1;

                if (isHovered) {
                  ctx.shadowColor = colors.glow;
                  ctx.shadowBlur = 18;
                }

                ctx.beginPath();
                ctx.roundRect ? ctx.roundRect(boxX, boxY, boxW, boxH, r) : ctx.rect(boxX, boxY, boxW, boxH);
                ctx.fill();
                ctx.stroke();
              }

              // Text fill
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = isHovered ? '#ffffff' : (isMatch ? colors.main : 'rgba(148, 163, 184, 0.3)');
              
              if (isHovered) {
                ctx.shadowColor = colors.glow;
                ctx.shadowBlur = 14;
              }

              ctx.fillText(term.text, p.screenX, p.screenY);
              ctx.restore();
            });

            requestAnimationFrame(render);
          }

          function updateInspector(term) {
            const badge = document.getElementById('inspCategoryBadge');
            const name = document.getElementById('inspTermName');
            const meta = document.getElementById('inspMetaphor');

            if (badge) badge.textContent = term.badge;
            if (name) name.textContent = term.text;
            if (meta) meta.innerHTML = '<strong>Mental Model:</strong> ' + term.metaphor;
          }

          function getHitIndex(mx, my) {
            // Find front-most item clicked (highest Z)
            let found = -1;
            let maxZ = -Infinity;

            for (let i = 0; i < items.length; i++) {
              const p = items[i];
              if (mx >= p.box.x1 && mx <= p.box.x2 && my >= p.box.y1 && my <= p.box.y2) {
                if (p.z > maxZ) {
                  maxZ = p.z;
                  found = i;
                }
              }
            }
            return found;
          }

          function setupEvents() {
            canvas.addEventListener('mousemove', function(e) {
              const rect = canvas.getBoundingClientRect();
              mouseX = e.clientX - rect.left;
              mouseY = e.clientY - rect.top;

              if (isDragging) {
                const dx = mouseX - lastMouseX;
                const dy = mouseY - lastMouseY;
                rotateY(dx * 0.005);
                rotateX(-dy * 0.005);
                lastMouseX = mouseX;
                lastMouseY = mouseY;
              } else {
                hoveredIndex = getHitIndex(mouseX, mouseY);
                canvas.style.cursor = hoveredIndex !== -1 ? 'pointer' : 'grab';
                if (hoveredIndex !== -1) {
                  updateInspector(items[hoveredIndex].data);
                }
              }
            });

            canvas.addEventListener('mousedown', function(e) {
              isDragging = true;
              const rect = canvas.getBoundingClientRect();
              lastMouseX = e.clientX - rect.left;
              lastMouseY = e.clientY - rect.top;
            });

            window.addEventListener('mouseup', function() {
              isDragging = false;
            });

            canvas.addEventListener('click', function(e) {
              const rect = canvas.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const clickY = e.clientY - rect.top;
              const clickedIdx = getHitIndex(clickX, clickY);

              if (clickedIdx !== -1) {
                activeIndex = clickedIdx;
                const term = items[clickedIdx].data;
                updateInspector(term);
                jumpToActiveCloudTerm();
              }
            });

            canvas.addEventListener('mouseleave', function() {
              hoveredIndex = -1;
              canvas.style.cursor = 'grab';
            });
          }

          window.filterCloudCategory = function(cat, btn) {
            currentFilter = cat;
            document.querySelectorAll('.cloud-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
          };

          window.toggleCloudRotation = function() {
            isRotating = !isRotating;
            const label = document.getElementById('label-cloud-motion');
            const icon = document.getElementById('icon-cloud-motion');
            if (label) label.textContent = isRotating ? 'Pause Spin' : 'Resume Spin';
            if (icon) {
              icon.setAttribute('data-lucide', isRotating ? 'pause' : 'play');
              if (window.lucide) lucide.createIcons();
            }
          };

          window.resetCloudView = function() {
            createSphericalPoints();
            velX = 0.003;
            velY = 0.004;
          };

          window.jumpToActiveCloudTerm = function() {
            const term = items[activeIndex] ? items[activeIndex].data : AI_TERMS[0];
            if (!term || !term.id) return;

            const targetEl = document.getElementById(term.id);
            if (targetEl) {
              if (targetEl.tagName.toLowerCase() === 'details') {
                targetEl.open = true;
              }
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              targetEl.style.boxShadow = '0 0 35px rgba(139, 92, 246, 0.75)';
              targetEl.style.transition = 'box-shadow 0.3s ease';
              setTimeout(function() {
                targetEl.style.boxShadow = '';
              }, 2200);
            }
          };

          function init() {
            canvas = document.getElementById('wordCloudCanvas');
            if (!canvas) return;
            ctx = canvas.getContext('2d');

            resizeCanvas();
            setupEvents();
            updateInspector(AI_TERMS[0]);
            render();

            window.addEventListener('resize', resizeCanvas, { passive: true });
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
          } else {
            init();
          }
        })();
        </script>
`;

html = html.substring(0, startIndex) + newWordCloudComponent + '\n\n        ' + html.substring(endIndex);

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully injected Canvas 3D Word Cloud into automation-ml-ai-agentic/index.html');
