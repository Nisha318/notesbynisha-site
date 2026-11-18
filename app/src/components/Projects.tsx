import React from "react";
import { Github, ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { projects } from "../config/content";
import { githubUrl } from "../config/site";

const Projects: React.FC = () => (
  <Section id="projects" eyebrow="Work" title="Projects" className="bg-void-surface/40">
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p) => (
        <article
          key={p.title}
          className="flex flex-col rounded-xl border border-vibranium/20 bg-void-surface p-6 transition-colors duration-200 hover:border-vibranium/60"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-semibold text-ink">{p.title}</h3>
            {p.status && (
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  p.status === "Complete"
                    ? "bg-wakanda/15 text-wakanda"
                    : "bg-vibranium/20 text-vibranium-glow"
                }`}
              >
                {p.status}
              </span>
            )}
          </div>

          <p className="text-silver leading-relaxed mb-5">{p.description}</p>

          <ul className="mt-auto flex flex-wrap gap-2 mb-5" aria-label="Technologies">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-md bg-void-hover px-2.5 py-1 text-xs font-medium text-silver"
              >
                {t}
              </li>
            ))}
          </ul>

          {p.repo && (
            <a
              href={`${githubUrl}/${p.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-vibranium-glow hover:text-wakanda transition-colors duration-200"
            >
              <Github size={16} aria-hidden="true" />
              View on GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </article>
      ))}
    </div>

    <p className="mt-10 text-silver">
      More labs and write-ups live on{" "}
      <a
        href={`${githubUrl}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-vibranium-glow hover:text-wakanda transition-colors duration-200"
      >
        my GitHub profile
      </a>
      .
    </p>
  </Section>
);

export default Projects;
