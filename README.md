# AI Operating Company

AI社員が案件を自律的に企画・制作・販売・改善するための、ローカルファーストな運営OSです。

> Status: v0.2 — Serverless Strategy Room and operating dashboard

## v0.1でできること

- 会社全体の稼働状況を把握するダッシュボード
- Enterprise / Creator / Character / Researchの事業部管理
- AI社員の役割・状態・成果物・次タスク管理
- 商品の「アイデア → 制作 → 販売 → 改善」パイプライン管理
- 月次売上・目標達成率・改善提案のKPI管理
- 監督の承認・却下・理由を蓄積するDecision Log
- JSONによるデータ保存・読込
- ブラウザ内のローカルストレージへの自動保存
- AI社員の役割別見解を比較するサーバーレス作戦会議
- 実行候補の採点とDecision Logへの監督判断保存

作戦会議は現在「テンプレートモード」です。外部AIとは通信せず、役割別のルールを使ってローカルで提案を構成します。

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
- **v0.2:** サーバーレス作戦会議・候補比較・監督判断
- **v0.3:** 案件管理・タスクボード・承認キュー
- **v0.4:** 安全なAPI接続によるAI社員の自律提案
- **v0.5:** 実案件での継続運用
- **v1.0:** 安定した公開運用版

将来、AI Operatingページは各商品の営業状況（リード・提案・商談・成約・改善）を一元化するSales Operations Hubへ再編します。

## License

現時点ではPrivateリポジトリでの内部利用を前提としています。ライセンスは未設定です。
