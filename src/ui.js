'use strict';
/* ═══ UI: settings panel, sound button, resize handling ══════════════════
 * Everything here queries document.getElementById — DOM wiring only, no
 * game logic.
 */
import { T } from './i18n.js';
import * as settingsStore from './settings.js';
import { setLang } from './settings.js';
import * as audio from './audio.js';
import { sfx, ensureAudio } from './audio.js';

const soundBtn = document.getElementById('sound-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const moveSpeedInput = document.getElementById('move-speed');
const gameSpeedInput = document.getElementById('game-speed');
const langSelect = document.getElementById('lang-select');
const moveSpeedValue = document.getElementById('move-speed-value');
const gameSpeedValue = document.getElementById('game-speed-value');

function updateSoundBtn() {
  if (!soundBtn) return;
  soundBtn.textContent = audio.muted ? '🔇' : '🔊';
  soundBtn.setAttribute('aria-pressed', String(!audio.muted));
  soundBtn.setAttribute('aria-label', T('sound'));
  soundBtn.title = T('sound');
}

function applySettings() {
  const movePct = Math.round(settingsStore.playerSpeedMul * 100), gamePct = Math.round(settingsStore.gameSpeedMul * 100);
  if (moveSpeedInput) moveSpeedInput.value = String(movePct);
  if (gameSpeedInput) gameSpeedInput.value = String(gamePct);
  if (langSelect) langSelect.value = settingsStore.lang;
  if (moveSpeedValue) moveSpeedValue.textContent = settingsStore.pct(settingsStore.playerSpeedMul);
  if (gameSpeedValue) gameSpeedValue.textContent = settingsStore.pct(settingsStore.gameSpeedMul);
}

function applyLanguage() {
  document.documentElement.lang = settingsStore.lang === 'zh' ? 'zh-TW' : settingsStore.lang;
  document.title = T('pageTitle');
  const setText = (id, key) => { const el = document.getElementById(id); if (el) el.textContent = T(key); };
  setText('hd', 'heading');
  setText('sub', 'sub');
  const ctrl = document.getElementById('ctrl'); if (ctrl) ctrl.innerHTML = T('ctrl');
  setText('settings-title', 'settings');
  setText('move-speed-label', 'moveSpeed');
  setText('game-speed-label', 'gameSpeed');
  setText('language-label', 'language');
  setText('settings-reset', 'reset');
  if (settingsBtn) { settingsBtn.setAttribute('aria-label', T('settings')); settingsBtn.title = T('settings'); }
  updateSoundBtn();
  applySettings();
}

export function initUI() {
  updateSoundBtn();
  applyLanguage();

  settingsBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    settingsPanel.hidden = !settingsPanel.hidden;
    sfx('select');
  });

  moveSpeedInput?.addEventListener('input', (e) => { settingsStore.setMoveSpeed(e.target.value); applySettings(); });
  moveSpeedInput?.addEventListener('change', (e) => { settingsStore.setMoveSpeed(e.target.value); applySettings(); });
  gameSpeedInput?.addEventListener('input', (e) => { settingsStore.setGameSpeed(e.target.value); applySettings(); });
  gameSpeedInput?.addEventListener('change', (e) => { settingsStore.setGameSpeed(e.target.value); applySettings(); });

  langSelect?.addEventListener('change', (e) => {
    setLang(e.target.value);
    applyLanguage();
    sfx('select');
  });

  document.getElementById('settings-reset')?.addEventListener('click', () => {
    settingsStore.resetSpeeds();
    applySettings();
    sfx('select');
  });

  document.addEventListener('pointerdown', (e) => {
    if (settingsPanel.hidden || settingsPanel.contains(e.target) || settingsBtn.contains(e.target)) return;
    settingsPanel.hidden = true;
  });

  soundBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    ensureAudio();
    audio.setMuted(!audio.muted, updateSoundBtn);
    if (!audio.muted) sfx('select');
  });

  resizeGame();
  window.addEventListener('resize', resizeGame);
  window.addEventListener('orientationchange', () => setTimeout(resizeGame, 120));
}

/* ═══ RWD: 畫面縮放 ════════════════════════════════════════════════ */
function resizeGame() {
  const wrap = document.getElementById('game-wrap');
  const hd = document.getElementById('hd');
  const sub = document.getElementById('sub');
  const usedH = (hd?.offsetHeight || 0) + (sub?.offsetHeight || 0) + 20;
  const maxW = Math.min(800, window.innerWidth);
  const maxH = window.innerHeight - usedH;
  const wFromH = maxH * (800 / 480);
  wrap.style.width = Math.min(maxW, wFromH) + 'px';
}
