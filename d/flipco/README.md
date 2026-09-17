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




Logo asset: `assets/logo-flipco.png` (exact filename/case). All site references use this exact path.


## V7 — clean factual copy
- Removed unverified historical references (1976/1986/2011 and similar dates) from visible client copy.
- Replaced historical hero/story facts with neutral, non-dated positioning.
- Kept the editorial storefront structure, brand pages, store section and responsive system intact.
- No historical claim is made unless it is explicitly verified by the client.


## V8 — mobile section hierarchy
- Reworked the mobile layout of "The Worlds" so the headline gets full width and no longer breaks the final word awkwardly.
- Reworked the mobile "Brand Atlas" header so the "16 Selected Brands" counter sits below the headline instead of compressing it.
- Removed the remaining unverified "Since 1986" footer claim.


## V9 — editorial headline correction
- Renamed section 02 from “THE WORLDS” to “THE EDIT”.
- Forced whole-word rendering for “ESSERE.” and “CONOSCI.” so individual letters cannot wrap onto a new line.
- Tuned mobile headline sizing to preserve the intended editorial hierarchy without breaking words.


## V10 — conversion copy / store-first strategy
- Rewritten site-wide copy around a store-first customer journey.
- Clear distinction: this is not an e-commerce; the website is a discovery and visit trigger.
- Stronger semantic hierarchy, curiosity, sensory language, micro-commitments and action-oriented CTAs.
- Reworked all brand-page copy and selection modules.
- Section naming refined: THE EDIT / BRAND ATLAS.
