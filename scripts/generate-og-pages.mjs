/**
 * Post-build script: generates static HTML files for each blog post route
 * with correct Open Graph meta tags so social media crawlers (Facebook,
 * Twitter, LinkedIn, etc.) can read them without executing JavaScript.
 *
 * SOP: Run this after every `vite build`. The npm "build" script does this
 * automatically. When adding a new post to posts.json, no extra steps are
 * needed — the next build will pick it up.
 */

import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SITE = "https://interestinghere.com";

const posts = JSON.parse(readFileSync(join(ROOT, "src/content/posts.json"), "utf-8"));
const cities = JSON.parse(readFileSync(join(ROOT, "src/content/cities.json"), "utf-8"));

// Read the built index.html to reuse its <body> (SPA bootstrap)
const indexHtml = readFileSync(join(DIST, "index.html"), "utf-8");

// Extract everything inside <body>…</body> so the SPA still boots for real visitors
const bodyMatch = indexHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/);
const bodyContent = bodyMatch ? bodyMatch[1] : '<div id="root"></div>';

// Extract asset links (CSS, preloads) from the built index.html <head>
const headAssets = [];
const linkRegex = /<link[^>]+>/g;
let m;
while ((m = linkRegex.exec(indexHtml)) !== null) {
  // Keep stylesheet and modulepreload links
  if (m[0].includes("stylesheet") || m[0].includes("modulepreload")) {
    headAssets.push(m[0]);
  }
}

function buildPage(post, citySlug) {
  const postUrl = `${SITE}/${citySlug}/${post.id}`;
  const imageUrl = `${SITE}${post.image}`;
  const title = post.title;
  const description = post.excerpt;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} | InterestingHere</title>
  <meta name="description" content="${escapeAttr(description)}" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeAttr(title)}" />
  <meta property="og:description" content="${escapeAttr(description)}" />
  <meta property="og:url" content="${postUrl}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:secure_url" content="${imageUrl}" />
  <meta property="og:site_name" content="InterestingHere" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(title)}" />
  <meta name="twitter:description" content="${escapeAttr(description)}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="twitter:site" content="@interestinghere" />

  <link rel="canonical" href="${postUrl}" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
  <link rel="icon" type="image/png" href="/favicon.png?v=3" />
  ${headAssets.join("\n  ")}
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let count = 0;

for (const post of posts) {
  // cityId in posts matches slug in cities
  const citySlug = post.cityId;
  const dir = join(DIST, citySlug, post.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), buildPage(post, citySlug));
  count++;
}

// Also generate pages for city hub routes
for (const city of cities) {
  const dir = join(DIST, city.slug);
  // Don't overwrite if a post already created this directory with an index.html
  const cityIndexPath = join(dir, "index.html");
  const cityUrl = `${SITE}/${city.slug}`;

  const cityPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(city.name)} Hidden Gems | InterestingHere</title>
  <meta name="description" content="${escapeAttr(city.description)}" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeAttr(city.name)} — Hidden Gems & Local Experiences" />
  <meta property="og:description" content="${escapeAttr(city.description)}" />
  <meta property="og:url" content="${cityUrl}" />
  <meta property="og:site_name" content="InterestingHere" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(city.name)} — Hidden Gems & Local Experiences" />
  <meta name="twitter:description" content="${escapeAttr(city.description)}" />
  <meta name="twitter:site" content="@interestinghere" />

  <link rel="canonical" href="${cityUrl}" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
  <link rel="icon" type="image/png" href="/favicon.png?v=3" />
  ${headAssets.join("\n  ")}
</head>
<body>
  ${bodyContent}
</body>
</html>`;

  mkdirSync(dir, { recursive: true });
  writeFileSync(cityIndexPath, cityPage);
}

console.log(`✅ Generated OG meta pages for ${count} posts and ${cities.length} city hubs.`);
