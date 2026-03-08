Master Project Handoff 2.0:
InterestingHere.com - Authority Hub &
GEO Strategy
Domain: https://interestinghere.com
Repository: https://github.com/DeadinTheWater/locale-gems-guide
1. Executive Summary
This document outlines the updated strategy and technical architecture for
InterestingHere.com, transforming it from a minimalist guide site into an "Authority Hub"
optimized for Generative Engine Optimization (GEO ) and affiliate marketing. It details a
new content workflow leveraging unique insider interviews and a phased growth model for
future niche satellite sites. This document replaces all previous project handoff
documentation.
2. Strategic Vision & Objectives
• Overall Goal: Establish InterestingHere.com as the leading authority for authentic,
expert-curated local travel experiences, driving traffic through GEO and converting
users via strategic affiliate partnerships.
• Generative Engine Optimization (GEO): Prioritize content structure, schema markup,
and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals to
ensure high visibility and citation by AI search engines (e.g., Google AI Overviews,
Perplexity).
• Affiliate Marketing: Integrate clear calls to action and strategically place affiliate
opportunities, focusing initially on low-barrier programs and building trust for future
partnerships.
• Content Strategy: Leverage unique access to local event organizers and cultural
insiders to create exclusive, high-value content that AI cannot replicate.
3. Technical Architecture (Unchanged Core)
• Frontend: React + TypeScript.
• Build Tool: Vite.
• Styling: Tailwind CSS and Framer Motion for animations.
• Data Layer: Content is primarily driven by local JSON files located in src/content/ (e.g.,
cities.json , posts.json ).
• Deployment: Automated via GitHub Actions, deploying the dist folder to GitHub Pages.
• Vite Config: vite.config.ts with base: '/' for relative asset paths.
4. New Landing Page Structure & Components
The landing page ( src/pages/Home.tsx or equivalent) will be restructured to the following
sections, designed for scale and future content integration. Placeholders will be used where
content/partnerships are not yet established.
A. Hero Section
• Visuals: Dynamic background (video or high-quality image) provided by the user (e.g.,
hero-background-video.mp4 ).
• Headline (H1): "Beyond the Guidebook: Authentic Travel, Expertly Curated."
• Sub-headline (H2): "Discover and book unique tours, hidden gems, and local
experiences hand-picked by our travel experts. Your next unforgettable story starts
here."
• Call to Action (CTA): Prominent search bar ( <input type= 'text'> ) with placeholder "Find
Your Next Adventure (e.g., 'hidden cafes in Kyoto')".
B. Featured Destinations Section
• Showcase Top 5 Affiliate-Ready Cities (New York, London, Honolulu, Kyoto, Los Angeles)
with compelling images/videos (e.g., london-featured-image.jpg , london-featuredvideo.
mp4 ).
• Brief description and CTA linking to respective city guide pages on interestinghere.com .
C. "Why Trust InterestingHere?" Section (E-E-A-T & Trust Signals)
• Our Promise: "We believe in travel that transforms. Our guides are built on genuine
experiences, local insights, and a passion for discovery."
• Meet Our Experts: Founder bio initially, with placeholders for future expert profiles.
• Our Methodology / Verified Insights: Visually appealing icons and text (e.g., iconhuman-
curated.svg ) for "100% Human Curated," "Direct Insider Access," "Hidden Gem
Verified."
D. Themed Collections / "Story-Driven" Categories
• Sections for themes like "Culinary Journeys," "Urban Adventures," "Historical Hidden
Gems" with evocative images (e.g., theme-culinary-journeys.jpg ).
• Links to category pages on interestinghere.com .
E. Latest from the Journal
• Renamed section for recent interview-based articles, with clear titles, excerpts, and
visuals (e.g., journal-london-promoter-interview.jpg ).
F. Full City Directory
• Visually engaging list or map of all cities, located further down the page, with optional
small city icons/images (e.g., city-icon-paris.svg ).
5. Content Management (Updated)
• Cities Data: src/content/cities.json (will be updated to support new featured cities and
potentially thematic groupings).
• Post Data: src/content/posts.json (will be updated to include new interview-based
articles).
• Images & Videos: Store new media in public/images/ and public/videos/ respectively.
Reference them in JSON files. All media assets will be provided by the user according
to the Media Procurement & Asset Specification List .
6. Generative Engine Optimization (GEO) Integration
• Schema Markup: Implement comprehensive JSON-LD Schema markup across the
landing page and all content pages. Key types:
• WebPage , CollectionPage , Organization (including founder property).
• Use hasPart or mainEntity to link related content.
• E-E-A-T Signals: Explicitly integrate founder bio, methodology, and unique content
(interviews) to signal Experience, Expertise, Authoritativeness, and Trustworthiness to
AI models.
• Internal Linking: Strategic internal linking to distribute link equity and guide AI
crawlers.
• Accessibility & Performance: Maintain high standards for accessibility and fast loading
times.
7. Content Workflow: "Interview-to-Article" Engine
This is the core content generation process:
1. Capture: Conduct 15-minute video/audio interviews with local experts (promoters,
performers, directors).
2. Transcribe: Use AI transcription tools (e.g., Otter.ai, Descript) to convert interviews to
text.
3. Transform: Use the "Unified Restructuring Prompt" (for content generation, not site
architecture) and the "Prompt Engineering Guide" to turn transcripts into GEOoptimized
blog posts for interestinghere.com .
4. Distribute: Upload videos to YouTube (e.g., "InterestingHere Interviews" channel).
Embed YouTube videos within corresponding blog posts on interestinghere.com .
8. Affiliate Marketing Strategy
• Early Stage Focus: Prioritize low-barrier affiliate programs (e.g., Stay22, SafetyWing,
Amazon Associates) and those within Travelpayouts with instant approval.
• Content-Driven Approval: Leverage unique interview content to gain approval from
more selective programs. Highlight exclusive access to local experts in applications.
• Disclosure: Maintain prominent affiliate disclosure on all relevant pages.
9. Open Graph / Social Sharing SOP

