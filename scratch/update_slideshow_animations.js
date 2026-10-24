const fs = require('fs');

let html = fs.readFileSync('automation-ml-ai-agentic/demo.html', 'utf8');

// 1. ADD CSS FOR SLIDESHOW EYE-CANDY ANIMATIONS & CURRICULUM ROADMAP
const animationCss = `
    /* ==========================================================================
       SLIDESHOW EYE-CANDY ANIMATIONS & INTERACTIVE MOTION PANELS
       ========================================================================== */
    @keyframes spinGear {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes spinGearRev {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }

    @keyframes pulseBeamFlow {
      0% { stroke-dashoffset: 60; }
      100% { stroke-dashoffset: 0; }
    }

    @keyframes packetFlowX {
      0% { left: 8%; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { left: 88%; opacity: 0; }
    }

    @keyframes attentionNeonGlow {
      0%, 100% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.3), inset 0 0 10px rgba(168, 85, 247, 0.2); }
      50% { box-shadow: 0 0 24px rgba(168, 85, 247, 0.7), inset 0 0 16px rgba(168, 85, 247, 0.4); }
    }

    @keyframes tokenStreamAnim {
      0% { transform: scale(0.92) translateX(-4px); opacity: 0.4; }
      50% { transform: scale(1) translateX(0); opacity: 1; }
      100% { transform: scale(0.92) translateX(4px); opacity: 0.4; }
    }

    /* Motion Panel Container for Slides 1, 2, 3 */
    .slide-motion-canvas {
      background: linear-gradient(145deg, #090d16 0%, #0f172a 100%);
      border: 1px solid rgba(124, 58, 237, 0.3);
      border-radius: 14px;
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 340px;
      box-sizing: border-box;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
      position: relative;
      overflow: hidden;
    }

    .motion-canvas-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 10px;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-family: var(--font-sans);
    }

    /* SLIDE 1: Automation Pipeline Flow */
    .automation-flow-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr auto 1fr;
      align-items: center;
      gap: 10px;
      margin: auto 0;
      position: relative;
    }

    .auto-node-card {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 14px 10px;
      text-align: center;
      transition: all 0.25s ease;
    }

    .auto-node-card:hover {
      border-color: #64748b;
      transform: translateY(-2px);
    }

    .gear-spin-icon {
      animation: spinGear 8s linear infinite;
      color: #94a3b8;
    }

    .gear-spin-icon-rev {
      animation: spinGearRev 6s linear infinite;
      color: #38bdf8;
    }

    .flow-arrow-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      animation: pulseFlow 1.6s infinite ease-in-out;
    }

    .auto-failure-strip {
      background: rgba(225, 29, 72, 0.12);
      border: 1px solid rgba(225, 29, 72, 0.4);
      border-radius: 8px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.76rem;
      color: #fca5a5;
      font-family: var(--font-sans);
    }

    /* SLIDE 2: ML Feature Extraction & Gradient Weights */
    .ml-interactive-board {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1fr;
      gap: 14px;
      align-items: center;
      margin: auto 0;
    }

    .ml-features-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .ml-feature-pill {
      background: rgba(2, 132, 199, 0.15);
      border: 1px solid rgba(2, 132, 199, 0.4);
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 0.74rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-sans);
    }

    .ml-network-center {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 10px;
      padding: 12px;
      text-align: center;
      box-shadow: 0 0 16px rgba(2, 132, 199, 0.2);
    }

    .ml-weights-grid {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin: 10px 0;
    }

    .ml-weight-node {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      color: #ffffff;
      font-size: 0.65rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 8px #38bdf8;
      animation: attentionNeonGlow 3s infinite ease-in-out;
    }

    .ml-output-gauge {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      color: #34d399;
      font-family: var(--font-sans);
    }

    /* SLIDE 3: GenAI Multi-Head Attention & Token Emitter */
    .genai-transformer-board {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1fr;
      gap: 14px;
      align-items: center;
      margin: auto 0;
    }

    .genai-ingress-card {
      background: rgba(124, 58, 237, 0.12);
      border: 1px solid rgba(168, 85, 247, 0.4);
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .genai-core-matrix {
      background: radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(15, 23, 42, 0.9) 70%);
      border: 1px solid #a855f7;
      border-radius: 12px;
      padding: 16px 12px;
      text-align: center;
      animation: attentionNeonGlow 3.5s infinite ease-in-out;
    }

    .genai-streaming-emitter {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .genai-token-chip {
      background: rgba(168, 85, 247, 0.25);
      border: 1px solid #c084fc;
      border-radius: 6px;
      padding: 5px 8px;
      font-size: 0.72rem;
      font-weight: 700;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      animation: tokenStreamAnim 2.5s infinite ease-in-out;
      font-family: var(--font-sans);
    }

    /* SLIDE 4: CLEAR, LARGE HELVETICA CURRICULUM ROADMAP (NO MONOSPACE) */
    .syllabus-roadmap-card {
      background: linear-gradient(145deg, #0a0f1d 0%, #111827 100%);
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 14px;
      padding: 18px 22px;
      height: 340px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
      font-family: var(--font-sans);
    }

    .syllabus-roadmap-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 8px;
      margin-bottom: 4px;
    }

    .syllabus-timeline-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      flex: 1;
      margin: 8px 0;
    }

    .syllabus-module-item {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 9px 12px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      transition: all 0.2s ease;
      font-family: var(--font-sans);
    }

    .syllabus-module-item:hover {
      border-color: #10b981;
      background: rgba(16, 185, 129, 0.1);
      transform: translateY(-2px);
    }

    .syllabus-week-badge {
      font-size: 0.68rem;
      font-weight: 900;
      color: #10b981;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 4px;
      padding: 2px 6px;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .syllabus-module-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
      margin-bottom: 2px;
      font-family: var(--font-sans);
    }

    .syllabus-module-desc {
      font-size: 0.76rem;
      color: #cbd5e1;
      line-height: 1.35;
      font-family: var(--font-sans);
    }

    .syllabus-footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 8px;
      font-size: 0.76rem;
      color: #94a3b8;
      font-family: var(--font-sans);
    }
`;

