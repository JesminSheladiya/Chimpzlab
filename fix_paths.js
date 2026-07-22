const fs = require('fs');
const path = require('path');

const rootDir = '/Users/fenmac2/Jesmin/chimpzlab';

function getFooter1(html) {
    const startTag = '<footer class="w-full bg-[#050505]';
    const startIndex = html.indexOf(startTag);
    if (startIndex === -1) return null;
    const endTag = '</footer>';
    const endIndex = html.indexOf(endTag, startIndex);
    if (endIndex === -1) return null;
    return html.substring(startIndex, endIndex + endTag.length);
}

function getFooter2(html) {
    const startTag = '<footer class="footer-v2">';
    const startIndex = html.indexOf(startTag);
    if (startIndex === -1) return null;
    const endTag = '</footer>';
    const endIndex = html.indexOf(endTag, startIndex);
    if (endIndex === -1) return null;
    return html.substring(startIndex, endIndex + endTag.length);
}

const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const baseFooter1 = getFooter1(indexHtml);
const baseFooter2 = getFooter2(indexHtml);

if (!baseFooter1 || !baseFooter2) {
    console.error("Could not find both footers in index.html");
    process.exit(1);
}

function adjustPaths(html, depth) {
    let prefix = '';
    if (depth > 0) {
        prefix = '../'.repeat(depth);
    }
    
    // First, remove leading slashes to normalize
    let res = html.replace(/(href|src)="\/?(asset\/|services\/|index\.html|about\.html|insights\.html|case-studies\.html)/g, '$1="$2');
    
    // Then prepend prefix
    if (prefix) {
        res = res.replace(/(href|src)="(asset\/|services\/|index\.html|about\.html|insights\.html|case-studies\.html)/g, `$1="${prefix}$2`);
    }
    return res;
}

function replaceFooters(dir, depth) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === 'asset' || file === 'data' || file === 'crm') continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            replaceFooters(fullPath, depth + 1);
        } else if (file.endsWith('.html') && fullPath !== path.join(rootDir, 'index.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            
            const adjustedFooter1 = adjustPaths(baseFooter1, depth);
            const adjustedFooter2 = adjustPaths(baseFooter2, depth);
            
            // replace footer1
            const f1Start = content.indexOf('<footer class="w-full bg-[#050505]');
            if (f1Start !== -1) {
                const f1End = content.indexOf('</footer>', f1Start);
                if (f1End !== -1) {
                    content = content.substring(0, f1Start) + adjustedFooter1 + content.substring(f1End + 9);
                    updated = true;
                }
            }
            
            // replace footer2
            const f2Start = content.indexOf('<footer class="footer-v2">');
            if (f2Start !== -1) {
                const f2End = content.indexOf('</footer>', f2Start);
                if (f2End !== -1) {
                    content = content.substring(0, f2Start) + adjustedFooter2 + content.substring(f2End + 9);
                    updated = true;
                }
            }
            
            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated footers in ${fullPath} (depth ${depth})`);
            }
        }
    }
}

// Ensure index.html itself also has normalized paths (no leading slash for local files)
let idxContent = indexHtml;
let idxUpdated = false;
const idxAdjF1 = adjustPaths(baseFooter1, 0);
const idxAdjF2 = adjustPaths(baseFooter2, 0);

const idxF1Start = idxContent.indexOf('<footer class="w-full bg-[#050505]');
if (idxF1Start !== -1) {
    const idxF1End = idxContent.indexOf('</footer>', idxF1Start);
    idxContent = idxContent.substring(0, idxF1Start) + idxAdjF1 + idxContent.substring(idxF1End + 9);
    idxUpdated = true;
}
const idxF2Start = idxContent.indexOf('<footer class="footer-v2">');
if (idxF2Start !== -1) {
    const idxF2End = idxContent.indexOf('</footer>', idxF2Start);
    idxContent = idxContent.substring(0, idxF2Start) + idxAdjF2 + idxContent.substring(idxF2End + 9);
    idxUpdated = true;
}
if (idxUpdated) {
    fs.writeFileSync(path.join(rootDir, 'index.html'), idxContent, 'utf8');
    console.log('Normalized paths in index.html footer');
}


replaceFooters(rootDir, 0);
console.log("Done fixing paths.");
