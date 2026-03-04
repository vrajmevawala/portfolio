"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { SITE_CONFIG } from "@/lib/constants";

interface TerminalLine {
  type: "command" | "output" | "blank";
  text: string;
  delay: number;
  color?: string;
}

const TERMINAL_CONTENT: TerminalLine[] = [
  { type: "command", text: "whoami", delay: 0 },
  { type: "output", text: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`, delay: 0.4, color: "text-burnt-400" },
  { type: "blank", text: "", delay: 0.8 },
  { type: "command", text: "cat about.txt", delay: 1.0 },
  { type: "output", text: "B.Tech CSE student at Charusat University, Gujarat.", delay: 1.4 },
  { type: "output", text: "CGPA: 9.5 | Building scalable systems since 2022.", delay: 1.7 },
  { type: "output", text: "Currently interning at AccessGlobal Technologies.", delay: 2.0 },
  { type: "blank", text: "", delay: 2.3 },
  { type: "command", text: "ls skills/", delay: 2.5 },
  { type: "output", text: "React  Next.js  Node.js  Express  Django  PostgreSQL", delay: 2.9, color: "text-[#28c840]" },
  { type: "output", text: "MongoDB  Prisma  Socket.io  TypeScript  Tailwind  Git", delay: 3.2, color: "text-[#28c840]" },
  { type: "blank", text: "", delay: 3.5 },
  { type: "command", text: "cat currently.json", delay: 3.7 },
  { type: "output", text: '{', delay: 4.0, color: "text-charcoal-300" },
  { type: "output", text: '  "working_on": "Full-stack SaaS platforms",', delay: 4.2, color: "text-charcoal-300" },
  { type: "output", text: '  "learning": "System Design & AI/ML",', delay: 4.4, color: "text-charcoal-300" },
  { type: "output", text: '  "open_to": "Opportunities & Collaborations"', delay: 4.6, color: "text-charcoal-300" },
  { type: "output", text: '}', delay: 4.8, color: "text-charcoal-300" },
  { type: "blank", text: "", delay: 5.1 },
  { type: "command", text: "deploy --production 🚀", delay: 5.3 },
  { type: "output", text: "✓ Build successful. Deployed to production.", delay: 5.7, color: "text-[#28c840]" },
  { type: "output", text: `✓ Portfolio live at ${SITE_CONFIG.github}`, delay: 6.0, color: "text-[#28c840]" },
];

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (indexRef.current >= text.length) {
      onComplete?.();
      return;
    }

    const speed = text.length > 40 ? 15 : 30;
    const timer = setTimeout(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        onComplete?.();
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, text, onComplete]);

  return <>{displayed}</>;
}

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;

    const timers: NodeJS.Timeout[] = [];
    TERMINAL_CONTENT.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay * 500);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="terminal" className="relative overflow-hidden">
      <div className="section-container">
        <SectionReveal>
          <div className="accent-line mb-6" />
          <h2 className="section-heading">
            $ whoami<span className="text-burnt-500">_</span>
          </h2>
          <p className="section-subheading">
            A quick peek into who I am, straight from the terminal.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div ref={containerRef} className="mt-12 mx-auto max-w-3xl">
            {/* Terminal chrome */}
            <div className="rounded-t-xl border border-b-0 border-charcoal-800 bg-[#1c1c1c] px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs font-medium text-charcoal-500">
                  vraj@portfolio ~ zsh
                </span>
                <div className="w-12" />
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalBodyRef}
              className="max-h-[420px] overflow-y-auto rounded-b-xl border border-charcoal-800 bg-[#0a0a0a] p-4 sm:p-6 font-mono text-sm sm:text-base"
            >
              <div className="space-y-1">
                {TERMINAL_CONTENT.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {line.type === "blank" ? (
                      <div className="h-4" />
                    ) : line.type === "command" ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[#28c840] select-none">❯</span>
                        <span className="text-cream-100">
                          <TypewriterText text={line.text} />
                        </span>
                      </div>
                    ) : (
                      <div className={`pl-5 ${line.color || "text-charcoal-400"}`}>
                        {line.text}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Blinking cursor at bottom */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[#28c840] select-none">❯</span>
                  <span
                    className={`inline-block h-5 w-[2px] bg-[#28c840] transition-opacity duration-100 ${
                      cursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