The site is deployed as a static SPA on GitHub Pages, which means social media
crawlers cannot execute JavaScript. To solve this, a **post-build script**
(`scripts/generate-og-pages.mjs`) generates static HTML files with hardcoded
OG meta tags for every post and city route.

### How it works
1. After `vite build`, the **image validation script** (`scripts/validate-og-images.mjs`) runs first. It checks every post's hero image in `dist/` against the 1200×630px minimum. Undersized images are automatically cover-cropped and resized to 1200×630 in the `dist/` copy (source files are not modified). Missing images fail the build.
2. Then the **OG page generation script** (`scripts/generate-og-pages.mjs`) runs. It reads `src/content/posts.json` and `src/content/cities.json`.
3. For each post, it creates `dist/{citySlug}/{postId}/index.html` with:
   - Full `og:title`, `og:description`, `og:image`, `og:url` meta tags
   - Twitter Card meta tags (`summary_large_image`)
   - Canonical URL
   - All CSS/JS assets from the Vite build (so the SPA still boots for real visitors)
4. For each city, it creates `dist/{citySlug}/index.html` with similar OG tags.

### Adding a new post — no extra steps needed
- Add the post entry to `src/content/posts.json` with `image` pointing to the hero image path (e.g., `/images/posts/city/hero.jpg`).
- Place the hero image in `public/images/posts/{city}/`.
- The next `npm run build` (or GitHub Actions deploy) automatically generates the OG page.

### Key constraints (DO NOT change without testing)
- The script extracts `<link>` tags (stylesheets + modulepreloads) and `<script type="module">` tags from the built `index.html`. **Both are required** — missing scripts = blank page, missing links = broken styles.
- The `SITE` constant is hardcoded to `https://interestinghere.com`. Update it if the domain changes.
- Hero images referenced in `og:image` must be absolute URLs (the script prepends `SITE`).

### Testing social previews
- Push to GitHub → wait for deploy.
- Test URL in [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
- Test URL in [Twitter Card Validator](https://cards-dev.twitter.com/validator).
- If previews are stale, use "Scrape Again" / "Fetch new information" in the debugger tools.

### Common pitfalls (lessons learned)
| Problem | Cause | Fix |
|---------|-------|-----|
| Blank page on post URLs | Script didn't include `<script type="module">` tags | Ensure `scriptRegex` captures module scripts |
| Broken formatting/styles | Script didn't capture all `<link>` tags (self-closing vs standard) | Use permissive regex: `/<link[^>]*\/?>/g` |
| OG image not showing | Image path is relative, not absolute | Script prepends `SITE` constant to `post.image` |

10. Growth Prioritization: "Hub and Spoke" Model
• Phase 1 (70% Effort): InterestingHere.com (The Hub): Focus all technical and content
generation efforts on building interestinghere.com as the primary authority site. This
includes the landing page restructure and all new interview-based articles.
• Future Phases (30% Effort): Niche Satellite Sites (The Spokes): Delay launching
niche domains (e.g., interestingthingstodoinlondon.com ) until interestinghere.com has a
critical mass of high-quality, city-specific content (e.g., 5-10 exclusive
interviews/articles per city). Satellite sites will feature hyper-local, differentiated
content and link back to the main site.
