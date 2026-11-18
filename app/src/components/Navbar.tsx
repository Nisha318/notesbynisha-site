import React, { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import { site, navLinks } from "../config/site";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass =
    "text-silver hover:text-vibranium-glow transition-colors duration-200";

  return (
    <header
      className={`fixed w-full z-50 border-b border-vibranium/20 transition-all duration-300 ${
        scrolled ? "bg-void/90 backdrop-blur-sm shadow-md" : "bg-void"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <nav className="flex items-center justify-between" aria-label="Primary">
          <a href="#home" className="text-xl font-bold text-wakanda">
            {site.name}
          </a>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={linkClass}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {site.siteRepoUrl && (
              <a
                href={site.siteRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-void-surface hover:bg-void-hover text-silver hover:text-vibranium-glow transition-colors duration-200"
                aria-label="View this site's source on GitHub"
              >
                <Github size={20} aria-hidden="true" />
              </a>
            )}

            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-vibranium hover:bg-vibranium-deep text-white transition-colors duration-200"
            >
              Let's Talk
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="md:hidden p-2 rounded-full bg-void-surface hover:bg-void-hover transition-colors duration-200"
          >
            {isOpen ? (
              <X size={20} className="text-silver" />
            ) : (
              <Menu size={20} className="text-silver" />
            )}
          </button>
        </nav>
      </div>

      {isOpen && (
        <div className="md:hidden bg-void shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 ${linkClass}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-4 rounded-full bg-vibranium hover:bg-vibranium-deep text-white text-center transition-colors duration-200"
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
