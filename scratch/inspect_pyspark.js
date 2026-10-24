const fs = require('fs');
const path = require('path');

const pysparkDir = path.join(__dirname, '..', 'pyspark');
const files = fs.readdirSync(pysparkDir).filter(f => f.endsWith('.html'));

console.log('Found PySpark HTML files:', files);

// Check if files contain header and sidebar
files.forEach(file => {
  const content = fs.readFileSync(path.join(pysparkDir, file), 'utf8');
  const hasHeader = content.includes('<header');
  const hasSidebar = content.includes('pyspark-inpage-sidebar') || content.includes('sidebar');
  const hasFooter = content.includes('<footer');
  console.log(`${file}: header=${hasHeader}, sidebar=${hasSidebar}, footer=${hasFooter}, length=${content.length}`);
});
