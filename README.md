# Soca Lash Beauty

React and Vite website for Soca Lash Beauty, ready for Netlify deployment.

## Local Setup

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production build outputs to `dist`.

## Booking Link

The booking destination is set in `src/main.tsx`:

```ts
const BOOKING_URL = "https://app.squareup.com/appointments/book/rpl0o5e87wb45p/LMT9PDTKM8GFR/start";
```

Update that value when the final booking link changes.
