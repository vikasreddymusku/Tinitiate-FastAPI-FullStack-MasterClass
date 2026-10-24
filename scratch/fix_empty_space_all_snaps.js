const fs = require('fs');

let html = fs.readFileSync('automation-ml-ai-agentic/demo.html', 'utf8');

// 1. UPDATE CSS FOR SNAP SECTIONS, MAX-WIDTH INNER WRAPPERS & RICH PROPORTIONS
// Find and replace the snap scroller & snap section CSS
const oldCssMatch = /\.demo-snap-scroller \{[\s\S]*?\.snap-card-section:nth-child\(even\) \{[^}]*\}/;

const newSnapScrollerCss = `.demo-snap-scroller {
      position: relative;
      height: 100%;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
      scroll-behavior: smooth;
      background: #f8fafc;
      box-sizing: border-box;
    }

    /* Snap Section Baseline - Clean Centered Layout */
    .snap-card-section {
      min-height: calc(100vh - var(--nav-height, 74px));
      scroll-snap-align: start;
      scroll-snap-stop: always;
      box-sizing: border-box;
      padding: 30px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .snap-card-section:nth-child(even) {
      background: #ffffff;
    }

    /* Central Content Wrapper to prevent ultra-wide stretching and eliminate empty gaps */
    .snap-inner-wrap {
      width: 100%;
      max-width: 1260px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
    }`;

html = html.replace(oldCssMatch, newSnapScrollerCss);

// 2. UPDATE MEDIA QUERY SO RIGHT SIDEBAR STAYS VISIBLE ON DESKTOP & LAPTOPS
html = html.replace(
  /@media \(max-width: 1180px\) \{\s*\.demo-snap-layout \{\s*grid-template-columns: 240px 1fr;\s*\}\s*\.demo-sidebar-right \{\s*display: none;\s*\}\s*\}/g,
  `@media (max-width: 980px) {
      .demo-snap-layout {
        grid-template-columns: 240px 1fr;
      }
      .demo-sidebar-right {
        display: none;
      }
    }`
);

// Also ensure layout columns are well-balanced
html = html.replace(
  `grid-template-columns: var(--snap-nav-w-left) 1fr var(--snap-nav-w-right);`,
  `grid-template-columns: 250px minmax(0, 1fr) 230px;`
);

