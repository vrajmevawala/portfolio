"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number; // 25 = burnt orange, 40 = gold, 150 = emerald
  pulsePhase: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 10000), 150);
    const particles: Particle[] = [];
    const hues = [25, 25, 25, 30, 35, 40, 150]; // weighted: mostly orange, some gold, rare emerald
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: hues[Math.floor(Math.random() * hues.length)],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 0.01;
      const time = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          200
        );
        gradient.addColorStop(0, "rgba(232, 114, 12, 0.04)");
        gradient.addColorStop(0.5, "rgba(232, 114, 12, 0.01)");
        gradient.addColorStop(1, "rgba(232, 114, 12, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Mouse interaction — attract near, repel very close
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          if (dist < 60) {
            // Repel when very close
            p.vx += (dx / dist) * force * 0.2;
            p.vy += (dy / dist) * force * 0.2;
          } else {
            // Gently attract
            p.vx -= (dx / dist) * force * 0.03;
            p.vy -= (dy / dist) * force * 0.03;
          }
        }

        // Damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Pulse opacity
        const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.15;
        const currentOpacity = Math.max(0.05, p.opacity + pulse);

        // Color based on hue
        let r: number, g: number, b: number;
        if (p.hue === 150) {
          // Emerald
          r = 52; g = 211; b = 153;
        } else if (p.hue >= 35) {
          // Gold
          r = 245; g = 185; b = 60;
        } else {
          // Burnt orange
          r = 232; g = 114; b = 12;
        }

        // Draw glow for larger particles
        if (p.radius > 1.3) {
          const glow = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.radius * 4
          );
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.3})`);
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const d2 = dx2 * dx2 + dy2 * dy2;

          if (d2 < 22000) {
            // ~148px
            const dist2 = Math.sqrt(d2);
            const alpha = (1 - dist2 / 148) * 0.12;

            // Connection color blends both particle hues
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(232, 114, 12, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }

        // Stronger connection to cursor
        if (dist < 200) {
          const alpha = (1 - dist / 200) * 0.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(232, 114, 12, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
