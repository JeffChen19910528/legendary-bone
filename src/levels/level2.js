'use strict';
/* Level 2 – 冰雪 */
import { P_ } from './helpers.js';
import { mkW, mkBe, mkFr, mkSn } from '../entities/factories.js';

export function buildL2() {
  const plats = [
    P_(0, 448, 320, 32, 'ice'), P_(380, 448, 200, 32, 'ice'), P_(640, 448, 160, 32, 'ice'),
    P_(160, 360, 90, 16, 'ice'), P_(322, 296, 80, 16, 'crumble'), P_(434, 360, 80, 16, 'ice'),
    P_(650, 376, 64, 16, 'bounce'), P_(772, 296, 80, 16, 'crumble'), P_(882, 360, 90, 16, 'ice'),
    P_(1004, 378, 64, 16, 'death', { label: '暖暖台' }),
    P_(1104, 358, 80, 16, 'ice'), P_(1226, 296, 64, 16, 'fake'), P_(1338, 358, 90, 16, 'ice'),
    P_(1466, 448, 280, 32, 'ice'), P_(1786, 448, 200, 32, 'ice'),
    P_(1504, 360, 80, 16, 'ice'), P_(1632, 296, 80, 16, 'crumble'), P_(1752, 360, 80, 16, 'ice'),
    P_(2026, 448, 620, 32, 'ice'),
    P_(2066, 360, 80, 16, 'ice'), P_(2190, 296, 80, 16, 'ice'), P_(2314, 358, 80, 16, 'crumble'),
    P_(2436, 296, 80, 16, 'ice'), P_(2558, 358, 80, 16, 'fake'), P_(2676, 296, 80, 16, 'ice'),
    P_(2792, 448, 200, 32, 'ice'),
  ];
  const spikes = [{ x: 342, y: 416, w: 38, h: 32 }, { x: 1084, y: 386, w: 20, h: 32 }, { x: 1398, y: 416, w: 68, h: 32 }, { x: 2006, y: 416, w: 20, h: 32 }, { x: 2774, y: 416, w: 18, h: 32 }];
  const enemies = [
    mkW(434, 334, 434, 512, 2.2), mkBe(650, 290, 650, 820, 2.2), mkFr(882, 332, 882, 960, 1.8, 75),
    mkSn(1104, 332, 1, 95), mkBe(1210, 240, 1110, 1400, 2.5), mkW(1752, 334, 1752, 1830, 2.4),
    mkBe(1820, 240, 1620, 2020, 2.8), mkSn(2066, 334, -1, 85), mkFr(2190, 268, 2190, 2268, 2, 70),
    mkW(2436, 270, 2436, 2514, 2.6), mkBe(2510, 220, 2320, 2700, 3),
  ];
  const coins = [
    { x: 178, y: 330, bone: false, got: false }, { x: 450, y: 330, bone: true, got: false },
    { x: 788, y: 266, bone: false, got: false }, { x: 1014, y: 348, bone: false, got: false },
    { x: 1244, y: 266, bone: true, got: false }, { x: 1650, y: 266, bone: false, got: false },
    { x: 2202, y: 266, bone: true, got: false }, { x: 2452, y: 266, bone: false, got: false }, { x: 2692, y: 266, bone: true, got: false },
  ];
  const signs = [
    { x: 310, y: 258, text: '↓ 這台很穩，雪地嘛' }, { x: 638, y: 344, text: '↓ 彈台！跳起來！' },
    { x: 994, y: 338, text: '❄ 暖暖台 來取暖' }, { x: 1216, y: 258, text: '↓ 放心踩！' },
    { x: 2550, y: 318, text: '↓ 就差這一步！' },
  ];
  const goal = { x: 2820, y: 280, w: 48, h: 168 };
  return { plats, spikes, enemies, coins, signs, goal };
}
