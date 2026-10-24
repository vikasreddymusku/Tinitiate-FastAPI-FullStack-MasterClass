const fs = require('fs');

const indexHtml = fs.readFileSync('pyspark/index.html', 'utf8');
const asideMatch = indexHtml.match(/<aside class="sidebar-topics-nav"[\s\S]*?<\/aside>/i);

if (asideMatch) {
  let asideContent = asideMatch[0];
  // Replace index.html active with inactive
  asideContent = asideContent.replace('href="index.html" class="sidebar-topic-link active"', 'href="index.html" class="sidebar-topic-link"');
  // Make demo.html active
  asideContent = asideContent.replace('href="demo.html" class="sidebar-topic-link"', 'href="demo.html" class="sidebar-topic-link active"');
  // Also adjust badge for demo
  asideContent = asideContent.replace('style="background:rgba(16,185,129,0.18);color:#10b981;border:1px solid rgba(16,185,129,0.3);"', 'style="background:#10b981;color:#ffffff;border:1px solid #10b981;"');

  let demoHtml = fs.readFileSync('pyspark/demo.html', 'utf8');
  const demoAsideRegex = /<aside class="sidebar-topics">[\s\S]*?<\/aside>/i;
  if (demoHtml.match(demoAsideRegex)) {
    demoHtml = demoHtml.replace(demoAsideRegex, asideContent);
    fs.writeFileSync('pyspark/demo.html', demoHtml, 'utf8');
    console.log('Updated pyspark/demo.html sidebar with full sidebar-topics-nav!');
  } else {
    console.log('demo.html sidebar-topics not found');
  }
} else {
  console.log('asideMatch not found in pyspark/index.html');
}
