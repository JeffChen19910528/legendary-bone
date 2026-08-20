'use strict';
/*
 * The game now lives as ES modules under src/. Pure-logic modules (physics
 * math, entity factories, i18n lookup, settings persistence/clamping) are
 * imported directly here with no DOM/browser needed. A small jsdom smoke
 * test at the end still drives the *built* index.html end-to-end via real
 * KeyboardEvents, but reads/writes game state through the explicit
 * `window.__GAME__` debug hook that main.js installs — not through
 * incidental global-scope eval, which bundled code no longer exposes.
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const HTML_PATH = path.join(__dirname, '..', 'index.html');
const HTML = fs.readFileSync(HTML_PATH, 'utf8');

/* ═══ PURE-LOGIC MODULE TESTS (no DOM) ═══════════════════════════════════ */

test('settings：從未存過設定時，應套用文件上的預設速度，而不是被誤夾到最低 25%', async () => {
  // Fresh module instance (via a unique query string) so the top-level
  // `readPct(...)` re-runs against an empty in-memory storage fallback
  // (no localStorage under plain Node).
  const settings = await import(`../src/settings.js?fresh=${Date.now()}-${Math.random()}`);
  assert.equal(settings.defaultStorage.getItem('legendary-bone-move-speed'), null);
  assert.equal(settings.playerSpeedMul, 0.75, '移動速度預設應為 75%');
  assert.equal(settings.gameSpeedMul, 0.8, '遊戲速度預設應為 80%');
});

test('settings：setMoveSpeed/setGameSpeed 會夾在允許範圍內', async () => {
  const settings = await import(`../src/settings.js?fresh=${Date.now()}-${Math.random()}`);
  settings.setMoveSpeed(9999);
  assert.equal(settings.playerSpeedMul, 1.2, '移動速度上限為 120%');
  settings.setMoveSpeed(1);
  assert.equal(settings.playerSpeedMul, 0.25, '移動速度下限為 25%');
  settings.setGameSpeed(9999);
  assert.equal(settings.gameSpeedMul, 1.15, '遊戲速度上限為 115%');
  settings.resetSpeeds();
  assert.equal(settings.playerSpeedMul, 0.75);
  assert.equal(settings.gameSpeedMul, 0.8);
});

test('i18n：T() 會依語言查表，查無則退回中文，再退回 key 本身', async () => {
  // i18n.js internally imports the plain (unparameterized) './settings.js',
  // so this test must import that exact same module specifier to mutate
  // the same live-bound `lang` instance i18n.js reads from.
  const settings = await import('../src/settings.js');
  const i18n = await import('../src/i18n.js');
  assert.equal(i18n.T('settings'), '設定');
  settings.setLang('en');
  // i18n.js imported `lang` as a live binding from settings.js, so this
  // reflects the update even though i18n.js itself never reassigns it.
  assert.equal(i18n.T('settings'), 'Settings');
  assert.equal(i18n.T('__nope__'), '__nope__');
  settings.setLang('zh');
});

test('physics：ov() 矩形相交判斷', async () => {
  const { ov } = await import('../src/physics.js');
  assert.equal(ov(0, 0, 10, 10, 5, 5, 10, 10), true, '重疊應回傳 true');
  assert.equal(ov(0, 0, 10, 10, 20, 20, 10, 10), false, '不重疊應回傳 false');
  assert.equal(ov(0, 0, 10, 10, 10, 0, 10, 10), false, '恰好相鄰（邊界不算重疊）');
});

test('entities：敵人工廠回傳正確的預設欄位', async () => {
  const { mkW, mkTu } = await import('../src/entities/factories.js');
  const w = mkW(10, 20, 0, 100);
  assert.equal(w.type, 'walker');
  assert.equal(w.alive, true);
  assert.equal(w.x, 10);
  assert.equal(w.sx, 0);
  assert.equal(w.ex, 100);
  const tu = mkTu(0, 0, 0, 50);
  assert.equal(tu.hp, 2, '烏龜預設兩點血');
});

test('levels：buildLevel(0) 回傳完整關卡資料，goal 存在', async () => {
  const { buildLevel } = await import('../src/levels/index.js');
  const lvl0 = buildLevel(0);
  assert.ok(Array.isArray(lvl0.plats) && lvl0.plats.length > 0);
  assert.ok(Array.isArray(lvl0.enemies));
  assert.ok(lvl0.goal && typeof lvl0.goal.x === 'number');
});

test('levels：buildLevel(超出範圍) 退回最後一關（惡魔城堡）', async () => {
  const { buildLevel } = await import('../src/levels/index.js');
  const fallback = buildLevel(99);
  const lvl5 = buildLevel(5);
  assert.deepEqual(fallback.goal, lvl5.goal);
});

/* ═══ JSDOM SMOKE TEST AGAINST THE BUILT index.html ═══════════════════════
 * True end-to-end coverage: state machine transitions driven by real
 * KeyboardEvents, verified through the explicit window.__GAME__ hook.
 */

