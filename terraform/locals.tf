locals {
  app_domain_name = "${var.app_subdomain}.${var.domain_name}"

  tags = {
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
}
