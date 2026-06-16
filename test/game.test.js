'use strict';
/*
 * index.html 是零依賴的單檔遊戲，瀏覽器才有真正的 canvas / requestAnimationFrame。
 * 這裡用 jsdom 模擬瀏覽器環境，並把 2D canvas context stub 成無作用的假物件
 * （jsdom 本身沒有 canvas 繪圖後端），讓整支遊戲腳本可以照常執行、
 * 再用真正的 KeyboardEvent 去驅動跟手動在瀏覽器裡操作完全一樣的程式碼路徑。
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const HTML_PATH = path.join(__dirname, '..', 'index.html');
const HTML = fs.readFileSync(HTML_PATH, 'utf8');

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

test('修正：第一次遊玩（從未存過設定）應套用文件上的預設速度，而不是被誤夾到最低 25%', async () => {
  await withGame(async (window) => {
    assert.equal(window.eval('localStorage.getItem("legendary-bone-move-speed")'), null);
    assert.equal(window.eval('playerSpeedMul'), 0.75, '移動速度預設應為 75%');
    assert.equal(window.eval('gameSpeedMul'), 0.8, '遊戲速度預設應為 80%');
  });
});

test('遊戲腳本載入後狀態機從 title 開始，且沒有拋出例外', async () => {
  await withGame(async (window, errors) => {
    assert.equal(window.eval('typeof loop'), 'function');
    assert.equal(window.eval('state'), 'title');
    assert.deepEqual(errors, []);
  });
});

test('完整流程：title -> charSelect -> story -> play 不會出錯', async () => {
  await withGame(async (window, errors) => {
    fireKey(window, 'keydown', 'ArrowRight');
    await wait(80);
    assert.equal(window.eval('state'), 'charSelect');

    fireKey(window, 'keydown', 'Space');
    await wait(80);
    assert.equal(window.eval('state'), 'story');

    // storyT 必須累積超過 60 才能用按鍵跳到 play（對應遊戲內 storyT>60 的判斷）。
    await waitUntil(() => window.eval('storyT') > 60);
    fireKey(window, 'keydown', 'ArrowRight');
    await wait(80);
    assert.equal(window.eval('state'), 'play');

    assert.deepEqual(errors, []);
  });
});

test('修正：通關（win）畫面按 R 應重新開始整場遊戲，分數與死亡數要清零', async () => {
  await withGame(async (window) => {
    window.eval("state='win'; lvl=5; score=999; deaths=42;");
    fireKey(window, 'keydown', 'KeyR');
    assert.equal(window.eval('state'), 'charSelect', '應呼叫 startFresh() 回到角色選擇畫面');
    assert.equal(window.eval('score'), 0);
    assert.equal(window.eval('deaths'), 0);
    assert.equal(window.eval('lvl'), 0);
  });
});

test('迴歸：遊玩中按 R 只重玩當前關卡，不應清除分數或死亡數', async () => {
  await withGame(async (window) => {
    window.eval("state='play'; score=77; deaths=3;");
    fireKey(window, 'keydown', 'KeyR');
    assert.equal(window.eval('state'), 'play');
    assert.equal(window.eval('score'), 77);
    assert.equal(window.eval('deaths'), 3);
  });
});

test('新功能：跳躍容錯時間（coyote time）內按跳躍仍可成功起跳', async () => {
  await withGame(async (window) => {
    window.eval("state='play'; P.onGround=false; P.vy=0; coyoteT=8;");
    fireKey(window, 'keydown', 'ArrowUp');
    await wait(80);
    assert.ok(window.eval('P.vy') < 0, '容錯時間內按跳躍應該成功起跳（vy 應變成負值）');
    fireKey(window, 'keyup', 'ArrowUp');
  });
});

test('容錯時間過後按跳躍不應再觸發起跳', async () => {
  await withGame(async (window) => {
    window.eval("state='play'; P.onGround=false; P.vy=3; coyoteT=0;");
    fireKey(window, 'keydown', 'ArrowUp');
    await wait(80);
    assert.ok(window.eval('P.vy') >= 0, '容錯時間結束後按跳躍不該觸發起跳');
    fireKey(window, 'keyup', 'ArrowUp');
  });
});

test('新功能：死亡畫面按跳躍鍵可立即跳過等待，重新開始當前關卡', async () => {
  await withGame(async (window) => {
    window.eval("state='dead'; deadT=160; P.dead=true;");
    fireKey(window, 'keydown', 'ArrowUp');
    assert.equal(window.eval('state'), 'play');
    fireKey(window, 'keyup', 'ArrowUp');
  });
});

test('CSS：手機版設定面板已上移，避免視覺上遮住跳躍按鈕', () => {
  assert.ok(
    HTML.includes('#settings-panel { bottom:104px; }'),
    '應在 pointer:coarse 媒體查詢內找到 #settings-panel 的 bottom:104px 調整'
  );
});
