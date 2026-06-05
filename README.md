# Nesta — "A fairer start" mission prototype

A two-page hi-fi prototype of Nesta's *A fairer start* mission, built in plain HTML/CSS/JS (no build step).

## Pages
- **index.html** — the mission homepage
- **content-hub.html** — the mission content hub / listing page
  (reached from the homepage's "Browse all mission content" buttons and the
  "Areas of focus" cards, which deep-link with a pre-applied filter, e.g.
  `content-hub.html?focus=parenting-support`)

## Publish on GitHub Pages
1. Create a new GitHub repository and upload **everything in this folder**
   (keep the `images/` and `fonts/` subfolders alongside the HTML).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick the **main** branch and the **/(root)** folder, then **Save**.
5. After a minute, your prototype is live at
   `https://<your-username>.github.io/<repo-name>/`

## Notes
- Photos load from the `images/` folder automatically — no setup needed.
  Each image still accepts a drag-and-drop to swap it in the browser.
- An internet connection is needed on first load for the Google-Fonts fallback
  (Hanken Grotesk / Mulish). The Nesta display font **Zosia** is bundled in `fonts/`.
- The "Tweaks" panel is a prototype convenience and isn't required for viewing.

## Files
- `index.html`, `content-hub.html` — the two pages
- `nesta.css` — shared design system (colours, type, components)
- `listing.css` — content-hub-only styles
- `nesta.js` — nav, search, scroll reveals, tweaks
- `image-slot.js` — drag-and-drop image placeholders
- `nesta-logo.png` — logo
- `images/` — all photography used across the prototype
- `fonts/Zosia-Display.otf` — Nesta display typeface
