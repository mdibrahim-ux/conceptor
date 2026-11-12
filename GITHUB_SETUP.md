# GitHub and deployment setup

The repository is: https://github.com/mdibrahim-ux/conceptor

## Local setup

Requirements: Node.js 18 or newer.

```bash
git clone https://github.com/mdibrahim-ux/conceptor.git
cd conceptor
npm ci
npm run dev
```

Open http://localhost:4173.

## Validate and build

```bash
node --check src/app.js
npm run build
npm test
npm run preview
```

The build creates a static site in `dist/`. No backend, environment variables or live AI API are required for this prototype.

## GitHub Actions

Two workflows are included:

- `.github/workflows/ci.yml` runs syntax, build and smoke checks on pushes and pull requests to `main`.
- `.github/workflows/deploy-pages.yml` builds `dist/` and deploys it to GitHub Pages on pushes to `main`.

To enable Pages, open **Repository → Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions** if it is not already configured. Once the deployment workflow succeeds, GitHub will show the public site URL in Settings → Pages and in the workflow environment summary.

## Anime.js

Conceptor uses Anime.js 4.5.0 from its official, version-pinned ESM browser bundle. Enhanced motion requires browser access to jsDelivr. Core learning interactions remain available without the animation CDN. Third-party attribution is in `docs/THIRD_PARTY_NOTICES.md`.

## Prototype boundary

The current Operating Systems / Process Management content is prepared sample material. The PDF picker is a demo entry point; live PDF extraction and AI generation are not implemented. The browser interactions, scheduler examples, quiz and local saved-resource library are functional.
