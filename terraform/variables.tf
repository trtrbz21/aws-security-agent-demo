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
