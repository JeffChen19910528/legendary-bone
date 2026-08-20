'use strict';
/* ═══ SETTINGS: localStorage-backed move/game speed + language ═══════════
 * Falls back to an in-memory store when `localStorage` isn't available
 * (e.g. running pure-logic unit tests under plain Node, no jsdom), so this
 * module can be imported and tested without a DOM/browser environment.
 */
import { G } from './state.js';

export const DEFAULT_MOVE_SPEED = 75, DEFAULT_GAME_SPEED = 80, MIN_SPEED = 25, SETTINGS_VERSION = '2';

function memoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)); },
  };
}

export const defaultStorage = (typeof localStorage !== 'undefined') ? localStorage : memoryStorage();

export function migrateSettings(storage = defaultStorage) {
  if (storage.getItem('legendary-bone-settings-version') !== SETTINGS_VERSION) {
    if (storage.getItem('legendary-bone-move-speed') === '85') storage.setItem('legendary-bone-move-speed', String(DEFAULT_MOVE_SPEED));
    if (storage.getItem('legendary-bone-game-speed') === '90') storage.setItem('legendary-bone-game-speed', String(DEFAULT_GAME_SPEED));
    storage.setItem('legendary-bone-settings-version', SETTINGS_VERSION);
  }
}

export function readPct(key, fallback, max, storage = defaultStorage) {
  const raw = storage.getItem(key);
  if (raw === null) return fallback;
  const v = Number(raw);
  return Number.isFinite(v) ? Math.max(MIN_SPEED, Math.min(max, v)) : fallback;
}

migrateSettings();

export let playerSpeedMul = readPct('legendary-bone-move-speed', DEFAULT_MOVE_SPEED, 120) / 100;
export let gameSpeedMul = readPct('legendary-bone-game-speed', DEFAULT_GAME_SPEED, 115) / 100;
export let lang = defaultStorage.getItem('legendary-bone-lang') || 'zh';

export function setLang(v) {
  lang = v;
  defaultStorage.setItem('legendary-bone-lang', v);
}

export function pct(v) { return Math.round(v * 100) + '%'; }

export function setMoveSpeed(value) {
  const next = Math.max(MIN_SPEED, Math.min(120, Number(value)));
  if (!Number.isFinite(next)) return;
  playerSpeedMul = next / 100;
  defaultStorage.setItem('legendary-bone-move-speed', String(next));
}

export function setGameSpeed(value) {
  const next = Math.max(MIN_SPEED, Math.min(115, Number(value)));
  if (!Number.isFinite(next)) return;
  gameSpeedMul = next / 100;
  defaultStorage.setItem('legendary-bone-game-speed', String(next));
}

export function resetSpeeds() {
  playerSpeedMul = DEFAULT_MOVE_SPEED / 100;
  gameSpeedMul = DEFAULT_GAME_SPEED / 100;
  defaultStorage.setItem('legendary-bone-move-speed', String(DEFAULT_MOVE_SPEED));
  defaultStorage.setItem('legendary-bone-game-speed', String(DEFAULT_GAME_SPEED));
}

const firstLevelMul = () => (G.state === 'play' && G.lvl === 0) ? .78 : 1;
export const dt = () => Math.max(.18, Math.min(1.75, gameSpeedMul * firstLevelMul()));
