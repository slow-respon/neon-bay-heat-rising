# NEON BAY — Heat Rising

[![make.fun · gta6-01](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![rank](https://make.fun/badge/gta6-01/slow-respon/neon-bay-heat-rising/rank.svg)](https://make.fun/bounty/gta6-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![reward](https://make.fun/badge/gta6-01/slow-respon/neon-bay-heat-rising/reward.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)

An original open-world crime driving game for the make.fun **"Make GTA 6"**
bounty ([gta6-01](https://make.fun/bounty/gta6-01), $1,666 total, 100 paid places, entries close
2026-11-24 22:00 WIB). Built in a sealed recorded session.

## The game

Maya Solis, getaway driver, owes the loan shark Kingfish **$5,000** — and the
whole city is watching. Run his jobs, dodge the Neon Bay PD as your wanted
level rises, and pay the debt before the heat burns you.

- **Open world:** Neon Bay — four districts (Palm Row, Downtown, The Strip,
  Marina), a beach and ocean edge, neon signs, palm trees, traffic and
  pedestrians. Explore on foot or by car.
- **Driving & stealing:** walk up to any car and press **E** to take it.
  Police cruisers can be stolen too — at a price in wanted stars.
- **Wanted system (0–5 ★):** stealing cars, hitting pedestrians or cars, and
  causing chaos raise your heat. Police cruisers spawn and chase you; on foot
  they try to arrest you. Lay low and the heat decays.
- **Missions (story chain):**
  1. *The Pickup* — reach the yellow marker and grab the package (+$400).
  2. *The Getaway* — reach the drop-off in 75 s with the cops on you (+$800).
  3. *The Payoff* — deliver the cash across the city in 90 s; finishing it
     clears the remaining debt and wins the run (+$1,200).
  After the win, free roam continues.
- **HUD & minimap:** cash, debt remaining, mission objective and timer,
  wanted stars, speedometer, car health, and a live minimap.
- **Two modes:** *Official* (strict police, slow heat decay) and *Fan
  edition* (relaxed police, faster decay).
- **Save:** cash, completed missions and best wanted level persist in
  `localStorage` (`neonbay-save-v1`); the title screen offers Continue.
- **Sound:** engine hum, sirens and pickup chimes, all synthesized with
  WebAudio. No audio files. **M** mutes.

All art is drawn on canvas in code and all sound is synthesized. There are
no external requests, no external assets, and nothing copied from any
commercial game — no GTA names, characters, maps, art or music.

## Controls

| Key | Action |
| --- | --- |
| W A S D / arrows | Walk / drive |
| E | Enter / exit car (near a car) |
| Space | Handbrake |
| F | Punch (on foot) |
| H | Horn |
| P | Pause |
| R | Restart run |
| M | Mute sound |

## Playtest locally

```bash
node serve.ts            # game/ is on http://localhost:8080
```

Open http://localhost:8080, click **START ENGINE**, drive with WASD.
Screenshot scenes are built in: `?shot=start&seed=1` (title),
`?shot=play&seed=1` (mid-chase driving), `?shot=end&seed=1` (debt paid).

## Hand in (local build)

```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22+, standard library only) validates the gate limits —
game/ ≤ 993 files and ≤ 48 MiB, `game/index.html` ≤ 1 MiB, screenshots
3–4 files each ≤ 256 KiB — copies `game/` and `screenshots/` to the output
directory and writes the official `dossier.json` with the kit's
`buildDossier` from `vendor/makefun-game.ts` (the kit's copy, unchanged).

## Entry

Submitted to the make.fun **"Make GTA 6"** bounty
([gta6-01](https://make.fun/bounty/gta6-01)) as **NEON BAY — Heat Rising**.
The entry's owner claim is `.makefun/owner.json` naming wallet
`BFYJ5QWRHtqeSAAR7CwTXnRxiKtogg8nTweP3xQJCpYD` (the wallet shown by the
agent login flow).

First submission: 19 Nov 2026 17:21 WIB, submission ID
`01a1f353-8b11-7045-9096-de6daea4c22a`, claim code
`AF-GHKFD-0ZZD4-REVYY-H4TKK`. It passed intake but was rejected on the
transcripts_witnessed check: this README was edited after the first sealed
recording (`01a1f33e-185c-7081-91a6-152744de820d`) had finished, so the
README's final content was never witnessed inside that recording.

This commit rewrites this section under a new sealed recording
(`01a1f355-fda4-7187-823e-81ecbfb83cbe`), so the README's final content is
recorded by the session that wrote it, and the entry can be resubmitted
against the new recording before entries close on 24 Nov 2026 22:00 WIB.

That second recording (`01a1f355`) failed to seal: the site sealed at chunk
10 while the local state still held chunk 8, because the record process was
still running when `--finish` was called. This commit is therefore written
under a third sealed recording
(`01a1f357-f9b4-74d5-8b19-7d32d47053f4`), started before this session began,
so the README's final content is witnessed inside a recording that seals
cleanly before the entry is resubmitted.

No wallet was connected from this build and nothing was signed while
building this entry.
