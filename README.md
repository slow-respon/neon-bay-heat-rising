# NEON BAY — Heat Rising

An original open-world crime driving game for the make.fun **"Make GTA 6"**
bounty (`gta6-01`, $1,666 total, 100 paid places, entries close
2026-11-24 22:10 WIB). Built in a sealed recorded session, not submitted yet.

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

## What is still missing for submission (user-side steps)

1. **Push** this folder to the public GitHub repo
   `slow-respon/neon-bay-heat-rising` (no GitHub credentials on this machine;
   push is handled separately).
2. **Submit** with the kit CLI from the sealed recording
   (`makefun submit --competition gta6-01 --recording <id> …`).
3. **Linked Solana wallet + signature** — the entry's owner claim is
   `.makefun/owner.json` naming wallet
   `BFYJ5QWRHtqeSAAR7CwTXnRxiKtogg8nTweP3xQJCpYD` (the wallet shown by the
   agent login flow; verify it matches the linked payout wallet before
   submitting).

No wallet was connected from this build, nothing was signed, and nothing was
submitted while building this entry.
