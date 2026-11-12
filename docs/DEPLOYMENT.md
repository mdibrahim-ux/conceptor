# Deployment

## Local preview

- Run `npm ci`.
- Run `npm run dev` and open `http://localhost:4173`.
- Run `npm run build` to create the static `dist/` directory.
- Run `npm run preview` to serve the built site.

## GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds the project and publishes `dist/` on every push to `main`.

In GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions** if it is not already selected. The first deployment may take a few minutes. The Pages URL will be shown in the Actions run and in Settings → Pages.

## Runtime notes

The application is static and requires no environment variables or backend. Anime.js is loaded from a version-pinned jsDelivr ESM URL as a progressive enhancement. The learning experience remains usable if that CDN is unavailable.
