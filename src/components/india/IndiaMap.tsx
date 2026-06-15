'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/effects/Icon';

/* ─── Types ─────────────────────────────────────────── */

interface CityData {
  name: string;
  x: number;
  y: number;
  population: string;
  wasteProcessed: string;
  efficiency: number;
}

interface Connection {
  from: string;
  to: string;
}

/* ─── Data ──────────────────────────────────────────── */

const cities: CityData[] = [
  { name: 'Mumbai', x: 145, y: 370, population: '21.4M', wasteProcessed: '11,200 TPD', efficiency: 94 },
  { name: 'Delhi', x: 210, y: 165, population: '32.9M', wasteProcessed: '14,500 TPD', efficiency: 91 },
  { name: 'Bangalore', x: 195, y: 460, population: '13.2M', wasteProcessed: '8,400 TPD', efficiency: 96 },
  { name: 'Chennai', x: 240, y: 470, population: '11.5M', wasteProcessed: '7,200 TPD', efficiency: 93 },
  { name: 'Hyderabad', x: 215, y: 395, population: '10.5M', wasteProcessed: '6,800 TPD', efficiency: 95 },
  { name: 'Kolkata', x: 330, y: 290, population: '15.1M', wasteProcessed: '9,600 TPD', efficiency: 89 },
  { name: 'Pune', x: 160, y: 385, population: '7.4M', wasteProcessed: '5,100 TPD', efficiency: 97 },
  { name: 'Ahmedabad', x: 140, y: 280, population: '8.6M', wasteProcessed: '5,800 TPD', efficiency: 92 },
];

const connections: Connection[] = [
  { from: 'Mumbai', to: 'Pune' },
  { from: 'Mumbai', to: 'Ahmedabad' },
  { from: 'Delhi', to: 'Ahmedabad' },
  { from: 'Delhi', to: 'Kolkata' },
  { from: 'Bangalore', to: 'Chennai' },
  { from: 'Bangalore', to: 'Hyderabad' },
  { from: 'Hyderabad', to: 'Mumbai' },
  { from: 'Chennai', to: 'Kolkata' },
];

const summaryStats = [
  { label: 'Cities Connected', value: '8', icon: 'building' },
  { label: 'Daily Waste Processed', value: '68,600 TPD', icon: 'recycle' },
  { label: 'Average Efficiency', value: '93.4%', icon: 'bolt' },
  { label: 'CO₂ Saved Daily', value: '12,400 tonnes', icon: 'leaf' },
];

/* ─── India Outline SVG Path ────────────────────────── */

const INDIA_PATH = `M 200 50 
  C 210 45, 225 48, 235 55 
  L 250 65 C 260 62, 275 58, 280 65 
  L 290 80 C 295 90, 300 100, 310 110 
  L 320 120 C 330 115, 340 110, 350 115 
  L 365 130 C 370 140, 368 150, 360 155 
  L 355 165 C 360 175, 365 185, 360 195 
  L 350 210 C 355 220, 358 230, 355 240 
  L 348 255 C 350 265, 352 275, 348 285 
  L 340 300 C 338 310, 335 315, 330 320 
  L 320 330 C 315 335, 310 340, 305 348 
  L 300 360 C 298 365, 296 370, 290 375 
  L 280 385 C 275 390, 268 395, 265 400 
  L 260 415 C 255 425, 250 435, 248 445 
  L 245 460 C 240 470, 235 480, 225 488 
  L 215 498 C 210 502, 205 505, 198 508 
  L 190 512 C 182 510, 175 505, 170 498 
  L 165 488 C 160 478, 158 468, 155 458 
  L 150 445 C 145 435, 140 428, 138 418 
  L 135 405 C 130 395, 125 385, 122 375 
  L 118 360 C 115 350, 112 340, 110 330 
  L 108 315 C 106 305, 105 295, 108 285 
  L 112 270 C 110 258, 108 248, 112 238 
  L 118 225 C 115 215, 112 205, 115 195 
  L 120 180 C 122 170, 128 160, 135 152 
  L 145 140 C 150 132, 158 125, 165 118 
  L 175 105 C 180 95, 185 85, 188 75 
  L 192 62 C 195 55, 198 52, 200 50 Z`;

/* ─── Helper ────────────────────────────────────────── */

function getCityByName(name: string): CityData | undefined {
  return cities.find((c) => c.name === name);
}

/* ─── Animated Connection Line ──────────────────────── */

