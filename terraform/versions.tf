terraform {
  required_version = ">= 1.10.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.81, < 7.0"
    }
  }

  backend "s3" {
    key          = "notesbynisha-site/terraform.tfstate"
    encrypt      = true
    use_lockfile = true
    # The bucket and region are supplied at init time. See the Makefile and README.
  }
}
