# AWS Security Agent Demo

AWS Security Agent の検証用デモリポジトリです。

まずは TypeScript/Express の Web アプリケーションを Docker コンテナとして動かし、後から Terraform で ECS/Fargate へデプロイする構成に拡張します。

## ディレクトリ構成

```text
aws-security-agent-demo/
├─ app/
│  └─ TypeScript Express アプリケーション
├─ terraform/
│  └─ AWS インフラ構成
├─ docs/
│  └─ LT 資料や画像
└─ README.md
```

## アプリケーション

`app/` 配下に Express アプリケーションがあります。

### ローカル実行

```sh
cd app
npm install
npm run build
npm start
```

アプリケーションは `3000` 番ポートで起動します。

確認:

```sh
curl http://localhost:3000/
curl http://localhost:3000/health
```

期待するレスポンス:

```text
Hello Security Agent
OK
```

### Docker 実行

```sh
cd app
docker build -t aws-security-agent-demo-app .
docker run --rm -p 3000:3000 aws-security-agent-demo-app
```

## 今後の予定

- Terraform による AWS インフラ構築
- ECR への Docker イメージ登録
- ECS/Fargate でのアプリケーション実行
- AWS Security Agent の検証用エンドポイント追加
