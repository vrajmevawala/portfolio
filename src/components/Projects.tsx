"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import SectionReveal from "./SectionReveal";

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="section-container">
        <SectionReveal>
          <div className="accent-line mb-6" />
          <h2 className="section-heading">
            Projects<span className="text-burnt-500">.</span>
          </h2>
          <p className="section-subheading">
            Selected work that showcases my engineering approach.
          </p>
        </SectionReveal>

        <div className="mt-16 space-y-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="glass-card group relative overflow-hidden hover:border-burnt-500/30"
    >
      {/* Project number */}
      <span className="absolute -right-4 -top-6 font-heading text-[120px] font-bold leading-none text-charcoal-800/20 transition-colors group-hover:text-burnt-500/10">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h3 className="font-heading text-2xl font-bold text-cream-50 transition-colors group-hover:text-burnt-500 sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-charcoal-300">
              {project.description}
            </p>

            {/* Impact */}
            <div className="mt-4 flex items-start gap-2">
              <span className="mt-1 text-burnt-500">▸</span>
              <span className="text-sm text-charcoal-400">
                {project.impact}
              </span>
            </div>

            {/* Tech stack */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-charcoal-700/50 bg-charcoal-800/40 px-3 py-1 text-xs font-medium text-charcoal-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 lg:flex-col">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal-700 px-5 py-2.5 text-sm text-charcoal-300 transition-all duration-300 hover:border-burnt-500/50 hover:text-burnt-400"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="h-4 w-4" />
                <span>Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-burnt-500 px-5 py-2.5 text-sm font-medium text-charcoal-950 transition-all duration-300 hover:bg-burnt-400"
                aria-label={`View ${project.title} live`}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
