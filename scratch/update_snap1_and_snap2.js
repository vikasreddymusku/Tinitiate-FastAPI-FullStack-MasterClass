const fs = require('fs');

let html = fs.readFileSync('automation-ml-ai-agentic/demo.html', 'utf8');

// 1. ADD NEW CSS RULES FOR SNAP 1 & SNAP 2 (TICKER, MOTION GRAPHIC, FIXED BOX)
const newCss = `
    /* ==========================================================================
       SNAP 01: INTRODUCTION, WHAT IS AI & EVOLUTION SHOWCASE
       ========================================================================== */
    .what-is-ai-card {
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(37, 99, 235, 0.05) 100%);
      border: 1px solid rgba(124, 58, 237, 0.25);
      border-left: 5px solid #7c3aed;
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 22px;
      box-shadow: 0 4px 18px rgba(124, 58, 237, 0.06);
    }

    .what-is-ai-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 800;
      color: #7c3aed;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 10px;
    }

    .ai-def-line {
      font-size: 0.98rem;
      color: #1e293b;
      line-height: 1.55;
      margin: 0 0 8px 0;
      font-weight: 500;
    }

    .ai-def-line:last-child {
      margin-bottom: 0;
      color: #475569;
    }

    .ai-def-line strong {
      color: #0f172a;
      font-weight: 700;
    }

    /* Evolution Dual Display: Image + Motion Graphic */
    .evolution-dual-grid {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 20px;
      margin-bottom: 22px;
      align-items: stretch;
    }

    .evolution-image-frame {
      background: #090d16;
      border-radius: 14px;
      border: 1px solid rgba(124, 58, 237, 0.3);
      padding: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .evolution-image-frame img {
      width: 100%;
      height: auto;
      border-radius: 10px;
      display: block;
      transition: transform 0.3s ease;
    }

    .evolution-image-frame:hover img {
      transform: scale(1.02);
    }

    .evolution-img-caption {
      margin-top: 8px;
      font-size: 0.74rem;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
    }

    /* Motion Graphic Flow */
    .evolution-motion-card {
      background: #0b0f19;
      border-radius: 14px;
      border: 1px solid #1e293b;
      padding: 16px 20px;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      position: relative;
    }

    .motion-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }

    .motion-live-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.68rem;
      font-weight: 800;
      text-transform: uppercase;
      color: #10b981;
      letter-spacing: 0.05em;
    }

    .motion-flow-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 4px 0;
    }

    .motion-stage-row {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      padding: 8px 12px;
      transition: all 0.25s ease;
    }

    .motion-stage-row:hover {
      background: rgba(124, 58, 237, 0.15);
      border-color: rgba(124, 58, 237, 0.4);
      transform: translateX(4px);
    }

    .motion-stage-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #ffffff;
      font-size: 0.85rem;
    }

    .motion-stage-icon.s1 { background: linear-gradient(135deg, #64748b, #475569); }
    .motion-stage-icon.s2 { background: linear-gradient(135deg, #0284c7, #0369a1); }
    .motion-stage-icon.s3 { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
    .motion-stage-icon.s4 { background: linear-gradient(135deg, #10b981, #059669); }

    .motion-stage-body {
      flex: 1;
    }

    .motion-stage-name {
      font-size: 0.84rem;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .motion-stage-desc {
      font-size: 0.74rem;
      color: #94a3b8;
    }

    .motion-arrow-connector {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #7c3aed;
      margin: -4px 0;
      animation: pulseFlow 1.8s infinite ease-in-out;
    }

    @keyframes pulseFlow {
      0%, 100% { opacity: 0.4; transform: scale(0.95); }
      50% { opacity: 1; transform: scale(1.1); color: #38bdf8; }
    }

    /* AWESOME FIXED / HIGHLIGHT INSTRUCTOR CREDENTIALS BOX */
    .venkata-awesome-box {
      background: linear-gradient(135deg, #0a0f1d 0%, #111827 50%, #1e1136 100%);
      border: 1px solid rgba(168, 85, 247, 0.35);
      border-radius: 14px;
      padding: 16px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      position: relative;
      overflow: hidden;
    }

    .venkata-awesome-box::before {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 60%);
      pointer-events: none;
    }

    .venkata-profile-left {
      display: flex;
      align-items: center;
      gap: 16px;
      z-index: 1;
    }

    .venkata-avatar-ring {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #a855f7, #3b82f6);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 900;
      font-size: 1.1rem;
      box-shadow: 0 0 18px rgba(124, 58, 237, 0.5);
      flex-shrink: 0;
      position: relative;
    }

    .venkata-verified-badge {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #10b981;
      border: 2px solid #0a0f1d;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
    }

    .venkata-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .venkata-title-line {
      font-size: 1.05rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .venkata-exp-line {
      font-size: 0.86rem;
      color: #cbd5e1;
      font-weight: 500;
    }

    .venkata-exp-line strong {
      color: #38bdf8;
    }

    .venkata-pills-right {
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 1;
      flex-wrap: wrap;
    }

    .venkata-pill {
      font-size: 0.72rem;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #e2e8f0;
      padding: 4px 10px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }

    /* ==========================================================================
       SNAP 02: TICKER MOVING LEFT TO RIGHT & 5-PILLAR SLIDESHOW
       ========================================================================== */
    .slideshow-ticker-wrap {
      width: 100%;
      background: #090d16;
      border: 1px solid rgba(124, 58, 237, 0.3);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 16px;
      padding: 10px 0;
      position: relative;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .slideshow-ticker-wrap::before,
    .slideshow-ticker-wrap::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 40px;
      z-index: 2;
      pointer-events: none;
    }

    .slideshow-ticker-wrap::before {
      left: 0;
      background: linear-gradient(to right, #090d16, transparent);
    }

    .slideshow-ticker-wrap::after {
      right: 0;
      background: linear-gradient(to left, #090d16, transparent);
    }

    .slideshow-ticker-track {
      display: flex;
      width: max-content;
      animation: ticker-ltr 32s linear infinite;
    }

    .slideshow-ticker-wrap:hover .slideshow-ticker-track {
      animation-play-state: paused;
    }

    /* Moving Left to Right: transforms from -50% to 0% */
    @keyframes ticker-ltr {
      0% {
        transform: translateX(-50%);
      }
      100% {
        transform: translateX(0%);
      }
    }

    .ticker-group {
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 0 14px;
    }

    .ticker-item {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      font-family: var(--font-mono);
      color: #94a3b8;
      white-space: nowrap;
    }

    .ticker-badge {
      font-weight: 800;
      font-size: 0.68rem;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .tb-auto { background: rgba(100, 116, 139, 0.25); color: #cbd5e1; border: 1px solid #475569; }
    .tb-ml   { background: rgba(2, 132, 199, 0.25);   color: #38bdf8; border: 1px solid #0284c7; }
    .tb-gen  { background: rgba(168, 85, 247, 0.25);  color: #c084fc; border: 1px solid #a855f7; }
    .tb-learn{ background: rgba(16, 185, 129, 0.25);  color: #34d399; border: 1px solid #10b981; }
    .tb-tech { background: rgba(245, 158, 11, 0.25);  color: #fbbf24; border: 1px solid #f59e0b; }

    /* Fundamental Tech Badges inside Slide 5 */
    .tech-stack-cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-top: 10px;
    }

    .tech-stack-card {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .tech-stack-card i {
      color: #38bdf8;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .tech-card-title {
      font-size: 0.82rem;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 2px;
    }

    .tech-card-desc {
      font-size: 0.72rem;
      color: #94a3b8;
      line-height: 1.4;
      margin: 0;
    }
`;

