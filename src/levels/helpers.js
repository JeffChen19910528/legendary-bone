'use strict';
export function P_(x, y, w, h, t, ex = {}) { return { x, y, w, h, type: t, broken: false, breakT: 0, ...ex }; }
