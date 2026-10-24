const fs = require('fs');

function findDropdownBounds(content) {
  const start = content.indexOf('<div class="master-dropdown" id="subjectsDropdown">');
  if (start === -1) return null;
  let depth = 0;
  let idx = start;
  while (idx < content.length) {
    if (content.startsWith('<div', idx) && /[\s>]/.test(content[idx + 4] || '')) {
      depth++;
      idx += 4;
    } else if (content.startsWith('</div>', idx)) {
      depth--;
      idx += 6;
      if (depth === 0) {
        return { start, end: idx };
      }
    } else {
      idx++;
    }
  }
  return null;
}

const html = fs.readFileSync('foundational/data-structures/index.html', 'utf8');
const bounds = findDropdownBounds(html);
console.log('Bounds:', bounds);
if (bounds) {
  console.log('Length:', bounds.end - bounds.start);
  console.log('Text after end:', JSON.stringify(html.slice(bounds.end, bounds.end + 100)));
}
