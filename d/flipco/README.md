# MediaBay Fashion Master Theme V3 — Flip&Co Demo

Premium editorial fashion-retail theme for MediaBay.

## Concept
This is not an e-commerce template. The site is a digital storefront: brand discovery, collection previews, store reputation and a clear invitation to visit the physical store.

## Structure
- `index.html` — main editorial storefront
- `brand.html?brand=nike` — reusable brand collection page
- `engine.js` — main renderer
- `brand.js` — brand page renderer
- `content.json` — all client content and brand collections
- `assets/` — only the transparent Flip&Co logo

## Brand system
All 16 demo brands are represented in the Brand Atlas. Their logos are rendered as brand SVG icons from Simple Icons (`cdn.simpleicons.org`) and are linked to internal collection pages. For a production client deployment, replace these with official brand-approved logo assets where required by the brand guidelines.

## No e-commerce
There are no prices, carts or product checkout flows. Brand pages show an editorial selection of what visitors can expect to find in-store.

## GitHub Pages
Upload the contents of this folder to the repository root, preserving `assets/`. Then enable GitHub Pages from the `main` branch and `/ (root)`.


## V4 editorial update
- Uses the supplied high-resolution Flip&Co logo as a transparent asset.
- Uses the supplied store entrance photo as a premium homepage editorial feature.
- Removed the previous photographic assets from the theme.
- Homepage remains non-commerce: the store image drives the physical-store experience.


V5 FINAL: centered logo header, language left, menu right, translucent header, and only three supplied Flip&Co visual sources (logo + editorial campaign + store entrance).


Logo asset: `assets/logo-flipco.png` (exact filename/case). All site references use this exact path.
