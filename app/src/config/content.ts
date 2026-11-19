// Page content that changes over time: focus areas, credentials, projects.
// Keep this file accurate. Only list work that exists and can be verified.

export type FocusArea = {
  icon: "iac" | "detect" | "grc" | "containers" | "identity" | "network";
  title: string;
  description: string;
};

export const focusAreas: FocusArea[] = [
  {
    icon: "iac",
    title: "Infrastructure as Code",
    description:
      "Terraform and OpenTofu modules, remote state, per-environment configuration, and drift detection with scheduled plans.",
  },
  {
    icon: "detect",
    title: "Cloud-native security services",
    description:
      "GuardDuty, AWS Config, Inspector, Macie, and CloudTrail, wired into detection, audit, and alerting.",
  },
  {
    icon: "grc",
    title: "Compliance automation",
    description:
      "NIST 800-53 and RMF controls mapped to findings and infrastructure, with MITRE ATT&CK context for each finding.",
  },
  {
    icon: "containers",
    title: "Containers and Kubernetes",
    description:
      "ECS Fargate and EKS workloads, image scanning, and runtime detection with Falco.",
  },
  {
    icon: "identity",
        title: "Identity and access",
    description:
      "Least-privilege IAM roles and policies written in Terraform, and OIDC federation that gives GitHub Actions short-lived AWS credentials with no stored keys.",
  },
  {
    icon: "network",
    title: "Network security",
    description:
      "VPC design, security groups, network ACLs, and flow logs built as segmentation you can verify.",
  },
];

export type Credential = {
  name: string;
  issuer: string;
  status: "earned" | "in-progress";
};

export const credentials: Credential[] = [
  { name: "CISSP", issuer: "ISC2", status: "earned" },
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "AWS",
    status: "earned",
  },
  {
    name: "GIAC Defensible Security Architecture (GDSA)",
    issuer: "GIAC",
    status: "earned",
  },
  {
    name: "Azure Administrator Associate",
    issuer: "Microsoft",
    status: "earned",
  },
  {
    name: "Azure Network Engineer Associate",
    issuer: "Microsoft",
    status: "earned",
  },
  { name: "CCNA", issuer: "Cisco", status: "earned" },
  { name: "SecurityX", issuer: "CompTIA", status: "earned" },
  { name: "CySA+", issuer: "CompTIA", status: "earned" },
  { name: "Security+", issuer: "CompTIA", status: "earned" },
  {
    name: "AWS Certified DevOps Engineer - Professional",
    issuer: "AWS",
    status: "in-progress",
  },
  {
    name: "AWS Certified Security - Specialty",
    issuer: "AWS",
    status: "earned",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    status: "in-progress",
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  // Repository name under your GitHub account. Leave out to show no link.
  repo?: string;
  status?: "Complete" | "In progress";
};

export const projects: Project[] = [
  {
    title: "Secure GRC Pipeline",
    description:
      "Maps Terraform findings to NIST controls and MITRE ATT&CK techniques so compliance evidence comes from the infrastructure code itself.",
    tags: ["Terraform", "NIST 800-53", "MITRE ATT&CK"],
    repo: "secure-grc-pipeline",
  },
  {
    title: "Secure Incident Response",
    description:
      "Automated AWS incident response pipeline aligned to NIST 800-61, from detection through containment.",
    tags: ["AWS", "Incident Response", "NIST 800-61"],
    repo: "secure-incident-response",
  },
  {
    title: "Secure Lighthouse Keeper",
    description:
      "Secrets management and encryption lab built around a fictional company, using Secrets Manager, KMS, RDS, and Lambda.",
    tags: ["Terraform", "Secrets Manager", "KMS", "RDS", "Lambda"],
    repo: "secure-lighthouse-keeper",
  },
  {
    title: "Private AI Workload on EKS",
    description:
      "A private document question-and-answer application on EKS with Amazon Bedrock, deployed in a personal AWS account.",
    tags: ["EKS", "Bedrock", "RAG"],
    repo: "secure-private-ai-eks",
  },
  {
    title: "Terraform Flask Lab",
    description:
      "Flask on EC2 provisioned with OpenTofu, authenticated from GitHub Actions with OIDC, using S3 remote state and NIST 800-53 control mapping.",
    tags: ["OpenTofu", "EC2", "GitHub OIDC", "S3 backend"],
    repo: "terraform-flask-lab",
    status: "Complete",
  },
  {
    title: "Runtime Detection with Falco",
    description:
      "Falco runtime threat detection on a small EC2 host, with DVWA as the target workload to generate real alerts.",
    tags: ["Falco", "EC2", "Container security"],
  },
  {
    title: "Inspector Container Scanning",
    description:
      "Terraform lab that scans container images with Amazon Inspector and exports findings to S3.",
    tags: ["Terraform", "Amazon Inspector", "S3"],
  },
  {
    title: "Operation Aegis",
    description:
      "DevSecOps capstone on a FastAPI demo banking app, with security gates for code and dependency scanning built and the remaining phases underway.",
    tags: ["GitHub Actions", "Semgrep", "Trivy", "CodeQL"],
    repo: "operation-aegis",
    status: "In progress",
  },
];
