const fs = require('fs');

let html = fs.readFileSync('automation-ml-ai-agentic/demo.html', 'utf8');

// 1. UPDATE CSS: Eliminate wide gaps and empty spaces
// Let snap-inner-wrap use max-width: 1400px and flex: 1 to fill vertical height naturally
html = html.replace(
  /\.snap-inner-wrap \{[\s\S]*?\}/,
  `.snap-inner-wrap {
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      gap: 16px;
    }`
);

// Update .snap-card-section padding
html = html.replace(
  /\.snap-card-section \{[\s\S]*?padding: [^;]*;[\s\S]*?position: relative;\s*\}/,
  `.snap-card-section {
      height: calc(100vh - var(--nav-height, 74px));
      min-height: 700px;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      box-sizing: border-box;
      padding: 24px 36px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    }`
);

// 2. SNAP 1: Make Image and Motion Graphic generously fill the space without black voids
// Replace the evolution-dual-grid in Snap 1
const oldSnap1DualGridRegex = /<div class="evolution-dual-grid"[\s\S]*?<!-- Fixed Box: Venkata Bhattaram/;
const newSnap1DualGrid = `<div class="evolution-dual-grid" style="margin-bottom: 0; gap: 20px; align-items: stretch; flex: 1; min-height: 320px;">
            <!-- Left: High-Res Infographic Image Filling Frame -->
            <div class="evolution-image-frame" style="padding: 10px; box-sizing: border-box; display: flex; flex-direction: column; height: 100%;">
              <img src="ai_evolution_stages.jpg" alt="Evolution of AI: Automation, Machine Learning, Generative AI, and Agentic AI" style="width: 100%; flex: 1; min-height: 260px; object-fit: cover; object-position: center; border-radius: 8px;">
              <div class="evolution-img-caption" style="margin-top: 8px; font-size: 0.74rem;">
                <span>FIG 1.0 &bull; ARCHITECTURAL EPOCHS</span>
                <span>AUTOMATION &rarr; ML &rarr; GENAI &rarr; AGENTIC</span>
              </div>
            </div>

            <!-- Right: Interactive Motion Graphic Flow Filling Frame -->
            <div class="evolution-motion-card" style="padding: 18px 22px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
              <div class="motion-card-header" style="padding-bottom: 8px; margin-bottom: 8px;">
                <span class="motion-live-pill" style="font-size: 0.72rem;">
                  <span class="pulse-dot"></span>
                  LIVE EVOLUTION PIPELINE &bull; EPOCHS 1.0 &rarr; 4.0
                </span>
                <span style="font-family:var(--font-mono);font-size:0.72rem;color:#94a3b8;">
                  PARADIGM EVOLUTION
                </span>
              </div>

              <!-- 4 Connected Interactive Stages -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: auto 0; flex: 1; align-items: stretch;">
                <!-- Stage 1 -->
                <div style="background: rgba(30,41,59,0.7); border: 1px solid #334155; border-radius: 10px; padding: 14px 10px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                  <div style="width:34px;height:34px;border-radius:8px;background:#475569;display:flex;align-items:center;justify-content:center;margin:0 auto 8px auto;color:#fff;">
                    <i data-lucide="cog" style="width:18px;height:18px;"></i>
                  </div>
                  <div style="font-size: 0.82rem; font-weight: 800; color: #f8fafc; line-height: 1.25;">1. Automation</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 4px;">Scripts &bull; RPA</div>
                  <div style="font-size: 0.65rem; color: #64748b; margin-top: 6px; padding: 2px 6px; background: rgba(0,0,0,0.2); border-radius: 4px;">Deterministic</div>
                </div>

                <!-- Stage 2 -->
                <div style="background: rgba(30,41,59,0.7); border: 1px solid #0284c7; border-radius: 10px; padding: 14px 10px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                  <div style="width:34px;height:34px;border-radius:8px;background:#0284c7;display:flex;align-items:center;justify-content:center;margin:0 auto 8px auto;color:#fff;">
                    <i data-lucide="network" style="width:18px;height:18px;"></i>
                  </div>
                  <div style="font-size: 0.82rem; font-weight: 800; color: #38bdf8; line-height: 1.25;">2. Machine Learning</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 4px;">Statistical Models</div>
                  <div style="font-size: 0.65rem; color: #38bdf8; margin-top: 6px; padding: 2px 6px; background: rgba(2,132,199,0.15); border-radius: 4px;">Pattern Finding</div>
                </div>

                <!-- Stage 3 -->
                <div style="background: rgba(30,41,59,0.7); border: 1px solid #a855f7; border-radius: 10px; padding: 14px 10px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                  <div style="width:34px;height:34px;border-radius:8px;background:#7c3aed;display:flex;align-items:center;justify-content:center;margin:0 auto 8px auto;color:#fff;">
                    <i data-lucide="cpu" style="width:18px;height:18px;"></i>
                  </div>
                  <div style="font-size: 0.82rem; font-weight: 800; color: #c084fc; line-height: 1.25;">3. Generative AI</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 4px;">Transformers &bull; LLMs</div>
                  <div style="font-size: 0.65rem; color: #c084fc; margin-top: 6px; padding: 2px 6px; background: rgba(124,58,237,0.15); border-radius: 4px;">Synthesis</div>
                </div>

                <!-- Stage 4 -->
                <div style="background: rgba(16,185,129,0.15); border: 1px solid #10b981; border-radius: 10px; padding: 14px 10px; text-align: center; box-shadow: 0 0 16px rgba(16,185,129,0.25); display: flex; flex-direction: column; justify-content: center;">
                  <div style="width:34px;height:34px;border-radius:8px;background:#059669;display:flex;align-items:center;justify-content:center;margin:0 auto 8px auto;color:#fff;">
                    <i data-lucide="repeat" style="width:18px;height:18px;"></i>
                  </div>
                  <div style="font-size: 0.82rem; font-weight: 800; color: #34d399; line-height: 1.25;">4. Agentic Swarms</div>
                  <div style="font-size: 0.7rem; color: #a7f3d0; margin-top: 4px;">MCP &bull; ReAct Loops</div>
                  <div style="font-size: 0.65rem; color: #10b981; margin-top: 6px; padding: 2px 6px; background: rgba(16,185,129,0.2); border-radius: 4px;">Autonomous</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.74rem; color: #94a3b8; font-family: var(--font-mono); border-top: 1px solid #1e293b; padding-top: 10px; margin-top: 8px;">
                <span>FLOW: Deterministic Code &rarr; Statistical Fits &rarr; Foundation Models &rarr; Autonomous Agents</span>
                <span style="color:#10b981; font-weight:700;">&bull; Self-Governing</span>
              </div>
            </div>
          </div>

          <!-- Fixed Box: Venkata Bhattaram`;

