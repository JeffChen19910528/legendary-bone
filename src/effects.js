'use strict';
/* ═══ PARTICLE / FLOATING-TEXT EFFECTS ════════════════════════════════════ */
import { G } from './state.js';

export function boom(x, y, c, n = 8) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, s = 2 + Math.random() * 4;
    G.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2, life: 40 + Math.random() * 20 | 0, maxLife: 60, r: 3 + Math.random() * 4, c });
  }
}

export function addF(x, y, t, c = '#fff') {
  G.floats.push({ x, y, t, c, life: 80, vy: -.8 });
}
