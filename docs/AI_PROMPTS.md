# AI Prompt Register — Prototype Disclosure

The hackathon evaluation requests the project link, libraries and AI prompts. This register provides candidate prompts for a future grounded AI pipeline and documents the intended prompt format for the submission. These prompts were not invoked by the current prototype; the runnable experience uses manually prepared sample data and does not call a live AI service.

## Prompt 1 — Concept explanation and representation choice

> You are an educational content designer. Using only the supplied textbook excerpt, identify the central concept and propose the most useful learning representation. Choose one of: concise text explanation, static diagram, flowchart, interactive visualisation or step-by-step animation. Explain why that representation fits. Provide a short explanation, the key labels or interaction states, and precise page/section references. Do not invent information that is absent from the source. If the source is insufficient, state what is missing.

## Prompt 2 — Interactive visualisation specification

> Convert the supplied textbook explanation of CPU scheduling into a small interactive learning specification. Define the user-adjustable inputs, expected output visualisation, algorithm assumptions, step sequence and source references. Keep the example beginner-friendly. State assumptions such as arrival times and quantum. Include a numerical example that can be independently checked. Do not claim the visualisation is a production operating-system simulator.

## Prompt 3 — Study notes variants

> Create three source-grounded versions of these notes: (1) quick revision, (2) detailed explanation, and (3) exam-ready summary. Preserve essential definitions and distinctions. Keep each section scannable. Attach source-page references. Do not add unsupported examples or claim completeness if the excerpt is incomplete.

## Prompt 4 — Quiz and feedback

> Generate four multiple-choice questions from the supplied excerpt. For every question provide one correct answer, plausible distractors, a concise explanation for the correct answer, an explanation of the misconception behind the most tempting distractor, and a source-page reference. Include at least one question that checks application rather than recall. Avoid ambiguous wording.

## Current prototype implementation note

The sample diagrams, notes and multiple-choice questions are authored demonstration fixtures. The scheduling visualisation is calculated in browser JavaScript using the documented assumptions. No AI model was invoked to generate or grade a student upload in this prototype.

## Human review / manual implementation notes

- The Operating Systems example is prepared sample content for a UX demonstration.
- The CPU scheduling chart is calculated locally in JavaScript from explicit assumptions (all arrival times are zero).
- UI labels, concept relationships, notes and example questions were manually curated for this prototype.
- No generated answers are represented as a verified extraction from a specific student's uploaded PDF.