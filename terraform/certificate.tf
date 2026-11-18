# One certificate covers every hostname the distribution serves.
resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = var.root_domain
  subject_alternative_names = [for n in local.site_names : n if n != var.root_domain]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for o in aws_acm_certificate.site.domain_validation_options :
    o.domain_name => o
  }

  allow_overwrite = true
  zone_id         = aws_route53_zone.this[local.zone_for_name[each.key]].zone_id
  name            = each.value.resource_record_name
  type            = each.value.resource_record_type
  records         = [each.value.resource_record_value]
  ttl             = 60
}

# Waits until ACM sees the validation records. This only completes once the
# nameservers at GoDaddy point to Route 53.
resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}
