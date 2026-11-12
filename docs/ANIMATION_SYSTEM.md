# Conceptor animation system

Conceptor uses **Anime.js v4.5.0** for short, explanatory UI motion. The application imports the official ESM bundle through an import map in `index.html`:

- Source: https://github.com/juliangarnier/anime
- Documentation: https://animejs.com/documentation/
- Version pinned: `4.5.0`
- License: MIT (Julian Garnier, 2025)

## Where it is used

- **Process-state diagram:** nodes enter in a staggered sequence so learners can scan the model from left to right.
- **CPU scheduling:** Gantt segments reveal in execution order; schedule calculations remain Conceptor's own local JavaScript.
- **Context switching:** CPU/PCB visual elements animate as learners step through save and restore. The sequence remains user-controlled.
- **Chapter outline, resource cards, notes and quiz options:** restrained reveals clarify newly rendered content.

## Accessibility and resilience

- The app checks `prefers-reduced-motion` and skips Anime.js motion when the user requests reduced motion.
- Anime.js is dynamically imported; if the CDN is unavailable, the core learning interface remains usable without enhanced motion.
- Motion does not convey information that is absent from text, labels or the underlying diagram.
- No continuous, attention-grabbing animation loops are used.

## Runtime dependency

The import map pins the browser module to `animejs@4.5.0` on jsDelivr. The dev server and static build still use Node.js built-ins. A browser needs network access to jsDelivr for enhanced motion; all other prototype interactions remain local.