// Insert animation CSS into <style>
html = html.replace('  </style>', animationCss + '\n  </style>');

// 2. REPLACE SLIDE 1 (UNDERSTANDING AUTOMATION) WITH ANIMATED MOTION PIPELINE (NO CODE)
const newSlide1 = `          <!-- Slide 1: Understanding Automation -->
          <div class="slide-item active" data-slide="1">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">1. Understanding Automation</h3>
                <p class="slide-desc" style="font-family:var(--font-sans); font-size:1rem; line-height:1.6;">
                  Traditional automation executes predefined, rigid instructions: cron schedules, shell scripts, and deterministic RPA. They thrive in closed, static environments but fail abruptly upon runtime schema drift or API changes.
                </p>
                <ul class="slide-feature-list" style="font-family:var(--font-sans); font-size:0.92rem;">
                  <li><i data-lucide="check-circle-2" style="color:#10b981;"></i> <strong>Execution Model:</strong> Rigid if-then-else deterministic logic paths</li>
                  <li><i data-lucide="alert-triangle" style="color:#f59e0b;"></i> <strong>Failure Mode:</strong> Immediate abort upon unhandled exceptions or altered UI IDs</li>
                  <li><i data-lucide="database" style="color:#38bdf8;"></i> <strong>Data Capability:</strong> Restricted to fixed schemas with zero semantic awareness</li>
                </ul>
              </div>

              <!-- Animated Motion Pipeline (Eye-Candy, No Code) -->
              <div class="slide-motion-canvas">
                <div class="motion-canvas-topbar">
                  <span style="color:#94a3b8; display:flex; align-items:center; gap:6px;">
                    <i data-lucide="cog" class="gear-spin-icon" style="width:14px;height:14px;"></i>
                    DETERMINISTIC PIPELINE EXECUTION
                  </span>
                  <span style="color:#f59e0b; display:flex; align-items:center; gap:5px;">
                    <span class="pulse-dot" style="background:#f59e0b;"></span>
                    RUNTIME SIMULATOR
                  </span>
                </div>

                <!-- Pipeline Stages -->
                <div class="automation-flow-grid">
                  <div class="auto-node-card">
                    <i data-lucide="clock" style="color:#38bdf8;width:22px;height:22px;margin-bottom:4px;"></i>
                    <div style="font-size:0.78rem;font-weight:800;color:#fff;">Cron Trigger</div>
                    <div style="font-size:0.66rem;color:#94a3b8;margin-top:2px;">Fixed 00:00 UTC</div>
                  </div>

                  <div class="flow-arrow-indicator">
                    <i data-lucide="arrow-right" style="width:18px;height:18px;color:#38bdf8;"></i>
                  </div>

                  <div class="auto-node-card" style="border-color:#7c3aed;box-shadow:0 0 12px rgba(124,58,237,0.3);">
                    <i data-lucide="settings" class="gear-spin-icon-rev" style="width:22px;height:22px;margin-bottom:4px;"></i>
                    <div style="font-size:0.78rem;font-weight:800;color:#c084fc;">Script Runner</div>
                    <div style="font-size:0.66rem;color:#94a3b8;margin-top:2px;">Hardcoded Logic</div>
                  </div>

                  <div class="flow-arrow-indicator">
                    <i data-lucide="arrow-right" style="width:18px;height:18px;color:#e11d48;"></i>
                  </div>

                  <div class="auto-node-card" style="border-color:#e11d48;background:rgba(225,29,72,0.15);">
                    <i data-lucide="alert-octagon" style="color:#fb7185;width:22px;height:22px;margin-bottom:4px;"></i>
                    <div style="font-size:0.78rem;font-weight:800;color:#fca5a5;">Target Store</div>
                    <div style="font-size:0.66rem;color:#fecdd3;margin-top:2px;">Crash on Drift</div>
                  </div>
                </div>

                <!-- Animated Alert Strip -->
                <div class="auto-failure-strip">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <i data-lucide="alert-circle" style="width:16px;height:16px;color:#f43f5e;"></i>
                    <span><strong>BRITTLE EXCEPTION:</strong> Column <em>'customer_loyalty'</em> not in schema &rarr; Process Killed</span>
                  </div>
                  <span style="font-size:0.7rem;font-weight:800;color:#fb7185;padding:2px 6px;background:rgba(0,0,0,0.3);border-radius:4px;">EXIT CODE 1</span>
                </div>
              </div>
            </div>
          </div>`;

