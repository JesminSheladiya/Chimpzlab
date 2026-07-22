const fs = require('fs');
const path = require('path');

const dir = '/Users/fenmac2/Jesmin/chimpzlab/services/casestudy';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // We want to match:
    // <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 gsap-reveal">
    //   <div>
    //     <div class="flex items-center gap-4 mb-6">
    //       <div class="w-12 h-[1px] bg-brand-dark/30"></div>
    //       <span ...>Our Approach</span>
    //     </div>
    //     <h2 ...> Title </h2>
    //   </div>
    //   <div class="max-w-sm">
    //     <p ...> Text </p>
    //   </div>
    // </div>
    
    const regex = /<div\s+class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 gsap-reveal">\s*<div>\s*<div\s+class="flex items-center gap-4 mb-6">\s*<div\s+class="w-12 h-\[1px\] bg-brand-dark\/30"><\/div>\s*<span\s+class="text-xs font-bold uppercase tracking-\[0\.2em\] text-brand-dark\/50">([\s\S]*?)<\/span>\s*<\/div>\s*<h2([^>]*)>([\s\S]*?)<\/h2>\s*<\/div>\s*<div\s+class="max-w-sm">\s*<p([^>]*)>([\s\S]*?)<\/p>\s*<\/div>\s*<\/div>/;

    if (regex.test(content)) {
        const match = content.match(regex);
        const spanText = match[1];
        const h2Attrs = match[2];
        const h2Text = match[3];
        const pAttrs = match[4];
        const pText = match[5];

        const newStructure = `<div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-[1px] bg-brand-dark/30"></div>
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark/50">${spanText}</span>
            </div>
            <div class="flex flex-col md:flex-row items-start justify-between gap-8 mb-16 gsap-reveal">
                <div>
                    <h2${h2Attrs}>${h2Text}</h2>
                </div>
                <div class="max-w-sm">
                    <p${pAttrs}>${pText}</p>
                </div>
            </div>`;

        content = content.replace(regex, newStructure);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`Did not match ${file}. Let's try matching with flexible whitespace...`);
        // Let's try a more forgiving regex in case of slight variations
        const regex2 = /<div[^>]*class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 gsap-reveal"[^>]*>[\s\S]*?<div>\s*<div[^>]*class="flex items-center gap-4 mb-6"[^>]*>[\s\S]*?<span[^>]*class="text-xs font-bold uppercase tracking-\[0\.2em\] text-brand-dark\/50"[^>]*>([\s\S]*?)<\/span>\s*<\/div>\s*<h2([^>]*)>([\s\S]*?)<\/h2>\s*<\/div>\s*<div[^>]*class="max-w-sm"[^>]*>\s*<p([^>]*)>([\s\S]*?)<\/p>\s*<\/div>\s*<\/div>/;
        if (regex2.test(content)) {
            const match = content.match(regex2);
            const spanText = match[1];
            const h2Attrs = match[2];
            const h2Text = match[3];
            const pAttrs = match[4];
            const pText = match[5];
            
            const newStructure = `<div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-[1px] bg-brand-dark/30"></div>
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark/50">${spanText}</span>
            </div>
            <div class="flex flex-col md:flex-row items-start justify-between gap-8 mb-16 gsap-reveal">
                <div>
                    <h2${h2Attrs}>${h2Text}</h2>
                </div>
                <div class="max-w-sm">
                    <p${pAttrs}>${pText}</p>
                </div>
            </div>`;
            content = content.replace(regex2, newStructure);
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated ${file} (with regex2)`);
        } else {
            console.log(`Still did not match ${file}. Skipping.`);
        }
    }
}
