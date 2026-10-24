const fs = require('fs');
const path = require('path');

const pysparkDir = path.join(__dirname, '..', 'pyspark');

const subtopicsMap = {
  'cluster-architecture.html': [
    { id: 'sec-race', title: 'Laptop vs Cluster Race' },
    { id: 'sec-kitchen', title: 'Kitchen Team Analogy' },
    { id: 'sec-topology', title: 'Visual Cluster Topology' },
    { id: 'sec-memory', title: 'Storage & Memory Breakdown' },
    { id: 'sec-sizer', title: 'Hardware Sizing Calculator' }
  ],
  'cloud-storage.html': [
    { id: 'sec-cloud-selector', title: 'Cloud Connector Studio' },
    { id: 'sec-committers', title: 'Zero-Rename Committers' },
    { id: 'sec-partition-layout', title: 'Hive Directory Partitioning' }
  ],
  'rdbms-jdbc.html': [
    { id: 'sec-jdbc-simulator', title: 'Parallel JDBC Simulator' },
    { id: 'sec-partition-columns', title: 'Partition Column Selection' },
    { id: 'sec-db-connection-pool', title: 'Connection Pool Saturation' }
  ],
  'mpp-warehouses.html': [
    { id: 'sec-mpp-simulator', title: 'MPP Ingestion Simulator' },
    { id: 'sec-staging-flow', title: 'Cloud Storage Staging Flow' },
    { id: 'sec-arrow-flight', title: 'Arrow Flight High-Throughput' }
  ],
  'dag-execution.html': [
    { id: 'sec-dag-simulator', title: 'Interactive DAG Simulator' },
    { id: 'sec-dag-visualizer', title: 'Visual DAG-Stage-Task Graph' },
    { id: 'sec-narrow-wide-ops', title: 'Narrow vs Wide Transformations' },
    { id: 'sec-catalyst-optimizer', title: 'Catalyst Logical & Physical Plan' }
  ],
  'shuffle-partitioning.html': [
    { id: 'sec-node-anatomy', title: 'Node Anatomy: CPU + RAM' },
    { id: 'sec-scheduling-pipeline', title: '5-Step Task Scheduling' },
    { id: 'sec-ingestion-dashboard', title: '50-Row Ingestion & Shuffle' },
    { id: 'sec-shuffle-network', title: 'Multi-Host Network Exchange' },
    { id: 'sec-df-dag-studio', title: 'DataFrame & DAG Execution' },
    { id: 'sec-skew-mitigation', title: 'Skew Mitigation & Salting' }
  ],
  'streaming-cdc.html': [
    { id: 'sec-streaming-sim', title: 'Streaming Stress Simulator' },
    { id: 'sec-streaming-arch', title: 'Partitions & Cores Golden Rule' },
    { id: 'sec-cdc-patterns', title: 'Debezium CDC WAL Patterns' }
  ]
};

Object.entries(subtopicsMap).forEach(([file, list]) => {
  const filePath = path.join(pysparkDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  list.forEach(st => {
    // Find section with id
    const startMarker = `<!-- SUBTOPIC: ${st.id} | ${st.title} [START] -->`;
    const endMarker = `<!-- SUBTOPIC: ${st.id} | ${st.title} [END] -->`;
    
    if (!html.includes(endMarker)) {
      // Find the closing </section> that corresponds to this section
      // Regex to match section starting from this id until its closing tag
      const re = new RegExp(`(<section[^>]*id=["']${st.id}["'][\\s\\S]*?<\\/section>)`, 'i');
      if (re.test(html)) {
        html = html.replace(re, `$1\n      <!-- ========================================================================= -->\n      ${endMarker}\n      <!-- ========================================================================= -->`);
      }
    }
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Verified subtopic delimiters in ${file}`);
});
