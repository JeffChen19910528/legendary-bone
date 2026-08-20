'use strict';
/* Level 5 – 城堡 */
import { P_ } from './helpers.js';
import { mkDe, mkBe, mkFo, mkRo, mkSp, mkBa, mkSk } from '../entities/factories.js';

export function buildL5() {
  const plats = [
    P_(0, 448, 280, 32, 'solid'), P_(360, 448, 200, 32, 'solid'),
    P_(180, 360, 80, 16, 'solid'), P_(322, 298, 64, 16, 'fake'), P_(434, 360, 80, 16, 'solid'),
    P_(562, 448, 200, 32, 'solid'), P_(602, 378, 64, 16, 'death', { label: '聖地！' }), P_(702, 328, 80, 16, 'solid'),
    P_(802, 448, 300, 32, 'solid'), P_(850, 368, 70, 16, 'moving', { mvx: 2.5, sx: 850, ex: 982 }),
    P_(1042, 308, 70, 16, 'crumble'), P_(1162, 368, 80, 16, 'solid'),
    P_(1152, 448, 300, 32, 'solid'), P_(1502, 448, 200, 32, 'solid'),
    P_(1202, 360, 80, 16, 'solid'), P_(1322, 298, 64, 16, 'fake'), P_(1442, 360, 80, 16, 'solid'),
    P_(1752, 448, 300, 32, 'solid'), P_(2102, 448, 200, 32, 'solid'),
    P_(1792, 360, 80, 16, 'solid'), P_(1912, 298, 70, 16, 'elev', { evy: -2, sy: 220, ey: 380 }), P_(2062, 360, 80, 16, 'solid'),
    P_(2352, 448, 300, 32, 'solid'), P_(2702, 448, 200, 32, 'solid'),
    P_(2392, 360, 80, 16, 'crumble'), P_(2512, 298, 64, 16, 'solid'), P_(2632, 356, 80, 16, 'death', { label: '終點！' }), P_(2752, 298, 80, 16, 'solid'),
    P_(2952, 448, 700, 32, 'solid'),
    P_(2992, 360, 80, 16, 'solid'), P_(3112, 298, 70, 16, 'fake'), P_(3232, 358, 80, 16, 'solid'),
    P_(3352, 448, 80, 32, 'fake'), P_(3472, 448, 200, 32, 'solid'), P_(3492, 328, 80, 16, 'solid'),
  ];
  const spikes = [{ x: 340, y: 416, w: 20, h: 32 }, { x: 542, y: 416, w: 20, h: 32 }, { x: 1122, y: 416, w: 30, h: 32 }, { x: 1492, y: 416, w: 10, h: 32 }, { x: 2332, y: 416, w: 20, h: 32 }, { x: 2682, y: 388, w: 20, h: 32 }, { x: 2934, y: 416, w: 18, h: 32 }, { x: 3454, y: 416, w: 18, h: 32 }];
  const enemies = [
    mkDe(434, 328, 434, 542, 3.2, 150), mkBe(604, 272, 504, 784, 3), mkFo(702, 300, 702, 802, 3.8, 200),
    mkRo(1162, 336, 1162, 1242, 2.5, 120), mkSp(1322, 80, 330, 1.5), mkDe(1442, 328, 1442, 1532, 3.5, 140),
    mkBa(1602, 60, 378, 1504, 1704, 2.5), mkSk(1792, 334, 410, 1), mkFo(2062, 332, 2062, 2142, 4, 180),
    mkBe(2210, 230, 2010, 2462, 3.2), mkDe(2512, 270, 2512, 2592, 3.8, 130), mkRo(2752, 270, 2752, 2832, 3, 110),
    mkSp(3112, 80, 328, 2), mkDe(3232, 330, 3232, 3312, 4.2, 120), mkFo(3492, 300, 3492, 3572, 4.5, 180),
    mkBa(3300, 60, 330, 3200, 3500, 3),
  ];
  const coins = [
    { x: 198, y: 330, bone: false, got: false }, { x: 340, y: 268, bone: true, got: false },
    { x: 720, y: 298, bone: false, got: false }, { x: 614, y: 348, bone: false, got: false },
    { x: 1060, y: 278, bone: true, got: false }, { x: 1940, y: 268, bone: false, got: false },
    { x: 2530, y: 268, bone: true, got: false }, { x: 2770, y: 268, bone: false, got: false },
    { x: 3130, y: 268, bone: true, got: false }, { x: 3510, y: 298, bone: false, got: false },
  ];
  const signs = [
    { x: 312, y: 260, text: '↓ 這台很穩！' }, { x: 592, y: 340, text: '聖地！快進！' },
    { x: 1032, y: 276, text: '↓ 放心踩！穩的' },
    { x: 2624, y: 318, text: '← 終點就在這！' }, { x: 3344, y: 408, text: '↓ 就差這步！' },
  ];
  const goal = { x: 3502, y: 260, w: 48, h: 168 };
  return { plats, spikes, enemies, coins, signs, goal };
}
