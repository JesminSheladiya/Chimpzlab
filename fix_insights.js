const fs = require('fs');
const path = require('path');

const rootDir = '/Users/fenmac2/Jesmin/chimpzlab';

const pageMappings = {
    // 1. Visibility & Search (2.2 SEO/AEO)
    'services/visibility-search/seo-aeo.html': [
        'does-faq-schema-still-matter-2026',
        'how-do-ai-answer-engines-choose-sources'
    ],
    // 2. Demand Generation (4.1 Performance Marketing)
    'services/demand-generation/performance-marketing.html': [
        'who-is-liable-for-ai-generated-google-ads-2026'
    ],
    // 3. Creative (3.3 Video Production)
    'services/creative/video-production.html': [
        'best-ai-video-generator-india-2026'
    ],
    // 4. Visibility & Search (2.1 Social Media Marketing)
    'services/visibility-search/social-media-marketing.html': [
        'social-seo-india-2026'
    ],
    // 5. Visibility & Search (2.3 Content Writing)
    'services/visibility-search/content-writing.html': [
        'how-to-write-content-for-ai-citation-aeo'
    ],
    // 6. Visibility & Search (Influencer Marketing)
    'services/visibility-search/influencer-marketing.html': [
        'asci-ai-influencer-disclosure-rules-india-2026'
    ],
    // 7. Reputation & Communications (1.2 Public Relations / 1.3 Thought Leadership)
    'services/reputation-communications/public-relations.html': [
        'pr-for-ai-search-visibility-geo-india'
    ],
    'services/reputation-communications/thought-leadership.html': [
        'pr-for-ai-search-visibility-geo-india'
    ],
    // 8. Demand Generation (4.2 Email Marketing / 4.4 Marketing Automation)
    'services/demand-generation/email-marketing.html': [
        'dpdp-act-email-marketing-compliance-india-2026'
    ],
    'services/demand-generation/marketing-automation.html': [
        'dpdp-act-email-marketing-compliance-india-2026'
    ],
    // 9. Digital Experiences (5.3 Chatbot & Virtual Assistant)
    'services/digital-experiences/chatbots.html': [
        'whatsapp-ai-chatbot-business-india-cost'
    ],
    
    // Parent Categories (combine all their children)
    'services/visibility-search.html': [
        'does-faq-schema-still-matter-2026',
        'how-do-ai-answer-engines-choose-sources',
        'social-seo-india-2026',
        'how-to-write-content-for-ai-citation-aeo',
        'asci-ai-influencer-disclosure-rules-india-2026'
    ],
    'services/demand-generation.html': [
        'who-is-liable-for-ai-generated-google-ads-2026',
        'dpdp-act-email-marketing-compliance-india-2026'
    ],
    'services/creative.html': [
        'best-ai-video-generator-india-2026'
    ],
    'services/reputation-communications.html': [
        'pr-for-ai-search-visibility-geo-india'
    ],
    'services/digital-experiences.html': [
        'whatsapp-ai-chatbot-business-india-cost'
    ]
};

function getDepthPrefix(filePath) {
    const relative = path.relative(rootDir, filePath);
    const depth = relative.split(path.sep).length - 1;
    if (depth === 0) return './';
    return '../'.repeat(depth);
}

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (['node_modules', '.git', 'asset', 'data', 'crm', 'insights'].includes(file)) continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processFiles(fullPath);
        } else if (file.endsWith('.html')) {
            const relPath = path.relative(rootDir, fullPath);
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Check if file has the dynamic insights loader block
            const jsRegex = /<script>\s*\/\/\s*Dynamic insights loader\s*\([\s\S]*?<\/script>/;
            const gridRegex = /<div id="insight-grid" class="[^"]*"><\/div>/;
            
            if (jsRegex.test(content) && gridRegex.test(content)) {
                // Determine prefix
                const prefix = getDepthPrefix(fullPath);
                
                // Determine slugs mapping
                const slugs = pageMappings[relPath] || [];
                const slugsJson = JSON.stringify(slugs);
                
                // Fix the grid HTML to use auto layout (cards instead of split vertical borders)
                content = content.replace(gridRegex, `<div id="insight-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>`);
                
                // Generate new JS block
                const newJs = `<script>
        // Dynamic insights loader
        (async function () {
            const grid = document.getElementById('insight-grid');
            if (!grid) return;
            try {
                const prefix = '${prefix}';
                const targetSlugs = ${slugsJson};
                const res = await fetch(prefix + 'insights/data.json');
                const data = await res.json();
                
                let articles = [];
                if (targetSlugs.length > 0) {
                    articles = data.articles.filter(a => targetSlugs.includes(a.slug));
                    // Sort articles in the exact order specified in targetSlugs
                    articles.sort((a, b) => targetSlugs.indexOf(a.slug) - targetSlugs.indexOf(b.slug));
                } else {
                    // Fallback for pages not explicitly mapped: show 3 recent
                    articles = (data.articles || []).slice(0, 3);
                }
                
                if (articles.length === 0) return;
                function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
                grid.innerHTML = articles.map(function (a, i) {
                    // Replaced vertical border logic with a clean boxed card design to support wrapping grids
                    return '<div class="p-6 md:p-8 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">' +
                        '<span class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 block">' + (a.tag || cap(a.category)) + '</span>' +
                        '<h3 class="text-lg md:text-xl font-bold mb-8 leading-snug">' + a.titleFull + '</h3>' +
                        '<a href="' + prefix + 'blog-insite.html?slug=' + a.slug + '" class="text-brand-dark hover:opacity-70 transition-opacity duration-300 inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider">' +
                        'Read More' +
                        '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>' +
                        '</a></div>';
                }).join('');
            } catch (e) { console.warn('Insights load error:', e); }
        })();
    </script>`;

                content = content.replace(jsRegex, newJs);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated Insights loader in ${relPath}`);
            }
        }
    }
}

processFiles(rootDir);
