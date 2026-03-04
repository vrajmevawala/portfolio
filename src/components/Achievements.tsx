"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Code, Terminal, Trophy, Rocket, ExternalLink } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/constants";
import SectionReveal from "./SectionReveal";

const iconMap: Record<string, React.ElementType> = {
  award: Award,
  code: Code,
  terminal: Terminal,
  trophy: Trophy,
  rocket: Rocket,
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative overflow-hidden">
      <div className="section-container">
        <SectionReveal>
          <div className="accent-line mb-6" />
          <h2 className="section-heading">
            Achievements<span className="text-burnt-500">.</span>
          </h2>
          <p className="section-subheading">
            Milestones that reflect my growth and competitive drive.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((achievement, index) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({
  achievement,
  index,
}: {
  achievement: (typeof ACHIEVEMENTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[achievement.icon] || Award;
  const hasLink = "link" in achievement && achievement.link;

  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? {
        href: achievement.link as string,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <Wrapper
        {...wrapperProps}
        className={`glass-card group block h-full transition-all duration-300 hover:border-burnt-500/30 ${
          hasLink ? "cursor-pointer hover:scale-[1.02]" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="inline-flex rounded-xl bg-burnt-500/10 p-3">
            <Icon className="h-6 w-6 text-burnt-500" />
          </div>
          {hasLink && (
            <ExternalLink className="h-4 w-4 text-charcoal-500 transition-colors group-hover:text-burnt-400" />
          )}
        </div>

        <h3 className="mt-4 font-heading text-lg font-semibold text-cream-100">
          {achievement.title}
        </h3>
        <p className="mt-2 text-sm text-charcoal-400">
          {achievement.description}
        </p>

        {hasLink && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-burnt-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View Profile <ExternalLink className="h-3 w-3" />
          </span>
        )}
      </Wrapper>
    </motion.div>
  );
}
