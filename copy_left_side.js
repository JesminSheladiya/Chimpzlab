const fs = require('fs');
const path = require('path');

const rootDir = '/Users/fenmac2/Jesmin/chimpzlab/services';

const categories = [
    'reputation-communications',
    'visibility-search',
    'creative',
    'demand-generation',
    'digital-experiences'
];

for (const cat of categories) {
    const parentPath = path.join(rootDir, `${cat}.html`);
    if (!fs.existsSync(parentPath)) {
        console.log(`Parent not found: ${cat}.html`);
        continue;
    }
    
    const parentContent = fs.readFileSync(parentPath, 'utf8');
    // Extract the left side copy from the parent
    // We look for <!-- Left Side: Copy --> and capture the whole <div class="gsap-reveal">...</div>
    const parentRegex = /<!-- Left Side: Copy -->\s*(<div class="gsap-reveal">\s*<h2[\s\S]*?<\/h2>\s*<p[\s\S]*?<\/p>\s*<\/div>)/;
    const parentMatch = parentContent.match(parentRegex);
    
    if (!parentMatch) {
        console.log(`Could not find Left Side Copy in ${cat}.html`);
        continue;
    }
    
    const leftSideHtml = "<!-- Left Side: Copy -->\n                " + parentMatch[1];
    
    const innerDir = path.join(rootDir, cat);
    if (!fs.existsSync(innerDir)) continue;
    
    const innerFiles = fs.readdirSync(innerDir).filter(f => f.endsWith('.html'));
    
    for (const file of innerFiles) {
        const fullPath = path.join(innerDir, file);
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Match the <div class="gsap-reveal"> that comes immediately before the form container
        // The form container starts with something like <div class="bg-[#111] ..."> \n <form id="contactForm"
        const innerRegex = /<div class="gsap-reveal">\s*<h2[^>]*>[\s\S]*?<\/h2>\s*<p[^>]*>[\s\S]*?<\/p>\s*<\/div>(\s*<div[^>]*>\s*<form id="contactForm")/
        
        if (innerRegex.test(content)) {
            content = content.replace(innerRegex, `${leftSideHtml}$1`);
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated left side copy in ${cat}/${file}`);
        } else {
            console.log(`Regex did not match inner left copy in ${cat}/${file}`);
            
            // Try an alternative regex in case there's no h2/p exactly, or if it already has the comment
            const altRegex = /(?:<!-- Left Side: Copy -->\s*)?<div class="gsap-reveal">\s*<h2[^>]*>[\s\S]*?<\/h2>\s*<p[^>]*>[\s\S]*?<\/p>\s*<\/div>(\s*<div[^>]*>\s*<form id="contactForm")/
            if (altRegex.test(content)) {
                content = content.replace(altRegex, `${leftSideHtml}$1`);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated left side copy in ${cat}/${file} (using altRegex)`);
            } else {
                console.log(`Still no match for ${cat}/${file}`);
            }
        }
    }
}
