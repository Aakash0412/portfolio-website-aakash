/* ============================================================
   PORTFOLIO SCRIPT v2.0 — Premium Interactions
   ============================================================ */

'use strict';

/* ==================== PRELOADER ==================== */
(function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progress  = document.getElementById('preloaderProgress');
    const pctEl     = document.getElementById('preloaderPct');
    if (!preloader) return;

    let current = 0;
    const target = 100;
    const duration = 1400; // ms
    const startTime = performance.now();

    function tick(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        current = Math.round(eased * target);

        if (progress) progress.style.width = current + '%';
        if (pctEl)    pctEl.textContent = current + '%';

        if (t < 1) {
            requestAnimationFrame(tick);
        } else {
            setTimeout(hidePreloader, 350);
        }
    }

    requestAnimationFrame(tick);

    function hidePreloader() {
        preloader.classList.add('hide');
        document.body.classList.remove('is-loading');
        // Trigger hero animations after preloader
        setTimeout(initHeroAnimations, 100);
    }

    // Failsafe: always hide after 3s
    setTimeout(() => {
        if (!preloader.classList.contains('hide')) {
            preloader.classList.add('hide');
            document.body.classList.remove('is-loading');
            setTimeout(initHeroAnimations, 100);
        }
    }, 3000);
})();

/* ==================== HERO LETTER ANIMATIONS ==================== */
function initHeroAnimations() {
    // Hero stat counters
    document.querySelectorAll('.hero-stat-value[data-count]').forEach(el => {
        animateCounter(el);
    });
    // Role cycler
    initRoleCycler();
}

/* ==================== ANIMATED COUNTER ==================== */
function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix   || '';
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 1800;
    const startTime = performance.now();
    const start = 0;

    function tick(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4); // ease-out quart
        const value = start + (target - start) * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

/* ==================== ROLE CYCLER ==================== */
function initRoleCycler() {
    const items = document.querySelectorAll('.role-item');
    if (!items.length) return;

    let current = 0;

    function cycle() {
        const prev = items[current];
        current = (current + 1) % items.length;
        const next = items[current];

        prev.classList.add('exit');
        prev.classList.remove('active');

        setTimeout(() => {
            prev.classList.remove('exit');
        }, 420);

        setTimeout(() => {
            next.classList.add('active');
        }, 80);
    }

    setInterval(cycle, 2800);
}

/* ==================== SCROLL PROGRESS ==================== */
(function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrollTop / docHeight * 100) + '%';
    }, { passive: true });
})();

/* ==================== NAVBAR SCROLL STATE ==================== */
(function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();

/* ==================== HAMBURGER MENU ==================== */
(function initHamburger() {
    const btn   = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            btn.classList.remove('open');
            links.classList.remove('open');
        });
    });
})();

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ==================== CURSOR GLOW ==================== */
(function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.matchMedia('(hover: none)').matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
        tx = e.clientX;
        ty = e.clientY;
    });

    (function animGlow() {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        glow.style.left = cx + 'px';
        glow.style.top  = cy + 'px';
        requestAnimationFrame(animGlow);
    })();
})();

/* ==================== CUSTOM CURSOR ==================== */
(function initCursor() {
    const dot      = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');
    if (!dot || !follower || window.matchMedia('(hover: none)').matches) return;

    let mx = -100, my = -100;
    let fx = -100, fy = -100;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    (function animFollower() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        follower.style.left = fx + 'px';
        follower.style.top  = fy + 'px';
        requestAnimationFrame(animFollower);
    })();

    // Hover state
    document.querySelectorAll('a, button, .btn, .skill-bento-tile, .project-card, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
})();

/* ==================== MAGNETIC BUTTONS ==================== */
(function initMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.btn-magnetic').forEach(btn => {
        const strength = 0.35;

        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top  + rect.height / 2;
            const dx = (e.clientX - cx) * strength;
            const dy = (e.clientY - cy) * strength;
            btn.style.setProperty('--mx', dx + 'px');
            btn.style.setProperty('--my', dy + 'px');
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.setProperty('--mx', '0px');
            btn.style.setProperty('--my', '0px');
        });
    });
})();

