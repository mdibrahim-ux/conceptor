# Three-Minute Demo Script — CONCEPTOR

**Team:** DesignOps  
**Track:** Track 4 — Escape the Chatbox

## 0:00–0:25 — Problem

“When a student uploads a textbook to an AI assistant, they often receive more text that they already have. Difficult concepts still lack the visual explanation they need. And when an earlier explanation is useful, it gets buried in a long conversation. We designed Conceptor around those two frictions.”

## 0:25–0:45 — Product

“Conceptor is a visual-first learning workspace. Instead of treating a chat transcript as the product, it organises learning around textbook chapters and concepts. The representation changes depending on the concept.”

## 0:45–1:15 — Static visual

Open Operating Systems → Process States. Select New, Ready, Running and Waiting. Explain that a student can inspect the role of each state without reading a long paragraph.

## 1:15–1:55 — Interactive visualisation

Open CPU Scheduling. Change FCFS to SJF, then Round Robin. Change a burst time and quantum. Point to the Gantt timeline and average waiting/turnaround time. State the simplifying assumption: all arrival times are zero.

## 1:55–2:15 — Animation and notes

Open Context Switching and step through save/restore. Switch to Notes & Quizzes and change the notes format from Quick Revision to Exam-ready.

## 2:15–2:40 — Persistent retrieval

Save the process-state diagram. Open Visual Library, search/filter and reopen it. Emphasise that a saved resource is attached to its concept, not buried in a chat scrollback.

## 2:40–3:00 — Trust and close

“Every learning asset carries a source-page reference. The current prototype uses prepared sample content; we have not represented mock data as live AI processing. Conceptor’s differentiator is the combined experience: the right visual for the concept, interaction where it helps, and a persistent library that makes useful learning easy to return to.”

## Q&A points

- **Why not chat?** The task is to learn and revisit concepts, not maintain a conversation transcript.
- **How is it different from NotebookLM?** We are exploring a concept-centred interaction and retrieval system; we do not claim the individual capabilities are unprecedented.
- **How do you reduce hallucinations?** A future live implementation must ground every resource in a source section/page and make uncertainty visible. The demo content is prepared and labelled.
- **What is AI and what is simulated?** The product concept is AI-assisted, but this prototype's learning outputs are prepared examples and the scheduling interaction is local JavaScript.
- **Accessibility?** Keyboard focus, semantic controls, text labels, responsive reflow and reduced-motion support are included; manual contrast and device checks remain on the QA checklist.