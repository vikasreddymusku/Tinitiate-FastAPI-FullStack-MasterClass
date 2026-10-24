const fs = require('fs');

const terms = [
  // Category: LLMs & Brain
  { tag: "LLM", cat: "llm", id: "term-llm", badge: "Core Brain", meta: "A brilliant student who read the whole internet; calculates which word mathematically makes the most sense to come next." },
  { tag: "Transformer", cat: "llm", id: "term-transformer", badge: "Neural Model", meta: "The revolutionary neural network architecture using self-attention mechanisms to weigh connections between all words in a sentence." },
  { tag: "Tokens", cat: "llm", id: "term-tokens", badge: "Model Currency", meta: "The syllables and text chunks that models consume as billing and compute units (1,000 tokens ≈ 750 English words)." },
  { tag: "Context Window", cat: "llm", id: "term-context-window", badge: "Short-Term RAM", meta: "The active working memory of an LLM during an ongoing session (e.g. 128k to 2M tokens)." },
  { tag: "Temperature", cat: "llm", id: "term-temperature", badge: "Creativity Dial", meta: "A randomness setting: 0.0 is deterministic and robotic for code/SQL, while 0.8+ is creative for brainstorming." },
  { tag: "System Prompt", cat: "llm", id: "term-prompts", badge: "Core Persona", meta: "The immutable background instruction that establishes who the model is, its constraints, and safety guidelines." },
  { tag: "Zero-Shot vs Few-Shot", cat: "llm", id: "term-fewshot", badge: "Prompt Paradigm", meta: "Asking the model directly with zero examples vs providing 2-3 sample demonstrations in the prompt." },
  { tag: "Multimodal", cat: "llm", id: "term-multimodal", badge: "Vision & Audio", meta: "Models capable of seeing images, processing audio, and understanding video in addition to raw text." },
  { tag: "Inference", cat: "llm", id: "term-inference", badge: "Live Serving", meta: "The runtime execution process of running input prompts through a trained neural network to generate answers." },
  { tag: "Latency & TTFT", cat: "llm", id: "term-latency", badge: "Speed Metrics", meta: "Time-To-First-Token (TTFT) and token streaming rate measuring how snappy an AI application feels to users." },

  // Category: RAG & Vectors
  { tag: "RAG", cat: "rag", id: "term-rag", badge: "Enterprise Standard", meta: "Retrieval-Augmented Generation: An open-book exam where the model looks up real internal company documents before answering." },
  { tag: "Vector Embeddings", cat: "rag", id: "term-embeddings", badge: "Semantic Math", meta: "Translating words and paragraphs into high-dimensional numerical coordinates where similar concepts sit close together." },
  { tag: "Vector DB", cat: "rag", id: "term-vectordb", badge: "Semantic Index", meta: "Databases (Pinecone, Qdrant, Chroma) engineered to perform nearest-neighbor searches across millions of embedding vectors in milliseconds." },
  { tag: "Semantic Search", cat: "rag", id: "term-semantic-search", badge: "Intent Retrieval", meta: "Searching documents by conceptual meaning rather than exact keyword matches (e.g., query feline matches cat)." },
  { tag: "Chunking", cat: "rag", id: "term-chunking", badge: "Data Prep", meta: "Splitting massive PDF manuals into optimal semantic chunks (500-1000 tokens) with overlap so context is never severed." },
  { tag: "Reranker", cat: "rag", id: "term-reranker", badge: "Relevance Filter", meta: "A secondary specialized cross-encoder model that scores the top retrieved documents to feed only the highest quality context to the LLM." },
  { tag: "Cosine Similarity", cat: "rag", id: "term-cosine-similarity", badge: "Distance Metric", meta: "Mathematical measurement of the angle between two embedding vectors to quantify how closely their meanings align." },

  // Category: Agents & MCP
  { tag: "Agents", cat: "agent", id: "term-agentic", badge: "Autonomous Actor", meta: "Autonomous software systems that do not just answer questions—they observe, create plans, use tools, and loop until goals are met." },
  { tag: "MCP Protocol", cat: "agent", id: "term-mcp", badge: "Universal USB-C", meta: "Model Context Protocol: The open standard connecting LLMs safely to local file systems, GitHub repos, and enterprise SQL databases." },
  { tag: "ReAct Loops", cat: "agent", id: "term-react-loops", badge: "Reason + Act", meta: "Reasoning + Acting iterative loops: The agent thinks through the problem, takes an external action, inspects the result, and repeats." },
  { tag: "AI Harness", cat: "agent", id: "term-harness", badge: "Execution Runtime", meta: "The software harness and testing infrastructure that invokes models, manages state, executes function calls, and parses output." },
  { tag: "Tool Calling", cat: "agent", id: "term-tool-calling", badge: "Function Calling", meta: "The model emitting structured JSON specifying which external API function to run and with what exact parameters." },
  { tag: "Multi-Agent Swarm", cat: "agent", id: "term-swarm", badge: "Collaborative AI", meta: "Teams of specialized agents (e.g. Researcher, Code Writer, Security Critic) passing messages to achieve complex workflows." },

  // Category: Tuning & Safety
  { tag: "Fine-Tuning", cat: "tuning", id: "term-finetuning", badge: "Specialization", meta: "Sending a general foundation doctor model to a specialty residency to master company tone, specialized jargon, or novel tasks." },
  { tag: "LoRA", cat: "tuning", id: "term-lora", badge: "Low-Rank Adaptation", meta: "Training small lightweight adapter layers (a pair of low-rank matrices) without touching the massive base model weights." },
  { tag: "Evaluators", cat: "tuning", id: "term-evaluator", badge: "LLM-as-a-Judge", meta: "Automated benchmark test suites and referee LLMs that grade the accuracy, relevance, and safety of production model answers." },
  { tag: "Guardrails", cat: "tuning", id: "term-guardrails", badge: "Safety Bouncer", meta: "Software boundary layers intercepting prompts and outputs to block jailbreaks, PII leaks, prompt injections, and toxic responses." },
  { tag: "Hallucination", cat: "tuning", id: "term-hallucination", badge: "False Conviction", meta: "When an AI confidently invents false facts, incorrect citations, or nonexistent APIs because it lacks verified ground-truth context." },
  { tag: "Chain-of-Thought", cat: "tuning", id: "term-cot", badge: "Reasoning Steps", meta: "Instructing the model to think step by step before answering, drastically reducing mathematical and logic errors." },
  { tag: "Quantization", cat: "tuning", id: "term-quantization", badge: "Model Compression", meta: "Compressing heavy 16-bit floating point weights into 4-bit or 8-bit integers so big models fit into consumer GPU memory." }
];

