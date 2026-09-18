# Flip&Co — Premium V5

V5 consolidates the commerce architecture around a single inventory source: `inventory/inventory.json`.

## Runtime
- Homepage / brand / shop / product pages read canonical inventory data.
- Cart validates size-level availability before adding and changing quantities.
- Checkout re-validates the cart against the latest local inventory before creating the demo order.
- Payment is intentionally not simulated as successful: a real PSP + backend order transaction is required for go-live.

## Inventory
- `inventory/inventory.json` = canonical demo inventory.
- `inventory/imported-stock.csv` = import example.
- `admin/import.html` = browser-side CSV validator/exporter.
- `admin/index.html` = admin shell; authentication/backend are required before production.

## Important production requirements
1. Replace demo/remote product images with licensed client assets.
2. Connect a real payment provider and server-side order handling.
3. Implement atomic stock reservation/decrement on the server.
4. Protect admin with authentication and authorization.
5. Complete legal pages with the client's actual legal data and policies.
6. Configure shipping, email notifications, analytics/consent and domain/SEO.
7. Add real product gallery assets when supplied by Flip&Co.

MediaBay is not exposed in the customer-facing UI.
