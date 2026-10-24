const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;

let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  const code = match[1];
  console.log(`Checking script #${count} (length ${code.length})...`);
  try {
    new Function(code);
    console.log(`Script #${count} syntax OK!`);
  } catch (err) {
    console.error(`Script #${count} Syntax Error:`, err.message);
  }
}
