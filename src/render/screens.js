'use strict';
/* ═══ DRAW: HUD + GAME-STATE SCREENS ═══════════════════════════════════ */
import { ctx } from './canvas.js';
import { G, W, H } from '../state.js';
import { T } from '../i18n.js';
import { STORY, CLRMSG } from '../data/story.js';

export function drawHUDLocalized() {
  ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(0, 0, W, 44);
  ctx.font = 'bold 15px sans-serif'; ctx.textAlign = 'left';
  ctx.fillStyle = '#ffd700'; ctx.fillText(T('score') + ' ' + G.score, 14, 28);
  ctx.fillStyle = '#ff6b35'; ctx.fillText(T('deaths') + ' ' + G.deaths, 160, 28);
  ctx.fillStyle = '#aaa'; ctx.textAlign = 'center'; ctx.fillText(STORY[G.lvl]?.title || '', W / 2, 28);
  ctx.fillStyle = '#666'; ctx.font = '12px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(T('retry'), W - 14, 28);
}

export function drawDeadScreen() {
  const prog = 1 - (G.deadT / 160); ctx.fillStyle = 'rgba(0,0,0,' + Math.min(.75, prog * 2) + ')'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = Math.min(1, prog * 3);
  ctx.fillStyle = '#ff6b35'; ctx.font = 'bold 48px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🐾 汪！你死了！', W / 2, H / 2 - 28);
  ctx.fillStyle = '#fff'; ctx.font = '19px sans-serif'; ctx.fillText(G.deathMsg, W / 2, H / 2 + 18);
  ctx.fillStyle = '#888'; ctx.font = '13px sans-serif'; ctx.fillText('（自動重試...）', W / 2, H / 2 + 55); ctx.restore();
}

export function drawLevelClear() {
  const prog = Math.min(1, G.clrT / 60); ctx.fillStyle = 'rgba(0,0,0,.82)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = prog;
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 50px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🎉 關卡通過！', W / 2, H / 2 - 52);
  ctx.fillStyle = '#fff'; ctx.font = '20px sans-serif'; ctx.fillText('小汪：「骨頭越來越近了！」', W / 2, H / 2 + 6);
  ctx.fillStyle = '#ffaa55'; ctx.font = '16px sans-serif'; ctx.fillText(CLRMSG[G.lvl] || '', W / 2, H / 2 + 40);
  const next = STORY[G.lvl + 1]; if (next) { ctx.fillStyle = '#aaa'; ctx.font = '14px sans-serif'; ctx.fillText(next.icon + ' ' + next.title + ' 準備好了嗎？', W / 2, H / 2 + 70); }
  ctx.fillStyle = '#777'; ctx.font = '13px sans-serif'; ctx.fillText('（自動繼續...）', W / 2, H / 2 + 110); ctx.restore();
}

export function drawStoryScreen() {
  const sd = STORY[G.lvl]; if (!sd) return;
  ctx.fillStyle = 'rgba(0,0,0,.92)'; ctx.fillRect(0, 0, W, H);
  const t = Math.min(1, G.storyT / 40); ctx.save(); ctx.globalAlpha = t;
  // Title
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 34px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(sd.icon + ' ' + sd.title, W / 2, 90);
  // Divider
  ctx.strokeStyle = 'rgba(255,165,53,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W / 2 - 200, 112); ctx.lineTo(W / 2 + 200, 112); ctx.stroke();
  // Lines
  ctx.fillStyle = '#eee'; ctx.font = '17px sans-serif';
  sd.lines.forEach((l, i) => {
    const a = Math.max(0, Math.min(1, (G.storyT - 30 - i * 20) / 25)); ctx.globalAlpha = t * a; ctx.fillText(l, W / 2, 155 + i * 40);
  });
  ctx.globalAlpha = t;
  const blink = Math.floor(G.storyT / 20) % 2 === 0; ctx.fillStyle = blink ? '#ff6b35' : '#884433'; ctx.font = 'bold 16px sans-serif'; ctx.fillText('按任意鍵開始', W / 2, H - 50);
  ctx.restore();
}

