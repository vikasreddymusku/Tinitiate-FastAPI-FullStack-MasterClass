const fs = require('fs');
const path = 'c:/work/GIT-CODE/interactive-ui/automation-ml-ai-agentic/demo.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Upgrade CSS for Snap 1, Lightbox, and Slideshow
const oldCssSectionStart = content.indexOf('/* Evolution Dual Display: Image + Motion Graphic */');
const oldCssSectionEnd = content.indexOf('</style>');

if (oldCssSectionStart === -1 || oldCssSectionEnd === -1) {
  console.error("Could not find CSS boundaries");
  process.exit(1);
}

const newCssRules = `/* Evolution Dual Display: Image + Motion Graphic Studio */
    .evolution-dual-grid {
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: 1fr 1.05fr;
      gap: 20px;
      margin-bottom: 22px;
      align-items: stretch;
    }

    .evolution-image-frame {
      background: #060913;
      border-radius: 14px;
      border: 1px solid rgba(124, 58, 237, 0.4);
      padding: 14px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      aspect-ratio: 16 / 10;
    }

    .evolution-image-wrapper {
      position: relative;
      width: 100%;
      flex: 1;
      min-height: 220px;
      border-radius: 10px;
      overflow: hidden;
      background: #030712;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .evolution-image-frame img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
      display: block;
      transition: transform 0.35s ease;
    }

    .evolution-image-wrapper:hover img {
      transform: scale(1.03);
    }

    .image-zoom-overlay-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid rgba(168, 85, 247, 0.5);
      color: #ffffff;
      border-radius: 8px;
      padding: 7px 14px;
      font-size: 0.88rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 7px;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
      transition: all 0.25s ease;
      z-index: 5;
    }

    .image-zoom-overlay-btn:hover {
      background: #7c3aed;
      border-color: #c084fc;
      box-shadow: 0 0 16px rgba(124, 58, 237, 0.7);
      transform: scale(1.05);
    }

    .evolution-img-caption {
      margin-top: 10px;
      font-size: 0.92rem;
      font-weight: 700;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-sans);
    }

    /* Lightbox Modal for Presentation Zoom */
    .image-lightbox-modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(14px);
      z-index: 99999;
      align-items: center;
      justify-content: center;
      padding: 24px;
      box-sizing: border-box;
    }

    .image-lightbox-modal.active {
      display: flex;
    }

    .lightbox-content {
      position: relative;
      max-width: 95vw;
      max-height: 92vh;
      background: #090d16;
      border: 1px solid rgba(168, 85, 247, 0.6);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .lightbox-content img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 10px;
    }

    .lightbox-close-btn {
      position: absolute;
      top: 14px;
      right: 18px;
      background: rgba(225, 29, 72, 0.9);
      border: none;
      color: #fff;
      font-size: 1.6rem;
      line-height: 1;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }

    .lightbox-close-btn:hover {
      transform: scale(1.15);
      background: #f43f5e;
    }

    .lightbox-caption {
      margin-top: 14px;
      font-size: 1.15rem;
      font-weight: 800;
      color: #f8fafc;
      text-align: center;
    }

    /* --------------------------------------------------------------------------
       AI EVOLUTION IN 30 SECONDS: RULES TO AI AGENTS (KINETIC MOTION STUDIO)
       Directly inspired by YouTube Short (Ceresai - Rules to AI Agents)
       -------------------------------------------------------------------------- */
    .evolution-motion-card {
      background: linear-gradient(145deg, #070a14 0%, #0d1222 100%);
      border-radius: 14px;
      border: 1px solid rgba(124, 58, 237, 0.4);
      padding: 16px 20px;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      position: relative;
      overflow: hidden;
      aspect-ratio: 16 / 10;
    }

    .motion-tour-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 8px;
      margin-bottom: 8px;
    }

    .motion-tour-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.96rem;
      font-weight: 900;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #38bdf8;
    }

    .tour-controls-bar {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .tour-play-btn {
      background: linear-gradient(135deg, #7c3aed, #4f46e5);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #fff;
      border-radius: 6px;
      padding: 5px 12px;
      font-size: 0.86rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(124, 58, 237, 0.4);
    }

    .tour-play-btn:hover {
      background: linear-gradient(135deg, #9333ea, #6366f1);
      transform: scale(1.04);
    }

    .tour-time-pill {
      font-size: 0.86rem;
      font-weight: 800;
      color: #e2e8f0;
      background: rgba(0, 0, 0, 0.5);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-family: var(--font-sans);
    }

    /* 4 Epoch Tabs */
    .epoch-tabs-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }

    .epoch-tab-btn {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 8px 6px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .epoch-tab-btn:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: #94a3b8;
      transform: translateY(-2px);
    }

    .epoch-tab-btn.active {
      transform: translateY(-1px);
    }

    .epoch-tab-btn.active.e-auto {
      background: rgba(71, 85, 105, 0.4);
      border-color: #94a3b8;
      box-shadow: 0 0 14px rgba(148, 163, 184, 0.35);
    }
    .epoch-tab-btn.active.e-ml {
      background: rgba(2, 132, 199, 0.35);
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
    }
    .epoch-tab-btn.active.e-gen {
      background: rgba(124, 58, 237, 0.35);
      border-color: #c084fc;
      box-shadow: 0 0 14px rgba(192, 132, 252, 0.45);
    }
    .epoch-tab-btn.active.e-agent {
      background: rgba(16, 185, 129, 0.3);
      border-color: #10b981;
      box-shadow: 0 0 18px rgba(16, 185, 129, 0.55);
    }

    .epoch-tab-num {
      font-size: 0.76rem;
      font-weight: 900;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .epoch-tab-btn.active .epoch-tab-num {
      color: #ffffff;
    }

    .epoch-tab-label {
      font-size: 0.94rem;
      font-weight: 800;
      color: #f1f5f9;
      line-height: 1.2;
    }

    /* Active Dynamic Stage Viewport */
    .epoch-stage-viewport {
      flex: 1;
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      min-height: 160px;
    }

    .epoch-stage-panel {
      display: none;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      animation: fadeInStage 0.3s ease;
    }

    .epoch-stage-panel.active {
      display: flex;
    }

    @keyframes fadeInStage {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .epoch-panel-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .epoch-panel-title {
      font-size: 1.15rem;
      font-weight: 900;
      color: #ffffff;
    }

    .epoch-panel-tagline {
      font-size: 0.92rem;
      color: #cbd5e1;
      line-height: 1.4;
      margin-bottom: 8px;
    }

    /* Kinetic Stage Content Elements */
    .epoch-interactive-visual {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: auto 0;
      background: rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      padding: 10px 14px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    /* Progress Scrubber */
    .epoch-timeline-scrubber {
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 3px;
      overflow: hidden;
      margin-top: 8px;
    }

    .epoch-scrubber-fill {
      height: 100%;
      width: 25%;
      background: linear-gradient(90deg, #38bdf8, #a855f7, #10b981);
      transition: width 0.25s linear;
    }

    /* Executive Paradigm Banner */
    .epoch-paradigm-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 8px;
      margin-top: 6px;
      font-size: 0.92rem;
      font-weight: 700;
      color: #cbd5e1;
    }

    .epoch-paradigm-banner strong {
      color: #34d399;
    }

    /* AWESOME FIXED / HIGHLIGHT INSTRUCTOR CREDENTIALS BOX */
    .venkata-awesome-box {
      background: linear-gradient(135deg, #0a0f1d 0%, #111827 50%, #1e1136 100%);
      border: 1px solid rgba(168, 85, 247, 0.35);
      border-radius: 14px;
      padding: 16px 24px;
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
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #a855f7, #3b82f6);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 900;
      font-size: 1.2rem;
      box-shadow: 0 0 18px rgba(124, 58, 237, 0.5);
      flex-shrink: 0;
      position: relative;
    }

    .venkata-verified-badge {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #10b981;
      border: 2px solid #0a0f1d;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
    }

    .venkata-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .venkata-title-line {
      font-size: 1.25rem;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .venkata-exp-line {
      font-size: 1.02rem;
      color: #cbd5e1;
      font-weight: 600;
    }

    .venkata-exp-line strong {
      color: #38bdf8;
    }

    .venkata-pills-right {
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 1;
      flex-wrap: wrap;
    }

    .venkata-pill {
      font-size: 0.92rem;
      font-weight: 800;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: #e2e8f0;
      padding: 6px 14px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 7px;
      white-space: nowrap;
    }

    /* ==========================================================================
       SNAP 02: TICKER MOVING LEFT TO RIGHT & 5-PILLAR SLIDESHOW (PRESENTATION SCALE)
       ========================================================================== */
    .slideshow-ticker-wrap {
      width: 100%;
      background: #090d16;
      border: 1px solid rgba(124, 58, 237, 0.3);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 16px;
      padding: 12px 0;
      position: relative;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .slideshow-ticker-wrap::before,
    .slideshow-ticker-wrap::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50px;
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

    @keyframes ticker-ltr {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }

    .ticker-group {
      display: flex;
      align-items: center;
      gap: 32px;
      padding: 0 16px;
    }

    .ticker-item {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 1.02rem;
      font-weight: 700;
      font-family: var(--font-sans);
      color: #cbd5e1;
      white-space: nowrap;
    }

    .ticker-badge {
      font-weight: 900;
      font-size: 0.88rem;
      padding: 3px 10px;
      border-radius: 5px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .tb-auto { background: rgba(100, 116, 139, 0.25); color: #e2e8f0; border: 1px solid #64748b; }
    .tb-ml   { background: rgba(2, 132, 199, 0.25);   color: #38bdf8; border: 1px solid #0284c7; }
    .tb-gen  { background: rgba(168, 85, 247, 0.25);  color: #c084fc; border: 1px solid #a855f7; }
    .tb-learn{ background: rgba(16, 185, 129, 0.25);  color: #34d399; border: 1px solid #10b981; }
    .tb-tech { background: rgba(245, 158, 11, 0.25);  color: #fbbf24; border: 1px solid #f59e0b; }

    /* Fundamental Tech Badges inside Slide 5 */
    .tech-stack-cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-top: 10px;
    }

    .tech-stack-card {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .tech-stack-card i {
      color: #38bdf8;
      margin-top: 2px;
      flex-shrink: 0;
      width: 22px;
      height: 22px;
    }

    .tech-card-title {
      font-size: 1.1rem;
      font-weight: 900;
      color: #f8fafc;
      margin-bottom: 4px;
    }

    .tech-card-desc {
      font-size: 0.94rem;
      color: #cbd5e1;
      line-height: 1.45;
      margin: 0;
    }

    /* Motion Panel Container for Slides 1, 2, 3 (Presentation Scale) */
    .slide-motion-canvas {
      background: linear-gradient(145deg, #090d16 0%, #0f172a 100%);
      border: 1px solid rgba(124, 58, 237, 0.35);
      border-radius: 14px;
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 380px;
      box-sizing: border-box;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
      position: relative;
      overflow: hidden;
    }

    .motion-canvas-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 10px;
      font-size: 0.92rem;
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
      gap: 12px;
      margin: auto 0;
      position: relative;
    }

    .auto-node-card {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 16px 12px;
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
      background: rgba(225, 29, 72, 0.15);
      border: 1px solid rgba(225, 29, 72, 0.5);
      border-radius: 8px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.96rem;
      font-weight: 700;
      color: #fecdd3;
      font-family: var(--font-sans);
    }

    /* SLIDE 2: ML Feature Extraction & Gradient Weights */
    .ml-interactive-board {
      display: grid;
      grid-template-columns: 1.1fr 1.3fr 1.1fr;
      gap: 16px;
      align-items: center;
      margin: auto 0;
    }

    .ml-features-col {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .ml-feature-pill {
      background: rgba(2, 132, 199, 0.18);
      border: 1px solid rgba(2, 132, 199, 0.5);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 0.96rem;
      font-weight: 800;
      color: #38bdf8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-sans);
    }

    .ml-network-center {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 12px;
      padding: 14px;
      text-align: center;
      box-shadow: 0 0 16px rgba(2, 132, 199, 0.2);
    }

    .ml-weights-grid {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 10px 0;
    }

    .ml-weight-node {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      color: #ffffff;
      font-size: 0.95rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 12px #38bdf8;
      animation: attentionNeonGlow 3s infinite ease-in-out;
    }

    .ml-output-gauge {
      background: rgba(16, 185, 129, 0.18);
      border: 1px solid #10b981;
      border-radius: 10px;
      padding: 14px;
      text-align: center;
      color: #34d399;
      font-family: var(--font-sans);
    }

    /* SLIDE 3: GenAI Multi-Head Attention & Token Emitter */
    .genai-transformer-board {
      display: grid;
      grid-template-columns: 1fr 1.25fr 1fr;
      gap: 16px;
      align-items: center;
      margin: auto 0;
    }

    .genai-ingress-card {
      background: rgba(124, 58, 237, 0.15);
      border: 1px solid rgba(168, 85, 247, 0.5);
      border-radius: 10px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .genai-core-matrix {
      background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(15, 23, 42, 0.95) 70%);
      border: 1px solid #a855f7;
      border-radius: 14px;
      padding: 18px 14px;
      text-align: center;
      animation: attentionNeonGlow 3.5s infinite ease-in-out;
    }

    .genai-streaming-emitter {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .genai-token-chip {
      background: rgba(168, 85, 247, 0.3);
      border: 1px solid #c084fc;
      border-radius: 8px;
      padding: 7px 10px;
      font-size: 0.96rem;
      font-weight: 800;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      animation: tokenStreamAnim 2.5s infinite ease-in-out;
      font-family: var(--font-sans);
    }

    /* SLIDE 4: CLEAR, LARGE HELVETICA CURRICULUM ROADMAP (NO MONOSPACE) */
    .syllabus-roadmap-card {
      background: linear-gradient(145deg, #0a0f1d 0%, #111827 100%);
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 14px;
      padding: 18px 22px;
      height: 380px;
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
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 10px;
      margin-bottom: 6px;
    }

    .syllabus-timeline-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      flex: 1;
      margin: 8px 0;
    }

    .syllabus-module-item {
      background: rgba(30, 41, 59, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 10px 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      transition: all 0.2s ease;
      font-family: var(--font-sans);
    }

    .syllabus-module-item:hover {
      border-color: #10b981;
      background: rgba(16, 185, 129, 0.12);
      transform: translateY(-2px);
    }

    .syllabus-week-badge {
      font-size: 0.85rem;
      font-weight: 900;
      color: #10b981;
      background: rgba(16, 185, 129, 0.18);
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 6px;
      padding: 3px 8px;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .syllabus-module-title {
      font-size: 1.08rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.3;
      margin-bottom: 3px;
      font-family: var(--font-sans);
    }

    .syllabus-module-desc {
      font-size: 0.94rem;
      color: #cbd5e1;
      line-height: 1.4;
      font-family: var(--font-sans);
    }

    .syllabus-footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 10px;
      font-size: 0.94rem;
      color: #cbd5e1;
      font-family: var(--font-sans);
    }
`;

content = content.substring(0, oldCssSectionStart) + newCssRules + content.substring(oldCssSectionEnd);

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully updated CSS rules!");