// Insert CSS before </style>
html = html.replace('  </style>', newCss + '\n  </style>');

// 2. REPLACE SNAP 1 CONTENT
const newSnap1 = `      <!-- ===================================================================== -->
      <!-- SNAP 1: INTRO PARAGRAPH & EVOLUTION FLOW                               -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-1" data-snap-index="1">
        <div class="snap-eyebrow-row">
          <span class="snap-eyebrow-pill">
            <i data-lucide="bot" style="width:13px;height:13px;"></i>
            SNAP 01 &bull; INTRODUCTION &amp; PARADIGM EVOLUTION
          </span>
          <span class="snap-eyebrow-tag">AI Automation MasterClass</span>
        </div>

        <h1 class="snap-title">Autonomous AI Automation &amp; Agentic Swarm Engineering</h1>

        <!-- What is AI? 2 lines in prominent card -->
        <div class="what-is-ai-card">
          <div class="what-is-ai-badge">
            <i data-lucide="sparkles" style="width:14px;height:14px;"></i>
            WHAT IS ARTIFICIAL INTELLIGENCE?
          </div>
          <p class="ai-def-line">
            <strong>Line 1:</strong> Artificial Intelligence (AI) is the engineering of computational architectures capable of perceiving environmental inputs, contextual reasoning, autonomous problem-solving, and continuous learning from experience.
          </p>
          <p class="ai-def-line">
            <strong>Line 2:</strong> In modern enterprise engineering, AI shifts systems from fragile, deterministic rule scripts into self-governing cognitive entities that understand strategic intent, orchestrate tool APIs, and achieve verifiable outcomes.
          </p>
        </div>

        <!-- Image and Motion Graphic showing Automation + ML evolving to Gen AI and Agentic Development -->
        <div class="evolution-dual-grid">
          <!-- Left: High-Res Evolution Infographic Image -->
          <div class="evolution-image-frame">
            <img src="ai_evolution_stages.jpg" alt="Evolution of AI: Automation, Machine Learning, Generative AI, and Agentic AI">
            <div class="evolution-img-caption">
              <span>FIG 1.0 &bull; ARCHITECTURAL EPOCHS OF AI</span>
              <span>AUTOMATION &rarr; ML &rarr; GENAI &rarr; AGENTS</span>
            </div>
          </div>

          <!-- Right: Interactive Motion Graphic Flow -->
          <div class="evolution-motion-card">
            <div class="motion-card-header">
              <span class="motion-live-pill">
                <span class="pulse-dot"></span>
                ACTIVE EVOLUTION FLOW
              </span>
              <span style="font-family:var(--font-mono);font-size:0.72rem;color:#94a3b8;">
                EPOCHS 1.0 &rarr; 4.0
              </span>
            </div>

            <div class="motion-flow-container">
              <!-- Stage 1 -->
              <div class="motion-stage-row">
                <div class="motion-stage-icon s1">
                  <i data-lucide="cog" style="width:16px;height:16px;"></i>
                </div>
                <div class="motion-stage-body">
                  <div class="motion-stage-name">
                    <span>1. Deterministic Automation</span>
                    <span style="font-size:0.66rem;color:#94a3b8;font-weight:normal;">[Cron &bull; Scripts &bull; RPA]</span>
                  </div>
                  <div class="motion-stage-desc">Fixed logic gates &amp; hardcoded pipelines. Breaks on any runtime schema drift.</div>
                </div>
              </div>

              <div class="motion-arrow-connector">
                <i data-lucide="arrow-down" style="width:14px;height:14px;"></i>
              </div>

              <!-- Stage 2 -->
              <div class="motion-stage-row">
                <div class="motion-stage-icon s2">
                  <i data-lucide="network" style="width:16px;height:16px;"></i>
                </div>
                <div class="motion-stage-body">
                  <div class="motion-stage-name">
                    <span>2. Traditional Machine Learning</span>
                    <span style="font-size:0.66rem;color:#38bdf8;font-weight:normal;">[Statistical &bull; XGBoost]</span>
                  </div>
                  <div class="motion-stage-desc">Supervised classification &amp; regression. Learns static patterns over feature matrices.</div>
                </div>
              </div>

              <div class="motion-arrow-connector">
                <i data-lucide="arrow-down" style="width:14px;height:14px;"></i>
              </div>

              <!-- Stage 3 -->
              <div class="motion-stage-row">
                <div class="motion-stage-icon s3">
                  <i data-lucide="cpu" style="width:16px;height:16px;"></i>
                </div>
                <div class="motion-stage-body">
                  <div class="motion-stage-name">
                    <span>3. Generative AI &amp; LLMs</span>
                    <span style="font-size:0.66rem;color:#c084fc;font-weight:normal;">[Transformers &bull; 128k Tokens]</span>
                  </div>
                  <div class="motion-stage-desc">Multi-modal attention mechanisms &amp; open-ended reasoning across raw unstructured data.</div>
                </div>
              </div>

              <div class="motion-arrow-connector">
                <i data-lucide="arrow-down" style="width:14px;height:14px;"></i>
              </div>

              <!-- Stage 4 -->
              <div class="motion-stage-row">
                <div class="motion-stage-icon s4">
                  <i data-lucide="repeat" style="width:16px;height:16px;"></i>
                </div>
                <div class="motion-stage-body">
                  <div class="motion-stage-name">
                    <span>4. Agentic Swarms &amp; MCP Loops</span>
                    <span style="font-size:0.66rem;color:#34d399;font-weight:normal;">[Autonomous &bull; Self-Healing]</span>
                  </div>
                  <div class="motion-stage-desc">Perception &bull; Tool Calling &bull; ReAct Reflection &bull; Verification &amp; Rollback.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Awesome Fixed Box: Venkata Bhattaram Credentials -->
        <div class="venkata-awesome-box">
          <div class="venkata-profile-left">
            <div class="venkata-avatar-ring">
              VB
              <div class="venkata-verified-badge">&#x2713;</div>
            </div>
            <div class="venkata-info">
              <div class="venkata-title-line">
                <span>I am Venkata Bhattaram</span>
                <span style="font-size:0.75rem;padding:2px 8px;border-radius:4px;background:rgba(124,58,237,0.3);color:#c084fc;font-family:var(--font-mono);">INSTRUCTOR</span>
              </div>
              <div class="venkata-exp-line">
                <strong>18+ USA Experience</strong> in Enterprise Systems, Data Engineering and AI
              </div>
            </div>
          </div>

          <div class="venkata-pills-right">
            <span class="venkata-pill"><i data-lucide="award" style="width:13px;height:13px;color:#fbbf24;"></i> Enterprise Architect</span>
            <span class="venkata-pill"><i data-lucide="database" style="width:13px;height:13px;color:#38bdf8;"></i> Large-Scale Lakehouse Systems</span>
            <span class="venkata-pill"><i data-lucide="bot" style="width:13px;height:13px;color:#34d399;"></i> Agentic AI &amp; MCP Frameworks</span>
          </div>
        </div>
      </section>`;

