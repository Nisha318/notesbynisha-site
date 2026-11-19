# notesbynisha.com

Personal portfolio for Nisha McDonnell, cloud security engineer.

> Infrastructure you can defend, delivered as code.

The site is a React and Tailwind single page, served from a private S3 bucket through CloudFront, with all of the AWS infrastructure defined in Terraform. The project structure started from Damien Burks' open-source [personal-website](https://github.com/damienjburks/personal-website) template. The content, design, and infrastructure code here are rewritten.

## What is in the repo

```
app/                     The website (React, TypeScript, Vite, Tailwind)
  src/config/site.ts     Name, tagline, handles, nav. Start here.
  src/config/content.ts  Focus areas, certifications, projects
  src/components/        One component per section
  public/                Favicon, social preview image, 404 page
terraform/               S3, CloudFront, ACM, Route 53, IAM
scripts/                 State bucket bootstrap and the site publish script
.github/workflows/       CI checks and the deploy workflow
Makefile                 Short commands for everything above
```

## Run it locally

You need Node 20 or newer.

```bash
make install
make dev
```

The dev server prints a local address. Edits to any file under `app/src` reload instantly.

## Make it yours

Three files hold nearly everything you will ever change.

**`app/src/config/site.ts`** holds identity and links. Any handle left as an empty string hides whatever depends on it. Set `devtoUsername` and the Blog nav item and the "Latest from the blog" section appear. Set `linkedinUrl`, `contactEmail`, or `youtubeUrl` and they show up in Contact and the footer. Set `formspreeId` to turn on the contact form.

**`app/src/config/content.ts`** holds the focus areas, certifications, and projects. Only list work that exists and that someone could verify. Each project's `repo` value becomes a link to `github.com/Nisha318/<repo>`, so confirm the repository is public and the name matches before you deploy. A project without a `repo` shows no link.

**`app/tailwind.config.js`** holds the color palette as named tokens. Components use names like `vibranium` and `wakanda` and never raw hex values, so a palette change happens in one block.

To add a headshot, save it as `app/public/images/headshot.jpg`. The About section shows it when the file exists.

## How it is built

```
Visitor
  |
Route 53 (hosted zones for both domains)
  |
CloudFront ---- viewer request function: www and nishacloud.com redirect (301) to notesbynisha.com
  |             response headers policy: CSP, HSTS, frame and referrer rules
  |             ACM certificate covering every hostname
  |
S3 site bucket (private, versioned, encrypted, readable only by this distribution)

GitHub Actions --OIDC--> IAM deploy role --> S3 upload + CloudFront invalidation
```

Security choices worth knowing about:

- The bucket has no public access. CloudFront reads it through origin access control, and the bucket policy only trusts this one distribution.
- The Content Security Policy allows scripts and styles from the site itself and nothing else. The only outside hosts the page can contact are dev.to and Formspree. Fonts are self-hosted, so no visit calls Google.
- The site loads no third-party analytics or trackers.
- Both buckets require TLS, block public access, and encrypt at rest. Old versions of site files expire after 30 days and access logs after 90.
- CAA records limit certificate issuance for both domains to Amazon.
- Deploys use short-lived OIDC credentials. The deploy role can only upload to the site bucket and invalidate this one distribution, and only workflow runs on the `main` branch of this repository can assume it. Infrastructure changes stay manual on purpose.

## First deployment

Terraform 1.10 or newer, the AWS CLI with credentials for your account, and Node are required. Run `make fmt` once before your first pull request so the formatting check passes.

### 1. Create the state bucket

```bash
bash scripts/bootstrap-state.sh notesbynisha-tfstate-<your-account-id> us-east-1
```

### 2. Save any DNS records you still need

Moving DNS to Route 53 means every record at GoDaddy stops being used. Open DNS management for each domain and note anything that is not the website itself, especially MX records, SPF and DKIM TXT records, and verification records. Copy `terraform/terraform.tfvars.example` to `terraform/terraform.tfvars` and list those records under `extra_dns_records`.

### 3. Create the hosted zones

```bash
make zones STATE_BUCKET=notesbynisha-tfstate-<your-account-id>
make outputs
```

The `name_servers` output lists four nameservers for each domain.

### 4. Point GoDaddy at Route 53

The domains stay registered at GoDaddy. Only the nameservers change. For each domain, open its DNS settings at GoDaddy, find the nameserver option, choose custom nameservers, and paste that domain's four values. The wording of the menus changes from time to time, so look for the nameserver setting rather than a fixed path. Write down GoDaddy's current nameservers first. Putting them back is the rollback.

Route 53 is needed because GoDaddy cannot point a bare domain like `notesbynisha.com` at CloudFront, and Route 53 can.

From the moment the change spreads, visitors stop reaching whatever hosts these domains today. Continue straight to step 5 to keep that gap short. Propagation usually takes minutes to a few hours.

### 5. Apply everything else

```bash
make apply STATE_BUCKET=notesbynisha-tfstate-<your-account-id>
```

ACM validates the certificate once the new nameservers are live, and CloudFront then takes several minutes to deploy. The apply waits for both.

### 6. Connect GitHub Actions

In the repository settings, open Secrets and variables, then Actions, then Variables. Add these four, using the values from `make outputs`:

| Variable | Value |
|---|---|
| `AWS_ROLE_ARN` | `deploy_role_arn` |
| `SITE_BUCKET` | `site_bucket_name` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `cloudfront_distribution_id` |
| `AWS_REGION` | `us-east-1` |

If the repository name is not `Nisha318/notesbynisha-site`, set `github_repo` in `terraform.tfvars` and apply again before the first deploy.

### 7. Publish

Push to `main`, or run the Deploy site workflow by hand. For the very first upload you can also run `make deploy`.

### 8. Check the result

```bash
curl -sI https://notesbynisha.com | head -1                   # 200
curl -sI "https://nishacloud.com/about?x=1" | grep -i -E '^(HTTP|location)'   # 301 to notesbynisha.com/about?x=1
curl -sI https://www.notesbynisha.com | grep -i -E '^(HTTP|location)'         # 301
curl -sI https://notesbynisha.com | grep -i -E 'strict-transport|content-security|x-frame'
```

## Before you retire the old sites

Moving the domains replaces whatever they serve now. Export your existing blog posts from notesbynisha.com and anything you want to keep from nishacloud.com first. Republishing old posts on dev.to is a good way to carry them forward. Old post URLs on notesbynisha.com will show the 404 page afterward.

## Old blog links during the transition

Until the old posts are republished, set `legacy_blog_origin` in `terraform.tfvars` to the site that still hosts them. Requests for `/posts/<slug>/` and `/assets/images/...` on notesbynisha.com are then forwarded there with a temporary (302) redirect. Clear the setting once the posts have a permanent home. Terraform refuses to combine it with `redirect_domains`, because a retired domain that redirects here cannot also receive the old blog traffic.

## Day to day

| Task | Command |
|---|---|
| Edit content or design | Change files in `app/src`, push to `main`, and the Deploy workflow publishes |
| Preview locally | `make dev` |
| Change infrastructure | Edit `terraform/`, then `make plan` and `make apply` |
| Publish by hand | `make deploy` |

Dependabot opens weekly pull requests for GitHub Actions, npm packages, and Terraform providers. CI lints and builds the site, audits production dependencies, and checks Terraform formatting and validity on every pull request.

## Cost

At portfolio traffic this should come to a few dollars a month or less. Route 53 charges for each hosted zone, and CloudFront, S3, and ACM usage at this scale is minimal. Check the AWS pricing pages for current rates.
