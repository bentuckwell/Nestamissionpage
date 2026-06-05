# Nesta — "A fairer start" mission prototype

A two-page hi-fi prototype of Nesta's *A fairer start* mission, built in plain HTML/CSS/JS.

## Pages
- **index.html** — the mission homepage
- **content-hub.html** — the mission content hub / listing page
  (reachable from the homepage's "Browse all mission content" buttons and the
  "Areas of focus" cards, which deep-link with a pre-applied filter, e.g.
  `content-hub.html?focus=parenting-support`)

## Publish on GitHub Pages
1. Create a new GitHub repository and upload **all files in this folder**
   (keep the `fonts/` folder alongside the HTML).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick the **main** branch and the **/(root)** folder, then **Save**.
5. After a minute, your prototype is live at
   `https://<your-username>.github.io/<repo-name>/`

## Notes
- An internet connection is needed the first time so the page can load the
  Google Fonts fallback (Hanken Grotesk / Mulish). The Nesta display font
  **Zosia** is bundled in `fonts/`.
- The "Tweaks" panel and image drag-and-drop are prototype conveniences and
  are not required for viewing.

## Files
- index.html, content-hub.html — pages
- nesta.css — shared design system (colours, type, components)
- listing.css — content-hub-only styles
- nesta.js — nav, search, scroll reveals, tweaks
- image-slot.js — drag-and-drop image placeholders
- nesta-logo.png — logo
- fonts/Zosia-Display.otf — Nesta display typeface
