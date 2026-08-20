'use strict';
/* ═══ CAMERA ═══════════════════════════════════════════════════════════ */
import { G, P, W, H } from './state.js';

export function updateCam() {
  G.cam.x += (P.x - W * .35 - G.cam.x) * .12;
  G.cam.y += (P.y - H * .5 - G.cam.y) * .1;
  if (G.cam.x < 0) G.cam.x = 0;
  if (G.cam.y < 0) G.cam.y = 0;
}
