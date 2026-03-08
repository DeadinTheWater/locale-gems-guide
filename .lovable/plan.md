

## Problem Diagnosis

The recurring issue is that Facebook's crawler can sometimes see the `og:image` meta tag but the actual image file either doesn't meet Facebook's requirements or isn't reliably served. The root causes:

1. **Inconsistent source image dimensions** — Hero images in `public/images/posts/` are uploaded at various sizes. Some may be under Facebook's 200x200px minimum or the recommended 1200x630px.
2. **Declared vs actual mismatch** — The OG script hardcodes `og:image:width=1200` and `og:image:height=630` regardless of the actual image dimensions. If Facebook detects a mismatch, it may silently drop the preview.
3. **No validation step** — There's nothing in the build pipeline that catches undersized images before deploy.

## Proposed Solution: Build-Time Image Validation & Resize Script

Add a new build script (`scripts/validate-og-images.mjs`) that runs before the OG page generation step. It will:

1. **Install `sharp` as a dev dependency** — A fast, zero-config image processing library for Node.js.
2. **Read `posts.json`** — Iterate over every post's `image` field.
3. **Check each hero image's actual dimensions** using `sharp`.
4. **If an image is under 1200x630**, resize it (cover-crop to 1200x630) and overwrite the file in `dist/` (not the source — the built output).
5. **Log warnings** for any image that was resized, so you know which source files to eventually replace.
6. **Fail the build** if any image file is missing entirely.

### Changes

**New file: `scripts/validate-og-images.mjs`**
- Reads `posts.json`, resolves each `post.image` path against `dist/`
- Uses `sharp` to read dimensions
- If width < 1200 or height < 630, resizes to 1200x630 (cover mode, center gravity) and overwrites the dist copy
- Logs a summary of all validated/resized images

**Modified: `package.json`**
- Add `sharp` as a devDependency
- Update build script to: `"build": "vite build && node scripts/validate-og-images.mjs && node scripts/generate-og-pages.mjs"`

**Modified: `scripts/generate-og-pages.mjs`**
- Instead of hardcoding 1200x630, read the actual dimensions from the (now validated) image file and use those values in the `og:image:width` and `og:image:height` tags. This eliminates any declared-vs-actual mismatch.

### Build Pipeline Flow

```text
vite build
    ↓
validate-og-images.mjs  (check/resize hero images in dist/)
    ↓
generate-og-pages.mjs   (generate static HTML with accurate dimensions)
    ↓
cp index.html 404.html
```

This is a permanent fix because every future build will automatically validate and correct images before they reach Facebook's crawler.

