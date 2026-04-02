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
- For GitHub Pages docs output, run `npm run build:docs` to generate `docs/`

## Environment variables

Create a `.env` file in the project root:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
GARAGE_UUID=YOUR_GARAGE_UUID
PORT=5173
API_PORT=8787
```

Important:
- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser.
- This key is used only in `server.js` on the server.
- Keep `.env` out of git and commit only `.env.example` placeholders.

## Install and run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Publish docs

```bash
npm run build:docs
```

This writes static assets to `docs/` for repository-hosted docs pages.

For GitHub Pages form submissions, configure an external API origin at build time:

```bash
VITE_API_BASE_URL=https://your-api.example.com npm run build:docs
```

If you use Supabase Edge Functions, the app automatically posts to `/contact` on that base.

You can also set a full endpoint directly (recommended):

```bash
VITE_CONTACT_ENDPOINT=https://YOUR_PROJECT_REF.functions.supabase.co/contact npm run build:docs
```

Your external endpoint must allow CORS from your docs origin (for example `https://m3hmet072.github.io`).

When `VITE_API_BASE_URL` and `VITE_CONTACT_ENDPOINT` are both not set, GitHub Pages builds will not submit the contact form.

## Supabase Edge Function (CORS)

This repository includes a CORS-ready edge function at `supabase/functions/contact/index.ts`.

Deploy it and set secrets:

```bash
supabase functions deploy contact
supabase secrets set \
	SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co \
	SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY \
	GARAGE_UUID=YOUR_GARAGE_UUID \
	ALLOWED_ORIGINS=https://m3hmet072.github.io,http://localhost:5173
```

Then build docs with either:

```bash
VITE_CONTACT_ENDPOINT=https://YOUR_PROJECT_REF.functions.supabase.co/contact npm run build:docs
```

or

```bash
VITE_API_BASE_URL=https://YOUR_PROJECT_REF.functions.supabase.co npm run build:docs
```

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