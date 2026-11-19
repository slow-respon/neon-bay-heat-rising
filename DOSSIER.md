# Dossier — NEON BAY: Heat Rising (make.fun gta6-01)

## Entry summary

- **Title:** NEON BAY — Heat Rising
- **Competition:** Make GTA 6 (`gta6-01`) — $1,666, 100 paid places
- **Author account:** @slow-respon
- **Owner claim:** `.makefun/owner.json` names wallet
  `BFYJ5QWRHtqeSAAR7CwTXnRxiKtogg8nTweP3xQJCpYD`
- **Format:** static browser game, single self-contained `game/index.html`
  (canvas 2D, vanilla JavaScript, no libraries, no network requests)
- **License:** MIT (see `LICENSE`)

## What the game is

An original open-world crime driving game set in Neon Bay, a fictional neon
coastal city. The player is Maya Solis, a getaway driver who owes the loan
shark Kingfish $5,000. The game is played with keyboard (WASD/arrows, E,
Space, F, H, P, R, M) in a 3200×3200 explorable city with four districts,
a beach and ocean, traffic, pedestrians, and police.

## Feature checklist (brief requirements)

- [x] City to explore **on foot and by car**
- [x] Traffic and pedestrians (AI cars on roads, walking pedestrians who flee)
- [x] Cars to steal and drive (any traffic car, including police cruisers)
- [x] Wanted level (0–5 stars) and police who respond (spawn, chase, ram, arrest)
- [x] Missions and a story (3-mission chain: Pickup → Getaway → Payoff; the
      Payoff clears the remaining debt = win, then free roam continues)
- [x] Combat (car ramming, on-foot punch, collisions damage cars)
- [x] HUD with a minimap (cash, debt, objective, timer, stars, speed, health, minimap)
- [x] Start screen and a way to save (Continue via localStorage)
- [x] Sound (synthesized WebAudio: engine, sirens, pickups) and menus
- [x] Two modes: Official (strict) and Fan edition (relaxed)
- [x] Originality: own city, characters, vehicles, names, story, art, sounds —
      nothing from Rockstar's Grand Theft Auto or any other commercial game

## Judging (Fun 35% / Visuals 35% / Faithfulness 30%)

- **Fun:** immediate driving with handbrake drifts, stealing cars, police
  chases that escalate with wanted stars, timed getaway missions, cash and
  debt progression that gives every run a goal.
- **Visuals:** neon palette (magenta/cyan/amber), glowing signs, lit windows,
  ocean and beach, day-glow district labels, particles, screen shake, and a
  live minimap — all drawn in code.
- **Faithfulness:** the open-world crime fantasy — explore, steal, run, and
  pay off a debt — in a single browser game, with the wanted/police loop at
  its centre.

## Technical notes

- `game/index.html` is the whole game (~38 KB): inline CSS + JavaScript,
  no external URLs, no images, no fonts, no audio files.
- `main.ts` validates the gate limits and writes the official `dossier.json`
  with the kit's `buildDossier` from `vendor/makefun-game.ts` (unchanged).
- Screenshots (`screenshots/`, 3 files) are real renders of the game's own
  code, captured fresh in this session in a headless browser via
  `?shot=start|play|end&seed=1`; the first by name is the cover.
- This build was written under a sealed recording: every file of the entry
  (game, main.ts, serve.ts, README, DOSSIER, shots.json, owner claim) was
  written in this session; only `vendor/makefun-game.ts` is the kit's copy,
  unchanged by design.
- Known limits: police AI steers but does not pathfind around buildings;
  traffic cars do not avoid each other; no mouse control (keyboard only).

## Submission status

Built under a sealed recording. Not submitted. Still needed: push to the
public GitHub repo, submit with the kit CLI from the recording, and verify
the linked Solana wallet matches the owner claim before submitting.
