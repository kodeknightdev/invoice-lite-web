# invoice-lite-web

React frontend for Invoice Lite, a small invoicing tool for freelancers. You can manage clients, build invoices with line items, send them, and take test card payments through Stripe.

The backend is a separate repo, `invoice-lite-api` (ASP.NET Core 6).

## Stack

- React 18 (bootstrapped with Create React App 5)
- React Router 6
- axios
- Stripe.js + React Stripe.js (Payment Element), **test mode only**
- Jest + React Testing Library

## Getting started

Start the API first (it listens on https://localhost:7180 by default). Then:

```bash
cp .env.example .env.local
npm install
npm start
```

The app runs at http://localhost:3000. That origin is already allowed by the API's CORS config.

### Environment

| Variable | Description |
| --- | --- |
| `REACT_APP_API_URL` | Base URL of the API |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Stripe **test** publishable key (`pk_test_...`) |

Never put a live Stripe key in here. The checkout page shows a hint when no key is configured.

## Paying an invoice (test mode)

1. Create a client and a draft invoice.
2. Mark the invoice as sent.
3. Click **Pay by card (test)** and use `4242 4242 4242 4242`, any future expiry, any CVC.
4. Stripe redirects back to `/payments/result`. The invoice flips to Paid when the API receives the `payment_intent.succeeded` webhook. Run `stripe listen` locally; the API README explains how.

## Scripts

- `npm start`: dev server
- `npm test`: tests in watch mode
- `npm run build`: production build in `build/`
