import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { site } from "../config/site";

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = site.roles;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const typingDelay = 150;
    const erasingDelay = 100;
    const wordDelay = 2000;
    let pause: ReturnType<typeof setTimeout> | undefined;

    const type = () => {
      const currentRole = roles[currentIndex];
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length - 1) {
          pause = setTimeout(() => setIsDeleting(true), wordDelay);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 1) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timeout = setTimeout(type, isDeleting ? erasingDelay : typingDelay);

    return () => {
      clearTimeout(timeout);
      if (pause) clearTimeout(pause);
    };
  }, [displayText, currentIndex, isDeleting, roles]);

  return (
    <section
      id="home"
      className="hero-glow min-h-screen pt-24 pb-16 flex flex-col justify-center relative overflow-hidden bg-void"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-wakanda font-medium mb-4 animate-fadeIn">
            Hello, my name is
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6 animate-fadeUp">
            {site.name}
          </h1>

          <div className="min-h-[40px] md:min-h-[48px] mb-6" aria-label={site.roles.join(", ")}>
            <h2 className="text-xl md:text-2xl text-vibranium-glow" aria-hidden="true">
              {displayText}
              <span className="animate-blink">|</span>
            </h2>
          </div>

          <div
            className={`transition-opacity duration-1000 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="mt-6 text-silver text-lg leading-relaxed max-w-2xl mx-auto">
              {site.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-vibranium hover:bg-vibranium-deep text-white font-semibold transition-colors duration-200"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-wakanda/60 text-wakanda hover:bg-wakanda/10 font-semibold transition-colors duration-200"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <a href="#about" aria-label="Scroll to About" className="block p-2">
          <ArrowDown size={24} className="text-silver/60" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
