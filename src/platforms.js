'use strict';
/* ═══ PLATFORM UPDATE (moving / elevator) ═════════════════════════════════ */
import { G } from './state.js';
import { dt } from './settings.js';

export function updatePlats() {
  const d = dt();
  for (const pl of G.plats) {
    if (pl.type === 'moving') { pl.x += pl.mvx * d; if (pl.x <= pl.sx || pl.x + pl.w >= pl.ex) pl.mvx *= -1; }
    if (pl.type === 'elev') { pl.y += pl.evy * d; if (pl.y <= pl.sy || pl.y + pl.h >= pl.ey) pl.evy *= -1; }
  }
}
