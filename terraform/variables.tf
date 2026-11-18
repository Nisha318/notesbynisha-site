variable "aws_region" {
  type        = string
  description = "Region for the S3 buckets and IAM resources."
  default     = "us-east-1"
}

variable "root_domain" {
  type        = string
  description = "Canonical domain the site is served from."
  default     = "notesbynisha.com"
}

variable "redirect_domains" {
  type        = list(string)
  description = "Domains that permanently redirect to the root domain."
  default     = ["nishacloud.com"]
}

variable "site_bucket_prefix" {
  type        = string
  description = "Prefix for the site bucket name. The account ID is appended to keep it globally unique."
  default     = "notesbynisha-site"
}

variable "github_repo" {
  type        = string
  description = "GitHub repository (owner/name) allowed to deploy the site through OIDC."
  default     = "Nisha318/notesbynisha-site"
}

variable "create_github_oidc_provider" {
  type        = bool
  description = "Create the GitHub OIDC provider. Set to false if this AWS account already has one."
  default     = true
}

variable "price_class" {
  type        = string
  description = "CloudFront price class. PriceClass_100 covers North America and Europe at the lowest cost."
  default     = "PriceClass_100"
}

variable "extra_dns_records" {
  type = list(object({
    zone    = string
    name    = string
    type    = string
    ttl     = optional(number, 300)
    records = list(string)
  }))
  description = "Extra DNS records to keep, such as MX and TXT records for email. The zone must be one of the managed domains."
  default     = []

  validation {
    condition = alltrue([
      for r in var.extra_dns_records :
      r.zone == var.root_domain || contains(var.redirect_domains, r.zone)
    ])
    error_message = "Each extra_dns_records zone must be the root domain or one of the redirect domains."
  }
}
