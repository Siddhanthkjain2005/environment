'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/effects/Icon';

/* ────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────── */

interface PipelineNode {
  icon: string;
  label: string;
}

const sources: PipelineNode[] = [
  { icon: 'home', label: 'Households' },
  { icon: 'factory', label: 'Factories' },
  { icon: 'building', label: 'Commercial' },
  { icon: 'trash', label: 'Landfills' },
];

const outputs: PipelineNode[] = [
  { icon: 'recycle', label: 'Recycling Plants' },
  { icon: 'leaf', label: 'Green Industries' },
  { icon: 'bolt', label: 'Renewable Energy' },
  { icon: 'wrench', label: 'Smart Manufacturing' },
];

/* ────────────────────────────────────────────────
   Animation variants
   ──────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const hubVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.5 },
  },
};

/* ────────────────────────────────────────────────
   Inline keyframes (injected once)
   ──────────────────────────────────────────────── */

const pipelineStyles = `
  @keyframes pipeline-dash {
    to { stroke-dashoffset: -40; }
  }
  @keyframes pipeline-dot-flow {
    0% { offset-distance: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
  }
  @keyframes pipeline-hub-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes pipeline-hub-glow {
    0%, 100% { box-shadow: 0 0 30px rgba(0,229,255,0.25), 0 0 60px rgba(0,255,136,0.15), inset 0 0 30px rgba(0,229,255,0.1); }
    50% { box-shadow: 0 0 50px rgba(0,229,255,0.4), 0 0 90px rgba(0,255,136,0.25), inset 0 0 40px rgba(0,229,255,0.15); }
  }
  @keyframes pipeline-rotate-border {
    to { transform: rotate(360deg); }
  }
  @keyframes pipeline-draw-line {
    to { stroke-dashoffset: 0; }
  }
`;

/* ────────────────────────────────────────────────
   SVG path helpers
   ──────────────────────────────────────────────── */

/** Desktop horizontal curves: left nodes → center hub */
function desktopLeftPath(nodeIndex: number): string {
  // Source nodes stacked vertically on the left, hub in center
  const nodeY = 80 + nodeIndex * 100; // node vertical positions
  const hubX = 500;
  const hubY = 230;
  const startX = 120;
  return `M ${startX} ${nodeY} C ${startX + 140} ${nodeY}, ${hubX - 140} ${hubY}, ${hubX} ${hubY}`;
}

/** Desktop horizontal curves: center hub → right nodes */
function desktopRightPath(nodeIndex: number): string {
  const nodeY = 80 + nodeIndex * 100;
  const hubX = 500;
  const hubY = 230;
  const endX = 880;
  return `M ${hubX} ${hubY} C ${hubX + 140} ${hubY}, ${endX - 140} ${nodeY}, ${endX} ${nodeY}`;
}

/** Mobile vertical curves: top nodes → center hub */
function mobileLeftPath(nodeIndex: number): string {
  const nodeX = 60 + nodeIndex * 80;
  const startY = 60;
  const hubX = 180;
  const hubY = 250;
  return `M ${nodeX} ${startY} C ${nodeX} ${startY + 80}, ${hubX} ${hubY - 80}, ${hubX} ${hubY}`;
}

/** Mobile vertical curves: center hub → bottom nodes */
function mobileRightPath(nodeIndex: number): string {
  const nodeX = 60 + nodeIndex * 80;
  const endY = 440;
  const hubX = 180;
  const hubY = 250;
  return `M ${hubX} ${hubY} C ${hubX} ${hubY + 80}, ${nodeX} ${endY - 80}, ${nodeX} ${endY}`;
}

/* ────────────────────────────────────────────────
   Components
   ──────────────────────────────────────────────── */

function SourceNode({ node, index }: { node: PipelineNode; index: number }) {
  return (
    <motion.div
      variants={nodeVariants}
      className="relative flex items-center gap-3 rounded-xl border border-[rgba(255,68,68,0.2)] bg-[rgba(11,29,38,0.5)] p-4 backdrop-blur-xl"
      style={{
        boxShadow:
          '0 0 20px rgba(255,100,50,0.08), 0 0 40px rgba(255,68,68,0.05)',
      }}
      whileHover={{
        scale: 1.05,
        borderColor: 'rgba(255,100,50,0.4)',
        boxShadow:
          '0 0 30px rgba(255,100,50,0.15), 0 0 60px rgba(255,68,68,0.08)',
      }}
      transition={{ duration: 0.3 }}
    >
              <span className="text-[#00FF88]" role="img" aria-label={node.label}>
                <Icon name={node.icon} size={22} />
              </span>
      <span className="text-sm font-medium text-[#E8F4F0]">{node.label}</span>
    </motion.div>
  );
}

