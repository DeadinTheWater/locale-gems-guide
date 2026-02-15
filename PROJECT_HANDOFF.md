# Project Handoff: Locale Gems Guide
**Domain:** https://interestinghere.com
**Repository:** https://github.com/DeadinTheWater/locale-gems-guide

## 1. Executive Summary
This project is a data-driven React application built using Vite and TypeScript. It is hosted on GitHub Pages and uses a custom domain managed via Dynadot.

## 2. Technical Architecture
* **Frontend:** React + TypeScript.
* **Build Tool:** Vite.
* **Data Layer:** Local JSON files located in `src/content/`.
* **Deployment:** Automated via GitHub Actions.

## 3. Critical Configuration Files

### A. Deployment Workflow
**Path:** `.github/workflows/main.yml`
This file automates the build process. It installs dependencies, runs the Vite build, and deploys the `dist` folder to the GitHub Pages server.
*Note: If the site stops updating, check the "Actions" tab in GitHub for errors in this workflow.*

### B. Vite Config
**Path:** `vite.config.ts`
**Important Setting:** `base: '/'`.
This ensures that all asset paths (CSS, JS, Images) are relative to the root of your custom domain.

## 4. Content Management
To update the website without changing code, edit these files:
* **Cities Data:** `src/content/cities.json`.
* **Post Data:** `src/content/posts.json`.
* **Images:** Store new images in `public/images/` and reference them in the JSON files.

## 5. Troubleshooting for Future AI Assistants
If using a new AI model to help with this project, provide this prompt:
> "I have a Vite/React project on GitHub at interestinghere.com. It uses GitHub Actions to build from the 'main' branch. Content is stored in 'src/content/' as JSON. The 'base' in vite.config.ts is '/'. Please help me with [Task Name]."