// Replace Snap 1 in html
const snap1Regex = /<!-- =+ -->\s*<!-- SNAP 1: INTRO PARAGRAPH[\s\S]*?<\/section>/;
html = html.replace(snap1Regex, newSnap1);

// 3. REPLACE SNAP 2 CONTENT (SLIDESHOW WITH 5 SLIDES & MOVING TICKER LEFT TO RIGHT)
const newSnap2 = `      <!-- ===================================================================== -->
      <!-- SNAP 2: SLIDESHOW & TICKER                                             -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-2" data-snap-index="2">
        <div class="snap-eyebrow-row">
          <span class="snap-eyebrow-pill">
            <i data-lucide="presentation" style="width:13px;height:13px;"></i>
            SNAP 02 &bull; CORE CURRICULUM SLIDESHOW
          </span>
          <span class="snap-eyebrow-tag">Interactive Carousel</span>
        </div>

        <h2 class="snap-title">Understanding Automation, Traditional ML, and GenAI</h2>
        <p class="snap-lead-text" style="margin-bottom:12px;">
          Explore the fundamental technologies, paradigm transitions, and skills covered in this MasterClass.
        </p>

        <!-- Continuous Ticker Moving Left to Right -->
        <div class="slideshow-ticker-wrap">
          <div class="slideshow-ticker-track">
            <!-- Group 1 -->
            <div class="ticker-group">
              <span class="ticker-item"><span class="ticker-badge tb-auto">AUTOMATION</span> Shell Scripts &bull; Cron Scheduling &bull; RPA Bots &bull; Fixed APIs</span>
              <span class="ticker-item"><span class="ticker-badge tb-ml">TRADITIONAL ML</span> Feature Engineering &bull; Scikit-Learn &bull; XGBoost &bull; Regression</span>
              <span class="ticker-item"><span class="ticker-badge tb-gen">GENAI</span> Transformer Attention &bull; 128k Context &bull; Multi-Modal Tokens &bull; Prompting</span>
              <span class="ticker-item"><span class="ticker-badge tb-learn">WHAT WE LEARN</span> Autonomous ReAct Loops &bull; MCP Tool Bus &bull; Swarm Agents &bull; Self-Healing</span>
              <span class="ticker-item"><span class="ticker-badge tb-tech">TECH STACK</span> Python 3.12 &bull; SQL &amp; VectorDB &bull; System Design &bull; LangGraph &bull; MCP</span>
            </div>
            <!-- Group 2 (duplicate for seamless loop) -->
            <div class="ticker-group">
              <span class="ticker-item"><span class="ticker-badge tb-auto">AUTOMATION</span> Shell Scripts &bull; Cron Scheduling &bull; RPA Bots &bull; Fixed APIs</span>
              <span class="ticker-item"><span class="ticker-badge tb-ml">TRADITIONAL ML</span> Feature Engineering &bull; Scikit-Learn &bull; XGBoost &bull; Regression</span>
              <span class="ticker-item"><span class="ticker-badge tb-gen">GENAI</span> Transformer Attention &bull; 128k Context &bull; Multi-Modal Tokens &bull; Prompting</span>
              <span class="ticker-item"><span class="ticker-badge tb-learn">WHAT WE LEARN</span> Autonomous ReAct Loops &bull; MCP Tool Bus &bull; Swarm Agents &bull; Self-Healing</span>
              <span class="ticker-item"><span class="ticker-badge tb-tech">TECH STACK</span> Python 3.12 &bull; SQL &amp; VectorDB &bull; System Design &bull; LangGraph &bull; MCP</span>
            </div>
          </div>
        </div>

        <div class="slideshow-container">
          <div class="slideshow-topbar">
            <span class="slideshow-badge" id="slideBadgeText">
              <i data-lucide="layers" style="width:14px;height:14px;"></i>
              Pillar 01 &bull; Understanding Automation
            </span>
            <span class="slideshow-counter" id="slideCounterText">Slide 1 of 5</span>
          </div>

          <!-- Slide 1: Understanding Automation -->
          <div class="slide-item active" data-slide="1">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">1. Understanding Automation</h3>
                <p class="slide-desc">
                  Traditional automation executes predefined deterministic instructions: cron schedules, bash scripts, and legacy RPA. They thrive in closed, static environments but fail abruptly when exposed to unstructured data or schema changes.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>Execution Model:</strong> If-then-else deterministic logic paths</li>
                  <li><i data-lucide="check"></i> <strong>Failure Mode:</strong> Immediate abort upon unhandled exceptions or altered UI IDs</li>
                  <li><i data-lucide="check"></i> <strong>Data Capability:</strong> Rigidly restricted to expected schemas and structured formats</li>
                </ul>
              </div>
              <div class="slide-visual-box">
                <div class="slide-code-header">
                  <span>DETERMINISTIC CODE HARNESS</span>
                  <span>STATIC RPA SCRIPT</span>
                </div>
                <pre class="slide-code-body">// Legacy Script: Zero cognitive reasoning
try {
  const data = await fetchReport(date);
  parseCSV(data);
  exportToWarehouse(data);
} catch (err) {
  // Hard failure on schema addition!
  alertAdminAndDie(err);
}</pre>
              </div>
            </div>
          </div>

          <!-- Slide 2: Traditional ML -->
          <div class="slide-item" data-slide="2">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">2. Traditional Machine Learning</h3>
                <p class="slide-desc">
                  Machine Learning replaces hand-crafted rules with statistical models trained on historical data. Algorithms identify mathematical correlations to classify items or predict continuous numerical values.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>Supervised Learning:</strong> Random Forests, XGBoost, and Logistic Regression</li>
                  <li><i data-lucide="check"></i> <strong>Feature Engineering:</strong> Requires rigorous human preprocessing and tabular feature vectors</li>
                  <li><i data-lucide="check"></i> <strong>Limitation:</strong> Output is a numerical prediction or class label, not executable actions</li>
                </ul>
              </div>
              <div class="slide-visual-box">
                <div class="slide-code-header">
                  <span>STATISTICAL INFERENCE</span>
                  <span>SCIKIT-LEARN / XGBOOST</span>
                </div>
                <pre class="slide-code-body"># Feature Matrix Transformation & Fit
from xgboost import XGBClassifier

model = XGBClassifier(n_estimators=300, max_depth=6)
model.fit(X_train_features, y_train_labels)

# Output: Static probability score [0.892]
probability = model.predict_proba(customer_vector)</pre>
              </div>
            </div>
          </div>

          <!-- Slide 3: GenAI -->
          <div class="slide-item" data-slide="3">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">3. Generative AI &amp; Foundation Models</h3>
                <p class="slide-desc">
                  Generative AI leverages multi-billion parameter Transformer networks trained on internet-scale corpora. With massive context windows, models comprehend nuance, translate code, and synthesize novel unstructured information.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>Self-Attention:</strong> Weighs tokens across long-range context (128k to 2M tokens)</li>
                  <li><i data-lucide="check"></i> <strong>Multi-Modal Ingestion:</strong> Ingests codebases, diagrams, logs, and system metrics</li>
                  <li><i data-lucide="check"></i> <strong>Limitation:</strong> Passive text generator without an execution runtime and tools</li>
                </ul>
              </div>
              <div class="slide-visual-box">
                <div class="slide-code-header">
                  <span>FOUNDATION MODEL INFERENCE</span>
                  <span>CLAUDE 3.5 / GPT-4o</span>
                </div>
                <pre class="slide-code-body">response = anthropic.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    system="Analyze database slow query log and propose index.",
    messages=[{"role": "user", "content": raw_postgres_log}]
)
# Returns deep analytical diagnosis</pre>
              </div>
            </div>
          </div>

          <!-- Slide 4: What Will We Learn -->
          <div class="slide-item" data-slide="4">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">4. What Will We Learn?</h3>
                <p class="slide-desc">
                  This MasterClass bridges pure generative models into battle-tested Enterprise Autonomous Agents. You will build self-healing pipelines, multi-agent swarms, and production MCP integrations from scratch.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>Cognitive Reasoning:</strong> Implement ReAct, Plan-and-Solve, and Reflection loops</li>
                  <li><i data-lucide="check"></i> <strong>Anthropic MCP Bus:</strong> Build secure tool servers with JSON-RPC &amp; OAuth tokens</li>
                  <li><i data-lucide="check"></i> <strong>Swarm Architecture:</strong> Orchestrate Supervisor, Coder, and Critic agents</li>
                  <li><i data-lucide="check"></i> <strong>Production Safety:</strong> Integrate OpenTelemetry, LangSmith, and Slack human gates</li>
                </ul>
              </div>
              <div class="slide-visual-box">
                <div class="slide-code-header">
                  <span>CURRICULUM MILESTONES</span>
                  <span>ENTERPRISE ROADMAP</span>
                </div>
                <pre class="slide-code-body">WEEK 1: Foundation Models &amp; Prompt Engineering
WEEK 2: ReAct Loops &amp; Function Calling
WEEK 3: Model Context Protocol (MCP) Tool Servers
WEEK 4: State Machines &amp; LangGraph DAGs
WEEK 5: Multi-Agent Swarms &amp; Supervisor Networks
WEEK 6: Telemetry, Guardrails &amp; Self-Healing Ops</pre>
              </div>
            </div>
          </div>

          <!-- Slide 5: Fundamental Technologies -->
          <div class="slide-item" data-slide="5">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">5. Fundamental Technologies</h3>
                <p class="slide-desc">
                  Production agent engineering requires mastering the confluence of high-performance backend systems, distributed data engines, and modern agent frameworks.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>Python 3.12+:</strong> Asyncio, Pydantic v2, FastAPI, Typing</li>
                  <li><i data-lucide="check"></i> <strong>SQL &amp; Vector:</strong> DuckDB, Snowflake, PostgreSQL, pgvector, Pinecone</li>
                  <li><i data-lucide="check"></i> <strong>System Design:</strong> MicroServices, event-driven Kafka streams, state machines</li>
                  <li><i data-lucide="check"></i> <strong>Agent Harness:</strong> LangGraph, CrewAI, Anthropic MCP, LiteLLM</li>
                </ul>
              </div>
              <div>
                <div class="tech-stack-cards-grid">
                  <div class="tech-stack-card">
                    <i data-lucide="terminal"></i>
                    <div>
                      <div class="tech-card-title">Python 3.12 Core</div>
                      <p class="tech-card-desc">Type-safe schemas, async event loops, high-throughput tool runners.</p>
                    </div>
                  </div>
                  <div class="tech-stack-card">
                    <i data-lucide="database"></i>
                    <div>
                      <div class="tech-card-title">SQL &amp; Vector Stores</div>
                      <p class="tech-card-desc">Relational joins, pgvector embeddings, and low-latency hybrid RAG.</p>
                    </div>
                  </div>
                  <div class="tech-stack-card">
                    <i data-lucide="layers"></i>
                    <div>
                      <div class="tech-card-title">System Design</div>
                      <p class="tech-card-desc">Fault-tolerant distributed microservices, message buses &amp; retry queues.</p>
                    </div>
                  </div>
                  <div class="tech-stack-card">
                    <i data-lucide="network"></i>
                    <div>
                      <div class="tech-card-title">Frameworks &amp; MCP</div>
                      <p class="tech-card-desc">LangGraph state graphs, Anthropic MCP client/server &amp; LLM harnesses.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slideshow Controls -->
          <div class="slideshow-controls-bar">
            <div class="slide-dots-wrap">
              <span class="slide-dot active" onclick="jumpToSlide(1)"></span>
              <span class="slide-dot" onclick="jumpToSlide(2)"></span>
              <span class="slide-dot" onclick="jumpToSlide(3)"></span>
              <span class="slide-dot" onclick="jumpToSlide(4)"></span>
              <span class="slide-dot" onclick="jumpToSlide(5)"></span>
            </div>

            <div class="slideshow-nav-actions">
              <button class="slide-ctrl-btn" onclick="prevSlide()" title="Previous Slide">
                <i data-lucide="chevron-left"></i>
              </button>
              <button class="slide-ctrl-btn" onclick="toggleSlideAutoplay()" id="slidePlayBtn" title="Play/Pause Carousel">
                <i data-lucide="play"></i>
              </button>
              <button class="slide-ctrl-btn" onclick="nextSlide()" title="Next Slide">
                <i data-lucide="chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>`;

// Replace Snap 2 in html
const snap2Regex = /<!-- =+ -->\s*<!-- SNAP 2: SLIDESHOW[\s\S]*?<\/section>/;
html = html.replace(snap2Regex, newSnap2);

// 4. UPDATE JAVASCRIPT FOR 5 SLIDES
const oldSlideJsRegex = /let currentSlide = 1;\s*const totalSlides = 4;[\s\S]*?const slideBadges = \[[^\]]*\];/;
const newSlideJs = `let currentSlide = 1;
    const totalSlides = 5;
    let slideInterval = null;

    const slideBadges = [
      "Pillar 01 &bull; Understanding Automation",
      "Pillar 02 &bull; Traditional Machine Learning",
      "Pillar 03 &bull; Generative AI &amp; Foundation Models",
      "Pillar 04 &bull; What Will We Learn",
      "Pillar 05 &bull; Fundamental Technologies"
    ];`;

html = html.replace(oldSlideJsRegex, newSlideJs);

fs.writeFileSync('automation-ml-ai-agentic/demo.html', html, 'utf8');
console.log('Successfully updated automation-ml-ai-agentic/demo.html!');
