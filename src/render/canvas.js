'use strict';
/* ═══ CANVAS SETUP ═════════════════════════════════════════════════════ */
import { W, H } from '../state.js';

export const cv = (typeof document !== 'undefined') ? document.getElementById('c') : null;
export const ctx = cv ? cv.getContext('2d') : null;
export { W, H };
