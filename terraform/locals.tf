data "aws_caller_identity" "current" {}

locals {
  tags = {
    Project   = "notesbynisha-site"
    ManagedBy = "Terraform"
  }

  zone_domains = toset(concat([var.root_domain], var.redirect_domains))
  site_names   = sort(flatten([for d in local.zone_domains : [d, "www.${d}"]]))

  # Hostname mapped to the hosted zone that owns it.
  zone_for_name = {
    for n in local.site_names :
    n => [for d in local.zone_domains : d if n == d || endswith(n, ".${d}")][0]
  }

  site_bucket = "${var.site_bucket_prefix}-${data.aws_caller_identity.current.account_id}"
  logs_bucket = "${local.site_bucket}-logs"

  # Enforced by CloudFront as a response header. The site loads nothing from
  # third parties, so the policy stays tight. dev.to and Formspree are the only
  # outside hosts the page talks to.
  csp = join("; ", [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://dev.to https://formspree.io",
    "form-action 'self' https://formspree.io",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ])
}
