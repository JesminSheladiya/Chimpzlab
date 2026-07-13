const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// ── Case Study Data ──────────────────────────────────────────────
const caseStudies = {
  'nasscom-member-connect': {
    title: 'NASSCOM Member Connect',
    desc: 'Sustaining Ecosystem Engagement',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=NASSCOM+Member+Connect',
    localImg: null,
  },
  'nasscom-konnect': {
    title: 'NASSCOM Konnect',
    desc: 'Scaling India\'s Flagship Tech Platforms',
    image: null,
    localImg: 'nasscom-konnect/cover.jpg',
  },
  'stl-digital': {
    title: 'STL Digital',
    desc: 'Giving a Global Tech Brand a Consistent Voice',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=STL+Digital',
    localImg: null,
  },
  'evershine-builders': {
    title: 'Evershine Builders',
    desc: 'Building Director-Led Thought Leadership',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Evershine+Builders',
    localImg: null,
  },
  'mos-world': {
    title: 'MOS World',
    desc: 'Repositioning a Fintech Ahead of Its IPO',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=MOS+World',
    localImg: null,
  },
  'blue-star': {
    title: 'Blue Star India',
    desc: 'Building an Employer Brand That Talent Trusts',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Blue+Star+India',
    localImg: null,
  },
  'imbesharam': {
    title: 'IMBesharam',
    desc: 'Marketing an Adult Wellness Brand Without Paid Media',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=IMBesharam',
    localImg: null,
  },
  'ghci-2024': {
    title: 'Grace Hopper Celebration India 2024',
    desc: 'Turning an Event Into a Movement',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=GHCI+2024',
    localImg: null,
  },
  'carnelian-capital': {
    title: 'Carnelian Capital',
    desc: 'From Unranked to Category Leader',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Carnelian+Capital',
    localImg: null,
  },
  'tiger-analytics': {
    title: 'Tiger Analytics',
    desc: 'Doubling Organic Reach in an AI-Saturated Category',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Tiger+Analytics',
    localImg: null,
  },
  'soul-skin': {
    title: 'Soul Skin',
    desc: 'Owning Page One of a Hyperlocal Category',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Soul+Skin',
    localImg: null,
  },
  'munns-mars': {
    title: 'Munns & Mars',
    desc: 'Driving Communications & Storyline',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Munns+%26+Mars',
    localImg: null,
  },
  'forest-hills': {
    title: 'Forest Hills at Tala',
    desc: 'Building a Brand Before the First Guest Arrives',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Forest+Hills+Tala',
    localImg: null,
  },
  'psiog': {
    title: 'Psiog',
    desc: 'Building a Visual Language Around Trust and Collaboration',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Psiog',
    localImg: null,
  },
  'robust-petcare': {
    title: 'Robust Petcare',
    desc: 'Packaging That Says It All',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Robust+Petcare',
    localImg: null,
  },
  'ajmera-realty': {
    title: 'Ajmera Realty & Infra India Ltd.',
    desc: 'An Investor Presentation Template Built to Last',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Ajmera+Realty',
    localImg: null,
  },
  'cisco-thingqbator': {
    title: 'Cisco thingQbator',
    desc: 'Scaling Free Tech Education During a Pandemic',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Cisco+thingQbator',
    localImg: null,
  },
};

// ── Service → Case Study ID Mapping ──────────────────────────────
const serviceMapping = {
  'reputation-communications/corporate-communications': ['nasscom-member-connect', 'nasscom-konnect', 'stl-digital'],
  'reputation-communications/public-relations': ['evershine-builders'],
  'reputation-communications/thought-leadership': ['evershine-builders', 'nasscom-member-connect', 'mos-world'],
  'reputation-communications/employer-branding': ['blue-star'],
  'reputation-communications': ['nasscom-member-connect', 'nasscom-konnect', 'stl-digital'],

  'visibility-search/social-media-marketing': ['imbesharam', 'ghci-2024', 'stl-digital', 'nasscom-konnect', 'nasscom-member-connect', 'blue-star', 'evershine-builders', 'munns-mars'],
  'visibility-search/seo-aeo': ['carnelian-capital', 'tiger-analytics', 'soul-skin'],
  'visibility-search/content-writing': ['imbesharam', 'carnelian-capital', 'tiger-analytics', 'soul-skin'],
  'visibility-search/influencer-marketing': ['munns-mars'],
  'visibility-search': ['carnelian-capital', 'tiger-analytics', 'soul-skin'],

  'creative/branding': ['forest-hills', 'psiog', 'mos-world', 'robust-petcare'],
  'creative/design': ['ajmera-realty', 'robust-petcare', 'stl-digital', 'ghci-2024', 'imbesharam', 'forest-hills', 'cisco-thingqbator'],
  'creative/video-production': [], // already has YouTube carousel
  'creative': ['forest-hills', 'psiog', 'mos-world', 'robust-petcare'],

  'demand-generation/performance-marketing': ['cisco-thingqbator'],
  'demand-generation/email-marketing': [],
  'demand-generation/vetted-lead-generation': [],
  'demand-generation/marketing-automation': [],
  'demand-generation': ['cisco-thingqbator'],

  'digital-experiences/website-design-development': [],
  'digital-experiences/landing-pages': [],
  'digital-experiences/chatbots': ['soul-skin'],
  'digital-experiences': ['soul-skin'],
};

