const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- ========================================================================= -->\n      <!-- EXECUTIVE ARCHITECTURE BRIEFING: WHY, WHAT, HOW, WHERE & JOB MARKET';
const endMarker = '</section>\n      <!-- ========================================================================= -->';

const startIdx = html.indexOf(startMarker);
if (startIdx === -1) {
  console.error('startMarker not found');
  process.exit(1);
}

const endIdx = html.indexOf(endMarker, startIdx);
if (endIdx === -1) {
  console.error('endMarker not found');
  process.exit(1);
}

const totalEnd = endIdx + endMarker.length;
console.log('Found block from', startIdx, 'to', totalEnd, 'length:', totalEnd - startIdx);

html = html.slice(0, startIdx) + html.slice(totalEnd);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully removed sec-executive-briefing from index.html');
