'use strict';
/* ═══ DRAW: PLAYER CHARACTERS ══════════════════════════════════════════ */
import { ctx } from './canvas.js';
import { wx, wy, rr } from './utils.js';
import { G, P, W, H, CHARS } from '../state.js';
import { T } from '../i18n.js';

export function drawDog(x, y, facing, frame, dead, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(wx(x + 15), wy(y + 16));
  if (facing < 0) ctx.scale(-1, 1); if (dead) ctx.rotate(Math.PI);
  const lo = frame === 1 ? 3 : 0, tw = P.tailWag || 0;
  ctx.strokeStyle = '#c8702a'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(12, 0); ctx.quadraticCurveTo(22 + tw * 8, -12 + tw * 4, 14 + tw * 4, -22 + tw * 2); ctx.stroke();
  ctx.fillStyle = '#f5e0b0'; ctx.beginPath(); ctx.arc(14 + tw * 4, -22 + tw * 2, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d4853a'; ctx.beginPath(); ctx.ellipse(0, 4, 13, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f5e0b0'; ctx.beginPath(); ctx.ellipse(0, 6, 7, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d4853a'; ctx.beginPath(); ctx.ellipse(0, -16, 13, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#c8702a';
  ctx.beginPath(); ctx.moveTo(-13, -18); ctx.lineTo(-18, -30); ctx.lineTo(-4, -24); ctx.fill();
  ctx.beginPath(); ctx.moveTo(13, -18); ctx.lineTo(18, -30); ctx.lineTo(4, -24); ctx.fill();
  ctx.fillStyle = '#e8a070';
  ctx.beginPath(); ctx.moveTo(-12, -19); ctx.lineTo(-16, -28); ctx.lineTo(-6, -23); ctx.fill();
  ctx.beginPath(); ctx.moveTo(12, -19); ctx.lineTo(16, -28); ctx.lineTo(6, -23); ctx.fill();
  ctx.fillStyle = '#f5e0b0'; ctx.beginPath(); ctx.ellipse(0, -12, 7, 5, 0, 0, Math.PI * 2); ctx.fill();
  if (!dead) {
    ctx.fillStyle = '#2c1810'; ctx.beginPath(); ctx.arc(-5, -18, 3.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(5, -18, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-4, -19, 1.4, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(6, -19, 1.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2c1810'; ctx.beginPath(); ctx.ellipse(0, -11, 3.5, 2.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#2c1810'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-4, -9); ctx.quadraticCurveTo(0, -7, 4, -9); ctx.stroke();
    if (frame === 1) { ctx.fillStyle = '#ff6b81'; ctx.beginPath(); ctx.ellipse(3, -6, 3, 4, .3, 0, Math.PI * 2); ctx.fill(); }
  } else { ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#2c1810'; ctx.fillText('✕  ✕', 0, -15); ctx.strokeStyle = '#2c1810'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-4, -7); ctx.quadraticCurveTo(0, -10, 4, -7); ctx.stroke(); }
  ctx.fillStyle = '#c8702a'; ctx.beginPath(); rr(-12, 10 + lo, 9, 12, 3); ctx.fill(); ctx.beginPath(); rr(3, 10 - lo, 9, 12, 3); ctx.fill();
  ctx.fillStyle = '#d4853a'; ctx.beginPath(); ctx.ellipse(-7, 23 + lo, 6, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(8, 23 - lo, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

export function drawCat(x, y, facing, frame, dead, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(wx(x + 15), wy(y + 16));
  if (facing < 0) ctx.scale(-1, 1); if (dead) ctx.rotate(Math.PI);
  const lo = frame === 1 ? 3 : 0;
  ctx.strokeStyle = '#c87030'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10, 0); ctx.quadraticCurveTo(24, -8, 20, -20); ctx.stroke();
  ctx.fillStyle = '#e8793a'; ctx.beginPath(); ctx.ellipse(0, 4, 12, 14, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f5d0a0'; ctx.beginPath(); ctx.ellipse(0, 6, 7, 9, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8793a'; ctx.beginPath(); ctx.ellipse(0, -16, 12, 11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8793a'; ctx.beginPath(); ctx.moveTo(-12, -22); ctx.lineTo(-16, -36); ctx.lineTo(-4, -24); ctx.fill(); ctx.beginPath(); ctx.moveTo(12, -22); ctx.lineTo(16, -36); ctx.lineTo(4, -24); ctx.fill();
  ctx.fillStyle = '#f5a0b0'; ctx.beginPath(); ctx.moveTo(-11, -23); ctx.lineTo(-14, -33); ctx.lineTo(-5, -25); ctx.fill(); ctx.beginPath(); ctx.moveTo(11, -23); ctx.lineTo(14, -33); ctx.lineTo(5, -25); ctx.fill();
  ctx.fillStyle = '#f5d0a0'; ctx.beginPath(); ctx.ellipse(0, -13, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  if (!dead) {
    ctx.fillStyle = '#1a5276'; ctx.beginPath(); ctx.arc(-4, -18, 3, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(4, -18, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'black'; ctx.beginPath(); ctx.arc(-4, -18, 1.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(4, -18, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-3, -19, 1, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(5, -19, 1, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2c1810'; ctx.beginPath(); ctx.ellipse(0, -12, 3, 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#2c1810'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-3, -10); ctx.quadraticCurveTo(0, -8, 3, -10); ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-6, -12); ctx.lineTo(-16, -11); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-6, -11); ctx.lineTo(-16, -14); ctx.stroke(); ctx.beginPath(); ctx.moveTo(6, -12); ctx.lineTo(16, -11); ctx.stroke(); ctx.beginPath(); ctx.moveTo(6, -11); ctx.lineTo(16, -14); ctx.stroke();
    ctx.strokeStyle = '#c86030'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-4, -8); ctx.lineTo(-3, -2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(4, -8); ctx.lineTo(3, -2); ctx.stroke();
    if (frame === 1) { ctx.fillStyle = '#ff6b81'; ctx.beginPath(); ctx.ellipse(3, -6, 3, 4, .3, 0, Math.PI * 2); ctx.fill(); }
  } else { ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#2c1810'; ctx.fillText('✕  ✕', 0, -16); ctx.strokeStyle = '#2c1810'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-3, -8); ctx.quadraticCurveTo(0, -10, 3, -8); ctx.stroke(); }
  ctx.fillStyle = '#e8793a'; ctx.beginPath(); rr(-11, 10 + lo, 9, 11, 3); ctx.fill(); ctx.beginPath(); rr(3, 10 - lo, 9, 11, 3); ctx.fill();
  ctx.fillStyle = '#c86030'; ctx.beginPath(); ctx.ellipse(-6, 22 + lo, 5, 3, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(7, 22 - lo, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

export function drawBunny(x, y, facing, frame, dead, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(wx(x + 15), wy(y + 16));
  if (facing < 0) ctx.scale(-1, 1); if (dead) ctx.rotate(Math.PI);
  const lo = frame === 1 ? 3 : 0;
  ctx.fillStyle = '#f0e0e0'; ctx.beginPath(); ctx.ellipse(-6, -30, 5, 18, -.2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(6, -30, 5, 18, .2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ff9999'; ctx.beginPath(); ctx.ellipse(-6, -30, 2.5, 14, -.2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(6, -30, 2.5, 14, .2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.ellipse(0, 4, 13, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(0, 6, 8, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.ellipse(0, -15, 12, 11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-14, 2, 6, 0, Math.PI * 2); ctx.fill();
  if (!dead) {
    ctx.fillStyle = '#333'; ctx.beginPath(); ctx.arc(-4, -18, 3, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(4, -18, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-3, -19, 1.2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(5, -19, 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff9999'; ctx.beginPath(); ctx.ellipse(0, -12, 3, 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#bbb'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-3, -10); ctx.quadraticCurveTo(0, -8, 3, -10); ctx.stroke();
    if (frame === 1) { ctx.fillStyle = '#ff6b81'; ctx.beginPath(); ctx.ellipse(3, -6, 3, 4, .3, 0, Math.PI * 2); ctx.fill(); }
  } else { ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#555'; ctx.fillText('✕  ✕', 0, -16); ctx.strokeStyle = '#bbb'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-3, -8); ctx.quadraticCurveTo(0, -10, 3, -8); ctx.stroke(); }
  ctx.fillStyle = '#f0e0e0'; ctx.beginPath(); rr(-12, 10 + lo, 9, 12, 3); ctx.fill(); ctx.beginPath(); rr(3, 10 - lo, 9, 12, 3); ctx.fill();
  ctx.fillStyle = '#e8d0d0'; ctx.beginPath(); ctx.ellipse(-7, 23 + lo, 6, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(8, 23 - lo, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

export function drawPanda(x, y, facing, frame, dead, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(wx(x + 15), wy(y + 16));
  if (facing < 0) ctx.scale(-1, 1); if (dead) ctx.rotate(Math.PI);
  const lo = frame === 1 ? 3 : 0;
  ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-10, -25, 7, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(10, -25, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.ellipse(0, 4, 15, 17, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#222'; ctx.beginPath(); ctx.ellipse(-9, 6, 5, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(9, 6, 5, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.ellipse(0, -16, 13, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#222'; ctx.beginPath(); ctx.ellipse(-5, -17, 5, 4, -.3, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(5, -17, 5, 4, .3, 0, Math.PI * 2); ctx.fill();
  if (!dead) {
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-4, -18, 2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(6, -18, 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-4, -18, 1.2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(6, -18, 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e88'; ctx.beginPath(); ctx.ellipse(0, -11, 4, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-4, -9); ctx.quadraticCurveTo(0, -7, 4, -9); ctx.stroke();
    if (frame === 1) { ctx.fillStyle = '#ff6b81'; ctx.beginPath(); ctx.ellipse(3, -6, 3, 4, .3, 0, Math.PI * 2); ctx.fill(); }
  } else { ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#222'; ctx.fillText('✕  ✕', 0, -16); ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-4, -8); ctx.quadraticCurveTo(0, -10, 4, -8); ctx.stroke(); }
  ctx.fillStyle = '#222'; ctx.beginPath(); rr(-13, 10 + lo, 10, 13, 3); ctx.fill(); ctx.beginPath(); rr(4, 10 - lo, 10, 13, 3); ctx.fill();
  ctx.fillStyle = '#444'; ctx.beginPath(); ctx.ellipse(-7, 24 + lo, 6, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(8, 24 - lo, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

export function drawPlayer(x, y, facing, frame, dead, alpha = 1) {
  const id = CHARS[G.selectedChar].id;
  if (id === 'dog') drawDog(x, y, facing, frame, dead, alpha);
  else if (id === 'cat') drawCat(x, y, facing, frame, dead, alpha);
  else if (id === 'bunny') drawBunny(x, y, facing, frame, dead, alpha);
  else if (id === 'panda') drawPanda(x, y, facing, frame, dead, alpha);
}

export function drawCharSelect() {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a0a2e'); g.addColorStop(1, '#3d1b5e'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.shadowColor = '#cc88ff'; ctx.shadowBlur = 18; ctx.fillStyle = '#cc88ff'; ctx.font = 'bold 30px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('✦ 選擇你的夥伴 ✦', W / 2, 52); ctx.shadowBlur = 0;
  ctx.fillStyle = '#9966bb'; ctx.font = '13px sans-serif'; ctx.fillText('← → 切換角色　　空白 / Enter 確認出發', W / 2, 80);
  ctx.fillStyle = 'rgba(26,10,46,.92)'; ctx.fillRect(110, 28, W - 220, 60);
  ctx.shadowColor = '#cc88ff'; ctx.shadowBlur = 18; ctx.fillStyle = '#cc88ff'; ctx.font = 'bold 30px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(T('charTitle'), W / 2, 52); ctx.shadowBlur = 0;
  ctx.fillStyle = '#9966bb'; ctx.font = '13px sans-serif'; ctx.fillText(T('charHelp'), W / 2, 80);
  const cw = 156, gap = 16, total = CHARS.length * (cw + gap) - gap, sx = (W - total) / 2;
  CHARS.forEach((ch, i) => {
    const cx = sx + i * (cw + gap), cy = 100, sel = i === G.selectedChar, bob = sel ? Math.sin(Date.now() / 300) * 4 : 0;
    ctx.fillStyle = sel ? 'rgba(200,150,255,.22)' : 'rgba(255,255,255,.06)'; rr(cx, cy + bob, cw, 238, 12); ctx.fill();
    if (sel) { ctx.strokeStyle = '#cc88ff'; ctx.lineWidth = 2.5; rr(cx, cy + bob, cw, 238, 12); ctx.stroke(); }
    // Draw sprite using cam coordinate hack to place character at card center
    const iconCx = cx + cw / 2, iconCy = cy + 128 + bob;
    const savedCam = { x: G.cam.x, y: G.cam.y };
    ctx.save();
    rr(cx + 4, cy + bob + 4, cw - 8, 178, 10); ctx.clip();
    ctx.translate(iconCx, iconCy); ctx.scale(1.8, 1.8); ctx.translate(-iconCx, -iconCy);
    G.cam.x = 15 - iconCx; G.cam.y = 16 - iconCy;
    const fr = Math.floor(Date.now() / 250) % 2;
    if (ch.id === 'dog') drawDog(0, 0, 1, fr, false);
    else if (ch.id === 'cat') drawCat(0, 0, 1, fr, false);
    else if (ch.id === 'bunny') drawBunny(0, 0, 1, fr, false);
    else if (ch.id === 'panda') drawPanda(0, 0, 1, fr, false);
    G.cam.x = savedCam.x; G.cam.y = savedCam.y;
    ctx.restore();
    ctx.textAlign = 'center';
    ctx.font = 'bold 14px sans-serif'; ctx.fillStyle = sel ? '#fff' : '#bbb'; ctx.fillText(ch.name, cx + cw / 2, cy + bob + 210);
    ctx.font = '11px sans-serif'; ctx.fillStyle = sel ? '#cc88ff' : '#777'; ctx.fillText(ch.desc, cx + cw / 2, cy + bob + 228);
  });
  const blink = Math.floor(Date.now() / 500) % 2 === 0;
  ctx.fillStyle = blink ? '#fff' : '#777'; ctx.font = 'bold 15px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('準備好了嗎？按下確認，踏上未知旅程！', W / 2, H - 22);
}
