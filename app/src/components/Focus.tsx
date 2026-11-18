import React from "react";
import {
  Code2,
  ShieldCheck,
  FileCheck2,
  Boxes,
  KeyRound,
  Network,
  type LucideIcon,
} from "lucide-react";
import Section from "./Section";
import { focusAreas, type FocusArea } from "../config/content";

const icons: Record<FocusArea["icon"], LucideIcon> = {
  iac: Code2,
  detect: ShieldCheck,
  grc: FileCheck2,
  containers: Boxes,
  identity: KeyRound,
  network: Network,
};

const Focus: React.FC = () => (
  <Section id="focus" eyebrow="Focus" title="Where I do my best work" className="bg-void-surface/40">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {focusAreas.map((area) => {
        const Icon = icons[area.icon];
        return (
          <div
            key={area.title}
            className="rounded-xl border border-vibranium/20 bg-void-surface p-6 transition-colors duration-200 hover:border-vibranium/60"
          >
            <Icon size={28} className="text-vibranium-glow mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-ink mb-2">{area.title}</h3>
            <p className="text-silver leading-relaxed">{area.description}</p>
          </div>
        );
      })}
    </div>
  </Section>
);

export default Focus;
