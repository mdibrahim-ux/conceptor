import fs from "node:fs/promises";
import assert from "node:assert/strict";

const html = await fs.readFile("index.html","utf8");
const app = await fs.readFile("src/app.js","utf8");
const css = await fs.readFile("src/styles.css","utf8");
assert.match(html,/<title>Conceptor/);
assert.match(html,/id="chaptersPage"/);
assert.match(html,/id="motionToggle"/);
assert.match(app,/renderSchedule/);
assert.match(app,/renderLibrary/);
assert.match(app,/prefers-reduced-motion/);
assert.match(app,/conceptor-motion/);
assert.match(css,/\.chapter-layout/);
assert.match(css,/html\[data-motion=off\]/);
console.log("Conceptor smoke checks passed.");
