# One public hosted zone per domain. After the first apply, point the domain's
# nameservers at GoDaddy to the values in the name_servers output.
resource "aws_route53_zone" "this" {
  for_each = local.zone_domains

  name    = each.value
  comment = "Managed by Terraform for the portfolio site."
}

# Alias records send the apex and www of every domain to CloudFront.
# The redirect function then sends non-canonical hosts to the root domain.
resource "aws_route53_record" "site_a" {
  for_each = toset(local.site_names)

  zone_id = aws_route53_zone.this[local.zone_for_name[each.value]].zone_id
  name    = each.value
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_aaaa" {
  for_each = toset(local.site_names)

  zone_id = aws_route53_zone.this[local.zone_for_name[each.value]].zone_id
  name    = each.value
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

# Only Amazon may issue certificates for these domains.
resource "aws_route53_record" "caa" {
  for_each = local.zone_domains

  zone_id = aws_route53_zone.this[each.value].zone_id
  name    = each.value
  type    = "CAA"
  ttl     = 3600
  records = [
    "0 issue \"amazon.com\"",
    "0 issuewild \";\"",
  ]
}

# Records you want to keep from the old DNS setup, such as MX and TXT for email.
resource "aws_route53_record" "extra" {
  for_each = { for r in var.extra_dns_records : "${r.zone}|${r.name}|${r.type}" => r }

  zone_id = aws_route53_zone.this[each.value.zone].zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = each.value.ttl
  records = each.value.records
}
