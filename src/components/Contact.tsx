"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SectionReveal from "./SectionReveal";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="section-container">
        <SectionReveal>
          <div className="text-center">
            <div className="mx-auto accent-line mb-6" />
            <h2 className="section-heading mx-auto">
              Let&apos;s Connect<span className="text-burnt-500">.</span>
            </h2>
            <p className="section-subheading mx-auto text-center">
              Have an opportunity or just want to say hello? I&apos;d love to
              hear from you.
            </p>
          </div>
        </SectionReveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <SectionReveal className="lg:col-span-2" delay={0.1}>
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: SITE_CONFIG.email,
                    href: `mailto:${SITE_CONFIG.email}`,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: SITE_CONFIG.phone,
                    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: SITE_CONFIG.location,
                    href: "",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="rounded-xl bg-burnt-500/10 p-3">
                      <Icon className="h-5 w-5 text-burnt-500" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-widest text-charcoal-500">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 text-cream-100 transition-colors hover:text-burnt-500"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-cream-100">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-4 pt-4">
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-charcoal-800 p-3 text-charcoal-400 transition-all duration-300 hover:border-burnt-500/50 hover:text-burnt-500"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-charcoal-800 p-3 text-charcoal-400 transition-all duration-300 hover:border-burnt-500/50 hover:text-burnt-500"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </SectionReveal>

          {/* Contact Form */}
          <SectionReveal className="lg:col-span-3" delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm uppercase tracking-widest text-charcoal-500"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-charcoal-800 bg-charcoal-900/50 px-4 py-3 text-cream-100 placeholder-charcoal-600 outline-none transition-all duration-300 focus:border-burnt-500/50 focus:ring-1 focus:ring-burnt-500/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm uppercase tracking-widest text-charcoal-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-charcoal-800 bg-charcoal-900/50 px-4 py-3 text-cream-100 placeholder-charcoal-600 outline-none transition-all duration-300 focus:border-burnt-500/50 focus:ring-1 focus:ring-burnt-500/20"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm uppercase tracking-widest text-charcoal-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-charcoal-800 bg-charcoal-900/50 px-4 py-3 text-cream-100 placeholder-charcoal-600 outline-none transition-all duration-300 focus:border-burnt-500/50 focus:ring-1 focus:ring-burnt-500/20"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-burnt-500 px-8 py-4 text-sm font-semibold text-charcoal-950 transition-all duration-300 hover:bg-burnt-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Floating Status Acknowledgment (Toast) */}
              <AnimatePresence>
                {(status === "success" || status === "error") && (
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                    exit={{ opacity: 0, scale: 0.9, y: 20, x: "-50%" }}
                    className={cn(
                      "fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 rounded-2xl border px-6 py-4 shadow-2xl backdrop-blur-md transition-all duration-300",
                      status === "success"
                        ? "border-green-500/30 bg-green-500/10 text-green-400 shadow-green-500/10"
                        : "border-red-500/30 bg-red-500/10 text-red-400 shadow-red-500/10"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full p-1.5",
                        status === "success" ? "bg-green-500/20" : "bg-red-500/20"
                      )}
                    >
                      {status === "success" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold leading-none">
                        {status === "success" ? "Message Sent!" : "Error Sending Message"}
                      </p>
                      <p className="mt-1 text-sm opacity-80">
                        {status === "success"
                          ? "I'll get back to you as soon as possible."
                          : "Something went wrong. Please try again or email me directly."}
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="ml-4 text-xs uppercase tracking-widest opacity-50 hover:opacity-100"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
