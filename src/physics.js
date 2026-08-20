'use strict';
/* ═══ PHYSICS: player movement, collisions, death/scoring ════════════════ */
import { GR, MXF } from './constants.js';
import { G, P } from './state.js';
import { dt, playerSpeedMul } from './settings.js';
import { sfx } from './audio.js';
import { boom, addF } from './effects.js';
import { DMSG } from './data/deathMessages.js';

export { GR, MXF };

export function ov(ax, ay, aw, ah, bx, by, bw, bh) { return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by; }

export function resetP() {
  Object.assign(P, { x: 60, y: 380, vx: 0, vy: 0, onGround: false, facing: 1, frame: 0, frameT: 0, dead: false, deadVy: 0, iceA: 0, tailWag: 0 });
  G.coyoteT = 0;
}

export function pickMsg() {
  const p = DMSG[G.lvl] || DMSG[0];
  if (G.deaths > 0 && G.deaths % 5 === 0) return '你已死亡 ' + G.deaths + ' 次，好狗不怕再死一次';
  return p[Math.random() * p.length | 0];
}

export function killP(msg) {
  if (P.dead || G.state !== 'play') return;
  P.dead = true; P.deadVy = -8; G.state = 'dead'; G.deaths++; G.deathMsg = msg || pickMsg(); G.deadT = 160;
  sfx('hurt');
  boom(P.x + 15, P.y + 16, '#ff6b35', 14); addF(P.x + 15, P.y - 22, '💀 汪！', '#ff6b35');
}

