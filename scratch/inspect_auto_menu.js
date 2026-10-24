const fs = require('fs');
const path = require('path');

const dir = 'automation-ml-ai-agentic';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = c.match(/<ul[^>]*class=["']site-menu["'][^>]*>([\s\S]*?)<\/ul>/i);
  if (m) {
    const lis = [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`${f}: site-menu has ${lis.length} items. First 2:`);
    lis.slice(0, 2).forEach((li, idx) => {
      console.log(`   [${idx}] ` + li[0].replace(/\s+/g, ' ').substring(0, 80));
    });
  } else {
    console.log(`${f}: NO site-menu found!`);
  }
});
