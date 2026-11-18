import React from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<Props> = ({
  id,
  eyebrow,
  title,
  children,
  className = "",
}) => (
  <section id={id} className={`py-20 md:py-24 scroll-mt-16 ${className}`}>
    <div className="container mx-auto px-4 md:px-6">
      <p className="text-wakanda text-sm font-semibold uppercase tracking-widest mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-ink mb-10">{title}</h2>
      {children}
    </div>
  </section>
);

export default Section;
