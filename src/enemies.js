'use strict';
/* ═══ ENEMY AI / UPDATE ════════════════════════════════════════════════ */
import { GR, MXF } from './constants.js';
import { G, P } from './state.js';
import { dt } from './settings.js';
import { sfx } from './audio.js';
import { TAUNTS } from './data/taunts.js';

export function tTick(e, d) {
  if (e.tD > 0) e.tD -= d;
  if ((e.tT -= d) <= 0) {
    e.tT = 180 + Math.random() * 250 | 0;
    const p = TAUNTS[e.type] || [''];
    e.tMsg = p[Math.random() * p.length | 0];
    e.tD = 110;
  }
}

export function updateEnemies() {
  const d = dt();
  for (const e of G.enemies) {
    if (!e.alive) continue;
    e.ft += d; if (e.ft > 7) { e.ft = 0; e.f = 1 - e.f; }
    tTick(e, d);
    switch (e.type) {
      case 'walker':
        e.x += e.vx * d; if (e.x <= e.sx || e.x + e.w >= e.ex) e.vx *= -1; break;
      case 'frog':
        e.x += e.vx * d; if (e.x <= e.sx || e.x + e.w >= e.ex) e.vx *= -1;
        e.vy = Math.min(e.vy + GR * .8 * d, MXF); e.y += e.vy * d;
        if (e.y >= e.groundY - e.h) { e.y = e.groundY - e.h; e.vy = 0; e.jumpT += d; if (e.jumpT >= e.jumpI) { e.jumpT = 0; e.vy = -10; } } break;
      case 'bee':
        e.x += e.vx * d; if (e.x <= e.sx || e.x + e.w >= e.ex) e.vx *= -1;
        e.wT += .055 * d; e.y = e.baseY + Math.sin(e.wT) * 22; break;
      case 'snail':
        e.sT += d; if (e.sT >= e.sI) { e.sT = 0; G.projs.push({ x: e.x + (e.dir > 0 ? e.w : 0), y: e.y + e.h / 2 - 5, vx: e.dir * 4.5, vy: 0, life: 130, kind: 'slime', g: false }); sfx('shoot'); } break;
      case 'turtle':
        if (e.stunT > 0) { e.stunT -= d; break; }
        e.x += e.vx * d; if (e.x <= e.sx || e.x + e.w >= e.ex) e.vx *= -1; break;
      case 'fox': {
        const dx = P.x - e.x;
        if (Math.abs(dx) < e.cR) { e.vx = dx > 0 ? e.cV : -e.cV; }
        e.x += e.vx * d; if (e.x <= e.sx || e.x + e.w >= e.ex) e.vx = dx > 0 ? -Math.abs(e.vx) : Math.abs(e.vx); break;
      }
      case 'bat':
        e.y += e.vy * d; if (e.y >= e.groundY) { e.y = e.groundY; e.vy = -Math.abs(e.vy); } if (e.y <= e.baseY) { e.y = e.baseY; e.vy = Math.abs(e.vy); }
        e.x += e.vx * d; if (e.x <= e.sx || e.x + e.w >= e.ex) e.vx *= -1; break;
      case 'snake': {
        e.y += e.vy * d; if (e.y >= e.groundY - e.h) { e.y = e.groundY - e.h; e.vy = -Math.abs(e.vy); } if (e.y <= e.topY) { e.y = e.topY; e.vy = Math.abs(e.vy); }
        e.sT += d; if (e.sT >= e.sI) {
          e.sT = 0;
          const tx = P.x + 15 - e.x - 14, ty = P.y + 16 - e.y - 12, dd = Math.sqrt(tx * tx + ty * ty) || 1;
          G.projs.push({ x: e.x + (e.dir > 0 ? e.w : 0), y: e.y + 4, vx: tx / dd * 5, vy: ty / dd * 5 - 3, life: 100, kind: 'venom', g: true }); sfx('shoot');
        } break;
      }
      case 'spider':
        e.y += e.vy * d; if (e.y >= e.groundY) { e.y = e.groundY; e.vy = -Math.abs(e.vy); } if (e.y <= e.topY) { e.y = e.topY; e.vy = Math.abs(e.vy); } break;
      case 'demon':
        e.x += e.vx * d; if (e.x <= e.sx || e.x + e.w >= e.ex) e.vx *= -1;
        e.sT += d; if (e.sT >= e.sI) { e.sT = 0; const dir = P.x > e.x ? 1 : -1; G.projs.push({ x: e.x + (dir > 0 ? e.w : 0), y: e.y + 8, vx: dir * 6, vy: -.5, life: 120, kind: 'fireball', g: true }); sfx('shoot'); } break;
      case 'robot':
        e.x += e.vx * d; if (e.x <= e.sx || e.x + e.w >= e.ex) e.vx *= -1;
        e.sT += d; if (e.sT >= e.sI) { e.sT = 0; const dir = P.x > e.x ? 1 : -1; G.projs.push({ x: e.x + (dir > 0 ? e.w : 0), y: e.y + 10, vx: dir * 14, vy: 0, life: 50, kind: 'laser', g: false }); sfx('shoot'); } break;
    }
  }
}
