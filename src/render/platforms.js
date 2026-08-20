'use strict';
/* ═══ DRAW: PLATFORM ═══════════════════════════════════════════════════ */
import { ctx } from './canvas.js';
import { wx, wy } from './utils.js';

const PC = { solid: ['#8bc34a', '#689f38'], fake: ['#8bc34a', '#689f38'], crumble: ['#f57f17', '#e65100'], bounce: ['#f9a825', '#f57f17'], ice: ['#b3e5fc', '#81d4fa'], death: ['#66bb6a', '#43a047'], lava: ['#ff5722', '#bf360c'], sand: ['#f5a623', '#e67e22'], conv: ['#ce93d8', '#ab47bc'], moving: ['#80deea', '#00acc1'], elev: ['#a5d6a7', '#388e3c'] };

export function drawPlat(pl) {
  if (pl.type === 'broken') return;
  const x = wx(pl.x), y = wy(pl.y);
  const sh = pl.broken && (pl.type === 'crumble' || pl.type === 'sand') ? (Math.random() - .5) * 3 : 0;
  ctx.save(); ctx.translate(sh, 0);
  let [tc, mc] = PC[pl.type] || PC.solid;
  if (pl.type === 'fake' && pl.broken) { tc = '#bf360c'; mc = '#8d2505'; }
  if (pl.type === 'lava') { const t = Date.now() / 300; tc = `hsl(${20 + Math.sin(t) * 10},100%,${50 + Math.sin(t * 1.3) * 8}%)`; }
  ctx.fillStyle = mc; ctx.fillRect(x, y, pl.w, pl.h);
  ctx.fillStyle = tc; ctx.fillRect(x, y, pl.w, 6);
  if (pl.type === 'solid' || (pl.type === 'fake' && !pl.broken)) { ctx.fillStyle = '#558b2f'; for (let i = 4; i < pl.w - 4; i += 12) { ctx.fillRect(x + i, y - 3, 2, 4); ctx.fillRect(x + i + 5, y - 2, 2, 3); } }
  if (pl.type === 'lava') { ctx.fillStyle = 'rgba(255,200,0,.4)'; for (let i = 0; i < pl.w; i += 8) { const h2 = Math.sin(Date.now() / 200 + i) * .3; ctx.fillRect(x + i, y + 1, 6, 6 * h2 + 2); } }
  if (pl.type === 'sand' && pl.sinkT > 60) { ctx.fillStyle = 'rgba(255,200,50,.3)'; ctx.fillRect(x, y, pl.w, pl.h); }
  if (pl.type === 'conv') { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(pl.dir > 0 ? '→→→' : '←←←', x + 4, y + 13); }
  if (pl.type === 'moving') { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('←  →', x + pl.w / 2, y + 13); }
  if (pl.type === 'elev') { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('↑  ↓', x + pl.w / 2, y + 13); }
  if (pl.type === 'bounce') { ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('BOING', x + pl.w / 2, y + 13); }
  if (pl.type === 'ice') { ctx.fillStyle = '#0d47a1'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('⛸', x + pl.w / 2, y + 12); }
  if ((pl.type === 'death' || pl.type === 'lava') && pl.label) { ctx.fillStyle = 'rgba(0,230,80,.95)'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(pl.label, x + pl.w / 2, y - 5); }
  ctx.restore();
}
