const fs = require('fs');
const path = require('path');

const rootDir = '/Users/fenmac2/Jesmin/chimpzlab';

function getPrefix(filePath) {
  const rel = path.relative(rootDir, filePath);
  const depth = rel.split(path.sep).length - 1;
  return depth === 0 ? './' : '../'.repeat(depth);
}

function fixWorkImages(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const prefix = getPrefix(filePath);
  // Find img tags inside work swiper slides and adjust src if needed
  const regex = /<img\s+([^>]*?)src=("|')(services\/[^"']+?)\2([^>]*?)>/g;
  content = content.replace(regex, (match, pre, quote, srcPath, post) => {
    // If already prefixed (starts with ./ or ../), leave unchanged
    if (srcPath.startsWith('./') || srcPath.startsWith('../')) return match;
    const newSrc = `${prefix}${srcPath}`;
    return `<img ${pre}src=${quote}${newSrc}${quote}${post}>`;
  });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed work images in ${path.relative(rootDir, filePath)}`);
}

function walk(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (['node_modules', '.git', 'asset', 'insights', 'data', 'crm'].includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (full.endsWith('.html')) {
      const fileContent = fs.readFileSync(full, 'utf8');
      if (fileContent.includes('class="swiper work-swiper"')) {
        fixWorkImages(full);
      }
    }
  }
}

walk(rootDir);