// ── Helpers ──────────────────────────────────────────────────────
function getDepth(filePath) {
  const rel = path.relative(ROOT, filePath);
  return rel.split('/').length - 1;
}

// Prefix for assets/services at same directory level as the page (e.g. ../casestudy/)
function csLinkPrefix(depth) {
  return depth > 1 ? '../'.repeat(depth - 1) : '';
}

// Prefix for root-level files (e.g. ../../case-studies.html)
function rootLinkPrefix(depth) {
  return depth > 0 ? '../'.repeat(depth) : '';
}

function cardContent(csId, csData, depth) {
  const link = csLinkPrefix(depth) + 'casestudy/' + csId + '.html';
  let imgSrc;
  if (csData.localImg) {
    imgSrc = csLinkPrefix(depth) + 'casestudy/' + csData.localImg;
  } else {
    imgSrc = csData.image;
  }
  return { link, imgSrc };
}

function makeCardHTML(csId, csData, depth) {
  const { link, imgSrc } = cardContent(csId, csData, depth);
  return `<a href="${link}" class="block group interactive gsap-reveal h-full">
                    <div class="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden h-full flex flex-col">
                        <div class="relative h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden shrink-0">
                            <img src="${imgSrc}" alt="${csData.title}"
                                class="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110">
                        </div>
                        <div class="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
                            <h3 class="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-2 sm:mb-3 leading-tight tracking-tight">${csData.title}</h3>
                            <p class="text-gray-400 font-medium text-sm leading-relaxed mb-4 sm:mb-5 flex-1 line-clamp-2">${csData.desc}</p>
                            <span class="inline-flex items-center gap-2 text-white font-bold text-xs sm:text-sm group-hover:gap-3 transition-all duration-300">
                                Read More
                                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </a>`;
}

function makeHeading(depth) {
  const rootPref = rootLinkPrefix(depth);
  return `<div class="flex items-center gap-4 mb-4 gsap-reveal">
                <div class="w-12 h-[1px] bg-white/30"></div>
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Case Studies</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 gsap-reveal">
                <h2 class="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter uppercase m-0">
                    Featured Work
                </h2>
                <a href="${rootPref}case-studies.html"
                    class="inline-flex items-center gap-2 text-white font-bold text-sm hover:gap-3 transition-all duration-300 pb-1 border-b border-white/30 hover:border-white shrink-0 uppercase tracking-wider">
                    View All Case Studies
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </a>
            </div>`;
}

function makeGridSection(ids, depth) {
  const heading = makeHeading(depth);
  const cards = ids.map(id => makeCardHTML(id, caseStudies[id], depth)).join('\n                        ');
  const gridClass = ids.length === 1 ? 'max-w-lg mx-auto' : 'grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8';
  return `    <!-- Case Studies Grid Version (Active by default) -->
    <section class="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-brand-dark text-white border-t border-white/10">
        <div class="max-w-[1400px] mx-auto">
            ${heading}
            <div class="${gridClass}">
                        ${cards}
                    </div>
        </div>
    </section>`;
}

function makeCarouselSection(ids, depth) {
  const heading = makeHeading(depth);
  const slides = ids.map(id => {
    const card = makeCardHTML(id, caseStudies[id], depth);
    return `<div class="swiper-slide h-auto">${card}</div>`;
  }).join('\n                        ');
  return `    <!-- Case Studies Grid Version (Active by default) -->
    <section class="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-brand-dark text-white border-t border-white/10 overflow-hidden">
        <div class="max-w-[1400px] mx-auto">
            ${heading}
            <div class="case-study-carousel-outer relative">
                <div class="swiper case-study-carousel gsap-reveal">
                    <div class="swiper-wrapper">
                        ${slides}
                    </div>
                    <div class="swiper-pagination !relative !bottom-auto mt-10 md:mt-12"></div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
    </section>`;
}

const carouselCSS = `
        /* Case Study Carousel */
        .case-study-carousel-outer { position: relative; }
        .case-study-carousel .swiper-slide { height: auto; }
        .case-study-carousel .swiper-slide > a { height: 100%; }
        .case-study-carousel .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.25);
            width: 10px; height: 10px; opacity: 1;
            transition: all 0.3s ease;
        }
        .case-study-carousel .swiper-pagination-bullet-active {
            background: #fff;
            width: 32px; border-radius: 5px;
        }
        .case-study-carousel-outer .swiper-button-next,
        .case-study-carousel-outer .swiper-button-prev {
            color: #fff;
            background: rgba(255, 255, 255, 0.06);
            width: 52px; height: 52px;
            border-radius: 50%;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            transition: all 0.3s ease;
            position: absolute; top: 50%;
            transform: translateY(-50%);
            z-index: 10;
        }
        .case-study-carousel-outer .swiper-button-next:hover,
        .case-study-carousel-outer .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 0.15);
        }
        .case-study-carousel-outer .swiper-button-next:hover {
            transform: translateY(-50%) scale(1.08);
        }
        .case-study-carousel-outer .swiper-button-prev:hover {
            transform: translateY(-50%) scale(1.08);
        }
        .case-study-carousel-outer .swiper-button-next::after,
        .case-study-carousel-outer .swiper-button-prev::after {
            font-size: 16px; font-weight: 700;
        }
        .case-study-carousel-outer .swiper-button-next { right: -8px; }
        @media (min-width: 768px) {
            .case-study-carousel-outer .swiper-button-next { right: -26px; }
        }
        .case-study-carousel-outer .swiper-button-prev { left: -8px; }
        @media (min-width: 768px) {
            .case-study-carousel-outer .swiper-button-prev { left: -26px; }
        }`;

