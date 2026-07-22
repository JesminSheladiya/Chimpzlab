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
const footer1 = getFooter1(indexHtml);
const footer2 = getFooter2(indexHtml);

if (!footer1 || !footer2) {
    console.error("Could not find both footers in index.html");
    process.exit(1);
}

function replaceFooters(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === 'asset' || file === 'data' || file === 'crm') continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            replaceFooters(fullPath);
        } else if (file.endsWith('.html') && fullPath !== path.join(rootDir, 'index.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            
            // replace footer1
            const f1Start = content.indexOf('<footer class="w-full bg-[#050505]');
            if (f1Start !== -1) {
                const f1End = content.indexOf('</footer>', f1Start);
                if (f1End !== -1) {
                    content = content.substring(0, f1Start) + footer1 + content.substring(f1End + 9);
                    updated = true;
                }
            }
            
            // replace footer2
            const f2Start = content.indexOf('<footer class="footer-v2">');
            if (f2Start !== -1) {
                const f2End = content.indexOf('</footer>', f2Start);
                if (f2End !== -1) {
                    content = content.substring(0, f2Start) + footer2 + content.substring(f2End + 9);
                    updated = true;
                }
            }
            
            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated footers in ${fullPath}`);
            }
        }
    }
}

replaceFooters(rootDir);
console.log("Done updating footers.");
