'use strict';
/* ═══ INPUT: keyboard state map + keyboard/touch/joystick wiring ═══════════
 * `K` is the shared key-state map read by physics.js. `initInput()` wires
 * up all keydown/keyup listeners and the on-screen touch controls; it takes
 * the level-control callbacks (restartLevel/startFresh) from main.js so
 * this module never needs to import main.js back (no circular import).
 */
import { G, CHARS } from './state.js';
import { JV, SPD } from './constants.js';
import { ensureAudio, sfx } from './audio.js';

export const K = {};

export function anyMoveOrJumpPressed() {
  return !!(K.ArrowLeft || K.ArrowRight || K.ArrowUp || K.Space || K.KeyA || K.KeyD || K.KeyW);
}

export function anyStoryAdvancePressed() {
  return !!(K.ArrowLeft || K.ArrowRight || K.ArrowUp || K.Space || K.KeyA || K.KeyD || K.KeyW || K.Enter);
}

export function initInput({ restartLevel, startFresh }) {
  window.addEventListener('keydown', (e) => {
    ensureAudio();
    K[e.code] = true;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'].includes(e.code)) e.preventDefault();
    if (e.code === 'KeyR' && G.state !== 'win') restartLevel();
    if (G.state === 'dead' && ['ArrowUp', 'Space', 'KeyW', 'KeyZ'].includes(e.code)) restartLevel();
  });
  window.addEventListener('keyup', (e) => { K[e.code] = false; });
  window.addEventListener('pointerdown', ensureAudio, { once: true });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR' && G.state === 'win') { startFresh(); }
    if (G.state === 'charSelect') {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') { G.selectedChar = (G.selectedChar + CHARS.length - 1) % CHARS.length; sfx('select'); }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') { G.selectedChar = (G.selectedChar + 1) % CHARS.length; sfx('select'); }
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowUp') {
        G.charJV = JV * CHARS[G.selectedChar].jvMul; G.charSPD = SPD * CHARS[G.selectedChar].spdMul;
        sfx('start');
        G.state = 'story'; G.storyT = 0;
      }
    }
    if (G.state === 'story') {
      const any = anyStoryAdvancePressed();
      if (any && G.storyT > 60) { sfx('start'); G.state = 'play'; G.deadT = 0; }
    }
  });

  initTouchControls();
}

/* ── 觸控按鈕 ── */
function initTouchControls() {
  const stick = document.getElementById('joystick');
  const knob = document.getElementById('joystick-knob');
  const jumpEl = document.getElementById('btn-jump');
  if (!stick || !knob || !jumpEl) return;

  function holdKey(code, down) {
    K[code] = down;
    window.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { code, bubbles: true }));
  }

  let stickTouchId = null, stickDir = 0;
  const DEAD = 0.18;

  function stickSetDir(dir) {
    if (dir === stickDir) return;
    if (stickDir < 0) holdKey('ArrowLeft', false);
    if (stickDir > 0) holdKey('ArrowRight', false);
    stickDir = dir;
    if (dir < 0) holdKey('ArrowLeft', true);
    if (dir > 0) holdKey('ArrowRight', true);
  }

  function stickUpdate(clientX, clientY) {
    const r = stick.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2, radius = r.width / 2;
    const dx = clientX - cx, dy = clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const cap = Math.min(dist, radius * 0.48);
    const ang = dist > 0 ? Math.atan2(dy, dx) : 0;
    knob.style.transform = `translate(calc(-50% + ${cap * Math.cos(ang)}px),calc(-50% + ${cap * Math.sin(ang)}px))`;
    const norm = dx / radius;
    stickSetDir(norm < -DEAD ? -1 : norm > DEAD ? 1 : 0);
  }

  function stickReset() {
    stickTouchId = null;
    stickSetDir(0);
    knob.style.transform = 'translate(-50%,-50%)';
  }

  stick.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (stickTouchId !== null) return;
    const t = e.changedTouches[0];
    stickTouchId = t.identifier;
    stickUpdate(t.clientX, t.clientY);
  }, { passive: false });

  stick.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const t = [...e.changedTouches].find((t) => t.identifier === stickTouchId);
    if (t) stickUpdate(t.clientX, t.clientY);
  }, { passive: false });

  stick.addEventListener('touchend', (e) => {
    const t = [...e.changedTouches].find((t) => t.identifier === stickTouchId);
    if (t) stickReset();
  }, { passive: false });

  stick.addEventListener('touchcancel', (e) => {
    const t = [...e.changedTouches].find((t) => t.identifier === stickTouchId);
    if (t) stickReset();
  }, { passive: false });

  jumpEl.addEventListener('touchstart', (e) => {
    e.preventDefault();
    holdKey('ArrowUp', true);
    if (G.state === 'win') window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyR', bubbles: true }));
  }, { passive: false });
  jumpEl.addEventListener('touchend', (e) => { e.preventDefault(); holdKey('ArrowUp', false); }, { passive: false });
  jumpEl.addEventListener('touchcancel', (e) => { holdKey('ArrowUp', false); }, { passive: false });
}
