# Responsible AI and Source Transparency

## Prototype truthfulness

This release is a front-end prototype. The chapter, visual explanations, notes and quiz questions are prepared sample data. The PDF picker is only an entry-point demonstration. It does not parse documents, invoke a model or generate new material. The UI must not be presented as a production AI pipeline.

## Proposed production behaviour

1. **Ground outputs in the uploaded source.** Attach a chapter section/page reference to generated explanations, diagrams, notes and questions.
2. **Separate source from transformation.** Label original textbook text, AI-generated explanations and student edits distinctly.
3. **Show uncertainty.** If source extraction is incomplete or the system is unsure of a diagram, say so and offer the original page rather than inventing a representation.
4. **Support verification.** Let the student open the referenced PDF page beside the generated resource.
5. **Keep student control.** Students can edit, save, remove or regenerate a resource and should understand when content is changed.
6. **Minimise personal data.** A hackathon prototype does not need account data, student IDs or academic records.
7. **Avoid false mastery claims.** Quiz completion and note viewing are not proof of retention. Any future progress score should explain what it measures.

## Design safeguards

- Source-page chip remains visible beside the concept.
- Prepared demo content has an explicit label.
- Quiz feedback contains a concise explanation and source reference.
- Concept status is a navigation aid, not a certified mastery score.
- The original textbook remains available as the authoritative source.

## Relevant guidance

UNESCO's guidance on generative AI in education and research: https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research