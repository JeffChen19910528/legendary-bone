'use strict';
/* ═══ PROJECTILE UPDATE ════════════════════════════════════════════════ */
import { G, P } from './state.js';
import { dt } from './settings.js';
import { sfx } from './audio.js';

export function updateProjs() {
  const d = dt();
  // Falling rocks for volcano
  if (G.lvl === 3) {
    G.rockT += d;
    if (G.rockT > 130) { G.rockT = 0; G.projs.push({ x: P.x + G.cam.x + (Math.random() - .5) * 280, y: G.cam.y - 40, vx: (Math.random() - .5) * 2, vy: 3, life: 200, kind: 'rock', g: true }); sfx('shoot'); }
  }
  for (const pr of G.projs) { pr.x += pr.vx * d; pr.y += pr.vy * d; if (pr.g) pr.vy = Math.min(pr.vy + .35 * d, 14); pr.life -= d; }
  G.projs = G.projs.filter(p => p.life > 0);
}
