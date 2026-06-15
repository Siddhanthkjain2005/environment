'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Icon from '@/components/effects/Icon';

/* ───────────────────────────────────────────── */
/* Animated Counter                              */
/* ───────────────────────────────────────────── */

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  color: string;
  decimals?: number;
}

function AnimatedCounter({ value, suffix, color, decimals = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v: number) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
  );
  const [displayText, setDisplayText] = useState(decimals > 0 ? '0.0' : '0');

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, motionVal, value]);

  useEffect(() => {
    const unsub = display.on('change', (v) => setDisplayText(v));
    return unsub;
  }, [display]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <span
        className="text-5xl md:text-6xl font-bold tracking-tight"
        style={{ color }}
      >
        {displayText}
      </span>
      <span
        className="text-2xl md:text-3xl font-semibold opacity-70"
        style={{ color }}
      >
        {suffix}
      </span>
    </span>
  );
}

/* ───────────────────────────────────────────── */
/* Metric Card                                   */
/* ───────────────────────────────────────────── */

interface MetricData {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  decimals?: number;
}

const metrics: MetricData[] = [
  {
    icon: 'mountain',
    value: 73,
    suffix: '%',
    label: 'Landfill Waste Diverted',
    description: 'Preventing 1.47 billion tonnes from reaching landfills annually',
    color: '#00FF88',
  },
  {
    icon: 'globe',
    value: 2.4,
    suffix: 'M',
    label: 'Tonnes CO₂ Saved Annually',
    description: 'Equivalent to removing 520,000 cars from roads',
    color: '#00E5FF',
    decimals: 1,
  },
  {
    icon: 'recycle',
    value: 340,
    suffix: '%',
    label: 'Increase in Recycling Efficiency',
    description: 'AI-powered sorting achieves unprecedented accuracy',
    color: '#00A8FF',
  },
  {
    icon: 'bolt',
    value: 890,
    suffix: 'GWh',
    label: 'Clean Energy Generated',
    description: 'Powering 250,000 homes through waste-to-energy',
    color: '#00FF88',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function MetricCard({ metric }: { metric: MetricData }) {
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      whileHover={{
        y: -8,
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
      className="group relative rounded-3xl p-8 overflow-hidden"
      style={{
        background: 'rgba(11,29,38,0.4)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(0,255,136,0.08)',
      }}
    >
      {/* hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 40px ${metric.color}15, 0 20px 60px rgba(0,0,0,0.4)`,
          borderColor: `${metric.color}40`,
        }}
      />

      {/* accent bar */}
      <div
        className="h-1 w-16 rounded-full mb-8"
        style={{ background: metric.color }}
      />

      {/* icon with glow */}
      <div className="relative mb-6 inline-block">
        <span className="relative z-10" style={{ color: metric.color }}>
          <Icon name={metric.icon} size={34} />
        </span>
        <div
          className="absolute inset-0 -m-3 rounded-full blur-xl opacity-30"
          style={{ background: metric.color }}
        />
      </div>

      {/* counter */}
      <div className="mb-4">
        <AnimatedCounter
          value={metric.value}
          suffix={metric.suffix}
          color={metric.color}
          decimals={metric.decimals}
        />
      </div>

      {/* label */}
      <h3
        className="text-lg font-medium mb-2"
        style={{ color: '#E8F4F0' }}
      >
        {metric.label}
      </h3>

      {/* description */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: '#7A9E9F' }}
      >
        {metric.description}
      </p>

      {/* hover border brightening */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{ border: `1px solid ${metric.color}30` }}
      />
    </motion.div>
  );
}

/* ───────────────────────────────────────────── */
/* Floating Particles                            */
/* ───────────────────────────────────────────── */

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const particles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
  color: ['#00FF88', '#00E5FF', '#00A8FF'][i % 3],
}));

/* ───────────────────────────────────────────── */
/* ImpactSection                                 */
/* ───────────────────────────────────────────── */

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* ── gradient mesh background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #00FF88, transparent 70%)',
            top: '10%',
            left: '5%',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #00E5FF, transparent 70%)',
            top: '40%',
            right: '10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #00A8FF, transparent 70%)',
            bottom: '5%',
            left: '30%',
          }}
        />
      </div>

      {/* ── floating particles ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: p.color,
              opacity: 0.25,
              animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes particle-float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.15;
          }
          50% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.15;
          }
        }
      `}</style>

      {/* ── content ── */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #00FF88, #00E5FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Environmental Impact
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#7A9E9F' }}
          >
            Measurable results driving real environmental change
          </p>
        </motion.div>

        {/* metric cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
