'use strict';
/* Level 0 – 草原 */
import { P_ } from './helpers.js';
import { mkW, mkFr } from '../entities/factories.js';

export function buildL0() {
  const plats = [
    P_(0, 448, 360, 32, 'solid'), P_(430, 448, 200, 32, 'solid'), P_(660, 448, 140, 32, 'solid'),
    P_(195, 360, 90, 16, 'solid'), P_(352, 296, 80, 16, 'fake'), P_(464, 360, 80, 16, 'solid'),
    P_(670, 376, 64, 16, 'bounce'), P_(790, 298, 80, 16, 'crumble'), P_(900, 360, 90, 16, 'solid'),
    P_(1018, 378, 64, 16, 'death', { label: '安全台' }),
    P_(1116, 360, 80, 16, 'solid'), P_(1238, 298, 64, 16, 'crumble'), P_(1340, 376, 90, 16, 'solid'),
    P_(1460, 448, 320, 32, 'solid'), P_(1820, 448, 200, 32, 'solid'),
    P_(1500, 360, 80, 16, 'solid'), P_(1624, 298, 80, 16, 'fake'), P_(1740, 360, 80, 16, 'solid'),
    P_(2028, 448, 580, 32, 'solid'),
    P_(2066, 362, 80, 16, 'solid'), P_(2190, 298, 80, 16, 'solid'), P_(2314, 360, 80, 16, 'fake'),
    P_(2434, 298, 80, 16, 'solid'),
    P_(2548, 448, 80, 32, 'fake'), P_(2660, 448, 200, 32, 'solid'),
  ];
  const spikes = [{ x: 390, y: 416, w: 40, h: 32 }, { x: 1096, y: 388, w: 20, h: 32 }, { x: 1402, y: 416, w: 58, h: 32 }, { x: 2010, y: 416, w: 18, h: 32 }, { x: 2634, y: 416, w: 26, h: 32 }];
  const enemies = [
    mkW(464, 334, 464, 542), mkFr(900, 332, 900, 978, 1.5), mkW(1116, 334, 1116, 1196),
    mkW(1740, 334, 1740, 1818), mkFr(2066, 334, 2066, 2144, 1.2, 100), mkW(2434, 272, 2434, 2512),
  ];
  const coins = [
    { x: 212, y: 330, bone: false, got: false }, { x: 480, y: 330, bone: true, got: false },
    { x: 804, y: 268, bone: false, got: false }, { x: 1026, y: 348, bone: false, got: false },
    { x: 1254, y: 268, bone: true, got: false }, { x: 1642, y: 268, bone: false, got: false },
    { x: 2198, y: 268, bone: true, got: false }, { x: 2450, y: 268, bone: false, got: false },
  ];
  const signs = [
    { x: 340, y: 258, text: '↓ 踩這個！超安全！' }, { x: 658, y: 344, text: '↓ 彈台跳得很高' },
    { x: 1008, y: 338, text: '🦴 免費骨頭！快來' }, { x: 1616, y: 260, text: '↓ 超穩放心踩' },
    { x: 2540, y: 408, text: '↓ 終點就在前面！' },
  ];
  const goal = { x: 2686, y: 280, w: 48, h: 168 };
  return { plats, spikes, enemies, coins, signs, goal };
}
