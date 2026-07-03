# A3 Food & Beverage Website

SEO-first MVP foundation for the A3 Food & Beverage website.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- CSS variables for design tokens
- CMS-ready structured content files

## Local Development

```bash
npm install
npm run dev
```

The MVP is served under `/en`. The root path redirects to `/en`.

## Environment

Copy `.env.example` to `.env.local` when environment values are available.

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs, sitemap URLs and robots output. Use the production domain on Vercel. The app falls back to `http://localhost:3000` in local development.

Sanity variables are placeholders for a future CMS integration. This MVP does not connect to Sanity yet.

## Build

```bash
npm run typecheck
npm run build
```

## SEO Notes

Content, metadata, canonical paths, Open Graph fields, sitemap inclusion and structured data settings are centralized in typed content files. Product pages avoid fake pricing, stock, ratings, reviews and offer data.

## Future Sanity Readiness

The content models are intentionally close to future Sanity schemas: pages, navigation, product families, product details, market regions, services, resources, SEO fields and form structures.
