output "site_url" {
  description = "Canonical URL of the site."
  value       = "https://${var.root_domain}"
}

output "name_servers" {
  description = "Set these as the custom nameservers at GoDaddy, one set per domain."
  value       = { for domain, zone in aws_route53_zone.this : domain => zone.name_servers }
}

output "site_bucket_name" {
  description = "S3 bucket that holds the built site. Used as the SITE_BUCKET GitHub variable."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "Used as the CLOUDFRONT_DISTRIBUTION_ID GitHub variable."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "The distribution's own domain, handy for testing before DNS cuts over."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "deploy_role_arn" {
  description = "Used as the AWS_ROLE_ARN GitHub variable."
  value       = aws_iam_role.deploy.arn
}
