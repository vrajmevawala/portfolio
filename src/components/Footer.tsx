"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-charcoal-800/50">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Left: branding */}
          <div>
            <span className="font-heading text-xl font-bold text-cream-50">
              {SITE_CONFIG.name.split(" ")[0]}
              <span className="text-burnt-500">.</span>
            </span>
            <p className="mt-2 text-sm text-charcoal-500">
              Building scalable digital systems that perform.
            </p>
          </div>

          {/* Center: social */}
          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-500 transition-colors hover:text-burnt-500"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-500 transition-colors hover:text-burnt-500"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-charcoal-500 transition-colors hover:text-burnt-500"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Right: back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-charcoal-500 transition-colors hover:text-burnt-500"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="mt-8 border-t border-charcoal-800/30 pt-8 text-center">
          <p className="text-xs text-charcoal-600">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Crafted with
            precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
