"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

function MagneticLink({
  children,
  href,
  className,
  onClick,
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Floating Glass Morph Pill */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed left-1/2 top-0 z-50 -translate-x-1/2 pt-4 sm:pt-5"
      >
        <nav
          className={cn(
            "nav-glass relative flex items-center gap-1 rounded-full border px-2 py-2 transition-all duration-500 sm:px-3",
            isScrolled
              ? "border-charcoal-700/50 bg-charcoal-950/70 shadow-2xl shadow-black/30 backdrop-blur-2xl"
              : "border-charcoal-800/30 bg-charcoal-950/40 backdrop-blur-xl"
          )}
        >
          {/* Logo */}
          {/* <MagneticLink
            href="#"
            className="flex-shrink-0 rounded-full px-3 py-2 font-heading text-base font-bold text-cream-50 transition-colors hover:text-burnt-500 sm:px-4 sm:text-lg"
          >
            V<span className="text-burnt-500">.</span>
          </MagneticLink> */}

          {/* <div className="hidden h-5 w-px bg-charcoal-700/50 sm:block" /> */}

          {/* Desktop Links */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <MagneticLink
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300",
                      isActive
                        ? "text-cream-50"
                        : "text-charcoal-400 hover:text-cream-200"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-charcoal-700/40 bg-charcoal-800/60"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </MagneticLink>
                </li>
              );
            })}
          </ul>

          <div className="hidden h-5 w-px bg-charcoal-700/50 sm:block" />

          {/* Resume CTA */}
          <MagneticLink
            href={SITE_CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-burnt-500/30 bg-burnt-500/10 px-4 py-2 text-[13px] font-semibold text-burnt-400 transition-all duration-300 hover:border-burnt-500 hover:bg-burnt-500 hover:text-charcoal-950 hover:shadow-lg hover:shadow-burnt-500/20 md:inline-flex"
          >
            Resume
          </MagneticLink>

          {/* Glow */}
          <div className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-burnt-500/5 via-transparent to-burnt-500/5 blur-sm" />
        </nav>
      </motion.header>

      {/* Fixed Hamburger — top-right corner on mobile/tablet */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed right-4 top-4 z-50 rounded-xl border border-charcoal-700/50 bg-charcoal-950/70 p-3 text-cream-50 backdrop-blur-2xl transition-colors hover:bg-charcoal-800/80 sm:right-6 sm:top-5 md:hidden"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-charcoal-950/90 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-6"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className={cn(
                    "group relative px-6 py-3 font-heading text-3xl font-bold transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-burnt-500"
                      : "text-cream-50 hover:text-burnt-400"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-2 left-6 h-px w-0 bg-burnt-500 transition-all duration-300 group-hover:w-[calc(100%-48px)]" />
                </motion.a>
              ))}
              <motion.a
                href={SITE_CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + NAV_LINKS.length * 0.07 }}
                className="mt-4 rounded-full border border-burnt-500 px-8 py-3 text-lg font-semibold text-burnt-500 transition-all duration-300 hover:bg-burnt-500 hover:text-charcoal-950"
              >
                Resume
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
