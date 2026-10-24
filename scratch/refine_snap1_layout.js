const fs = require('fs');

let html = fs.readFileSync('automation-ml-ai-agentic/demo.html', 'utf8');

// Replace Snap 1 with the ultra-clean layout where everything fits in a single screen view
const refinedSnap1 = `      <!-- ===================================================================== -->
      <!-- SNAP 1: INTRO PARAGRAPH & EVOLUTION FLOW                               -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-1" data-snap-index="1" style="justify-content: flex-start; padding: 20px 32px; gap: 12px;">
        <!-- Eyebrow & Title -->
        <div>
          <div class="snap-eyebrow-row" style="margin-bottom: 6px;">
            <span class="snap-eyebrow-pill">
              <i data-lucide="bot" style="width:13px;height:13px;"></i>
              SNAP 01 &bull; INTRODUCTION &amp; EVOLUTION
            </span>
            <span class="snap-eyebrow-tag">AI Automation MasterClass</span>
          </div>
          <h1 class="snap-title" style="font-size: 1.65rem; margin: 0 0 6px 0;">Autonomous AI Automation &amp; Agentic Swarm Engineering</h1>
        </div>

        <!-- What is AI? 2 lines in prominent card -->
        <div class="what-is-ai-card" style="padding: 12px 18px; margin-bottom: 0;">
          <div class="what-is-ai-badge" style="margin-bottom: 6px;">
            <i data-lucide="sparkles" style="width:13px;height:13px;"></i>
            WHAT IS ARTIFICIAL INTELLIGENCE?
          </div>
          <p class="ai-def-line" style="font-size: 0.88rem; line-height: 1.45; margin-bottom: 4px;">
            <strong>Line 1:</strong> Artificial Intelligence (AI) is the science and engineering of computational architectures capable of perceiving environmental inputs, contextual reasoning, autonomous problem-solving, and continuous learning from experience.
          </p>
          <p class="ai-def-line" style="font-size: 0.88rem; line-height: 1.45; margin-bottom: 0;">
            <strong>Line 2:</strong> In modern enterprise engineering, AI shifts systems from fragile, deterministic rule scripts into self-governing cognitive entities that understand strategic intent, orchestrate tool APIs, and achieve verifiable outcomes.
          </p>
        </div>

        <!-- Image and Motion Graphic showing Automation + ML evolving to Gen AI and Agentic Development -->
        <div class="evolution-dual-grid" style="margin-bottom: 0; gap: 14px; align-items: center;">
          <!-- Left: High-Res Evolution Infographic Image -->
          <div class="evolution-image-frame" style="padding: 8px;">
            <img src="ai_evolution_stages.jpg" alt="Evolution of AI: Automation, Machine Learning, Generative AI, and Agentic AI" style="max-height: 135px; width: 100%; object-fit: contain;">
            <div class="evolution-img-caption" style="margin-top: 4px; font-size: 0.68rem;">
              <span>FIG 1.0 &bull; ARCHITECTURAL EPOCHS</span>
              <span>AUTOMATION &rarr; ML &rarr; GENAI &rarr; AGENTIC</span>
            </div>
          </div>

          <!-- Right: Horizontal / Compact Motion Graphic Flow -->
          <div class="evolution-motion-card" style="padding: 12px 14px;">
            <div class="motion-card-header" style="padding-bottom: 6px; margin-bottom: 8px;">
              <span class="motion-live-pill" style="font-size: 0.65rem;">
                <span class="pulse-dot"></span>
                LIVE EVOLUTION FLOW
              </span>
              <span style="font-family:var(--font-mono);font-size:0.68rem;color:#94a3b8;">
                EPOCHS 1.0 &rarr; 4.0
              </span>
            </div>

            <!-- 4-Stage Connected Flow -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; position: relative;">
              <!-- Stage 1 -->
              <div style="background: rgba(30,41,59,0.7); border: 1px solid #334155; border-radius: 8px; padding: 8px 6px; text-align: center;">
                <div style="width:24px;height:24px;border-radius:6px;background:#475569;display:flex;align-items:center;justify-content:center;margin:0 auto 4px auto;color:#fff;">
                  <i data-lucide="cog" style="width:13px;height:13px;"></i>
                </div>
                <div style="font-size: 0.72rem; font-weight: 800; color: #f8fafc; line-height: 1.2;">1. Automation</div>
                <div style="font-size: 0.62rem; color: #94a3b8; margin-top: 2px;">Scripts &bull; RPA</div>
              </div>

              <!-- Stage 2 -->
              <div style="background: rgba(30,41,59,0.7); border: 1px solid #0284c7; border-radius: 8px; padding: 8px 6px; text-align: center;">
                <div style="width:24px;height:24px;border-radius:6px;background:#0284c7;display:flex;align-items:center;justify-content:center;margin:0 auto 4px auto;color:#fff;">
                  <i data-lucide="network" style="width:13px;height:13px;"></i>
                </div>
                <div style="font-size: 0.72rem; font-weight: 800; color: #38bdf8; line-height: 1.2;">2. Machine Learning</div>
                <div style="font-size: 0.62rem; color: #94a3b8; margin-top: 2px;">Statistical &bull; XGBoost</div>
              </div>

              <!-- Stage 3 -->
              <div style="background: rgba(30,41,59,0.7); border: 1px solid #a855f7; border-radius: 8px; padding: 8px 6px; text-align: center;">
                <div style="width:24px;height:24px;border-radius:6px;background:#7c3aed;display:flex;align-items:center;justify-content:center;margin:0 auto 4px auto;color:#fff;">
                  <i data-lucide="cpu" style="width:13px;height:13px;"></i>
                </div>
                <div style="font-size: 0.72rem; font-weight: 800; color: #c084fc; line-height: 1.2;">3. Generative AI</div>
                <div style="font-size: 0.62rem; color: #94a3b8; margin-top: 2px;">LLMs &bull; Transformers</div>
              </div>

              <!-- Stage 4 -->
              <div style="background: rgba(16,185,129,0.12); border: 1px solid #10b981; border-radius: 8px; padding: 8px 6px; text-align: center; box-shadow: 0 0 10px rgba(16,185,129,0.2);">
                <div style="width:24px;height:24px;border-radius:6px;background:#059669;display:flex;align-items:center;justify-content:center;margin:0 auto 4px auto;color:#fff;">
                  <i data-lucide="repeat" style="width:13px;height:13px;"></i>
                </div>
                <div style="font-size: 0.72rem; font-weight: 800; color: #34d399; line-height: 1.2;">4. Agentic Swarms</div>
                <div style="font-size: 0.62rem; color: #6ee7b7; margin-top: 2px;">ReAct &bull; MCP Tools</div>
              </div>
            </div>

            <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 0.68rem; color: #94a3b8; font-family: var(--font-mono);">
              <span>FLOW: Deterministic &rarr; Statistical &rarr; Generative &rarr; Autonomous</span>
              <span style="color:#10b981; font-weight:700;">&bull; Active Evolution</span>
            </div>
          </div>
        </div>

        <!-- Fixed / Highlight Box with Awesome Design -->
        <div class="venkata-awesome-box" style="padding: 12px 18px;">
          <div class="venkata-profile-left">
            <div class="venkata-avatar-ring" style="width: 44px; height: 44px; font-size: 1rem;">
              VB
              <div class="venkata-verified-badge" style="width: 15px; height: 15px; font-size: 9px;">&#x2713;</div>
            </div>
            <div class="venkata-info">
              <div class="venkata-title-line" style="font-size: 1rem;">
                <span>Iam Venkata Bhattaram</span>
                <span style="font-size:0.7rem;padding:2px 7px;border-radius:4px;background:rgba(124,58,237,0.3);color:#c084fc;font-family:var(--font-mono);">INSTRUCTOR</span>
              </div>
              <div class="venkata-exp-line" style="font-size: 0.82rem;">
                <strong>18+ USA Experience</strong> in Enterprise Systems, Data Engineering and AI
              </div>
            </div>
          </div>

          <div class="venkata-pills-right">
            <span class="venkata-pill" style="font-size:0.7rem;"><i data-lucide="award" style="width:12px;height:12px;color:#fbbf24;"></i> Enterprise Architect</span>
            <span class="venkata-pill" style="font-size:0.7rem;"><i data-lucide="database" style="width:12px;height:12px;color:#38bdf8;"></i> Large-Scale Data Systems</span>
            <span class="venkata-pill" style="font-size:0.7rem;"><i data-lucide="bot" style="width:12px;height:12px;color:#34d399;"></i> Agentic AI &amp; MCP</span>
          </div>
        </div>
      </section>`;

// Replace Snap 1 in html
const snap1Regex = /<!-- =+ -->\s*<!-- SNAP 1: INTRO PARAGRAPH[\s\S]*?<\/section>/;
html = html.replace(snap1Regex, refinedSnap1);

fs.writeFileSync('automation-ml-ai-agentic/demo.html', html, 'utf8');
console.log('Successfully replaced Snap 1 with ultra-compact refined layout!');
