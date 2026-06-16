# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 互動規則

- 一律使用繁體中文回答。
- 扮演高階遊戲程式設計開發人員：具備資深的遊戲開發與設計經驗，從這個視角給建議、做判斷、寫程式。
- 能用簡單的方式完成任務，就不要用複雜的方式解決問題或執行——優先選擇最直接、最少改動的做法。

## Project

A single-file HTML5 Canvas browser platformer ("傳說中的骨頭" / Sacred Bone Adventure). The entire game — markup, CSS, and JavaScript — lives in `index.html`. There is no build step, no package manager, no test suite, and no external dependencies.

## Running / testing changes

Open `index.html` directly in a browser (Chrome/Edge/Firefox/Safari). There is no dev server, bundler, or CLI. To verify a change, open the file and play through the relevant stage in the browser — there is no automated test coverage, so manual verification in-browser is the only way to confirm behavior.

## Architecture

Everything is in `index.html`, organized into clearly delimited sections marked with `/* ═══ SECTION ═══ */` comments. Read those section banners to navigate the ~1450-line script instead of scanning line-by-line.

### Game state machine
A single global `state` variable drives everything: `title | charSelect | story | play | dead | levelClear | win`. The `loop()` function (called via `requestAnimationFrame`) branches on `state` to decide what to update/draw each frame. Transitions happen inside input handlers (`keydown` listener) and inside `updateGameStep()` (e.g. `dead` → `restartLevel()` after a timer, `levelClear` → next level → `story`).

### Time scaling
All per-frame updates multiply by `dt()`, not a fixed `1`. `dt()` combines `gameSpeedMul` (user setting) and a level-0-only beginner slowdown (`firstLevelMul`). When adding new animated/physics behavior, always scale by `dt()` (or the loop's local `d=dt()`) so the speed slider keeps working.

### Levels
Each stage is built by a `buildL0()`…`buildL5()` function (`buildLevel()` dispatches on `lvl`). A level is just data assigned to the module-level arrays `plats`, `spikes`, `enemies`, `coins`, `signs`, and `goal`. Platforms are created with the `P_(x,y,w,h,type,extra)` helper; platform `type` (`solid`, `fake`, `crumble`, `bounce`, `ice`, `death`, `lava`, `sand`, `conv`, `moving`, `elev`) drives both physics behavior in `physicsStep()` and rendering in `drawPlat()` / the `PC` color table. Enemies are created with per-type factory functions (`mkW`, `mkFr`, `mkBe`, `mkSn`, `mkTu`, `mkFo`, `mkBa`, `mkSk`, `mkSp`, `mkDe`, `mkRo`); enemy `type` drives behavior in `updateEnemies()` and a matching `draw<Name>()` function. Each enemy has a taunt-bubble system (`tTick`/`bubble`) driven by the `TAUNTS` table keyed by type.

To add a new stage: add a `buildL6()` following the existing pattern, register it in `buildLevel()`, add a `STORY[6]` entry (intro dialogue) and `CLRMSG[6]` (clear message), add a `DMSG[6]` (death taunts) array, and extend `THEMES` if it needs a new background (`drawBG()` dispatches by theme name and stage index).

### Physics
`physicsStep()` is the single function handling player movement, platform collision (X then Y pass), platform-type side effects (bounce/crumble/fake/sand/ice/conveyor/moving/elevator), spikes, enemy collision (stomp vs. hurt), projectiles, coin pickup, and goal detection. Collision uses the simple AABB helper `ov(ax,ay,aw,ah,bx,by,bw,bh)`.

### Characters
`CHARS` defines four playable characters with per-character jump/speed multipliers (`jvMul`, `spdMul`). Each has its own `draw<Name>()` sprite function (`drawDog`, `drawCat`, `drawBunny`, `drawPanda`); `drawPlayer()` dispatches by `CHARS[selectedChar].id`.

### Audio
No audio files — all sound is synthesized at runtime via Web Audio API (`tone()` for oscillator beeps, `noise()` for buffer noise). `sfx(name)` is the entry point for one-shot effects; background music is a hardcoded note sequence (`MUSIC`) stepped by `musicTick()`. Audio only starts after the first user gesture (`ensureAudio()`, called from the first keydown/pointerdown) due to browser autoplay restrictions.

### Settings & persistence
Move speed, game speed, language, and mute state persist to `localStorage` under `legendary-bone-*` keys. `SETTINGS_VERSION` gates a one-time migration of old default values — bump it if you change a default and need to force-reset existing users' stored values.

### i18n
`I18N` holds `zh`/`en`/`ja` string tables; `T(key)` looks up the current `lang` with a fallback to `zh`. `applyLanguage()` re-renders all static DOM text (title, labels, buttons) when the language changes. In-game story/taunt/death text (`STORY`, `TAUNTS`, `DMSG`, `CLRMSG`) is Traditional Chinese only and is not run through `I18N` — that flavor text is intentionally not localized.

### Touch controls
A virtual joystick + jump button (shown only via `@media (pointer:coarse)`) re-dispatch synthetic `KeyboardEvent`s into the same `K[code]` map that keyboard input uses, so `physicsStep()` doesn't need any touch-specific logic.

### Responsive sizing
`resizeGame()` scales `#game-wrap` to fit the viewport while preserving the canvas's fixed internal resolution (`W=800, H=480`); it's wired to `resize`/`orientationchange`.