// 3. REPLACE SLIDE 2 (TRADITIONAL ML) WITH ANIMATED MODEL WEIGHTS & DECISION BOUNDARY (NO CODE)
const newSlide2 = `          <!-- Slide 2: Traditional ML -->
          <div class="slide-item" data-slide="2">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">2. Traditional Machine Learning</h3>
                <p class="slide-desc" style="font-family:var(--font-sans); font-size:1rem; line-height:1.6;">
                  Machine Learning replaces hardcoded rules with mathematical models trained on historic datasets. Statistical algorithms classify instances or predict continuous numeric values based on feature vectors.
                </p>
                <ul class="slide-feature-list" style="font-family:var(--font-sans); font-size:0.92rem;">
                  <li><i data-lucide="check-circle-2" style="color:#10b981;"></i> <strong>Supervised Learning:</strong> Random Forests, XGBoost, Support Vector Machines</li>
                  <li><i data-lucide="sliders" style="color:#38bdf8;"></i> <strong>Feature Engineering:</strong> Requires extensive human preprocessing and tabular feature matrices</li>
                  <li><i data-lucide="target" style="color:#a855f7;"></i> <strong>Limitation:</strong> Outputs static numerical probabilities; cannot self-plan or execute external actions</li>
                </ul>
              </div>

              <!-- Animated ML Feature Weights & Classification Canvas (Eye-Candy, No Code) -->
              <div class="slide-motion-canvas">
                <div class="motion-canvas-topbar">
                  <span style="color:#38bdf8; display:flex; align-items:center; gap:6px;">
                    <i data-lucide="network" style="width:14px;height:14px;"></i>
                    STATISTICAL INFERENCE &amp; WEIGHT ENGINE
                  </span>
                  <span style="color:#10b981; display:flex; align-items:center; gap:5px;">
                    <span class="pulse-dot"></span>
                    GRADIENT BOOSTING
                  </span>
                </div>

                <div class="ml-interactive-board">
                  <!-- Feature Inputs -->
                  <div class="ml-features-col">
                    <div class="ml-feature-pill"><span>x₁ Age / Tenure</span> <span>0.84</span></div>
                    <div class="ml-feature-pill"><span>x₂ Spend Ratio</span> <span>0.61</span></div>
                    <div class="ml-feature-pill"><span>x₃ Frequency</span> <span>0.95</span></div>
                  </div>

                  <!-- Center Weights Cluster -->
                  <div class="ml-network-center">
                    <div style="font-size:0.75rem;font-weight:800;color:#e2e8f0;margin-bottom:4px;">Decision Trees &bull; Weights</div>
                    <div class="ml-weights-grid">
                      <div class="ml-weight-node">W₁</div>
                      <div class="ml-weight-node" style="animation-delay:0.5s;">W₂</div>
                      <div class="ml-weight-node" style="animation-delay:1s;">W₃</div>
                    </div>
                    <div style="font-size:0.68rem;color:#94a3b8;font-family:var(--font-sans);">Loss Minimization (Log-Loss)</div>
                  </div>

                  <!-- Output Gauge -->
                  <div class="ml-output-gauge">
                    <i data-lucide="check-circle" style="width:24px;height:24px;margin-bottom:4px;"></i>
                    <div style="font-size:0.95rem;font-weight:900;">94.2%</div>
                    <div style="font-size:0.7rem;font-weight:700;color:#a7f3d0;">Class: Churn Risk</div>
                  </div>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.08);padding-top:8px;font-size:0.74rem;color:#94a3b8;font-family:var(--font-sans);">
                  <span>INPUT: Tabular Feature Vector (CSV / Parquet)</span>
                  <span style="color:#38bdf8;font-weight:700;">OUTPUT: Numerical Probability Score</span>
                </div>
              </div>
            </div>
          </div>`;

