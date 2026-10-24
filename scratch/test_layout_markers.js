const fs = require('fs');
const path = require('path');

const pysparkDir = path.join(__dirname, '..', 'pyspark');

const pages = [
  { file: 'cluster-architecture.html', idx: 1 },
  { file: 'cloud-storage.html', idx: 2 },
  { file: 'rdbms-jdbc.html', idx: 3 },
  { file: 'mpp-warehouses.html', idx: 4 },
  { file: 'dag-execution.html', idx: 5 },
  { file: 'shuffle-partitioning.html', idx: 6 },
  { file: 'streaming-cdc.html', idx: 7 },
  { file: 'index.html', idx: 0 }
];

pages.forEach(p => {
  const filePath = path.join(pysparkDir, p.file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find <header>
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
  // Find <footer
  const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/i);
  // Find <aside
  const asideMatch = content.match(/<aside[\s\S]*?<\/aside>/i);
  // Find layout wrapper
  const layoutMatch = content.match(/class=["'][^"']*layout-with-sidebar[^"']*["']/i);
  
  console.log(`${p.file}:`);
  console.log('  header length:', headerMatch ? headerMatch[0].length : 'none');
  console.log('  aside length:', asideMatch ? asideMatch[0].length : 'none');
  console.log('  layoutMatch:', !!layoutMatch);
  console.log('  footer length:', footerMatch ? footerMatch[0].length : 'none');
});
