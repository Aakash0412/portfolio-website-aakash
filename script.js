/* ============================================================
   Aakash A. — Portfolio Script
   Monochrome Precision edition
   ============================================================ */

/* ---------- SCROLL PROGRESS ---------- */
(function () {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
    };
    window.addEventListener('scroll', update, { passive: true });
})();

/* ---------- HEADER SCROLL STATE ---------- */
(function () {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------- THEME TOGGLE ---------- */
(function () {
    const btn = document.getElementById('themeToggle');
    const root = document.documentElement;
    if (!btn) return;

    const current = root.getAttribute('data-theme') || 'dark';
    btn.textContent = current === 'dark' ? 'Light' : 'Dark';

    btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        btn.textContent = next === 'dark' ? 'Light' : 'Dark';
    });
})();

/* ---------- HAMBURGER / MOBILE NAV ---------- */
(function () {
    const btn = document.getElementById('hamburger');
    const nav = document.getElementById('mobileNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        const open = btn.classList.toggle('is-open');
        nav.classList.toggle('is-open', open);
        nav.setAttribute('aria-hidden', !open);
        btn.setAttribute('aria-expanded', open);
    });

    nav.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('is-open');
            nav.classList.remove('is-open');
            nav.setAttribute('aria-hidden', 'true');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
})();

/* ---------- SMOOTH SCROLLING (LENIS) ---------- */
(function () {
    if (typeof Lenis === 'undefined') return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Disable smooth scrolling if user prefers reduced motion

    // Initialize Lenis with refined momentum settings
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update anchor links to use lenis for smooth momentum scrolling
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target, { offset: -60 }); // offset for header
        });
    });

    // Also update Command Palette scrolling
    window.__lenis = lenis; // Expose globally for palette if needed
})();

/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
(function () {
    const links = document.querySelectorAll('.nav-link[data-section]');
    if (!links.length) return;

    const sections = Array.from(links).map(l => document.getElementById(l.dataset.section)).filter(Boolean);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                links.forEach(l => l.classList.toggle('is-active', l.dataset.section === id));
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));

    // Clear active states when at the very top (Hero section)
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight * 0.3) {
            links.forEach(l => l.classList.remove('is-active'));
        }
    }, { passive: true });
})();

/* ---------- REVEAL ON SCROLL ---------- */
(function () {
    const elements = document.querySelectorAll('.reveal-fade');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
})();

/* ---------- ROLE CYCLER ---------- */
(function () {
    const items = document.querySelectorAll('.role-item');
    if (!items.length) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Pause cycler if user prefers reduced motion

    let current = 0;

    function next() {
        items[current].classList.remove('is-active');
        items[current].classList.add('is-leaving');

        const prev = current;
        current = (current + 1) % items.length;

        items[current].classList.add('is-active');

        setTimeout(() => {
            items[prev].classList.remove('is-leaving');
        }, 500);
    }

    setInterval(next, 2800);
})();

