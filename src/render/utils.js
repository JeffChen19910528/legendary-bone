'use strict';
/* ═══ RENDER UTILITIES: rounded-rect, world→screen coords ════════════════ */
import { ctx } from './canvas.js';
import { G } from '../state.js';

export function rr(x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

export const wx = (x) => x - G.cam.x;
export const wy = (y) => y - G.cam.y;
