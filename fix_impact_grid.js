const fs = require('fs');
const path = require('path');

const rootDir = '/Users/fenmac2/Jesmin/chimpzlab';
const caseStudyDir = path.join(rootDir, 'services', 'casestudy');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Find the Impact section grid class that uses md:grid-cols-2
  const regex = /(<div[^>]*class=["'][^"']*grid[^"']*md:grid-cols-2[^"']*["'][^>]*>)/g;
  if (regex.test(content)) {
    const updated = content.replace(regex, (match) => {
      return match.replace('md:grid-cols-2', 'md:grid-cols-3');
    });
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated Impact grid in ${path.relative(rootDir, filePath)}`);
  }
}

function walk(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.html')) {
      processFile(full);
    }
  }
}

walk(caseStudyDir);