/* ==================== SKILL TILE 3D TILT ==================== */
(function initTiltEffect() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.skill-bento-tile').forEach(tile => {
        const MAX_TILT = 10; // degrees

        tile.addEventListener('mousemove', e => {
            const rect = tile.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            const ry =  x * MAX_TILT;
            const rx = -y * MAX_TILT;
            tile.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px) scale(1.01)`;
        });

        tile.addEventListener('mouseleave', () => {
            tile.style.transform = '';
        });
    });
})();

/* ==================== REVEAL ON SCROLL ==================== */
(function initRevealObserver() {
    const items = document.querySelectorAll('.reveal-up');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(el => observer.observe(el));
})();

/* ==================== PROCESS TIMELINE DRAW ==================== */
(function initTimelineLineDraw() {
    const section = document.getElementById('process');
    const fill    = document.getElementById('processLineFill');
    const steps   = document.querySelectorAll('.process-step');
    if (!section || !fill) return;

    function updateLine() {
        const rect = section.getBoundingClientRect();
        const sectionH = section.offsetHeight;
        const viewH    = window.innerHeight;

        // How far we've scrolled into this section
        const scrolled = Math.max(0, viewH * 0.7 - rect.top);
        const progress = Math.min(1, scrolled / (sectionH * 0.85));
        fill.style.height = (progress * 100) + '%';

        // Activate steps
        steps.forEach((step, i) => {
            const stepRect = step.getBoundingClientRect();
            if (stepRect.top < viewH * 0.75) {
                step.classList.add('is-visible');
            }
        });
    }

    window.addEventListener('scroll', updateLine, { passive: true });
    updateLine();
})();

/* ==================== SECTION DOTS NAVIGATION ==================== */
(function initSectionDots() {
    const dots    = document.querySelectorAll('.sdot');
    const sections = document.querySelectorAll('section[id]');
    if (!dots.length) return;

    // Map dot order to sections
    function updateActiveDot() {
        const scrollY = window.scrollY + window.innerHeight * 0.4;
        let active = 0;
        sections.forEach((sec, i) => {
            if (sec.offsetTop <= scrollY) active = i;
        });
        dots.forEach((d, i) => d.classList.toggle('active', i === active));
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (sections[i]) sections[i].scrollIntoView({ behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', updateActiveDot, { passive: true });
    updateActiveDot();
})();

/* ==================== ACTIVE NAV LINK ==================== */
(function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('section[id]');

    function updateActive() {
        const scrollY = window.scrollY + 120;
        let current = '';
        sections.forEach(sec => {
            if (sec.offsetTop <= scrollY) current = sec.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();

/* ==================== SCROLL TO TOP BUTTON ==================== */
(function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ==================== PROJECT HORIZONTAL TRACK ==================== */
(function initProjectTrack() {
    const track   = document.getElementById('projectsTrack');
    const prevBtn = document.getElementById('trackPrev');
    const nextBtn = document.getElementById('trackNext');
    const dots    = document.querySelectorAll('.track-dot');
    if (!track) return;

    // Drag to scroll
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    track.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollStart = track.scrollLeft;
        track.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', e => {
        if (!isDown) return;
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.2;
        track.scrollLeft = scrollStart - walk;
        updateDots();
    });

    document.addEventListener('mouseup', () => { isDown = false; track.style.userSelect = ''; });

    // Touch support
    let touchStart = 0;
    track.addEventListener('touchstart', e => {
        touchStart = e.touches[0].pageX;
        scrollStart = track.scrollLeft;
    }, { passive: true });

    track.addEventListener('touchmove', e => {
        const x = e.touches[0].pageX;
        track.scrollLeft = scrollStart - (x - touchStart);
        updateDots();
    }, { passive: true });

    // Arrow buttons
    function getCardWidth() {
        const card = track.querySelector('.project-card');
        return card ? card.offsetWidth + 20 : 380;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
        setTimeout(updateDots, 400);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
        setTimeout(updateDots, 400);
    });

    // Dot sync
    function updateDots() {
        const cardW = getCardWidth();
        const idx   = Math.round(track.scrollLeft / cardW);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            track.scrollTo({ left: i * getCardWidth(), behavior: 'smooth' });
            setTimeout(updateDots, 400);
        });
    });

    track.addEventListener('scroll', updateDots, { passive: true });
})();

/* ==================== PROJECT FILTER TABS ==================== */
(function initProjectFilters() {
    const filters = document.querySelectorAll('.project-filter');
    const cards   = document.querySelectorAll('.project-card');
    if (!filters.length) return;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
            btn.classList.add('is-active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity    = match ? '1' : '0.25';
                card.style.transform  = match ? '' : 'scale(0.97)';
            });
        });
    });
})();

/* ==================== COMMAND PALETTE ==================== */
(function initCmdPalette() {
    const overlay = document.getElementById('cmdPaletteOverlay');
    const input   = document.getElementById('cmdInput');
    const items   = document.querySelectorAll('.cmd-item');
    if (!overlay) return;

    function open() {
        overlay.classList.add('open');
        if (input) { input.value = ''; setTimeout(() => input.focus(), 50); }
    }

    function close() {
        overlay.classList.remove('open');
    }

    // Keyboard shortcut
    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            overlay.classList.contains('open') ? close() : open();
        }
        if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    // Item search filter
    if (input) {
        input.addEventListener('input', () => {
            const q = input.value.toLowerCase();
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(q) ? '' : 'none';
            });
        });
    }

    // Keyboard navigation in palette
    let selectedIndex = -1;
    const visibleItems = () => [...items].filter(i => i.style.display !== 'none');

    if (input) {
        input.addEventListener('keydown', e => {
            const visible = visibleItems();
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, visible.length - 1);
                visible.forEach((it, i) => it.classList.toggle('selected', i === selectedIndex));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                visible.forEach((it, i) => it.classList.toggle('selected', i === selectedIndex));
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && visible[selectedIndex]) {
                    visible[selectedIndex].click();
                }
            }
        });
    }

    // Action handlers
    items.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            const target = item.dataset.target;

            if (action === 'navigate' && target) {
                const el = document.querySelector(target);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'theme') {
                document.documentElement.dataset.theme =
                    document.documentElement.dataset.theme === 'light' ? '' : 'light';
            } else if (action === 'copy-email') {
                navigator.clipboard.writeText('aakashayy04@gmail.com');
            } else if (action === 'resume') {
                const a = document.createElement('a');
                a.href = 'aakash-resume.pdf';
                a.download = '';
                a.click();
            }
            close();
        });
    });
})();

/* ==================== THEME TOGGLE ==================== */
(function initTheme() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const saved = localStorage.getItem('theme') || '';
    if (saved) document.documentElement.dataset.theme = saved;

    btn.addEventListener('click', () => {
        const isLight = document.documentElement.dataset.theme === 'light';
        document.documentElement.dataset.theme = isLight ? '' : 'light';
        localStorage.setItem('theme', document.documentElement.dataset.theme);
    });
})();

/* ==================== HERO PARTICLES CANVAS ==================== */
(function initParticles() {
    const canvas = document.getElementById('hero-particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles;
    const COUNT = 60;

    function resize() {
        const hero = canvas.closest('.hero');
        W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
        H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    }

    function createParticle() {
        return {
            x:    Math.random() * W,
            y:    Math.random() * H,
            r:    Math.random() * 1.5 + 0.3,
            vx:   (Math.random() - 0.5) * 0.25,
            vy:   (Math.random() - 0.5) * 0.25,
            a:    Math.random() * 0.5 + 0.1,
            da:   (Math.random() - 0.5) * 0.003,
        };
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, createParticle);
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.a = Math.max(0.05, Math.min(0.65, p.a + p.da));

            if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
                Object.assign(p, createParticle(), { x: Math.random() * W, y: Math.random() * H });
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(66, 153, 255, ${p.a})`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(66, 153, 255, ${(1 - dist / 100) * 0.06})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); }, { passive: true });
    init();
    draw();
})();

