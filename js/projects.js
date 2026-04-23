'use strict';

/* ============================================================
   PROJECTS DATA
   To add a new project, copy the object template at the bottom
   of this array and fill in your details. That's it.
   ============================================================ */

const PROJECTS = [
  {
    id:          'vitalai',
    number:      '01 / 2024',
    title:       'VitalAI',
    desc:        'Patients describe their symptoms in plain text — an AI model classifies severity as Critical, High, Medium, or Low with a plain-language recommendation (call an ambulance, visit a clinic today, or monitor at home). Backed by real authentication, a live database, and a booking system spanning 7 doctors across 7 medical departments.',
    filterTags:  'fullstack backend',           // used by the filter buttons
    tags:        ['Full-stack', 'AI / NLP', 'Auth', 'Database', 'Booking'],
    image: {
      src: 'assets/images/VitalAI_PIC.png',
      alt: 'VitalAI app — AI-powered health triage interface',
    },
    links: {
      live:   'https://vitalai-app.vercel.app/',
      github: 'https://github.com/MzwakheRadebe',
    },
    video: {
      // Multiple tabs — remove tabs array and add src for a single video
      playerId: 'vitalai-player',
      tabs: [
        { id: 'tab-vitalai-user',  label: 'Patient view', src: 'assets/videos/vitalai-user.mp4' },
        { id: 'tab-vitalai-staff', label: 'Staff view',   src: 'assets/videos/vitalai-staff.mp4' },
      ],
    },
    readme: {
      features: [
        'AI symptom triage — classifies patient input as Critical, High, Medium, or Low with a plain-language recommendation (call an ambulance, visit a clinic, or monitor at home)',
        'Doctor booking system spanning 7 doctors across 7 medical departments with real availability',
        'Full user authentication — secure sign-up, login, and session management built from scratch',
        'Patient dashboard — triage history, past results, and appointment management',
        'Staff dashboard — doctors view and manage incoming appointments in real time',
        'Live database — all data persisted with a real backend and relational database',
      ],
      stack: ['Full-stack', 'AI / NLP', 'Auth', 'Database', 'Booking system', 'Vercel'],
    },
  },

  {
    id:          'cct',
    number:      '02 / 2024',
    title:       'City Center Trade',
    desc:        'A C2C marketplace for South African buyers and sellers — inspired by Gumtree and Facebook Marketplace. Features real-time messaging, a seller dashboard with live view tracking, multi-image listings, category browsing, and a live deployment with SQL injection prevention, secure file uploads validated by real image content, and HTTPS enforcement via .htaccess.',
    filterTags:  'fullstack frontend backend',
    tags:        ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'InfinityFree'],
    image: {
      src: 'assets/images/CityCenterTrade.png',
      alt: 'City Center Trade — South African C2C marketplace homepage',
    },
    links: {
      live:   'https://cityCenterTrade.infinityfreeapp.com',
      github: 'https://github.com/MzwakheRadebe',
    },
    video: {
      // Single video — no tabs array needed
      src: 'assets/videos/CityCenter_WalkThough.mp4',
    },
    readme: {
      features: [
        'Multi-image listings — sellers upload multiple photos validated server-side by actual image content, not just file extension',
        'Real-time messaging between buyers and sellers within the platform',
        'Seller dashboard with live view tracking, listing management, and message inbox',
        'SQL injection prevention — all database queries use prepared statements',
        'Secure file uploads — server-side content validation blocks disguised file uploads',
        'HTTPS enforcement configured via <code>.htaccess</code> on the production server',
        'Fully deployed to production on InfinityFree with real users',
      ],
      stack: ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'InfinityFree'],
    },
  },

  /* ── ADD NEW PROJECTS BELOW THIS LINE ──────────────────────
  {
    id:         'my-new-project',        // short lowercase id, no spaces
    number:     '03 / 2025',            // display number
    title:      'My New Project',
    desc:       'One paragraph describing what the project does and why it matters.',
    filterTags: 'fullstack frontend',    // any combo of: fullstack frontend backend
    tags:       ['React', 'Node', 'MongoDB'],
    image: {
      src: 'assets/images/my-project.png',
      alt: 'My New Project screenshot',
    },
    links: {
      live:   'https://my-project.com',
      github: 'https://github.com/MzwakheRadebe/my-project',
    },
    video: {
      src: 'assets/videos/my-project-walkthrough.mp4',  // single video
      // OR for multiple tabs:
      // playerId: 'my-project-player',
      // tabs: [
      //   { id: 'tab-my-project-user',  label: 'User view',  src: 'assets/videos/my-project-user.mp4' },
      //   { id: 'tab-my-project-admin', label: 'Admin view', src: 'assets/videos/my-project-admin.mp4' },
      // ],
    },
    readme: {
      features: [
        'Feature one — describe it clearly',
        'Feature two — what makes it notable',
        'Feature three',
      ],
      stack: ['React', 'Node', 'MongoDB'],
    },
  },
  ───────────────────────────────────────────────────────── */
];


