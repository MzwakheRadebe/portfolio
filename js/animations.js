'use strict';

/*
 * animations.js — Global animation and navigation behaviour
 * ==========================================================
 * This file runs on EVERY page. It handles:
 *   1. Load reveals   — elements that fade in when the page first loads
 *   2. Scroll reveals — elements that animate in as you scroll down
 *   3. Staggered grid — project cards that animate in one after another
 *   4. Nav scroll     — adds a background to the nav bar when you scroll
 *   5. Active nav link — highlights the correct nav link for the current page
 *   6. Mobile nav     — hamburger menu open/close
 *
 * HOW TO ANIMATE A NEW ELEMENT
 * ─────────────────────────────
 * Scroll reveal (fades in when scrolled into view):
 *   Add class="reveal" to any HTML element.
 *   It will animate in automatically — no JS needed.
 *
 * Load reveal (animates in on page load, staggered by order):
 *   Add data-load-reveal to any HTML element.
 *   Used for hero section elements that should appear immediately.
 *
 * Staggered grid (cards animate in one by one):
 *   Add data-stagger to the parent container.
 *   Add data-stagger-child to each child card/item inside it.
 */

/* Detects if the user has turned on "reduce motion" in their OS settings.
   If true, all animations are skipped out of respect for accessibility. */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 1. Load reveals ─────────────────────────────────────────
   Fades in elements tagged [data-load-reveal] as soon as the
   page loads. Each element staggers slightly after the previous
   one (0.1s per element) for a cascade effect.
   Used on: hero headings, hero CTA button.               */
function initLoadReveals() {
  if (prefersReducedMotion) return;

  const targets = document.querySelectorAll('[data-load-reveal]');
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s,
                           transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`;

    /* Double rAF ensures the browser has painted the initial hidden state
       before triggering the transition — without this the animation is skipped. */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
}

/* ── 2. Scroll reveals ───────────────────────────────────────
   Uses IntersectionObserver to watch elements with class="reveal".
   When an element enters the viewport, "is-visible" is added
   which triggers the CSS transition defined in main.css.
   The observer then stops watching that element (unobserve)
   so it only animates once, not every time you scroll past it. */
function initScrollReveals() {
  if (prefersReducedMotion) {
    /* Skip animation entirely — make everything visible immediately */
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); /* animate once only */
        }
      });
    },
    {
      threshold: 0.12,        /* trigger when 12% of element is visible */
      rootMargin: '0px 0px -40px 0px' /* trigger 40px before bottom of viewport */
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── 3. Staggered children ───────────────────────────────────
   Watches containers marked [data-stagger]. When the container
   enters the viewport, each child marked [data-stagger-child]
   gets a progressively longer delay (0.08s per child) so they
   animate in one after another.
   Used on: the projects grid on projects.html.           */
function initStaggeredChildren() {
  if (prefersReducedMotion) return;

  const staggerParents = document.querySelectorAll('[data-stagger]');

  const parentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const children = entry.target.querySelectorAll('[data-stagger-child]');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.08}s`;
          child.classList.add('is-visible');
        });
        parentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  staggerParents.forEach(el => parentObserver.observe(el));
}

/* ── 4. Nav scroll behaviour ─────────────────────────────────
   Adds class "scrolled" to the <nav> once the user scrolls
   more than 20px. The CSS uses this to add a background blur
   effect so the nav stays readable over page content.     */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };

  /* passive: true tells the browser this listener won't call preventDefault,
     allowing it to optimise scrolling performance */
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* run once on load in case page starts scrolled */
}

/* ── 5. Active nav link ──────────────────────────────────────
   Reads the current page filename from the URL and adds
   aria-current="page" to the matching nav link.
   CSS uses [aria-current="page"] to show the underline indicator.
   No changes needed here when you add new pages — it's automatic. */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ── 6. Mobile nav drawer ────────────────────────────────────
   Handles the hamburger menu button on small screens.
   Clicking the burger opens the drawer (slide-in panel).
   Clicking any link inside the drawer closes it automatically.
   body overflow is set to hidden while open to prevent
   background scroll on mobile.                           */
function initMobileNav() {
  const burger = document.querySelector('.nav__burger');
  const drawer = document.querySelector('.nav__drawer');
  if (!burger || !drawer) return;

  burger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close drawer when any nav link is clicked */
  drawer.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ── Init — runs all functions once the DOM is ready ─────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoadReveals();
  initScrollReveals();
  initStaggeredChildren();
  initNavScroll();
  initActiveNavLink();
  initMobileNav();
});