export function physicsStep(K) {
  const d = dt();
  G.onMoving = null;
  let mx = 0;
  const moveSpeed = G.charSPD * playerSpeedMul;
  if (K.ArrowLeft || K.KeyA) mx = -1;
  if (K.ArrowRight || K.KeyD) mx = 1;
  if (mx) P.facing = mx;
  P.iceA = mx ? Math.max(-moveSpeed * 1.6, Math.min(moveSpeed * 1.6, P.iceA + mx * .45 * d)) : P.iceA * Math.pow(.84, d);
  if (Math.abs(P.iceA) < .1) P.iceA = 0;
  P.vx = mx * moveSpeed;
  if ((K.ArrowUp || K.Space || K.KeyW || K.KeyZ) && (P.onGround || G.coyoteT > 0)) { P.vy = G.charJV; P.onGround = false; G.coyoteT = 0; sfx('jump'); boom(P.x + 15, P.y + 32, '#ffcc88', 4); }
  P.vy = Math.min(P.vy + GR * d, MXF);
  P.x += P.vx * d; P.onGround = false;
  // X collision
  for (const pl of G.plats) {
    if (pl.type === 'broken') continue;
    if (ov(P.x, P.y, P.w, P.h, pl.x, pl.y, pl.w, pl.h)) { P.x = P.vx > 0 ? pl.x - P.w : pl.x + pl.w; P.vx = 0; }
  }
  P.y += P.vy * d;
  // Y collision
  for (const pl of G.plats) {
    if (pl.type === 'broken') continue;
    if (ov(P.x, P.y, P.w, P.h, pl.x, pl.y, pl.w, pl.h)) {
      if (P.y + P.h - P.vy * d <= pl.y + 6 && P.vy >= 0) {
        P.y = pl.y - P.h;
        if (pl.type === 'bounce') { P.vy = G.charJV * 1.45; sfx('bounce'); addF(pl.x + pl.w / 2, pl.y - 22, '汪！BOING！', '#ffd700'); boom(P.x + 15, P.y + 32, '#ffd700', 7); }
        else if (pl.type === 'death' || pl.type === 'lava') { killP('"' + pl.label + '"不安全，小汪昇天'); return; }
        else {
          P.vy = 0; P.onGround = true;
          if (pl.type === 'crumble' && !pl.broken) { pl.broken = true; pl.breakT = 50; }
          if (pl.type === 'fake' && !pl.broken) { pl.broken = true; pl.breakT = 32; addF(pl.x + pl.w / 2, pl.y - 18, '假的啦！', '#ff6b35'); }
          if (pl.type === 'sand') { pl.sinkT = (pl.sinkT || 0) + 1; if (pl.sinkT > 120) { pl.broken = true; addF(pl.x + pl.w / 2, pl.y - 18, '沙台崩了！', '#f5a623'); } }
          if (pl.type === 'ice') P.vx = P.iceA;
          if (pl.type === 'conv') P.vx += pl.dir * 2.5;
          if (pl.type === 'moving' || pl.type === 'elev') G.onMoving = pl;
        }
      } else if (P.vy < 0) { P.y = pl.y + pl.h; P.vy = 0; }
    }
  }
  G.coyoteT = P.onGround ? 8 : Math.max(0, G.coyoteT - d);
  // Reset sand
  for (const pl of G.plats) if (pl.type === 'sand' && !pl.broken && pl.sinkT > 0 && !(P.onGround && P.y + P.h >= pl.y - 2 && P.y + P.h <= pl.y + 4 && P.x + P.w > pl.x && P.x < pl.x + pl.w)) pl.sinkT = Math.max(0, pl.sinkT - 1);
  // Update crumble/fake/sand
  for (const pl of G.plats) {
    if ((pl.type === 'crumble' || pl.type === 'fake') && pl.broken) { pl.breakT--; if (pl.breakT <= 0) pl.type = 'broken'; }
    if (pl.type === 'sand' && pl.sinkT > 80) pl.y = pl.origY + (pl.sinkT - 80) * .5;
  }
  // Moving platform carry
  if (G.onMoving) { P.x += (G.onMoving.mvx || 0) * d; P.y += (G.onMoving.evy || 0) * d; }
  // Spikes
  for (const sp of G.spikes) if (ov(P.x + 2, P.y + 2, P.w - 4, P.h - 4, sp.x, sp.y, sp.w, sp.h)) { killP('尖刺穿過狗狗的圓滾身體'); return; }
  // Enemies
  for (const e of G.enemies) {
    if (!e.alive) continue;
    if (ov(P.x + 2, P.y + 2, P.w - 4, P.h - 4, e.x, e.y, e.w, e.h)) {
      const stomp = P.y + P.h - P.vy * d <= e.y + 10 && P.vy > 0;
      if (stomp && !e.immune) {
        sfx('stomp');
        if (e.type === 'turtle') {
          e.hp--;
          if (e.hp <= 0) { e.alive = false; G.score += 150; boom(e.x + 14, e.y + 12, '#78909c', 10); addF(e.x + 14, e.y - 12, '+150 龜龜GG', '#ffd700'); }
          else { e.stunT = 80; P.vy = -9; G.score += 50; addF(e.x + 14, e.y - 12, '+50 再來一次！', '#ffd700'); }
        } else {
          e.alive = false; P.vy = -9; G.score += 100; boom(e.x + e.w / 2, e.y + e.h / 2, '#ff8f00', 9); addF(e.x + e.w / 2, e.y - 12, '+100 踩！', '#ffd700');
        }
        P.vy = -9;
      } else {
        const mm = { walker: '被刺蝟刺到了', frog: '跳跳蛙壓扁你了', bee: '招惹蜜蜂做什麼', snail: '被蝸牛打到（蝸牛！）', turtle: '龜殼超硬，你頭破了', fox: '被狐狸追上了', bat: '從天而降的蝙蝠', snake: '蛇毒送你走', spider: '蜘蛛網捲起你', demon: '惡魔說：哈哈哈', robot: '系統偵測：狗狗已消滅' };
        killP(mm[e.type] || '被怪物打到了'); return;
      }
    }
  }
  // Projectiles
  for (const pr of G.projs) {
    const pw = pr.kind === 'laser' ? 16 : 10, ph = pr.kind === 'laser' ? 6 : 10;
    if (ov(P.x, P.y, P.w, P.h, pr.x - pw / 2, pr.y - ph / 2, pw, ph)) {
      const pm = { slime: '被蝸牛黏液彈打到', venom: '蛇毒！嘶～', fireball: '被惡魔火球燒到', laser: '機器人表示：目標消滅', rock: '石頭從天而降砸到了' };
      killP(pm[pr.kind] || '被彈藥打到'); return;
    }
  }
  // Coins
  for (const c of G.coins) if (!c.got && ov(P.x, P.y, P.w, P.h, c.x - 10, c.y - 10, 20, 20)) { c.got = true; G.score += c.bone ? 80 : 50; sfx(c.bone ? 'bone' : 'coin'); addF(c.x, c.y - 12, c.bone ? '+80 🦴' : '+50', '#ffd700'); }
  // Pit / left
  if (P.y > 560) { killP('跌入無底深淵，骨頭再見'); return; }
  if (P.x < -60) { killP('反方向沒有骨頭，只有懸崖'); return; }
  // Goal
  if (G.goal && ov(P.x, P.y, P.w, P.h, G.goal.x, G.goal.y, G.goal.w, G.goal.h)) { boom(G.goal.x + 24, G.goal.y + 84, '#ffd700', 30); sfx(G.lvl < 5 ? 'clear' : 'win'); G.state = G.lvl < 5 ? 'levelClear' : 'win'; G.clrT = 0; }
  // Walk anim
  if (P.onGround && Math.abs(P.vx) > .5) { P.frameT += d; if (P.frameT > 7) { P.frameT = 0; P.frame = 1 - P.frame; } } else { P.frame = 0; P.frameT = 0; }
  P.tailWag = Math.sin(Date.now() / 120) * (P.onGround && Math.abs(P.vx) > 1 ? .7 : .25);
}
