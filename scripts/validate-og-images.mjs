/**
 * Build-time script: validates and resizes hero images for OG meta tags.
 * Ensures every post hero image in dist/ is at least 1200x630px.
 * Undersized images are cover-cropped to 1200x630 in the dist/ copy only.
 *
 * Run after `vite build` and before `generate-og-pages.mjs`.
 */

import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;

const posts = JSON.parse(readFileSync(join(ROOT, "src/content/posts.json"), "utf-8"));

let resized = 0;
let valid = 0;
let errors = 0;

for (const post of posts) {
  const imagePath = post.image; // e.g. "/images/posts/nyc/nyc-gems-hero.jpg"
  const distPath = join(DIST, imagePath);

  if (!existsSync(distPath)) {
    console.error(`❌ MISSING: ${imagePath} (post: ${post.id})`);
    errors++;
    continue;
  }

  try {
    const metadata = await sharp(distPath).metadata();
    const { width, height } = metadata;

    if (width < TARGET_WIDTH || height < TARGET_HEIGHT) {
      console.warn(
        `⚠️  RESIZING: ${imagePath} (${width}x${height} → ${TARGET_WIDTH}x${TARGET_HEIGHT}) [post: ${post.id}]`
      );

      const buffer = await sharp(distPath)
        .resize(TARGET_WIDTH, TARGET_HEIGHT, {
          fit: "cover",
          position: "centre",
        })
        .jpeg({ quality: 85 })
        .toBuffer();

      // Write back to dist (not source)
      const { writeFileSync } = await import("fs");
      writeFileSync(distPath, buffer);
      resized++;
    } else {
      valid++;
    }
  } catch (err) {
    console.error(`❌ ERROR processing ${imagePath}: ${err.message}`);
    errors++;
  }
}

console.log(
  `\n📊 OG Image Validation: ${valid} valid, ${resized} resized, ${errors} errors (${posts.length} total posts)`
);

if (errors > 0) {
  console.error("⛔ Build failed: missing or unprocessable hero images.");
  process.exit(1);
}

console.log("✅ All hero images validated for OG meta tags.");
