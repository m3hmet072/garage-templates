# garage-templates

Secure contact form integration that writes to Supabase `public.bookings` using a server-only service role key.

## Project structure

This project uses:
- Vite frontend (`index.html`, `src/main.js`, `src/styles.css`)
- Express API backend (`server.js`) for secure Supabase writes

In development:
- Frontend: `http://localhost:5173`
- API: `http://localhost:8787`
- Vite proxies `/api` and `/health` to the API server

In production:
- Run `npm run build`
- Start with `npm start`
- Express serves `dist/` and the API from one process

## Environment variables

Create a `.env` file in the project root:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
GARAGE_UUID=YOUR_GARAGE_UUID
PORT=5173
API_PORT=8787
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Important:
- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser.
- This key is used only in `server.js` on the server.

## Google Analytics (GA4)

This project supports GA4 from the frontend.

Tracked events:
- `page_view`
- `contact_submit_attempt`
- `contact_submit_success`
- `contact_submit_error`

Each event includes `garage_id` so you can filter analytics per garage.

Setup:
1. Create a GA4 Web Data Stream and copy its Measurement ID (`G-...`).
2. Set `VITE_GA_MEASUREMENT_ID` in `.env` for that website/garage.
3. Rebuild/restart frontend (`npm run dev` for local or `npm run build` for deploy).

Per-garage options:
1. One GA property per garage:
Set a different `VITE_GA_MEASUREMENT_ID` per deployment.
2. One GA property for all garages:
Use one shared `VITE_GA_MEASUREMENT_ID` and filter by `garage_id` in reports.

## Install and run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## API endpoint

`POST /api/contact`

Accepted JSON body fields:
- `name` (required)
- `email` (required)
- `phone` (optional)
- `licensePlate` (optional)
- `service` (optional)
- `message` (required)
- `website` (optional honeypot; should be empty)

Insert mapping to `public.bookings`:
- `garage_id = process.env.GARAGE_UUID`
- `license_plate = input.licensePlate || "CONTACT"`
- `phone = input.phone || ""`
- `service = input.service || "Contact Form"`
- `message = "Name: ...\nEmail: ...\nMessage:\n..."`

Security and anti-spam included:
- Honeypot field (`website`) check.
- Basic in-memory rate limit per IP (5 requests / 10 minutes).
- Clean JSON success/error responses.

## cURL test

```bash
curl -i -X POST http://localhost:8787/api/contact \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Jane Driver",
		"email": "jane@example.com",
		"phone": "+1 555 000 1234",
		"licensePlate": "ABC-123",
		"service": "Brake inspection",
		"message": "Please call me tomorrow morning.",
		"website": ""
	}'
```

Success response:

```json
{"success":true}
```

Error response shape:

```json
{"success":false,"error":"<reason>"}
```