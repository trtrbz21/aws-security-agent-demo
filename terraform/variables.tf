variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "Project name used for tags"
  type        = string
  default     = "aws-security-agent-demo"
}

variable "repository_name" {
  description = "ECR repository name"
  type        = string
  default     = "aws-security-agent-demo-app"
}

variable "max_image_count" {
  description = "Maximum number of images to keep in ECR"
  type        = number
  default     = 10
}

variable "force_delete_repository" {
  description = "Delete the ECR repository even if it contains images"
  type        = bool
  default     = true
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "allowed_http_cidr_blocks" {
  description = "CIDR blocks allowed to access the ALB over HTTP"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "container_name" {
  description = "ECS container name"
  type        = string
  default     = "app"
}

variable "container_port" {
  description = "Application container port"
  type        = number
  default     = 3000
}

variable "image_tag" {
  description = "Container image tag"
  type        = string
  default     = "latest"
}

variable "desired_count" {
  description = "Desired number of ECS tasks"
  type        = number
  default     = 1
}

variable "task_cpu" {
  description = "Fargate task CPU units"
  type        = number
  default     = 256
}

variable "task_memory" {
  description = "Fargate task memory in MiB"
  type        = number
  default     = 512
}

variable "log_retention_days" {
  description = "CloudWatch Logs retention in days"
  type        = number
  default     = 7
}
