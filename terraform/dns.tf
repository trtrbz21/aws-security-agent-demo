data "aws_route53_zone" "app" {
  name         = var.domain_name
  private_zone = false
}

resource "aws_acm_certificate" "app" {
  domain_name       = local.app_domain_name
  validation_method = "DNS"

  tags = local.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "app_certificate_validation" {
  for_each = {
    for option in aws_acm_certificate.app.domain_validation_options :
    option.domain_name => {
      name   = option.resource_record_name
      record = option.resource_record_value
      type   = option.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.app.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "app" {
  certificate_arn         = aws_acm_certificate.app.arn
  validation_record_fqdns = [for record in aws_route53_record.app_certificate_validation : record.fqdn]
}

resource "aws_route53_record" "app" {
  zone_id = data.aws_route53_zone.app.zone_id
  name    = local.app_domain_name
  type    = "A"

  alias {
    name                   = aws_lb.app.dns_name
    zone_id                = aws_lb.app.zone_id
    evaluate_target_health = true
  }
}

