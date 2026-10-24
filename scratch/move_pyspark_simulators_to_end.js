const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'pyspark', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix undefined metric subtitle
html = html.replace(
  '<span class="metric-sub">undefined</span>',
  '<span class="metric-sub">&uarr; Competitive Enterprise Baseline</span>'
);

// 2. Identify and extract the 4 simulators block
const startMarker = '<!-- 4 STANDALONE HARDWARE STRESS SIMULATORS SHOWCASE -->';
const endMarker = '<!-- 6 DEDICATED MODULE CARDS -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers for simulators showcase');
  process.exit(1);
}

// Extract the chunk between startIndex and endIndex
const simulatorsChunk = html.substring(startIndex, endIndex);

// In simulatorsChunk, the last tag is usually `</div>\n      </div>\n\n      `
// Let's extract just the simulator container:
const simBoxStart = '<div id="sec-simulators"';
const simBoxStartIndex = simulatorsChunk.indexOf(simBoxStart);

if (simBoxStartIndex === -1) {
  console.error('Could not find <div id="sec-simulators" in chunk');
  process.exit(1);
}

// Find where the simulators <div> closes before the hero </div>
// The structure is:
// <div id="sec-simulators" ...>
//   ...
// </div> <!-- closes sec-simulators -->
// </div> <!-- closes pyspark-page-hero -->

// Let's get the exact HTML for the simulator box
const lastDivIndex = simulatorsChunk.lastIndexOf('</div>');
// That last </div> closes the hero! The one before it closes the simulator box.
const secondLastDivIndex = simulatorsChunk.lastIndexOf('</div>', lastDivIndex - 1);

const cleanSimBox = simulatorsChunk.substring(simBoxStartIndex, secondLastDivIndex + 6);

// Now remove the simulators chunk from its original position and close the hero div cleanly
const replacementAtTop = `</div>\n\n      ${endMarker}`;
html = html.substring(0, startIndex) + replacementAtTop + html.substring(endIndex + endMarker.length);

// 3. Prepare the new bottom section for the simulators
const bottomSimulatorsSection = `
      <!-- ========================================================================= -->
      <!-- CAPSTONE INTERACTIVE SUITE: 4 HARDWARE & INGESTION STRESS SIMULATORS     -->
      <!-- ========================================================================= -->
      <section class="pyspark-section" style="margin-top:40px;margin-bottom:30px;">
        <div class="section-header" style="margin-bottom:18px;">
          <div class="section-title-wrap">
            <span class="hub-step-num-pill" style="font-size:0.75rem;margin-bottom:6px;display:inline-block;">LIVE CLUSTER TEST ENGINES</span>
            <h2 class="section-title" style="display:flex;align-items:center;gap:10px;">
              <i data-lucide="sliders" style="width:24px;height:24px;color:var(--spark-orange);"></i>
              4 Dedicated Interactive Ingestion &amp; Hardware Stress Simulators
            </h2>
            <span class="section-subtitle">
              Interactive cluster stress lab: Simulate real-time driver memory OOM, executor CPU core saturation, and network bottlenecks.
            </span>
          </div>
        </div>

        ${cleanSimBox}
      </section>
`;

// 4. Inject right before </main>
const mainCloseMarker = '</main>';
const mainCloseIndex = html.indexOf(mainCloseMarker);

if (mainCloseIndex === -1) {
  console.error('Could not find </main>');
  process.exit(1);
}

html = html.substring(0, mainCloseIndex) + bottomSimulatorsSection + '\n    ' + html.substring(mainCloseIndex);

// 5. Update the In-Page Right Sidebar Navigation order
const oldNavStart = '<aside class="sidebar-inpage-nav" id="sidebarInpageNav" aria-label="In-Page Table of Contents">';
const oldNavEnd = '</aside>';

const navStartIndex = html.indexOf(oldNavStart);
const navEndIndex = html.indexOf(oldNavEnd, navStartIndex);

if (navStartIndex !== -1 && navEndIndex !== -1) {
  const newNavHtml = `<aside class="sidebar-inpage-nav" id="sidebarInpageNav" aria-label="In-Page Table of Contents">
      <div class="inpage-header-box">
        <span class="inpage-header-title">
          <i data-lucide="compass" style="width:14px;height:14px;"></i>
          On This Page
        </span>
        <span style="font-size:0.7rem;color:var(--text-muted);font-family:var(--font-mono);">11 SECTIONS</span>
      </div>

      <ul class="inpage-list">
        <li class="inpage-item">
          <a href="#sec-executive-briefing" class="inpage-link active">
            <span class="inpage-step-num">01</span>
            <span>Why &bull; What &bull; How &bull; Where</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-job-market" class="inpage-link">
            <span class="inpage-step-num">02</span>
            <span>Job Market &amp; Career Briefing</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-step-1" class="inpage-link">
            <span class="inpage-step-num">03</span>
            <span>Module 01: Cluster Architecture</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-step-2" class="inpage-link">
            <span class="inpage-step-num">04</span>
            <span>Module 02: Cloud Storage</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-step-3" class="inpage-link">
            <span class="inpage-step-num">05</span>
            <span>Module 03: RDBMS Parallel JDBC</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-step-4" class="inpage-link">
            <span class="inpage-step-num">06</span>
            <span>Module 04: MPP Warehouses</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-step-5" class="inpage-link">
            <span class="inpage-step-num">07</span>
            <span>Module 05: DAG Stages & Tasks</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-step-6" class="inpage-link">
            <span class="inpage-step-num">08</span>
            <span>Module 06: Shuffle & Sizing</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-step-7" class="inpage-link">
            <span class="inpage-step-num">09</span>
            <span>Module 07: Real-Time Streaming</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-ingestion-matrix" class="inpage-link">
            <span class="inpage-step-num">10</span>
            <span>Ingestion Architecture Matrix</span>
          </a>
        </li>
        <li class="inpage-item">
          <a href="#sec-simulators" class="inpage-link">
            <span class="inpage-step-num">11</span>
            <span>Interactive Simulators (4)</span>
          </a>
        </li>
      </ul>
    </aside>`;

  html = html.substring(0, navStartIndex) + newNavHtml + html.substring(navEndIndex + oldNavEnd.length);
}

// 6. Ensure the comparison table section has id="sec-ingestion-matrix"
html = html.replace(
  '<section class="pyspark-section" style="margin-top:40px;">\n        <div class="section-header">',
  '<section class="pyspark-section" id="sec-ingestion-matrix" style="margin-top:40px;">\n        <div class="section-header">'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully moved 4 Simulators to end and updated navigation in pyspark/index.html');
