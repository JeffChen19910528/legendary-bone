'use strict';
import { buildL0 } from './level0.js';
import { buildL1 } from './level1.js';
import { buildL2 } from './level2.js';
import { buildL3 } from './level3.js';
import { buildL4 } from './level4.js';
import { buildL5 } from './level5.js';

const BUILDERS = [buildL0, buildL1, buildL2, buildL3, buildL4, buildL5];

/** Returns the {plats,spikes,enemies,coins,signs,goal} data for level `lvl` (0-5). */
export function buildLevel(lvl) {
  const builder = BUILDERS[lvl] || buildL5;
  return builder();
}
