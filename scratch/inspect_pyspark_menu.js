const fs = require('fs');
const path = require('path');

const dir = 'pyspark';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = c.match(/<ul[^>]*class=["']sidebar-topics-list["'][^>]*>([\s\S]*?)<\/ul>/i);
  if (m) {
    const lis = [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`${f}: sidebar-topics-list has ${lis.length} items. First 2:`);
    lis.slice(0, 2).forEach((li, idx) => {
      console.log(`   [${idx}] ` + li[0].replace(/\s+/g, ' ').substring(0, 80));
    });
  } else {
    console.log(`${f}: NO sidebar-topics-list found!`);
  }
});
