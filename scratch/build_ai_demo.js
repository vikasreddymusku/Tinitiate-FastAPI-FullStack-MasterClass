const fs = require('fs');

const indexHtml = fs.readFileSync('automation-ml-ai-agentic/index.html', 'utf8');

// Extract header
const headerMatch = indexHtml.match(/<header class="master-top-nav">[\s\S]*?<\/header>/i);
let masterHeader = headerMatch[0];
masterHeader = masterHeader.replace(/class="master-nav-btn subject-home-btn" title="AI Systems Home"/g, 'class="master-nav-btn" title="AI Systems Home"');
masterHeader = masterHeader.replace(/<a href="demo\.html" class="master-nav-btn" title="Interactive Demo">/g, '<a href="demo.html" class="master-nav-btn subject-home-btn" title="Interactive Demo">');

// Extract footer
const footerMatch = indexHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/i) || 
                    indexHtml.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
const siteFooter = footerMatch ? footerMatch[0] : '';

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AI & Automation Interactive Demo Lab | Tinitiate MasterClass Academy</title>
  <meta name="description" content="Explore live interactive AI Automation, Agentic loops, Remotion animated video simulations, and multi-tool swarm architectures.">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="stylesheet" href="../assets/css/master-global-layout.css">
  <script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>
  <script src="../assets/js/master-global-nav.js" defer></script>
  <style>
    /* ==========================================================================
       AI AUTOMATION DEMO LAB - SNAP SCROLLER & 3-COLUMN ARCHITECTURE
       Consistent with Data Engineering Typography and Royal Violet Theme
       ========================================================================== */

    :root {
      --snap-nav-w-left: 260px;
      --snap-nav-w-right: 240px;
      --c-agent-purple: #7c3aed;
      --c-agent-blue: #2563eb;
      --c-agent-emerald: #059669;
      --c-agent-amber: #d97706;
      --c-agent-rose: #e11d48;
      --c-dark-bg: #090d16;
      --c-card-bg: #ffffff;
      --c-card-border: #e2e8f0;
      --c-text-main: #0f172a;
      --c-text-body: #334155;
      --c-text-muted: #64748b;
    }

    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #f8fafc;
      color: var(--c-text-main);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
    }

    /* Outer 3-Column Layout Container */
    .demo-snap-layout {
      display: grid;
      grid-template-columns: var(--snap-nav-w-left) 1fr var(--snap-nav-w-right);
      height: calc(100vh - var(--nav-height, 74px));
      width: 100vw;
      overflow: hidden;
      background: #f8fafc;
    }

    /* LEFT COLUMN: Subject Menu */
    .demo-sidebar-left {
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      padding: 20px 16px;
      box-sizing: border-box;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.02);
      z-index: 10;
    }

    .sidebar-header-box {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 16px;
      margin-bottom: 16px;
      border-bottom: 1px solid #f1f5f9;
    }

    .sidebar-track-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #7c3aed, #4f46e5);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    }

    .sidebar-track-eyebrow {
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #7c3aed;
    }

    .sidebar-track-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
    }

    .demo-subject-menu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
    }

    .subject-menu-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 0.84rem;
      font-weight: 600;
      color: #475569;
      transition: all 0.15s ease;
      border: 1px solid transparent;
    }

    .subject-menu-link:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    .subject-menu-link.active {
      background: #f5f3ff;
      color: #6d28d9;
      font-weight: 700;
      border-color: #ddd6fe;
      box-shadow: 0 2px 6px rgba(124, 58, 237, 0.08);
    }

    .subject-menu-link i {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .subject-menu-link.active i {
      color: #10b981;
    }

    .menu-pill {
      margin-left: auto;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: #f1f5f9;
      color: #64748b;
      font-family: var(--font-mono);
    }

    .menu-pill.active-pill {
      background: #10b981;
      color: #ffffff;
    }

    .sidebar-telemetry-card {
      margin-top: auto;
      padding: 14px;
      border-radius: 10px;
      background: #0f172a;
      color: #cbd5e1;
      font-size: 0.74rem;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    }

    .telemetry-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      color: #34d399;
      margin-bottom: 8px;
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.3); }
    }

    .telemetry-stat {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      color: #94a3b8;
    }

    .telemetry-stat span {
      font-weight: 700;
      color: #f8fafc;
      font-family: var(--font-mono);
    }

    /* RIGHT COLUMN: In-Page Navigation */
    .demo-sidebar-right {
      background: #ffffff;
      border-left: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      padding: 20px 16px;
      box-sizing: border-box;
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.02);
      z-index: 10;
    }

    .inpage-header-box {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f1f5f9;
    }

    .inpage-snap-nav {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .inpage-snap-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      text-decoration: none;
      color: #475569;
      transition: all 0.2s ease;
      border: 1px solid #f1f5f9;
      background: #ffffff;
      cursor: pointer;
    }

    .inpage-snap-item:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      transform: translateX(-2px);
    }

    .inpage-snap-item.active {
      background: #f5f3ff;
      border-color: #c4b5fd;
      color: #6d28d9;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.08);
    }

    .snap-indicator {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: #f1f5f9;
      color: #64748b;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }

    .inpage-snap-item.active .snap-indicator {
      background: #7c3aed;
      color: #ffffff;
    }

    .snap-text-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .snap-label {
      font-size: 0.8rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .snap-sublabel {
      font-size: 0.68rem;
      color: #94a3b8;
    }

    .inpage-snap-item.active .snap-sublabel {
      color: #7c3aed;
    }

    .snap-pager-bar {
      margin-top: auto;
      padding: 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .snap-nav-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .snap-nav-btn:hover {
      background: #7c3aed;
      color: #ffffff;
      border-color: #7c3aed;
    }

    .snap-current-counter {
      font-size: 0.78rem;
      font-weight: 800;
      color: #0f172a;
      font-family: var(--font-mono);
    }

    /* CENTER COLUMN: Snap Scroller Container */
    .demo-snap-scroller {
      height: 100%;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
      scroll-behavior: smooth;
      background: #f8fafc;
      box-sizing: border-box;
    }

    /* Snap Section Baseline */
    .snap-card-section {
      min-height: calc(100vh - var(--nav-height, 74px));
      scroll-snap-align: start;
      scroll-snap-stop: always;
      box-sizing: border-box;
      padding: 40px 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .snap-card-section:nth-child(even) {
      background: #ffffff;
    }

    .snap-eyebrow-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }

    .snap-eyebrow-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: #f5f3ff;
      border: 1px solid #ddd6fe;
      color: #7c3aed;
    }

    .snap-eyebrow-tag {
      font-size: 0.72rem;
      font-weight: 700;
      color: #10b981;
      background: #ecfdf5;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid #a7f3d0;
    }

    .snap-title {
      font-size: 2.1rem;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 12px 0;
      letter-spacing: -0.025em;
      line-height: 1.2;
    }

    .snap-lead-text {
      font-size: 1.05rem;
      color: #475569;
      line-height: 1.6;
      max-width: 920px;
      margin: 0 0 24px 0;
    }

    /* SNAP 1: INTRO & METRIC CARDS */
    .snap1-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 10px;
      margin-bottom: 24px;
    }

    .metric-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .metric-card:hover {
      transform: translateY(-2px);
      border-color: #cbd5e1;
    }

    .metric-num {
      font-size: 1.8rem;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
      display: flex;
      align-items: baseline;
      gap: 4px;
      font-family: var(--font-mono);
    }

    .metric-num.purple { color: #7c3aed; }
    .metric-num.emerald { color: #059669; }
    .metric-num.blue { color: #0284c7; }
    .metric-num.amber { color: #d97706; }

    .metric-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 6px;
    }

    .metric-desc {
      font-size: 0.78rem;
      color: #64748b;
      line-height: 1.45;
      margin: 0;
    }

    .instructor-quote-card {
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.06), rgba(59, 130, 246, 0.04));
      border: 1px solid rgba(124, 58, 237, 0.22);
      border-left: 4px solid #7c3aed;
      border-radius: 12px;
      padding: 20px 24px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-top: 6px;
    }

    .instructor-quote-card i {
      color: #7c3aed;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .instructor-quote-title {
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #7c3aed;
      margin-bottom: 4px;
    }

    .instructor-quote-body {
      font-size: 0.92rem;
      color: #334155;
      line-height: 1.55;
      font-style: italic;
    }

    /* SNAP 2: SLIDESHOW CAROUSEL */
    .slideshow-container {
      background: #0f172a;
      border-radius: 16px;
      border: 1px solid #1e293b;
      color: #ffffff;
      padding: 28px 32px;
      position: relative;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
      min-height: 380px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .slideshow-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 14px;
      margin-bottom: 20px;
    }

    .slideshow-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      font-weight: 800;
      color: #a855f7;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .slideshow-counter {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      color: #94a3b8;
    }

    .slide-item {
      display: none;
      animation: fadeInSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .slide-item.active {
      display: block;
    }

    @keyframes fadeInSlide {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .slide-content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      align-items: center;
    }

    .slide-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 12px 0;
      line-height: 1.25;
    }

    .slide-desc {
      font-size: 0.94rem;
      color: #cbd5e1;
      line-height: 1.6;
      margin-bottom: 18px;
    }

    .slide-feature-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slide-feature-list li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: #e2e8f0;
    }

    .slide-feature-list li i {
      color: #10b981;
      width: 14px;
      height: 14px;
    }

    .slide-visual-box {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .slide-code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 0.72rem;
      color: #94a3b8;
      font-family: var(--font-mono);
    }

    .slide-code-body {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #38bdf8;
      line-height: 1.5;
      margin: 0;
      white-space: pre-wrap;
    }

    .slideshow-controls-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .slideshow-nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slide-ctrl-btn {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: #1e293b;
      border: 1px solid #334155;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .slide-ctrl-btn:hover {
      background: #7c3aed;
      border-color: #7c3aed;
    }

    .slide-dots-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .slide-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #334155;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .slide-dot.active {
      width: 24px;
      border-radius: 99px;
      background: #7c3aed;
      box-shadow: 0 0 10px rgba(124, 58, 237, 0.6);
    }

    /* SNAP 3: REMOTION ANIMATION & VIDEO PLAYER */
    .remotion-player-card {
      background: #020617;
      border-radius: 16px;
      border: 1px solid #1e293b;
      padding: 24px;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
      position: relative;
    }

    .remotion-header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid #1e293b;
      margin-bottom: 16px;
    }

    .remotion-brand-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      border-radius: 99px;
      background: rgba(225, 29, 72, 0.15);
      border: 1px solid rgba(225, 29, 72, 0.4);
      color: #fb7185;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .remotion-screen-viewport {
      background: radial-gradient(circle at center, #0f172a 0%, #020617 100%);
      border-radius: 12px;
      border: 1px solid #1e293b;
      height: 320px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .remotion-stage-node {
      position: absolute;
      padding: 10px 16px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      font-size: 0.78rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .node-user { top: 30px; left: 40px; border-color: #38bdf8; }
    .node-orchestrator { top: 30px; right: 40px; border-color: #a855f7; }
    .node-mcp { bottom: 30px; left: 40px; border-color: #10b981; }
    .node-db { bottom: 30px; right: 40px; border-color: #f59e0b; }

    .remotion-beam-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .remotion-center-monitor {
      width: 260px;
      background: rgba(2, 6, 23, 0.9);
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 14px;
      color: #94a3b8;
      font-family: var(--font-mono);
      font-size: 0.74rem;
      z-index: 5;
      box-shadow: 0 0 30px rgba(124, 58, 237, 0.25);
    }

    .remotion-timeline-bar {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .remotion-scrubber-track {
      height: 6px;
      background: #1e293b;
      border-radius: 3px;
      position: relative;
      cursor: pointer;
    }

    .remotion-scrubber-fill {
      height: 100%;
      background: linear-gradient(90deg, #7c3aed, #ec4899);
      border-radius: 3px;
      width: 35%;
      position: relative;
      transition: width 0.1s linear;
    }

    .remotion-scrubber-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 8px #ec4899;
      position: absolute;
      right: -7px;
      top: -4px;
    }

    .remotion-playback-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #cbd5e1;
    }

    .remotion-btn-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .remotion-play-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #7c3aed;
      border: none;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
    }

    .remotion-timecode {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #94a3b8;
    }

    /* SNAP 4: PARAGRAPH WITH INFOGRAPHIC */
    .infographic-wrap {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 24px;
      margin-top: 14px;
      align-items: stretch;
    }

    .infographic-canvas-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
    }

    .infographic-layer {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .infographic-layer:hover, .infographic-layer.active {
      background: #f5f3ff;
      border-color: #a78bfa;
      transform: translateX(4px);
    }

    .layer-badge {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.74rem;
      flex-shrink: 0;
    }

    .layer-info {
      flex: 1;
    }

    .layer-title {
      font-size: 0.88rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
    }

    .layer-sub {
      font-size: 0.74rem;
      color: #64748b;
    }

    .infographic-drawer-box {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 14px;
      padding: 22px;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .drawer-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      font-weight: 800;
      color: #a855f7;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .drawer-heading {
      font-size: 1.15rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .drawer-desc {
      font-size: 0.82rem;
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .drawer-spec-list {
      background: #1e293b;
      border-radius: 8px;
      padding: 12px;
      font-family: var(--font-mono);
      font-size: 0.74rem;
      color: #38bdf8;
      line-height: 1.6;
      flex: 1;
      overflow-y: auto;
      white-space: pre-wrap;
    }

    /* SNAP 5: INTERACTIVE SIMULATOR SECTION */
    .simulator-card-box {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 16px;
      padding: 26px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }

    .sim-controls-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 16px;
      margin-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;
    }

    .sim-select-group {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .sim-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: #334155;
    }

    .sim-select {
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      font-size: 0.84rem;
      font-weight: 600;
      color: #0f172a;
      cursor: pointer;
    }

    .sim-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
    }

    .sim-btn-primary {
      background: #7c3aed;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
    }

    .sim-btn-primary:hover {
      background: #6d28d9;
      transform: translateY(-1px);
    }

    .sim-btn-secondary {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
    }

    .sim-btn-secondary:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    .sim-split-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .sim-panel-col {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sim-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8rem;
      font-weight: 800;
      color: #0f172a;
    }

    .sim-terminal-screen {
      background: #090d16;
      border: 1px solid #1e293b;
      border-radius: 10px;
      padding: 16px;
      color: #38bdf8;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      line-height: 1.55;
      height: 250px;
      overflow-y: auto;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.6);
      white-space: pre-wrap;
    }

    .sim-trajectory-list {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px;
      height: 250px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .traj-step-item {
      padding: 10px 12px;
      border-radius: 8px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      font-size: 0.78rem;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .traj-tag {
      font-size: 0.68rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--font-mono);
      flex-shrink: 0;
    }

    .tag-thought { background: #ede9fe; color: #6d28d9; }
    .tag-action { background: #e0f2fe; color: #0369a1; }
    .tag-observation { background: #fef3c7; color: #b45309; }
    .tag-result { background: #dcfce7; color: #15803d; }

    /* Snap Footer at bottom of scroller */
    .snap-footer-wrap {
      scroll-snap-align: end;
      background: #0f172a;
    }

    /* Responsive adjustment */
    @media (max-width: 1180px) {
      .demo-snap-layout {
        grid-template-columns: 240px 1fr;
      }
      .demo-sidebar-right {
        display: none;
      }
    }
  </style>
</head>
<body>

  <!-- 1. MASTER TOP NAVIGATION BAR -->
  ` + masterHeader + `

  <!-- 2. MAIN 3-COLUMN PAGE SNAP SCROLLER LAYOUT -->
  <div class="demo-snap-layout">

    <!-- LEFT COLUMN: Subject Navigation Menu -->
    <aside class="demo-sidebar-left" aria-label="Course Modules Navigation">
      <div class="sidebar-header-box">
        <div class="sidebar-track-icon">
          <i data-lucide="bot"></i>
        </div>
        <div>
          <div class="sidebar-track-eyebrow">Course Modules</div>
          <div class="sidebar-track-title">AI &amp; Automation</div>
        </div>
      </div>
      
      <ul class="demo-subject-menu">
        <li>
          <a href="index.html" class="subject-menu-link">
            <i data-lucide="home"></i>
            <span>Course Home</span>
            <span class="menu-pill">Hub</span>
          </a>
        </li>
        <li>
          <a href="demo.html" class="subject-menu-link active">
            <i data-lucide="play-circle"></i>
            <span>Interactive Demo Lab</span>
            <span class="menu-pill active-pill">Active</span>
          </a>
        </li>
        <li>
          <a href="ai.html" class="subject-menu-link">
            <i data-lucide="sparkles"></i>
            <span>AI Foundation</span>
            <span class="menu-pill">01</span>
          </a>
        </li>
        <li>
          <a href="ml.html" class="subject-menu-link">
            <i data-lucide="cpu"></i>
            <span>Machine Learning</span>
            <span class="menu-pill">02</span>
          </a>
        </li>
        <li>
          <a href="genai.html" class="subject-menu-link">
            <i data-lucide="layers"></i>
            <span>GenAI &amp; LLMs</span>
            <span class="menu-pill">03</span>
          </a>
        </li>
        <li>
          <a href="agents.html" class="subject-menu-link">
            <i data-lucide="network"></i>
            <span>Autonomous Agents</span>
            <span class="menu-pill">04</span>
          </a>
        </li>
        <li>
          <a href="agentic-loops.html" class="subject-menu-link">
            <i data-lucide="repeat"></i>
            <span>Agentic Loops</span>
            <span class="menu-pill">05</span>
          </a>
        </li>
      </ul>

      <!-- Live Telemetry Card -->
      <div class="sidebar-telemetry-card">
        <div class="telemetry-badge"><span class="pulse-dot"></span> Live Telemetry</div>
        <div class="telemetry-stat">Status: <span>Online</span></div>
        <div class="telemetry-stat">MCP Protocol: <span>Active</span></div>
        <div class="telemetry-stat">Swarm Nodes: <span>4 Active</span></div>
      </div>
    </aside>

    <!-- CENTER COLUMN: Page Snap Scroller -->
    <main class="demo-snap-scroller" id="snapContainer">

      <!-- ===================================================================== -->
      <!-- SNAP 1: INTRO PARAGRAPH                                                -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-1" data-snap-index="1">
        <div class="snap-eyebrow-row">
          <span class="snap-eyebrow-pill">
            <i data-lucide="bot" style="width:13px;height:13px;"></i>
            SNAP 01 &bull; EXECUTIVE BRIEFING
          </span>
          <span class="snap-eyebrow-tag">Enterprise AI Engineering</span>
        </div>

        <h1 class="snap-title">Autonomous AI Automation &amp; Agentic Swarm Engineering</h1>
        
        <p class="snap-lead-text">
          Traditional deterministic automation—brittle cron jobs, hardcoded shell scripts, and legacy RPA—collapses under runtime schema drift and unexpected exceptions. Modern Enterprise AI Automation harnesses autonomous reasoning loops powered by foundation models, Model Context Protocol (MCP), dynamic function registries, and self-healing telemetry.
        </p>

        <!-- Metric Cards Grid -->
        <div class="snap1-grid">
          <div class="metric-card">
            <div class="metric-num purple">99.4<span style="font-size:1.1rem;">%</span></div>
            <div class="metric-title">Autonomous Resolution</div>
            <p class="metric-desc">Zero-human intervention rate for codified operational incidents and schema patches.</p>
          </div>
          <div class="metric-card">
            <div class="metric-num emerald">&lt; 320<span style="font-size:1.1rem;">ms</span></div>
            <div class="metric-title">MCP Tool Latency</div>
            <p class="metric-desc">Sub-second discovery and execution of external database and cloud CLI actions.</p>
          </div>
          <div class="metric-card">
            <div class="metric-num blue">100<span style="font-size:1.1rem;">%</span></div>
            <div class="metric-title">Guardrail Compliance</div>
            <p class="metric-desc">Strict semantic moderation gates ensuring zero PII exfiltration or toxic generation.</p>
          </div>
          <div class="metric-card">
            <div class="metric-num amber">24/7</div>
            <div class="metric-title">Self-Healing Loops</div>
            <p class="metric-desc">Autonomous telemetry monitors that observe failure states, propose fixes, and verify PRs.</p>
          </div>
        </div>

        <!-- Instructor Callout -->
        <div class="instructor-quote-card">
          <i data-lucide="sparkles" style="width:22px;height:22px;"></i>
          <div>
            <div class="instructor-quote-title">Instructor Architecture Insight (&copy; Venkata Bhattaram)</div>
            <div class="instructor-quote-body">
              "An LLM alone is just a static probability distribution over tokens. It becomes an Enterprise Agent only when you bind it to a perception layer, provide verifiable episodic memory, give it arms through Model Context Protocol (MCP) tool calling, and cage it with deterministic safety guardrails. When configured correctly, the agent doesn't just draft answers—it executes end-to-end work."
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- SNAP 2: SLIDESHOW                                                      -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-2" data-snap-index="2">
        <div class="snap-eyebrow-row">
          <span class="snap-eyebrow-pill">
            <i data-lucide="presentation" style="width:13px;height:13px;"></i>
            SNAP 02 &bull; ARCHITECTURE SLIDESHOW
          </span>
          <span class="snap-eyebrow-tag">Interactive Carousel</span>
        </div>

        <h2 class="snap-title">Foundations of Agentic Systems &amp; Orchestration</h2>
        <p class="snap-lead-text" style="margin-bottom:16px;">
          Explore the 4 core paradigm shifts powering production agent deployments in enterprise cloud environments.
        </p>

        <div class="slideshow-container">
          <div class="slideshow-topbar">
            <span class="slideshow-badge" id="slideBadgeText">
              <i data-lucide="layers" style="width:14px;height:14px;"></i>
              Pillar 01 &bull; Paradigm Evolution
            </span>
            <span class="slideshow-counter" id="slideCounterText">Slide 1 of 4</span>
          </div>

          <!-- Slide 1 -->
          <div class="slide-item active" data-slide="1">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">1. From Scripted RPA to Cognitive Agents</h3>
                <p class="slide-desc">
                  RPA operates like train tracks: fast and predictable until a pebble is placed on the rail. Cognitive agents operate like autonomous drones: evaluating spatial context, recalculating routes around obstacles, and fulfilling strategic intent.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>Intent-Driven:</strong> Converts natural language goals into dynamic execution graphs</li>
                  <li><i data-lucide="check"></i> <strong>Adaptive Recovery:</strong> Parses error tracebacks and attempts alternative methods</li>
                  <li><i data-lucide="check"></i> <strong>Non-Deterministic Resilience:</strong> Thrives on unstructured PDF, JSON, and raw log feeds</li>
                </ul>
              </div>
              <div class="slide-visual-box">
                <div class="slide-code-header">
                  <span>ARCHITECTURE COMPARISON</span>
                  <span>RPA vs AGENT</span>
                </div>
                <pre class="slide-code-body">// Legacy Script: Fails on any variation
if (status === 200) { parseData(); }
else { raise CrashException(); }

// Agentic ReAct Loop: Adapts autonomously
while (!goalAccomplished) {
  const thought = await planNextAction(state);
  const result = await executeTool(thought.action);
  state = reflectAndVerify(result);
}</pre>
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="slide-item" data-slide="2">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">2. Model Context Protocol (MCP) &amp; Tool Buses</h3>
                <p class="slide-desc">
                  Anthropic's open-standard Model Context Protocol (MCP) standardizes how LLMs dynamically query live enterprise databases, authenticate against internal MicroServices, and trigger external cloud infrastructure.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>Universal Schema:</strong> Single standardized JSON-RPC interface for all tools</li>
                  <li><i data-lucide="check"></i> <strong>Zero-Trust Scoping:</strong> Micro-scoped ABAC tokens per tool invocation</li>
                  <li><i data-lucide="check"></i> <strong>Dynamic Registry:</strong> Agents discover new tools at runtime via introspection</li>
                </ul>
              </div>
              <div class="slide-visual-box">
                <div class="slide-code-header">
                  <span>MCP PROTOCOL MANIFEST</span>
                  <span>json-rpc 2.0</span>
                </div>
                <pre class="slide-code-body">{
  "tool": "kubernetes_pod_restart",
  "auth": "vault://k8s-sre-service-account",
  "params": {
    "namespace": "production-checkout",
    "pod": "payment-api-7b8f99-x412",
    "grace_period": 30
  },
  "verified_by_guardrail": true
}</pre>
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="slide-item" data-slide="3">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">3. Multi-Agent Swarms &amp; Supervisor Topologies</h3>
                <p class="slide-desc">
                  Monolithic agents suffer from prompt bloat and decision fatigue. Production systems deploy specialized agent swarms where a Supervisor agent decomposes high-level goals and coordinates specialized domain workers.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>Supervisor Planner:</strong> Manages state machine and sub-task delegation</li>
                  <li><i data-lucide="check"></i> <strong>Specialized Workers:</strong> SQL Coder, Git Committer, Security Auditor</li>
                  <li><i data-lucide="check"></i> <strong>Critic / Judge Agent:</strong> Independent quality verification before action</li>
                </ul>
              </div>
              <div class="slide-visual-box">
                <div class="slide-code-header">
                  <span>SWARM STATE ORCHESTRATOR</span>
                  <span>Supervisor DAG</span>
                </div>
                <pre class="slide-code-body">Supervisor ("Fix API Incident")
   ├── [1. Delegate] -> InvestigatorAgent()
   │      └── Output: "Memory leak in redis cache"
   ├── [2. Delegate] -> PatchEngineerAgent()
   │      └── Output: "PR #418 committed with TTL"
   └── [3. Delegate] -> SecurityAuditorAgent()
          └── Output: "Approved for Staging Deployment"</pre>
              </div>
            </div>
          </div>

          <!-- Slide 4 -->
          <div class="slide-item" data-slide="4">
            <div class="slide-content-grid">
              <div>
                <h3 class="slide-title">4. Enterprise Guardrails, Evaluation &amp; Rollback</h3>
                <p class="slide-desc">
                  Giving models permission to write code or modify databases requires military-grade safety systems. Guardrails act as bidirectional firewalls for prompt inputs and execution outputs.
                </p>
                <ul class="slide-feature-list">
                  <li><i data-lucide="check"></i> <strong>PII &amp; Injection Sanitizer:</strong> Real-time regex and embedding masking</li>
                  <li><i data-lucide="check"></i> <strong>Human-in-the-Loop Thresholds:</strong> High-risk operations require Slack approval</li>
                  <li><i data-lucide="check"></i> <strong>Automatic Undo Hooks:</strong> Reversible database migrations and rollback commands</li>
                </ul>
              </div>
              <div class="slide-visual-box">
                <div class="slide-code-header">
                  <span>POLICY ENFORCEMENT ENGINE</span>
                  <span>OPA Rego Rules</span>
                </div>
                <pre class="slide-code-body">package agent.policy

default allow = false

# Allow tool calls ONLY if risk score &lt; 0.20
allow {
  input.tool.risk_level == "low"
  input.pii_detected == false
  input.token_cost_usd &lt; 0.05
}</pre>
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
      </section>

      <!-- ===================================================================== -->
      <!-- SNAP 3: REMOTION ANIMATION, VIDEO                                      -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-3" data-snap-index="3">
        <div class="snap-eyebrow-row">
          <span class="snap-eyebrow-pill">
            <i data-lucide="film" style="width:13px;height:13px;"></i>
            SNAP 03 &bull; REMOTION ANIMATION REEL
          </span>
          <span class="snap-eyebrow-tag">Programmatic Video Engine</span>
        </div>

        <h2 class="snap-title">Remotion Motion Graphics: The Agentic Reasoning Loop</h2>
        <p class="snap-lead-text" style="margin-bottom:16px;">
          A React-driven Remotion motion graphic video demonstrating continuous multi-agent token stream execution, tool dispatch, and verification in a 30-second loop.
        </p>

        <div class="remotion-player-card">
          <!-- Top bar -->
          <div class="remotion-header-bar">
            <div style="display:flex;align-items:center;gap:12px;">
              <span class="remotion-brand-pill">
                <i data-lucide="video" style="width:12px;height:12px;"></i>
                Remotion v4.0 Motion Graphic
              </span>
              <span style="font-size:0.8rem;color:#94a3b8;font-weight:600;">Autonomous SRE Agent Workflow &bull; 60 FPS Canvas</span>
            </div>
            <div style="font-size:0.75rem;color:#64748b;font-family:var(--font-mono);">
              1920x1080 &bull; ProRes Render Sim
            </div>
          </div>

          <!-- Animated Screen Viewport -->
          <div class="remotion-screen-viewport" id="remotionScreen">
            <!-- Animated Stage Nodes -->
            <div class="remotion-stage-node node-user" id="rNodeUser">
              <i data-lucide="user" style="color:#38bdf8;width:16px;height:16px;"></i>
              <span>User / SRE Trigger</span>
            </div>

            <div class="remotion-stage-node node-orchestrator" id="rNodeAgent">
              <i data-lucide="cpu" style="color:#a855f7;width:16px;height:16px;"></i>
              <span>Claude 3.5 Sonnet (Agent)</span>
            </div>

            <div class="remotion-stage-node node-mcp" id="rNodeMCP">
              <i data-lucide="zap" style="color:#10b981;width:16px;height:16px;"></i>
              <span>MCP Protocol Tool Bus</span>
            </div>

            <div class="remotion-stage-node node-db" id="rNodeDB">
              <i data-lucide="database" style="color:#f59e0b;width:16px;height:16px;"></i>
              <span>Kubernetes &amp; RDS Cluster</span>
            </div>

            <!-- Central HUD Monitor -->
            <div class="remotion-center-monitor" id="remotionMonitor">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;border-bottom:1px solid #1e293b;padding-bottom:4px;">
                <span style="font-weight:700;color:#38bdf8;">Frame <span id="rFrameCount">142</span></span>
                <span style="color:#a855f7;" id="rStatusPill">THOUGHT PHASE</span>
              </div>
              <div id="rTelemetryText" style="color:#f1f5f9;font-size:0.72rem;line-height:1.45;">
                [THINKING] Investigating container crash loop in production namespace. Disptaching 'kubectl_get_events()'...
              </div>
            </div>

            <!-- Particle Beam Canvas Overlay -->
            <svg class="remotion-beam-svg">
              <line x1="160" y1="50" x2="480" y2="160" stroke="#7c3aed" stroke-width="2" stroke-dasharray="4,4" id="beam1" opacity="0.6"/>
              <line x1="480" y1="160" x2="160" y2="280" stroke="#10b981" stroke-width="2" stroke-dasharray="4,4" id="beam2" opacity="0.6"/>
              <line x1="160" y1="280" x2="700" y2="280" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" id="beam3" opacity="0.6"/>
            </svg>
          </div>

          <!-- Video Timeline & Scrubbing Bar -->
          <div class="remotion-timeline-bar">
            <div class="remotion-scrubber-track" id="videoScrubberTrack" onclick="seekRemotion(event)">
              <div class="remotion-scrubber-fill" id="videoScrubberFill">
                <div class="remotion-scrubber-thumb"></div>
              </div>
            </div>

            <div class="remotion-playback-controls">
              <div class="remotion-btn-group">
                <button class="remotion-play-btn" onclick="toggleRemotionPlay()" id="remotionPlayBtn" title="Play / Pause Animation">
                  <i data-lucide="play" id="remotionPlayIcon"></i>
                </button>
                <button class="slide-ctrl-btn" onclick="restartRemotion()" title="Restart Video">
                  <i data-lucide="rotate-ccw"></i>
                </button>
                <div class="remotion-timecode">
                  <span id="remotionTimeCurrent">00:00</span> / <span>00:30</span>
                </div>
              </div>

              <div class="remotion-btn-group">
                <button class="slide-ctrl-btn" onclick="changeRemotionSpeed()" id="remotionSpeedBtn" title="Playback Speed">1.0x</button>
                <button class="slide-ctrl-btn" onclick="toggleFullscreenRemotion()" title="Fullscreen Video">
                  <i data-lucide="maximize"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- SNAP 4: PARAGRAPH WITH INFOGRAPHIC                                     -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-4" data-snap-index="4">
        <div class="snap-eyebrow-row">
          <span class="snap-eyebrow-pill">
            <i data-lucide="network" style="width:13px;height:13px;"></i>
            SNAP 04 &bull; ARCHITECTURAL INFOGRAPHIC
          </span>
          <span class="snap-eyebrow-tag">Interactive Blueprint</span>
        </div>

        <h2 class="snap-title">Full-Stack Enterprise Autonomous Agent Architecture</h2>
        <p class="snap-lead-text" style="margin-bottom:14px;">
          An enterprise agentic stack is composed of 5 decoupled layers: Ingress Moderation, Cognitive Planning, MCP Tool Protocols, Memory Vector Store, and Human Verification. Click each layer to inspect its protocol details and operational SLAs.
        </p>

        <div class="infographic-wrap">
          <!-- Left: 5 Interactive Layers -->
          <div class="infographic-canvas-box">
            <div class="infographic-layer active" onclick="selectInfographicLayer(1)" id="layer-1">
              <div class="layer-badge" style="background:#0284c7;">L1</div>
              <div class="layer-info">
                <div class="layer-title">1. Semantic Ingress &amp; Moderation Gateway</div>
                <div class="layer-sub">Llama Guard &bull; PII Masking &bull; Tokenizer Throttling</div>
              </div>
              <i data-lucide="chevron-right" style="color:#94a3b8;width:18px;height:18px;"></i>
            </div>

            <div class="infographic-layer" onclick="selectInfographicLayer(2)" id="layer-2">
              <div class="layer-badge" style="background:#7c3aed;">L2</div>
              <div class="layer-info">
                <div class="layer-title">2. Cognitive Planner &amp; Reasoning Core</div>
                <div class="layer-sub">ReAct State Machine &bull; Claude 3.5 / DeepSeek R1 &bull; Reflection</div>
              </div>
              <i data-lucide="chevron-right" style="color:#94a3b8;width:18px;height:18px;"></i>
            </div>

            <div class="infographic-layer" onclick="selectInfographicLayer(3)" id="layer-3">
              <div class="layer-badge" style="background:#10b981;">L3</div>
              <div class="layer-info">
                <div class="layer-title">3. Model Context Protocol (MCP) Tool Bus</div>
                <div class="layer-sub">JSON-RPC &bull; MicroServices &bull; Kubernetes CLI &bull; Postgres Runner</div>
              </div>
              <i data-lucide="chevron-right" style="color:#94a3b8;width:18px;height:18px;"></i>
            </div>

            <div class="infographic-layer" onclick="selectInfographicLayer(4)" id="layer-4">
              <div class="layer-badge" style="background:#f59e0b;">L4</div>
              <div class="layer-info">
                <div class="layer-title">4. Dual Memory &amp; Semantic Context Store</div>
                <div class="layer-sub">Vector DB (Pinecone/Milvus) &bull; Redis Short-Term Scratchpad</div>
              </div>
              <i data-lucide="chevron-right" style="color:#94a3b8;width:18px;height:18px;"></i>
            </div>

            <div class="infographic-layer" onclick="selectInfographicLayer(5)" id="layer-5">
              <div class="layer-badge" style="background:#e11d48;">L5</div>
              <div class="layer-info">
                <div class="layer-title">5. Evaluation, Telemetry &amp; Rollback Hooks</div>
                <div class="layer-sub">OpenTelemetry &bull; Human-in-the-Loop Approval &bull; LangSmith</div>
              </div>
              <i data-lucide="chevron-right" style="color:#94a3b8;width:18px;height:18px;"></i>
            </div>
          </div>

          <!-- Right: Inspector Drawer -->
          <div class="infographic-drawer-box">
            <div class="drawer-title-row">
              <i data-lucide="code" style="width:14px;height:14px;"></i>
              <span id="drawerLayerTag">LAYER 01 SPECIFICATIONS</span>
            </div>
            <div class="drawer-heading" id="drawerHeading">Ingress &amp; Moderation Gateway</div>
            <div class="drawer-desc" id="drawerDesc">
              Intercepts incoming prompts before they touch foundation models, enforcing regulatory compliance, token rate-limiting, and prompt-injection defenses.
            </div>
            <div class="drawer-spec-list" id="drawerSpecs">
• Protocol: gRPC / REST reverse proxy
• Latency Overhead: &lt; 18ms
• Defense Mechanisms: 
  - Regex PII Scrubbing
  - Embedding cosine distance to malicious vectors
  - Token quota checks against Redis cluster
• Failure Mode: Circuit breaker fail-closed
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- SNAP 5: INTERACTIVE SECTION                                            -->
      <!-- ===================================================================== -->
      <section class="snap-card-section" id="snap-5" data-snap-index="5">
        <div class="snap-eyebrow-row">
          <span class="snap-eyebrow-pill">
            <i data-lucide="terminal" style="width:13px;height:13px;"></i>
            SNAP 05 &bull; LIVE INTERACTIVE LAB
          </span>
          <span class="snap-eyebrow-tag">Agent Sandbox</span>
        </div>

        <h2 class="snap-title">Autonomous Multi-Tool Agent Execution Studio</h2>
        <p class="snap-lead-text" style="margin-bottom:18px;">
          Choose an enterprise incident scenario, select your inference engine, and run the real-time agentic loop. Watch the model reason, call MCP tools, observe results, and formulate resolution.
        </p>

        <div class="simulator-card-box">
          <!-- Controls Toolbar -->
          <div class="sim-controls-toolbar">
            <div class="sim-select-group">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <span class="sim-label">Incident Scenario</span>
                <select class="sim-select" id="simScenarioSelect" onchange="changeSimScenario()">
                  <option value="k8s">Incident A: Kubernetes OOMKilled Pod Loop</option>
                  <option value="pii">Incident B: Customer DB PII Masking Leak</option>
                  <option value="drift">Incident C: Snowflake Schema Drift Reconciliation</option>
                </select>
              </div>

              <div style="display:flex;flex-direction:column;gap:4px;">
                <span class="sim-label">Reasoning Engine</span>
                <select class="sim-select" id="simModelSelect">
                  <option value="claude">Anthropic Claude 3.5 Sonnet</option>
                  <option value="gpt4o">OpenAI GPT-4o (Omni)</option>
                  <option value="deepseek">DeepSeek R1 (Chain of Thought)</option>
                </select>
              </div>

              <div style="display:flex;flex-direction:column;gap:4px;">
                <span class="sim-label">Autonomy Level</span>
                <select class="sim-select" id="simAutonomySelect">
                  <option value="full">Full Autonomy (Auto-Execute)</option>
                  <option value="hitl">Human-in-the-Loop (Approval Gate)</option>
                </select>
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:10px;">
              <button class="sim-action-btn sim-btn-primary" onclick="runSimWorkflow()" id="simRunBtn">
                <i data-lucide="play"></i>
                <span>Run Agent Loop</span>
              </button>
              <button class="sim-action-btn sim-btn-secondary" onclick="resetSimWorkflow()">
                <i data-lucide="rotate-ccw"></i>
                <span>Reset</span>
              </button>
            </div>
          </div>

          <!-- Split Screen: Terminal + Trajectory -->
          <div class="sim-split-grid">
            <!-- Left: Terminal Stream -->
            <div class="sim-panel-col">
              <div class="sim-panel-header">
                <span>LIVE MCP JSON-RPC TERMINAL</span>
                <span style="color:#10b981;font-family:var(--font-mono);font-size:0.72rem;">CONNECTED</span>
              </div>
              <div class="sim-terminal-screen" id="simTerminal">
[AGENT_CORE] Initialized agent runtime session #agent-8921.
[MCP_BUS] Discovered 18 registered tools via mcp://localhost:8080.
[STATUS] Ready. Select a scenario and click 'Run Agent Loop'.
              </div>
            </div>

            <!-- Right: Trajectory Step Viewer -->
            <div class="sim-panel-col">
              <div class="sim-panel-header">
                <span>AGENTIC REASONING TRAJECTORY</span>
                <span id="trajStatusText" style="color:#7c3aed;font-family:var(--font-mono);font-size:0.72rem;">IDLE</span>
              </div>
              <div class="sim-trajectory-list" id="simTrajectoryList">
                <div class="traj-step-item">
                  <span class="traj-tag tag-thought">INIT</span>
                  <div>
                    <strong>Scenario Loaded:</strong> Kubernetes Pod CrashLoopBackOff triage.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- FOOTER: Master Footer                                                  -->
      <!-- ===================================================================== -->
      <div class="snap-footer-wrap">
        ` + siteFooter + `
      </div>

    </main>

    <!-- RIGHT COLUMN: In-Page Snap Navigation -->
    <aside class="demo-sidebar-right" aria-label="In-Page Snap Navigation">
      <div class="inpage-header-box">
        <i data-lucide="compass"></i>
        <span>On This Page</span>
      </div>

      <nav class="inpage-snap-nav">
        <a class="inpage-snap-item active" onclick="scrollToSnap(1)" data-snap="1">
          <span class="snap-indicator">01</span>
          <div class="snap-text-col">
            <span class="snap-label">Executive Briefing</span>
            <span class="snap-sublabel">Intro &amp; Value Drivers</span>
          </div>
        </a>
        <a class="inpage-snap-item" onclick="scrollToSnap(2)" data-snap="2">
          <span class="snap-indicator">02</span>
          <div class="snap-text-col">
            <span class="snap-label">Architecture SlideShow</span>
            <span class="snap-sublabel">4 Core Pillars Carousel</span>
          </div>
        </a>
        <a class="inpage-snap-item" onclick="scrollToSnap(3)" data-snap="3">
          <span class="snap-indicator">03</span>
          <div class="snap-text-col">
            <span class="snap-label">Remotion Video Reel</span>
            <span class="snap-sublabel">Animated Loop Simulation</span>
          </div>
        </a>
        <a class="inpage-snap-item" onclick="scrollToSnap(4)" data-snap="4">
          <span class="snap-indicator">04</span>
          <div class="snap-text-col">
            <span class="snap-label">Agent Infographic</span>
            <span class="snap-sublabel">System Topology &amp; Specs</span>
          </div>
        </a>
        <a class="inpage-snap-item" onclick="scrollToSnap(5)" data-snap="5">
          <span class="snap-indicator">05</span>
          <div class="snap-text-col">
            <span class="snap-label">Interactive Sandbox</span>
            <span class="snap-sublabel">Live Multi-Tool Runner</span>
          </div>
        </a>
      </nav>

      <!-- Up/Down Snap Jumper -->
      <div class="snap-pager-bar">
        <button class="snap-nav-btn" onclick="goToPrevSnap()" title="Previous Snap (Up)">
          <i data-lucide="chevron-up"></i>
        </button>
        <div class="snap-current-counter" id="snapCounterText">Snap 1 / 5</div>
        <button class="snap-nav-btn" onclick="goToNextSnap()" title="Next Snap (Down)">
          <i data-lucide="chevron-down"></i>
        </button>
      </div>
    </aside>

  </div>

  <!-- SCRIPT LOGIC FOR SLIDESHOW, REMOTION, INFOGRAPHIC, INTERACTIVE & SNAP SCROLLSPY -->
  <script>
    // Initialize Lucide Icons
    if (window.lucide) {
      lucide.createIcons();
    }

    // --------------------------------------------------------------------------
    // 1. SNAP SCROLLER & SCROLLSPY
    // --------------------------------------------------------------------------
    let currentSnapIndex = 1;
    const totalSnaps = 5;
    const snapContainer = document.getElementById('snapContainer');

    function scrollToSnap(index) {
      const target = document.getElementById('snap-' + index);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        updateSnapNavigation(index);
      }
    }

    function goToPrevSnap() {
      if (currentSnapIndex > 1) {
        scrollToSnap(currentSnapIndex - 1);
      }
    }

    function goToNextSnap() {
      if (currentSnapIndex < totalSnaps) {
        scrollToSnap(currentSnapIndex + 1);
      }
    }

    function updateSnapNavigation(index) {
      currentSnapIndex = index;
      document.getElementById('snapCounterText').textContent = 'Snap ' + index + ' / ' + totalSnaps;
      
      const navItems = document.querySelectorAll('.inpage-snap-item');
      navItems.forEach(item => {
        if (parseInt(item.getAttribute('data-snap')) === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Scroll listener for active snap detection
    snapContainer.addEventListener('scroll', () => {
      const snapElements = [1, 2, 3, 4, 5].map(i => document.getElementById('snap-' + i));
      const containerTop = snapContainer.scrollTop;
      const viewportHeight = snapContainer.clientHeight;

      for (let i = 0; i < snapElements.length; i++) {
        const el = snapElements[i];
        if (el) {
          const top = el.offsetTop;
          const height = el.clientHeight;
          if (containerTop >= top - viewportHeight * 0.4 && containerTop < top + height - viewportHeight * 0.4) {
            updateSnapNavigation(i + 1);
            break;
          }
        }
      }
    });

    // --------------------------------------------------------------------------
    // 2. SNAP 2: SLIDESHOW CAROUSEL LOGIC
    // --------------------------------------------------------------------------
    let currentSlide = 1;
    const totalSlides = 4;
    let slideInterval = null;

    const slideBadges = [
      "Pillar 01 • Paradigm Evolution",
      "Pillar 02 • MCP Tool Protocols",
      "Pillar 03 • Swarm Topologies",
      "Pillar 04 • Safety & Rollback"
    ];

    function showSlide(index) {
      currentSlide = index;
      document.querySelectorAll('.slide-item').forEach(el => el.classList.remove('active'));
      const activeEl = document.querySelector('.slide-item[data-slide="' + index + '"]');
      if (activeEl) activeEl.classList.add('active');

      document.querySelectorAll('.slide-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx + 1 === index);
      });

      document.getElementById('slideCounterText').textContent = 'Slide ' + index + ' of ' + totalSlides;
      document.getElementById('slideBadgeText').innerHTML = '<i data-lucide="layers" style="width:14px;height:14px;"></i> ' + slideBadges[index - 1];
      if (window.lucide) lucide.createIcons();
    }

    function nextSlide() {
      const next = currentSlide >= totalSlides ? 1 : currentSlide + 1;
      showSlide(next);
    }

    function prevSlide() {
      const prev = currentSlide <= 1 ? totalSlides : currentSlide - 1;
      showSlide(prev);
    }

    function jumpToSlide(idx) {
      showSlide(idx);
    }

    function toggleSlideAutoplay() {
      const btn = document.getElementById('slidePlayBtn');
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
        btn.innerHTML = '<i data-lucide="play"></i>';
      } else {
        slideInterval = setInterval(nextSlide, 4500);
        btn.innerHTML = '<i data-lucide="pause"></i>';
      }
      if (window.lucide) lucide.createIcons();
    }

    // --------------------------------------------------------------------------
    // 3. SNAP 3: REMOTION ANIMATION SIMULATOR
    // --------------------------------------------------------------------------
    let remotionPlaying = false;
    let remotionFrame = 0;
    const remotionMaxFrames = 900; // 30s at 30fps
    let remotionTimer = null;
    let remotionSpeed = 1.0;

    const remotionScript = [
      { frame: 30, status: "PROMPT INGESTION", text: "[TOKEN_STREAM] User query received: 'Investigate 502 Bad Gateway in Payment Pod'. Tokenizing..." },
      { frame: 120, status: "THOUGHT & PLAN", text: "[REASONING] Agent checking cluster state. Step 1: Call 'kubectl_get_pods()' via MCP bus." },
      { frame: 270, status: "TOOL DISPATCH", text: "[MCP_CALL] POST mcp://k8s-cluster -> kubectl_describe_pod(namespace='prod', pod='pay-7a')" },
      { frame: 450, status: "OBSERVATION", text: "[TOOL_RETURN] Exit Code 137: OOMKilled. Pod memory limit 512Mi exceeded during checkout peak." },
      { frame: 630, status: "SECURITY GATE", text: "[GUARDRAIL] Policy check passed: Vertical scaling to 1024Mi allowed under SRE tier-1." },
      { frame: 780, status: "REMEDIATION", text: "[PATCH] kubectl_patch_deployment() deployed. New replica live. Latency normalized to 14ms." }
    ];

    function toggleRemotionPlay() {
      remotionPlaying = !remotionPlaying;
      const icon = document.getElementById('remotionPlayIcon');
      if (remotionPlaying) {
        icon.setAttribute('data-lucide', 'pause');
        remotionTimer = setInterval(tickRemotion, 33 / remotionSpeed);
      } else {
        icon.setAttribute('data-lucide', 'play');
        clearInterval(remotionTimer);
      }
      if (window.lucide) lucide.createIcons();
    }

    function tickRemotion() {
      remotionFrame += 1;
      if (remotionFrame > remotionMaxFrames) {
        remotionFrame = 0;
      }
      renderRemotionState();
    }

    function renderRemotionState() {
      const pct = (remotionFrame / remotionMaxFrames) * 100;
      document.getElementById('videoScrubberFill').style.width = pct + '%';
      document.getElementById('rFrameCount').textContent = remotionFrame;

      const seconds = Math.floor(remotionFrame / 30);
      const sStr = seconds < 10 ? '0' + seconds : seconds;
      document.getElementById('remotionTimeCurrent').textContent = '00:' + sStr;

      let currentEvent = remotionScript[0];
      for (const ev of remotionScript) {
        if (remotionFrame >= ev.frame) currentEvent = ev;
      }
      document.getElementById('rStatusPill').textContent = currentEvent.status;
      document.getElementById('rTelemetryText').textContent = currentEvent.text;

      const beam1 = document.getElementById('beam1');
      const beam2 = document.getElementById('beam2');
      const beam3 = document.getElementById('beam3');
      if (beam1 && beam2 && beam3) {
        beam1.style.opacity = (remotionFrame >= 30 && remotionFrame < 300) ? '1' : '0.2';
        beam2.style.opacity = (remotionFrame >= 270 && remotionFrame < 500) ? '1' : '0.2';
        beam3.style.opacity = (remotionFrame >= 480 && remotionFrame < 750) ? '1' : '0.2';
      }
    }

    function restartRemotion() {
      remotionFrame = 0;
      renderRemotionState();
      if (!remotionPlaying) toggleRemotionPlay();
    }

    function seekRemotion(event) {
      const track = document.getElementById('videoScrubberTrack');
      const rect = track.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      remotionFrame = Math.floor(pct * remotionMaxFrames);
      renderRemotionState();
    }

    function changeRemotionSpeed() {
      const speeds = [1.0, 1.5, 2.0];
      const curIdx = speeds.indexOf(remotionSpeed);
      remotionSpeed = speeds[(curIdx + 1) % speeds.length];
      document.getElementById('remotionSpeedBtn').textContent = remotionSpeed.toFixed(1) + 'x';
      if (remotionPlaying) {
        clearInterval(remotionTimer);
        remotionTimer = setInterval(tickRemotion, 33 / remotionSpeed);
      }
    }

    function toggleFullscreenRemotion() {
      const el = document.getElementById('remotionScreen');
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch(err => alert(err.message));
      } else {
        document.exitFullscreen();
      }
    }

    // --------------------------------------------------------------------------
    // 4. SNAP 4: INFOGRAPHIC LAYER INSPECTOR
    // --------------------------------------------------------------------------
    const layerData = {
      1: {
        tag: "LAYER 01 SPECIFICATIONS",
        heading: "Semantic Ingress & Moderation Gateway",
        desc: "Intercepts incoming requests before LLM inference to validate prompt safety, detect injection attempts, enforce rate limits, and sanitize PII.",
        specs: "• Ingress Protocol: gRPC / High-Performance ASGI\\n• Average Latency: < 18ms\\n• Defense Filters:\\n  - Regex PII & SSN scrubbers\\n  - Vector cosine check against injection vector database\\n  - Token quota checks backed by Redis cluster\\n• Failure Mode: Fail-closed with audit alert"
      },
      2: {
        tag: "LAYER 02 SPECIFICATIONS",
        heading: "Cognitive Planner & Reasoning Core",
        desc: "The central cognitive state machine that generates multi-step plans, parses intermediate observations, and performs self-reflection loops.",
        specs: "• Architecture: ReAct / Plan-and-Solve State Machine\\n• Supported Models: Claude 3.5 Sonnet, DeepSeek R1, GPT-4o\\n• Max Plan Depth: 12 sequential recursive loops\\n• Reflection Mechanism: Critic sub-agent scores action accuracy\\n• Checkpointing: Snapshot state persisted to Postgres JSONB"
      },
      3: {
        tag: "LAYER 03 SPECIFICATIONS",
        heading: "Model Context Protocol (MCP) Tool Bus",
        desc: "Open standard client-server protocol enabling models to dynamically authenticate, discover, and invoke external software tools.",
        specs: "• Protocol Standard: Anthropic MCP JSON-RPC 2.0\\n• Registered Integrations:\\n  - Kubernetes / Docker CLI Runner\\n  - PostgreSQL / Snowflake Read-Write Executors\\n  - GitHub & GitLab API PR Automators\\n  - Vector RAG Knowledge Retrieval Endpoints\\n• Security: Single-use scoped JWT authentication per tool invocation"
      },
      4: {
        tag: "LAYER 04 SPECIFICATIONS",
        heading: "Dual Memory & Semantic Context Store",
        desc: "Maintains ephemeral short-term scratchpad context during multi-turn reasoning alongside persistent vector embeddings of past resolutions.",
        specs: "• Short-Term Store: Redis 7.2 in-memory conversation buffer\\n• Long-Term Store: Pinecone & Milvus Vector Database\\n• Embedding Dimension: 1536 (text-embedding-3-small)\\n• Retrieval Algorithm: Hybrid BM25 keyword + HNSW dense vector\\n• Cache Hit Latency: < 22ms"
      },
      5: {
        tag: "LAYER 05 SPECIFICATIONS",
        heading: "Evaluation, Telemetry & Rollback Hooks",
        desc: "Ensures comprehensive auditability with distributed tracing, automated rollback actions for broken migrations, and Slack human approval triggers.",
        specs: "• Telemetry Standard: OpenTelemetry (OTel) traces & spans\\n• Monitoring Platform: LangSmith & Prometheus dashboard exporter\\n• Human Gate Trigger: Tool operations marked 'destructive' (DROP, DELETE, RESTART)\\n• Rollback Engine: Automated git revert & compensating database transactions"
      }
    };

    function selectInfographicLayer(num) {
      document.querySelectorAll('.infographic-layer').forEach((el, idx) => {
        el.classList.toggle('active', idx + 1 === num);
      });
      const data = layerData[num];
      document.getElementById('drawerLayerTag').textContent = data.tag;
      document.getElementById('drawerHeading').textContent = data.heading;
      document.getElementById('drawerDesc').textContent = data.desc;
      document.getElementById('drawerSpecs').textContent = data.specs;
    }

    // --------------------------------------------------------------------------
    // 5. SNAP 5: INTERACTIVE MULTI-TOOL AGENT SIMULATOR
    // --------------------------------------------------------------------------
    const scenarioWorkflows = {
      k8s: {
        name: "Kubernetes OOMKilled Pod Loop",
        steps: [
          { tag: "THOUGHT", class: "tag-thought", text: "Alert received: Pod 'checkout-api-48b' status CrashLoopBackOff in production. I need to inspect pod logs and describe container status." },
          { tag: "ACTION", class: "tag-action", text: "Invoking MCP tool: kubectl_describe_pod(namespace='prod', pod='checkout-api-48b')" },
          { tag: "OBSERVATION", class: "tag-observation", text: "Terminated with exit code 137 (OOMKilled). Container limit 512Mi reached at 14:22 UTC." },
          { tag: "THOUGHT", class: "tag-thought", text: "Memory spike matches Black Friday traffic burst. Safe remediation is to patch deployment limit to 1024Mi and observe restart." },
          { tag: "ACTION", class: "tag-action", text: "Invoking MCP tool: kubectl_patch_deployment(deployment='checkout-api', memory='1024Mi')" },
          { tag: "RESULT", class: "tag-result", text: "Success: Pod restarted cleanly with 1024Mi. Readiness probe HTTP 200 OK. Resolved in 2.4s." }
        ],
        logs: [
          "[AGENT] Scenario initialized: Kubernetes CrashLoopBackOff Triage.",
          "[MODEL] Dispatched prompt to Claude 3.5 Sonnet (Temp=0.0).",
          "[TOOL_CALL] POST mcp://k8s-agent -> kubectl_describe_pod()",
          "[TELEMETRY] OOMKilled error code 137 parsed.",
          "[TOOL_CALL] POST mcp://k8s-agent -> kubectl_patch_deployment()",
          "[VERIFIED] Container state Healthy. Emitted incident closure note to #sre-alerts."
        ]
      },
      pii: {
        name: "Customer DB PII Masking Leak",
        steps: [
          { tag: "THOUGHT", class: "tag-thought", text: "Security anomaly: Customer address table in Postgres contains unmasked Social Security Numbers in 'notes' column." },
          { tag: "ACTION", class: "tag-action", text: "Invoking MCP tool: postgres_run_scan(table='customers', pii_pattern='SSN')" },
          { tag: "OBSERVATION", class: "tag-observation", text: "Found 1,420 unmasked records matching regex ^\\\\d{3}-\\\\d{2}-\\\\d{4}$ in staging database." },
          { tag: "THOUGHT", class: "tag-thought", text: "Applying deterministic hashing mask SHA-256 with enterprise salt to redact sensitive digits." },
          { tag: "ACTION", class: "tag-action", text: "Invoking MCP tool: postgres_execute_mask(column='notes', rule='SSN_REDACT')" },
          { tag: "RESULT", class: "tag-result", text: "Success: 1,420 records redacted. Zero plaintext SSN remaining. Compliance report submitted." }
        ],
        logs: [
          "[AGENT] Scenario initialized: PII Data Leak Mitigation.",
          "[MODEL] Dispatched prompt to GPT-4o Security Auditor.",
          "[TOOL_CALL] POST mcp://postgres -> run_pii_scanner()",
          "[TELEMETRY] 1,420 unredacted SSN tokens identified.",
          "[TOOL_CALL] POST mcp://postgres -> execute_masking_dml()",
          "[AUDIT] GDPR / HIPAA compliance verified. Alert marked Resolved."
        ]
      },
      drift: {
        name: "Snowflake Schema Drift Reconciliation",
        steps: [
          { tag: "THOUGHT", class: "tag-thought", text: "Pipeline alert: Ingestion JSON payload contains 2 new fields 'customer_tier' and 'device_fingerprint' absent in Snowflake target table." },
          { tag: "ACTION", class: "tag-action", text: "Invoking MCP tool: snowflake_get_ddl(table='raw_orders_stream')" },
          { tag: "OBSERVATION", class: "tag-observation", text: "Target schema has 14 columns. Missing VARCHAR 'customer_tier' and VARCHAR 'device_fingerprint'." },
          { tag: "THOUGHT", class: "tag-thought", text: "Generating non-destructive ALTER TABLE ADD COLUMN statements with null defaults." },
          { tag: "ACTION", class: "tag-action", text: "Invoking MCP tool: snowflake_exec_ddl(sql='ALTER TABLE raw_orders_stream ADD COLUMN customer_tier VARCHAR, device_fingerprint VARCHAR;')" },
          { tag: "RESULT", class: "tag-result", text: "Success: Table schema migrated safely. Streaming pipeline resumed with zero record drop." }
        ],
        logs: [
          "[AGENT] Scenario initialized: Automated Schema Drift.",
          "[MODEL] Dispatched prompt to DeepSeek R1 Data Engineer.",
          "[TOOL_CALL] POST mcp://snowflake -> get_ddl_and_compare()",
          "[TELEMETRY] 2 schema additions detected.",
          "[TOOL_CALL] POST mcp://snowflake -> exec_ddl_migration()",
          "[PIPELINE] Ingestion resumed. Latency backlog cleared."
        ]
      }
    };

    let simRunning = false;
    let simStepIndex = 0;

    function changeSimScenario() {
      resetSimWorkflow();
    }

    function resetSimWorkflow() {
      simRunning = false;
      simStepIndex = 0;
      document.getElementById('simRunBtn').disabled = false;
      document.getElementById('trajStatusText').textContent = 'IDLE';
      document.getElementById('trajStatusText').style.color = '#7c3aed';
      
      const scenarioKey = document.getElementById('simScenarioSelect').value;
      const scenario = scenarioWorkflows[scenarioKey];
      
      document.getElementById('simTerminal').innerHTML = 
        '[AGENT_CORE] Reset session. Loaded ' + scenario.name + '.\\n' +
        '[MCP_BUS] Ready for tool dispatch.\\n' +
        '[STATUS] Click \\'Run Agent Loop\\' to execute.';
      
      document.getElementById('simTrajectoryList').innerHTML = 
        '<div class="traj-step-item"><span class="traj-tag tag-thought">INIT</span><div><strong>Scenario Ready:</strong> ' + scenario.name + '</div></div>';
    }

    function runSimWorkflow() {
      if (simRunning) return;
      simRunning = true;
      document.getElementById('simRunBtn').disabled = true;
      document.getElementById('trajStatusText').textContent = 'EXECUTING LOOP...';
      document.getElementById('trajStatusText').style.color = '#10b981';

      const scenarioKey = document.getElementById('simScenarioSelect').value;
      const scenario = scenarioWorkflows[scenarioKey];
      const term = document.getElementById('simTerminal');
      const trajList = document.getElementById('simTrajectoryList');

      term.innerHTML = '[SESSION_START] Running autonomous loop with ' + document.getElementById('simModelSelect').value + '...\\n';

      let step = 0;
      const interval = setInterval(() => {
        if (step < scenario.steps.length) {
          const s = scenario.steps[step];
          const log = scenario.logs[step];

          // Add to terminal
          term.innerHTML += log + '\\n';
          term.scrollTop = term.scrollHeight;

          // Add to trajectory
          const stepDiv = document.createElement('div');
          stepDiv.className = 'traj-step-item';
          stepDiv.innerHTML = '<span class="traj-tag ' + s.class + '">' + s.tag + '</span><div>' + s.text + '</div>';
          trajList.appendChild(stepDiv);
          trajList.scrollTop = trajList.scrollHeight;

          step++;
        } else {
          clearInterval(interval);
          simRunning = false;
          document.getElementById('simRunBtn').disabled = false;
          document.getElementById('trajStatusText').textContent = 'COMPLETED (SUCCESS)';
          document.getElementById('trajStatusText').style.color = '#059669';
          term.innerHTML += '[AGENT_CORE] Objective achieved. Session finalized successfully.\\n';
          term.scrollTop = term.scrollHeight;
        }
      }, 700);
    }
  </script>
</body>
</html>
`;

fs.writeFileSync('automation-ml-ai-agentic/demo.html', fullHtml, 'utf8');
console.log('Successfully written automation-ml-ai-agentic/demo.html! Total length: ' + fullHtml.length);
