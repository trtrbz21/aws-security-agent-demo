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

### 検証用エンドポイント

AWS Security Agent のレビューやテストで検出されやすいように、意図的に軽い脆弱性を含むエンドポイントを用意しています。

```text
GET /debug
GET /admin
GET /search?q=hello
GET /users?name=taro
GET /login?username=admin&password=wrong-password
```

これらはデモ用です。本番環境では使用しないでください。

SQL インジェクションの検証例:

ブラウザで以下を開き、フォームに入力して確認できます。

```text
http://localhost:3000/users
http://localhost:3000/login
```

入力例:

```text
' OR '1'='1
```

curl で確認する場合:

```sh
curl "http://localhost:3000/users?name='%20OR%20'1'%3D'1"
curl "http://localhost:3000/login?username=admin&password='%20OR%20'1'%3D'1"
```

### Docker 実行

```sh
cd app
docker build -t aws-security-agent-demo-app .
docker run --rm -p 3000:3000 aws-security-agent-demo-app
```

## Terraform

`terraform/` 配下に AWS リソースの定義があります。

ECR リポジトリ、ALB、ECS/Fargate などを作成します。

```sh
cd terraform
terraform init
terraform plan
terraform apply
```

## 今後の予定

- AWS Security Agent によるレビューとテスト
