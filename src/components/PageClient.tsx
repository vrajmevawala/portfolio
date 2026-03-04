"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";

const About = dynamic(() => import("@/components/About"));
const Experience = dynamic(() => import("@/components/Experience"));
const Skills = dynamic(() => import("@/components/Skills"));
const Terminal = dynamic(() => import("@/components/Terminal"));
const Projects = dynamic(() => import("@/components/Projects"));
const Achievements = dynamic(() => import("@/components/Achievements"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function PageClient() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <CustomCursor />
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Navigation />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Terminal />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
