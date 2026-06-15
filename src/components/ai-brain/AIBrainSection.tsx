'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import NeuralCore from './NeuralCore';
import Icon from '@/components/effects/Icon';

/* ─── Card Data ──────────────────────────────────────────────── */

interface Capability {
  icon: string;
  title: string;
  description: string;
  accent: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: 'brain',
    title: 'AI Prediction',
    description: 'Forecasting waste patterns with 97.3% accuracy',
    accent: '#00FF88',
  },
  {
    icon: 'eye',
    title: 'AI Classification',
    description: 'Real-time waste stream identification and sorting',
    accent: '#00E5FF',
  },
  {
    icon: 'link',
    title: 'AI Matching',
    description: 'Connecting waste sources to optimal recycling paths',
    accent: '#00FF88',
  },
  {
    icon: 'map',
    title: 'Route Optimization',
    description: 'Minimizing transport emissions with smart logistics',
    accent: '#00E5FF',
  },
];

/* ─── Card Component ─────────────────────────────────────────── */

function CapabilityCard({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: 0.15 * index,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl border border-[rgba(0,255,136,0.1)] bg-[rgba(11,29,38,0.5)] p-6 backdrop-blur-xl transition-shadow duration-400"
      style={{
        boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* Accent line */}
      <div
        className="absolute left-0 top-0 h-[2px] w-full transition-all duration-500 group-hover:h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${capability.accent} 50%, transparent 100%)`,
          opacity: 0.7,
        }}
      />

      {/* Icon */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(0,255,136,0.06)]"
        style={{ color: capability.accent }}
      >
        <Icon name={capability.icon} size={22} />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-[#E8F4F0]">
        {capability.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-[#7A9E9F]">
        {capability.description}
      </p>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${capability.accent}08 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────── */

export default function AIBrainSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="ai-brain"
      ref={sectionRef}
      className="aurora-bg relative overflow-hidden"
      style={{ background: '#06141B' }}
    >
      <div className="section-padding relative z-10 mx-auto max-w-7xl">
        {/* ── Heading ────────────────────────────────────────── */}
        <motion.div
          className="mb-16 text-center md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="mb-4 inline-block rounded-full border border-[rgba(0,255,136,0.15)] bg-[rgba(0,255,136,0.05)] px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-[#00FF88]">
            Neural Intelligence
          </span>
          <h2 className="gradient-text-glow mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            The AI Core
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#7A9E9F] md:text-lg">
            Powering intelligent waste transformation
          </p>
        </motion.div>

        {/* ── Neural Sphere ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative mx-auto mb-16 flex max-w-3xl justify-center md:mb-20"
        >
          <NeuralCore />
        </motion.div>

        {/* ── Capability Cards ───────────────────────────────── */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.title} capability={cap} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom fade-out */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-20 h-32 w-full"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, #06141B 100%)',
        }}
      />
    </section>
  );
}
