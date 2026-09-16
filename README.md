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
│   ├── top-slider.js      トップページのスライダー初期化
│   └── vendor/            jQuery, Slider Pro（トップページのスライダーでのみ使用）
├── img_assets/            ロゴ・スライダー・サムネイル・ニュース画像
└── img_members/           メンバーの顔写真
```

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
