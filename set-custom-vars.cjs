const fs = require('fs');
const path = require('path');

const appName = process.argv[2];
const version = process.argv[3];
const baseDir = process.argv[4];

const K8S_PACKAGE_DIR = path.join(baseDir, '__k8s__');
console.log('K8S_PACKAGE_DIR', K8S_PACKAGE_DIR);

const setVersionInFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const newContent = fileContent.replace(/\${{ custom.version }}/g, version);
  fs.writeFileSync(filePath, newContent, 'utf8');
};

const setVersionInTemplates = () => {
  const templatesPath = path.join(K8S_PACKAGE_DIR, appName, 'templates');
  const files = fs.readdirSync(templatesPath);
  for (const file of files) {
    if (file.endsWith('.yaml')) {
      setVersionInFile(path.join(K8S_PACKAGE_DIR, appName, 'templates', file));
    }
  }
};

const setVersionInChart = () => {
  const chartPath = path.join(K8S_PACKAGE_DIR, appName, 'Chart.yaml');
  setVersionInFile(chartPath);
};

setVersionInTemplates();
setVersionInChart();