/* ==================== COOKIE BANNER ==================== */
(function initCookie() {
    const banner  = document.getElementById('cookieBanner');
    const accept  = document.getElementById('cookieAccept');
    const decline = document.getElementById('cookieDecline');
    if (!banner) return;

    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => banner.classList.add('show'), 2500);
    }

    if (accept) accept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.classList.remove('show');
    });

    if (decline) decline.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.classList.remove('show');
    });
})();

/* ==================== RIPPLE EFFECT ON BUTTONS ==================== */
(function initRipple() {
    document.querySelectorAll('.btn, .form-submit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect   = this.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height);
            const x      = e.clientX - rect.left - size / 2;
            const y      = e.clientY - rect.top  - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
        });
    });
})();

/* ==================== CONTACT FORM ==================== */
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = form.querySelector('.form-submit');
        const origText  = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Sending…';
        submitBtn.disabled = true;

        try {
            const data = new FormData(form);
            const res  = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                submitBtn.innerHTML = '✓ Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #34d399, #059669)';
                form.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = origText;
                    submitBtn.disabled  = false;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                throw new Error('Server error');
            }
        } catch {
            submitBtn.innerHTML = 'Error. Try emailing directly.';
            setTimeout(() => {
                submitBtn.innerHTML = origText;
                submitBtn.disabled  = false;
            }, 3000);
        }
    });
})();

