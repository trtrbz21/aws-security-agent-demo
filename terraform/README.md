# Terraform

AWS Security Agent 検証用アプリケーションの AWS リソースを管理します。

## 作成するリソース

- ECR リポジトリ
- ECR ライフサイクルポリシー
- VPC
- Public Subnet x2
- Internet Gateway
- Application Load Balancer
- ECS Cluster
- ECS Fargate Service
- ECS Task Definition
- CloudWatch Logs
- IAM Role

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

apply 後に `app_url` と `health_check_url` が出力されます。

## Docker イメージの push

Terraform apply 後、出力された `ecr_repository_url` を使って Docker イメージを push します。

```sh
aws ecr get-login-password --region ap-northeast-1 \
  | docker login --username AWS --password-stdin <account_id>.dkr.ecr.ap-northeast-1.amazonaws.com

docker tag aws-security-agent-demo-app:latest <ecr_repository_url>:latest
docker push <ecr_repository_url>:latest
```

## 動作確認

```sh
curl <app_url>
curl <health_check_url>
```
