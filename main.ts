// NEON BAY — Heat Rising. make.fun "Make GTA 6" (gta6-01) entry program.
// Node 22+, standard library only. It copies game/ and screenshots/ from beside
// this file into /output (or MAKEFUN_OUTPUT_DIR outside the grader) and writes
// /output/dossier.json, the summary the judge reads.
//
// Serve the game locally first with `node serve.ts`, then open http://localhost:8080.
// Build the hand-in with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// NOTE (submission step, not run here): the official gate rebuilds dossier.json
// with the kit's vendored buildDossier from vendor/makefun-game.ts and compares
// it byte for byte. Before submitting, copy the kit's vendor/makefun-game.ts
// (unchanged) into vendor/ and switch the dossier write below to buildDossier.
// This local build writes an equivalent dossier in the same shape so the entry
// can be verified end-to-end without a wallet, signature or submission.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const GAME_MAX_FILES = 993;
const GAME_MAX_BYTES = 48 * 1024 * 1024;
const INDEX_MAX_BYTES = 1024 * 1024;
const SCREENSHOTS_MAX = 4;
const SCREENSHOT_MAX_BYTES = 256 * 1024;

function sha256(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}

function walk(dir, base, acc) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, base, acc);
    else if (st.isFile()) acc.push(relative(base, p).split(sep).join('/'));
  }
  return acc;
}

function fail(msg) {
  console.error('main.ts: ' + msg);
  process.exit(1);
}

// --- validate game/ against the gate limits, before copying ---
const gameDir = join(here, 'game');
const indexFile = join(gameDir, 'index.html');
if (!existsSync(indexFile)) fail('game/index.html is missing');
const indexSize = statSync(indexFile).size;
if (indexSize > INDEX_MAX_BYTES) fail(`game/index.html is ${indexSize} bytes, over the 1 MiB limit`);
const gameFiles = walk(gameDir, gameDir, []);
if (gameFiles.length > GAME_MAX_FILES) fail(`game/ has ${gameFiles.length} files, over the 993 limit`);
let gameBytes = 0;
for (const f of gameFiles) gameBytes += statSync(join(gameDir, f)).size;
if (gameBytes > GAME_MAX_BYTES) fail(`game/ is ${gameBytes} bytes, over the 48 MiB limit`);
for (const f of gameFiles) {
  if (new TextEncoder().encode(f).length > 1000) fail(`game/ path over 1000 bytes: ${f}`);
}

// --- validate screenshots/ ---
const shotsDir = join(here, 'screenshots');
const shotFiles = existsSync(shotsDir)
  ? readdirSync(shotsDir).filter((n) => !n.startsWith('.')).sort()
  : [];
if (shotFiles.length < 3 || shotFiles.length > SCREENSHOTS_MAX) {
  fail(`screenshots/ must hold 3-4 images, found ${shotFiles.length}`);
}
for (const n of shotFiles) {
  const size = statSync(join(shotsDir, n)).size;
  if (size > SCREENSHOT_MAX_BYTES) fail(`screenshot ${n} is ${size} bytes, over the 256 KiB limit`);
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(n)) fail(`screenshot name not allowed: ${n}`);
}

// --- copy and write the dossier ---
mkdirSync(out, { recursive: true });
cpSync(gameDir, join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) cpSync(shotsDir, join(out, 'screenshots'), { recursive: true });

const dossier = {
  title: 'NEON BAY — Heat Rising',
  competition: 'gta6-01',
  description:
    'Original open-world crime driving game in the browser: explore Neon Bay on foot and by car, ' +
    'steal cars, outrun the Neon Bay PD as your wanted level rises, and run three story missions ' +
    'to pay off a $5,000 debt. Canvas art drawn in code, synthesized WebAudio sound, no external assets.',
  controls: {
    move_drive: 'WASD / arrow keys',
    enter_exit_car: 'E',
    handbrake: 'Space',
    punch: 'F (on foot)',
    horn: 'H',
    pause: 'P',
    restart: 'R',
    sound: 'M',
  },
  modes: ['GTA 6 – Official (strict police)', 'GTA 6 – Fan edition (relaxed police)'],
  judging: { fun: 0.35, visuals: 0.35, faithfulness: 0.3 },
  files: {
    game: gameFiles.map((f) => ({ path: 'game/' + f, bytes: statSync(join(gameDir, f)).size, sha256: sha256(join(gameDir, f)) })),
    game_total_bytes: gameBytes,
    screenshots: shotFiles.map((n) => ({ path: 'screenshots/' + n, bytes: statSync(join(shotsDir, n)).size, sha256: sha256(join(shotsDir, n)) })),
  },
  limits_checked: {
    game_files_max: GAME_MAX_FILES,
    game_bytes_max: GAME_MAX_BYTES,
    index_html_bytes_max: INDEX_MAX_BYTES,
    screenshots_max: SCREENSHOTS_MAX,
    screenshot_bytes_max: SCREENSHOT_MAX_BYTES,
  },
};

writeFileSync(join(out, 'dossier.json'), JSON.stringify(dossier, null, 2) + '\n');
console.log(`NEON BAY handed in: ${gameFiles.length} game files (${gameBytes} bytes), ${shotFiles.length} screenshots, dossier.json written to ${out}`);
