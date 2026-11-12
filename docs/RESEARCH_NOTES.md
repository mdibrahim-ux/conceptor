# Research Notes — Competitive and User-Problem Landscape

## Scope and caveat

This is a focused desk-research register to guide a hackathon prototype. Product features change, repositories evolve, and GitHub stars/issues are time-sensitive. Validate the latest README, licence, implementation and release status before reusing any code. Reddit posts are qualitative anecdotes, not representative research.

## Team discovery

The team’s student discovery identified two primary friction points:

- **Text-only transformation:** PDF-to-AI workflows can give students another block of text that overlaps with their source. Students want a diagram, flow, animation or interactive model when that representation improves comprehension.
- **Conversation-history retrieval:** students struggle to locate an earlier explanation after many prompts and responses. They want persistent, topic-based access to useful study resources.

The prototype is designed to test these two problems directly.

## Similar products and open-source projects reviewed

| Product / repository | Relevant observed direction | What Conceptor should learn — without copying |
|---|---|---|
| [Google NotebookLM](https://notebooklm.google/) | Source-grounded notebooks and multiple study transformations | Source transparency matters; do not position simple PDF summarisation as unique. |
| [Quizlet](https://quizlet.com/) | Study sets, flashcards, practice and AI-assisted study tools | Practice needs a focused interaction, not just generated content. |
| [Knowt](https://knowt.com/) | Notes, study guides and practice from uploaded material | Students need control and editability over generated study assets. |
| [Get It](https://github.com/beltromatti/get-it) | Document-centred learning with visual explanations, concept structures and practice | Visual learning and quiz generation already exist in competing prototypes; differentiation must be in the whole workflow and usability. |
| [DeepTutor](https://github.com/HKUDS/DeepTutor) | Broad agentic learning workspace with multiple learning modes | Shared learning context across modes is useful, but its scope is far larger than this hackathon. |
| [nano-NotebookLM](https://github.com/ArthurYangX/nano-NotebookLM) | Notes, knowledge maps, source references and quizzes | Traceability from generated item to original page is valuable. |
| [StudyForge](https://github.com/Akhilvallala1/studyforge) | Concept mastery and adaptive revision | A missed concept should have a direct path back to learning and practice. |
| [MK-QuizFlow](https://github.com/mk-knight23/MK-QuizFlow) | PDF-to-quiz and flashcard workflow | A bounded, browser-friendly practice flow can be shown without large infrastructure. |
| [Open SourcED](https://github.com/BlueRaddish/open-sourced) | Multiple active-recall modes and editable study sets | Learning resources should be reusable and editable, not disposable chat output. |

## Reddit discussion themes previously surfaced

The earlier Reddit review included discussions in r/notebooklm, r/Gemini_Notebook, r/studytips and r/medicalschoolanki. The recurring qualitative themes were:

- Some students find generated study guides too verbose or less structured than the source material they want.
- Students describe manually verifying AI-generated flashcards and summaries against the textbook.
- Students value active recall and reviewing the source section after an incorrect answer.
- Organisation and retrieval of notes/PDFs can consume time that students would rather spend studying.

Example discussions:

- [NotebookLM study workflow and lengthy output](https://www.reddit.com/r/notebooklm/comments/1xdc2zc/notebooklm_ruined_my_study_workflow_looking_for/)
- [Students using NotebookLM as a study buddy](https://www.reddit.com/r/Gemini_Notebook/comments/1w01jfc/anyone_else_using_notebooklm_as_their_study_buddy/)
- [AI flashcard coverage and verification](https://www.reddit.com/r/medicalschoolanki/comments/1r308t2/pdf_in_flashcards_by_ai/)
- [Finding notes and PDFs during study](https://www.reddit.com/r/Gemini_Notebook/comments/1wtscj1/notebooklm_exposed_how_much_time_i_waste_studying/)

Treat these as individual user experiences, not evidence of market-wide prevalence.

## Learning-design rationale

- Retrieval practice has evidence as a learning technique; see Karpicke & Roediger, *Science* (2008): https://doi.org/10.1126/science.1152408
- Cognitive-load and multimedia design principles can guide segmentation, signalling and visual/text pairing; see a review in *Educational Psychology Review*: https://pmc.ncbi.nlm.nih.gov/articles/PMC7940870/

These principles inform the separation of the chapter outline, concise concept explanation, visual representation and practice feedback. They do not validate this specific product without user testing.

## Open questions to validate with students

1. Which concepts are hardest to understand from text alone, and what representation helps most?
2. Should students request a visual, or should the system recommend one and explain why?
3. Do students prefer a chapter tree, a visual concept map, search, or a combination for retrieving saved resources?
4. Which note formats actually help their study workflow?
5. Do source-page references improve trust and help them verify completeness?
6. What should happen when AI cannot confidently identify a useful visual representation?