// 4. REPLACE SLIDE 3 (GENAI) WITH TRANSFORMER ATTENTION & TOKEN EMITTER (NO CODE)
const newSlide3 = `          <!-- Slide 3: GenAI -->
          <div class="slide-item" data-slide="3">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">3. Generative AI &amp; Foundation Models</h3>
                <p class="slide-desc" style="font-family:var(--font-sans); font-size:1rem; line-height:1.6;">
                  Generative AI harnesses multi-billion parameter Transformer models trained on vast multimodal corpora. Foundation models understand natural language nuances, write complex code, and synthesize unstructured documents.
                </p>
                <ul class="slide-feature-list" style="font-family:var(--font-sans); font-size:0.92rem;">
                  <li><i data-lucide="sparkles" style="color:#a855f7;"></i> <strong>Self-Attention:</strong> Weighs relationships between tokens across long context windows (128k to 2M tokens)</li>
                  <li><i data-lucide="layers" style="color:#38bdf8;"></i> <strong>Multi-Modal Perception:</strong> Simultaneously ingests unstructured text, architecture diagrams, and system logs</li>
                  <li><i data-lucide="help-circle" style="color:#f59e0b;"></i> <strong>Limitation:</strong> Passive generation only—requires execution harnesses and tool protocols to execute actions</li>
                </ul>
              </div>

              <!-- Animated Transformer & Token Emitter (Eye-Candy, No Code) -->
              <div class="slide-motion-canvas">
                <div class="motion-canvas-topbar">
                  <span style="color:#c084fc; display:flex; align-items:center; gap:6px;">
                    <i data-lucide="sparkles" style="width:14px;height:14px;"></i>
                    MULTI-HEAD TRANSFORMER ATTENTION
                  </span>
                  <span style="color:#a855f7; display:flex; align-items:center; gap:5px;">
                    <span class="pulse-dot" style="background:#a855f7;"></span>
                    128K LATENT SPACE
                  </span>
                </div>

                <div class="genai-transformer-board">
                  <!-- Prompt Tokens Ingress -->
                  <div class="genai-ingress-card">
                    <div style="font-size:0.72rem;font-weight:800;color:#c084fc;text-transform:uppercase;">Ingress Tokens</div>
                    <div class="genai-token-chip">"Triage" <span style="font-size:0.65rem;color:#c084fc;">ID: 418</span></div>
                    <div class="genai-token-chip" style="animation-delay:0.3s;">"Kubernetes" <span style="font-size:0.65rem;color:#c084fc;">ID: 902</span></div>
                    <div class="genai-token-chip" style="animation-delay:0.6s;">"Crash" <span style="font-size:0.65rem;color:#c084fc;">ID: 711</span></div>
                  </div>

                  <!-- Central Multi-Head Attention Core -->
                  <div class="genai-core-matrix">
                    <i data-lucide="cpu" style="width:28px;height:28px;color:#e9d5ff;margin-bottom:6px;"></i>
                    <div style="font-size:0.82rem;font-weight:900;color:#ffffff;">Self-Attention Heads</div>
                    <div style="font-size:0.68rem;color:#d8b4fe;margin-top:4px;">Q &bull; K &bull; V Matrix dot products</div>
                    <div style="margin-top:8px;font-size:0.65rem;padding:3px 8px;background:rgba(0,0,0,0.3);border-radius:999px;color:#a7f3d0;display:inline-block;">Softmax Attention Weights</div>
                  </div>

                  <!-- Autoregressive Token Stream Emitter -->
                  <div class="genai-streaming-emitter">
                    <div style="font-size:0.72rem;font-weight:800;color:#38bdf8;text-transform:uppercase;">Stream Emitter</div>
                    <div class="genai-token-chip" style="background:rgba(56,189,248,0.2);border-color:#38bdf8;color:#e0f2fe;">"Investigate"</div>
                    <div class="genai-token-chip" style="background:rgba(56,189,248,0.2);border-color:#38bdf8;color:#e0f2fe;animation-delay:0.4s;">"Pod logs..."</div>
                    <div class="genai-token-chip" style="background:rgba(16,185,129,0.2);border-color:#10b981;color:#dcfce7;animation-delay:0.8s;">"&rarr; Ready for Tool"</div>
                  </div>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.08);padding-top:8px;font-size:0.74rem;color:#94a3b8;font-family:var(--font-sans);">
                  <span>INPUT: Natural Language &amp; Multimodal Context</span>
                  <span style="color:#c084fc;font-weight:700;">OUTPUT: Synthesized Reasoning Stream</span>
                </div>
              </div>
            </div>
          </div>`;

