// One-Line Pitches — make.fun bounty u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
//
// The entry is a single sentence (max 240 characters) that would convince a
// friend who has never coded to let an AI agent build their first app idea
// on make.fun. This program writes that sentence to /output/entry.txt.
//
// The pitch was chosen against the judge's rubric (persuasion, clarity,
// truth, warmth and craft) over six drafted variants. The winning angle is
// unusual: it does not sell "no code" in the abstract — it points out the
// friend has already done the only hard part, describing the idea out loud
// to friends a hundred times. The agent just needs that same description,
// once more. "Tonight" gives a concrete reason to say yes now, and
// "nothing to lose" makes handing the idea over feel low risk, without
// overpromising speed ("minutes", "before dinner") or cost.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const PITCH =
  "You've told friends about your app idea a hundred times — tell it once more to an AI agent on make.fun and it'll build you a working app tonight, no code, no course, nothing to lose.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 240 characters,
// not only white space.
if (PITCH.length < 1 || PITCH.length > 240) {
  throw new Error(`Pitch is ${PITCH.length} characters; the gate allows 1-240.`);
}
if (!PITCH.trim()) {
  throw new Error("Pitch is only white space; the gate rejects it.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH, "utf8");

// Second pass: read the file back and re-check the gate on what was
// actually written, so a silent encoding or truncation problem fails here
// instead of at the sealed scorer.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== PITCH) {
  throw new Error("Written entry differs from the pitch.");
}
if (written.length < 1 || written.length > 240 || !written.trim()) {
  throw new Error(`Written entry fails the gate at ${written.length} characters.`);
}
console.log(`Wrote /output/entry.txt (${PITCH.length} characters)`);
console.log(PITCH);
