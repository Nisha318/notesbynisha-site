SHELL := /bin/bash
TF ?= terraform
AWS_REGION ?= us-east-1

.PHONY: help install dev lint build fmt check-state init zones plan apply outputs deploy

help:
	@echo "Site"
	@echo "  make install   Install site dependencies"
	@echo "  make dev       Start the local dev server"
	@echo "  make lint      Lint the site code"
	@echo "  make build     Build the site into app/dist"
	@echo ""
	@echo "Infrastructure (set STATE_BUCKET=<your state bucket>)"
	@echo "  make fmt       Format Terraform files"
	@echo "  make init      Initialize Terraform with the S3 backend"
	@echo "  make zones     Create only the Route 53 hosted zones (first run)"
	@echo "  make plan      Show planned changes"
	@echo "  make apply     Apply changes"
	@echo "  make outputs   Show outputs such as nameservers and GitHub variables"
	@echo ""
	@echo "Publishing"
	@echo "  make deploy    Build and upload the site by hand"

install:
	cd app && npm ci

dev:
	cd app && npm run dev

lint:
	cd app && npm run lint

build:
	cd app && npm run build

fmt:
	$(TF) -chdir=terraform fmt -recursive

check-state:
	@test -n "$(STATE_BUCKET)" || (echo "Set STATE_BUCKET, for example: make plan STATE_BUCKET=my-tfstate-bucket" && exit 1)

init: check-state
	$(TF) -chdir=terraform init \
		-backend-config="bucket=$(STATE_BUCKET)" \
		-backend-config="region=$(AWS_REGION)"

zones: init
	$(TF) -chdir=terraform apply -target='aws_route53_zone.this'

plan: init
	$(TF) -chdir=terraform plan

apply: init
	$(TF) -chdir=terraform apply

outputs:
	$(TF) -chdir=terraform output

deploy: build
	SITE_BUCKET=$$($(TF) -chdir=terraform output -raw site_bucket_name) \
	CLOUDFRONT_DISTRIBUTION_ID=$$($(TF) -chdir=terraform output -raw cloudfront_distribution_id) \
	bash scripts/deploy-site.sh
