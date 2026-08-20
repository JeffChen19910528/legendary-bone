'use strict';
/*
 * Bundles src/main.js's ES-module graph into one classic (non-module)
 * script with esbuild, then injects it into src/index.template.html in
 * place of <!--GAME_SCRIPT-->, writing the result to the root index.html.
 *
 * The distributable game must stay a single index.html that works when
 * opened directly via file:// — that's why the output is a plain inline
 * <script>, not type="module" (module scripts are blocked by CORS under
 * file://).
 */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = __dirname;
const ENTRY = path.join(ROOT, 'src', 'main.js');
const TEMPLATE = path.join(ROOT, 'src', 'index.template.html');
const OUT_HTML = path.join(ROOT, 'index.html');
const PLACEHOLDER = '<!--GAME_SCRIPT-->';

async function build() {
  const result = await esbuild.build({
    entryPoints: [ENTRY],
    bundle: true,
    format: 'iife', // classic script, not type="module" — required for file://
    target: 'es2019',
    write: false,
    minify: false,
    logLevel: 'info',
  });

  const bundled = result.outputFiles[0].text;
  const template = fs.readFileSync(TEMPLATE, 'utf8');

  if (!template.includes(PLACEHOLDER)) {
    throw new Error(`Template ${TEMPLATE} is missing the ${PLACEHOLDER} placeholder`);
  }

  const html = template.replace(PLACEHOLDER, `<script>\n${bundled}</script>`);
  fs.writeFileSync(OUT_HTML, html, 'utf8');
  console.log(`Built ${OUT_HTML} (${(html.length / 1024).toFixed(1)} KB)`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