/* ---------- COMMAND PALETTE ---------- */
(function () {
    const overlay = document.getElementById('paletteOverlay');
    const input = document.getElementById('paletteInput');
    const resultsEl = document.getElementById('paletteResults');
    const cmdBtn = document.getElementById('cmdBtn');
    if (!overlay || !input) return;

    const ALL_ITEMS = Array.from(resultsEl.querySelectorAll('.palette-item')).map(btn => ({
        el: btn,
        text: btn.textContent.trim().toLowerCase(),
        action: btn.dataset.action,
        target: btn.dataset.target,
    }));

    function open() {
        overlay.classList.add('is-open');
        setTimeout(() => input.focus(), 50);
    }
    function close() {
        overlay.classList.remove('is-open');
        input.value = '';
        filterItems('');
    }

    function filterItems(q) {
        const term = q.toLowerCase().trim();
        let firstVisible = null;
        ALL_ITEMS.forEach(item => {
            const match = !term || item.text.includes(term);
            item.el.style.display = match ? '' : 'none';
            item.el.classList.remove('is-focused');
            if (match && !firstVisible) firstVisible = item;
        });
        if (firstVisible) firstVisible.el.classList.add('is-focused');
    }

    function run(action, target) {
        close();
        if (action === 'scroll') {
            const el = document.getElementById(target);
            if (el) {
                if (window.__lenis) {
                    window.__lenis.scrollTo(el, { offset: -60 });
                } else {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else if (action === 'copy') {
            const textToCopy = target === 'email' ? window.__contactEmail : target;
            navigator.clipboard.writeText(textToCopy).catch(() => {});
        } else if (action === 'open') {
            window.open(target, '_blank', 'noopener');
        }
    }

    // wire buttons
    ALL_ITEMS.forEach(item => {
        item.el.addEventListener('click', () => run(item.action, item.target));
    });

    input.addEventListener('input', () => filterItems(input.value));

    // ⌘K / Ctrl+K and Arrow Keys
    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            overlay.classList.contains('is-open') ? close() : open();
            return;
        }
        
        if (!overlay.classList.contains('is-open')) return;
        
        if (e.key === 'Escape') {
            close();
            return;
        }
        
        const visibleItems = ALL_ITEMS.filter(item => item.el.style.display !== 'none');
        if (!visibleItems.length) return;
        
        const currentIndex = visibleItems.findIndex(item => item.el.classList.contains('is-focused'));
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
            visibleItems.forEach(item => item.el.classList.remove('is-focused'));
            visibleItems[nextIndex].el.classList.add('is-focused');
            visibleItems[nextIndex].el.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
            visibleItems.forEach(item => item.el.classList.remove('is-focused'));
            visibleItems[prevIndex].el.classList.add('is-focused');
            visibleItems[prevIndex].el.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentIndex !== -1) {
                run(visibleItems[currentIndex].action, visibleItems[currentIndex].target);
            }
        }
    });

    // click outside
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    if (cmdBtn) cmdBtn.addEventListener('click', () => overlay.classList.contains('is-open') ? close() : open());
})();

/* ---------- PROJECT FILTER ---------- */
(function () {
    const btns = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.project-row');
    if (!btns.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
            btn.classList.add('is-active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;
            rows.forEach(row => {
                const match = filter === 'all' || row.dataset.category === filter;
                row.classList.toggle('is-hidden', !match);
            });
        });
    });
})();

/* ---------- CONTACT FORM ---------- */
(function () {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submit = document.getElementById('formSubmit');
    if (!form || !status || !submit) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        submit.disabled = true;
        submit.textContent = 'Sending…';
        status.textContent = '';
        status.className = 'form-status';

        try {
            const data = new FormData(form);
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });

            if (res.ok) {
                form.reset();
                status.textContent = 'Message sent — I\'ll get back to you shortly.';
                status.classList.add('is-success');
                submit.textContent = 'Sent ✓';
                setTimeout(() => {
                    submit.disabled = false;
                    submit.textContent = 'Send message';
                    status.textContent = '';
                    status.className = 'form-status';
                }, 5000);
            } else {
                throw new Error('Server error');
            }
        } catch {
            status.textContent = 'Something went wrong. Email me directly at aakashayy04@gmail.com.';
            status.classList.add('is-error');
            submit.disabled = false;
            submit.textContent = 'Send message';
        }
    });
})();

/* ---------- EMAIL OBFUSCATION ---------- */
(function() {
    // Reconstruct email dynamically
    const p1 = 'aakashayy04';
    const p2 = 'gmail.com';
    const email = p1 + '@' + p2;
    
    // Update contact display
    const emailDisplay = document.getElementById('contactEmailDisplay');
    if (emailDisplay) emailDisplay.textContent = email;
    
    // Update footer link
    const footerLink = document.getElementById('footerEmailLink');
    if (footerLink) footerLink.href = 'mailto:' + email;
    
    // Expose for Command Palette copy action
    window.__contactEmail = email;
    
    // Contact copy button
    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(email).then(() => {
                copyBtn.textContent = 'Copied';
                setTimeout(() => copyBtn.textContent = 'Copy', 2000);
            });
        });
    }
})();

