"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setPhase("reveal");
        setTimeout(onComplete, 800);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "reveal" ? null : null}
      <motion.div
        initial={{ opacity: 1 }}
        animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal-950"
      >
        {/* Central animation */}
        <div className="relative flex flex-col items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative mb-10"
          >
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full border border-dashed border-burnt-500/30"
            />
            {/* Glow */}
            <div className="absolute -inset-2 rounded-full bg-burnt-500/15 blur-xl" />
            {/* Image */}
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-charcoal-700/60 sm:h-28 sm:w-28">
              <Image
                src={SITE_CONFIG.avatar}
                alt={SITE_CONFIG.name}
                width={112}
                height={112}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            {/* Status dot */}
            <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-charcoal-950 bg-burnt-500" />
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-8 font-heading text-lg font-semibold tracking-tight text-cream-50 sm:text-xl"
          >
            {SITE_CONFIG.name.split(" ")[0]}
            <span className="text-burnt-500">.</span>
          </motion.p>

          {/* Progress bar */}
          <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-charcoal-800 sm:w-64">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
              className="absolute left-0 top-0 h-full rounded-full bg-burnt-500"
            />
          </div>

          {/* Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 font-heading text-sm tracking-[0.3em] text-charcoal-500"
          >
            {progress}%
          </motion.p>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-4 text-xs uppercase tracking-[0.2em] text-charcoal-600"
          >
            Loading
          </motion.p>
        </div>

        {/* Corner decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute left-8 top-8 text-xs tracking-widest text-charcoal-600"
        >
          PORTFOLIO
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute bottom-8 right-8 text-xs tracking-widest text-charcoal-600"
        >
          2026
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