const carouselJS = `
        // Case Study Carousel
        if (document.querySelector('.case-study-carousel')) {
            new Swiper('.case-study-carousel', {
                slidesPerView: 1,
                spaceBetween: 16,
                loop: true,
                speed: 600,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: { slidesPerView: 1.5, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 2.5, spaceBetween: 28 },
                    1280: { slidesPerView: 3, spaceBetween: 32 },
                },
            });
        }`;

// ── Main ─────────────────────────────────────────────────────────
function findPages(dir) {
  const result = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory() && e.name !== 'casestudy') result.push(...findPages(full));
      else if (e.name.endsWith('.html')) result.push(full);
    }
  } catch (_) {}
  return result;
}

function processPage(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const depth = getDepth(filePath);

  const rel = path.relative(ROOT, filePath);
  const serviceKey = rel.replace(/\.html$/, '').replace(/^services\//, '');

  const ids = serviceMapping[serviceKey] || [];
  if (!ids || ids.length === 0) {
    console.log('  ○ Skip (no case studies mapped)', serviceKey);
    return;
  }
  if (serviceKey === 'creative/video-production') {
    console.log('  ○ Skip (has YouTube carousel)', serviceKey);
    return;
  }

  const markers = [
    '<!-- Case Studies Grid Version (Active by default) -->',
    '<!-- Case Study Section -->',
  ];
  let marker = null;
  let markerIdx = -1;
  for (const m of markers) {
    const idx = html.indexOf(m);
    if (idx !== -1) { marker = m; markerIdx = idx; break; }
  }
  if (markerIdx === -1) {
    console.log('  ○ Skip (marker not found)', serviceKey);
    return;
  }

  const afterMarker = html.substring(markerIdx + marker.length);
  const boundaries = [
    afterMarker.indexOf('<!-- Insights Section -->'),
    afterMarker.indexOf('<!-- Video Portfolio Carousel -->'),
    afterMarker.indexOf('id="booking-form"'),
    afterMarker.indexOf('class="py-32 px-6 md:px-12 bg-white text-brand-dark"'),
  ].filter(i => i > 0);
  const endBoundary = boundaries.length > 0 ? Math.min(...boundaries) : afterMarker.length;

  const sectionContent = afterMarker.substring(0, endBoundary);
  const lastSectionClose = sectionContent.lastIndexOf('</section>');
  if (lastSectionClose === -1) {
    console.log('  ○ Skip (no section close found)', serviceKey);
    return;
  }

  const sectionEnd = markerIdx + marker.length + lastSectionClose + 10;
  const oldSection = html.substring(markerIdx, sectionEnd);

  const needsSwiper = ids.length >= 3;
  const newSection = needsSwiper ? makeCarouselSection(ids, depth) : makeGridSection(ids, depth);
  html = html.replace(oldSection, newSection);

  // Add Swiper infrastructure if needed
  if (needsSwiper) {
    // Add Swiper CSS lib if not present
    if (!html.includes('swiper-bundle.min.css')) {
      html = html.replace('</head>', '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">\n</head>');
    }
    // Add Swiper JS lib if not present
    if (!html.includes('swiper-bundle.min.js')) {
      html = html.replace('</head>', '    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>\n</head>');
    }
    // Add carousel CSS if not present
    if (!html.includes('/* Case Study Carousel */')) {
      const headClose = html.indexOf('</head>');
      if (headClose > 0) {
        html = html.slice(0, headClose) + '<style>' + carouselCSS + '</style>\n' + html.slice(headClose);
      }
    }
    // Add carousel JS init if not present
    if (!html.includes('// Case Study Carousel')) {
      // Insert before the closing </body> tag, inside an existing script block or new one
      const bodyClose = html.lastIndexOf('</body>');
      if (bodyClose > 0) {
        html = html.slice(0, bodyClose) + '    <script>\n        document.addEventListener(\'DOMContentLoaded\', function () {' + carouselJS + '\n        });\n    </script>\n' + html.slice(bodyClose);
      }
    }
  }

  fs.writeFileSync(filePath, html);
  console.log('  ✓ ' + serviceKey + ' → ' + ids.length + ' cards' + (needsSwiper ? ' (carousel)' : ' (grid)'));
}

// ── Run ──────────────────────────────────────────────────────────
const pages = findPages(path.join(ROOT, 'services'));
console.log('Updating case studies sections...\n');
pages.forEach(p => processPage(p));
console.log('\nDone.');
