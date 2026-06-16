(function () {

    // ========================
    // SCROLL ANIMATIONS (.animate-on-scroll)
    // ========================
    const animatedEls = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));

    // Fire hero immediately (already in viewport)
    document.querySelectorAll('.home-section .animate-on-scroll').forEach(el => {
        el.classList.add('visible');
    });

    // ========================
    // MOBILE MENU
    // ========================
    const menuToggle = document.getElementById('menuToggle');
    const navRight = document.getElementById('navRight');
    let isMenuOpen = false;

    function closeMenu() {
        if (navRight.classList.contains('open')) {
            navRight.classList.remove('open');
            isMenuOpen = false;
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        }
    }

    function toggleMenu() {
        if (navRight.classList.contains('open')) {
            closeMenu();
        } else {
            navRight.classList.add('open');
            isMenuOpen = true;
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'true');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-times';
            }
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 860) {
                closeMenu();
            }
            const href = link.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.getElementById(href.substring(1));
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const signupButton = document.getElementById('signupBtn');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            alert('🚀 Sign-up feature coming soon!');
            if (window.innerWidth <= 860) closeMenu();
        });
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 860) {
                closeMenu();
                navRight.style.transform = '';
                navRight.style.opacity = '';
            }
        }, 150);
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navRight.contains(event.target);
        const isClickOnToggle = menuToggle && menuToggle.contains(event.target);
        if (!isClickInsideMenu && !isClickOnToggle && isMenuOpen && window.innerWidth <= 860) {
            closeMenu();
        }
    });

    navRight.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) closeMenu();
    });

    console.log('✅ Nexio ready — animations + mobile menu active.');
})();

// ========================
// PRICING CARDS — scroll animation
// ========================
const cards = document.querySelectorAll('.plan-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

cards.forEach(card => cardObserver.observe(card));

// ========================
// FAQ — toggle + scroll animation
// ========================
const faqs = document.querySelectorAll('.faq');

// Scroll-in animation (staggered)
const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            faqObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

faqs.forEach(faq => faqObserver.observe(faq));

// Click toggle
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        const isOpen = faq.classList.contains('active');
        // close all others
        faqs.forEach(f => f.classList.remove('active'));
        // open clicked one (unless it was already open)
        if (!isOpen) faq.classList.add('active');
    });
});

// ========================
// FOOTER — scroll animation
// ========================
const footerContent = document.querySelector('.footer-content');

if (footerContent) {
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    footerObserver.observe(footerContent);
}



