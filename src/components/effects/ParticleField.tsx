"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  color: string;
  speedX: number;
  speedY: number;
  phase: number;
  phaseSpeed: number;
  amplitude: number;
}

const PARTICLE_COUNT = 80;
const COLORS = ["#00FF88", "#00E5FF"];
const MOUSE_RADIUS = 120;
const MOUSE_STRENGTH = 30;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.008 + 0.003,
        amplitude: Math.random() * 30 + 10,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to parent dimensions
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      // Re-init particles on resize if none exist, otherwise let them adapt
      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height);
      }
    };

    resize();
    if (particlesRef.current.length === 0) {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        initParticles(rect.width, rect.height);
      }
    }

    window.addEventListener("resize", resize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update phase
        p.phase += p.phaseSpeed;

        // Sine-wave based floating motion
        const offsetX = Math.sin(p.phase) * p.amplitude;
        const offsetY = Math.cos(p.phase * 0.7) * p.amplitude * 0.6;

        // Drift the base position slowly
        p.baseX += p.speedX;
        p.baseY += p.speedY;

        // Wrap around screen edges
        if (p.baseX < -20) p.baseX = width + 20;
        if (p.baseX > width + 20) p.baseX = -20;
        if (p.baseY < -20) p.baseY = height + 20;
        if (p.baseY > height + 20) p.baseY = -20;

        // Desired position
        let targetX = p.baseX + offsetX;
        let targetY = p.baseY + offsetY;

        // Mouse repulsion
        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const pushX = (dx / dist) * force * MOUSE_STRENGTH;
          const pushY = (dy / dist) * force * MOUSE_STRENGTH;
          targetX += pushX;
          targetY += pushY;
        }

        // Smoothly interpolate to target
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.closePath();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-0"
      style={{ display: "block" }}
    />
  );
}