html = html.replace(oldSnap1DualGridRegex, newSnap1DualGrid);

// 3. SNAP 2: Make Slideshow container expand with flex: 1
html = html.replace(
  '.slideshow-container {\n      background: #0f172a;',
  `.slideshow-container {
      flex: 1;
      background: #0f172a;`
);

// 4. SNAP 3: Make Remotion player card expand with flex: 1
html = html.replace(
  '.remotion-player-card {\n      background: #090d16;',
  `.remotion-player-card {
      flex: 1;
      background: #090d16;`
);
html = html.replace(
  '.remotion-screen {\n      height: 420px;',
  `.remotion-screen {
      flex: 1;
      min-height: 400px;`
);

// 5. SNAP 4: Make Infographic layout expand with flex: 1
html = html.replace(
  '.infographic-layout-grid {\n      display: grid;\n      grid-template-columns: 1.15fr 1fr;\n      gap: 28px;',
  `.infographic-layout-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 28px;
      min-height: 480px;`
);

// 6. SNAP 5: Make Interactive Sandbox expand with flex: 1
html = html.replace(
  '.sandbox-workspace-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 20px;',
  `.sandbox-workspace-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      min-height: 420px;`
);

fs.writeFileSync('automation-ml-ai-agentic/demo.html', html, 'utf8');
console.log('Successfully applied flex: 1 full-height fill across all snaps!');