function createCtxStub() {
  const gradient = { addColorStop() {} };
  const base = {
    measureText: (t) => ({ width: String(t || '').length * 7 }),
    createLinearGradient: () => gradient,
    createBuffer: (_channels, len) => ({ getChannelData: () => new Float32Array(len) }),
  };
  return new Proxy(base, {
    get(target, prop) {
      if (prop in target) return target[prop];
      if (typeof prop === 'symbol') return undefined;
      return () => undefined;
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
  });
}

function createGame() {
  const errors = [];
  const dom = new JSDOM(HTML, {
    url: 'http://localhost/',
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.HTMLCanvasElement.prototype.getContext = () => createCtxStub();
      window.addEventListener('error', (e) => errors.push(e.error || e.message));
    },
  });
  return { dom, errors };
}

function fireKey(window, type, code) {
  window.dispatchEvent(new window.KeyboardEvent(type, { code, bubbles: true, cancelable: true }));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntil(predicate, { timeout = 5000, interval = 25 } = {}) {
  const deadline = Date.now() + timeout;
  while (!predicate()) {
    if (Date.now() > deadline) throw new Error('waitUntil timed out');
    await wait(interval);
  }
}

async function withGame(fn) {
  const { dom, errors } = createGame();
  try {
    await fn(dom.window, errors);
  } finally {
    dom.window.close();
  }
}

test('built index.html：載入後狀態機從 title 開始，且沒有拋出例外，並暴露 __GAME__ debug hook', async () => {
  await withGame(async (window, errors) => {
    assert.equal(typeof window.__GAME__, 'object');
    assert.equal(window.__GAME__.state, 'title');
    assert.deepEqual(errors, []);
  });
});

test('built index.html：完整流程 title -> charSelect -> story -> play 不會出錯', async () => {
  await withGame(async (window, errors) => {
    fireKey(window, 'keydown', 'ArrowRight');
    await wait(80);
    assert.equal(window.__GAME__.state, 'charSelect');

    fireKey(window, 'keydown', 'Space');
    await wait(80);
    assert.equal(window.__GAME__.state, 'story');

    // storyT 必須累積超過 60 才能用按鍵跳到 play。
    await waitUntil(() => window.__GAME__.storyT > 60);
    fireKey(window, 'keydown', 'ArrowRight');
    await wait(80);
    assert.equal(window.__GAME__.state, 'play');

    assert.deepEqual(errors, []);
  });
});

test('built index.html：通關（win）畫面按 R 應重新開始整場遊戲，分數與死亡數要清零', async () => {
  await withGame(async (window) => {
    window.__GAME__.state = 'win';
    window.__GAME__.lvl = 5;
    window.__GAME__.score = 999;
    window.__GAME__.deaths = 42;
    fireKey(window, 'keydown', 'KeyR');
    assert.equal(window.__GAME__.state, 'charSelect', '應呼叫 startFresh() 回到角色選擇畫面');
    assert.equal(window.__GAME__.score, 0);
    assert.equal(window.__GAME__.deaths, 0);
    assert.equal(window.__GAME__.lvl, 0);
  });
});

test('built index.html：遊玩中按 R 只重玩當前關卡，不應清除分數或死亡數', async () => {
  await withGame(async (window) => {
    window.__GAME__.state = 'play';
    window.__GAME__.score = 77;
    window.__GAME__.deaths = 3;
    fireKey(window, 'keydown', 'KeyR');
    assert.equal(window.__GAME__.state, 'play');
    assert.equal(window.__GAME__.score, 77);
    assert.equal(window.__GAME__.deaths, 3);
  });
});

test('built index.html：跳躍容錯時間（coyote time）內按跳躍仍可成功起跳', async () => {
  await withGame(async (window) => {
    window.__GAME__.state = 'play';
    window.__GAME__.P.onGround = false;
    window.__GAME__.P.vy = 0;
    window.__GAME__.coyoteT = 8;
    fireKey(window, 'keydown', 'ArrowUp');
    await wait(80);
    assert.ok(window.__GAME__.P.vy < 0, '容錯時間內按跳躍應該成功起跳（vy 應變成負值）');
    fireKey(window, 'keyup', 'ArrowUp');
  });
});

test('built index.html：容錯時間過後按跳躍不應再觸發起跳', async () => {
  await withGame(async (window) => {
    window.__GAME__.state = 'play';
    window.__GAME__.P.onGround = false;
    window.__GAME__.P.vy = 3;
    window.__GAME__.coyoteT = 0;
    fireKey(window, 'keydown', 'ArrowUp');
    await wait(80);
    assert.ok(window.__GAME__.P.vy >= 0, '容錯時間結束後按跳躍不該觸發起跳');
    fireKey(window, 'keyup', 'ArrowUp');
  });
});

test('built index.html：死亡畫面按跳躍鍵可立即跳過等待，重新開始當前關卡', async () => {
  await withGame(async (window) => {
    window.__GAME__.state = 'dead';
    window.__GAME__.deadT = 160;
    window.__GAME__.P.dead = true;
    fireKey(window, 'keydown', 'ArrowUp');
    assert.equal(window.__GAME__.state, 'play');
    fireKey(window, 'keyup', 'ArrowUp');
  });
});

test('CSS：手機版設定面板已上移，避免視覺上遮住跳躍按鈕', () => {
  assert.ok(
    HTML.includes('#settings-panel { bottom:104px; }'),
    '應在 pointer:coarse 媒體查詢內找到 #settings-panel 的 bottom:104px 調整'
  );
});
