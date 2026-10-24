const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const rpanelAiIdx = html.indexOf('id="rpanel-ai"');
const rpanelDeIdx = html.indexOf('id="rpanel-de"');
const rpanelGovIdx = html.indexOf('id="rpanel-gov"');
const endRoadmapsIdx = html.indexOf('</section>', rpanelGovIdx);

console.log('rpanel-ai index:', rpanelAiIdx);
console.log('rpanel-de index:', rpanelDeIdx);
console.log('rpanel-gov index:', rpanelGovIdx);
console.log('endRoadmaps index:', endRoadmapsIdx);

function countDivs(slice, name) {
  const opens = (slice.match(/<div(\s|>)/gi) || []).length;
  const closes = (slice.match(/<\/div>/gi) || []).length;
  console.log(name, 'opens:', opens, 'closes:', closes, 'diff (opens - closes):', opens - closes);
}

countDivs(html.slice(rpanelAiIdx, rpanelDeIdx), 'rpanel-ai slice');
countDivs(html.slice(rpanelDeIdx, rpanelGovIdx), 'rpanel-de slice');
countDivs(html.slice(rpanelGovIdx, endRoadmapsIdx), 'rpanel-gov slice');
