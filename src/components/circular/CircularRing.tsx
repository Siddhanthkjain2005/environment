'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────── */

interface Stage {
  icon: string;
  label: string;
  desc: string;
}

const stages: Stage[] = [
  {
    icon: '🗑️',
    label: 'Waste Generation',
    desc: '2.01 billion tonnes generated annually',
  },
  {
    icon: '🚛',
    label: 'Smart Collection',
    desc: 'AI-optimized collection routes reduce emissions by 40%',
  },
  {
    icon: '🧠',
    label: 'AI Analysis',
    desc: 'Real-time classification with 97.3% accuracy',
  },
  {
    icon: '⚗️',
    label: 'Resource Recovery',
    desc: '85% material recovery rate achieved',
  },
  {
    icon: '🏭',
    label: 'Industrial Reuse',
    desc: 'Direct integration with manufacturing pipelines',
  },
  {
    icon: '🌱',
    label: 'Sustainable Production',
    desc: '60% reduction in virgin material usage',
  },
];

/* ────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────── */

const DESKTOP_RADIUS = 250;
const MOBILE_RADIUS = 150;
const DEG_STEP = 360 / stages.length; // 60°

function stagePosition(index: number, radius: number) {
  const angleDeg = -90 + index * DEG_STEP; // start from top
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(angleRad) * radius,
    y: Math.sin(angleRad) * radius,
  };
}

/* ────────────────────────────────────────────────
   Styles
   ──────────────────────────────────────────────── */

const circularStyles = `
  @keyframes circular-ring-rotate {
    to { transform: rotate(360deg); }
  }
  @keyframes circular-energy-flow {
    to { stroke-dashoffset: -120; }
  }
  @keyframes circular-particle-flow {
    0%   { offset-distance: 0%;   opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
  }
  @keyframes circular-node-pulse {
    0%, 100% { box-shadow: 0 0 15px rgba(0,255,136,0.1); }
    50%      { box-shadow: 0 0 25px rgba(0,255,136,0.2); }
  }
`;

/* ────────────────────────────────────────────────
   Ring SVG
   ──────────────────────────────────────────────── */

function RingSVG({
  radius,
  isInView,
}: {
  radius: number;
  isInView: boolean;
}) {
  const cx = radius + 60;
  const cy = radius + 60;
  const size = (radius + 60) * 2;

  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF88" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00A8FF" />
        </linearGradient>
        <filter id="ring-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base ring */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke="#00FF88"
        strokeWidth="1.5"
        strokeOpacity="0.12"
        fill="none"
      />

      {/* Animated energy ring */}
      {isInView && (
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="url(#ring-grad)"
          strokeWidth="2"
          strokeOpacity="0.4"
          fill="none"
          strokeDasharray="20 15"
          strokeLinecap="round"
          filter="url(#ring-glow)"
          style={{
            animation: 'circular-energy-flow 3s linear infinite',
          }}
        />
      )}

      {/* Connecting arcs between nodes */}
      {stages.map((_, i) => {
        const nextI = (i + 1) % stages.length;
        const p1 = stagePosition(i, radius);
        const p2 = stagePosition(nextI, radius);
        const x1 = cx + p1.x;
        const y1 = cy + p1.y;
        const x2 = cx + p2.x;
        const y2 = cy + p2.y;

        return (
          <path
            key={`arc-${i}`}
            d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
            stroke="url(#ring-grad)"
            strokeWidth="1.5"
            strokeOpacity={isInView ? 0.25 : 0}
            fill="none"
            strokeLinecap="round"
            style={{ transition: 'stroke-opacity 1s ease' }}
          />
        );
      })}

      {/* Flowing particles */}
      {isInView &&
        [0, 1, 2].map((particleIdx) => {
          const circPath = `M ${cx + radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx + radius - 0.01} ${cy}`;
          return (
            <circle
              key={`particle-${particleIdx}`}
              r="3"
              fill="#00FF88"
              opacity="0.8"
              filter="url(#ring-glow)"
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={circPath}
                begin={`${particleIdx * 2.7}s`}
                rotate="auto"
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0.9;0"
                dur="8s"
                repeatCount="indefinite"
                begin={`${particleIdx * 2.7}s`}
              />
            </circle>
          );
        })}
    </svg>
  );
}

/* ────────────────────────────────────────────────
   Stage Node
   ──────────────────────────────────────────────── */

function StageNode({
  stage,
  index,
  isSelected,
  onClick,
  radius,
}: {
  stage: Stage;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  radius: number;
}) {
  const pos = stagePosition(index, radius);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.3 + index * 0.12,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="absolute flex flex-col items-center gap-1 focus:outline-none"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
        zIndex: isSelected ? 20 : 10,
      }}
    >
      <motion.div
        animate={
          isSelected
            ? {
                scale: 1.2,
                borderColor: '#00FF88',
                boxShadow:
                  '0 0 30px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.15)',
              }
            : {
                scale: 1,
                borderColor: 'rgba(0,255,136,0.15)',
                boxShadow: '0 0 15px rgba(0,255,136,0.05)',
              }
        }
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        whileHover={{ scale: isSelected ? 1.25 : 1.1 }}
        className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border bg-[rgba(11,29,38,0.6)] backdrop-blur-xl"
        style={{
          animation: isSelected ? 'circular-node-pulse 2s ease-in-out infinite' : 'none',
        }}
      >
        <span className="text-2xl">{stage.icon}</span>
      </motion.div>
      <motion.span
        animate={{
          color: isSelected ? '#00FF88' : '#E8F4F0',
          textShadow: isSelected
            ? '0 0 10px rgba(0,255,136,0.4)'
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.3 }}
        className="mt-1 max-w-[90px] text-center text-xs font-medium leading-tight md:max-w-[110px] md:text-sm"
      >
        {stage.label}
      </motion.span>
    </motion.button>
  );
}

