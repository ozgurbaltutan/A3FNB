# A3 Food & Beverage — Pre-deploy audit

Audit date: 14 July 2026  
Baseline commit: `e2be091` (`chore: capture approved pre-deploy baseline`)  
Working branch: `codex/pre-deploy-audit`

## Executive summary

The approved localhost presentation is the visual baseline. The audit found no current lint, typecheck or production-build failure, but it did identify four launch-critical concerns:

1. The deployed Vercel instance currently emits `http://localhost:3000` URLs in `robots.txt`, sitemap, canonical metadata and JSON-LD when `NEXT_PUBLIC_SITE_URL` is missing.
2. The public footer contains placeholder social links with `href="#"`.
3. No favicon/application icon set or shared Open Graph image is present.
4. The project has no persistent browser smoke coverage despite a large route and interaction surface.

The largest maintenance risk is the accumulated global CSS cascade: `app/globals.css` is 14,366 lines and contains multiple late override layers labelled as resets, final corrections and authoritative contracts. Cleanup must preserve final computed styles and be validated against the baseline screenshots after each group.

## Environment and architecture

| Item | Baseline |
| --- | --- |
| Package manager | npm, one `package-lock.json` |
| Node | 24.16.0 locally |
| Next.js | 15.5.20 from the lockfile |
| React / React DOM | 19.2.7 from the lockfile |
| Tailwind CSS | 4.3.2 through PostCSS |
| Router | Next.js App Router |
| Language | TypeScript, strict mode, no emit |
| Lint | ESLint 9 with Next core-web-vitals and TypeScript rules |
| Styling | Tailwind import plus one large global CSS file; no CSS Modules found |
| CMS | None |
| Forms | `/api/enquiries`, direct Resend REST delivery |
| Analytics / monitoring | None |
| Test framework | None at baseline |
| Fonts | Local Gilroy Regular 137,496 B; Medium 143,964 B; Bold 145,376 B |

No broad framework or dependency upgrade is required for the first deployment.

## Route inventory

Public pages:

- `/` — intentional temporary redirect to `/en`
- `/en`
- `/en/products`
- `/en/products/sugar`
- `/en/products/coffee`
- `/en/products/elle-mina`
- `/en/products/cocoa-products`
- `/en/products/grains-seeds`
- `/en/products/dairy-milk-powders`
- `/en/products/oils-fats`
- `/en/products/starches-sweeteners`
- `/en/products/dried-fruit-nuts`
- `/en/products/frozen-foods`
- `/en/products/consumer-foods`
- `/en/markets-sourcing`
- `/en/how-we-work`
- `/en/about`
- `/en/resources`
- `/en/contact`
- `/en/request-a-quote`
- `/en/supplier-enquiry`
- `/en/cookie-policy`
- `/en/privacy-policy`
- `/en/modern-slavery-act`

Compatibility redirects exist for old Coffee, Cocoa, Grains, Dairy and Oils paths. `/en/products/green-coffee-beans` also performs a permanent redirect to `/en/products/coffee`.

System routes:

- `/api/enquiries` — `POST` only
- `/robots.txt`
- `/sitemap.xml`
- Next.js generated `/_not-found`; no branded custom not-found page at baseline

Only `en` is generated. The `[locale]` layout rejects every locale other than the active English locale. French and Spanish type scaffolding is not currently exposed through routes, navigation, sitemap or alternate metadata.

## Build and bundle baseline

Commands completed successfully before cleanup:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Production build: 31 generated pages/routes, no lint, type or build errors.

Selected route output:

| Route | Route JS | First-load JS |
| --- | ---: | ---: |
| `/en` | 54.4 kB | 179 kB |
| `/en/products` | 3.9 kB | 129 kB |
| Product detail routes | 131 B | 137 kB |
| `/en/contact` | 1.38 kB | 123 kB |
| Enquiry routes | 173–176 B | 116 kB |
| Shared by all routes | — | 102 kB |

Production CSS before cleanup:

- Main generated stylesheet: 345,240 B raw
- Secondary generated stylesheet: 730 B raw
- Source `app/globals.css`: 14,366 lines, approximately 348 kB
- Static analysis: 2,159 rules, 6,427 declarations and 236 repeated selector/media-context groups

No client-side library is currently an obvious safe removal: `d3-geo`, `topojson-client` and `world-atlas` support the market map; `clsx` is used throughout the UI.

## Public assets

Baseline working directory, including untracked drafts: 297 public files, 73,781,136 B.

Largest assets:

| Asset | Size |
| --- | ---: |
| `public/media/hero.webm` | 8,858,102 B |
| `public/media/products/sugar/icumsa-600-1200-v3.png` | 2,407,821 B |
| `public/media/products/sugar/icumsa-60-100-v3.png` | 2,129,863 B |
| Coffee catalogue PDF | 2,093,604 B |
| `icumsa-150-v3.png` | 1,979,498 B |
| `icumsa-45-v3.png` | 1,915,960 B |
| Sugar catalogue PDF | 1,857,245 B |
| `public/media/home/final-cta.webp` | 1,568,280 B |

Reference scan result:

- 140 files / 25,500,861 B have no direct source-string reference.
- 21 are untracked design iterations: 17 home product-card variants/pilots and four ICUMSA v2 images. They are confirmed absent from app, component, content, CSS and documentation references and are safe cleanup candidates.
- 119 are tracked legacy candidates. Static absence alone is insufficient evidence because old public URLs may have external value. They require a route/media crawl and manual category verification before deletion.
- The approved new Coffee origin/export images and Sugar hero/service images are referenced and were included in the protected baseline commit.

