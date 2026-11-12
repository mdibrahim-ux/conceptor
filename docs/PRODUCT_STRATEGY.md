# Product Strategy — CONCEPTOR

## Product definition

**CONCEPTOR** is a visual-first learning workspace that transforms a textbook chapter into a navigable set of concept explanations, contextual static diagrams, interactive visualisations, concise notes and practice resources. Each resource is attached to a concept and source reference so it can be reopened directly.

**Tagline:** Beyond text. Into understanding.  
**Team:** DesignOps  
**Competition:** Pixelathon V1.0 · Track 4 — Escape the Chatbox

## Problem framing

The team’s student discovery surfaced two connected problems:

1. When students upload a PDF to a conventional AI tool, the answer is often more text that rearranges or paraphrases information already in the PDF. That does not necessarily make a difficult concept easier to understand. Students want a visual representation where the topic genuinely benefits from one.
2. Once several prompts and responses accumulate, returning to a useful earlier explanation requires scrolling through conversation history. The information exists but is difficult to retrieve.

These are qualitative observations shared by the team, not a representative survey. The prototype should be treated as a test of the proposed interaction model, not proof that every student has the same needs.

## Target user

University students who study from lecture PDFs, textbooks and class notes, especially in technical subjects where processes, systems, algorithms and relationships are difficult to understand through prose alone.

## Jobs to be done

- When a concept is difficult to picture, help me see how it works rather than giving me another long paragraph.
- When I have explored a useful explanation, help me return to it in one or two actions.
- When I revise, help me move from a concise explanation to a practical self-check.
- When I use AI-generated material, help me verify where it came from in the original chapter.

## Product principles

1. **Representation follows the concept.** Use a concise explanation for a definition, a static diagram for structure, a flowchart for a process, an interactive model for changeable systems, and an animation for a sequence. Do not add visuals merely for decoration.
2. **Concepts are the primary navigation unit.** Organise generated resources under chapters and concepts, not under an ever-growing chat transcript.
3. **The source remains visible.** Keep original chapter/page references alongside generated material.
4. **Student control is explicit.** Let students switch note formats, explore parameters, save/unsave resources and revisit weak concepts.
5. **Be honest about AI.** In this prototype, content is pre-prepared sample data. Do not imply a live AI pipeline exists.

## Differentiation hypothesis

Conceptor is not differentiated by the existence of AI summaries, quizzes or flashcards; competitors already offer these. The product hypothesis to test is the integrated experience of **contextual representation selection + concept-centred navigation + persistent resource retrieval**.

## MVP for the hackathon

- One sample chapter: Operating Systems — Process Management.
- Eight concept destinations.
- One explorable static process-state diagram.
- One interactive CPU scheduling explorer (FCFS, SJF, Round Robin).
- One step-through context-switching demonstration.
- Three note formats: quick revision, detailed notes and exam-ready notes.
- A short quiz with explanations and targeted review.
- A searchable local resource library.

## Non-goals for this sprint

Authentication, cloud storage, multi-user sync, PDF parsing, model hosting, live AI orchestration, admin dashboards, payments and analytics infrastructure. These do not materially improve the quality of the UX demonstration in this time-boxed UI/UX hackathon.

## Success criteria for the prototype

- A first-time user can identify how to start exploring the sample chapter without instruction.
- A user can open a concept and understand the difference between a text explanation and a visual representation.
- A user can change scheduling inputs and correctly interpret the resulting timeline.
- A user can save a resource and reopen it from the library without scrolling chat history.
- A user can switch note formats and complete the quiz without leaving the workspace.
- Users can identify the original source page and distinguish sample AI-prepared content from verified textbook text.