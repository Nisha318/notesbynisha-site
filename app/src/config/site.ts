// Single source of truth for identity, copy, and links.
// Components read from here so a change happens in one place.
//
// Anything left as an empty string hides the UI that depends on it,
// so the site is safe to deploy before every handle is filled in.

export const site = {
  name: "Nisha McDonnell",
  brand: "Notes by Nisha",
  domain: "notesbynisha.com",

  // Short line shown in the hero and reused in social bios.
  tagline: "Infrastructure you can defend, delivered as code.",

  // Longer line for LinkedIn, the GitHub bio, and page metadata.
  headline:
    "Cloud Security Engineer | Automating AWS security, compliance, and DevSecOps | CISSP",

  // Cycles in the hero typing effect.
  roles: [
    "Cloud Security Engineer",
    "AWS Security Automation",
    "Infrastructure as Code",
    "Compliance Automation",
    "CISSP",
  ],

  // Profile links. Leave a value empty to hide it everywhere.
  githubUsername: "Nisha318",
  devtoUsername: "", // example: "nisha318", turns on the Blog nav item and the Writing section
  linkedinUrl: "", // example: "https://www.linkedin.com/in/your-handle"
  youtubeUrl: "", // example: "https://www.youtube.com/@your-handle"
  siteRepoUrl: "", // example: "https://github.com/Nisha318/notesbynisha-site"

  // Contact. A public address invites spam, so many people prefer the form only.
  contactEmail: "",
  formspreeId: "", // the id from your Formspree form URL, enables the contact form
} as const;

export const githubUrl = `https://github.com/${site.githubUsername}`;
export const devtoUrl = site.devtoUsername
  ? `https://dev.to/${site.devtoUsername}`
  : "";

export type NavLink = {
  name: string;
  href: string;
  external?: boolean;
};

export const navLinks: NavLink[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Focus", href: "#focus" },
  { name: "Projects", href: "#projects" },
  ...(devtoUrl
    ? [{ name: "Blog", href: devtoUrl, external: true } as NavLink]
    : []),
  { name: "Contact", href: "#contact" },
];
