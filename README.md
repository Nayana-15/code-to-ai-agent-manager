# NAYANA.DEV — Editorial Web Application

## Article Title
**"From Code Writer to AI Agent Manager: What Junior Developers Need to Learn in 2026"**  
*By Nayana*

---

## Overview
An interactive, high-craft technology editorial exploring how the rapid rise of autonomous AI coding agents transforms junior developer pedagogy, systems architecture, code review, security invariants, and engineering judgment.

---

## Technology Stack
- **Structure:** Standards-compliant Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- **Styling:** Vanilla CSS3 with CSS Custom Properties, modern typography, responsive CSS Grid & Flexbox, smooth transitions, and dark/light/system theme support
- **Interactivity:** Vanilla Modern JavaScript (ES2020+) — Zero frameworks, zero bundlers, zero runtime dependencies
- **Typography:** Web fonts from Google Fonts (`Newsreader`, `Plus Jakarta Sans`, `JetBrains Mono`) with robust system fallbacks
- **Social & SEO:** Full Open Graph metadata, Twitter summary_large_image card, and Schema.org `TechArticle` structured data

---

## Local Development & Testing

Since this project has no build step or package dependencies, it can be served using any local HTTP static server:

### Python 3
```bash
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Node.js (via npx)
```bash
npx serve .
# or
npx http-server -p 8000
```

### VS Code
Right-click `index.html` and select **"Open with Live Server"**.

---

## Deployment Notes (GitHub & Vercel)

This repository is optimized for instantaneous zero-configuration deployment:

### Vercel Deployment
1. Import this repository into Vercel.
2. **Framework Preset:** Select **Other**.
3. **Build Command:** Leave empty.
4. **Output Directory:** Leave as `.` (root).
5. Click **Deploy**.

### GitHub Pages
1. Push to GitHub.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder, then click **Save**.

---

## Where Production Domain Values Must Be Replaced

Before official public launch, search for `https://YOUR-DOMAIN.com/` in `index.html` and replace it with your verified production domain (e.g., `https://nayana.dev`):

1. **Canonical Link (`<link rel="canonical">`):**
   - Line ~23: `href="https://YOUR-DOMAIN.com/from-code-writer-to-ai-agent-manager"`
2. **Open Graph Tags (`<meta property="og:*">`):**
   - `og:url`
   - `og:image` and `og:image:secure_url`
3. **Twitter Card Tags (`<meta name="twitter:*">`):**
   - `twitter:url`
   - `twitter:image`
4. **JSON-LD Structured Data (`<script type="application/ld+json">`):**
   - `mainEntityOfPage.@id`
   - `image.url`
   - `author.url`
   - `publisher.url` and `publisher.logo.url`
5. **Footer RSS Placeholder:**
   - Anchor linking to RSS feed

For full deployment documentation and pre-launch checklists, see [DEPLOYMENT.md](DEPLOYMENT.md).
