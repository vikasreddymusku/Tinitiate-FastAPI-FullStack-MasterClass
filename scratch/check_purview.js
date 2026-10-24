const fs = require('fs');

const c = fs.readFileSync('data-governence/purview-sandbox/index.html', 'utf8');
const links = c.match(/<a[^>]*href=["'][^"']*\.html["'][^>]*>[\s\S]*?<\/a>/gi);
console.log('HTML links in purview-sandbox/index.html:');
if (links) {
  links.filter(l => !l.includes('../../')).forEach(l => console.log(l.replace(/\s+/g, ' ')));
}
