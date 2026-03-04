"use client";

import { useState } from "react";
import Image from "next/image";
import SectionReveal from "./SectionReveal";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  icon: string;
  color: string;
  category: string;
}

const SKILLS: SkillItem[] = [
  { name: "JavaScript", icon: "javascript", color: "#F7DF1E", category: "Frontend" },
  { name: "TypeScript", icon: "typescript", color: "#3178C6", category: "Frontend" },
  { name: "React", icon: "react", color: "#61DAFB", category: "Frontend" },
  { name: "Next.js", icon: "nextdotjs", color: "#ffffff", category: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4", category: "Frontend" },
  { name: "HTML5", icon: "html5", color: "#E34F26", category: "Frontend" },
  { name: "CSS3", icon: "css3", color: "#1572B6", category: "Frontend" },
  { name: "Material UI", icon: "mui", color: "#007FFF", category: "Frontend" },
  { name: "Node.js", icon: "nodedotjs", color: "#339933", category: "Backend" },
  { name: "Express", icon: "express", color: "#ffffff", category: "Backend" },
  { name: "MongoDB", icon: "mongodb", color: "#47A248", category: "Backend" },
  { name: "PostgreSQL", icon: "postgresql", color: "#4169E1", category: "Backend" },
  { name: "Django", icon: "django", color: "#092E20", category: "Backend" },
  { name: "Prisma", icon: "prisma", color: "#2D3748", category: "Backend" },
  { name: "Socket.io", icon: "socketdotio", color: "#ffffff", category: "Backend" },
  { name: "Git", icon: "git", color: "#F05032", category: "DevOps" },
  { name: "Linux", icon: "linux", color: "#FCC624", category: "DevOps" },
  { name: "PM2", icon: "pm2", color: "#2B037A", category: "DevOps" },
  { name: "Apache", icon: "apache", color: "#D22128", category: "DevOps" },
  { name: "Gunicorn", icon: "gunicorn", color: "#499848", category: "DevOps" },
  { name: "C", icon: "c", color: "#A8B9CC", category: "Languages" },
  { name: "C++", icon: "cplusplus", color: "#00599C", category: "Languages" },
  { name: "Java", icon: "openjdk", color: "#ED8B00", category: "Languages" },
  { name: "Python", icon: "python", color: "#3776AB", category: "Languages" },
];

// Split into rows for marquee
const ROW_1 = SKILLS.slice(0, 8);
const ROW_2 = SKILLS.slice(8, 16);
const ROW_3 = SKILLS.slice(16, 24);

function MarqueeChip({
  skill,
  onHover,
  isActive,
}: {
  skill: SkillItem;
  onHover: (skill: SkillItem | null) => void;
  isActive: boolean;
}) {
  return (
    <div
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "group relative mx-2 flex flex-shrink-0 items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 sm:mx-3 sm:px-5 sm:py-3.5",
        isActive
          ? "border-charcoal-600 bg-charcoal-800/80 shadow-lg shadow-black/20 scale-105"
          : "border-charcoal-800/60 bg-charcoal-900/40 hover:border-charcoal-700 hover:bg-charcoal-800/50"
      )}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.color}10, transparent 70%)`,
        }}
      />
      <Image
        src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color.replace("#", "")}`}
        alt={skill.name}
        width={24}
        height={24}
        className="relative z-10 h-6 w-6"
        unoptimized
      />
      <span className="relative z-10 whitespace-nowrap text-sm font-medium text-charcoal-300 transition-colors group-hover:text-cream-50">
        {skill.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  skills,
  direction = "left",
  speed = 30,
  hoveredSkill,
  onHover,
}: {
  skills: SkillItem[];
  direction?: "left" | "right";
  speed?: number;
  hoveredSkill: SkillItem | null;
  onHover: (skill: SkillItem | null) => void;
}) {
  const doubled = [...skills, ...skills];

  return (
    <div className="group/marquee relative overflow-hidden py-2">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-charcoal-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-charcoal-950 to-transparent sm:w-24" />

      <div
        className={cn(
          "flex w-max",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          "group-hover/marquee:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {doubled.map((skill, i) => (
          <MarqueeChip
            key={`${skill.name}-${i}`}
            skill={skill}
            onHover={onHover}
            isActive={hoveredSkill?.name === skill.name}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  return (
    <section id="skills" className="relative overflow-hidden">
      <div className="section-container">
        <SectionReveal>
          <div className="accent-line mb-6" />
          <h2 className="section-heading">
            Skills<span className="text-burnt-500">.</span>
          </h2>
          <p className="section-subheading">
            Technologies and tools I use to bring ideas to life.
          </p>
        </SectionReveal>

        {/* Marquee rows */}
        <div className="mt-14 space-y-3">
          <MarqueeRow
            skills={ROW_1}
            direction="left"
            speed={35}
            hoveredSkill={hoveredSkill}
            onHover={setHoveredSkill}
          />
          <MarqueeRow
            skills={ROW_2}
            direction="right"
            speed={40}
            hoveredSkill={hoveredSkill}
            onHover={setHoveredSkill}
          />
          <MarqueeRow
            skills={ROW_3}
            direction="left"
            speed={32}
            hoveredSkill={hoveredSkill}
            onHover={setHoveredSkill}
          />
        </div>
      </div>
    </section>
  );
}
