#!/usr/bin/env bash
# Publish the built site (app/dist) to S3 and clear the CloudFront cache.
#
# Reads SITE_BUCKET and CLOUDFRONT_DISTRIBUTION_ID from the environment.
# GitHub Actions and `make deploy` both call this script.
set -euo pipefail

: "${SITE_BUCKET:?Set SITE_BUCKET to the site bucket name}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?Set CLOUDFRONT_DISTRIBUTION_ID to the distribution id}"

DIST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/app/dist"

if [ ! -f "${DIST}/index.html" ]; then
  echo "No build found at ${DIST}. Run 'npm run build' inside app/ first." >&2
  exit 1
fi

echo "Uploading hashed assets (cached for a year)"
aws s3 sync "${DIST}/assets" "s3://${SITE_BUCKET}/assets" \
  --delete \
  --cache-control "public,max-age=31536000,immutable"

echo "Uploading everything else (cached for an hour)"
aws s3 sync "${DIST}" "s3://${SITE_BUCKET}" \
  --delete \
  --exclude "assets/*" \
  --exclude "index.html" \
  --exclude "404.html" \
  --cache-control "public,max-age=3600"

# HTML goes last so a page never points at assets that have not arrived yet.
echo "Uploading HTML (always revalidated)"
aws s3 cp "${DIST}/index.html" "s3://${SITE_BUCKET}/index.html" \
  --cache-control "no-cache" \
  --content-type "text/html; charset=utf-8"
aws s3 cp "${DIST}/404.html" "s3://${SITE_BUCKET}/404.html" \
  --cache-control "no-cache" \
  --content-type "text/html; charset=utf-8"

echo "Invalidating the CloudFront cache"
INVALIDATION_ID="$(aws cloudfront create-invalidation \
  --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" \
  --paths "/*" \
  --query "Invalidation.Id" \
  --output text)"

echo "Done. Invalidation ${INVALIDATION_ID} started."