// 5. REPLACE SLIDE 4 (SYLLABUS / WHAT WILL WE LEARN) WITH CLEAR, LARGE HELVETICA TIMELINE (NO MONOSPACE)
const newSlide4 = `          <!-- Slide 4: What Will We Learn (Curriculum Roadmap in Clear, Large Helvetica) -->
          <div class="slide-item" data-slide="4">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">4. What Will We Learn?</h3>
                <p class="slide-desc" style="font-family:var(--font-sans); font-size:1rem; line-height:1.6;">
                  This MasterClass transforms foundation models into production-ready Enterprise Autonomous Agents. You will build self-healing workflows, Model Context Protocol (MCP) tool buses, and resilient multi-agent swarms from scratch.
                </p>
                <ul class="slide-feature-list" style="font-family:var(--font-sans); font-size:0.92rem;">
                  <li><i data-lucide="check-circle-2" style="color:#10b981;"></i> <strong>Cognitive Reasoning:</strong> Master ReAct, Plan-and-Solve, and Reflection loops</li>
                  <li><i data-lucide="cpu" style="color:#38bdf8;"></i> <strong>Anthropic MCP Bus:</strong> Build secure tool servers with JSON-RPC schemas</li>
                  <li><i data-lucide="network" style="color:#a855f7;"></i> <strong>Swarm Architecture:</strong> Coordinate Supervisor, Coder, and Critic agents</li>
                  <li><i data-lucide="shield-check" style="color:#10b981;"></i> <strong>Production Safety:</strong> Deploy OpenTelemetry, LangSmith, and Slack human gates</li>
                </ul>
              </div>

              <!-- High-Clarity Structured Syllabus Roadmap (Clean Helvetica, Large Font, No Monospace) -->
              <div class="syllabus-roadmap-card">
                <div class="syllabus-roadmap-header">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <i data-lucide="graduation-cap" style="color:#10b981;width:20px;height:20px;"></i>
                    <span style="font-size:0.9rem;font-weight:800;color:#ffffff;">ENTERPRISE CURRICULUM SYLLABUS</span>
                  </div>
                  <span style="font-size:0.72rem;font-weight:800;color:#10b981;padding:2px 8px;background:rgba(16,185,129,0.18);border:1px solid rgba(16,185,129,0.4);border-radius:4px;">
                    6 CORE MODULES
                  </span>
                </div>

                <!-- 6-Module Structured Grid -->
                <div class="syllabus-timeline-grid">
                  <!-- Module 1 -->
                  <div class="syllabus-module-item">
                    <span class="syllabus-week-badge">MOD 01</span>
                    <div>
                      <div class="syllabus-module-title">Foundation Models &amp; Prompting</div>
                      <div class="syllabus-module-desc">Token mechanics, prompt engineering &amp; structured schema outputs.</div>
                    </div>
                  </div>

                  <!-- Module 2 -->
                  <div class="syllabus-module-item">
                    <span class="syllabus-week-badge">MOD 02</span>
                    <div>
                      <div class="syllabus-module-title">ReAct Agentic Loops &amp; Tools</div>
                      <div class="syllabus-module-desc">Autonomous reasoning, observation cycles &amp; external function calling.</div>
                    </div>
                  </div>

                  <!-- Module 3 -->
                  <div class="syllabus-module-item">
                    <span class="syllabus-week-badge">MOD 03</span>
                    <div>
                      <div class="syllabus-module-title">Model Context Protocol (MCP)</div>
                      <div class="syllabus-module-desc">Anthropic MCP tool buses, Docker, Kubernetes &amp; database executors.</div>
                    </div>
                  </div>

                  <!-- Module 4 -->
                  <div class="syllabus-module-item">
                    <span class="syllabus-week-badge">MOD 04</span>
                    <div>
                      <div class="syllabus-module-title">LangGraph Cyclic State Graphs</div>
                      <div class="syllabus-module-desc">State persistence, checkpointing &amp; multi-turn cognitive execution.</div>
                    </div>
                  </div>

                  <!-- Module 5 -->
                  <div class="syllabus-module-item">
                    <span class="syllabus-week-badge">MOD 05</span>
                    <div>
                      <div class="syllabus-module-title">Multi-Agent Swarm Networks</div>
                      <div class="syllabus-module-desc">Supervisor topologies, worker delegation &amp; self-healing triage.</div>
                    </div>
                  </div>

                  <!-- Module 6 -->
                  <div class="syllabus-module-item">
                    <span class="syllabus-week-badge">MOD 06</span>
                    <div>
                      <div class="syllabus-module-title">Telemetry, Guardrails &amp; Safety</div>
                      <div class="syllabus-module-desc">OpenTelemetry tracing, LangSmith eval &amp; automated rollback hooks.</div>
                    </div>
                  </div>
                </div>

                <!-- Roadmap Footer -->
                <div class="syllabus-footer-bar">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <i data-lucide="check-circle" style="color:#10b981;width:15px;height:15px;"></i>
                    <span style="font-weight:600;color:#e2e8f0;">Full Hands-On Labs with Real Production Cloud Sandboxes</span>
                  </div>
                  <span style="color:#38bdf8;font-weight:700;">Capstone: Self-Healing Agent</span>
                </div>
              </div>
            </div>
          </div>`;

// Replace slides 1 through 4 in html
const slidesRegex = /<!-- Slide 1: Understanding Automation -->[\s\S]*?<!-- Slide 5: Fundamental Technologies -->/;
const replacementSlides = newSlide1 + '\n\n' + newSlide2 + '\n\n' + newSlide3 + '\n\n' + newSlide4 + '\n\n          <!-- Slide 5: Fundamental Technologies -->';

html = html.replace(slidesRegex, replacementSlides);

fs.writeFileSync('automation-ml-ai-agentic/demo.html', html, 'utf8');
console.log('Successfully updated Slides 1-4 with eye-candy animations, removed code, and clear Helvetica syllabus!');
