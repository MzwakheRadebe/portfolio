# Mzwakhe Radebe — Portfolio

Personal developer portfolio. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools.

---

## Project structure

```
portfolio/
├── index.html          Homepage (hero, stats, featured projects, marquee)
├── projects.html       Full project listing with filters, videos, details
├── about.html          Bio, terminal animation, skills list, timeline
├── contact.html        Contact form (powered by Formspree)
│
├── css/
│   ├── reset.css       Browser default style reset
│   ├── variables.css   Design tokens (colours, spacing, fonts, radii)
│   └── main.css        All component styles
│
├── js/
│   ├── projects.js     ⭐ Project data array + card renderer (edit this to add projects)
│   ├── animations.js   Scroll reveals, load reveals, nav behaviour
│   ├── main.js         Page interactions (filter, video tabs, form, terminal)
│   └── cursor.js       Custom cursor effect
│
├── assets/
│   ├── images/         Project screenshots (.png / .jpg)
│   └── videos/         Project walkthrough videos (.mp4)
│
└── server.py           Local dev server (handles extensionless URLs)
```

---

## Running locally

```bash
cd C:\NEW_projects\portfolio
python server.py
```

Then open `http://localhost:8000` in your browser.

The custom server is needed because the browser requests URLs like `/projects` (without `.html`).
The standard Python server returns 404 for those — `server.py` rewrites them to `/projects.html` automatically.

---

## Deploying to Vercel (manual redeploy)

```powershell
cd "C:\NEW_projects\portfolio"
vercel deploy --yes
```

Run this in PowerShell any time you want to push changes live manually.
Auto-deploy is also set up via GitHub — every `git push` to the `master` branch deploys automatically.

---

## Adding a new project ⭐

**Only one file to edit: `js/projects.js`**

Open the file and scroll to the bottom. You will find a commented-out template. Copy it, uncomment it, and fill in your details:

```js
{
  id:         'my-new-project',     // Short lowercase ID, no spaces (used for anchor links + aria)
  number:     '03 / 2025',         // Display label shown on the card
  title:      'My New Project',
  desc:       'One paragraph describing what it does and why it matters.',
  filterTags: 'fullstack frontend', // Space-separated — options: fullstack  frontend  backend
  tags:       ['React', 'Node'],    // Pill labels shown on the card
  image: {
    src: 'assets/images/my-project.png',  // Drop screenshot into assets/images/
    alt: 'My project screenshot',
  },
  links: {
    live:   'https://my-project.com',
    github: 'https://github.com/MzwakheRadebe/my-project',
  },
  video: {
    src: 'assets/videos/my-project.mp4',  // Drop walkthrough video into assets/videos/
  },
  readme: {
    features: [
      'Feature one — describe it clearly',
      'Feature two',
    ],
    stack: ['React', 'Node', 'MongoDB'],
  },
},
```

The card HTML, SVG icons, IDs, and aria attributes are all generated automatically. No HTML to touch.

### Multiple video tabs (like VitalAI Patient / Staff view)

Replace the `video` field with:

```js
video: {
  playerId: 'my-project-player',
  tabs: [
    { id: 'tab-my-project-user',  label: 'User view',  src: 'assets/videos/my-project-user.mp4' },
    { id: 'tab-my-project-admin', label: 'Admin view', src: 'assets/videos/my-project-admin.mp4' },
  ],
},
```

---

## Adding a new filter category

1. Add a button in `projects.html` inside `.projects-filter`:
   ```html
   <button class="filter-btn" data-filter="mobile">Mobile</button>
   ```
2. Add the matching tag to any project in `projects.js`:
   ```js
   filterTags: 'fullstack mobile',
   ```

---

## Design tokens (css/variables.css)

All colours, spacing, and fonts are CSS custom properties. Change a value here and the whole site updates.

| Token | Value | Used for |
|-------|-------|----------|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-surface` | `#141414` | Cards, inputs, panels |
| `--color-border` | `#2a2a2a` | Borders, dividers |
| `--color-muted` | `#555555` | Placeholder text, subtle labels |
| `--color-body` | `#a0a0a0` | Body copy |
| `--color-heading` | `#e8e8e8` | Headings |
| `--color-highlight` | `#c8ff00` | Accent — buttons, hover states, cursor ring |

Spacing scale: `--space-1` (4px) → `--space-8` (128px). Always use these instead of hardcoded px values.

---

## Contact form (Formspree)

Submissions go to Formspree endpoint `xeevpyre` and are forwarded to `Mzwakhe.radebe@icloud.com`.

- **Form ID**: `xeevpyre`
- **Dashboard**: https://formspree.io
- **CDN used**: `https://unpkg.com/@formspree/ajax@1`

The form validates fields, shows inline errors per field, and shows a compact success banner that auto-dismisses after 4 seconds. No backend code needed.

---

## Animating new elements

**Scroll reveal** — fades in when scrolled into view:
```html
<div class="reveal">Your content</div>
```

**Load reveal** — fades in immediately on page load (staggered by order):
```html
<div data-load-reveal>Hero content</div>
```

**Staggered grid** — children animate in one by one:
```html
<div data-stagger>
  <div data-stagger-child>Card 1</div>
  <div data-stagger-child>Card 2</div>
</div>
```

**Draw border on hover** — accent border animates around the element on hover:
```html
<div class="draw-border">Your content</div>
```

---

## Deployment

The site is static HTML/CSS/JS and can be hosted anywhere.

- Drop all files onto Vercel, Netlify, GitHub Pages, or any static host
- No build step required
- `server.py` is for local development only — not needed in production
- Production hosts handle extensionless URLs automatically (no need for server.py workaround)
