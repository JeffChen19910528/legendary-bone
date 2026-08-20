'use strict';
/* ═══ DRAW: ENEMIES ════════════════════════════════════════════════════ */
import { ctx } from './canvas.js';
import { wx, wy, rr } from './utils.js';

function bubble(e, ox, oy) {
  if (!e.tMsg || e.tD <= 0) return;
  const x = wx(e.x + e.w / 2) + ox, y = wy(e.y) + oy;
  ctx.save(); ctx.globalAlpha = Math.min(1, e.tD / 20);
  ctx.font = 'bold 9px sans-serif'; const tw = ctx.measureText(e.tMsg).width;
  const bw = tw + 12, bh = 17, bx = x - bw / 2, by = y - bh - 6;
  ctx.fillStyle = 'white'; rr(bx, by, bw, bh, 3); ctx.fill();
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1; rr(bx, by, bw, bh, 3); ctx.stroke();
  ctx.fillStyle = 'white'; ctx.beginPath(); ctx.moveTo(x - 4, by + bh); ctx.lineTo(x, by + bh + 7); ctx.lineTo(x + 4, by + bh); ctx.fill();
  ctx.fillStyle = '#222'; ctx.textAlign = 'center'; ctx.fillText(e.tMsg, x, by + 12); ctx.restore();
}

