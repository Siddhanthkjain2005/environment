'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

/* Dynamically load the Three.js scene so it never SSRs */
const EarthScene = dynamic(() => import('@/components/hero/EarthScene'), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#06141B]">
      {/* ── 3D background ─────────────────────────────── */}
      <EarthScene />

      {/* ── Radial vignette overlay ───────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(6,20,27,0.65) 75%, #06141B 100%)',
        }}
      />

      {/* ── Content overlay ───────────────────────────── */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-xs uppercase tracking-[0.3em] text-[#00E5FF]"
        >
          Environmental Engineering × Artificial Intelligence
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
          className="text-6xl font-bold leading-[1.05] md:text-7xl lg:text-8xl xl:text-9xl"
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #00FF88, #00E5FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI-Powered
          </span>
          <br />
          <span className="text-white">Circular Economy</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
          className="text-xl text-[#7A9E9F] md:text-2xl"
        >
          Transforming Waste Into Opportunity
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: 'easeOut' }}
          className="mt-4 flex flex-col gap-4 sm:flex-row"
        >
          {/* Filled primary */}
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 30px rgba(0,255,136,0.45), 0 0 60px rgba(0,255,136,0.2)',
            }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer rounded-full bg-[#00FF88] px-8 py-4 font-semibold text-[#06141B] transition-shadow"
          >
            Explore System
          </motion.button>

          {/* Outline cyan */}
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 30px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.15)',
            }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer rounded-full border border-[#00E5FF] px-8 py-4 font-semibold text-[#00E5FF] transition-shadow"
          >
            See AI in Action
          </motion.button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A9E9F]">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
