output "ecr_repository_name" {
  description = "ECR repository name"
  value       = aws_ecr_repository.app.name
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.app.repository_url
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.app.dns_name
}

output "app_url" {
  description = "Application URL"
  value       = "https://${local.app_domain_name}"
}

output "health_check_url" {
  description = "Application health check URL"
  value       = "https://${local.app_domain_name}/health"
}

output "app_domain_name" {
  description = "Application domain name"
  value       = local.app_domain_name
}
