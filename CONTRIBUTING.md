# Contributing to CONCEPTOR

Thanks for helping improve the Conceptor visual-learning prototype.

## Local setup

- Node.js 20 or newer
- `npm ci`
- `npm run dev`

## Before opening a pull request

Run:

```bash
npm run lint
npm run build
npm test
```

## Product principles

1. Keep the primary experience outside a conventional chat window.
2. Choose static diagrams, flowcharts, animations or interactive models based on the concept—not for decoration.
3. Keep source references visible and distinguish sample/demo content from verified source content.
4. Keep saved learning resources easy to retrieve.
5. Respect keyboard navigation, visible focus and `prefers-reduced-motion`.
6. Avoid adding backend services or API integrations unless they are essential to the experience being demonstrated.

## Prototype boundary

The current Operating Systems chapter uses prepared sample content. Do not describe the PDF picker as real PDF extraction or claim that live AI generation is implemented.