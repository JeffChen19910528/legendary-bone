'use strict';
/* ═══ I18N ══════════════════════════════════════════════════════════════ */
import { lang } from './settings.js';

export const I18N = {
  zh: {
    pageTitle: '神聖骨頭大冒險', heading: '神聖骨頭大冒險', sub: '選角色、闖關、拿回傳說骨頭',
    ctrl: '<span>← →</span> 移動 | <span>↑/空白</span> 跳 | <span>R</span> 重試當關',
    settings: '設定', sound: '音效開關', moveSpeed: '移動速度', gameSpeed: '遊戲速度', language: '語言', reset: '重設預設值',
    score: '骨頭', deaths: '死亡', retry: 'R 重試', charTitle: '選擇你的角色', charHelp: '← → 切換角色　　空白 / Enter 確認出發',
    startHint: '按任意方向鍵或空白鍵開始', storyHint: '按任意鍵繼續', deadTitle: '失敗了！', deadHint: '等等重新開始...', clearTitle: '過關！', clearMain: '做得好，下一關準備中', clearNext: '即將開始',
    winTitle: '通關！拿回神聖骨頭', winMain: '你完成了全部關卡', winScore: '總分', winDeaths: '死亡', winRestart: '按 R 重新開始'
  },
  en: {
    pageTitle: 'Sacred Bone Adventure', heading: 'Sacred Bone Adventure', sub: 'Pick a hero, clear stages, reclaim the sacred bone',
    ctrl: '<span>← →</span> Move | <span>↑/Space</span> Jump | <span>R</span> Retry',
    settings: 'Settings', sound: 'Sound toggle', moveSpeed: 'Move speed', gameSpeed: 'Game speed', language: 'Language', reset: 'Reset defaults',
    score: 'Bones', deaths: 'Deaths', retry: 'R Retry', charTitle: 'Choose Your Hero', charHelp: '← → Change character　　Space / Enter Confirm',
    startHint: 'Press any direction or Space to start', storyHint: 'Press any key to continue', deadTitle: 'You Died!', deadHint: 'Restarting soon...', clearTitle: 'Stage Clear!', clearMain: 'Nice run. Next stage is loading', clearNext: 'Coming next',
    winTitle: 'Cleared! Sacred Bone Reclaimed', winMain: 'You finished every stage', winScore: 'Score', winDeaths: 'Deaths', winRestart: 'Press R to restart'
  },
  ja: {
    pageTitle: '聖なる骨の大冒険', heading: '聖なる骨の大冒険', sub: 'キャラクターを選び、ステージを進み、聖なる骨を取り戻そう',
    ctrl: '<span>← →</span> 移動 | <span>↑/Space</span> ジャンプ | <span>R</span> リトライ',
    settings: '設定', sound: 'サウンド切替', moveSpeed: '移動速度', gameSpeed: 'ゲーム速度', language: '言語', reset: '初期値に戻す',
    score: '骨', deaths: 'ミス', retry: 'R リトライ', charTitle: 'キャラクター選択', charHelp: '← → キャラ変更　　Space / Enter 決定',
    startHint: '方向キーまたはSpaceで開始', storyHint: '何かキーを押して続行', deadTitle: 'ミス！', deadHint: 'まもなく再開...', clearTitle: 'ステージクリア！', clearMain: '次のステージを準備中', clearNext: '次',
    winTitle: 'クリア！聖なる骨を取り戻した', winMain: '全ステージを突破しました', winScore: 'スコア', winDeaths: 'ミス', winRestart: 'Rで最初から'
  }
};

export const T = (k) => (I18N[lang] && I18N[lang][k]) || I18N.zh[k] || k;
