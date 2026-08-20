'use strict';
/* ═══ DRAW: SPIKES / SIGN / COIN / GOAL / PARTICLES / FLOATS ═════════════ */
import { ctx } from './canvas.js';
import { wx, wy, rr } from './utils.js';
import { G } from '../state.js';

export function drawSpike(sp) {
  const x = wx(sp.x), y = wy(sp.y), n = Math.floor(sp.w / 14);
  ctx.fillStyle = '#607d8b';
  for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(x + i * 14, y + sp.h); ctx.lineTo(x + i * 14 + 7, y); ctx.lineTo(x + i * 14 + 14, y + sp.h); ctx.fill(); }
  ctx.fillStyle = '#90a4ae';
  for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(x + i * 14 + 3, y + sp.h - 2); ctx.lineTo(x + i * 14 + 7, y + 4); ctx.lineTo(x + i * 14 + 9, y + sp.h - 2); ctx.fill(); }
}

export function drawSign(s) {
  const x = wx(s.x), y = wy(s.y);
  ctx.fillStyle = '#6d4c41'; ctx.fillRect(x + 24, y + 30, 5, 38);
  ctx.fillStyle = '#ffe0b2'; rr(x, y, 56, 32, 3); ctx.fill();
  ctx.strokeStyle = '#6d4c41'; ctx.lineWidth = 2; rr(x, y, 56, 32, 3); ctx.stroke();
  ctx.fillStyle = '#3e2723'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
  const words = s.text.split(' ');
  if (words.length > 3) { const m = Math.ceil(words.length / 2); ctx.fillText(words.slice(0, m).join(' '), x + 28, y + 13); ctx.fillText(words.slice(m).join(' '), x + 28, y + 25); }
  else ctx.fillText(s.text, x + 28, y + 20);
}

export function drawCoin(c) {
  if (c.got) return;
  const t = Date.now() / 400;
  ctx.save(); ctx.translate(wx(c.x), wy(c.y));
  if (c.bone) {
    ctx.fillStyle = '#fff9c4'; ctx.save(); ctx.scale(Math.abs(Math.cos(t)) + .1, 1);
    ctx.beginPath(); ctx.rect(-6, -3, 12, 6); ctx.fill();
    for (const [bx, by] of [[-7, -5], [-7, 3], [7, -5], [7, 3]]) { ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  } else {
    ctx.scale(Math.abs(Math.cos(t)) + .1, 1);
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f57f17'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('$', 0, 3);
  }
  ctx.restore();
}

export function drawGoal() {
  if (!G.goal) return;
  const x = wx(G.goal.x), y = wy(G.goal.y), t = Date.now() / 140;
  ctx.fillStyle = '#bdbdbd'; ctx.fillRect(x + 22, y, 4, G.goal.h);
  ctx.fillStyle = '#ff6b35'; ctx.beginPath(); ctx.moveTo(x + 26, y); ctx.lineTo(x + 26 + 28 + Math.sin(t) * 5, y + 15); ctx.lineTo(x + 26, y + 33); ctx.fill();
  ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(x + 24, y, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('汪！GOAL', x + 24, y - 14);
}

export function drawProjs() {
  for (const pr of G.projs) {
    ctx.save(); ctx.translate(wx(pr.x), wy(pr.y));
    if (pr.kind === 'slime') { ctx.fillStyle = '#76c442'; ctx.beginPath(); ctx.ellipse(0, 0, 7, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#a5d6a7'; ctx.beginPath(); ctx.arc(-2, -1, 2, 0, Math.PI * 2); ctx.fill(); }
    else if (pr.kind === 'venom') { ctx.fillStyle = '#7b1fa2'; ctx.beginPath(); ctx.ellipse(0, 0, 5, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ce93d8'; ctx.beginPath(); ctx.arc(-1, -2, 1.5, 0, Math.PI * 2); ctx.fill(); }
    else if (pr.kind === 'fireball') { const f = Date.now() / 100; ctx.fillStyle = '#ff6d00'; ctx.beginPath(); ctx.arc(0, 0, 8 + Math.sin(f) * 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ffab40'; ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2); ctx.fill(); }
    else if (pr.kind === 'laser') { ctx.fillStyle = '#00e5ff'; ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 8; ctx.fillRect(-10, -3, 20, 6); ctx.shadowBlur = 0; }
    else if (pr.kind === 'rock') { const r = pr.life < 50 ? pr.life / 50 : 1; ctx.globalAlpha = r; ctx.fillStyle = '#5d4037'; ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#795548'; ctx.beginPath(); ctx.arc(-2, -2, 3, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
}

export function drawParticles() {
  for (const p of G.particles) { ctx.save(); ctx.globalAlpha = p.life / p.maxLife; ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(wx(p.x), wy(p.y), p.r * (p.life / p.maxLife), 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
}

export function drawFloats() {
  for (const t of G.floats) { ctx.save(); ctx.globalAlpha = t.life / 80; ctx.fillStyle = t.c; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(t.t, wx(t.x), wy(t.y)); ctx.restore(); }
}
