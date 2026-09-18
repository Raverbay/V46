# Flip&Co Premium Omnichannel V4

Versione ad alta fedeltà per presentazione cliente.

- 12 prodotti esempio / 6 brand / 2 per brand
- dati prodotto e stock per taglia
- Shop + filtri + brand + disponibilità
- Product detail + taglie + spedizione + ritiro in store + WhatsApp
- Carrello persistente
- Checkout completo lato UX: contatti, consegna, ritiro, pagamento, validazione, totali
- Conferma ordine
- Importatore CSV in /admin/import.html
- inventory/imported-stock.csv e inventory/inventory.json
- pagine base spedizioni, resi, FAQ, privacy, termini, cookie da completare con dati reali

## Architettura
UN SOLO INVENTARIO → ONLINE + STORE.

## Go-live finale
Collegare payment provider, backend ordine, prenotazione atomica stock, spedizioni, email transactional, testi legali definitivi, analytics/consenso e immagini prodotto con diritti d'uso.

Il prototipo non dichiara un pagamento come riuscito: crea un ordine locale in stato pending_payment.
