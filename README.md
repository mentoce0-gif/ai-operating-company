# AI Operating Company

AI社員が案件を自律的に企画・制作・販売・改善するための、ローカルファーストな運営OSです。

> Status: v0.1 — Operating dashboard and company data foundation

## v0.1でできること

- 会社全体の稼働状況を把握するダッシュボード
- Enterprise / Creator / Character / Researchの事業部管理
- AI社員の役割・状態・成果物・次タスク管理
- 商品の「アイデア → 制作 → 販売 → 改善」パイプライン管理
- 月次売上・目標達成率・改善提案のKPI管理
- 監督の承認・却下・理由を蓄積するDecision Log
- JSONによるデータ保存・読込
- ブラウザ内のローカルストレージへの自動保存

## デモ

[GitHub PagesでAI Operating Company OSを開く](https://mentoce0-gif.github.io/ai-operating-company/)

GitHub Pagesへの反映には、更新後数分かかる場合があります。

## ローカルで使う

最小構成はサーバーもインストールも不要です。

1. リポジトリをダウンロードまたはclone
2. `mvp/website/index.html`をブラウザで開く
3. 必要に応じて「JSONで保存」でバックアップ

開発版を起動する場合は、Node.js 22.13以降を使用します。

```bash
cd mvp/website
npm install
npm run dev
```

## ディレクトリ

```text
decision-assets/  重要な事業判断
mvp/
  product/        商品テンプレートと運用プロトコル
  website/        AI Operating Company Webアプリ
  workbook/       運用ワークブック生成処理
  pdf/            商品PDF生成処理
operations/       現在地と運用ルール
```

## データとプライバシー

実行データは利用中のブラウザに保存されます。GitHub Pagesへ実案件データが自動送信されることはありません。

- 公開リポジトリにはサンプルデータのみを含める
- APIキーや認証情報をフロントエンドへ記載しない
- 実案件データはJSONでローカルにバックアップする

## Roadmap

- **v0.1:** 経営ダッシュボードとJSONデータ基盤
- **v0.2:** 案件管理・タスクボード・承認キュー
- **v0.3:** AI社員の自律実行ループ
- **v0.5:** 実案件での継続運用
- **v1.0:** 安定した公開運用版

## License

現時点ではPrivateリポジトリでの内部利用を前提としています。ライセンスは未設定です。
