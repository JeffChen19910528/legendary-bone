'use strict';
/* ═══ AUDIO: Web Audio API setup, tone/noise/sfx, music, mute ═══════════ */
import { G } from './state.js';
import { defaultStorage } from './settings.js';

let audioCtx = null, masterGain = null, musicGain = null, sfxGain = null, musicTimer = null, musicStep = 0;
let audioReady = false;
export let muted = defaultStorage.getItem('legendary-bone-muted') === '1';

const MUSIC = [
  [196, .13], [247, .13], [294, .13], [330, .13], [294, .13], [247, .13],
  [220, .13], [262, .13], [330, .13], [392, .18], [330, .13], [262, .13],
  [174, .13], [220, .13], [262, .13], [294, .13], [262, .13], [220, .18]
];

export function ensureAudio() {
  if (!audioCtx) {
    const AC = (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return;
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    musicGain = audioCtx.createGain();
    sfxGain = audioCtx.createGain();
    masterGain.gain.value = muted ? 0 : .75;
    musicGain.gain.value = .18;
    sfxGain.gain.value = .55;
    musicGain.connect(masterGain);
    sfxGain.connect(masterGain);
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  audioReady = true;
  startMusic();
}

export function setMuted(next, onChange) {
  muted = next;
  defaultStorage.setItem('legendary-bone-muted', muted ? '1' : '0');
  if (masterGain) masterGain.gain.setTargetAtTime(muted ? 0 : .75, audioCtx.currentTime, .03);
  if (onChange) onChange();
}

export function tone(freq, dur, type = 'sine', vol = .35, delay = 0, bend = 0) {
  if (!audioReady || muted || !audioCtx) return;
  const t = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (bend) osc.frequency.exponentialRampToValueAtTime(Math.max(24, freq + bend), t + dur);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + .012);
  gain.gain.exponentialRampToValueAtTime(.001, t + dur);
  osc.connect(gain);
  gain.connect(sfxGain);
  osc.start(t);
  osc.stop(t + dur + .03);
}

export function noise(dur = .18, vol = .24, delay = 0) {
  if (!audioReady || muted || !audioCtx) return;
  const len = Math.max(1, audioCtx.sampleRate * dur | 0);
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  const t = audioCtx.currentTime + delay;
  src.buffer = buf;
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(.001, t + dur);
  src.connect(gain);
  gain.connect(sfxGain);
  src.start(t);
}

export function sfx(name) {
  switch (name) {
    case 'select': tone(520, .07, 'triangle', .22); tone(780, .09, 'triangle', .18, .06); break;
    case 'start': tone(330, .1, 'triangle', .24); tone(494, .1, 'triangle', .22, .08); tone(659, .16, 'triangle', .2, .16); break;
    case 'jump': tone(260, .16, 'square', .18, 0, 260); break;
    case 'bounce': tone(360, .12, 'square', .22); tone(720, .18, 'triangle', .18, .05); break;
    case 'coin': tone(880, .08, 'triangle', .23); tone(1320, .12, 'triangle', .2, .07); break;
    case 'bone': tone(660, .09, 'triangle', .23); tone(990, .1, 'triangle', .22, .06); tone(1480, .12, 'triangle', .18, .13); break;
    case 'stomp': tone(160, .09, 'square', .28); noise(.08, .13); break;
    case 'hurt': tone(260, .12, 'sawtooth', .28, 0, -120); tone(130, .18, 'sawtooth', .24, .09, -70); noise(.2, .18); break;
    case 'shoot': tone(420, .06, 'sawtooth', .16, 0, 180); break;
    case 'clear': tone(523, .12, 'triangle', .24); tone(659, .12, 'triangle', .23, .1); tone(784, .18, 'triangle', .22, .2); tone(1047, .25, 'triangle', .18, .34); break;
    case 'win': tone(523, .12, 'triangle', .23); tone(659, .12, 'triangle', .23, .12); tone(784, .12, 'triangle', .23, .24); tone(1047, .35, 'triangle', .22, .36); break;
  }
}

function musicTick() {
  if (!audioCtx || muted) { musicTimer = setTimeout(musicTick, 180); return; }
  const [freq, dur] = MUSIC[musicStep % MUSIC.length];
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq * (G.state === 'dead' ? .75 : 1), t);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(.23, t + .02);
  gain.gain.exponentialRampToValueAtTime(.001, t + dur * 1.8);
  osc.connect(gain);
  gain.connect(musicGain);
  osc.start(t);
  osc.stop(t + dur * 1.8 + .02);
  musicStep++;
  musicTimer = setTimeout(musicTick, 170);
}

export function startMusic() {
  if (!musicTimer) musicTick();
}
