# NAYANA.DEV Deployment Guide

**Article:** *"From Code Writer to AI Agent Manager: What Junior Developers Need to Learn in 2026"*  
**Author:** Nayana  
**Version:** Production Release (October 2026 Edition)

---

## 1. Project Overview

- **Project Type:** Lightweight Static Editorial Web Application (JAMstack / Static HTML5)
- **Framework / Runtime:** Pure Vanilla Standards (Zero Build Tools, Zero Bundlers, Zero External Runtime Dependencies)
- **Entry Point:** `index.html`

---

## 2. Required Production Files

The entire production site consists of the following lightweight static assets:

| File | Purpose | Notes |
| :--- | :--- | :--- |
| `index.html` | Core article markup, metadata, JSON-LD, and landmarks | Single-page editorial document |
| `styles.css` | Complete editorial design system, typography, and responsive styles | Vanilla CSS with custom properties & responsive grid |
| `app.js` | Interactive widgets, theme switcher, progress bar, accessibility | Pure Vanilla JS (ES2020+) |
| `favicon.svg` | Scalable modern brand favicon | Dual-stop brand gradient with dev accent |
| `favicon.ico` | 32×32 fallback favicon | For legacy browsers and RSS readers |
| `apple-touch-icon.png` | 180×180 iOS / mobile home screen touch icon | Crisp squircle brand mark |
| `og-image.png` | 1200×630 Open Graph & Twitter summary_large_image card | Editorial social preview card |

> *Note: Temporary drafts or non-production artifacts (e.g. backup HTML files) should not be deployed.*

---

## 3. How to Run Locally

Because the project is 100% static, you can serve it with any local HTTP server:

### Option A: Python 3 (Recommended)
```bash
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Option B: Node.js (npx serve or http-server)
```bash
npx serve .
# or
npx http-server -p 8000
```

### Option C: VS Code Live Server
Right-click `index.html` and click **"Open with Live Server"**.

---

## 4. How to Deploy as a Static Website

Because this repository contains no compilation steps or node dependencies, deployment is instant and drag-and-drop compatible with any modern static web host.

### Generic Static Hosting
1. Upload the required production files (`index.html`, `styles.css`, `app.js`, `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og-image.png`) directly to your web root (or `public_html`).
2. Ensure web server headers serve:
   - SVG as `image/svg+xml`
   - CSS as `text/css; charset=utf-8`
   - JS as `application/javascript; charset=utf-8`

### GitHub Pages
1. Push the repository to GitHub.
2. In the repository settings, go to **Settings > Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**.
4. Choose `main` branch and `/ (root)` folder.
5. Click **Save**.

### Cloudflare Pages / Vercel / Netlify
- **Build command:** *(Leave empty / None)*
- **Build output directory:** `.` (root)
- **Install command:** *(Leave empty / None)*

---

## 5. Metadata Values to Replace Before Production

Before publishing to your real custom domain, replace the clearly marked `https://YOUR-DOMAIN.com/` placeholders in `index.html`:

| Line / Element | Search Target | Replace With |
| :--- | :--- | :--- |
| **Canonical URL** | `https://YOUR-DOMAIN.com/from-code-writer-to-ai-agent-manager` | Your live canonical URL (e.g., `https://nayana.dev/essays/from-code-writer-to-ai-agent-manager`) |
| **OG URL** | `property="og:url" content="https://YOUR-DOMAIN.com/..."` | Your live article URL |
| **OG Image** | `property="og:image" content="https://YOUR-DOMAIN.com/og-image.png"` | Absolute URL to the hosted image |
| **OG Secure Image** | `property="og:image:secure_url" content="https://YOUR-DOMAIN.com/og-image.png"` | Absolute HTTPS URL to the image |
| **Twitter URL** | `name="twitter:url" content="https://YOUR-DOMAIN.com/..."` | Your live article URL |
| **Twitter Image** | `name="twitter:image" content="https://YOUR-DOMAIN.com/og-image.png"` | Absolute HTTPS URL to the image |
| **JSON-LD mainEntity** | `"mainEntityOfPage": { "@id": "https://YOUR-DOMAIN.com/..." }` | Your live article URL |
| **JSON-LD image** | `"image": { "url": "https://YOUR-DOMAIN.com/og-image.png" }` | Absolute HTTPS URL to the image |
| **JSON-LD author URL** | `"author": { "url": "https://YOUR-DOMAIN.com/#about" }` | Author website or bio URL |
| **JSON-LD publisher** | `"publisher": { "url": "https://YOUR-DOMAIN.com/", "logo": { ... } }` | Publisher domain & logo URL |

---

## 6. Pre-Launch Verification Checklist

- [x] **Page Title:** Exact match (`From Code Writer to AI Agent Manager: What Junior Developers Need to Learn in 2026`)
- [x] **Meta Description:** Concise, compelling, under 160 characters
- [x] **Open Graph:** `og:type="article"`, `og:site_name`, 1200×630 `og:image.png`
- [x] **Twitter Card:** `twitter:card="summary_large_image"`, title, description, image
- [x] **Structured Data:** Valid `TechArticle` schema with publisher, author, date, and image
- [x] **Favicon Suite:** `favicon.svg`, `favicon.ico`, and `apple-touch-icon.png` (zero 404s)
- [x] **Semantic HTML5:** Single `<h1>`, `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- [x] **Deep Linking:** Anchor jumps (`#sec-01`, `#sec-05`, `#sec-10`, `#sec-sources`) with header offset protection
- [x] **External Links:** All research source cards open in `target="_blank"` with `rel="noopener noreferrer"`
- [x] **Theme System:** Light, Dark, and System preference synchronization
- [x] **Console / Network:** Zero errors, zero missing assets, zero deprecation warnings
- [x] **Performance:** Google Fonts preconnected, scripts deferred, autoplay lifecycle suspended when offscreen
