const fs = require('fs');

const c = fs.readFileSync('aws-dataengineering/index.html', 'utf8');
const aside = c.match(/<aside class="sidebar-topics">[\s\S]*?<\/aside>/i);
if (aside) console.log(aside[0]);
