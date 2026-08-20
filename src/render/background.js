'use strict';
/* ═══ BACKGROUND ═══════════════════════════════════════════════════════ */
import { ctx, W, H } from './canvas.js';
import { G, snowflakes } from '../state.js';

const THEMES = ['prairie', 'desert', 'snow', 'volcano', 'city', 'castle'];

export function drawBG() {
  const t = THEMES[G.lvl] || 'prairie';
  if (t === 'prairie') drawPrairie();
  else if (t === 'desert') drawDesert();
  else if (t === 'snow') drawSnow();
  else if (t === 'volcano') drawVolcano();
  else if (t === 'city') drawCity();
  else drawCastle();
}

function drawPrairie() {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3e1f00'); g.addColorStop(1, '#7b3f00'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(60,30,5,.5)'; const tO = G.cam.x * .22;
  for (const tx of [0, 160, 320, 480, 640, 800, 960, 1120]) { const bx = (tx - tO % 1280 + 1280) % 1280 - 40; ctx.fillRect(bx + 18, H - 110, 8, 60); ctx.beginPath(); ctx.arc(bx + 22, H - 118, 28, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(bx + 10, H - 102, 18, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(bx + 34, H - 105, 18, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,200,120,.14)'; const cO = G.cam.x * .3;
  for (const cx of [0, 260, 520, 780, 1040, 1300]) { const bx = (cx - cO % 1560 + 1560) % 1560 - 100, by = 55 + Math.sin(cx) * 28; ctx.beginPath(); ctx.arc(bx, by, 26, 0, Math.PI * 2); ctx.arc(bx + 32, by - 8, 32, 0, Math.PI * 2); ctx.arc(bx + 62, by, 22, 0, Math.PI * 2); ctx.fill(); }
}

function drawDesert() {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#b5651d'); g.addColorStop(.5, '#f4a460'); g.addColorStop(1, '#deb887'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,220,50,.6)'; ctx.beginPath(); ctx.arc(W - 80, 80, 55, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(60,100,30,.65)'; const caO = G.cam.x * .25;
  for (const cx of [0, 200, 400, 600, 800, 1000, 1200]) { const bx = (cx - caO % 1400 + 1400) % 1400 - 20; ctx.fillRect(bx + 12, H - 140, 10, 90); ctx.fillRect(bx - 2, H - 110, 36, 8); ctx.fillRect(bx - 2, H - 112, 8, 22); ctx.fillRect(bx + 18, H - 118, 8, 20); }
}

function drawSnow() {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a2a4a'); g.addColorStop(1, '#2c4a7a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(220,235,250,.25)'; const mO = G.cam.x * .08;
  for (let i = 0; i < 10; i++) { const mx = (i * 190 - mO % 190) - 60; ctx.beginPath(); ctx.moveTo(mx, H); ctx.lineTo(mx + 95, H - 200); ctx.lineTo(mx + 190, H); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,255,255,.7)';
  for (const sf of snowflakes) { sf.y += (sf.s + G.cam.y * .001); sf.x += Math.sin(Date.now() / 800 + sf.r) * .3; if (sf.y > H + 10) sf.y = -10; if (sf.x > W + 10) sf.x = -10; if (sf.x < -10) sf.x = W + 10; ctx.beginPath(); ctx.arc(sf.x, sf.y, sf.r, 0, Math.PI * 2); ctx.fill(); }
}

function drawVolcano() {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a0500'); g.addColorStop(.5, '#5a1000'); g.addColorStop(1, '#8b1a00'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // Lava glow at bottom
  const lg = ctx.createLinearGradient(0, H - 80, 0, H); lg.addColorStop(0, 'rgba(255,80,0,0)'); lg.addColorStop(1, 'rgba(255,120,0,.4)'); ctx.fillStyle = lg; ctx.fillRect(0, H - 80, W, 80);
  // Volcanic smoke
  ctx.fillStyle = 'rgba(80,40,20,.3)'; const sO = G.cam.x * .12;
  for (const cx of [0, 180, 360, 540, 720]) { const bx = (cx - sO % 900 + 900) % 900 - 60, t = Date.now() / 2000; ctx.beginPath(); ctx.arc(bx + 40, H - 160 + Math.sin(t + cx) * .10, 45 + Math.cos(t) * 5, 0, Math.PI * 2); ctx.fill(); }
}

function drawCity() {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a0a1a'); g.addColorStop(1, '#1a1a2e'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // Buildings
  ctx.fillStyle = 'rgba(30,30,60,.8)'; const bO = G.cam.x * .18;
  for (const bx of [0, 120, 240, 360, 480, 600, 720, 840, 960, 1080]) {
    const x = (bx - bO % 1200 + 1200) % 1200 - 60, bh = 80 + ((bx * 13) % 100);
    ctx.fillRect(x, H - bh - 32, 55, bh);
    // Windows
    ctx.fillStyle = 'rgba(255,255,100,.6)';
    for (let wy = H - bh - 20; wy < H - 32; wy += 18) for (let wx = x + 6; wx < x + 50; wx += 16) if (Math.random() > .3) ctx.fillRect(wx, wy, 8, 10);
    ctx.fillStyle = 'rgba(30,30,60,.8)';
  }
  // Neon glow
  ctx.fillStyle = 'rgba(255,0,100,.15)'; ctx.fillRect(0, 0, W, H);
}

function drawCastle() {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a0006'); g.addColorStop(1, '#1a0028'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // Stars (more ominous)
  for (const s of [13, 57, 149, 217, 331, 417, 523, 627, 713]) { ctx.fillStyle = 'rgba(200,150,255,.6)'; ctx.beginPath(); ctx.arc((s * 139) % W, (s * 97) % H * .6, 1.2, 0, Math.PI * 2); ctx.fill(); }
  // Torches
  ctx.fillStyle = 'rgba(255,140,0,.3)'; const tO = G.cam.x * .2;
  for (const tx of [0, 200, 400, 600, 800]) { const bx = (tx - tO % 1000 + 1000) % 1000 - 30, t = Date.now() / 300; ctx.beginPath(); ctx.arc(bx, H - 60 + Math.sin(t + bx) * .3, 12 + Math.cos(t) * 2, 0, Math.PI * 2); ctx.fill(); }
  // Lightning flicker
  if (Math.random() < .01) { ctx.fillStyle = 'rgba(200,150,255,.1)'; ctx.fillRect(0, 0, W, H); }
}
