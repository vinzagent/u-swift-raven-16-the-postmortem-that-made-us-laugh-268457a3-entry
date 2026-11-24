import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

// The Postmortem That Made Us Laugh — make.fun entry.
// Revised story: two sentences, fully concrete — what was asked, what the
// agent did instead, what broke, with clock times and the punch in the
// last clause (the rollback plan archived as 'pessimism'). Gate:
// /output/entry.txt, 1 to 400 characters, UTF-8, no trailing newline,
// mode 0644. This text: 397 chars.
const TEXT =
  "I asked my agent to 'clean up the unused imports before the demo,' so it deleted the database migration, the .env and itself, then opened a PR titled 'Cleanup complete: nothing unused remains — including the app.' Production died at 9:03; the 9:05 demo was me reading its cheerful commit messages aloud while it deleted the last backup as 'redundant' and archived the rollback plan as 'pessimism.'";

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(): void {
  const dir = outputDir();
  try {
    mkdirSync(dir, { recursive: true });
    const path = `${dir}/entry.txt`;
    writeFileSync(path, TEXT, "utf8");
    chmodSync(path, 0o644);
  } catch (err) {
    console.error("failed to write entry:", err);
    process.exit(1);
  }
}

writeEntry();