The hero video is intentionally retained. Its autoplay implementation and reduced-motion fallback must be verified, but it will not be replaced as part of cleanup.

## CSS and component findings

`app/globals.css` contains multiple generations of the same product, header, homepage and Sugar/Coffee rules. The highest-risk groups include:

- Site-header and mega-menu rules repeated across the base layer and later normalisation sections
- Product lineup/card selectors with several later appearance contracts
- Product technical-specification matrix rules repeated across responsive layers
- Sugar reset, product detail polish and final product-page correction blocks
- Homepage refinement and homepage audit-fix blocks

The safe consolidation policy is:

1. Remove byte-identical duplicate rules first.
2. Remove selectors only after DOM/runtime coverage shows no matching element at desktop or mobile widths.
3. For conflicting duplicates, preserve the last effective declaration in its original breakpoint context.
4. Compare key computed styles and screenshots after every logical group.
5. Do not rename the class system or migrate styling architecture before launch.

`components/product-detail-layout.tsx` is large (about 1,594 lines), but a broad decomposition would add launch risk. Only dead branches, unused types and exact local repetition should be removed now. Structural decomposition remains a post-launch task.

## SEO and deployment findings

Critical current deployment evidence:

- `https://a3fnb.vercel.app/` correctly returns a 307 redirect to `/en`.
- `/en`, `/robots.txt` and `/sitemap.xml` return 200.
- The live `robots.txt` advertises `http://localhost:3000/sitemap.xml`.
- Every current sitemap URL begins with `http://localhost:3000`.

Required environment model:

| Environment | `NEXT_PUBLIC_SITE_URL` | `SITE_INDEXABLE` |
| --- | --- | --- |
| Local | optional; localhost fallback | `false` by default |
| Pre-launch Vercel | `https://a3fnb.vercel.app` | `false` |
| Final production | `https://www.a3fnb.com` | `true` |

When indexing is disabled, page metadata must be `noindex`, robots must disallow crawling and sitemap must not advertise routes. A Vercel/production build missing the site URL must fail instead of silently publishing localhost metadata.

Metadata titles and descriptions exist for the principal routes. Most routes have no explicit Open Graph image. A shared branded 1200×630 image plus icon assets is required. No unfinished locale alternates are emitted.

## Forms and security

The enquiry endpoint already provides:

- Same-origin enforcement
- JSON content-type enforcement
- Server-side field and catalogue validation
- Business-email format validation
- Hidden `fax` honeypot
- Reply-to set to the submitted email
- No form-body logging
- Double-submit protection in the client

Remaining risk: the in-memory IP rate-limit map is per warm serverless instance and is not a distributed production rate limiter. It is acceptable as a lightweight first layer for pre-launch, but Vercel firewall/rate limiting or a durable external store should be evaluated after traffic is known. No new service will be added during this visual-preservation cleanup.

Required Vercel secrets/configuration:

- `RESEND_API_KEY`
- `ENQUIRY_FROM_EMAIL` using a Resend-verified sender domain
- `ENQUIRY_TO_EMAIL=info@a3fnb.com`

## Accessibility and interaction

Positive baseline features include a skip link, semantic main landmark, labelled form fields, alert errors, keyboard-oriented menu logic, reduced-motion CSS and native button/link usage in core controls.

Items requiring browser verification:

- Header/mega-menu Escape handling and focus return
- Mobile navigation open/close and focus behaviour
- Product dialogs, Coffee state selector and accordions by keyboard
- Focus visibility on media backgrounds
- Required-field error announcement and focus placement
- Text contrast over inner-page hero images
- Horizontal overflow at the specified breakpoints

## Finding classification

### Critical before launch

- Eliminate localhost production metadata/sitemap URLs.
- Keep `a3fnb.vercel.app` noindex until the final domain switch.
- Configure and verify Resend production environment variables.
- Remove placeholder `href="#"` social links.

### Important before launch

- Add favicon/app icons, shared Open Graph image and branded not-found page.
- Add conservative security headers without an untested CSP.
- Add maintainable Playwright smoke coverage for routes, navigation, product interactions, forms and PDFs.
- Validate all public routes and assets in a local production server and Vercel Preview.

### Safe cleanup

- Remove the 21 confirmed untracked image iterations.
- Consolidate exact CSS duplicates and proven superseded overrides while preserving computed output.
- Remove proven dead imports, exports, constants and selectors.
- Remove tracked legacy media only when both source audit and runtime crawl agree.

### Optional post-launch improvement

- Decompose the large product-detail layout and global stylesheet into clearer subsystem files.
- Add distributed rate limiting and production monitoring/analytics if required.
- Produce route-specific Open Graph images.
- Revisit large photographic PNG assets if a verified visual comparison permits conversion.

## Baseline visual references

Desktop (1440×900) and mobile (390×844) captures were recorded outside the repository for Home, Products, Coffee, Sugar, About, Contact, Resources, Buyer Quote and Supplier Enquiry. They are retained in the Codex visual workspace so the repository is not inflated by audit screenshots.

Full-page capture stitching repeats fixed/sticky visual regions in this browser surface, so acceptance comparisons use viewport captures and targeted section captures rather than stitched full-page pixels.

## Cleanup gate

Production-code cleanup may begin after this report. Any deletion that cannot be proven safe through source references, build output and runtime route/media checks will be retained and listed as a remaining risk rather than guessed away.
