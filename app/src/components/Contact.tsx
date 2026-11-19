import React, { useState } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import Section from "./Section";
import { site, githubUrl } from "../config/site";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-lg border border-vibranium/30 bg-void-surface px-4 py-3 text-ink placeholder:text-silver-muted focus:border-vibranium-glow focus:outline-none focus:ring-2 focus:ring-vibranium/40";

const Contact: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const channels = [
    site.contactEmail && {
      label: "Email",
      href: `mailto:${site.contactEmail}`,
      Icon: Mail,
    },
    site.linkedinUrl && {
      label: "LinkedIn",
      href: site.linkedinUrl,
      Icon: Linkedin,
    },
    { label: "GitHub", href: githubUrl, Icon: Github },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof Mail }[];

  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk">
      <div
        className={`grid gap-12 ${site.formspreeId ? "md:grid-cols-2" : ""}`}
      >
        <div>
          <p className="text-silver text-lg leading-relaxed mb-8 max-w-xl">
            I am interested in cloud security engineering roles, advisory
            work, and conversations about building defensible cloud
            infrastructure. Reach out through any of these.
          </p>
          <ul className="space-y-4">
            {channels.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ink hover:text-vibranium-glow transition-colors duration-200"
                >
                  <Icon size={20} className="text-wakanda" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {site.formspreeId && (
          <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-silver">
                Name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-silver">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-silver">
                Message
              </label>
              <textarea id="message" name="message" rows={5} required className={fieldClass} />
            </div>

            {/* Honeypot field. People never see it, bots tend to fill it in. */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-vibranium px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-vibranium-deep disabled:opacity-60"
            >
              {status === "sending" ? "Sending" : "Send message"}
            </button>

            <p role="status" className="min-h-[1.5rem] text-sm">
              {status === "sent" && (
                <span className="text-wakanda">Thank you, your message is on its way.</span>
              )}
              {status === "error" && (
                <span className="text-silver">
                  Something went wrong sending that. Please try again or use
                  one of the links.
                </span>
              )}
            </p>
          </form>
        )}
      </div>
    </Section>
  );
};

export default Contact;