const buttonsHtml = terms.map(t => 
  `              <button type="button" class="cloud-3d-tag tag-cat-${t.cat}" data-id="${t.id}" data-cat="${t.cat}" data-badge="${t.badge}" data-meta="${t.meta.replace(/"/g, '&quot;')}">${t.tag}</button>`
).join('\n');

const widgetHtml = `<!-- ========================================================================= -->
        <!-- 3D INTERACTIVE DOM-POWERED AI TERMS & BUZZWORDS WORD CLOUD SPHERE         -->
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
                  Spin the 3D constellation sphere by hovering or dragging. Click any AI buzzword to inspect its plain-English mental model and jump straight to its interview deep dive below.
                </span>
              </div>
            </div>

            <!-- Controls -->
            <div class="word-cloud-controls">
              <div class="cloud-filter-group">
                <button type="button" class="cloud-filter-btn active" data-cat="all" onclick="filterSphereCategory('all', this)">All (30)</button>
                <button type="button" class="cloud-filter-btn" data-cat="llm" onclick="filterSphereCategory('llm', this)">LLMs &amp; Brain</button>
                <button type="button" class="cloud-filter-btn" data-cat="rag" onclick="filterSphereCategory('rag', this)">RAG &amp; Vectors</button>
                <button type="button" class="cloud-filter-btn" data-cat="agent" onclick="filterSphereCategory('agent', this)">Agents &amp; MCP</button>
                <button type="button" class="cloud-filter-btn" data-cat="tuning" onclick="filterSphereCategory('tuning', this)">Tuning &amp; Safety</button>
              </div>

              <div class="cloud-action-btns">
                <button type="button" class="cloud-action-btn" id="btn-sphere-motion" onclick="toggleSphereRotation()" title="Pause or Resume 3D Spin">
                  <i data-lucide="pause" style="width:13px;height:13px;" id="icon-sphere-motion"></i>
                  <span id="label-sphere-motion">Pause Spin</span>
                </button>
                <button type="button" class="cloud-action-btn" onclick="resetSphereView()" title="Center Sphere">
                  <i data-lucide="rotate-ccw" style="width:13px;height:13px;"></i>
                  <span>Center View</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 3D DOM Ellipsoidal Constellation Stage -->
          <div class="word-cloud-sphere-wrapper" id="sphereWrapper">
            <div class="word-cloud-sphere-stage" id="wordCloudStage">
${buttonsHtml}
            </div>

            <div class="cloud-hint-badge">
              <i data-lucide="hand" style="width:12px;height:12px;"></i>
              <span>Move cursor or drag to spin 3D constellation &bull; Click any term to inspect &amp; jump</span>
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
            <button type="button" class="inspector-jump-btn" id="inspJumpBtn" onclick="jumpToActiveSphereTerm()">
              <span>Jump to Deep Dive</span>
              <i data-lucide="arrow-down" style="width:14px;height:14px;"></i>
            </button>
          </div>
        </div>

        <style>
          /* 3D DOM-Powered Animated Word Cloud Sphere Styles */
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

          /* 3D Ellipsoid Constellation Stage */
          .word-cloud-sphere-wrapper {
            position: relative;
            width: 100%;
            height: 440px;
            border-radius: 14px;
            overflow: hidden;
            background: radial-gradient(ellipse at 50% 50%, #17113a 0%, #0a0e1a 100%);
            border: 1px solid rgba(139, 92, 246, 0.35);
            box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.75);
            cursor: grab;
            user-select: none;
          }

          .word-cloud-sphere-wrapper:active {
            cursor: grabbing;
          }

          .word-cloud-sphere-wrapper::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 32px 32px;
            pointer-events: none;
          }

          .word-cloud-sphere-stage {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            transform-style: preserve-3d;
          }

          .cloud-3d-tag {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
            will-change: transform, opacity;
            padding: 5px 12px;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            user-select: none;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transition: box-shadow 0.2s ease, opacity 0.25s ease, border-color 0.2s ease;
            outline: none;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .cloud-3d-tag.dimmed {
            opacity: 0.1 !important;
            filter: grayscale(1);
            pointer-events: none;
          }

          .cloud-3d-tag:hover,
          .cloud-3d-tag.active {
            z-index: 1000 !important;
            box-shadow: 0 0 25px currentColor !important;
            border-color: #ffffff !important;
            color: #ffffff !important;
            transform: translate3d(var(--tx, 0), var(--ty, 0), 0) translate(-50%, -50%) scale(1.3) !important;
          }

          /* Tag Theme Colors */
          .tag-cat-llm {
            background: rgba(88, 28, 135, 0.65);
            color: #d8b4fe;
            border-color: rgba(168, 85, 247, 0.6);
            box-shadow: 0 2px 10px rgba(139, 92, 246, 0.25);
          }

          .tag-cat-rag {
            background: rgba(3, 105, 161, 0.65);
            color: #7dd3fc;
            border-color: rgba(56, 189, 248, 0.6);
            box-shadow: 0 2px 10px rgba(2, 132, 199, 0.25);
          }

          .tag-cat-agent {
            background: rgba(6, 95, 70, 0.65);
            color: #a7f3d0;
            border-color: rgba(52, 211, 153, 0.6);
            box-shadow: 0 2px 10px rgba(16, 185, 129, 0.25);
          }

          .tag-cat-tuning {
            background: rgba(146, 64, 14, 0.65);
            color: #fde68a;
            border-color: rgba(251, 191, 36, 0.6);
            box-shadow: 0 2px 10px rgba(245, 158, 11, 0.25);
          }

          .cloud-hint-badge {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #cbd5e1;
            padding: 5px 14px;
            border-radius: 999px;
            font-size: 0.72rem;
            pointer-events: none;
            backdrop-filter: blur(6px);
            z-index: 10;
          }

          /* Live Inspector Ribbon */
          .word-cloud-inspector {
            background: linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(59, 130, 246, 0.06) 100%);
            border: 1.5px solid rgba(139, 92, 246, 0.3);
            border-radius: 12px;
            padding: 14px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 14px;
            transition: all 0.25s ease;
          }

          .inspector-term-pill {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .inspector-badge {
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: #7c3aed;
            color: #ffffff;
            padding: 3px 9px;
            border-radius: 6px;
          }

          .inspector-name {
            font-size: 1.05rem;
            font-weight: 800;
            color: var(--text-main, #0f172a);
          }

          .inspector-metaphor {
            flex: 1;
            min-width: 260px;
            margin: 0;
            font-size: 0.85rem;
            color: var(--text-muted, #475569);
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
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
          }

          .inspector-jump-btn:hover {
            background: #6d28d9;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(124, 58, 237, 0.45);
          }
        </style>

        <script>
        // =====================================================================
        // DOM-BASED 3D MULTI-BAND ELLIPSOIDAL CONSTELLATION WORD CLOUD ENGINE
        // =====================================================================
        (function() {
          let sphereWrapper, stage;
          let tagElements = [];
          let tagPoints = [];
          let radiusX = 350, radiusY = 145, radiusZ = 220;
          let currentFilter = 'all';
          let isRotating = true;
          let isHovered = false;
          let isDragging = false;
          let lastMouseX = 0, lastMouseY = 0;
          let velX = 0.002, velY = 0.0035;
          let animId = null;
          let activeTargetId = 'term-llm';

          function initSpherePoints() {
            sphereWrapper = document.getElementById('sphereWrapper');
            stage = document.getElementById('wordCloudStage');
            if (!sphereWrapper || !stage) return;

            tagElements = Array.from(stage.querySelectorAll('.cloud-3d-tag'));
            const count = tagElements.length;
            if (count === 0) return;

            const rect = sphereWrapper.getBoundingClientRect();
            const w = rect.width > 100 ? rect.width : (sphereWrapper.offsetWidth || 860);
            const h = rect.height > 100 ? rect.height : (sphereWrapper.offsetHeight || 440);

            radiusX = Math.min(360, Math.max(260, w * 0.38));
            radiusY = Math.min(150, Math.max(115, h * 0.33));
            radiusZ = Math.min(230, Math.max(160, radiusX * 0.65));

            // Distribute across 3 inclined orbital bands so words spread across full screen with zero pole clustering
            tagPoints = tagElements.map(function(el, i) {
              const band = i % 3;
              const bandY = (band === 0 ? -0.55 : (band === 1 ? 0 : 0.55)) * radiusY;
              const bandRadiusFactor = Math.sqrt(Math.max(0.2, 1 - Math.pow(bandY / radiusY, 2)));
              const angle = (Math.floor(i / 3) / Math.ceil(count / 3)) * 2 * Math.PI + (band * 0.7);

              const p = {
                el: el,
                x: radiusX * 0.95 * bandRadiusFactor * Math.cos(angle),
                y: bandY + (Math.sin(angle * 2) * 15),
                z: radiusZ * bandRadiusFactor * Math.sin(angle)
              };

              // Apply initial orbital diagonal tilt
              const tiltAngle = 0.25;
              const cosT = Math.cos(tiltAngle);
              const sinT = Math.sin(tiltAngle);
              const y1 = p.y * cosT - p.z * sinT;
              const z1 = p.z * cosT + p.y * sinT;
              p.y = y1;
              p.z = z1;
              return p;
            });
          }

          function rotateX(angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            for (let i = 0; i < tagPoints.length; i++) {
              const p = tagPoints[i];
              const y1 = p.y * cos - p.z * sin;
              const z1 = p.z * cos + p.y * sin;
              p.y = y1;
              p.z = z1;
            }
          }

          function rotateY(angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            for (let i = 0; i < tagPoints.length; i++) {
              const p = tagPoints[i];
              const x1 = p.x * cos - p.z * sin;
              const z1 = p.x * cos + p.y * sin;
              p.x = x1;
              p.z = z1;
            }
          }

          function updateSphereFrame() {
            if (isRotating && !isDragging && !isHovered) {
              rotateY(velY);
              rotateX(velX);
            }

            const perspective = 450;

            for (let i = 0; i < tagPoints.length; i++) {
              const p = tagPoints[i];
              const scale = perspective / (perspective - p.z);
              const screenX = Math.round(p.x * scale);
              const screenY = Math.round(p.y * scale);
              const normZ = (p.z + radiusZ) / (2 * radiusZ);
              const alpha = Math.max(0.4, Math.min(1.0, 0.45 + 0.55 * normZ));
              const zIndex = Math.round(p.z + 500);

              p.el.style.setProperty('--tx', screenX + 'px');
              p.el.style.setProperty('--ty', screenY + 'px');
              p.el.style.transform = 'translate3d(' + screenX + 'px, ' + screenY + 'px, 0) translate(-50%, -50%) scale(' + scale.toFixed(3) + ')';
              p.el.style.opacity = alpha.toFixed(2);
              p.el.style.zIndex = zIndex;
            }

            animId = requestAnimationFrame(updateSphereFrame);
          }

          function inspectTagElement(el) {
            if (!el) return;
            const badge = document.getElementById('inspCategoryBadge');
            const name = document.getElementById('inspTermName');
            const meta = document.getElementById('inspMetaphor');

            const text = el.textContent.trim();
            const bText = el.getAttribute('data-badge') || 'Core Concept';
            const mText = el.getAttribute('data-meta') || '';
            activeTargetId = el.getAttribute('data-id') || 'term-llm';

            if (badge) badge.textContent = bText;
            if (name) name.textContent = text;
            if (meta) meta.innerHTML = '<strong>Mental Model:</strong> ' + mText;

            tagElements.forEach(function(t) {
              if (t === el) t.classList.add('active');
              else t.classList.remove('active');
            });
          }

          window.filterSphereCategory = function(cat, btn) {
            currentFilter = cat;
            document.querySelectorAll('.cloud-filter-btn').forEach(function(b) { b.classList.remove('active'); });
            if (btn) btn.classList.add('active');

            tagElements.forEach(function(el) {
              const tagCat = el.getAttribute('data-cat');
              if (cat === 'all' || tagCat === cat) {
                el.classList.remove('dimmed');
              } else {
                el.classList.add('dimmed');
              }
            });
          };

          window.toggleSphereRotation = function() {
            isRotating = !isRotating;
            const label = document.getElementById('label-sphere-motion');
            const icon = document.getElementById('icon-sphere-motion');
            if (label) label.textContent = isRotating ? 'Pause Spin' : 'Resume Spin';
            if (icon) {
              icon.setAttribute('data-lucide', isRotating ? 'pause' : 'play');
              if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
            }
          };

          window.resetSphereView = function() {
            initSpherePoints();
            velX = 0.002;
            velY = 0.0035;
          };

          window.jumpToActiveSphereTerm = function(targetId) {
            const id = targetId || activeTargetId;
            if (!id) return;
            let targetEl = document.getElementById(id);
            if (!targetEl) {
              targetEl = document.getElementById('term-llm');
            }
            if (targetEl) {
              const box = targetEl.closest('details.interactive-box') || (targetEl.tagName.toLowerCase() === 'details' ? targetEl : null);
              if (box) {
                box.open = true;
              }
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              
              const highlightTarget = box || targetEl;
              highlightTarget.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
              highlightTarget.style.boxShadow = '0 0 35px rgba(139, 92, 246, 0.9)';
              highlightTarget.style.borderColor = '#8b5cf6';
              setTimeout(function() {
                highlightTarget.style.boxShadow = '';
                highlightTarget.style.borderColor = '';
              }, 2400);
            }
          };

          function setupSphereInteractivity() {
            if (!sphereWrapper) return;

            sphereWrapper.addEventListener('mousedown', function(e) {
              isDragging = true;
              lastMouseX = e.clientX;
              lastMouseY = e.clientY;
            });

            window.addEventListener('mouseup', function() {
              isDragging = false;
            });

            sphereWrapper.addEventListener('mousemove', function(e) {
              if (isDragging) {
                const dx = e.clientX - lastMouseX;
                const dy = e.clientY - lastMouseY;
                rotateY(dx * 0.005);
                rotateX(-dy * 0.005);
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
              } else {
                const rect = sphereWrapper.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                velY = ((e.clientX - cx) / rect.width) * 0.01;
                velX = -((e.clientY - cy) / rect.height) * 0.006;
              }
            });

            sphereWrapper.addEventListener('mouseleave', function() {
              velX = 0.002;
              velY = 0.0035;
            });

            tagElements.forEach(function(el) {
              el.addEventListener('mouseenter', function() {
                isHovered = true;
                inspectTagElement(el);
              });

              el.addEventListener('mouseleave', function() {
                isHovered = false;
              });

              el.addEventListener('click', function(e) {
                e.stopPropagation();
                inspectTagElement(el);
                window.jumpToActiveSphereTerm(el.getAttribute('data-id'));
              });
            });
          }

          function startSphere() {
            initSpherePoints();
            setupSphereInteractivity();

            if (tagElements.length > 0) {
              inspectTagElement(tagElements[0]);
            }

            if (animId) cancelAnimationFrame(animId);
            animId = requestAnimationFrame(updateSphereFrame);

            window.addEventListener('resize', function() {
              initSpherePoints();
            }, { passive: true });
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startSphere);
          } else {
            startSphere();
          }
        })();
        </script>`;

