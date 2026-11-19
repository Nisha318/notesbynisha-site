import React, { useState } from "react";
import Section from "./Section";

const About: React.FC = () => {
  // Drop a photo at app/public/images/headshot.jpg and it appears here.
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <Section id="about" eyebrow="About" title="Security that ships with the infrastructure">
      <div
        className={`grid gap-12 items-start ${
          hasPhoto ? "md:grid-cols-[1fr_280px]" : ""
        }`}
      >
        <div className="space-y-5 text-silver leading-relaxed text-lg max-w-3xl">
          <p>
            I build and secure cloud infrastructure across AWS and Azure. My
            work sits where infrastructure as code, security services, and
            compliance meet. I write Terraform that provisions whole
            environments, wire up cloud-native detection and audit tooling,
            and map the result to NIST 800-53, the CIS Benchmarks, and MITRE
            ATT&amp;CK so the evidence is ready when an assessor asks for it.
          </p>
          <p>
            Before cloud engineering I spent years in enterprise networking.
            From there I moved into governance, risk, and compliance as a
            senior cybersecurity engineer working with the Risk Management
            Framework.
            That mix is why I design for the auditor and the attacker at the
            same time.
          </p>
          <p>
            I taught myself to code as a teenager and I still learn best by
            building. Most of what you see here started as a lab in my own AWS
            account, and I write up what I learn on my blog.
          </p>
        </div>

        {hasPhoto && (
          <img
            src="/images/headshot.jpg"
            alt="Portrait of Nisha McDonnell"
            width={280}
            height={280}
            onError={() => setHasPhoto(false)}
            className="rounded-2xl border border-vibranium/30 object-cover w-full max-w-[280px] aspect-square"
          />
        )}
      </div>
    </Section>
  );
};

export default About;
