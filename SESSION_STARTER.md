# InterestingHere.com — Session Context

> **Paste this file at the start of every new Lovable session.**

## Project Overview
- **Domain**: https://interestinghere.com
- **Repo**: https://github.com/DeadinTheWater/locale-gems-guide
- **Purpose**: Authority travel site for authentic, expert-curated local experiences (hidden gems). Optimized for GEO (Generative Engine Optimization) and affiliate marketing.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Deployment**: GitHub Actions → GitHub Pages (static SPA)
- **Vite config**: `base: '/'` for relative asset paths
- **No backend** — all content is driven by local JSON files

## Content Data Layer
| File | Purpose |
|------|---------|
| `src/content/cities.json` | City definitions (slug, name, description, region, etc.) |
| `src/content/posts.json` | Blog post entries (id, cityId, title, excerpt, image, content, etc.) |
| `src/content/collections.json` | Themed collection groupings |

- **Post images** go in `public/images/posts/{city-slug}/`
- **City card images** go in `src/assets/cities/` (imported as ES6 modules via `src/lib/cityImages.ts`)

## Routing
- `/` — Landing page (`src/pages/Index.tsx`)
- `/:citySlug` — City hub page (`src/pages/CityHub.tsx`)
- `/:citySlug/:postId` — Individual post (`src/pages/PostPage.tsx`)
- `/about` — About page (`src/pages/About.tsx`)

## Open Graph / Social Sharing (CRITICAL — DO NOT BREAK)

The site is a static SPA on GitHub Pages. Social media crawlers **cannot execute JavaScript**, so a **post-build script** generates static HTML files with hardcoded OG meta tags.

### Build pipeline (in order)
1. `vite build` — produces `dist/`
2. `scripts/validate-og-images.mjs` — checks every post hero image in `dist/` is ≥1200×630px; undersized images are auto-resized via `sharp` (dist only, not source). Missing images fail the build.
3. `scripts/generate-og-pages.mjs` — generates static HTML with OG tags, reading actual image dimensions from disk via `sharp` (no hardcoded sizes).

### Script: `scripts/generate-og-pages.mjs`
- Reads `posts.json` and `cities.json`
- For each post: creates `dist/{citySlug}/{postId}/index.html`
- For each city: creates `dist/{citySlug}/index.html`
- Each file includes OG tags, Twitter Card tags, canonical URL, AND all CSS/JS from the Vite build

### Asset Extraction (the part that broke before)
The script extracts two types of tags from the built `dist/index.html`:

1. **CSS & preloads**: `/<link[^>]*\/?>/g` — must be permissive to catch both self-closing (`/>`) and standard (`>`) link tags
2. **JS entry point**: `/<script[^>]*>[^<]*<\/script>/g` — filtered to only `type="module"` scripts

**Both are required.** Missing scripts = blank page. Missing links = broken styles/formatting.

### The `SITE` constant
Hardcoded to `https://interestinghere.com`. All `og:image` URLs are absolute (script prepends `SITE` to the image path from `posts.json`).

### Adding a new post — checklist
1. Add entry to `src/content/posts.json` with `image` pointing to hero (e.g., `/images/posts/london/hero.jpg`)
2. Place hero image in `public/images/posts/{city-slug}/`
3. Push to GitHub — the build + OG generation is automatic

### Common pitfalls
| Problem | Cause | Fix |
|---------|-------|-----|
| Blank page on post/city URLs | Script didn't include `<script type="module">` tags | Ensure `scriptRegex` captures module scripts |
| Broken styles/formatting | Script didn't capture all `<link>` tags | Use permissive regex: `/<link[^>]*\/?>/g` |
| OG image not showing | Image path is relative | Script must prepend `SITE` constant |
| Stale social previews | Crawler cache | Use Facebook Sharing Debugger "Scrape Again" |
| OG image too small / no preview | Hero image under 1200×630px | `validate-og-images.mjs` auto-resizes; replace source with larger image |
| Declared vs actual size mismatch | Hardcoded dimensions | `generate-og-pages.mjs` now reads actual dimensions via `sharp` |

## Landing Page Sections
1. **HeroSection** — dynamic background, H1, search-style CTA
2. **FeaturedDestinations** — top 5 affiliate-ready cities
3. **TrustSection** — E-E-A-T signals (human curated, insider access, verified)
4. **ThemedCollections** — story-driven categories (culinary, urban, historical)
5. **JournalSection** — latest interview-based articles
6. **CityDirectory** — full city listing

## Key Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `SiteHeader` | `src/components/SiteHeader.tsx` | Global nav |
| `SiteFooter` | `src/components/SiteFooter.tsx` | Global footer |
| `PostCard` | `src/components/PostCard.tsx` | Blog post preview card |
| `CityCard` | `src/components/CityCard.tsx` | City preview card |
| `ShareBar` | `src/components/ShareBar.tsx` | Social sharing buttons |
| `AffiliateCTA` | `src/components/AffiliateCTA.tsx` | Affiliate call-to-action |
| `JsonLdSchema` | `src/components/landing/JsonLdSchema.tsx` | Structured data |
| `FallbackImage` | `src/components/FallbackImage.tsx` | Graceful image error handling |

## Design System
- Colors defined as HSL CSS variables in `src/index.css`
- Tailwind configured in `tailwind.config.ts` with semantic tokens
- Use `--background`, `--foreground`, `--primary`, `--accent`, etc. — never hardcode colors
- Both light and dark mode supported

## SEO / GEO Strategy
- JSON-LD schema on landing page (`WebPage`, `Organization`, `CollectionPage`)
- E-E-A-T signals throughout (founder bio, methodology, exclusive interviews)
- Semantic HTML with single H1 per page
- `react-helmet-async` for per-page meta tags
- `robots.txt` in public folder

## Affiliate Strategy
- Low-barrier programs first (Stay22, SafetyWing, Amazon Associates)
- `AffiliateCTA` component for consistent placement
- Prominent disclosure on relevant pages
