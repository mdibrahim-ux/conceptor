# UX Architecture — CONCEPTOR

## Primary information architecture

- **Overview** — resume the most recent chapter and access saved resources.
- **My Chapters** — chapter outline, progress and concept-centred learning canvas.
- **Visual Library** — saved diagrams, interactive models, animations, notes and quizzes; searchable and filterable.
- **Notes & Quizzes** — switch between structured notes and active-recall practice.

## Core journey

```text
Open chapter
   ↓
Choose concept from chapter outline
   ↓
Read the short explanation + source reference
   ↓
Explore the most suitable representation
   ├─ Static diagram: inspect labelled states/parts
   ├─ Interactive model: adjust parameters and observe changes
   └─ Animated sequence: step through the process
   ↓
Save useful resource
   ↓
Return via Visual Library, search or concept outline
   ↓
Review notes / take quiz / revisit weak concept
```

## Screen responsibilities

### Chapter Workspace

- Show chapter name, source pages and exploration progress.
- Keep chapter navigation visible beside the learning canvas.
- The canvas content changes with the selected concept.
- Static diagram nodes are selectable and reveal details.
- Interactive models expose only a small set of meaningful controls.
- The original textbook remains the source of truth; the demo labels its prepared material.

### Visual Resource Library

- Display a resource type, concept, chapter/page source and one-line description.
- Support search and type filters.
- Opening a resource navigates back to its owning concept instead of reproducing a buried chat response.
- Save state is local to the browser in this prototype.

### Notes & Quizzes

- Notes support quick revision, detailed notes and exam-ready variants.
- Quiz shows one question at a time, immediate explanation and a source reference.
- A missed concept maps back to a related chapter concept.
- Prototype questions are prepared examples, not live AI-generated assessments.

## Interaction states to cover

- Empty library: explain how to save the first resource.
- No search matches: offer a clear search/filter reset path.
- Selected/active concept: distinct background, label and status.
- Saved/unsaved resource: state is communicated through icon and text, not colour alone.
- Quiz unanswered: disable check action.
- Correct/incorrect answer: show explanation and source reference.
- Context-switch sequence: previous/next and replay.
- PDF picker: clearly disclose that local file selection does not trigger real PDF parsing in this prototype.

## Navigation decision

Use the concept list as the primary short-path navigation and the Visual Library as a second retrieval path. Do not reproduce a chat transcript as the information architecture. This addresses the team's observed scrolling/retrieval pain point.

## Responsive rules

- Desktop: persistent left navigation, chapter outline beside the visual canvas.
- Tablet: compact navigation and stacked or collapsible outline.
- Mobile browser: off-canvas navigation; single-column cards and controls; diagram reflows; no horizontal page overflow.
- Every essential action must work by tap/click; hover is decorative only.