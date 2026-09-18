# Flip&Co — Premium Audit V26

- Rebuilt shared header/navigation/search with one runtime component and no legacy scroll/loader transitions.
- Canonical inventory remains `inventory/inventory.json`; duplicate runtime catalog removed.
- Home is a product-led shopping experience; the only non-product photography is the store entrance.
- Product cards no longer nest interactive buttons inside anchors.
- Home now loads the canonical commerce runtime so Add to Bag works from the homepage.
- Product gallery supports future multi-image product records through an optional `images` array.
- Removed obsolete header/home version assets from the runtime tree.
- Added responsive, reduced-motion, focus, hover, drawer and editorial layout refinements.

## Remaining go-live items

- Replace demo remote product images with owned/licensed Flip&Co photography.
- Connect real payment provider and server-side order/inventory validation.
- Replace legal placeholder copy with the store's final legal policies and company data.
- Protect the admin importer with authentication/server-side controls.
