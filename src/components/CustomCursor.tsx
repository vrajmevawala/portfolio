"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28 };
  const ringSpringConfig = { stiffness: 150, damping: 20 };

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverDetect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".magnetic-hover");
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleHoverDetect, {
      passive: true,
    });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleHoverDetect);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ scale: isHovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-cream-50"
        />
      </motion.div>

      {/* Ring cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-charcoal-400/40"
        />
      </motion.div>
    </>
  );
}
