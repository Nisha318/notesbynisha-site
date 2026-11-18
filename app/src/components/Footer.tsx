import React from "react";
import { Github, Linkedin, Youtube, BookOpen } from "lucide-react";
import { site, githubUrl, devtoUrl } from "../config/site";

const Footer: React.FC = () => {
  const links = [
    { label: "GitHub", href: githubUrl, Icon: Github },
    site.linkedinUrl && { label: "LinkedIn", href: site.linkedinUrl, Icon: Linkedin },
    devtoUrl && { label: "dev.to", href: devtoUrl, Icon: BookOpen },
    site.youtubeUrl && { label: "YouTube", href: site.youtubeUrl, Icon: Youtube },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof Github }[];

  return (
    <footer className="border-t border-vibranium/20 bg-void py-10">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-semibold text-ink">{site.name}</p>
          <p className="text-sm text-silver-muted">
            &copy; {new Date().getFullYear()} {site.brand}. Built with React and
            Tailwind, hosted on AWS with S3 and CloudFront, provisioned with
            Terraform.
          </p>
        </div>

        <ul className="flex items-center gap-4">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block rounded-full bg-void-surface p-2.5 text-silver transition-colors duration-200 hover:bg-void-hover hover:text-vibranium-glow"
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