export function drawWinScreen() {
  ctx.fillStyle = 'rgba(0,0,0,.9)'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 42px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🏆 神聖骨頭到手！！', W / 2, H / 2 - 90);
  ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif'; ctx.fillText('小汪抱著骨頭痛快地啃了起來。', W / 2, H / 2 - 44);
  ctx.fillStyle = '#ffaa55'; ctx.font = '22px sans-serif'; ctx.fillText('六關總分 ' + G.score + '  死亡 ' + G.deaths + ' 次', W / 2, H / 2 - 4);
  let comment; if (G.deaths === 0) comment = '你是傳說，你就是那根神聖骨頭'; else if (G.deaths < 10) comment = '精英柴犬！獎你一根大骨頭'; else if (G.deaths < 30) comment = '辛苦了，骨頭啃起來更香'; else if (G.deaths < 60) comment = '死了' + G.deaths + '次才過，很有毅力'; else comment = '死了' + G.deaths + '次……我向你道歉（設計師說）';
  ctx.fillStyle = '#aaa'; ctx.font = '19px sans-serif'; ctx.fillText(comment, W / 2, H / 2 + 40);
  ctx.fillStyle = '#666'; ctx.font = '16px sans-serif'; ctx.fillText('按 R 重新挑戰', W / 2, H / 2 + 84);
}

export function drawTitle() {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3e1f00'); g.addColorStop(1, '#7b3f00'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (const s of [17, 63, 149, 207, 331, 417, 519, 623, 717, 821]) { ctx.fillStyle = 'rgba(255,220,120,.5)'; ctx.beginPath(); ctx.arc((s * 139) % W, (s * 97) % H, 1.5, 0, Math.PI * 2); ctx.fill(); }
  const bob = Math.sin(G.titleT / 30) * 7;
  ctx.save(); ctx.translate(W / 2, H / 2 - 50 + bob);
  ctx.fillStyle = '#d4853a'; ctx.beginPath(); ctx.ellipse(0, 30, 55, 48, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f5e0b0'; ctx.beginPath(); ctx.ellipse(0, 34, 30, 34, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#d4853a'; ctx.beginPath(); ctx.ellipse(0, -24, 48, 42, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#c8702a'; ctx.beginPath(); ctx.moveTo(-48, -30); ctx.lineTo(-62, -64); ctx.lineTo(-20, -36); ctx.fill(); ctx.beginPath(); ctx.moveTo(48, -30); ctx.lineTo(62, -64); ctx.lineTo(20, -36); ctx.fill(); ctx.fillStyle = '#e8a070'; ctx.beginPath(); ctx.moveTo(-45, -32); ctx.lineTo(-58, -60); ctx.lineTo(-22, -37); ctx.fill(); ctx.beginPath(); ctx.moveTo(45, -32); ctx.lineTo(58, -60); ctx.lineTo(22, -37); ctx.fill(); ctx.fillStyle = '#f5e0b0'; ctx.beginPath(); ctx.ellipse(0, -12, 20, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#2c1810'; ctx.beginPath(); ctx.arc(-18, -26, 11, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(18, -26, 11, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-15, -29, 5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(21, -29, 5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#2c1810'; ctx.beginPath(); ctx.ellipse(0, -10, 9, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#2c1810'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-10, -4); ctx.quadraticCurveTo(0, 2, 10, -4); ctx.stroke(); ctx.fillStyle = '#ff6b81'; ctx.beginPath(); ctx.ellipse(6, 4, 8, 10, .2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#e05070'; ctx.fillRect(2, 4, 8, 6); ctx.restore();
  ctx.shadowColor = '#ff6b35'; ctx.shadowBlur = 25; ctx.fillStyle = '#ff6b35'; ctx.font = 'bold 48px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(T('heading'), W / 2, H - 158 + bob / 2); ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffaa55'; ctx.font = '16px sans-serif'; ctx.fillText(T('sub'), W / 2, H - 116);
  const blink = Math.floor(G.titleT / 20) % 2 === 0; ctx.fillStyle = blink ? '#fff' : '#888'; ctx.font = 'bold 17px sans-serif'; ctx.fillText(T('startHint'), W / 2, H - 60);
}
