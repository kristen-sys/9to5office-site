# 9 to 5 Office Next.js Site

This project wraps the approved 9 to 5 Office website content in a deployable Next.js app.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Build for production

```bash
npm run build
npm run start
```

## Deploy

This project is ready for standard Next.js deployment on platforms like Vercel.

## Project structure

- `app/` Next.js app router pages
- `components/site-behavior.js` mobile menu and reveal behavior
- `lib/site-content.js` reads the approved HTML pages and maps them into Next routes
- `public/assets/` static logos, images, videos, and SVGs

## Notes

- The original HTML files remain in the project as the content source for the Next pages.
- Route paths are:
  - `/`
  - `/about`
  - `/services`
  - `/who-we-serve`
  - `/case-studies`
  - `/meet-the-team`
  - `/privacy`
