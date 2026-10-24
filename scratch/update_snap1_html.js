const fs = require('fs');
const path = 'c:/work/GIT-CODE/interactive-ui/automation-ml-ai-agentic/demo.html';

let content = fs.readFileSync(path, 'utf8');

const snap1Start = content.indexOf('<section class="snap-card-section" id="snap-1"');
const snap2Start = content.indexOf('<section class="snap-card-section" id="snap-2"');

if (snap1Start === -1 || snap2Start === -1) {
  console.error("Could not find snap-1 and snap-2 boundaries");
  process.exit(1);
}

const newSnap1Html = `<section class="snap-card-section" id="snap-1" data-snap-index="1">
        <div class="snap-inner-wrap">
          <!-- Header Row -->
          <div>
            <div class="snap-eyebrow-row" style="margin-bottom: 6px;">
              <span class="snap-eyebrow-pill" style="font-size:0.88rem; font-weight:800; padding:4px 12px;">
                <i data-lucide="bot" style="width:16px;height:16px;"></i>
                SNAP 01 &bull; INTRODUCTION &amp; EVOLUTION
              </span>
              <span class="snap-eyebrow-tag" style="font-size:0.88rem; font-weight:800; padding:4px 10px;">AI Automation MasterClass</span>
            </div>
            <h1 class="snap-title" style="font-size: 2.1rem; margin: 0 0 8px 0; font-weight: 900; letter-spacing: -0.02em;">Autonomous AI Automation &amp; Agentic Swarm Engineering</h1>
          </div>

          <!-- What is AI? (2 lines) - Presentation Scale -->
          <div class="what-is-ai-card" style="margin-bottom: 0; padding: 16px 24px;">
            <div class="what-is-ai-badge" style="margin-bottom: 8px; font-size: 0.95rem; font-weight: 800;">
              <i data-lucide="sparkles" style="width:16px;height:16px;"></i>
              WHAT IS ARTIFICIAL INTELLIGENCE?
            </div>
            <p class="ai-def-line" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 6px;">
              <strong>Line 1:</strong> Artificial Intelligence (AI) is the science and engineering of computational architectures capable of perceiving environmental inputs, contextual reasoning, autonomous problem-solving, and continuous learning from experience.
            </p>
            <p class="ai-def-line" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 0;">
              <strong>Line 2:</strong> In modern enterprise engineering, AI shifts systems from fragile, deterministic rule scripts into self-governing cognitive entities that understand strategic intent, orchestrate tool APIs, and achieve verifiable outcomes.
            </p>
          </div>

          <!-- Evolution Dual Display: Generous presentation view with zero micro font -->
          <div class="evolution-dual-grid" style="margin-bottom: 0; gap: 20px; align-items: stretch; flex: 1;">
            <!-- Left: High-Res Infographic Image with Zoom & Container Fit -->
            <div class="evolution-image-frame">
              <div class="evolution-image-wrapper">
                <img src="ai_evolution_stages.jpg" alt="Evolution of AI: Automation, Machine Learning, Generative AI, and Agentic AI" id="snap1InfographicImg">
                <button class="image-zoom-overlay-btn" onclick="openImageLightbox()" title="View Full-Screen High-Res Diagram">
                  <i data-lucide="maximize-2" style="width:16px;height:16px;"></i>
                  <span>Zoom Full Diagram</span>
                </button>
              </div>
              <div class="evolution-img-caption">
                <span style="font-weight:800; color:#38bdf8;">FIG 1.0 &bull; ARCHITECTURAL EPOCHS</span>
                <span style="font-weight:700; color:#cbd5e1;">AUTOMATION &rarr; TRADITIONAL ML &rarr; GENAI &rarr; AGENTIC SWARMS</span>
              </div>
            </div>

            <!-- Right: "Rules to AI Agents" 30-Second Kinetic Evolution Studio (Modeled on YouTube Short) -->
            <div class="evolution-motion-card">
              <div class="motion-tour-header">
                <span class="motion-tour-title">
                  <span class="pulse-dot"></span>
                  AI EVOLUTION IN 30 SECONDS &bull; RULES TO AI AGENTS
                </span>
                <div class="tour-controls-bar">
                  <button class="tour-play-btn" id="tourPlayBtn" onclick="toggleTourPlay()">
                    <i data-lucide="play" id="tourPlayIcon" style="width:15px;height:15px;"></i>
                    <span id="tourPlayText">Play 30s Tour</span>
                  </button>
                  <span class="tour-time-pill" id="tourTimeText">00:00 / 00:30</span>
                </div>
              </div>

              <!-- 4 Interactive Epoch Tabs -->
              <div class="epoch-tabs-row">
                <div class="epoch-tab-btn e-auto active" onclick="selectEpochStage(1)" id="epochTab1">
                  <span class="epoch-tab-num">EPOCH 1</span>
                  <span class="epoch-tab-label"><i data-lucide="cog" style="width:15px;height:15px;display:inline-block;vertical-align:-2px;margin-right:3px;"></i> Rules Era</span>
                </div>
                <div class="epoch-tab-btn e-ml" onclick="selectEpochStage(2)" id="epochTab2">
                  <span class="epoch-tab-num">EPOCH 2</span>
                  <span class="epoch-tab-label"><i data-lucide="network" style="width:15px;height:15px;display:inline-block;vertical-align:-2px;margin-right:3px;"></i> Machine Learning</span>
                </div>
                <div class="epoch-tab-btn e-gen" onclick="selectEpochStage(3)" id="epochTab3">
                  <span class="epoch-tab-num">EPOCH 3</span>
                  <span class="epoch-tab-label"><i data-lucide="sparkles" style="width:15px;height:15px;display:inline-block;vertical-align:-2px;margin-right:3px;"></i> Generative AI</span>
                </div>
                <div class="epoch-tab-btn e-agent" onclick="selectEpochStage(4)" id="epochTab4">
                  <span class="epoch-tab-num">EPOCH 4</span>
                  <span class="epoch-tab-label"><i data-lucide="repeat" style="width:15px;height:15px;display:inline-block;vertical-align:-2px;margin-right:3px;"></i> Agentic AI</span>
                </div>
              </div>

              <!-- Active Dynamic Stage Viewport -->
              <div class="epoch-stage-viewport">
                <!-- Epoch 1 Panel -->
                <div class="epoch-stage-panel active" id="epochPanel1">
                  <div>
                    <div class="epoch-panel-title-row">
                      <span class="epoch-panel-title" style="color:#f8fafc;">1. The Rulebook Era (Rules &amp; Expert Systems)</span>
                      <span style="font-size:0.85rem;font-weight:800;color:#94a3b8;padding:3px 8px;background:rgba(255,255,255,0.08);border-radius:4px;">1990s &ndash; 2000s</span>
                    </div>
                    <div class="epoch-panel-tagline">
                      A rigid cage of deterministic If/Then flowcharts. No learning, zero adaptability; crashes instantly upon unexpected schema drift.
                    </div>
                  </div>
                  <div class="epoch-interactive-visual">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <i data-lucide="clock" style="color:#38bdf8;width:26px;height:26px;"></i>
                      <div>
                        <div style="font-size:1.02rem;font-weight:900;color:#fff;">Cron &bull; RPA Scripts</div>
                        <div style="font-size:0.88rem;color:#94a3b8;">Hardcoded Conditions</div>
                      </div>
                    </div>
                    <i data-lucide="arrow-right" style="color:#f43f5e;width:22px;height:22px;"></i>
                    <div style="background:rgba(225,29,72,0.2);border:1px solid #f43f5e;border-radius:8px;padding:8px 14px;color:#fecdd3;display:flex;align-items:center;gap:8px;">
                      <i data-lucide="alert-triangle" style="color:#fb7185;width:20px;height:20px;"></i>
                      <div>
                        <div style="font-size:0.95rem;font-weight:900;color:#fff;">Schema Drift Exception</div>
                        <div style="font-size:0.82rem;color:#fecdd3;">Fatal Process Crash (Exit 1)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Epoch 2 Panel -->
                <div class="epoch-stage-panel" id="epochPanel2">
                  <div>
                    <div class="epoch-panel-title-row">
                      <span class="epoch-panel-title" style="color:#38bdf8;">2. Statistical Machine Learning (Pattern Recognition)</span>
                      <span style="font-size:0.85rem;font-weight:800;color:#38bdf8;padding:3px 8px;background:rgba(2,132,199,0.15);border-radius:4px;">2010s</span>
                    </div>
                    <div class="epoch-panel-tagline">
                      Replaces human rules with mathematical models trained on historic datasets to learn weights, minimize loss, and predict probabilities.
                    </div>
                  </div>
                  <div class="epoch-interactive-visual">
                    <div style="display:flex;flex-direction:column;gap:4px;">
                      <span style="font-size:0.88rem;font-weight:800;color:#e2e8f0;background:rgba(2,132,199,0.2);padding:3px 8px;border-radius:4px;">Features: [x₁, x₂, x₃]</span>
                      <span style="font-size:0.82rem;color:#94a3b8;">Tabular Preprocessing</span>
                    </div>
                    <i data-lucide="arrow-right" style="color:#38bdf8;width:22px;height:22px;"></i>
                    <div style="display:flex;align-items:center;gap:8px;background:rgba(15,23,42,0.8);border:1px solid #0284c7;border-radius:8px;padding:8px 14px;">
                      <div class="ml-weight-node" style="width:32px;height:32px;font-size:0.85rem;">W*</div>
                      <div>
                        <div style="font-size:0.95rem;font-weight:900;color:#fff;">Gradient Weights</div>
                        <div style="font-size:0.82rem;color:#94a3b8;">Loss Minimization</div>
                      </div>
                    </div>
                    <i data-lucide="arrow-right" style="color:#10b981;width:22px;height:22px;"></i>
                    <div style="background:rgba(16,185,129,0.2);border:1px solid #10b981;border-radius:8px;padding:8px 14px;color:#a7f3d0;text-align:center;">
                      <div style="font-size:1.2rem;font-weight:900;color:#fff;">94.2%</div>
                      <div style="font-size:0.82rem;font-weight:800;color:#6ee7b7;">Class Prediction</div>
                    </div>
                  </div>
                </div>

                <!-- Epoch 3 Panel -->
                <div class="epoch-stage-panel" id="epochPanel3">
                  <div>
                    <div class="epoch-panel-title-row">
                      <span class="epoch-panel-title" style="color:#c084fc;">3. Generative AI &amp; Foundation Models (Transformers)</span>
                      <span style="font-size:0.85rem;font-weight:800;color:#c084fc;padding:3px 8px;background:rgba(124,58,237,0.2);border-radius:4px;">2022 &ndash; Present</span>
                    </div>
                    <div class="epoch-panel-tagline">
                      Multi-billion parameter transformers reasoning across multimodal context with multi-head self-attention mechanisms and code synthesis.
                    </div>
                  </div>
                  <div class="epoch-interactive-visual">
                    <div style="display:flex;flex-direction:column;gap:4px;">
                      <span style="font-size:0.88rem;font-weight:800;color:#f3e8ff;background:rgba(124,58,237,0.3);padding:3px 8px;border-radius:4px;">Prompt Tokens</span>
                      <span style="font-size:0.82rem;color:#c084fc;">"Triage K8s Pod..."</span>
                    </div>
                    <i data-lucide="arrow-right" style="color:#c084fc;width:22px;height:22px;"></i>
                    <div style="display:flex;align-items:center;gap:8px;background:radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(15,23,42,0.9) 80%);border:1px solid #a855f7;border-radius:8px;padding:8px 14px;">
                      <i data-lucide="cpu" style="color:#e9d5ff;width:24px;height:24px;"></i>
                      <div>
                        <div style="font-size:0.95rem;font-weight:900;color:#fff;">Self-Attention Core</div>
                        <div style="font-size:0.82rem;color:#d8b4fe;">Q &bull; K &bull; V Matrix Softmax</div>
                      </div>
                    </div>
                    <i data-lucide="arrow-right" style="color:#38bdf8;width:22px;height:22px;"></i>
                    <div style="background:rgba(56,189,248,0.2);border:1px solid #38bdf8;border-radius:8px;padding:8px 14px;color:#e0f2fe;text-align:center;">
                      <div style="font-size:0.95rem;font-weight:900;color:#fff;">Token Stream</div>
                      <div style="font-size:0.82rem;font-weight:800;color:#7dd3fc;">"Invoking MCP Tool..."</div>
                    </div>
                  </div>
                </div>

                <!-- Epoch 4 Panel -->
                <div class="epoch-stage-panel" id="epochPanel4">
                  <div>
                    <div class="epoch-panel-title-row">
                      <span class="epoch-panel-title" style="color:#34d399;">4. Autonomous AI Agents (Self-Governing Swarms)</span>
                      <span style="font-size:0.85rem;font-weight:800;color:#10b981;padding:3px 8px;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);border-radius:4px;">Next Gen</span>
                    </div>
                    <div class="epoch-panel-tagline">
                      From following rules to writing their own rules! Autonomous goal-directed reasoning, Model Context Protocol (MCP) tool execution &amp; self-healing.
                    </div>
                  </div>
                  <div class="epoch-interactive-visual" style="border-color:rgba(16,185,129,0.4);background:rgba(16,185,129,0.08);">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <div style="width:36px;height:36px;border-radius:50%;background:#059669;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 14px #10b981;">
                        <i data-lucide="repeat" style="width:20px;height:20px;"></i>
                      </div>
                      <div>
                        <div style="font-size:1rem;font-weight:900;color:#fff;">ReAct Reasoning Loop</div>
                        <div style="font-size:0.82rem;color:#a7f3d0;">PLAN &rarr; ACT &rarr; OBSERVE &rarr; REFLECT</div>
                      </div>
                    </div>
                    <i data-lucide="arrow-right" style="color:#10b981;width:22px;height:22px;"></i>
                    <div style="background:rgba(15,23,42,0.9);border:1px solid #10b981;border-radius:8px;padding:8px 14px;color:#a7f3d0;display:flex;align-items:center;gap:8px;">
                      <i data-lucide="check-circle" style="color:#34d399;width:20px;height:20px;"></i>
                      <div>
                        <div style="font-size:0.95rem;font-weight:900;color:#fff;">MCP Tool Bus</div>
                        <div style="font-size:0.82rem;color:#6ee7b7;">K8s &bull; SQL &bull; APIs &bull; Self-Healing</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Timeline Progress Scrubber -->
                <div class="epoch-timeline-scrubber">
                  <div class="epoch-scrubber-fill" id="epochScrubberFill"></div>
                </div>
              </div>

              <!-- Executive Paradigm Banner -->
              <div class="epoch-paradigm-banner">
                <span>PARADIGM SHIFT: <strong>From following rules to writing their own rules!</strong></span>
                <span style="color:#38bdf8; font-weight:800;">Autonomous Closed-Loop Execution</span>
              </div>
            </div>
          </div>

          <!-- Fixed Box: Venkata Bhattaram Credentials (Awesome Design) -->
          <div class="venkata-awesome-box">
            <div class="venkata-profile-left">
              <div class="venkata-avatar-ring">
                VB
                <div class="venkata-verified-badge">&#x2713;</div>
              </div>
              <div class="venkata-info">
                <div class="venkata-title-line">
                  <span>Iam Venkata Bhattaram</span>
                  <span style="font-size:0.82rem;padding:3px 10px;border-radius:6px;background:rgba(124,58,237,0.35);color:#d8b4fe;border:1px solid rgba(168,85,247,0.4);font-family:var(--font-sans);font-weight:800;">LEAD INSTRUCTOR</span>
                </div>
                <div class="venkata-exp-line">
                  <strong>18+ USA Experience</strong> in Enterprise Systems, Data Engineering and AI
                </div>
              </div>
            </div>

            <div class="venkata-pills-right">
              <span class="venkata-pill"><i data-lucide="award" style="width:16px;height:16px;color:#fbbf24;"></i> Enterprise Architect</span>
              <span class="venkata-pill"><i data-lucide="database" style="width:16px;height:16px;color:#38bdf8;"></i> Large-Scale Data Systems</span>
              <span class="venkata-pill"><i data-lucide="bot" style="width:16px;height:16px;color:#34d399;"></i> Agentic AI &amp; MCP Frameworks</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Full-Screen Lightbox Modal for Presentation Zoom -->
      <div id="imageLightboxModal" class="image-lightbox-modal" onclick="closeImageLightbox()">
        <div class="lightbox-content" onclick="event.stopPropagation()">
          <button class="lightbox-close-btn" onclick="closeImageLightbox()" title="Close Fullscreen">&times;</button>
          <img src="ai_evolution_stages.jpg" alt="Evolution of AI Architecture Full Screen">
          <div class="lightbox-caption">
            FIG 1.0 &bull; ARCHITECTURAL EPOCHS: AUTOMATION &rarr; TRADITIONAL ML &rarr; GENERATIVE AI &rarr; AGENTIC SWARMS
          </div>
        </div>
      </div>
`;

content = content.substring(0, snap1Start) + newSnap1Html + content.substring(snap2Start);

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully replaced Snap 1 HTML!");
