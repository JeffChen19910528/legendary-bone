'use strict';
/* ═══ ENEMY FACTORIES ═══════════════════════════════════════════════════ */
export const tBase = () => ({ tT: 180 + Math.random() * 200 | 0, tMsg: '', tD: 0 });

export const mkW = (x, y, sx, ex, v = 1.8) => ({ x, y, w: 26, h: 26, vx: v, sx, ex, type: 'walker', alive: true, f: 0, ft: 0, ...tBase() });
export const mkFr = (x, y, sx, ex, v = 1.6, ji = 90) => ({ x, y, w: 26, h: 28, vx: v, vy: 0, sx, ex, groundY: y + 28, jumpT: 0, jumpI: ji, type: 'frog', alive: true, f: 0, ft: 0, ...tBase() });
export const mkBe = (x, y, sx, ex, v = 2.2) => ({ x, y, baseY: y, w: 28, h: 22, vx: v, sx, ex, wT: Math.random() * 6, type: 'bee', alive: true, immune: true, f: 0, ft: 0, ...tBase() });
export const mkSn = (x, y, dir = 1, si = 110) => ({ x, y, w: 30, h: 26, vx: 0, dir, type: 'snail', alive: true, sT: 0, sI: si, f: 0, ft: 0, ...tBase() });
export const mkTu = (x, y, sx, ex, v = 1.2) => ({ x, y, w: 28, h: 24, vx: v, sx, ex, type: 'turtle', alive: true, hp: 2, stunT: 0, f: 0, ft: 0, ...tBase() });
export const mkFo = (x, y, sx, ex, v = 2.8, cr = 180) => ({ x, y, w: 26, h: 28, vx: v, sx, ex, cV: v * 1.8, cR: cr, type: 'fox', alive: true, f: 0, ft: 0, ...tBase() });
export const mkBa = (x, y, gY, sx, ex, v = 1.8) => ({ x, y, baseY: y, groundY: gY, w: 28, h: 20, vx: v, vy: 2, sx, ex, type: 'bat', alive: true, f: 0, ft: 0, ...tBase() });
export const mkSk = (x, y, gY, v = 1.5, dir = 1, si = 120) => ({ x, y, w: 28, h: 24, vy: v, topY: y, groundY: gY, vx: 0, dir, type: 'snake', alive: true, sT: 0, sI: si, f: 0, ft: 0, ...tBase() });
export const mkSp = (x, y, gY, v = 1.5) => ({ x, y, topY: y, groundY: gY, w: 24, h: 24, vx: 0, vy: v, type: 'spider', alive: true, f: 0, ft: 0, ...tBase() });
export const mkDe = (x, y, sx, ex, v = 3, si = 160) => ({ x, y, w: 28, h: 32, vx: v, sx, ex, type: 'demon', alive: true, immune: true, sT: 0, sI: si, f: 0, ft: 0, ...tBase() });
export const mkRo = (x, y, sx, ex, v = 2, si = 140) => ({ x, y, w: 28, h: 32, vx: v, sx, ex, type: 'robot', alive: true, sT: 0, sI: si, f: 0, ft: 0, ...tBase() });
