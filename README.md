**語言 / Language / 言語：** [繁體中文](#繁體中文) | [English](#english) | [日本語](#日本語)

---

## 繁體中文

# 神聖骨頭大冒險

單檔 HTML5 Canvas 網頁遊戲。玩家選擇角色後闖過多個陷阱關卡，收集骨頭與金幣，最後取回傳說中的神聖骨頭。

### 啟動方式

1. 直接用 Chrome、Edge、Firefox 或 Safari 開啟 `index.html`。
2. 在標題畫面按方向鍵或空白鍵開始。
3. 選擇角色後按 `Space` 或 `Enter` 進入遊戲。

### 操作

| 操作 | 功能 |
| --- | --- |
| `←` / `→` 或 `A` / `D` | 移動 |
| `↑` / `Space` / `W` / `Z` | 跳躍 |
| `R` | 重新挑戰目前關卡；通關畫面可重新開始 |
| 虛擬搖桿 + 跳躍鍵 | 手機和平板可用螢幕左側搖桿控制方向、右側跳躍鍵起跳 |

### 設定選單

畫面右下角有兩個圓形按鈕：

| 按鈕 | 功能 |
| --- | --- |
| `⚙` | 開啟設定選單 |
| `🔊` / `🔇` | 開關音效與背景音樂 |

設定選單可以調整：

- 移動速度：即時影響玩家角色左右移動速度。預設為 `75%`，最低可調到 `25%`。
- 遊戲速度：即時影響玩家、敵人、投射物、平台、死亡倒數、過關等待與粒子更新。預設為 `80%`，最低可調到 `25%`。
- 第一關會額外套用新手減速，讓剛開始玩的玩家更容易適應。
- 語言：可切換 `繁體中文`、`English`、`日本語`。
- 重設預設值：把移動速度和遊戲速度恢復成預設值。

設定會存到瀏覽器的 `localStorage`，下次開啟遊戲仍會保留。

### 音效與背景音樂

遊戲使用 Web Audio API 即時產生音效，不需要額外音檔。第一次按鍵、觸控或點擊音效按鈕後，瀏覽器才會允許播放聲音。

目前包含：

- 背景音樂循環
- 跳躍音效
- 彈跳平台音效
- 收集金幣與骨頭音效
- 踩敵人音效
- 敵人發射物音效
- 死亡音效
- 過關與通關音效

### 專案結構

```text
legendary-bone/
├── index.html  # 遊戲本體、樣式、音效、設定與語系邏輯
└── README.md   # 操作與功能說明
```

### 技術

- HTML5 Canvas 2D
- 原生 JavaScript
- Web Audio API
- 無需建置工具或外部依賴

---

## English

# Sacred Bone Adventure

A single-file HTML5 Canvas browser game. Choose your hero, survive trap-filled stages, collect bones and coins, and reclaim the legendary sacred bone.

### How to Start

1. Open `index.html` directly in Chrome, Edge, Firefox, or Safari.
2. Press any arrow key or Space on the title screen.
3. Select a character and press `Space` or `Enter` to begin.

### Controls

| Input | Action |
| --- | --- |
| `←` / `→` or `A` / `D` | Move |
| `↑` / `Space` / `W` / `Z` | Jump |
| `R` | Retry the current stage; restart from the win screen |
| Virtual joystick + jump button | On phones and tablets, use the on-screen joystick (left) to move and the jump button (right) to jump |

### Settings Menu

Two round buttons are shown in the bottom-right corner:

| Button | Function |
| --- | --- |
| `⚙` | Open settings menu |
| `🔊` / `🔇` | Toggle sound and background music |

The settings menu lets you adjust:

- **Move speed** — affects the player's left/right speed in real time. Default `75%`, minimum `25%`.
- **Game speed** — affects the player, enemies, projectiles, platforms, death countdown, stage transitions, and particles. Default `80%`, minimum `25%`.
- Stage 1 applies an extra slowdown to help new players get familiar with the controls.
- **Language** — switch between `繁體中文`, `English`, and `日本語`.
- **Reset defaults** — restores move speed and game speed to their default values.

Settings are saved in the browser's `localStorage` and persist across sessions.

### Sound & Music

Sound effects are generated in real time using the Web Audio API — no audio files required. The browser will only allow audio after the first key press, touch, or click on the sound button.

Includes:

- Looping background music
- Jump sound
- Bounce platform sound
- Coin and bone collection sounds
- Stomp enemy sound
- Enemy projectile sound
- Death sound
- Stage clear and game clear sounds

### Project Structure

```text
legendary-bone/
├── index.html  # Game logic, styles, audio, settings, and i18n
└── README.md   # Controls and feature reference
```

### Tech

- HTML5 Canvas 2D
- Vanilla JavaScript
- Web Audio API
- No build tools or external dependencies

---

## 日本語

# 聖なる骨の大冒険

シングルファイルの HTML5 Canvas ブラウザゲームです。キャラクターを選び、トラップだらけのステージを突破して骨やコインを集め、伝説の聖なる骨を取り戻しましょう。

### 起動方法

1. `index.html` を Chrome・Edge・Firefox・Safari で直接開く。
2. タイトル画面で方向キーまたは Space を押す。
3. キャラクターを選び、`Space` または `Enter` でゲーム開始。

### 操作方法

| 入力 | アクション |
| --- | --- |
| `←` / `→` または `A` / `D` | 移動 |
| `↑` / `Space` / `W` / `Z` | ジャンプ |
| `R` | 現在のステージをリトライ；クリア画面では最初からやり直し |
| バーチャルスティック + ジャンプボタン | スマホ・タブレットでは画面左側のスティックで移動、右側のジャンプボタンでジャンプ |

### 設定メニュー

画面右下に2つの丸いボタンが表示されます：

| ボタン | 機能 |
| --- | --- |
| `⚙` | 設定メニューを開く |
| `🔊` / `🔇` | サウンドのオン／オフ |

設定メニューで調整できる項目：

- **移動速度** — プレイヤーの左右移動速度をリアルタイムで変更。デフォルト `75%`、最低 `25%`。
- **ゲーム速度** — プレイヤー・敵・射出物・プラットフォーム・死亡カウント・ステージ遷移・パーティクルの速度を一括変更。デフォルト `80%`、最低 `25%`。
- ステージ1では初心者向けの追加スローが適用されます。
- **言語** — `繁體中文`・`English`・`日本語` から選択可能。
- **初期値に戻す** — 移動速度とゲーム速度をデフォルト値にリセット。

設定はブラウザの `localStorage` に保存され、次回起動時も引き継がれます。

### サウンドと BGM

効果音は Web Audio API でリアルタイム生成されるため、外部音声ファイルは不要です。最初のキー入力・タッチ・サウンドボタンのクリック後にブラウザが音声再生を許可します。

収録内容：

- BGM ループ
- ジャンプ音
- バウンスプラットフォーム音
- コイン・骨の収集音
- 敵を踏みつける音
- 敵の射出物音
- ミス音
- ステージクリア・ゲームクリア音

### プロジェクト構成

```text
legendary-bone/
├── index.html  # ゲーム本体・スタイル・音声・設定・i18n
└── README.md   # 操作説明・機能リファレンス
```

### 技術

- HTML5 Canvas 2D
- バニラ JavaScript
- Web Audio API
- ビルドツール・外部依存なし
