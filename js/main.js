'use strict';

/*
 * main.js — Page-specific interactive behaviour
 * ===============================================
 * This file runs on EVERY page. It handles features that only
 * activate when the relevant elements exist on a given page:
 *
 *   initTerminal()        — about.html  — typed terminal animation
 *   initContactForm()     — contact.html — auto-dismisses success banner
 *   initProjectFilter()   — projects.html — filter buttons (All / Full-stack etc.)
 *   initSmoothScroll()    — all pages — smooth scroll for anchor (#) links
 *   initVideoTabs()       — projects.html — Patient/Staff view tab switcher
 *   initReadmeToggles()   — projects.html — "Project details" expand/collapse
 *
 * Each function checks if its target element exists before doing
 * anything, so it's safe to include on all pages.
 */

/* ── Terminal typing animation (about page) ──────────────────
   The terminal on about.html uses CSS animations to simulate
   typing. This function reads the data-text attribute from each
   .t-type element and sets the animation duration + step count
   to exactly match the number of characters, so the typing
   speed feels consistent regardless of text length.

   TO UPDATE the terminal content:
   — Edit the HTML in about.html directly (inside .terminal__body)
   — Adjust --td (time-delay) CSS custom properties to control
     when each line appears                                    */
function initTerminal() {
  document.querySelectorAll('.t-type').forEach(el => {
    const text = el.dataset.text || '';
    el.style.setProperty('--char-count', text.length);
    const delay = el.style.getPropertyValue('--td') || '0s';
    /* Duration scales with text length so typing speed stays constant */
    el.style.animation = `termType ${Math.max(0.4, text.length * 0.06)}s steps(${text.length}, end) ${delay} forwards`;
  });
}

/* ── Contact form — auto-dismiss success banner ──────────────
   Formspree shows the [data-fs-success] banner by setting its
   display style after a successful submission. This function
   watches for that change using a MutationObserver, then:
     1. Waits 4 seconds (so the user has time to read it)
     2. Fades it out over 0.6s (CSS transition via .is-fading)
     3. Hides it completely so it doesn't take up space

   The actual form submission, validation, and email delivery
   are all handled by Formspree — see contact.html for the
   form ID and CDN script.                                    */
function initContactForm() {
  const banner = document.querySelector('[data-fs-success]');
  if (!banner) return;

  new MutationObserver(() => {
    if (banner.style.display && banner.style.display !== 'none') {
      setTimeout(() => {
        banner.classList.add('is-fading');
        setTimeout(() => {
          banner.style.display = 'none';
          banner.classList.remove('is-fading');
        }, 650); /* matches the 0.6s CSS transition */
      }, 4000); /* banner stays visible for 4 seconds */
    }
  }).observe(banner, { attributes: true, attributeFilter: ['style'] });
}

/* ── Project filter (projects page) ──────────────────────────
   Powers the "All / Full-stack / Frontend / Backend" buttons
   at the top of projects.html.

   Each project card has a data-tags attribute (set in projects.js)
   e.g. data-tags="fullstack backend". When a filter button is
   clicked, cards that don't include that tag are hidden with
   display:none.

   TO ADD A NEW FILTER CATEGORY:
   1. Add a button in the .projects-filter div in projects.html
      <button class="filter-btn" data-filter="mobile">Mobile</button>
   2. Add the matching tag to your project in projects.js
      filterTags: 'fullstack mobile'                            */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  const cards = document.querySelectorAll('.card[data-tags]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Remove active state from all buttons, set on clicked one */
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          const tags = card.dataset.tags || '';
          card.style.display = tags.includes(filter) ? '' : 'none';
        }
      });
    });
  });
}

/* ── Smooth scroll for anchor links ──────────────────────────
   Any <a href="#something"> link will scroll smoothly to the
   target element instead of jumping instantly.
   Used by the project card self-links (href="#vitalai" etc.)  */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Video walkthrough tabs ───────────────────────────────────
   On the VitalAI card there are two video tabs:
   "Patient view" and "Staff view". Clicking a tab:
     1. Swaps the <source> src on the <video> element
     2. Calls video.load() to reload with the new source
     3. Resets playback to the beginning
     4. Resumes playback if a video was already playing

   This is only relevant for projects with multiple video tabs.
   Single-video projects don't have .video-tabs and are unaffected. */
function initVideoTabs() {
  document.querySelectorAll('.video-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.video-tab');
    const playerId = tabs[0]?.getAttribute('aria-controls');
    const player   = playerId ? document.getElementById(playerId) : null;
    if (!player) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const wasPlaying = !player.paused;

        /* Update tab active states */
        tabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        const src = tab.dataset.src;
        player.setAttribute('aria-labelledby', tab.id);

        /* Swap video source and reload */
        player.querySelector('source').src = src;
        player.load();
        player.addEventListener('loadedmetadata', () => {
          player.currentTime = 0;
          if (wasPlaying) player.play();
        }, { once: true }); /* { once: true } auto-removes this listener after firing */
      });
    });
  });
}

/* ── Project details (README) toggles ────────────────────────
   Each project card has a collapsible "Project details" panel
   (.card__readme) that shows features and tech stack.

   Clicking the toggle button:
     1. Toggles class "is-open" on the panel
        (CSS uses max-height transition to expand/collapse smoothly)
     2. Updates aria-expanded for accessibility
     3. Changes button text between "Project details" / "Hide details"

   These panels are generated automatically by projects.js —
   no changes needed here when you add new projects.         */
function initReadmeToggles() {
  document.querySelectorAll('.card__readme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      const isOpen = panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
      btn.querySelector('span').textContent = isOpen ? 'Hide details' : 'Project details';
    });
  });
}

/* ── Init — runs all functions once the DOM is ready ────────
   Each function is safe to call on any page — they all check
   for their target elements before doing anything.          */
document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
  initContactForm();
  initProjectFilter();
  initSmoothScroll();
  initVideoTabs();
  initReadmeToggles();
});
