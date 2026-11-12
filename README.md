# CONCEPTOR
### Beyond text. Into understanding.

CONCEPTOR is a visual-first learning workspace for students. It turns a textbook chapter into concept-centred explanations, static diagrams, interactive demonstrations, concise notes and quizzes. Learning resources remain organised in a persistent library so students can reopen them directly instead of searching through a long chat transcript.

**Team:** DesignOps  
**Event:** Pixelathon V1.0  
**Track:** 04 — Escape the Chatbox

## Product principles

- Choose the representation that best explains the concept: diagram, flowchart, interactive model or step sequence.
- Keep the original source and page reference visible.
- Make generated learning resources reusable and searchable.
- Support notes and quizzes as part of the learning workflow.
- Prefer clear, accessible interactions over decorative motion.

## Prototype scope

The current prototype uses a prepared Operating Systems / Process Management sample chapter. It includes concept navigation, process-state explanations, a CPU scheduling explorer (FCFS, SJF and Round Robin), context-switching steps, a searchable local learning library, note formats, and quiz feedback.

This is a frontend demonstration. PDF extraction and live AI generation are not implemented; sample content is prepared and labelled as demo content. Local interactions run in the browser.

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm run dev
```

Open http://localhost:4173.

```bash
npm run build
npm run preview
npm test
```

The project uses Node's built-in server and build tooling. Anime.js 4 is loaded from jsDelivr as a progressive animation enhancement; the application still renders if the CDN is unavailable. Reduced-motion preferences are respected.

## Project structure

- `index.html` — application shell
- `src/app.js` — interactions and sample learning content
- `src/styles.css` — responsive visual system
- `assets/` — brand mark
- `docs/` — product, UX, research, AI, accessibility and demo documentation
- `.github/workflows/` — CI and GitHub Pages deployment

## Third-party software

Anime.js is used under its MIT licence. See [THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md).

## Team and contribution

See [CONTRIBUTING.md](CONTRIBUTING.md) and [PRODUCT_BRIEF.md](PRODUCT_BRIEF.md).


## Live project links

- **Live prototype:** https://conceptor-mdibrahim-uxs-projects.vercel.app
- **GitHub repository:** https://github.com/mdibrahim-ux/conceptor
- **Figma product screens:** https://www.figma.com/design/Nif78x99SAw2RiT1UpJikF
- **Canva strategy pitch:** https://www.canva.com/d/nt3L-yKQPCafOiM

The Vercel project is connected to this GitHub repository and deploys from `main`.