/* ────────────────────────────────────────────────
   Center Detail Card
   ──────────────────────────────────────────────── */

function CenterDetail({ stage }: { stage: Stage }) {
  return (
    <motion.div
      key={stage.label}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="flex flex-col items-center gap-3 rounded-2xl border border-[rgba(0,255,136,0.12)] bg-[rgba(11,29,38,0.7)] px-6 py-5 text-center backdrop-blur-2xl"
      style={{
        boxShadow:
          '0 0 40px rgba(0,255,136,0.08), 0 0 80px rgba(0,229,255,0.04)',
        maxWidth: '220px',
      }}
    >
      <span className="text-3xl">{stage.icon}</span>
      <h4 className="text-sm font-bold tracking-wide text-[#00FF88]">
        {stage.label}
      </h4>
      <p className="text-xs leading-relaxed text-[#7A9E9F]">{stage.desc}</p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Mobile stage list (below ring on small screens)
   ──────────────────────────────────────────────── */

function MobileDescription({ stage }: { stage: Stage }) {
  return (
    <motion.div
      key={stage.label}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-[rgba(0,255,136,0.12)] bg-[rgba(11,29,38,0.6)] px-6 py-5 text-center backdrop-blur-xl md:hidden"
    >
      <span className="text-3xl">{stage.icon}</span>
      <h4 className="text-base font-bold text-[#00FF88]">{stage.label}</h4>
      <p className="text-sm leading-relaxed text-[#7A9E9F]">{stage.desc}</p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────────── */

export default function CircularRing() {
  const [selected, setSelected] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleSelect = useCallback((i: number) => setSelected(i), []);

  return (
    <section
      id="circular"
      ref={sectionRef}
      className="section-padding aurora-bg relative overflow-hidden"
    >
      <style>{circularStyles}</style>

      {/* ── Heading ── */}
      <div className="relative z-10 mx-auto mb-16 max-w-3xl text-center md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#00E5FF]"
        >
          Closed-Loop System
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="gradient-text mb-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
        >
          The Circular Ecosystem
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base text-[#7A9E9F] md:text-lg"
        >
          A self-sustaining cycle of waste transformation and resource renewal
        </motion.p>
      </div>

      {/* ── Ring Visualization ── */}
      <div className="relative z-10 mx-auto flex items-center justify-center">
        {/* DESKTOP ring */}
        <div
          className="relative hidden md:block"
          style={{
            width: (DESKTOP_RADIUS + 60) * 2,
            height: (DESKTOP_RADIUS + 60) * 2,
          }}
        >
          <RingSVG radius={DESKTOP_RADIUS} isInView={isInView} />

          {/* Nodes */}
          {stages.map((stage, i) => (
            <StageNode
              key={stage.label}
              stage={stage}
              index={i}
              isSelected={selected === i}
              onClick={() => handleSelect(i)}
              radius={DESKTOP_RADIUS}
            />
          ))}

          {/* Center detail */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              <CenterDetail stage={stages[selected]} />
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE ring */}
        <div
          className="relative block md:hidden"
          style={{
            width: (MOBILE_RADIUS + 60) * 2,
            height: (MOBILE_RADIUS + 60) * 2,
          }}
        >
          <RingSVG radius={MOBILE_RADIUS} isInView={isInView} />

          {stages.map((stage, i) => (
            <StageNode
              key={stage.label}
              stage={stage}
              index={i}
              isSelected={selected === i}
              onClick={() => handleSelect(i)}
              radius={MOBILE_RADIUS}
            />
          ))}

          {/* Center – small indicator on mobile */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={stages[selected].icon}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-3xl"
              >
                {stages[selected].icon}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile description below ring */}
      <div className="relative z-10 mx-auto max-w-sm md:hidden">
        <AnimatePresence mode="wait">
          <MobileDescription stage={stages[selected]} />
        </AnimatePresence>
      </div>

      {/* ── Stage indicators (desktop) ── */}
      <div className="relative z-10 mx-auto mt-16 hidden max-w-3xl justify-center gap-2 md:flex">
        {stages.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className="group flex h-8 items-center gap-2 rounded-full border px-3 transition-all duration-300 focus:outline-none"
            style={{
              borderColor:
                selected === i
                  ? 'rgba(0,255,136,0.4)'
                  : 'rgba(0,255,136,0.08)',
              background:
                selected === i
                  ? 'rgba(0,255,136,0.08)'
                  : 'rgba(11,29,38,0.4)',
            }}
          >
            <span className="text-xs">{stages[i].icon}</span>
            <span
              className="text-xs font-medium transition-colors"
              style={{
                color: selected === i ? '#00FF88' : '#7A9E9F',
              }}
            >
              {stages[i].label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Bottom accent ── */}
      <div className="relative z-10 mx-auto mt-16 max-w-xl md:mt-24">
        <div className="h-px w-full overflow-hidden bg-[rgba(0,255,136,0.1)]">
          <motion.div
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '100%' } : {}}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
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
