# vadr-web-page
研究室紹介用webページのソースコードです。

## ローカルでの確認

ヘッダー・フッターなどの共通パーツを `fetch` でルート(`/include/...`)から読み込むため、
HTMLファイルを直接開くのではなく、このディレクトリをルートにしてサーバーを立ててください。

```sh
python3 -m http.server 8000
# http://localhost:8000/index.html
```

## ディレクトリ構成

```
.
├── *.html                 各ページ（公開URLを変えないためルートに置く）
├── data/news.json         ニュース記事のデータ
├── members/               メンバー個人ページ
├── include/               共通パーツ（header / footer / sidebar）
├── css/
│   ├── style.css          エントリーポイント（各ファイルを @import する）
│   ├── foundation/        reset.css, base.css
│   ├── layout/            l-header, l-footer, l-main(l-page), l-sidebar
│   ├── object/
│   │   ├── component/     c-*  複数ページで使う小さな部品
│   │   ├── project/       p-*  ページ・機能固有のスタイル
│   │   └── utility/       u-*  1つのプロパティだけを上書きする補助クラス
│   └── vendor/            外部ライブラリ（slider-pro.css はサイト向けに調整済み）
├── js/
│   ├── include.js         data-include のパーツを読み込み、現在ページのリンクに is-current を付ける
│   ├── global-nav.js      ハンバーガーメニュー / Researchパネルの開閉
│   ├── projects-data.js   トップページのプロジェクト一覧データ
│   ├── projects.js        上記データからカードを生成
│   ├── news.js            data/news.json からニュース一覧・詳細を表示
│   ├── top-slider.js      トップページのスライダー初期化
│   └── vendor/            jQuery, Slider Pro（トップページのスライダーでのみ使用）
├── img_assets/            ロゴ・スライダー・サムネイル・ニュース画像
└── img_members/           メンバーの顔写真
```

## ニュースの追加方法

`data/news.json` の配列に記事を1件追加するだけで、トップページ（最新5件）・News一覧・詳細ページに反映されます。
記事ごとにHTMLファイルを作る必要はありません。表示順は `date` の新しい順に自動で並びます。

```json
{
    "id": "2026-04-10",
    "date": "2026-04-10",
    "category": "研究発表",
    "title": "〇〇で発表しました",
    "image": "/img_assets/news/20260410_01.jpg",
    "imageAlt": "発表の様子",
    "body": [
        "1段落目の本文",
        "2段落目の本文"
    ],
    "links": [
        { "label": "参照ページ", "url": "https://example.com/" }
    ]
}
```

| 項目 | 必須 | 説明 |
|---|---|---|
| `id` | ○ | 詳細ページのURL（`/news-detail.html?id=…`）に使う。他の記事と重複しない値にする（同じ日に複数あれば `2026-04-10-2` など） |
| `date` | ○ | `YYYY-MM-DD` 形式 |
| `category` | ○ | お知らせ / 研究発表 / 学内イベント / 日常 など |
| `title` | ○ | 一覧と詳細ページに表示するタイトル |
| `body` | ○ | 本文。1要素が1段落 |
| `image`, `imageAlt` |  | 画像は `img_assets/news/` に置く。省略すると本文だけの表示になる |
| `links` |  | 本文の下にボタンとして表示するリンク |

JSONは最後の要素の後ろにカンマを付けるとエラーになり、ニュースが1件も表示されなくなるので注意してください。

## CSS の命名ルール（FLOCSS + BEM）

| 接頭辞 | 置き場所 | 例 |
|---|---|---|
| `l-` | `css/layout/` | `.l-header__inner` |
| `c-` | `css/object/component/` | `.c-card__title` |
| `p-` | `css/object/project/` | `.p-news__item` |
| `u-` | `css/object/utility/` | `.u-font-serif` |
| `is-` | 状態（JSで付け外し） | `.is-open`, `.is-current` |
| `js-` | JSから参照するためのフック（スタイルは当てない） | `.js-nav-toggle` |

- Block / Element / Modifier は `block__element--modifier` と書きます。
- ブレークポイントは PC が `min-width: 769px`、モバイルが `max-width: 768px` です。
- 新しいCSSファイルを追加したら、`css/style.css` に `@import` を追加してください。
