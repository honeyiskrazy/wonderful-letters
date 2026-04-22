/**
 * script.js — Wonderful Letters
 * Production-ready: preloader, scroll animations, smooth UX
 */

(function () {
    'use strict';

    // ─── Preloader ───────────────────────────────────────────────
    const preloader = document.getElementById('preloader');
    const PRELOADER_DURATION = 6000; // 0.5s delay + 3.5s write-to-bold + 0.8s bold + 1.2s hold

    function hidePreloader() {
        if (!preloader) return;
        preloader.classList.add('hidden');
        // Remove from DOM after CSS transition completes
        preloader.addEventListener('transitionend', () => {
            preloader.remove();
        }, { once: true });
        // Fallback removal in case transitionend doesn't fire
        setTimeout(() => {
            if (preloader.parentNode) preloader.remove();
        }, 1200);
    }

    if (preloader) {
        setTimeout(hidePreloader, PRELOADER_DURATION);
    }

    // ─── Scroll Animations ───────────────────────────────────────
    function initScrollAnimations() {
        const els = document.querySelectorAll('.scroll-animate');
        if (!els.length) return;

        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            els.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        els.forEach(el => observer.observe(el));
    }

    // ─── Stagger grid items ──────────────────────────────────────
    function initStagger() {
        const grids = document.querySelectorAll('.product-grid, .how-grid, .reviews-grid');
        grids.forEach(grid => {
            const children = grid.querySelectorAll('.scroll-animate');
            children.forEach((child, i) => {
                child.style.transitionDelay = `${i * 0.07}s`;
            });
        });
    }

    // ─── Smooth scroll for anchor links ─────────────────────────
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function (e) {
                const id = this.getAttribute('href');
                if (id === '#') return;
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    const offset = 70;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    // ─── Navbar shadow on scroll ─────────────────────────────────
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 20
                ? '0 2px 20px rgba(0,0,0,0.07)'
                : 'none';
        }, { passive: true });
    }

    // ─── Init all ────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initStagger();
        initSmoothScroll();
        initNavbar();
    });

})();
