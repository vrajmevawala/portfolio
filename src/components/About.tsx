"use client";

import SectionReveal from "./SectionReveal";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="section-container">
        <SectionReveal>
          <div className="accent-line mb-6" />
          <h2 className="section-heading">
            About<span className="text-burnt-500">.</span>
          </h2>
        </SectionReveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Left: narrative */}
          <SectionReveal className="lg:col-span-3" delay={0.1}>
            <div className="space-y-6 text-lg leading-relaxed text-charcoal-300">
              <p>
                I&apos;m a{" "}
                <span className="font-semibold text-cream-100">
                  B.Tech Computer Engineering
                </span>{" "}
                student with a{" "}
                <span className="font-semibold text-burnt-500">9.52 CGPA</span>,
                driven by a deep fascination for building systems that scale and
                deliver real impact. My journey isn&apos;t just academic — I
                build, deploy, and ship.
              </p>
              <p>
                At{" "}
                <span className="font-semibold text-cream-100">
                  AccessGlobal Technology
                </span>
                , I gained production deployment experience, working with{" "}
                <span className="text-cream-200">
                  React & Django applications
                </span>{" "}
                deployed through PM2, Gunicorn, and Apache2 on Linux servers.
                I&apos;ve configured ISPConfig panels, managed server
                environments, and handled real-world deployment pipelines.
              </p>
              <p>
                Whether it&apos;s crafting pixel-perfect interfaces with React
                and Tailwind, architecting RESTful APIs with Node.js and
                Express, or building AI-powered platforms with TensorFlow — I
                approach every project with engineering rigor and a relentless
                focus on quality.
              </p>
            </div>
          </SectionReveal>

          {/* Right: quick stats */}
          <SectionReveal className="lg:col-span-2" delay={0.2}>
            <div className="space-y-6">
              {[
                { label: "CGPA", value: "9.52" },
                { label: "Degree", value: "B.Tech CE" },
                { label: "Location", value: "Gujarat, India" },
                { label: "Internship", value: "AccessGlobal Tech" },
                { label: "Focus", value: "Full Stack + AI" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between border-b border-charcoal-800/50 pb-4"
                >
                  <span className="text-sm uppercase tracking-widest text-charcoal-500">
                    {stat.label}
                  </span>
                  <span className="font-heading text-lg font-semibold text-cream-100">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
