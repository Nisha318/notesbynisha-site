#!/usr/bin/env bash
# One-time setup of the S3 bucket that stores Terraform state.
#
# Usage: scripts/bootstrap-state.sh <bucket-name> [region]
# The bucket name must be globally unique, for example notesbynisha-tfstate-<account-id>.
set -euo pipefail

BUCKET="${1:?Usage: bootstrap-state.sh <bucket-name> [region]}"
REGION="${2:-us-east-1}"

echo "Creating bucket ${BUCKET} in ${REGION}"
if [ "${REGION}" = "us-east-1" ]; then
  aws s3api create-bucket --bucket "${BUCKET}" --region "${REGION}"
else
  aws s3api create-bucket --bucket "${BUCKET}" --region "${REGION}" \
    --create-bucket-configuration "LocationConstraint=${REGION}"
fi

echo "Blocking all public access"
aws s3api put-public-access-block --bucket "${BUCKET}" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

echo "Turning on versioning"
aws s3api put-bucket-versioning --bucket "${BUCKET}" \
  --versioning-configuration Status=Enabled

echo "Turning on default encryption"
aws s3api put-bucket-encryption --bucket "${BUCKET}" \
  --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"},"BucketKeyEnabled":true}]}'

echo "Requiring TLS for every request"
aws s3api put-bucket-policy --bucket "${BUCKET}" --policy "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [{
    \"Sid\": \"DenyInsecureTransport\",
    \"Effect\": \"Deny\",
    \"Principal\": \"*\",
    \"Action\": \"s3:*\",
    \"Resource\": [\"arn:aws:s3:::${BUCKET}\", \"arn:aws:s3:::${BUCKET}/*\"],
    \"Condition\": {\"Bool\": {\"aws:SecureTransport\": \"false\"}}
  }]
}"

echo
echo "State bucket ready. Initialize Terraform with:"
echo "  make init STATE_BUCKET=${BUCKET} AWS_REGION=${REGION}"