// 3. REFINING SNAP 1 CONTENT TO ELIMINATE EMPTY SPACE
const newSnap1 = `      <!-- ===================================================================== -->
      <!-- SNAP 1: INTRO PARAGRAPH & EVOLUTION FLOW                               -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-1" data-snap-index="1">
        <div class="snap-inner-wrap">
          <!-- Header Row -->
          <div>
            <div class="snap-eyebrow-row" style="margin-bottom: 6px;">
              <span class="snap-eyebrow-pill">
                <i data-lucide="bot" style="width:13px;height:13px;"></i>
                SNAP 01 &bull; INTRODUCTION &amp; EVOLUTION
              </span>
              <span class="snap-eyebrow-tag">AI Automation MasterClass</span>
            </div>
            <h1 class="snap-title" style="font-size: 1.85rem; margin: 0 0 6px 0;">Autonomous AI Automation &amp; Agentic Swarm Engineering</h1>
          </div>

          <!-- What is AI? (2 lines) -->
          <div class="what-is-ai-card" style="margin-bottom: 0; padding: 14px 20px;">
            <div class="what-is-ai-badge" style="margin-bottom: 6px;">
              <i data-lucide="sparkles" style="width:14px;height:14px;"></i>
              WHAT IS ARTIFICIAL INTELLIGENCE?
            </div>
            <p class="ai-def-line" style="font-size: 0.94rem; line-height: 1.5; margin-bottom: 4px;">
              <strong>Line 1:</strong> Artificial Intelligence (AI) is the science and engineering of computational architectures capable of perceiving environmental inputs, contextual reasoning, autonomous problem-solving, and continuous learning from experience.
            </p>
            <p class="ai-def-line" style="font-size: 0.94rem; line-height: 1.5; margin-bottom: 0;">
              <strong>Line 2:</strong> In modern enterprise engineering, AI shifts systems from fragile, deterministic rule scripts into self-governing cognitive entities that understand strategic intent, orchestrate tool APIs, and achieve verifiable outcomes.
            </p>
          </div>

          <!-- Evolution Dual Display: Generous 250px height filling the frame -->
          <div class="evolution-dual-grid" style="margin-bottom: 0; gap: 18px; align-items: stretch;">
            <!-- Left: High-Res Infographic Image -->
            <div class="evolution-image-frame" style="padding: 10px; height: 260px; box-sizing: border-box; display: flex; flex-direction: column;">
              <img src="ai_evolution_stages.jpg" alt="Evolution of AI: Automation, Machine Learning, Generative AI, and Agentic AI" style="width: 100%; height: 210px; object-fit: cover; object-position: center; border-radius: 8px;">
              <div class="evolution-img-caption" style="margin-top: 6px; font-size: 0.72rem;">
                <span>FIG 1.0 &bull; ARCHITECTURAL EPOCHS</span>
                <span>AUTOMATION &rarr; ML &rarr; GENAI &rarr; AGENTIC</span>
              </div>
            </div>

            <!-- Right: Interactive Motion Graphic Flow -->
            <div class="evolution-motion-card" style="padding: 16px 18px; height: 260px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
              <div class="motion-card-header" style="padding-bottom: 6px; margin-bottom: 4px;">
                <span class="motion-live-pill" style="font-size: 0.7rem;">
                  <span class="pulse-dot"></span>
                  LIVE EVOLUTION FLOW &bull; EPOCHS 1.0 &rarr; 4.0
                </span>
                <span style="font-family:var(--font-mono);font-size:0.7rem;color:#94a3b8;">
                  PARADIGM SHIFT
                </span>
              </div>

              <!-- 4 Connected Interactive Stages -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: auto 0;">
                <!-- Stage 1 -->
                <div style="background: rgba(30,41,59,0.7); border: 1px solid #334155; border-radius: 10px; padding: 12px 8px; text-align: center;">
                  <div style="width:28px;height:28px;border-radius:6px;background:#475569;display:flex;align-items:center;justify-content:center;margin:0 auto 6px auto;color:#fff;">
                    <i data-lucide="cog" style="width:15px;height:15px;"></i>
                  </div>
                  <div style="font-size: 0.76rem; font-weight: 800; color: #f8fafc; line-height: 1.2;">1. Automation</div>
                  <div style="font-size: 0.65rem; color: #94a3b8; margin-top: 3px;">Scripts &bull; RPA</div>
                  <div style="font-size: 0.62rem; color: #64748b; margin-top: 4px;">Deterministic</div>
                </div>

                <!-- Stage 2 -->
                <div style="background: rgba(30,41,59,0.7); border: 1px solid #0284c7; border-radius: 10px; padding: 12px 8px; text-align: center;">
                  <div style="width:28px;height:28px;border-radius:6px;background:#0284c7;display:flex;align-items:center;justify-content:center;margin:0 auto 6px auto;color:#fff;">
                    <i data-lucide="network" style="width:15px;height:15px;"></i>
                  </div>
                  <div style="font-size: 0.76rem; font-weight: 800; color: #38bdf8; line-height: 1.2;">2. Machine Learning</div>
                  <div style="font-size: 0.65rem; color: #94a3b8; margin-top: 3px;">Statistical Models</div>
                  <div style="font-size: 0.62rem; color: #38bdf8; margin-top: 4px;">Pattern Finding</div>
                </div>

                <!-- Stage 3 -->
                <div style="background: rgba(30,41,59,0.7); border: 1px solid #a855f7; border-radius: 10px; padding: 12px 8px; text-align: center;">
                  <div style="width:28px;height:28px;border-radius:6px;background:#7c3aed;display:flex;align-items:center;justify-content:center;margin:0 auto 6px auto;color:#fff;">
                    <i data-lucide="cpu" style="width:15px;height:15px;"></i>
                  </div>
                  <div style="font-size: 0.76rem; font-weight: 800; color: #c084fc; line-height: 1.2;">3. Generative AI</div>
                  <div style="font-size: 0.65rem; color: #94a3b8; margin-top: 3px;">Transformers &bull; LLMs</div>
                  <div style="font-size: 0.62rem; color: #c084fc; margin-top: 4px;">Synthesis</div>
                </div>

                <!-- Stage 4 -->
                <div style="background: rgba(16,185,129,0.15); border: 1px solid #10b981; border-radius: 10px; padding: 12px 8px; text-align: center; box-shadow: 0 0 14px rgba(16,185,129,0.25);">
                  <div style="width:28px;height:28px;border-radius:6px;background:#059669;display:flex;align-items:center;justify-content:center;margin:0 auto 6px auto;color:#fff;">
                    <i data-lucide="repeat" style="width:15px;height:15px;"></i>
                  </div>
                  <div style="font-size: 0.76rem; font-weight: 800; color: #34d399; line-height: 1.2;">4. Agentic Swarms</div>
                  <div style="font-size: 0.65rem; color: #a7f3d0; margin-top: 3px;">MCP &bull; ReAct Loops</div>
                  <div style="font-size: 0.62rem; color: #10b981; margin-top: 4px;">Autonomous</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.72rem; color: #94a3b8; font-family: var(--font-mono); border-top: 1px solid #1e293b; padding-top: 8px;">
                <span>FLOW: Deterministic Code &rarr; Statistical Fits &rarr; Foundation Models &rarr; Autonomous Agents</span>
                <span style="color:#10b981; font-weight:700;">&bull; Self-Governing</span>
              </div>
            </div>
          </div>

          <!-- Fixed Box: Venkata Bhattaram Credentials (Awesome Design) -->
          <div class="venkata-awesome-box" style="padding: 14px 22px;">
            <div class="venkata-profile-left">
              <div class="venkata-avatar-ring" style="width: 48px; height: 48px; font-size: 1.1rem;">
                VB
                <div class="venkata-verified-badge" style="width: 16px; height: 16px; font-size: 10px;">&#x2713;</div>
              </div>
              <div class="venkata-info">
                <div class="venkata-title-line" style="font-size: 1.05rem;">
                  <span>Iam Venkata Bhattaram</span>
                  <span style="font-size:0.72rem;padding:2px 8px;border-radius:4px;background:rgba(124,58,237,0.3);color:#c084fc;font-family:var(--font-mono);">LEAD INSTRUCTOR</span>
                </div>
                <div class="venkata-exp-line" style="font-size: 0.88rem;">
                  <strong>18+ USA Experience</strong> in Enterprise Systems, Data Engineering and AI
                </div>
              </div>
            </div>

            <div class="venkata-pills-right">
              <span class="venkata-pill"><i data-lucide="award" style="width:13px;height:13px;color:#fbbf24;"></i> Enterprise Architect</span>
              <span class="venkata-pill"><i data-lucide="database" style="width:13px;height:13px;color:#38bdf8;"></i> Large-Scale Data Systems</span>
              <span class="venkata-pill"><i data-lucide="bot" style="width:13px;height:13px;color:#34d399;"></i> Agentic AI &amp; MCP Frameworks</span>
            </div>
          </div>
        </div>
      </section>`;

