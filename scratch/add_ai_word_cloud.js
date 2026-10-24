const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'automation-ml-ai-agentic', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const wordCloudHtml = `
        <!-- ========================================================================= -->
        <!-- INTERACTIVE ANIMATED AI TERMS & BUZZWORDS WORD CLOUD                      -->
        <!-- ========================================================================= -->
        <div class="ai-word-cloud-card" id="ai-word-cloud-widget">
          <div class="word-cloud-header">
            <div class="word-cloud-title-wrap">
              <div class="word-cloud-icon-box">
                <i data-lucide="cloud" style="width:22px;height:22px;"></i>
              </div>
              <div>
                <h3 style="margin:0;font-size:1.25rem;font-weight:900;color:var(--text-main);">
                  Interactive AI Buzzword Constellation &amp; Animated Word Cloud
                </h3>
                <span style="font-size:0.8rem;color:var(--text-muted);">
                  Click any floating AI buzzword to inspect its plain-English mental model and jump straight to its interview answer below.
                </span>
              </div>
            </div>

            <!-- Cloud Controls -->
            <div class="word-cloud-controls">
              <div class="cloud-filter-group">
                <button type="button" class="cloud-filter-btn active" data-cat="all" onclick="filterWordCloud('all', this)">All (30+)</button>
                <button type="button" class="cloud-filter-btn" data-cat="llm" onclick="filterWordCloud('llm', this)">LLMs &amp; Brain</button>
                <button type="button" class="cloud-filter-btn" data-cat="rag" onclick="filterWordCloud('rag', this)">RAG &amp; Vectors</button>
                <button type="button" class="cloud-filter-btn" data-cat="agent" onclick="filterWordCloud('agent', this)">Agents &amp; MCP</button>
                <button type="button" class="cloud-filter-btn" data-cat="tuning" onclick="filterWordCloud('tuning', this)">Tuning &amp; Safety</button>
              </div>
              
              <div class="cloud-action-btns">
                <button type="button" class="cloud-action-btn" id="btn-toggle-motion" onclick="toggleCloudMotion()" title="Pause / Resume Floating Drift">
                  <i data-lucide="pause" style="width:13px;height:13px;" id="icon-motion-state"></i>
                  <span id="label-motion-state">Pause Motion</span>
                </button>
                <button type="button" class="cloud-action-btn" onclick="rescatterCloud()" title="Re-scatter Words in Random Orbits">
                  <i data-lucide="shuffle" style="width:13px;height:13px;"></i>
                  <span>Re-Scatter</span>
                </button>
              </div>
            </div>
          </div>

          <!-- The Floating Animation Canvas / Stage -->
          <div class="word-cloud-stage-wrapper">
            <div class="word-cloud-stage" id="wordCloudStage">
              <!-- Dynamically populated floating word nodes with animated physics -->
            </div>
          </div>

          <!-- Active Term Live Inspector Ribbon -->
          <div class="word-cloud-inspector" id="wordCloudInspector">
            <div class="inspector-term-pill" id="inspTermPill">
              <span class="inspector-badge" id="inspCategoryBadge">Core Brain</span>
              <strong class="inspector-name" id="inspTermName">LLM (Large Language Model)</strong>
            </div>
            <p class="inspector-metaphor" id="inspMetaphor">
              <strong>Mental Model:</strong> A brilliant student who read the entire internet. Calculates which word mathematically makes the most sense to come next.
            </p>
            <button type="button" class="inspector-jump-btn" id="inspJumpBtn" onclick="jumpToActiveTerm()">
              <span>Jump to Deep Dive</span>
              <i data-lucide="arrow-down" style="width:14px;height:14px;"></i>
            </button>
          </div>
        </div>

        <style>
          /* AI Animated Word Cloud Styles */
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

          /* Stage & Floating Tag Canvas */
          .word-cloud-stage-wrapper {
            position: relative;
            width: 100%;
            height: 380px;
            border-radius: 14px;
            overflow: hidden;
            background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 100%);
            border: 1px solid rgba(139, 92, 246, 0.35);
            box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
          }

          .word-cloud-stage-wrapper::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 32px 32px;
            pointer-events: none;
          }

          .word-cloud-stage {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .cloud-tag {
            position: absolute;
            transform: translate(-50%, -50%);
            padding: 6px 14px;
            border-radius: 999px;
            font-weight: 800;
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            transition: transform 0.15s ease-out, box-shadow 0.2s ease, opacity 0.3s ease, border-color 0.2s ease;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            z-index: 10;
          }

          .cloud-tag.dimmed {
            opacity: 0.18 !important;
            filter: grayscale(0.8);
            pointer-events: none;
          }

          .cloud-tag:hover,
          .cloud-tag.active {
            z-index: 50 !important;
            transform: translate(-50%, -50%) scale(1.18) !important;
            box-shadow: 0 0 25px currentColor !important;
          }

          /* Categories */
          .tag-cat-llm {
            background: rgba(139, 92, 246, 0.22);
            color: #d8b4fe;
            border: 1px solid rgba(168, 85, 247, 0.5);
            box-shadow: 0 4px 14px rgba(139, 92, 246, 0.2);
          }

          .tag-cat-rag {
            background: rgba(2, 132, 199, 0.22);
            color: #7dd3fc;
            border: 1px solid rgba(56, 189, 248, 0.5);
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.2);
          }

          .tag-cat-agent {
            background: rgba(16, 185, 129, 0.22);
            color: #6ee7b7;
            border: 1px solid rgba(52, 211, 153, 0.5);
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
          }

          .tag-cat-tuning {
            background: rgba(245, 158, 11, 0.22);
            color: #fde047;
            border: 1px solid rgba(250, 204, 21, 0.5);
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.2);
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
        // AI Terms Word Cloud Interactive Engine
        (function() {
          const AI_TERMS_DATA = [
            // LLMs & Brain
            { id: 'term-llm', text: 'LLM', size: 1.5, cat: 'llm', badge: 'Core Brain', metaphor: 'A brilliant student who read the whole internet; calculates which word mathematically makes the most sense to come next.' },
            { id: 'term-llm', text: 'Transformer', size: 1.25, cat: 'llm', badge: 'Neural Model', metaphor: 'The revolutionary neural network architecture using self-attention mechanisms to weigh connections between all words in a sentence.' },
            { id: 'term-tokens', text: 'Tokens', size: 1.3, cat: 'llm', badge: 'Model Currency', metaphor: 'The syllables and text chunks that models consume as units (1,000 tokens &approx; 750 English words).' },
            { id: 'term-tokens', text: 'Context Window', size: 1.25, cat: 'llm', badge: 'Short-Term RAM', metaphor: 'The active working memory of an LLM during an ongoing session (e.g. 128k to 2M tokens).' },
            { id: 'term-temperature', text: 'Temperature', size: 1.05, cat: 'llm', badge: 'Creativity Dial', metaphor: 'A randomness setting: 0.0 is deterministic and robotic for code/SQL, while 0.8+ is creative for brainstorming.' },
            { id: 'term-prompts', text: 'System Prompt', size: 1.15, cat: 'llm', badge: 'Core Persona', metaphor: 'The immutable background instruction that establishes who the model is, its constraints, and safety guidelines.' },
            { id: 'term-prompts', text: 'Zero-Shot vs Few-Shot', size: 1.0, cat: 'llm', badge: 'Prompt Paradigm', metaphor: 'Asking the model directly with zero examples vs providing 2-3 sample demonstrations in the prompt.' },
            { id: 'term-llm', text: 'Multimodal', size: 1.15, cat: 'llm', badge: 'Vision & Audio', metaphor: 'Models capable of seeing images, processing audio, and understanding video in addition to raw text.' },

            // RAG & Vectors
            { id: 'term-rag', text: 'RAG', size: 1.6, cat: 'rag', badge: 'Enterprise Standard', metaphor: 'Retrieval-Augmented Generation: An open-book exam where the model looks up real internal company documents before answering.' },
            { id: 'term-embeddings', text: 'Vector Embeddings', size: 1.4, cat: 'rag', badge: 'Semantic Math', metaphor: 'Translating words and paragraphs into high-dimensional numerical coordinates where similar concepts sit close together.' },
            { id: 'term-embeddings', text: 'Vector DB', size: 1.35, cat: 'rag', badge: 'Semantic Index', metaphor: 'Databases (Pinecone, Qdrant, Chroma) engineered to perform nearest-neighbor searches across millions of embedding vectors in milliseconds.' },
            { id: 'term-rag', text: 'Semantic Search', size: 1.15, cat: 'rag', badge: 'Intent Retrieval', metaphor: 'Searching documents by conceptual meaning rather than exact keyword matches (e.g., query "feline" matches "cat").' },
            { id: 'term-rag', text: 'Chunking', size: 1.05, cat: 'rag', badge: 'Data Prep', metaphor: 'Splitting massive PDF manuals into optimal semantic chunks (500-1000 tokens) with overlap so context is never severed.' },
            { id: 'term-rag', text: 'Reranker', size: 1.1, cat: 'rag', badge: 'Relevance Filter', metaphor: 'A secondary specialized cross-encoder model that scores the top retrieved documents to feed only the highest quality context to the LLM.' },
            { id: 'term-embeddings', text: 'Cosine Similarity', size: 0.95, cat: 'rag', badge: 'Distance Metric', metaphor: 'Mathematical measurement of the angle between two embedding vectors to quantify how closely their meanings align.' },

            // Agents & Protocols
            { id: 'term-agentic', text: 'Agents', size: 1.55, cat: 'agent', badge: 'Autonomous Actor', metaphor: 'Autonomous software systems that don\'t just answer questions—they observe, create plans, use tools, and loop until goals are met.' },
            { id: 'term-mcp', text: 'MCP Protocol', size: 1.45, cat: 'agent', badge: 'Universal USB-C', metaphor: 'Model Context Protocol: The open standard connecting LLMs safely to local file systems, GitHub repos, and enterprise SQL databases.' },
            { id: 'term-agentic', text: 'ReAct Loops', size: 1.25, cat: 'agent', badge: 'Reason + Act', metaphor: 'Reasoning + Acting iterative loops: The agent thinks through the problem, takes an external action, inspects the result, and repeats.' },
            { id: 'term-harness', text: 'AI Harness', size: 1.25, cat: 'agent', badge: 'Execution Runtime', metaphor: 'The software harness and testing infrastructure that invokes models, manages state, executes function calls, and parses output.' },
            { id: 'term-harness', text: 'Tool Calling', size: 1.2, cat: 'agent', badge: 'Function Calling', metaphor: 'The model emitting structured JSON specifying which external API function to run and with what exact parameters.' },
            { id: 'term-agentic', text: 'Multi-Agent Swarm', size: 1.15, cat: 'agent', badge: 'Collaborative AI', metaphor: 'Teams of specialized agents (e.g. Researcher, Code Writer, Security Critic) passing messages to achieve complex workflows.' },

            // Tuning & Safety
            { id: 'term-finetuning', text: 'Fine-Tuning', size: 1.35, cat: 'tuning', badge: 'Specialization', metaphor: 'Sending a general foundation doctor model to a specialty residency to master company tone, specialized jargon, or novel tasks.' },
            { id: 'term-finetuning', text: 'LoRA', size: 1.25, cat: 'tuning', badge: 'Low-Rank Adaptation', metaphor: 'Training small lightweight adapter layers (a pair of low-rank matrices) without touching the massive base model weights.' },
            { id: 'term-evaluator', text: 'Evaluators', size: 1.2, cat: 'tuning', badge: 'LLM-as-a-Judge', metaphor: 'Automated benchmark test suites and referee LLMs that grade the accuracy, relevance, and safety of production model answers.' },
            { id: 'term-guardrails', text: 'Guardrails', size: 1.25, cat: 'tuning', badge: 'Safety Bouncer', metaphor: 'Software boundary layers intercepting prompts and outputs to block jailbreaks, PII leaks, prompt injections, and toxic responses.' },
            { id: 'term-hallucination', text: 'Hallucination', size: 1.2, cat: 'tuning', badge: 'False Conviction', metaphor: 'When an AI confidently invents false facts, incorrect citations, or nonexistent APIs because it lacks verified ground-truth context.' },
            { id: 'term-cot', text: 'Chain-of-Thought', size: 1.15, cat: 'tuning', badge: 'Reasoning Steps', metaphor: 'Instructing the model to "think step by step" before answering, drastically reducing mathematical and logic errors.' },
            { id: 'term-quantization', text: 'Quantization', size: 1.05, cat: 'tuning', badge: 'Model Compression', metaphor: 'Compressing heavy 16-bit floating point weights into 4-bit or 8-bit integers so big models fit into consumer GPU memory.' }
          ];

          let isMotionActive = true;
          let currentFilter = 'all';
          let activeTerm = AI_TERMS_DATA[0];
          let words = [];
          let animationFrameId = null;

          function initWordCloud() {
            const stage = document.getElementById('wordCloudStage');
            if (!stage) return;

            const stageRect = stage.getBoundingClientRect();
            const width = stageRect.width || 800;
            const height = stageRect.height || 380;

            stage.innerHTML = '';
            words = AI_TERMS_DATA.map((t, idx) => {
              const el = document.createElement('div');
              el.className = \`cloud-tag tag-cat-\${t.cat}\`;
              el.innerHTML = \`<span>\${t.text}</span>\`;
              el.style.fontSize = \`\${0.78 * t.size}rem\`;
              el.setAttribute('data-id', t.id);
              el.setAttribute('data-cat', t.cat);

              // Grid-dispersed initial positions with random offsets
              const cols = 6;
              const rows = Math.ceil(AI_TERMS_DATA.length / cols);
              const col = idx % cols;
              const row = Math.floor(idx / cols);

              const cellW = width / cols;
              const cellH = height / rows;

              const x = (col + 0.5) * cellW + (Math.random() - 0.5) * (cellW * 0.6);
              const y = (row + 0.5) * cellH + (Math.random() - 0.5) * (cellH * 0.6);

              const vx = (Math.random() - 0.5) * 0.55;
              const vy = (Math.random() - 0.5) * 0.55;

              el.style.left = \`\${x}px\`;
              el.style.top = \`\${y}px\`;

              // Event listeners
              el.addEventListener('mouseenter', () => inspectTerm(t));
              el.addEventListener('click', () => {
                inspectTerm(t);
                jumpToActiveTerm();
              });

              stage.appendChild(el);

              return {
                data: t,
                el: el,
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                baseX: x,
                baseY: y,
                phase: Math.random() * Math.PI * 2
              };
            });

            inspectTerm(activeTerm);
            startAnimationLoop();
          }

          function animate() {
            const stage = document.getElementById('wordCloudStage');
            if (!stage) return;
            const width = stage.clientWidth || 800;
            const height = stage.clientHeight || 380;

            if (isMotionActive) {
              const time = Date.now() * 0.001;
              words.forEach(w => {
                // Subtle sinusoidal float
                w.x += w.vx + Math.sin(time + w.phase) * 0.25;
                w.y += w.vy + Math.cos(time + w.phase) * 0.25;

                // Bounce off boundaries with margin
                const pad = 40;
                if (w.x < pad) { w.x = pad; w.vx *= -1; }
                if (w.x > width - pad) { w.x = width - pad; w.vx *= -1; }
                if (w.y < pad) { w.y = pad; w.vy *= -1; }
                if (w.y > height - pad) { w.y = height - pad; w.vy *= -1; }

                w.el.style.left = \`\${w.x}px\`;
                w.el.style.top = \`\${w.y}px\`;
              });
            }

            animationFrameId = requestAnimationFrame(animate);
          }

          function startAnimationLoop() {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(animate);
          }

          function inspectTerm(term) {
            activeTerm = term;
            const badge = document.getElementById('inspCategoryBadge');
            const name = document.getElementById('inspTermName');
            const meta = document.getElementById('inspMetaphor');

            if (badge) badge.textContent = term.badge;
            if (name) name.textContent = term.text;
            if (meta) meta.innerHTML = \`<strong>Mental Model:</strong> \${term.metaphor}\`;

            // Highlight in cloud
            words.forEach(w => {
              if (w.data.text === term.text) {
                w.el.classList.add('active');
              } else {
                w.el.classList.remove('active');
              }
            });
          }

          window.filterWordCloud = function(cat, btn) {
            currentFilter = cat;
            document.querySelectorAll('.cloud-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');

            words.forEach(w => {
              if (cat === 'all' || w.data.cat === cat) {
                w.el.classList.remove('dimmed');
              } else {
                w.el.classList.add('dimmed');
              }
            });
          };

          window.toggleCloudMotion = function() {
            isMotionActive = !isMotionActive;
            const label = document.getElementById('label-motion-state');
            const icon = document.getElementById('icon-motion-state');
            if (label) label.textContent = isMotionActive ? 'Pause Motion' : 'Resume Motion';
            if (icon) {
              icon.setAttribute('data-lucide', isMotionActive ? 'pause' : 'play');
              if (window.lucide) lucide.createIcons();
            }
          };

          window.rescatterCloud = function() {
            const stage = document.getElementById('wordCloudStage');
            if (!stage) return;
            const width = stage.clientWidth || 800;
            const height = stage.clientHeight || 380;

            words.forEach(w => {
              w.x = width * 0.15 + Math.random() * (width * 0.7);
              w.y = height * 0.15 + Math.random() * (height * 0.7);
              w.vx = (Math.random() - 0.5) * 0.7;
              w.vy = (Math.random() - 0.5) * 0.7;
              w.phase = Math.random() * Math.PI * 2;
            });
          };

          window.jumpToActiveTerm = function() {
            if (!activeTerm || !activeTerm.id) return;
            const targetEl = document.getElementById(activeTerm.id);
            if (targetEl) {
              if (targetEl.tagName.toLowerCase() === 'details') {
                targetEl.open = true;
              }
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              targetEl.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.7)';
              targetEl.style.transition = 'box-shadow 0.3s ease';
              setTimeout(() => {
                targetEl.style.boxShadow = '';
              }, 2000);
            }
          };

          document.addEventListener('DOMContentLoaded', () => {
            initWordCloud();
            window.addEventListener('resize', () => rescatterCloud(), { passive: true });
          });
        })();
        </script>
`;

// Find injection point right before `<div class="interactive-container">` in `#ai-terms`
const targetSection = '<section class="content-section" id="ai-terms">';
const interactiveContainer = '<div class="interactive-container">';

const sectionIndex = html.indexOf(targetSection);
if (sectionIndex === -1) {
  console.error('Could not find #ai-terms section');
  process.exit(1);
}

const containerIndex = html.indexOf(interactiveContainer, sectionIndex);
if (containerIndex === -1) {
  console.error('Could not find interactive-container inside #ai-terms');
  process.exit(1);
}

html = html.substring(0, containerIndex) + wordCloudHtml + '\n\n        ' + html.substring(containerIndex);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully injected Animated AI Terms Word Cloud into automation-ml-ai-agentic/index.html');
