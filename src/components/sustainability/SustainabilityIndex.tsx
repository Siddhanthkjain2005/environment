'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

/* ───────────────────────────────────────────── */
/* Circular Gauge                                */
/* ───────────────────────────────────────────── */

interface GaugeData {
  label: string;
  value: number;
  color: string;
}

const gauges: GaugeData[] = [
  { label: 'Sustainability Score', value: 94, color: '#00FF88' },
  { label: 'Circular Economy Index', value: 87, color: '#00E5FF' },
  { label: 'Resource Recovery Efficiency', value: 91, color: '#00A8FF' },
  { label: 'Carbon Savings Index', value: 96, color: '#00FF88' },
];

const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAUGE_SIZE = 160;
const VIEWBOX = GAUGE_SIZE + 20; // extra padding for glow
const CENTER = VIEWBOX / 2;

function GaugeCard({ gauge, index }: { gauge: GaugeData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  /* animate the arc stroke-dashoffset */
  const offsetMv = useMotionValue(CIRCUMFERENCE);
  const offsetSpring = useSpring(offsetMv, { stiffness: 40, damping: 18 });

  /* animate the display number */
  const numMv = useMotionValue(0);
  const numSpring = useSpring(numMv, { stiffness: 50, damping: 22 });
  const numDisplay = useTransform(numSpring, (v: number) =>
    Math.round(v).toString(),
  );
  const [numText, setNumText] = useState('0');

  useEffect(() => {
    if (isInView) {
      const target = CIRCUMFERENCE * (1 - gauge.value / 100);
      offsetMv.set(target);
      numMv.set(gauge.value);
    }
  }, [isInView, offsetMv, numMv, gauge.value]);

  useEffect(() => {
    const unsub = numDisplay.on('change', (v) => setNumText(v));
    return unsub;
  }, [numDisplay]);

  /* spring value for stroke-dashoffset – need to subscribe */
  const [dashOffset, setDashOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    const unsub = offsetSpring.on('change', (v) => setDashOffset(v));
    return unsub;
  }, [offsetSpring]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      className="group relative rounded-3xl p-8 flex flex-col items-center"
      style={{
        background: 'rgba(11,29,38,0.4)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(0,255,136,0.08)',
      }}
    >
      {/* hover border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{ border: `1px solid ${gauge.color}30` }}
      />

      {/* SVG gauge */}
      <div className="relative mb-6">
        <svg
          width={GAUGE_SIZE}
          height={GAUGE_SIZE}
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          className="block"
        >
          {/* outer glow ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS + 6}
            fill="none"
            stroke={gauge.color}
            strokeWidth={2}
            opacity={0.08}
            className="transition-opacity duration-500 group-hover:opacity-[0.18]"
          />

          {/* background track */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={gauge.color}
            strokeWidth={8}
            opacity={0.1}
          />

          {/* foreground arc */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={gauge.color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            className="transition-[filter] duration-500 group-hover:drop-shadow-[0_0_8px_var(--glow)]"
            style={
              {
                filter: `drop-shadow(0 0 6px ${gauge.color}50)`,
                '--glow': `${gauge.color}80`,
              } as React.CSSProperties
            }
          />

          {/* pulse glow ring (animated) */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={gauge.color}
            strokeWidth={2}
            opacity={0.15}
            className="gauge-pulse"
          />
        </svg>

        {/* center text – positioned over the SVG */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-bold tracking-tight"
            style={{ color: gauge.color }}
          >
            {numText}
          </span>
          <span className="text-sm" style={{ color: '#7A9E9F' }}>
            /100
          </span>
        </div>
      </div>

      {/* label */}
      <h3
        className="text-lg font-semibold text-center"
        style={{ color: '#E8F4F0' }}
      >
        {gauge.label}
      </h3>

      <style jsx>{`
        .gauge-pulse {
          animation: gauge-pulse-anim 3s ease-in-out infinite;
        }
        @keyframes gauge-pulse-anim {
          0%,
          100% {
            opacity: 0.08;
            transform-origin: center;
            r: ${RADIUS};
          }
          50% {
            opacity: 0.2;
          }
        }
      `}</style>
    </motion.div>
  );
}

/* ───────────────────────────────────────────── */
/* SustainabilityIndex Section                   */
/* ───────────────────────────────────────────── */

export default function SustainabilityIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* ambient background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #00FF88, transparent 70%)',
            top: '20%',
            right: '10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #00A8FF, transparent 70%)',
            bottom: '10%',
            left: '15%',
          }}
        />
      </div>

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
            Sustainability Index
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#7A9E9F' }}
          >
            Real-time performance metrics for our circular economy platform
          </p>
        </motion.div>

        {/* gauge grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {gauges.map((gauge, i) => (
            <GaugeCard key={gauge.label} gauge={gauge} index={i} />
          ))}
        </div>

        {/* summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-4xl mx-auto rounded-2xl px-8 py-6 text-center"
          style={{
            background: 'rgba(11,29,38,0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(0,255,136,0.15)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* green pulse dot */}
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FF88] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00FF88]" />
            </span>
            <span className="text-lg font-semibold" style={{ color: '#E8F4F0' }}>
              Overall System Health:{' '}
              <span style={{ color: '#00FF88' }}>Excellent</span>
            </span>
          </div>
          <p className="text-sm" style={{ color: '#7A9E9F' }}>
            All systems operating within optimal parameters. Next calibration in{' '}
            <span style={{ color: '#00E5FF' }}>4h 23m</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