function OutputNode({ node, index }: { node: PipelineNode; index: number }) {
  return (
    <motion.div
      variants={nodeVariants}
      className="relative flex items-center gap-3 rounded-xl border border-[rgba(0,255,136,0.2)] bg-[rgba(11,29,38,0.5)] p-4 backdrop-blur-xl"
      style={{
        boxShadow:
          '0 0 20px rgba(0,255,136,0.08), 0 0 40px rgba(0,255,136,0.05)',
      }}
      whileHover={{
        scale: 1.05,
        borderColor: 'rgba(0,255,136,0.4)',
        boxShadow:
          '0 0 30px rgba(0,255,136,0.15), 0 0 60px rgba(0,255,136,0.08)',
      }}
      transition={{ duration: 0.3 }}
    >
              <span className="text-[#00FF88]" role="img" aria-label={node.label}>
                <Icon name={node.icon} size={22} />
              </span>
      <span className="text-sm font-medium text-[#E8F4F0]">{node.label}</span>
    </motion.div>
  );
}

function AIHub() {
  return (
    <motion.div variants={hubVariants} className="relative flex flex-col items-center gap-3">
      {/* Rotating gradient border */}
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Outer rotating ring */}
        <div
          className="absolute inset-[-3px] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, #00FF88, #00E5FF, #00A8FF, #00FF88)',
            animation: 'pipeline-rotate-border 4s linear infinite',
          }}
        />
        {/* Inner fill */}
        <div
          className="absolute inset-[2px] rounded-full bg-[rgba(6,20,27,0.95)]"
          style={{
            animation:
              'pipeline-hub-pulse 3s ease-in-out infinite, pipeline-hub-glow 3s ease-in-out infinite',
          }}
        />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-[#00FF88]">
          <Icon name="brain" size={34} />
        </div>
      </div>
      <span className="text-sm font-semibold tracking-wide text-[#00E5FF]">
        AI Processing Core
      </span>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   SVG Overlay – Desktop
   ──────────────────────────────────────────────── */

function DesktopSVGOverlay({ isInView }: { isInView: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      viewBox="0 0 1000 460"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <defs>
        <linearGradient id="grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6432" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00FF88" stopOpacity="0.6" />
        </linearGradient>
        <filter id="glow-line">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left-to-center paths */}
      {sources.map((_, i) => {
        const d = desktopLeftPath(i);
        const totalLen = 500;
        return (
          <g key={`left-${i}`} filter="url(#glow-line)">
            {/* Background path */}
            <path
              d={d}
              stroke="url(#grad-left)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              opacity={isInView ? 1 : 0}
              style={{
                animation: isInView
                  ? `pipeline-dash 1.5s linear infinite`
                  : 'none',
                transition: 'opacity 0.6s ease',
              }}
            />
            {/* Draw-in path */}
            <path
              d={d}
              stroke="url(#grad-left)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={totalLen}
              strokeDashoffset={isInView ? 0 : totalLen}
              opacity={0.4}
              style={{
                transition: `stroke-dashoffset 1.5s ease ${0.6 + i * 0.15}s`,
              }}
            />
            {/* Flowing dot */}
            {isInView && (
              <circle r="4" fill="#00E5FF" opacity="0.9">
                <animateMotion
                  dur={`${2.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={d}
                  begin={`${0.8 + i * 0.2}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${2.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                  begin={`${0.8 + i * 0.2}s`}
                />
              </circle>
            )}
          </g>
        );
      })}

      {/* Center-to-right paths */}
      {outputs.map((_, i) => {
        const d = desktopRightPath(i);
        const totalLen = 500;
        return (
          <g key={`right-${i}`} filter="url(#glow-line)">
            <path
              d={d}
              stroke="url(#grad-right)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              opacity={isInView ? 1 : 0}
              style={{
                animation: isInView
                  ? `pipeline-dash 1.5s linear infinite`
                  : 'none',
                transition: 'opacity 0.6s ease',
              }}
            />
            <path
              d={d}
              stroke="url(#grad-right)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={totalLen}
              strokeDashoffset={isInView ? 0 : totalLen}
              opacity={0.4}
              style={{
                transition: `stroke-dashoffset 1.5s ease ${1 + i * 0.15}s`,
              }}
            />
            {isInView && (
              <circle r="4" fill="#00FF88" opacity="0.9">
                <animateMotion
                  dur={`${2.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={d}
                  begin={`${1.2 + i * 0.2}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${2.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                  begin={`${1.2 + i * 0.2}s`}
                />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ────────────────────────────────────────────────
   SVG Overlay – Mobile
   ──────────────────────────────────────────────── */

function MobileSVGOverlay({ isInView }: { isInView: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 block h-full w-full md:hidden"
      viewBox="0 0 360 500"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <defs>
        <linearGradient id="m-grad-left" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6432" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="m-grad-right" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00FF88" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {sources.map((_, i) => {
        const d = mobileLeftPath(i);
        return (
          <g key={`ml-${i}`}>
            <path
              d={d}
              stroke="url(#m-grad-left)"
              strokeWidth="1.5"
              strokeDasharray="6 5"
              strokeLinecap="round"
              opacity={isInView ? 0.7 : 0}
              style={{
                animation: isInView ? 'pipeline-dash 1.5s linear infinite' : 'none',
                transition: 'opacity 0.6s ease',
              }}
            />
            {isInView && (
              <circle r="3" fill="#00E5FF" opacity="0.8">
                <animateMotion
                  dur={`${2.2 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={d}
                  begin={`${0.5 + i * 0.15}s`}
                />
              </circle>
            )}
          </g>
        );
      })}

      {outputs.map((_, i) => {
        const d = mobileRightPath(i);
        return (
          <g key={`mr-${i}`}>
            <path
              d={d}
              stroke="url(#m-grad-right)"
              strokeWidth="1.5"
              strokeDasharray="6 5"
              strokeLinecap="round"
              opacity={isInView ? 0.7 : 0}
              style={{
                animation: isInView ? 'pipeline-dash 1.5s linear infinite' : 'none',
                transition: 'opacity 0.6s ease',
              }}
            />
            {isInView && (
              <circle r="3" fill="#00FF88" opacity="0.8">
                <animateMotion
                  dur={`${2.2 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={d}
                  begin={`${0.8 + i * 0.15}s`}
                />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────���──────
   Main Component
   ──────────────────────────────────────────────── */

export default function PipelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="section-padding aurora-bg relative overflow-hidden"
    >
      {/* Inject keyframes */}
      <style>{pipelineStyles}</style>

      {/* ── Heading ── */}
      <div className="relative z-10 mx-auto mb-16 max-w-3xl text-center md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#00E5FF]"
        >
          Real-Time Processing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="gradient-text mb-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
        >
          Waste → Intelligence → Value
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base text-[#7A9E9F] md:text-lg"
        >
          Watch waste transform into resources through our AI processing network
        </motion.p>
      </div>

      {/* ── Pipeline Visualization ── */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ═══════════════════ DESKTOP LAYOUT ═══════════════════ */}
        <div className="relative hidden md:block">
          {/* SVG behind nodes */}
          <DesktopSVGOverlay isInView={isInView} />

          <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-8">
            {/* Left: Sources */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-col gap-5"
            >
              {sources.map((s, i) => (
                <SourceNode key={s.label} node={s} index={i} />
              ))}
            </motion.div>

            {/* Center: Hub */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex items-center justify-center"
            >
              <AIHub />
            </motion.div>

            {/* Right: Outputs */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-col gap-5"
            >
              {outputs.map((o, i) => (
                <OutputNode key={o.label} node={o} index={i} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════ MOBILE LAYOUT ═══════════════════ */}
        <div className="relative block md:hidden">
          {/* SVG behind nodes */}
          <MobileSVGOverlay isInView={isInView} />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Top: Sources – horizontal scroll */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid w-full grid-cols-2 gap-3"
            >
              {sources.map((s, i) => (
                <SourceNode key={s.label} node={s} index={i} />
              ))}
            </motion.div>

            {/* Center: Hub */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex items-center justify-center py-4"
            >
              <AIHub />
            </motion.div>

            {/* Bottom: Outputs */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid w-full grid-cols-2 gap-3"
            >
              {outputs.map((o, i) => (
                <OutputNode key={o.label} node={o} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div className="relative z-10 mx-auto mt-16 max-w-xl md:mt-24">
        <div className="h-px w-full overflow-hidden bg-[rgba(0,255,136,0.1)]">
          <motion.div
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '100%' } : {}}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
            className="h-full w-1/2"
            style={{
              background:
                'linear-gradient(90deg, transparent, #00FF88, #00E5FF, transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
