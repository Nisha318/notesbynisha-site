import React from "react";
import { Award, Hourglass } from "lucide-react";
import Section from "./Section";
import { credentials } from "../config/content";

const Certifications: React.FC = () => {
  const earned = credentials.filter((c) => c.status === "earned");
  const inProgress = credentials.filter((c) => c.status === "in-progress");

  return (
    <Section id="certifications" eyebrow="Credentials" title="Certifications">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {earned.map((c) => (
          <li
            key={c.name}
            className="flex items-start gap-3 rounded-xl border border-vibranium/20 bg-void-surface p-4"
          >
            <Award size={22} className="text-wakanda mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink leading-snug">{c.name}</p>
              <p className="text-sm text-silver-muted">{c.issuer}</p>
            </div>
          </li>
        ))}
      </ul>

      {inProgress.length > 0 && (
        <>
          <h3 className="mt-12 mb-4 text-sm font-semibold uppercase tracking-widest text-silver-muted">
            In progress
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((c) => (
              <li
                key={c.name}
                className="flex items-start gap-3 rounded-xl border border-dashed border-silver/30 p-4"
              >
                <Hourglass size={22} className="text-vibranium-glow mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink leading-snug">{c.name}</p>
                  <p className="text-sm text-silver-muted">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
};

export default Certifications;
