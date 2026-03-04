"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-[150px] font-bold leading-none text-charcoal-800 sm:text-[200px]">
            4<span className="text-burnt-500">0</span>4
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="mt-4 text-xl text-charcoal-300">
            This page doesn&apos;t exist.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-burnt-500 px-8 py-3 text-sm font-semibold text-charcoal-950 transition-all duration-300 hover:bg-burnt-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </a>
        </motion.div>
      </div>
    </div>
  );
}
