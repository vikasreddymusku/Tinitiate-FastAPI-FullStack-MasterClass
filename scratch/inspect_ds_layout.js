const fs = require('fs');

const f = 'foundational/data-structures/index.html';
const c = fs.readFileSync(f, 'utf8');

// check what layout container it has
console.log('Includes master-layout-container:', c.includes('master-layout-container'));
console.log('Includes sidebar:', c.includes('sidebar'));
console.log('Includes page-main-wrap:', c.includes('page-main-wrap'));
