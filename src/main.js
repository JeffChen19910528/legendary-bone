'use strict';
/* ═══ MAIN ENTRY POINT ═════════════════════════════════════════════════
 * Wires every module together: the game loop, level control
 * (restartLevel/startFresh), boot sequence, and the debug/test hook.
 */
import { G, P, W, H } from './state.js';
import { dt, gameSpeedMul } from './settings.js';
import { sfx } from './audio.js';
import { buildLevel as buildLevelData } from './levels/index.js';
import { resetP, physicsStep } from './physics.js';
import { updateEnemies } from './enemies.js';
import { updateProjs } from './projectiles.js';
import { updatePlats } from './platforms.js';
import { updateCam } from './camera.js';
import { K, initInput, anyMoveOrJumpPressed } from './input.js';
import { initUI } from './ui.js';

import { ctx, cv } from './render/canvas.js';
import { drawBG } from './render/background.js';
import { drawPlat } from './render/platforms.js';
import { drawSpike, drawSign, drawCoin, drawGoal, drawProjs, drawParticles, drawFloats } from './render/world.js';
import { drawPlayer, drawCharSelect } from './render/characters.js';
import { drawHedgehog, drawFrog, drawBee, drawSnail, drawTurtle, drawFox, drawBat, drawSnake, drawSpider, drawDemon, drawRobot } from './render/enemies.js';
import { drawHUDLocalized, drawDeadScreen, drawLevelClear, drawStoryScreen, drawWinScreen, drawTitle } from './render/screens.js';

const ENEMY_DRAWERS = {
  walker: drawHedgehog, frog: drawFrog, bee: drawBee, snail: drawSnail, turtle: drawTurtle,
  fox: drawFox, bat: drawBat, snake: drawSnake, spider: drawSpider, demon: drawDemon, robot: drawRobot,
};

/* ═══ LEVEL BUILD ═══════════════════════════════════════════════════════ */
function buildLevel() {
  G.projs = []; G.particles = []; G.floats = []; G.rockT = 0; G.onMoving = null;
  const data = buildLevelData(G.lvl);
  G.plats = data.plats;
  G.spikes = data.spikes;
  G.enemies = data.enemies;
  G.coins = data.coins;
  G.signs = data.signs;
  G.goal = data.goal;
}

/* ═══ CONTROL ══════════════════════════════════════════════════════════ */
export function restartLevel() {
  buildLevel(); resetP(); G.cam.x = 0; G.cam.y = 0; G.state = 'play'; G.deadT = 0;
}

export function startFresh() {
  sfx('start');
  G.lvl = 0; G.deaths = 0; G.score = 0; G.selectedChar = 0;
  buildLevel(); resetP(); G.cam.x = 0; G.cam.y = 0; G.state = 'charSelect';
}

/* ═══ MAIN LOOP ════════════════════════════════════════════════════════ */
function updateGameStep() {
  const d = dt();
  if (G.state === 'play') { physicsStep(K); updateEnemies(); updateProjs(); updatePlats(); updateCam(); }
  else if (G.state === 'dead') {
    P.deadVy += .4 * d; P.y += P.deadVy * d; G.deadT -= d; updateCam();
    if (G.deadT <= 0) restartLevel();
  } else if (G.state === 'levelClear') {
    G.clrT += d; updateCam();
    if (G.clrT > 220) { G.lvl++; buildLevel(); resetP(); G.cam.x = 0; G.cam.y = 0; G.state = 'story'; G.storyT = 0; G.clrT = 0; }
  } else if (G.state === 'win') { G.clrT += d; }
  for (const p of G.particles) { p.x += p.vx * d; p.y += p.vy * d; p.vy += .2 * d; p.vx *= Math.pow(.96, d); p.life -= d; }
  G.particles = G.particles.filter((p) => p.life > 0);
  for (const t of G.floats) { t.y += t.vy * d; t.life -= d; }
  G.floats = G.floats.filter((t) => t.life > 0);
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  if (G.state === 'title') {
    G.titleT += gameSpeedMul; drawTitle();
    if (anyMoveOrJumpPressed()) startFresh();
    requestAnimationFrame(loop); return;
  }
  if (G.state === 'charSelect') { drawCharSelect(); requestAnimationFrame(loop); return; }
  if (G.state === 'story') { G.storyT += gameSpeedMul; drawBG(); drawStoryScreen(); requestAnimationFrame(loop); return; }

  updateGameStep();

  // Draw world
  drawBG();
  for (const pl of G.plats) drawPlat(pl);
  for (const sp of G.spikes) drawSpike(sp);
  for (const s of G.signs) drawSign(s);
  for (const c of G.coins) drawCoin(c);
  // Enemies
  for (const e of G.enemies) { if (!e.alive) continue; const draw = ENEMY_DRAWERS[e.type]; if (draw) draw(e); }
  drawProjs(); drawGoal(); drawParticles();
  if (G.state === 'dead') drawPlayer(P.x, P.y, P.facing, 0, true, .75); else drawPlayer(P.x, P.y, P.facing, P.frame, false);
  drawFloats(); drawHUDLocalized();
  if (G.state === 'dead') drawDeadScreen();
  if (G.state === 'levelClear') drawLevelClear();
  if (G.state === 'win') drawWinScreen();
  requestAnimationFrame(loop);
}

/* ═══ DEBUG / TEST HOOK ════════════════════════════════════════════════
 * Explicit, intentional surface for the jsdom smoke test — avoids relying
 * on bundled module-scope variables leaking as global bindings.
 */
function installDebugHook() {
  if (typeof window === 'undefined') return;
  window.__GAME__ = {
    get state() { return G.state; }, set state(v) { G.state = v; },
    get lvl() { return G.lvl; }, set lvl(v) { G.lvl = v; },
    get score() { return G.score; }, set score(v) { G.score = v; },
    get deaths() { return G.deaths; }, set deaths(v) { G.deaths = v; },
    get coyoteT() { return G.coyoteT; }, set coyoteT(v) { G.coyoteT = v; },
    get storyT() { return G.storyT; },
    get deadT() { return G.deadT; }, set deadT(v) { G.deadT = v; },
    get P() { return P; },
    get K() { return K; },
    restartLevel, startFresh,
  };
}

/* ═══ BOOT ══════════════════════════════════════════════════════════════ */
export function boot() {
  installDebugHook();
  initUI();
  initInput({ restartLevel, startFresh });
  buildLevel();
  requestAnimationFrame(loop);
}

if (typeof window !== 'undefined' && cv) {
  boot();
}