// Replace Snap 1
const snap1Regex = /<!-- =+ -->\s*<!-- SNAP 1: INTRO PARAGRAPH[\s\S]*?<\/section>/;
html = html.replace(snap1Regex, newSnap1);

// 4. WRAP SNAPS 2, 3, 4, 5 IN .snap-inner-wrap AND GIVE GENEROUS HEIGHTS
// Snap 2
html = html.replace(
  '<section class="snap-card-section" id="snap-2" data-snap-index="2">',
  '<section class="snap-card-section" id="snap-2" data-snap-index="2">\n        <div class="snap-inner-wrap">'
);
html = html.replace(
  '</section>\n\n      <!-- ===================================================================== -->\n      <!-- SNAP 3:',
  '</div>\n      </section>\n\n      <!-- ===================================================================== -->\n      <!-- SNAP 3:'
);

// Snap 3
html = html.replace(
  '<section class="snap-card-section" id="snap-3" data-snap-index="3">',
  '<section class="snap-card-section" id="snap-3" data-snap-index="3">\n        <div class="snap-inner-wrap">'
);
html = html.replace(
  '</section>\n\n      <!-- ===================================================================== -->\n      <!-- SNAP 4:',
  '</div>\n      </section>\n\n      <!-- ===================================================================== -->\n      <!-- SNAP 4:'
);

// Snap 4
html = html.replace(
  '<section class="snap-card-section" id="snap-4" data-snap-index="4">',
  '<section class="snap-card-section" id="snap-4" data-snap-index="4">\n        <div class="snap-inner-wrap">'
);
html = html.replace(
  '</section>\n\n      <!-- ===================================================================== -->\n      <!-- SNAP 5:',
  '</div>\n      </section>\n\n      <!-- ===================================================================== -->\n      <!-- SNAP 5:'
);

// Snap 5
html = html.replace(
  '<section class="snap-card-section" id="snap-5" data-snap-index="5">',
  '<section class="snap-card-section" id="snap-5" data-snap-index="5">\n        <div class="snap-inner-wrap">'
);
html = html.replace(
  '</section>\n\n      <!-- Snap Footer at bottom of scroller -->',
  '</div>\n      </section>\n\n      <!-- Snap Footer at bottom of scroller -->'
);

// 5. ADJUST HEIGHTS IN CSS TO FILL THE VERTICAL SPACE LUXURIOUSLY
// Slideshow min-height
html = html.replace('min-height: 380px;', 'min-height: 460px;');
// Remotion screen height
html = html.replace('height: 360px;', 'height: 420px;');
// Terminal height in Snap 5
html = html.replace('height: 280px;', 'height: 380px;');
html = html.replace('height: 290px;', 'height: 380px;');

fs.writeFileSync('automation-ml-ai-agentic/demo.html', html, 'utf8');
console.log('Successfully eliminated empty space across all snaps!');