/* ==================== STAGGER TEXT REVEAL ==================== */
(function initStaggerReveal() {
    const headings = document.querySelectorAll('.section-title-left h2, .section-title-left');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    headings.forEach(h => observer.observe(h));
})();

/* ==================== SCROLL-TRIGGERED STAT COUNTERS ==================== */
(function initScrollCounters() {
    const counters = document.querySelectorAll('.hero-stat-value[data-count]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
})();

/* ==================== GLASS CARD PARALLAX GLOW ==================== */
(function initCardGlow() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.glass-card, .skill-bento-tile').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
            const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
            card.style.setProperty('--mx-pct', x + '%');
            card.style.setProperty('--my-pct', y + '%');
        });
    });
})();

/* ==================== SCRAMBLE EFFECT (KEPT FOR COMPATIBILITY) ==================== */
const rotatingWords = ['Intelligence', 'Innovation', 'Solutions', 'Excellence'];
let currentWordIndex = 0;
const rotatingTextElement = document.getElementById('rotatingText');
const scrambleChars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = scrambleChars;
        this.frameRequest = null;
    }

    setText(newText) {
        if (!this.el) return Promise.resolve();
        const oldText = this.el.textContent;
        const length  = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to   = newText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end   = start + Math.floor(Math.random() * 20);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '', complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) { complete++; output += to; }
            else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += char;
            } else { output += from; }
        }
        if (this.el) this.el.textContent = output;
        if (complete === this.queue.length) { this.resolve(); }
        else {
            this.frameRequest = requestAnimationFrame(() => this.update());
            this.frame++;
        }
    }
}

if (rotatingTextElement) {
    const scrambler = new TextScramble(rotatingTextElement);
    function cycleScramble() {
        scrambler.setText(rotatingWords[currentWordIndex]).then(() => {
            setTimeout(() => {
                currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
                cycleScramble();
            }, 2500);
        });
    }
    setTimeout(cycleScramble, 1000);
}
