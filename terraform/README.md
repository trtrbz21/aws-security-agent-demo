# Terraform

AWS Security Agent 検証用アプリケーションの AWS リソースを管理します。

## 作成するリソース

- ECR リポジトリ
- ECR ライフサイクルポリシー

## 前提

- Terraform がインストールされていること
- AWS CLI の認証情報が設定済みであること
- デフォルトリージョンは `ap-northeast-1`

## 実行方法

```sh
cd terraform
terraform init
terraform plan
terraform apply
```

## Docker イメージの push

Terraform apply 後、出力された `ecr_repository_url` を使って Docker イメージを push します。

```sh
aws ecr get-login-password --region ap-northeast-1 \
  | docker login --username AWS --password-stdin <account_id>.dkr.ecr.ap-northeast-1.amazonaws.com

docker tag aws-security-agent-demo-app:latest <ecr_repository_url>:latest
docker push <ecr_repository_url>:latest
```

