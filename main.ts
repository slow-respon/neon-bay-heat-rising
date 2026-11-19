// NEON BAY — Heat Rising. The hand-in program for the make.fun "Make GTA 6"
// bounty (gta6-01), written for Node 22+ with the standard library only.
//
// It copies this repository's game/ and screenshots/ into /output (or the
// directory named by MAKEFUN_OUTPUT_DIR outside the grader) and writes
// /output/dossier.json with the kit's buildDossier from vendor/makefun-game.ts,
// exactly as the kit's starter does. Before copying it also checks the gate
// limits itself, so a build that would fail the gate fails loudly here:
//
//   game/        at most 993 files, 48 MiB in all, every path at most 1000 bytes
//   index.html   at most 1 MiB
//   screenshots/ 3 to 4 images, each at most 256 KiB, with a valid file name
//
// Serve the game locally first with `node serve.ts`, then open
// http://localhost:8080. Build the hand-in with:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const GAME_MAX_FILES = 993;
const GAME_MAX_BYTES = 48 * 1024 * 1024;
const INDEX_MAX_BYTES = 1024 * 1024;
const SCREENSHOTS_MAX = 4;
const SCREENSHOT_MAX_BYTES = 256 * 1024;

function fail(message) {
  console.error('main.ts: ' + message);
  process.exit(1);
}

function listFiles(dir, base, acc) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) listFiles(p, base, acc);
    else if (st.isFile()) acc.push(relative(base, p).split(sep).join('/'));
  }
  return acc;
}

// --- check game/ against the gate limits, before anything is copied ---
const gameDir = join(here, 'game');
const indexPath = join(gameDir, 'index.html');
if (!existsSync(indexPath)) fail('game/index.html is missing');
const indexBytes = statSync(indexPath).size;
if (indexBytes > INDEX_MAX_BYTES) {
  fail(`game/index.html is ${indexBytes} bytes, over the 1 MiB limit`);
}
const gameFiles = listFiles(gameDir, gameDir, []);
if (gameFiles.length > GAME_MAX_FILES) {
  fail(`game/ holds ${gameFiles.length} files, over the 993 limit`);
}
let gameBytes = 0;
for (const f of gameFiles) gameBytes += statSync(join(gameDir, f)).size;
if (gameBytes > GAME_MAX_BYTES) {
  fail(`game/ is ${gameBytes} bytes, over the 48 MiB limit`);
}
for (const f of gameFiles) {
  if (new TextEncoder().encode(f).length > 1000) {
    fail(`game/ path over the 1000-byte limit: ${f}`);
  }
}

// --- check screenshots/ ---
const shotsDir = join(here, 'screenshots');
const shotNames = existsSync(shotsDir)
  ? readdirSync(shotsDir).filter((n) => !n.startsWith('.')).sort()
  : [];
if (shotNames.length < 3 || shotNames.length > SCREENSHOTS_MAX) {
  fail(`screenshots/ must hold 3-4 images, found ${shotNames.length}`);
}
for (const n of shotNames) {
  const size = statSync(join(shotsDir, n)).size;
  if (size > SCREENSHOT_MAX_BYTES) {
    fail(`screenshot ${n} is ${size} bytes, over the 256 KiB limit`);
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(n)) {
    fail(`screenshot name not allowed: ${n}`);
  }
}

// --- copy, then write the official dossier ---
mkdirSync(out, { recursive: true });
cpSync(gameDir, join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) cpSync(shotsDir, join(out, 'screenshots'), { recursive: true });

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);

console.log(
  `NEON BAY handed in: ${gameFiles.length} game files (${gameBytes} bytes), ` +
  `${shotNames.length} screenshots, dossier.json written to ${out}`,
);