export function drawHedgehog(e) { ctx.save(); ctx.translate(wx(e.x + 13), wy(e.y + 13)); if (e.vx < 0) ctx.scale(-1, 1); ctx.fillStyle = '#5d4037'; ctx.beginPath(); ctx.ellipse(0, 2, 12, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#3e2723'; for (const a of [-1.8, -1.4, -1.0, -.6, -.2, .2, .6, 1.0, 1.4, 1.8]) { ctx.save(); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(-2, -10); ctx.lineTo(0, -20); ctx.lineTo(2, -10); ctx.fill(); ctx.restore(); } ctx.fillStyle = '#a1887f'; ctx.beginPath(); ctx.ellipse(-1, 2, 6, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ff8a65'; ctx.beginPath(); ctx.arc(-1, 1, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.arc(-4, -1, 2, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-1, -5); ctx.stroke(); ctx.restore(); bubble(e, 0, -26); }

export function drawFrog(e) { ctx.save(); ctx.translate(wx(e.x + 13), wy(e.y + 14)); if (e.vx < 0) ctx.scale(-1, 1); const sq = e.vy < 0 ? .8 : 1; ctx.scale(1 / sq, sq); ctx.fillStyle = '#388e3c'; ctx.beginPath(); ctx.ellipse(0, 4, 13, 11, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#43a047'; ctx.beginPath(); ctx.ellipse(0, -10, 12, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#1b5e20'; ctx.beginPath(); ctx.arc(-8, -16, 5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(8, -16, 5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'black'; ctx.beginPath(); ctx.arc(-8, -16, 3, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(8, -16, 3, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-7, -17, 1.2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(9, -17, 1.2, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#1b5e20'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-8, -5); ctx.quadraticCurveTo(0, -1, 8, -5); ctx.stroke(); ctx.fillStyle = '#2e7d32'; ctx.beginPath(); ctx.ellipse(-14, 8, 6, 4, .5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, 8, 6, 4, -.5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); bubble(e, 0, -32); }

export function drawBee(e) { const t = Date.now() / 60; ctx.save(); ctx.translate(wx(e.x + 14), wy(e.y + 11)); if (e.vx < 0) ctx.scale(-1, 1); ctx.globalAlpha = .6; ctx.fillStyle = '#e3f2fd'; ctx.beginPath(); ctx.ellipse(-6, -8, 10, 7, Math.PI * .3 + Math.sin(t) * .3, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(6, -8, 10, 7, -Math.PI * .3 - Math.sin(t) * .3, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; ctx.fillStyle = '#fdd835'; ctx.beginPath(); ctx.ellipse(0, 0, 10, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#212121'; ctx.fillRect(-10, -6, 20, 4); ctx.fillRect(-10, 2, 20, 4); ctx.fillStyle = '#fdd835'; ctx.beginPath(); ctx.ellipse(0, -10, 9, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.arc(-4, -12, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(4, -12, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f57f17'; ctx.beginPath(); ctx.moveTo(0, 14); ctx.lineTo(-3, 10); ctx.lineTo(3, 10); ctx.fill(); ctx.strokeStyle = '#212121'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-4, -18); ctx.lineTo(-8, -26); ctx.stroke(); ctx.beginPath(); ctx.moveTo(4, -18); ctx.lineTo(8, -26); ctx.stroke(); ctx.fillStyle = '#f44336'; ctx.beginPath(); ctx.arc(-8, -27, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(8, -27, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); bubble(e, 0, -34); }

export function drawSnail(e) { ctx.save(); ctx.translate(wx(e.x + 15), wy(e.y + 13)); if (e.dir < 0) ctx.scale(-1, 1); ctx.fillStyle = '#8d6e63'; ctx.beginPath(); ctx.arc(2, -4, 13, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#6d4c41'; ctx.beginPath(); ctx.arc(2, -4, 9, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#4e342e'; ctx.beginPath(); ctx.arc(2, -4, 5, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#bcaaa4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(2, -4, 10, Math.PI * .2, Math.PI * 1.8, true); ctx.stroke(); ctx.fillStyle = '#c8e6c9'; ctx.beginPath(); ctx.ellipse(-4, 8, 12, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#a5d6a7'; ctx.beginPath(); ctx.ellipse(-14, 4, 7, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#388e3c'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-16, -2); ctx.lineTo(-20, -10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-12, -2); ctx.lineTo(-10, -10); ctx.stroke(); ctx.fillStyle = '#1a237e'; ctx.beginPath(); ctx.arc(-20, -11, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(-10, -11, 2.5, 0, Math.PI * 2); ctx.fill(); if (e.sI - e.sT < 20) { ctx.fillStyle = '#f44336'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('!!', -14, -8); } ctx.restore(); bubble(e, 0, -30); }

export function drawTurtle(e) {
  ctx.save(); ctx.translate(wx(e.x + 14), wy(e.y + 12)); if (e.vx < 0) ctx.scale(-1, 1); if (e.stunT > 0) { ctx.globalAlpha = .5 + Math.sin(Date.now() / 80) * .5; } ctx.fillStyle = '#2e7d32'; ctx.beginPath(); ctx.ellipse(0, 2, 14, 10, 0, 0, Math.PI * 2); ctx.fill(); // Shell
  ctx.fillStyle = '#1b5e20'; ctx.beginPath(); ctx.ellipse(0, -2, 12, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#388e3c'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-12, -2); ctx.lineTo(12, -2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(8, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(8, -8); ctx.lineTo(-8, 4); ctx.stroke(); // Head
  ctx.fillStyle = '#4caf50'; ctx.beginPath(); ctx.ellipse(-14, -1, 7, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#1a237e'; ctx.beginPath(); ctx.arc(-18, -3, 2, 0, Math.PI * 2); ctx.fill(); // HP indicator
  if (e.hp > 1) { ctx.fillStyle = '#ffd700'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('♥♥', 0, -18); } else { ctx.fillStyle = '#ff5722'; ctx.fillText('♥', 0, -18); } ctx.restore(); bubble(e, 0, -26);
}

export function drawFox(e) {
  ctx.save(); ctx.translate(wx(e.x + 13), wy(e.y + 14)); if (e.vx < 0) ctx.scale(-1, 1); const run = Math.abs(e.vx) > 3; // Body
  ctx.fillStyle = '#e65100'; ctx.beginPath(); ctx.ellipse(0, 4, 13, 11, 0, 0, Math.PI * 2); ctx.fill(); // Tail (bushy)
  ctx.strokeStyle = '#bf360c'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(12, 2); ctx.quadraticCurveTo(22, -4, 18, -16); ctx.stroke(); ctx.strokeStyle = 'white'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(12, 2); ctx.quadraticCurveTo(22, -4, 18, -16); ctx.stroke(); // Head
  ctx.fillStyle = '#e65100'; ctx.beginPath(); ctx.ellipse(0, -14, 12, 10, 0, 0, Math.PI * 2); ctx.fill(); // Ears (pointy)
  ctx.fillStyle = '#bf360c'; ctx.beginPath(); ctx.moveTo(-12, -18); ctx.lineTo(-16, -30); ctx.lineTo(-4, -22); ctx.fill(); ctx.beginPath(); ctx.moveTo(12, -18); ctx.lineTo(16, -30); ctx.lineTo(4, -22); ctx.fill(); // Snout
  ctx.fillStyle = '#ffccbc'; ctx.beginPath(); ctx.ellipse(0, -10, 7, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.arc(-4, -16, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(4, -16, 2.5, 0, Math.PI * 2); ctx.fill(); if (run) { ctx.fillStyle = '#ff5722'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('💨', 10, -8); } ctx.restore(); bubble(e, 0, -32);
}

export function drawBat(e) {
  const t = Date.now() / 80; ctx.save(); ctx.translate(wx(e.x + 14), wy(e.y + 10)); if (e.vx < 0) ctx.scale(-1, 1); // Wings
  ctx.fillStyle = '#4a148c'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-28, 8 + Math.sin(t) * 6); ctx.lineTo(-22, -4); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(28, 8 + Math.sin(t + .2) * 6); ctx.lineTo(22, -4); ctx.closePath(); ctx.fill(); // Body
  ctx.fillStyle = '#6a1b9a'; ctx.beginPath(); ctx.ellipse(0, 2, 10, 12, 0, 0, Math.PI * 2); ctx.fill(); // Head
  ctx.fillStyle = '#4a148c'; ctx.beginPath(); ctx.ellipse(0, -10, 9, 8, 0, 0, Math.PI * 2); ctx.fill(); // Ears
  ctx.fillStyle = '#6a1b9a'; ctx.beginPath(); ctx.moveTo(-9, -14); ctx.lineTo(-14, -24); ctx.lineTo(-3, -14); ctx.fill(); ctx.beginPath(); ctx.moveTo(9, -14); ctx.lineTo(14, -24); ctx.lineTo(3, -14); ctx.fill(); ctx.fillStyle = '#ce93d8'; ctx.beginPath(); ctx.arc(-4, -12, 2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(4, -12, 2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); bubble(e, 0, -30);
}

export function drawSnake(e) {
  ctx.save(); ctx.translate(wx(e.x + 14), wy(e.y + 12)); if (e.dir < 0) ctx.scale(-1, 1); const t = Date.now() / 200; // Body S-curve
  ctx.strokeStyle = '#1b5e20'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-12, 6); ctx.quadraticCurveTo(0, 6 + Math.sin(t) * 4, 12, 6); ctx.stroke(); ctx.strokeStyle = '#388e3c'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-12, 6); ctx.quadraticCurveTo(0, 6 + Math.sin(t) * 4, 12, 6); ctx.stroke(); // Scales
  ctx.fillStyle = '#2e7d32'; for (let i = -10; i < 12; i += 6) { ctx.beginPath(); ctx.arc(i, 6 + Math.sin(t + i * .2) * .4 * 4, 4, 0, Math.PI * 2); ctx.fill(); } // Head
  ctx.fillStyle = '#1b5e20'; ctx.beginPath(); ctx.ellipse(16, 4, 9, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f9a825'; ctx.beginPath(); ctx.arc(20, 2, 2.5, 0, Math.PI * 2); ctx.fill(); // Tongue
  ctx.strokeStyle = '#f44336'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(24, 4); ctx.lineTo(30, 2); ctx.moveTo(24, 4); ctx.lineTo(30, 6); ctx.stroke(); ctx.restore(); bubble(e, 0, -28);
}

export function drawSpider(e) { // Web line
  ctx.strokeStyle = 'rgba(200,200,200,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(wx(e.x + 12), wy(e.topY)); ctx.lineTo(wx(e.x + 12), wy(e.y)); ctx.stroke(); ctx.save(); ctx.translate(wx(e.x + 12), wy(e.y + 12)); const t = Date.now() / 300; // Legs (8)
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 2; for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + t * .5, r = 16 + Math.sin(a * 2 + t) * 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); ctx.stroke(); } // Body
  ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.ellipse(0, 3, 8, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f44336'; ctx.beginPath(); ctx.ellipse(0, -5, 6, 6, 0, 0, Math.PI * 2); ctx.fill(); // Red eyes
  ctx.fillStyle = '#ff1744'; for (const [ex, ey] of [[-5, -7], [5, -7], [-3, -4], [3, -4], [-6, -4], [6, -4]]) { ctx.beginPath(); ctx.arc(ex, ey, 1.5, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); bubble(e, 0, -28);
}

export function drawDemon(e) {
  const t = Date.now() / 200; ctx.save(); ctx.translate(wx(e.x + 14), wy(e.y + 16)); if (e.vx < 0) ctx.scale(-1, 1); // Wings
  ctx.fillStyle = 'rgba(100,0,0,.7)'; ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(-30, -14 + Math.sin(t) * 4); ctx.lineTo(-20, 10); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(30, -14 + Math.sin(t + .3) * 4); ctx.lineTo(20, 10); ctx.closePath(); ctx.fill(); // Body
  ctx.fillStyle = '#b71c1c'; ctx.beginPath(); ctx.ellipse(0, 6, 13, 14, 0, 0, Math.PI * 2); ctx.fill(); // Head
  ctx.fillStyle = '#c62828'; ctx.beginPath(); ctx.ellipse(0, -10, 12, 11, 0, 0, Math.PI * 2); ctx.fill(); // Horns
  ctx.fillStyle = '#4a0000'; ctx.beginPath(); ctx.moveTo(-10, -18); ctx.lineTo(-14, -32); ctx.lineTo(-5, -20); ctx.fill(); ctx.beginPath(); ctx.moveTo(10, -18); ctx.lineTo(14, -32); ctx.lineTo(5, -20); ctx.fill(); // Eyes (glowing)
  ctx.fillStyle = '#ff6d00'; ctx.beginPath(); ctx.arc(-5, -12, 4, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(5, -12, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.arc(-5, -12, 2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(5, -12, 2, 0, Math.PI * 2); ctx.fill(); // Mouth (fangs)
  ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.moveTo(-8, -5); ctx.quadraticCurveTo(0, -1, 8, -5); ctx.lineTo(6, -3); ctx.lineTo(4, -5); ctx.lineTo(0, -2); ctx.lineTo(-4, -5); ctx.lineTo(-6, -3); ctx.closePath(); ctx.fill(); ctx.restore(); bubble(e, 0, -38);
}

export function drawRobot(e) {
  ctx.save(); ctx.translate(wx(e.x + 14), wy(e.y + 16)); if (e.vx < 0) ctx.scale(-1, 1); // Body
  ctx.fillStyle = '#546e7a'; ctx.fillRect(-12, -14, 24, 28); ctx.fillStyle = '#78909c'; ctx.fillRect(-10, -12, 20, 6); // Head
  ctx.fillStyle = '#607d8b'; ctx.fillRect(-11, -28, 22, 16); // Antenna
  ctx.fillStyle = '#546e7a'; ctx.fillRect(-1, -36, 2, 10); ctx.fillStyle = '#f44336'; ctx.beginPath(); ctx.arc(0, -37, 3, 0, Math.PI * 2); ctx.fill(); // Eyes (laser scan)
  const scan = Math.sin(Date.now() / 200); ctx.fillStyle = e.sI - e.sT < 20 ? '#f44336' : `rgb(${50 + scan * 50 | 0},255,${50 + scan * 50 | 0})`; ctx.fillRect(-9, -26, 7, 6); ctx.fillRect(2, -26, 7, 6); // Charging indicator
  if (e.sI - e.sT < 20) { ctx.fillStyle = '#ff1744'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('FIRE', 0, -40); } // Feet
  ctx.fillStyle = '#455a64'; ctx.fillRect(-13, 14, 10, 8); ctx.fillRect(3, 14, 10, 8); ctx.restore(); bubble(e, 0, -44);
}
