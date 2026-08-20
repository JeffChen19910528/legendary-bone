'use strict';
/* Level 3 – 火山 */
import { P_ } from './helpers.js';
import { mkTu, mkFo, mkSk, mkBe } from '../entities/factories.js';

export function buildL3() {
  const plats = [
    P_(0, 448, 280, 32, 'solid'), P_(360, 448, 180, 32, 'solid'), P_(620, 448, 160, 32, 'solid'), P_(870, 448, 200, 32, 'solid'),
    P_(150, 360, 80, 16, 'solid'), P_(302, 348, 64, 16, 'lava', { label: '涼涼台' }), P_(422, 308, 80, 16, 'bounce'),
    P_(562, 360, 80, 16, 'solid'), P_(682, 378, 64, 16, 'solid'), P_(812, 330, 80, 16, 'solid'),
    P_(1090, 448, 200, 32, 'solid'), P_(1362, 448, 200, 32, 'solid'),
    P_(1102, 360, 80, 16, 'solid'), P_(1222, 300, 64, 16, 'crumble'), P_(1332, 360, 80, 16, 'lava', { label: '安全！' }),
    P_(1432, 310, 80, 16, 'solid'),
    P_(1602, 448, 300, 32, 'solid'), P_(1962, 448, 200, 32, 'solid'),
    P_(1642, 360, 80, 16, 'solid'), P_(1762, 300, 80, 16, 'bounce'), P_(1882, 360, 80, 16, 'solid'),
    P_(2202, 448, 600, 32, 'solid'),
    P_(2242, 360, 80, 16, 'solid'), P_(2362, 300, 80, 16, 'crumble'), P_(2482, 360, 80, 16, 'lava', { label: '終點台？' }),
    P_(2602, 300, 80, 16, 'solid'), P_(2722, 448, 200, 32, 'solid'),
  ];
  const spikes = [{ x: 282, y: 416, w: 78, h: 32 }, { x: 1102, y: 388, w: 20, h: 32 }, { x: 1406, y: 416, w: 56, h: 32 }, { x: 2183, y: 416, w: 18, h: 32 }, { x: 2704, y: 416, w: 18, h: 32 }];
  const enemies = [
    mkTu(562, 336, 562, 640), mkFo(812, 302, 812, 940, 3.2, 180),
    mkSk(1102, 334, 410, 1), mkBe(1214, 240, 1010, 1460, 2.5),
    mkTu(1432, 286, 1432, 1510), mkFo(1642, 334, 1642, 1760, 3.5, 180),
    mkSk(2242, 334, 410, -1, 100), mkBe(2470, 220, 2210, 2720, 3), mkFo(2602, 274, 2602, 2680, 4, 160),
  ];
  const coins = [
    { x: 168, y: 330, bone: false, got: false }, { x: 440, y: 278, bone: true, got: false },
    { x: 692, y: 348, bone: false, got: false }, { x: 1312, y: 328, bone: false, got: false },
    { x: 1770, y: 270, bone: true, got: false }, { x: 2372, y: 270, bone: false, got: false }, { x: 2612, y: 270, bone: true, got: false },
  ];
  const signs = [
    { x: 292, y: 310, text: '↓ 涼快台！休息一下' }, { x: 412, y: 276, text: '↓ 彈跳台！' },
    { x: 1322, y: 322, text: '安全！快踩上來！' }, { x: 2474, y: 322, text: '終點台，衝！' },
  ];
  const goal = { x: 2750, y: 280, w: 48, h: 168 };
  return { plats, spikes, enemies, coins, signs, goal };
}
