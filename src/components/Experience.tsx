"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
import SectionReveal from "./SectionReveal";

interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  tech: string[];
}

const EXPERIENCES: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "AccessGlobal Technology",
    companyUrl: "https://agtglobal.in",
    location: "Gujarat, India",
    period: "May '25 — June '25",
    type: "Internship",
    description: [
      "Deployed and maintained production React & Django applications on Linux servers using PM2, Gunicorn, and Apache2.",
      "Configured ISPConfig panels, managed server environments, SSL certificates, and handled real-world deployment pipelines.",
      "Built responsive front-end interfaces and integrated RESTful APIs for internal client-facing tools.",
      "Collaborated with cross-functional teams on sprint-based delivery cycles, ensuring timely feature releases.",
    ],
    tech: ["React", "Django", "PM2", "Gunicorn", "Apache2", "Linux", "ISPConfig"],
  },
];

function TimelineDot({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="h-3 w-3 rounded-full border-2 border-burnt-500 bg-charcoal-950" />
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute h-3 w-3 rounded-full bg-burnt-500"
        />
      )}
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: Experience;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-8">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center pt-1">
        <TimelineDot isActive={index === 0} />
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-burnt-500/30 to-charcoal-800/20" />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="group mb-12 flex-1 rounded-2xl border border-charcoal-800 bg-charcoal-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-charcoal-700 hover:bg-charcoal-900/60 sm:p-8"
      >
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold text-cream-50 sm:text-2xl">
              {exp.role}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-burnt-400 transition-colors hover:text-burnt-300"
                >
                  <Briefcase className="h-3.5 w-3.5" />
                  {exp.company}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 font-semibold text-burnt-400">
                  <Briefcase className="h-3.5 w-3.5" />
                  {exp.company}
                </span>
              )}
              <span className="text-charcoal-600">·</span>
              <span className="inline-flex items-center gap-1 text-charcoal-400">
                <MapPin className="h-3.5 w-3.5" />
                {exp.location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-burnt-500/20 bg-burnt-500/10 px-3 py-1 text-xs font-medium text-burnt-400">
              {exp.type}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-charcoal-400">
              <Calendar className="h-3.5 w-3.5" />
              {exp.period}
            </span>
          </div>
        </div>

        {/* Description bullets */}
        <ul className="mt-6 space-y-3">
          {exp.description.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: index * 0.15 + 0.3 + i * 0.08,
                duration: 0.4,
              }}
              className="flex gap-3 text-[15px] leading-relaxed text-charcoal-300"
            >
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-burnt-500/60" />
              {point}
            </motion.li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-charcoal-700/60 bg-charcoal-800/40 px-3 py-1 text-xs font-medium text-charcoal-300 transition-colors hover:border-charcoal-600 hover:text-cream-100"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden">
      <div className="section-container">
        <SectionReveal>
          <div className="accent-line mb-6" />
          <h2 className="section-heading">
            Experience<span className="text-burnt-500">.</span>
          </h2>
          <p className="section-subheading">
            Where I&apos;ve worked and what I&apos;ve shipped.
          </p>
        </SectionReveal>

        {/* Timeline */}
        <div className="mt-14 ml-1 sm:ml-4">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard
              key={exp.company + exp.role}
              exp={exp}
              index={i}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
