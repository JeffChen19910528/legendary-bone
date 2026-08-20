'use strict';
/* Level 1 – 沙漠 */
import { P_ } from './helpers.js';
import { mkW, mkFr, mkSn } from '../entities/factories.js';

export function buildL1() {
  const plats = [
    P_(0, 448, 360, 32, 'solid'), P_(420, 448, 200, 32, 'solid'), P_(680, 448, 160, 32, 'solid'),
    P_(180, 360, 90, 16, 'solid'), P_(348, 296, 80, 16, 'sand', { sinkT: 0, origY: 296 }),
    P_(460, 360, 80, 16, 'solid'),
    P_(690, 376, 100, 16, 'conv', { dir: 1 }), P_(844, 316, 80, 16, 'sand', { sinkT: 0, origY: 316 }),
    P_(954, 376, 90, 16, 'solid'),
    P_(1082, 378, 64, 16, 'death', { label: '綠洲！' }),
    P_(1190, 360, 80, 16, 'solid'), P_(1314, 298, 64, 16, 'conv', { dir: -1 }), P_(1432, 360, 90, 16, 'solid'),
    P_(1560, 448, 300, 32, 'solid'), P_(1900, 448, 200, 32, 'solid'),
    P_(1600, 360, 80, 16, 'sand', { sinkT: 0, origY: 360 }), P_(1730, 298, 80, 16, 'solid'), P_(1854, 358, 80, 16, 'solid'),
    P_(2140, 448, 600, 32, 'solid'),
    P_(2180, 360, 80, 16, 'solid'), P_(2302, 296, 64, 16, 'sand', { sinkT: 0, origY: 296 }),
    P_(2422, 358, 80, 16, 'death', { label: '終點台！' }), P_(2542, 298, 80, 16, 'solid'),
    P_(2660, 448, 100, 32, 'conv', { dir: 1 }), P_(2790, 448, 200, 32, 'solid'),
  ];
  const spikes = [{ x: 382, y: 416, w: 38, h: 32 }, { x: 1062, y: 388, w: 20, h: 32 }, { x: 1492, y: 416, w: 68, h: 32 }, { x: 2102, y: 416, w: 38, h: 32 }, { x: 2772, y: 416, w: 18, h: 32 }];
  const enemies = [
    mkW(460, 334, 460, 538, 2), mkFr(954, 348, 954, 1032, 1.8, 80),
    mkSn(1190, 334, -1, 100), mkW(1190, 334, 1190, 1268, 2.2),
    mkFr(1854, 330, 1854, 1932, 1.8, 70), mkSn(2180, 334, 1, 90),
    mkW(2542, 272, 2542, 2620, 2.4),
  ];
  const coins = [
    { x: 198, y: 330, bone: false, got: false }, { x: 366, y: 266, bone: true, got: false },
    { x: 862, y: 286, bone: false, got: false }, { x: 1092, y: 348, bone: false, got: false },
    { x: 1748, y: 268, bone: true, got: false }, { x: 2320, y: 266, bone: false, got: false }, { x: 2558, y: 268, bone: true, got: false },
  ];
  const signs = [
    { x: 336, y: 258, text: '↓ 超穩！沙台很固定！' }, { x: 678, y: 344, text: '→ 輸送帶加速！' },
    { x: 1070, y: 338, text: '🌴 綠洲 一定安全' }, { x: 1302, y: 260, text: '← 輸送帶小心' },
    { x: 2414, y: 318, text: '終點台就這邊！' },
  ];
  const goal = { x: 2818, y: 280, w: 48, h: 168 };
  return { plats, spikes, enemies, coins, signs, goal };
}
