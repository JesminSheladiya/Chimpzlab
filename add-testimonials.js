const fs = require('fs');
const path = require('path');

const dirs = [
  'services/creative',
  'services/demand-generation',
  'services/visibility-search',
  'services/digital-experiences',
  'services/reputation-communications',
  'services/casestudy'
];

const skipFiles = new Set([
  'reputation-communications.html',
  'visibility-search.html',
  'creative.html',
  'demand-generation.html',
  'digital-experiences.html',
]);

const testimonialHTML = `
    <!-- Testimonial Carousel Section -->
    <section class="py-32 px-6 md:px-12 bg-[#f5f5f5] text-brand-dark border-t border-gray-200 overflow-hidden">
        <div class="max-w-[950px] mx-auto">
            <div class="flex items-center gap-4 mb-12 gsap-reveal">
                <div class="w-12 h-[1px] bg-gray-300"></div>
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">What Our Clients Say</span>
            </div>

            <div class="relative">
                <button
                    class="testimonial-prev absolute left-0 md:-left-16 bottom-[-40px] md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group z-20"
                    aria-label="Previous testimonial">
                    <svg class="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                        </path>
                    </svg>
                </button>

                <button
                    class="testimonial-next absolute right-0 md:-right-16 bottom-[-40px] md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group z-20"
                    aria-label="Next testimonial">
                    <svg class="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>

                <div class="testimonial-carousel overflow-hidden">
                    <div class="testimonial-track flex transition-transform duration-500 ease-in-out"></div>
                </div>

                <div class="flex items-center justify-center gap-2 mt-4 md:mt-6" id="testimonial-dots"></div>
            </div>
        </div>
    </section>

`;

const testimonialJS = `
        // Testimonial Carousel Logic - Data Driven
        const testimonialTrack = document.querySelector('.testimonial-track');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        const dotsContainer = document.getElementById('testimonial-dots');
        let currentSlide = 0;
        let totalSlides = 0;
        let autoplayInterval;

        function renderTestimonials(data) {
            totalSlides = data.length;

            testimonialTrack.innerHTML = data.map((t, i) => \`
                        <div class="testimonial-slide min-w-full px-2">
                            <div class="bg-white rounded-3xl p-10 md:p-14 relative shadow-sm h-full flex flex-col justify-center">
                                <div class="absolute top-8 right-10 text-[120px] leading-none font-serif text-gray-100 select-none pointer-events-none">"</div>
                                <p class="text-xl md:text-2xl font-medium leading-relaxed text-gray-800 mb-10 relative z-10 italic max-w-[800px]">"\${t.quote}"</p>
                                <div class="flex items-center gap-4 relative z-10 shrink-0">
                                    \${t.image
                                        ? \`<img src="\${t.image}" alt="\${t.author}" class="w-14 h-14 rounded-full object-cover">\`
                                        : \`<div class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg shrink-0">\${t.letter}</div>\`
                                    }
                                    <div>
                                        <p class="font-bold text-base text-brand-dark">\${t.author}</p>
                                        <p class="text-sm text-gray-500">\${t.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            \`).join('');

            dotsContainer.innerHTML = data.map((_, i) => \`
                <button class="testimonial-dot w-2.5 h-2.5 rounded-full \${i === 0 ? 'bg-black' : 'bg-gray-300'} transition-all duration-300"
                    data-index="\${i}" aria-label="Go to slide \${i + 1}"></button>
            \`).join('');

            initCarousel();
        }

        function initCarousel() {
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.testimonial-dot');

            function goToSlide(index) {
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;
                currentSlide = index;
                testimonialTrack.style.transform = \`translateX(-\${currentSlide * 100}%)\`;
                dots.forEach((dot, i) => {
                    dot.classList.toggle('bg-black', i === currentSlide);
                    dot.classList.toggle('bg-gray-300', i !== currentSlide);
                });
            }

            function startAutoplay() {
                autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
            }

            function stopAutoplay() {
                clearInterval(autoplayInterval);
            }

            prevBtn.addEventListener('click', () => {
                stopAutoplay();
                goToSlide(currentSlide - 1);
                startAutoplay();
            });

            nextBtn.addEventListener('click', () => {
                stopAutoplay();
                goToSlide(currentSlide + 1);
                startAutoplay();
            });

            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    stopAutoplay();
                    goToSlide(parseInt(dot.dataset.index));
                    startAutoplay();
                });
            });

            const carouselEl = document.querySelector('.testimonial-carousel');
            let dragStartX = 0;
            let dragDeltaX = 0;
            let isDragging = false;

            function setTransition(v) {
                testimonialTrack.style.transition = v ? 'transform 0.5s ease' : 'none';
            }

            function onDragStart(e) {
                if (e.type === 'mousedown' && e.button !== 0) return;
                isDragging = true;
                dragStartX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                dragDeltaX = 0;
                setTransition(false);
                stopAutoplay();
            }

            function onDragMove(e) {
                if (!isDragging) return;
                const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                dragDeltaX = x - dragStartX;
                const offset = -(currentSlide * 100) + (dragDeltaX / carouselEl.offsetWidth * 100);
                testimonialTrack.style.transform = \`translateX(\${offset}%)\`;
            }

            function onDragEnd() {
                if (!isDragging) return;
                isDragging = false;
                setTransition(true);
                if (dragDeltaX < -50) {
                    goToSlide(currentSlide + 1);
                } else if (dragDeltaX > 50) {
                    goToSlide(currentSlide - 1);
                } else {
                    goToSlide(currentSlide);
                }
                startAutoplay();
            }

            carouselEl.addEventListener('touchstart', onDragStart, { passive: true });
            carouselEl.addEventListener('touchmove', onDragMove, { passive: true });
            carouselEl.addEventListener('touchend', onDragEnd);
            carouselEl.addEventListener('mousedown', onDragStart);
            carouselEl.addEventListener('mousemove', onDragMove);
            carouselEl.addEventListener('mouseup', onDragEnd);
            carouselEl.addEventListener('mouseleave', onDragEnd);

            startAutoplay();
        }

        fetch('../../data/testimonials.json')
            .then(res => res.json())
            .then(renderTestimonials)
            .catch(err => console.error('Failed to load testimonials:', err));
`;

function getHtmlFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function hasContactForm(content) {
  return content.includes('id="booking-form"') || 
         content.includes('id="contact"') || 
         content.includes('Contact / Ready to Get Started') ||
         content.includes('Contact Form Section');
}

function hasFooter(content) {
  return content.includes('<footer');
}

function insertTestimonialSection(content) {
  // First try to find contact form section
  const contactPatterns = [
    /<!-- Contact \/ Ready to Get Started Section -->/,
    /<!-- Contact Form Section -->/,
    /<section[^>]*id="booking-form"/,
    /<section[^>]*id="contact"/,
  ];

  for (const pattern of contactPatterns) {
    const match = content.match(pattern);
    if (match) {
      const idx = match.index;
      // Insert before the contact section
      return content.slice(0, idx) + testimonialHTML + content.slice(idx);
    }
  }

  // If no contact form, find footer and insert before it
  const footerMatch = content.match(/<footer/);
  if (footerMatch) {
    const idx = footerMatch.index;
    return content.slice(0, idx) + testimonialHTML + content.slice(idx);
  }

  // No contact form, no footer - add at end of body
  const bodyEnd = content.lastIndexOf('</body>');
  if (bodyEnd !== -1) {
    return content.slice(0, bodyEnd) + testimonialHTML + content.slice(bodyEnd);
  }

  return content;
}

function insertTestimonialJS(content) {
  // Find the last </script> before footer or at end of body
  // Strategy: find all </script> tags, pick the last one that's before footer or near end
  const scriptEndMatches = [...content.matchAll(/<\/script>/g)];
  if (scriptEndMatches.length === 0) return content;

  // Find footer position
  const footerMatch = content.match(/<footer/);
  const footerPos = footerMatch ? footerMatch.index : content.length;

  // Find the last </script> before footer
  let insertPos = -1;
  for (const match of scriptEndMatches) {
    if (match.index < footerPos) {
      insertPos = match.index + match[0].length;
    }
  }

  // If no script before footer, use the very last </script>
  if (insertPos === -1 && scriptEndMatches.length > 0) {
    const lastMatch = scriptEndMatches[scriptEndMatches.length - 1];
    insertPos = lastMatch.index + lastMatch[0].length;
  }

  if (insertPos === -1) return content;

  return content.slice(0, insertPos) + testimonialJS + content.slice(insertPos);
}

// Main
let total = 0;
let added = 0;
let skipped = 0;

for (const dir of dirs) {
  const fullDir = path.join(__dirname, dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = getHtmlFiles(fullDir);

  for (const file of files) {
    const fileName = path.basename(file);
    if (skipFiles.has(fileName)) {
      console.log(`  ⏭  Skipping (already done): ${file}`);
      skipped++;
      continue;
    }

    total++;
    let content = fs.readFileSync(file, 'utf-8');

    // Check if already has testimonial section
    if (content.includes('What Our Clients Say') || content.includes('testimonial-carousel')) {
      console.log(`  ⏭  Already has testimonials: ${file}`);
      skipped++;
      continue;
    }

    const newContent = insertTestimonialJS(insertTestimonialSection(content));
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      console.log(`  ✅  Added: ${file}`);
      added++;
    } else {
      console.log(`  ❌  Failed to insert: ${file}`);
    }
  }
}

console.log(`\nTotal files: ${total}`);
console.log(`Added testimonials: ${added}`);
console.log(`Skipped (already had): ${skipped}`);