const filePath = 'automation-ml-ai-agentic/index.html';
let html = fs.readFileSync(filePath, 'utf8');

const startMarker = "<!-- ========================================================================= -->\n        <!-- 3D INTERACTIVE DOM-POWERED AI TERMS & BUZZWORDS WORD CLOUD SPHERE         -->";
const endMarker = '<div class="interactive-container">';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find markers!', { startIdx, endIdx });
  process.exit(1);
}

html = html.substring(0, startIdx) + widgetHtml + '\n\n        ' + html.substring(endIdx);

// Add the missing RAG sub-chips with IDs
html = html.replace(
  '<span class="box-chip">Vector DB</span>\n                    <span class="box-chip">Pinecone</span>',
  '<span class="box-chip" id="term-embeddings">Vector Embeddings</span>\n                    <span class="box-chip" id="term-vectordb">Vector DB (Pinecone, Chroma)</span>\n                    <span class="box-chip" id="term-semantic-search">Semantic Search</span>\n                    <span class="box-chip" id="term-chunking">Chunking</span>\n                    <span class="box-chip" id="term-reranker">Reranker</span>\n                    <span class="box-chip" id="term-cosine-similarity">Cosine Similarity</span>'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully written enhanced constellation to automation-ml-ai-agentic/index.html!');
