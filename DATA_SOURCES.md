# データの出典と選定方法

取得日：2026-10-24。静的スナップショットで、自動更新ではありません。

## 観光地・見どころ（600件）

- [Detourmap Places](https://github.com/Flightmussy/detourmap-places) のコンパクトデータ（71,763件、Wikidata由来、CC0）から選定。
- [Wikidata](https://www.wikidata.org/) の日本語ラベルをQIDで照合。日本語名がない項目は原語・英語名を保持。説明文は本アプリで作成した短い分類文。写真・第三者の説明文は収録していません。
- Natural Earthの国・地域のポリゴンと座標で所属を照合。一般化された海岸線の外にある地点は、元データの国情報を使います。バチカンのような小地域には座標範囲による補正があります。
- まず収録する242の国・地域ごとに1件を確保。その後、元データの知名度順で、1地域16件を上限に600件まで追加しました。242地域すべてに1件以上あります。南極・海外領土なども「地域」に含むため、242か国を意味しません。
- 見どころには、建築物、博物館、歴史的な場所、山、滝、海辺などがあります。旅行可能性・安全性・入場可否の案内ではありません。
- `tourism-data.js`：QID、表示名、英語名、国・地域ID、緯度、経度、分類。各詳細の「情報の出典」からWikidataを開けます。

## 世界遺産（1,273件、別レイヤー）

- [UNESCO World Heritage List](https://whc.unesco.org/en/list/)
- [UNESCO公式データ WHC001](https://data.unesco.org/explore/dataset/whc001/)
- [取得API](https://data.unesco.org/api/explore/v2.1/catalog/datasets/whc001/exports/json)
- 登録済みリストのID、登録名、国、登録年、分類、構成地点の座標という事実データを利用。UNESCOの記事本文・画像・ロゴは使っていません。日本語名はWikidataのP757（世界遺産ID）に対応する項目のラベルで、UNESCO公式の日本語訳とは限りません。複数候補は言語間リンク数が多い項目を優先。構成資産の枝番を全体の名称として使わないようにしています。
- 連続資産・国境をまたぐ資産は、最初の有効な構成地点を代表位置として使用。構成地点がなければ実際のPoint / MultiPointの1点を使用します。複数地点の平均位置を海上などに表示しません。登録範囲全体の境界を示すものではありません。
- 公式APIで座標のない2件は構成地点のWikidata座標を使用：1567は[Tyne Cot Cemetery](https://www.wikidata.org/wiki/Q2369533)、868はWikidataのP757枝番868の構成地点。1567の構成資産は[UNESCO資料](https://whc.unesco.org/document/199662)でも確認しています。元の座標出典URLは`coordinateSource`に保存。
- `heritage-data.js`：UNESCO ID、表示名、公式英語名、国ID配列、緯度、経度、登録年、分類、QID、構成地点数、座標出典。各詳細からUNESCOの個別ページを開けます。
- 観光地と世界遺産は独立してオン・オフできます。同じQIDを両方で表示する場合、地球上の名前は1つにまとめ、選択中の項目を優先します。

## その他

国・地域名と簡略境界：Natural Earth（public domain）。国旗：flag-icons（MIT）、239地域に対応。地表画像：NASA / Three.js。詳しくは`THIRD_PARTY_NOTICES.md`。

国・地域の区分はデータセットの区分であり、政治的な立場を表すものではありません。座標は学習用の概略位置です。
