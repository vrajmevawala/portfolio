"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ParticleCanvas from "./ParticleCanvas";

interface TermLine {
  type: "command" | "output" | "blank";
  text: string;
  delay: number;
  color?: string;
}

const HERO_TERMINAL: TermLine[] = [
  { type: "command", text: "whoami", delay: 0 },
  {
    type: "output",
    text: SITE_CONFIG.name,
    delay: 0.5,
    color: "text-burnt-400",
  },
  { type: "blank", text: "", delay: 0.9 },
  { type: "command", text: "cat role.txt", delay: 1.1 },
  {
    type: "output",
    text: "Full Stack Developer — React · Node.js · Django · AI",
    delay: 1.5,
    color: "text-cream-100",
  },
//   { type: "blank", text: "", delay: 1.9 },
//   { type: "command", text: "cat mission.txt", delay: 2.1 },
//   {
//     type: "output",
//     text: "Building Scalable Digital Systems That Perform.",
//     delay: 2.5,
//     color: "text-burnt-500 font-semibold",
//   },
//   { type: "blank", text: "", delay: 2.9 },
//   { type: "command", text: "cat status.json", delay: 3.1 },
//   {
//     type: "output",
//     text: '{  "available": true,',
//     delay: 3.5,
//     color: "text-charcoal-300",
//   },
//   {
//     type: "output",
//     text: '   "location": "Gujarat, India",',
//     delay: 3.7,
//     color: "text-charcoal-300",
//   },
//   {
//     type: "output",
//     text: '   "open_to": "Opportunities & Collaborations"  }',
//     delay: 3.9,
//     color: "text-charcoal-300",
//   },
  { type: "blank", text: "", delay: 4.3 },
  { type: "command", text: "echo $MOTTO", delay: 4.5 },
  {
    type: "output",
    text: "Turning ideas into production-grade systems. 🚀",
    delay: 4.9,
    color: "text-[#28c840]",
  },
];

function TypewriterText({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (indexRef.current >= text.length) {
      onComplete?.();
      return;
    }

    const speed = text.length > 40 ? 12 : 25;
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

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    HERO_TERMINAL.forEach((line, i) => {
      const timer = setTimeout(
        () => setVisibleLines(i + 1),
        line.delay * 450
      );
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCursorBlink((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <ParticleCanvas />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-burnt-500/[0.04] blur-[150px]" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-burnt-600/[0.04] blur-[120px]" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl flex-1"
          >
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
            <div className="rounded-b-xl border border-charcoal-800 bg-[#0a0a0a] p-5 sm:p-6 font-mono text-sm sm:text-base min-h-[320px]">
              <div className="space-y-1">
                {HERO_TERMINAL.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {line.type === "blank" ? (
                      <div className="h-3" />
                    ) : line.type === "command" ? (
                      <div className="flex items-center gap-2">
                        <span className="select-none text-[#28c840]">❯</span>
                        <span className="text-cream-100">
                          <TypewriterText text={line.text} />
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`pl-5 ${line.color || "text-charcoal-400"}`}
                      >
                        {line.text}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="select-none text-[#28c840]">❯</span>
                  <span
                    className={`inline-block h-5 w-[2px] bg-[#28c840] transition-opacity duration-100 ${
                      cursorBlink ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* CTA Buttons below terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.5 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-burnt-500 px-8 py-4 text-sm font-semibold text-charcoal-950 transition-all duration-300 hover:bg-burnt-400 hover:shadow-lg hover:shadow-burnt-500/20"
              >
                View Projects
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={SITE_CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-charcoal-700 px-8 py-4 text-sm font-semibold text-cream-100 transition-all duration-300 hover:border-charcoal-500 hover:bg-charcoal-900/50"
              >
                Download Resume
                <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-4 rounded-full border border-dashed border-burnt-500/20"
              />
              <div className="absolute -inset-2 rounded-full bg-burnt-500/10 blur-xl" />
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-charcoal-700/50 sm:h-56 sm:w-56 lg:h-64 lg:w-64">
                <Image
                  src="/profile.png"
                  alt={SITE_CONFIG.name}
                  width={256}
                  height={256}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-charcoal-950 bg-burnt-500" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="text-xs uppercase tracking-widest text-charcoal-500">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-10 w-6 rounded-full border border-charcoal-700 p-1"
          >
            <div className="h-2 w-full rounded-full bg-burnt-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