function ConnectionLine({ from, to, index }: { from: CityData; to: CityData; index: number }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  return (
    <g>
      {/* Base line */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#00E5FF"
        strokeOpacity={0.15}
        strokeWidth={1}
        strokeDasharray="6 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-20"
          dur="2s"
          repeatCount="indefinite"
        />
      </line>
      {/* Traveling dot */}
      <circle r="2" fill="#00E5FF" opacity={0.8}>
        <animate
          attributeName="cx"
          from={from.x}
          to={to.x}
          dur={`${3 + index * 0.5}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          from={from.y}
          to={to.y}
          dur={`${3 + index * 0.5}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0.9;0.9;0"
          dur={`${3 + index * 0.5}s`}
          repeatCount="indefinite"
        />
      </circle>
      {/* Reverse traveling dot */}
      <circle r="1.5" fill="#00FF88" opacity={0.6}>
        <animate
          attributeName="cx"
          from={to.x}
          to={from.x}
          dur={`${4 + index * 0.3}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          from={to.y}
          to={from.y}
          dur={`${4 + index * 0.3}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0.7;0.7;0"
          dur={`${4 + index * 0.3}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

/* ─── City Node ─────────────────────────────────────── */

function CityNode({
  city,
  isSelected,
  onSelect,
}: {
  city: CityData;
  isSelected: boolean;
  onSelect: (name: string) => void;
}) {
  return (
    <g
      className="cursor-pointer"
      onClick={() => onSelect(city.name)}
      onMouseEnter={() => onSelect(city.name)}
    >
      {/* Pulse rings */}
      <circle cx={city.x} cy={city.y} r={6} fill="#00FF88" opacity={0}>
        <animate
          attributeName="r"
          values="6;18"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={city.x} cy={city.y} r={6} fill="#00FF88" opacity={0}>
        <animate
          attributeName="r"
          values="6;18"
          dur="2s"
          begin="0.7s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0"
          dur="2s"
          begin="0.7s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Glow */}
      <circle
        cx={city.x}
        cy={city.y}
        r={isSelected ? 10 : 8}
        fill="#00FF88"
        opacity={0.15}
        style={{
          filter: 'blur(4px)',
          transition: 'r 0.3s ease',
        }}
      />

      {/* Core dot */}
      <circle
        cx={city.x}
        cy={city.y}
        r={isSelected ? 7 : 5}
        fill={isSelected ? '#00FF88' : '#00FF88'}
        stroke={isSelected ? '#00FF88' : 'rgba(0,255,136,0.4)'}
        strokeWidth={isSelected ? 2 : 1}
        style={{
          filter: isSelected ? 'drop-shadow(0 0 8px #00FF88)' : 'drop-shadow(0 0 4px #00FF8860)',
          transition: 'all 0.3s ease',
        }}
      />

      {/* Label */}
      <text
        x={city.x}
        y={city.y + 18}
        textAnchor="middle"
        fill="#E8F4F0"
        fontSize="10"
        fontWeight={isSelected ? '600' : '400'}
        fontFamily="system-ui, sans-serif"
        style={{
          filter: isSelected ? 'drop-shadow(0 0 4px #00FF8860)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {city.name}
      </text>
    </g>
  );
}

/* ─── City Detail Card ──────────────────────────────── */

function CityDetailCard({ city }: { city: CityData }) {
  const cardX = Math.min(Math.max(city.x + 20, 50), 340);
  const cardY = Math.max(city.y - 60, 20);

  return (
    <motion.foreignObject
      x={cardX}
      y={cardY}
      width={180}
      height={140}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <div
        style={{
          background: 'rgba(11,29,38,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,255,136,0.2)',
          borderRadius: '16px',
          padding: '14px',
          boxShadow: '0 0 30px rgba(0,255,136,0.08), 0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#00FF88',
            marginBottom: '8px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {city.name}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'system-ui, sans-serif' }}>
            <span style={{ color: '#7A9E9F' }}>Population</span>
            <span style={{ color: '#E8F4F0', fontWeight: 500 }}>{city.population}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'system-ui, sans-serif' }}>
            <span style={{ color: '#7A9E9F' }}>Waste/Day</span>
            <span style={{ color: '#E8F4F0', fontWeight: 500 }}>{city.wasteProcessed}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'system-ui, sans-serif' }}>
            <span style={{ color: '#7A9E9F' }}>Efficiency</span>
            <span style={{ color: '#00FF88', fontWeight: 600 }}>{city.efficiency}%</span>
          </div>
          {/* Efficiency bar */}
          <div
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden',
              marginTop: '4px',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                borderRadius: '2px',
                background: 'linear-gradient(90deg, #00FF88, #00E5FF)',
                boxShadow: '0 0 8px #00FF8860',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${city.efficiency}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            />
          </div>
        </div>
      </div>
    </motion.foreignObject>
  );
}

/* ─── Main Component ────────────────────────────────── */

export default function IndiaMap() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const selectedCityData = cities.find((c) => c.name === selectedCity);

  return (
    <section
      id="network"
      className="relative section-padding overflow-hidden"
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full opacity-15 blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.1), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08), transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span
              style={{
                background: 'linear-gradient(135deg, #00FF88, #00E5FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Smart City Network
            </span>
          </h2>
          <p className="text-lg text-[#7A9E9F] max-w-2xl mx-auto">
            AI-powered waste logistics across India&apos;s major metropolitan areas
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Map — Left Side */}
          <motion.div
            className="w-full lg:w-[60%] relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div
              className="relative rounded-3xl p-4 sm:p-6"
              style={{
                background: 'rgba(11,29,38,0.3)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,255,136,0.1)',
              }}
            >
              <svg
                viewBox="0 0 500 560"
                className="w-full h-auto"
                onClick={() => setSelectedCity(null)}
              >
                <defs>
                  <linearGradient id="indiaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity={0.04} />
                    <stop offset="100%" stopColor="transparent" stopOpacity={0} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* India outline */}
                <path
                  d={INDIA_PATH}
                  fill="url(#indiaFill)"
                  stroke="#00FF88"
                  strokeOpacity={0.3}
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                />

                {/* Internal grid lines for tech feel */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1={50}
                    y1={50 + i * 45}
                    x2={450}
                    y2={50 + i * 45}
                    stroke="#00FF88"
                    strokeOpacity={0.03}
                    strokeWidth={0.5}
                  />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={50 + i * 45}
                    y1={30}
                    x2={50 + i * 45}
                    y2={530}
                    stroke="#00FF88"
                    strokeOpacity={0.03}
                    strokeWidth={0.5}
                  />
                ))}

                {/* Connection lines */}
                {connections.map((conn, i) => {
                  const from = getCityByName(conn.from);
                  const to = getCityByName(conn.to);
                  if (!from || !to) return null;
                  return (
                    <ConnectionLine key={`${conn.from}-${conn.to}`} from={from} to={to} index={i} />
                  );
                })}

                {/* City nodes */}
                {cities.map((city) => (
                  <CityNode
                    key={city.name}
                    city={city}
                    isSelected={selectedCity === city.name}
                    onSelect={setSelectedCity}
                  />
                ))}

                {/* City detail card */}
                <AnimatePresence>
                  {selectedCityData && (
                    <CityDetailCard key={selectedCityData.name} city={selectedCityData} />
                  )}
                </AnimatePresence>
              </svg>

              {/* Map legend */}
              <div className="flex items-center gap-6 mt-4 justify-center text-xs text-[#7A9E9F]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00FF88]" style={{ boxShadow: '0 0 6px #00FF8860' }} />
                  <span>Active Node</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-[2px] bg-[#00E5FF] opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #00E5FF 0, #00E5FF 4px, transparent 4px, transparent 8px)' }} />
                  <span>Data Link</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats — Right Side */}
          <motion.div
            className="w-full lg:w-[40%] flex flex-col gap-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Network summary header */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(11,29,38,0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,255,136,0.1)',
              }}
            >
              <h3 className="text-lg font-semibold text-[#E8F4F0] mb-1">Network Overview</h3>
              <p className="text-sm text-[#7A9E9F]">
                Real-time waste management infrastructure spanning India&apos;s top metropolitan regions
              </p>
            </div>

            {/* Stat cards */}
            {summaryStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(6,20,27,0.5)',
                  border: '1px solid rgba(0,255,136,0.05)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                whileHover={{
                  borderColor: 'rgba(0,255,136,0.2)',
                  boxShadow: '0 0 20px rgba(0,255,136,0.06)',
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#00FF88]">
                    <Icon name={stat.icon} size={24} />
                  </span>
                  <div>
                    <p className="text-xs text-[#7A9E9F] uppercase tracking-wider font-medium">
                      {stat.label}
                    </p>
                    <p
                      className="text-2xl font-bold mt-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #00FF88, #00E5FF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Click-to-explore hint */}
            <motion.div
              className="text-center text-sm text-[#7A9E9F] mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {selectedCity
                ? `Viewing: ${selectedCity}`
                : 'Hover or tap a city node to explore'}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
