'use strict';
/* Level 4 – 都市 */
import { P_ } from './helpers.js';
import { mkFo, mkBa, mkRo, mkSp } from '../entities/factories.js';

export function buildL4() {
  const plats = [
    P_(0, 448, 300, 32, 'solid'), P_(380, 448, 200, 32, 'solid'), P_(680, 448, 160, 32, 'solid'),
    P_(300, 388, 80, 16, 'moving', { mvx: 2, sx: 300, ex: 380 }),
    P_(590, 350, 80, 16, 'moving', { mvx: -2, sx: 590, ex: 680 }),
    P_(852, 350, 80, 16, 'elev', { evy: -1.5, sy: 280, ey: 400 }),
    P_(852, 448, 200, 32, 'solid'), P_(1102, 448, 200, 32, 'solid'),
    P_(920, 360, 80, 16, 'solid'), P_(1052, 300, 64, 16, 'fake'), P_(1172, 360, 80, 16, 'solid'),
    P_(1352, 448, 300, 32, 'solid'), P_(1712, 448, 200, 32, 'solid'),
    P_(1392, 378, 70, 16, 'moving', { mvx: 2.5, sx: 1392, ex: 1502 }),
    P_(1562, 308, 70, 16, 'moving', { mvx: -2, sx: 1512, ex: 1642 }), P_(1722, 378, 70, 16, 'solid'),
    P_(1962, 448, 300, 32, 'solid'), P_(2312, 448, 200, 32, 'solid'),
    P_(2002, 360, 80, 16, 'solid'), P_(2122, 300, 80, 16, 'elev', { evy: 1.5, sy: 240, ey: 360 }), P_(2252, 360, 80, 16, 'solid'),
    P_(2562, 448, 600, 32, 'solid'),
    P_(2602, 360, 80, 16, 'solid'), P_(2722, 300, 70, 16, 'moving', { mvx: 2, sx: 2722, ex: 2852 }),
    P_(2882, 360, 80, 16, 'solid'), P_(2998, 448, 80, 32, 'fake'), P_(3112, 448, 200, 32, 'solid'),
  ];
  const spikes = [{ x: 300, y: 416, w: 80, h: 32 }, { x: 642, y: 416, w: 38, h: 32 }, { x: 1302, y: 416, w: 50, h: 32 }, { x: 1702, y: 416, w: 10, h: 32 }, { x: 2562, y: 416, w: 38, h: 32 }, { x: 2992, y: 416, w: 20, h: 32 }];
  const enemies = [
    mkFo(380, 420, 380, 458, 3.2, 180), mkBa(502, 60, 420, 420, 580, 2),
    mkRo(920, 328, 920, 1000, 2, 140), mkSp(1132, 60, 350, 1.5), mkFo(1172, 332, 1172, 1250, 3.5, 160),
    mkBa(1610, 60, 308, 1542, 1694, 2.5), mkRo(1722, 350, 1722, 1800, 2.5, 130),
    mkSp(2002, 60, 350, 1.8), mkFo(2252, 332, 2252, 2330, 3.8, 180),
    mkRo(2602, 332, 2602, 2680, 2.5, 120), mkBa(2800, 60, 310, 2724, 2882, 2),
  ];
  const coins = [
    { x: 198, y: 358, bone: false, got: false }, { x: 608, y: 320, bone: true, got: false },
    { x: 938, y: 330, bone: false, got: false }, { x: 1070, y: 270, bone: false, got: false },
    { x: 1740, y: 348, bone: true, got: false }, { x: 2140, y: 270, bone: false, got: false },
    { x: 2620, y: 330, bone: true, got: false }, { x: 2900, y: 330, bone: false, got: false },
  ];
  const signs = [
    { x: 290, y: 356, text: '→ 移動台跳過去！' }, { x: 840, y: 328, text: '↓ 很穩的電梯' },
    { x: 1044, y: 268, text: '↓ 超穩放心踩' }, { x: 1384, y: 346, text: '→ 移動台！衝！' },
    { x: 2990, y: 408, text: '↓ 終點近了！' },
  ];
  const goal = { x: 3140, y: 280, w: 48, h: 168 };
  return { plats, spikes, enemies, coins, signs, goal };
}
