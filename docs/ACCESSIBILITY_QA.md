# Accessibility and Usability QA Checklist

## Implemented design measures

- Semantic buttons, labels, headings and sections.
- Accessible names for navigation, search and quiz controls.
- Visible focus outlines on keyboard-operable controls.
- Selected states use text/status indicators as well as colour.
- Quiz feedback uses an `aria-live` region.
- Resource cards support keyboard Enter/Space activation.
- Reduced-motion preference is respected.
- Mobile layout collapses navigation and reflows content.

## Manual checks before judging

- [ ] Navigate all primary views using Tab, Shift+Tab, Enter and Space.
- [ ] Confirm selected concept, active navigation and saved states are understandable without relying on colour alone.
- [ ] Check normal text contrast against WCAG 2.2 AA target (4.5:1 for normal text).
- [ ] Confirm important mobile controls are comfortably tappable (aim for 44 × 44 CSS px).
- [ ] Check a 320 CSS px viewport for horizontal page overflow.
- [ ] Check that changing scheduling inputs updates both chart and metrics.
- [ ] Check that a saved resource can be reopened from the library.
- [ ] Check that an incorrect quiz answer produces a useful explanation and source reference.
- [ ] Confirm the PDF picker message does not imply real PDF extraction.
- [ ] Check the app at 200% browser zoom.

## Standards reference

WCAG 2.2: https://www.w3.org/TR/WCAG22/