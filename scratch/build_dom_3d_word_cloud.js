const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'automation-ml-ai-agentic', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

const existingStart = '<!-- ========================================================================= -->\n        <!-- INTERACTIVE 3D ANIMATED AI TERMS & BUZZWORDS WORD CLOUD                   -->';
const altStart = '<!-- ========================================================================= -->\n        <!-- INTERACTIVE ANIMATED AI TERMS & BUZZWORDS WORD CLOUD                      -->';
const existingEnd = '<div class="interactive-container">';

let startIndex = html.indexOf(existingStart);
if (startIndex === -1) {
  startIndex = html.indexOf(altStart);
}
const endIndex = html.indexOf(existingEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate word cloud boundaries in automation-ml-ai-agentic/index.html');
  process.exit(1);
}

const componentHtml = `<!-- ========================================================================= -->
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
                  Spin the 3D sphere with your cursor. Click any AI buzzword to inspect its plain-English mental model and jump straight to its interview guide below.
                </span>
              </div>
            </div>

            <!-- Controls -->
            <div class="word-cloud-controls">
              <div class="cloud-filter-group">
                <button type="button" class="cloud-filter-btn active" data-cat="all" onclick="filterSphereCategory('all', this)">All (28)</button>
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

          <!-- 3D DOM Sphere Stage (Guaranteed visible words on first paint) -->
          <div class="word-cloud-sphere-wrapper" id="sphereWrapper">
            <div class="word-cloud-sphere-stage" id="wordCloudStage">
              <!-- 28 Pre-Rendered High-Contrast 3D Word Badges -->
              <button type="button" class="cloud-3d-tag tag-cat-llm" data-id="term-llm" data-cat="llm" data-badge="Core Brain" data-meta="A brilliant student who read the whole internet; calculates which word mathematically makes the most sense to come next.">LLM</button>
              <button type="button" class="cloud-3d-tag tag-cat-llm" data-id="term-llm" data-cat="llm" data-badge="Neural Model" data-meta="The revolutionary neural network architecture using self-attention to weigh connections between all words in a sentence.">Transformer</button>
              <button type="button" class="cloud-3d-tag tag-cat-llm" data-id="term-tokens" data-cat="llm" data-badge="Model Currency" data-meta="The syllables and text chunks that models consume as units (1,000 tokens ≈ 750 English words).">Tokens</button>
              <button type="button" class="cloud-3d-tag tag-cat-llm" data-id="term-tokens" data-cat="llm" data-badge="Short-Term RAM" data-meta="The active working memory of an LLM during an ongoing session (e.g. 128k to 2M tokens).">Context Window</button>
              <button type="button" class="cloud-3d-tag tag-cat-llm" data-id="term-temperature" data-cat="llm" data-badge="Creativity Dial" data-meta="A randomness setting: 0.0 is deterministic and robotic for code/SQL, while 0.8+ is creative for brainstorming.">Temperature</button>
              <button type="button" class="cloud-3d-tag tag-cat-llm" data-id="term-prompts" data-cat="llm" data-badge="Core Persona" data-meta="The immutable background instruction that establishes who the model is, its constraints, and safety guidelines.">System Prompt</button>
              <button type="button" class="cloud-3d-tag tag-cat-llm" data-id="term-prompts" data-cat="llm" data-badge="Prompt Paradigm" data-meta="Asking the model directly with zero examples vs providing 2-3 sample demonstrations in the prompt.">Zero-Shot vs Few-Shot</button>
              <button type="button" class="cloud-3d-tag tag-cat-llm" data-id="term-llm" data-cat="llm" data-badge="Vision & Audio" data-meta="Models capable of seeing images, processing audio, and understanding video in addition to raw text.">Multimodal</button>

              <button type="button" class="cloud-3d-tag tag-cat-rag" data-id="term-rag" data-cat="rag" data-badge="Enterprise Standard" data-meta="Retrieval-Augmented Generation: An open-book exam where the model looks up real internal company documents before answering.">RAG</button>
              <button type="button" class="cloud-3d-tag tag-cat-rag" data-id="term-embeddings" data-cat="rag" data-badge="Semantic Math" data-meta="Translating words and paragraphs into high-dimensional numerical coordinates where similar concepts sit close together.">Vector Embeddings</button>
              <button type="button" class="cloud-3d-tag tag-cat-rag" data-id="term-embeddings" data-cat="rag" data-badge="Semantic Index" data-meta="Databases (Pinecone, Qdrant, Chroma) engineered to perform nearest-neighbor searches across millions of embedding vectors in milliseconds.">Vector DB</button>
              <button type="button" class="cloud-3d-tag tag-cat-rag" data-id="term-rag" data-cat="rag" data-badge="Intent Retrieval" data-meta="Searching documents by conceptual meaning rather than exact keyword matches (e.g., query feline matches cat).">Semantic Search</button>
              <button type="button" class="cloud-3d-tag tag-cat-rag" data-id="term-rag" data-cat="rag" data-badge="Data Prep" data-meta="Splitting massive PDF manuals into optimal semantic chunks (500-1000 tokens) with overlap so context is never severed.">Chunking</button>
              <button type="button" class="cloud-3d-tag tag-cat-rag" data-id="term-rag" data-cat="rag" data-badge="Relevance Filter" data-meta="A secondary specialized cross-encoder model that scores the top retrieved documents to feed only the highest quality context to the LLM.">Reranker</button>
              <button type="button" class="cloud-3d-tag tag-cat-rag" data-id="term-embeddings" data-cat="rag" data-badge="Distance Metric" data-meta="Mathematical measurement of the angle between two embedding vectors to quantify how closely their meanings align.">Cosine Similarity</button>

              <button type="button" class="cloud-3d-tag tag-cat-agent" data-id="term-agentic" data-cat="agent" data-badge="Autonomous Actor" data-meta="Autonomous software systems that do not just answer questions—they observe, create plans, use tools, and loop until goals are met.">Agents</button>
              <button type="button" class="cloud-3d-tag tag-cat-agent" data-id="term-mcp" data-cat="agent" data-badge="Universal USB-C" data-meta="Model Context Protocol: The open standard connecting LLMs safely to local file systems, GitHub repos, and enterprise SQL databases.">MCP Protocol</button>
              <button type="button" class="cloud-3d-tag tag-cat-agent" data-id="term-agentic" data-cat="agent" data-badge="Reason + Act" data-meta="Reasoning + Acting iterative loops: The agent thinks through the problem, takes an external action, inspects the result, and repeats.">ReAct Loops</button>
              <button type="button" class="cloud-3d-tag tag-cat-agent" data-id="term-harness" data-cat="agent" data-badge="Execution Runtime" data-meta="The software harness and testing infrastructure that invokes models, manages state, executes function calls, and parses output.">AI Harness</button>
              <button type="button" class="cloud-3d-tag tag-cat-agent" data-id="term-harness" data-cat="agent" data-badge="Function Calling" data-meta="The model emitting structured JSON specifying which external API function to run and with what exact parameters.">Tool Calling</button>
              <button type="button" class="cloud-3d-tag tag-cat-agent" data-id="term-agentic" data-cat="agent" data-badge="Collaborative AI" data-meta="Teams of specialized agents (e.g. Researcher, Code Writer, Security Critic) passing messages to achieve complex workflows.">Multi-Agent Swarm</button>

              <button type="button" class="cloud-3d-tag tag-cat-tuning" data-id="term-finetuning" data-cat="tuning" data-badge="Specialization" data-meta="Sending a general foundation doctor model to a specialty residency to master company tone, specialized jargon, or novel tasks.">Fine-Tuning</button>
              <button type="button" class="cloud-3d-tag tag-cat-tuning" data-id="term-finetuning" data-cat="tuning" data-badge="Low-Rank Adaptation" data-meta="Training small lightweight adapter layers (a pair of low-rank matrices) without touching the massive base model weights.">LoRA</button>
              <button type="button" class="cloud-3d-tag tag-cat-tuning" data-id="term-evaluator" data-cat="tuning" data-badge="LLM-as-a-Judge" data-meta="Automated benchmark test suites and referee LLMs that grade the accuracy, relevance, and safety of production model answers.">Evaluators</button>
              <button type="button" class="cloud-3d-tag tag-cat-tuning" data-id="term-guardrails" data-cat="tuning" data-badge="Safety Bouncer" data-meta="Software boundary layers intercepting prompts and outputs to block jailbreaks, PII leaks, prompt injections, and toxic responses.">Guardrails</button>
              <button type="button" class="cloud-3d-tag tag-cat-tuning" data-id="term-hallucination" data-cat="tuning" data-badge="False Conviction" data-meta="When an AI confidently invents false facts, incorrect citations, or nonexistent APIs because it lacks verified ground-truth context.">Hallucination</button>
              <button type="button" class="cloud-3d-tag tag-cat-tuning" data-id="term-cot" data-cat="tuning" data-badge="Reasoning Steps" data-meta="Instructing the model to think step by step before answering, drastically reducing mathematical and logic errors.">Chain-of-Thought</button>
              <button type="button" class="cloud-3d-tag tag-cat-tuning" data-id="term-quantization" data-cat="tuning" data-badge="Model Compression" data-meta="Compressing heavy 16-bit floating point weights into 4-bit or 8-bit integers so big models fit into consumer GPU memory.">Quantization</button>
            </div>

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

          /* 3D Sphere Stage */
          .word-cloud-sphere-wrapper {
            position: relative;
            width: 100%;
            height: 420px;
            border-radius: 14px;
            overflow: hidden;
            background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 100%);
            border: 1px solid rgba(139, 92, 246, 0.35);
            box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.65);
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
            padding: 5px 13px;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 800;
            cursor: pointer;
            white-space: nowrap;
            user-select: none;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transition: box-shadow 0.2s ease, opacity 0.3s ease;
            outline: none;
          }

          .cloud-3d-tag.dimmed {
            opacity: 0.08 !important;
            filter: grayscale(1);
            pointer-events: none;
          }

          .cloud-3d-tag:hover,
          .cloud-3d-tag.active {
            z-index: 1000 !important;
            box-shadow: 0 0 25px currentColor !important;
            color: #ffffff !important;
          }

          /* Tag Theme Colors */
          .tag-cat-llm {
            background: rgba(139, 92, 246, 0.25);
            color: #d8b4fe;
            border: 1px solid rgba(168, 85, 247, 0.55);
            box-shadow: 0 4px 14px rgba(139, 92, 246, 0.25);
          }

          .tag-cat-rag {
            background: rgba(2, 132, 199, 0.25);
            color: #7dd3fc;
            border: 1px solid rgba(56, 189, 248, 0.55);
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.25);
          }

          .tag-cat-agent {
            background: rgba(16, 185, 129, 0.25);
            color: #6ee7b7;
            border: 1px solid rgba(52, 211, 153, 0.55);
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
          }

          .tag-cat-tuning {
            background: rgba(245, 158, 11, 0.25);
            color: #fde047;
            border: 1px solid rgba(250, 204, 21, 0.55);
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.25);
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
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            font-size: 0.72rem;
            color: #cbd5e1;
            pointer-events: none;
            letter-spacing: 0.02em;
            z-index: 10;
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
        // DOM-BASED 3D SPHERICAL WORD CLOUD ENGINE
        // =====================================================================
        (function() {
          let sphereWrapper, stage;
          let tagElements = [];
          let tagPoints = [];
          let radius = 155;
          let currentFilter = 'all';
          let isRotating = true;
          let isDragging = false;
          let lastMouseX = 0, lastMouseY = 0;
          let velX = 0.003, velY = 0.004;
          let animId = null;
          let activeTargetId = 'term-llm';

          function initSpherePoints() {
            tagElements = Array.from(document.querySelectorAll('#wordCloudStage .cloud-3d-tag'));
            const count = tagElements.length;
            if (count === 0) return;

            const rect = sphereWrapper ? sphereWrapper.getBoundingClientRect() : { width: 800, height: 420 };
            const minDim = Math.min(rect.width || 800, rect.height || 420);
            radius = Math.max(120, minDim * 0.38);

            tagPoints = tagElements.map(function(el, i) {
              const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
              const theta = Math.PI * (1 + Math.sqrt(5)) * i;

              return {
                el: el,
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.cos(phi),
                z: radius * Math.sin(phi) * Math.sin(theta)
              };
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
            if (isRotating && !isDragging) {
              rotateY(velY);
              rotateX(velX);
            }

            const perspective = 350;

            for (let i = 0; i < tagPoints.length; i++) {
              const p = tagPoints[i];
              const scale = perspective / (perspective - p.z);
              const screenX = Math.round(p.x * scale);
              const screenY = Math.round(p.y * scale);
              const normZ = (p.z + radius) / (2 * radius);
              const alpha = Math.max(0.22, Math.min(1.0, 0.35 + 0.65 * normZ));
              const zIndex = Math.round(p.z + 500);

              p.el.style.transform = 'translate3d(' + screenX + 'px, ' + screenY + 'px, 0) translate(-50%, -50%) scale(' + scale.toFixed(3) + ')';
              p.el.style.opacity = alpha.toFixed(3);
              p.el.style.zIndex = zIndex;
            }

            animId = requestAnimationFrame(updateSphereFrame);
          }

          function inspectTagElement(el) {
            if (!el) return;
            const badge = document.getElementById('inspCategoryBadge');
            const name = document.getElementById('inspTermName');
            const meta = document.getElementById('inspMetaphor');

            const text = el.textContent || '';
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
              if (window.lucide) lucide.createIcons();
            }
          };

          window.resetSphereView = function() {
            initSpherePoints();
            velX = 0.003;
            velY = 0.004;
          };

          window.jumpToActiveSphereTerm = function() {
            if (!activeTargetId) return;
            const targetEl = document.getElementById(activeTargetId);
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
              }
            });

            tagElements.forEach(function(el) {
              el.addEventListener('mouseenter', function() {
                inspectTagElement(el);
              });

              el.addEventListener('click', function(e) {
                e.stopPropagation();
                inspectTagElement(el);
                window.jumpToActiveSphereTerm();
              });
            });
          }

          function startSphere() {
            sphereWrapper = document.getElementById('sphereWrapper');
            stage = document.getElementById('wordCloudStage');
            if (!sphereWrapper || !stage) return;

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
        </script>
`;

html = html.substring(0, startIndex) + componentHtml + '\n\n        ' + html.substring(endIndex);

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully installed DOM 3D Word Cloud Sphere into automation-ml-ai-agentic/index.html');
