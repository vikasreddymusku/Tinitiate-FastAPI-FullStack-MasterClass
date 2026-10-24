const fs = require('fs');
const path = 'c:/work/GIT-CODE/interactive-ui/automation-ml-ai-agentic/demo.html';

let content = fs.readFileSync(path, 'utf8');

// Polish Slide 1
content = content.replace(/font-size:\s*0\.94rem;font-weight:800;color:#fff;/g, 'font-size: 1.05rem;font-weight:900;color:#fff;');
content = content.replace(/font-size:\s*0\.94rem;font-weight:800;color:#c084fc;/g, 'font-size: 1.05rem;font-weight:900;color:#c084fc;');
content = content.replace(/font-size:\s*0\.94rem;font-weight:800;color:#fca5a5;/g, 'font-size: 1.05rem;font-weight:900;color:#fca5a5;');

// Polish Slide 2
content = content.replace(/<div style="font-size:0\.95rem;font-weight:900;">94\.2%<\/div>/g, '<div style="font-size: 1.6rem;font-weight:900;color:#fff;line-height:1.1;">94.2%</div>');
content = content.replace(/<div class="ml-weight-node">W₁<\/div>/g, '<div class="ml-weight-node" style="width:34px;height:34px;font-size:0.95rem;">W₁</div>');
content = content.replace(/<div class="ml-weight-node" style="animation-delay:0\.5s;">W₂<\/div>/g, '<div class="ml-weight-node" style="width:34px;height:34px;font-size:0.95rem;animation-delay:0.5s;">W₂</div>');
content = content.replace(/<div class="ml-weight-node" style="animation-delay:1s;">W₃<\/div>/g, '<div class="ml-weight-node" style="width:34px;height:34px;font-size:0.95rem;animation-delay:1s;">W₃</div>');

// Polish Slide 3
content = content.replace(/<div style="font-size:0\.82rem;font-weight:900;color:#ffffff;">Self-Attention Heads<\/div>/g, '<div style="font-size: 1.15rem;font-weight:900;color:#ffffff;">Self-Attention Heads</div>');

// Polish Snap 3 Remotion HUD Text
content = content.replace(/id="rTelemetryText" style="[^"]*"/g, 'id="rTelemetryText" style="color:#f8fafc;font-size:0.95rem;line-height:1.5;font-weight:600;"');
content = content.replace(/font-size:0\.8rem;color:#94a3b8;font-weight:600;/g, 'font-size: 0.95rem;color:#cbd5e1;font-weight:700;');

// Polish Snap 5 Terminal and Select
content = content.replace(/<span class="sim-label">/g, '<span class="sim-label" style="font-size:0.92rem;font-weight:800;">');

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully polished presentation slide and canvas fonts!");
