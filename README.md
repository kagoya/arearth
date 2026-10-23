# arearth — 地球を、手のひらに。

国・地域名、首都、観光地を地表に表示するWeb地球儀です。スマートフォンではARで机や床に地球を置けます。

**公開ページ：https://kagoya.github.io/arearth/**

## 使い方

1. iPhoneはSafari、対応AndroidはChromeで公開ページを開きます。
2. 表示する地名を「国・地域名」「国・地域名＋首都」「すべて」から選びます。
3. 検索・一覧から場所を選ぶと、その地点が正面に移動します。他の地名は残ります。
4. ARボタンを押し、机や床をカメラで映します。地球を拡大すると文字も拡大します。

## 内容

- 国・地域242件（南極などの地域を含む）、首都25件、観光地22件
- 回転・拡大、検索、日本語／英語の地名検索
- 地表に文字を直接描くため、地形を隠す大きなピン・札はありません
- 国・地域は白、首都は緑、観光地は黄、選択地点は桃色
- 国・地域の区分・境界はNatural Earthの簡略データ。国・地域名は代表表示位置で、首都とは別です

## ARについて

iPhoneはAR Quick Look、対応AndroidはWebXRを使用します。iPhoneのAR中は表示種類や文字数を動的に切り替えません。AR開始前に種類を選んでください。地名は地球と一緒に拡大します。初期直径は30cmです。

3DにはWebGLが必要です。非対応環境では2Dプレビューを表示します。実機のARでの読みやすさは端末により異なります。

## ローカル実行・検証

インストールやビルドは不要です。Python 3の場合：

```sh
python -m http.server 8000
```

ブラウザで http://localhost:8000 を開きます。スマートフォンでARを使う場合はHTTPSで配信してください。

コードのチェック（Node.js 18以降）：

```sh
npm run check
```

GitHub Pagesは `main` ブランチの `/ (root)` を配信します。

## ファイル

- `index.html` / `app.js`：画面と操作
- `places.js` / `countries.js`：地点、検索、国・地域名と簡略境界
- `surface-atlas.js`：地表画像への文字描画・配置
- `marker-model.js`：文字付き画像のGLBへの組み込み
- `assets/`：地球モデル、地表画像、表示ライブラリ
- `make_globe.py`：標準Pythonのみで地球GLBを再生成
- `scripts/prepare-countries.py`：Natural Earth GeoJSONから表示データを生成
- `verify.mjs`：表示件数、検索、配置、GLBの構造をチェック

## 出典

[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。
