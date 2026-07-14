// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Preloader Animation
    const preloader = document.getElementById("preloader");
    const items = gsap.utils.toArray(".preloader-stage .word");
    const iconItem = document.getElementById("word-4"); // The GIF icon
    
    // Simple check if we are on the homepage (adjust if needed for your routing)
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || (window.location.pathname.includes('chimpzlab') && !window.location.pathname.includes('services'));
    const hasSeenPreloader = sessionStorage.getItem("preloaderDone");

    if (preloader) {
        if (isHomePage && !hasSeenPreloader) {
            // Full animation for first visit on home page
            sessionStorage.setItem("preloaderDone", "true");
            
            const tlPreloader = gsap.timeline({
                onComplete: () => {
                    gsap.to(preloader, {
                        yPercent: -100, duration: 0.8, ease: "power4.inOut",
                        onComplete: () => {
                            preloader.style.display = "none";
                            initHeroAnimations();
                        }
                    });
                }
            });

            gsap.set(items, { opacity: 0, y: 20 });

            items.forEach((item, i) => {
                const holdDuration = item.classList.contains("preloader-icon") ? 0.4 : 0.15;
                tlPreloader
                    .to(item, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" })
                    .to(item, { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" }, `+=${holdDuration}`);
            });
        } else {
            // Subsequent visits or service pages: Short animation (only GIF)
            items.forEach(item => {
                if (item !== iconItem) {
                    item.style.display = 'none';
                }
            });
            
            if (iconItem) {
                gsap.set(iconItem, { opacity: 1, y: 0, display: "block", margin: "0 auto" });
            }
            
            // Just show GIF briefly as a loader
            gsap.to(preloader, {
                yPercent: -100, duration: 0.6, ease: "power4.inOut", delay: 0.3,
                onComplete: () => {
                    preloader.style.display = "none";
                    initHeroAnimations();
                }
            });
        }
    } else {
        initHeroAnimations();
    }

    // Hero Animations
    function initHeroAnimations() {
        const tlHero = gsap.timeline();
        
        tlHero.fromTo(".hero-content .badge",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
        )
        .fromTo(".hero-title",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.5"
        )
        .fromTo(".hero-desc",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
        )
        .fromTo(".hero-actions button",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.4"
        )
        .fromTo(".stat-item",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
            "-=0.2"
        );

        // Interactive Background Blurs in Hero
        const heroSection = document.querySelector(".hero-section");
        const pinkBlur = document.querySelector(".pink-blur");
        const purpleBlur = document.querySelector(".purple-blur");

        if (heroSection && pinkBlur && purpleBlur) {
            // Set up the blurs to be centered around their transform point
            gsap.set([pinkBlur, purpleBlur], { xPercent: -50, yPercent: -50 });
            let isHovering = false;
            let isMouseFrozen = false;
            let mouseIdleTimer;

            function animateIdle() {
                // Do not animate if hovering and mouse is NOT frozen
                if (isHovering && !isMouseFrozen) return;

                const rect = heroSection.getBoundingClientRect();
                
                // Pick a shared central target to ensure they don't separate completely
                const baseX = Math.random() * rect.width;
                const baseY = Math.random() * rect.height;
                
                const dur = gsap.utils.random(4, 7);

                gsap.to(pinkBlur, {
                    x: baseX,
                    y: baseY,
                    duration: dur,
                    ease: "sine.inOut",
                    overwrite: "auto",
                    onComplete: animateIdle // Loop it
                });

                gsap.to(purpleBlur, {
                    x: baseX + (Math.random() * 200 - 100), // Slightly offset
                    y: baseY + (Math.random() * 200 - 100),
                    duration: dur + gsap.utils.random(0.5, 1.5),
                    ease: "sine.inOut",
                    overwrite: "auto"
                });
            }

            // Start idle animations initially
            animateIdle();

            function startMouseIdleTimer() {
                clearTimeout(mouseIdleTimer);
                mouseIdleTimer = setTimeout(() => {
                    isMouseFrozen = true;
                    animateIdle();
                }, 2000); // 2 seconds of freeze before floating again
            }

            heroSection.addEventListener("mousemove", (e) => {
                isHovering = true;
                
                if (isMouseFrozen) {
                    isMouseFrozen = false;
                }
                
                startMouseIdleTimer();

                const rect = heroSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Move the pink blur exactly to cursor
                gsap.to(pinkBlur, {
                    x: x,
                    y: y,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                // Move the purple blur with a slight delay/different duration
                gsap.to(purpleBlur, {
                    x: x + 100, // slightly offset to create a mixing effect
                    y: y + 50,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });

            heroSection.addEventListener("mouseleave", () => {
                isHovering = false;
                isMouseFrozen = false;
                clearTimeout(mouseIdleTimer);
                animateIdle();
            });
        }
    }

    // Philosophy Cards (Right side smooth reveal)
    gsap.utils.toArray(".phil-card").forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Philosophy Divider Progress Animation
    const philSection = document.querySelector('.philosophy-section');
    const philProgress = document.querySelector('.philosophy-progress');
    
    if (philSection && philProgress) {
        gsap.to(philProgress, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: philSection,
                start: "top 20%",
                end: "bottom 80%",
                scrub: true
            }
        });
    }

    // Video Section Scale (Keep more margin from sides)
    const videoWrapper = document.querySelector('.video-wrapper');

    if (videoWrapper) {
        ScrollTrigger.create({
            trigger: ".video-section",
            start: "top 80%",
            end: "center center",
            scrub: true,
            animation: gsap.to(videoWrapper, {
                maxWidth: "calc(100vw - 80px)",
                width: "calc(100vw - 80px)",
                borderRadius: "32px",
                ease: "none"
            })
        });
    }

    // Gradient Blurs Parallax
    gsap.utils.toArray(".gradient-blur").forEach(blur => {
        gsap.to(blur, {
            y: 100,
            ease: "none",
            scrollTrigger: {
                trigger: blur.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });
    });

    // Header Background Blur on Scroll - Removed as per user request to keep it clear consistently

    // Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if(header) {
            header.addEventListener('click', () => {
                // Close others
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current
                item.classList.toggle('active');
            });
        }
    });

    // Vertical Ticker Animation
    const tickerVertical = document.querySelector(".ticker-vertical-anim");
    if (tickerVertical) {
        gsap.to(tickerVertical, {
            yPercent: -50,
            ease: "none",
            duration: 10,
            repeat: -1
        });
    }

    // Stacked Section Push Reveal for Strategic Alliances
    const alliancesSection = document.querySelector(".alliances-section");
    const scheduleSection = document.querySelector(".schedule-section");
    
    if (alliancesSection && scheduleSection) {
        // Pin the alliances section and make it move down slightly
        ScrollTrigger.create({
            trigger: alliancesSection,
            start: "top top",
            pin: true,
            pinSpacing: false
        });

        gsap.to(alliancesSection.firstElementChild, {
            yPercent: 20, // moves inner content down while section stays pinned
            ease: "none",
            scrollTrigger: {
                trigger: scheduleSection,
                start: "top bottom",
                end: "top top",
                scrub: true
            }
        });
    }

    // ===== Mobile Offcanvas Navigation =====
    // Build the mobile menu dynamically from each page's existing desktop nav,
    // so links (with correct relative paths) work on every page without
    // hard-coding markup into all 46 HTML files.
    const navEl = document.querySelector('nav');
    const hamburgerBtn = navEl ? navEl.querySelector('button') : null;

    if (navEl && hamburgerBtn) {
        const megaLinks = Array.from(document.querySelectorAll('nav .mega-menu-grid a')).map(a => {
            const t = a.querySelector('.card-title');
            const label = t ? t.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim() : a.textContent.trim();
            return { href: a.href, label };
        });
        const directLinks = Array.from(document.querySelectorAll('nav .nav-pill > a')).map(a => ({
            href: a.href,
            label: a.textContent.trim()
        }));
        const ctaLink = Array.from(document.querySelectorAll('nav a')).find(a => /connect/i.test(a.textContent));

        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.id = 'mobileMenuOverlay';

        const panel = document.createElement('div');
        panel.className = 'mobile-menu-panel';

        let html = '<div class="mobile-menu-head">';
        html += '<a href="' + (document.querySelector('nav a[aria-label="Home"]') ? document.querySelector('nav a[aria-label="Home"]').href : 'index.html') + '" class="mobile-menu-logo">CHIMPZLAB</a>';
        html += '<button type="button" class="mobile-menu-close" aria-label="Close menu">&times;</button>';
        html += '</div>';

        html += '<nav class="mobile-menu-nav">';
        html += '<div class="mobile-menu-group">';
        html += '<button type="button" class="mobile-menu-toggle">Services <span class="chev">+</span></button>';
        html += '<div class="mobile-submenu">';
        megaLinks.forEach(l => { html += '<a href="' + l.href + '" class="mobile-submenu-link">' + l.label + '</a>'; });
        html += '</div></div>';

        directLinks.forEach(l => { html += '<a href="' + l.href + '" class="mobile-menu-link">' + l.label + '</a>'; });
        html += '<a href="' + (ctaLink ? ctaLink.href : 'index.html#contact') + '" class="mobile-menu-cta">Let\'s Connect</a>';
        html += '</nav>';

        panel.innerHTML = html;
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        const openMenu = () => {
            overlay.classList.add('open');
            document.body.classList.add('menu-open');
            hamburgerBtn.classList.add('is-active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        };
        const closeMenu = () => {
            overlay.classList.remove('open');
            document.body.classList.remove('menu-open');
            hamburgerBtn.classList.remove('is-active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        };

        hamburgerBtn.addEventListener('click', () => {
            overlay.classList.contains('open') ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeMenu();
            if (e.target.closest('a')) closeMenu();
        });

        const closeBtn = panel.querySelector('.mobile-menu-close');
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);

        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

        const svcToggle = panel.querySelector('.mobile-menu-toggle');
        if (svcToggle) {
            svcToggle.addEventListener('click', () => {
                const group = svcToggle.parentElement;
                const isOpen = group.classList.toggle('open');
                svcToggle.querySelector('.chev').textContent = isOpen ? '−' : '+';
            });
        }
    }
});

// About Page Practice Cards Slide-In
document.addEventListener("DOMContentLoaded", () => {
    const practiceCards = document.querySelectorAll('.practice-card');
    if (practiceCards.length > 0) {
        gsap.from(practiceCards, {
            scrollTrigger: {
                trigger: ".practices-grid",
                start: "top 80%",
            },
            x: -100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
});
// About Page Video Expansion
document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById('expanding-video');
    if (videoContainer) {
        gsap.to(videoContainer, {
            width: '100%',
            height: '80vh',
            borderRadius: '0px',
            scrollTrigger: {
                trigger: ".about-video-section",
                start: "top 60%",
                end: "top top",
                scrub: 1
            }
        });
    }
});
