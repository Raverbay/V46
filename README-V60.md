# MediaBay V60 — Client Brief FormSubmit AJAX/FormData

- `brief.html` keeps the V59 design and fields.
- Submission is intercepted client-side and sent to `https://formsubmit.co/ajax/info@mediabay.it`.
- Uses native `FormData`, preserving the form's multipart file data.
- Sends only `Accept: application/json`; the browser creates the multipart boundary automatically.
- On a successful FormSubmit JSON response, redirects to `https://mediabay.it/brief-received.html`.
- On failure, the form stays visible and shows an error instead of silently redirecting.
- No changes to MediaBay public navigation, layout, or scroll/motion.
