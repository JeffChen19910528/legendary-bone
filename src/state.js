'use strict';
/* ═══ CENTRAL MUTABLE GAME STATE ═══════════════════════════════════════
 * The one place other modules are allowed to share mutable state through.
 * Import `G` and read/write its properties directly instead of every
 * module declaring its own top-level `let`.
 */

import { JV, SPD } from './constants.js';
import { CHARS } from './data/characters.js';

export const W = 800, H = 480;
export { CHARS };

export const snowflakes = Array.from({ length: 60 }, () => ({
  x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2, s: .5 + Math.random() * 1.2,
}));

export const P = { x: 60, y: 380, w: 30, h: 32, vx: 0, vy: 0, onGround: false, facing: 1, frame: 0, frameT: 0, dead: false, deadVy: 0, iceA: 0, tailWag: 0 };

export const G = {
  state: 'title', // title|charSelect|story|play|dead|levelClear|win
  lvl: 0, deaths: 0, score: 0,
  cam: { x: 0, y: 0 },
  deadT: 0, clrT: 0, storyT: 0, coyoteT: 0,
  deathMsg: '', storyStep: 0,
  particles: [], floats: [], projs: [],
  plats: [], spikes: [], enemies: [], coins: [], signs: [], goal: null,
  onMoving: null, rockT: 0, titleT: 0,
  selectedChar: 0,
  charJV: JV, charSPD: SPD,
};