/* ============================================================
   RENDERER  —  do not edit below unless changing card layout
   ============================================================ */

const SVG_GLOBE = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
  <circle cx="8" cy="8" r="6"/>
  <path d="M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12M2 8h12"/>
</svg>`;

const SVG_GITHUB = `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
</svg>`;

const SVG_PLAY = `<svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true"><path d="M6 4l6 4-6 4V4z"/></svg>`;
const SVG_CHEVRON = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>`;
const SVG_ARROW = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4"/></svg>`;

function buildVideoBlock(p) {
  const v = p.video;
  if (!v) return '';

  const hasTabs = v.tabs && v.tabs.length > 1;

  const tabsHTML = hasTabs
    ? `<div class="video-tabs" role="tablist" aria-label="Select walkthrough perspective">
        ${v.tabs.map((t, i) => `
        <button class="video-tab${i === 0 ? ' is-active' : ''}" role="tab"
          aria-selected="${i === 0 ? 'true' : 'false'}"
          data-src="${t.src}" id="${t.id}"
          aria-controls="${v.playerId}">${t.label}</button>`).join('')}
      </div>`
    : '';

  const firstSrc  = hasTabs ? v.tabs[0].src : v.src;
  const videoId   = hasTabs ? `id="${v.playerId}"` : '';
  const ariaLabel = hasTabs ? `aria-labelledby="${v.tabs[0].id}"` : '';

  return `
  <div class="video-block">
    <div class="video-block__header">
      <div class="video-block__label">${SVG_PLAY} Walkthrough</div>
      ${tabsHTML}
    </div>
    <div class="video-block__player">
      <video ${videoId} class="video-el" controls preload="metadata" ${hasTabs ? 'role="tabpanel"' : ''} ${ariaLabel}>
        <source src="${firstSrc}" type="video/mp4"/>
        Your browser does not support the video element.
      </video>
    </div>
  </div>`;
}

function buildCard(p, index) {
  const readmeId = `readme-${p.id}`;

  const tagsHTML        = p.tags.map(t => `<li class="tag">${t}</li>`).join('');
  const stackHTML       = p.readme.stack.map(t => `<li class="tag">${t}</li>`).join('');
  const featuresHTML    = p.readme.features.map(f => `<li>${f}</li>`).join('');

  return `
<article class="card reveal" id="${p.id}" data-stagger-child data-tags="${p.filterTags}">
  <a href="#${p.id}" aria-label="${p.title}">
    <div class="card__thumb">
      <div class="card__thumb-inner">
        <img src="${p.image.src}" alt="${p.image.alt}"/>
      </div>
    </div>
  </a>

  <div class="card__body">
    <p class="card__number">${p.number}</p>
    <h2 class="card__title">${p.title}</h2>
    <p class="card__desc">${p.desc}</p>
    <ul class="card__tags" aria-label="Technologies">${tagsHTML}</ul>
  </div>

  <div class="card__links">
    <a class="card__btn card__btn--primary" href="${p.links.live}" target="_blank" rel="noopener noreferrer">
      ${SVG_GLOBE} Live site ↗
    </a>
    <a class="card__btn" href="${p.links.github}" target="_blank" rel="noopener noreferrer">
      ${SVG_GITHUB} GitHub
    </a>
  </div>

  ${buildVideoBlock(p)}

  <div class="card__readme" id="${readmeId}">
    <div class="card__readme-inner draw-border">
      <p class="card__readme-heading">Key features</p>
      <ul class="card__readme-list">${featuresHTML}</ul>
      <p class="card__readme-heading">Tech stack</p>
      <ul class="card__tags">${stackHTML}</ul>
    </div>
  </div>
  <button class="card__readme-toggle" aria-expanded="false" aria-controls="${readmeId}">
    <span>Project details</span>
    ${SVG_CHEVRON}
  </button>

  <a href="#${p.id}" class="card__arrow" aria-label="${p.title} details" tabindex="-1" aria-hidden="true">
    ${SVG_ARROW}
  </a>
</article>`;
}

function renderProjects() {
  const grid = document.querySelector('.projects__grid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((p, i) => buildCard(p, i)).join('');
}

document.addEventListener('DOMContentLoaded', renderProjects);
