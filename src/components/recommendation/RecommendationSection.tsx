'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Types ─────────────────────────────────────────── */

interface WasteType {
  key: string;
  label: string;
  icon: string;
  color: string;
}

interface AIResult {
  recommendation: string;
  industryMatch: string;
  estimatedValue: string;
  sustainabilityImpact: string;
  carbonReduction: string;
  recoveryRate: number;
  matchConfidence: number;
  processingSteps: string[];
}

/* ─── Data ──────────────────────────────────────────── */

const wasteTypes: WasteType[] = [
  { key: 'plastic', label: 'Plastic', icon: '🧴', color: '#FF6B6B' },
  { key: 'metal', label: 'Metal', icon: '⚙️', color: '#FFD93D' },
  { key: 'paper', label: 'Paper', icon: '📄', color: '#95E1D3' },
  { key: 'ewaste', label: 'E-Waste', icon: '💻', color: '#C084FC' },
  { key: 'organic', label: 'Organic', icon: '🌿', color: '#00FF88' },
];

const aiResults: Record<string, AIResult> = {
  plastic: {
    recommendation: 'Mechanical Recycling → PET Pellet Production',
    industryMatch: 'TerraCycle Industries (98.5% compatibility)',
    estimatedValue: '$420/tonne',
    sustainabilityImpact: 'High - Reduces ocean pollution by 73%',
    carbonReduction: '2.3 tonnes CO₂ saved per tonne recycled',
    recoveryRate: 94,
    matchConfidence: 98.5,
    processingSteps: ['Collection & Sorting', 'Cleaning & Shredding', 'Pelletization', 'Quality Testing', 'Distribution'],
  },
  metal: {
    recommendation: 'Smelting & Refining → High-Grade Alloy Recovery',
    industryMatch: 'GreenSteel Corp (96.2% compatibility)',
    estimatedValue: '$1,850/tonne',
    sustainabilityImpact: 'Very High - 95% energy savings vs mining',
    carbonReduction: '4.1 tonnes CO₂ saved per tonne recycled',
    recoveryRate: 97,
    matchConfidence: 96.2,
    processingSteps: ['Magnetic Separation', 'Shredding', 'Smelting', 'Refining', 'Alloy Production'],
  },
  paper: {
    recommendation: 'De-inking & Pulping → Recycled Paper Production',
    industryMatch: 'EcoPulp Manufacturing (94.8% compatibility)',
    estimatedValue: '$180/tonne',
    sustainabilityImpact: 'Medium - Saves 17 trees per tonne',
    carbonReduction: '1.5 tonnes CO₂ saved per tonne recycled',
    recoveryRate: 89,
    matchConfidence: 94.8,
    processingSteps: ['Sorting', 'Pulping', 'De-inking', 'Bleaching', 'Sheet Formation'],
  },
  ewaste: {
    recommendation: 'Component Harvesting → Precious Metal Extraction',
    industryMatch: 'CircuitMine Technologies (99.1% compatibility)',
    estimatedValue: '$12,500/tonne',
    sustainabilityImpact: 'Critical - Prevents toxic leaching into groundwater',
    carbonReduction: '5.8 tonnes CO₂ saved per tonne recycled',
    recoveryRate: 92,
    matchConfidence: 99.1,
    processingSteps: ['Disassembly', 'Component Sorting', 'Chemical Processing', 'Metal Recovery', 'Safe Disposal of Hazardous Materials'],
  },
  organic: {
    recommendation: 'Anaerobic Digestion → Biogas & Compost Production',
    industryMatch: 'BioEnergy Solutions (97.6% compatibility)',
    estimatedValue: '$95/tonne',
    sustainabilityImpact: 'High - Eliminates methane from landfills',
    carbonReduction: '1.8 tonnes CO₂ saved per tonne recycled',
    recoveryRate: 96,
    matchConfidence: 97.6,
    processingSteps: ['Pre-processing', 'Anaerobic Digestion', 'Biogas Capture', 'Digestate Processing', 'Compost Distribution'],
  },
};

/* ─── Animated Counter Hook ─────────────────────────── */

function useAnimatedCounter(target: number, duration: number = 1200, active: boolean = true): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    let start = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * target;
      setValue(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return value;
}

/* ─── Circular Progress Ring ────────────────────────── */

function CircularProgress({ value, size = 80, strokeWidth = 6, color = '#00FF88' }: {
  value: number; size?: number; strokeWidth?: number; color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = useAnimatedCounter(value, 1400, true);
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          filter: `drop-shadow(0 0 6px ${color}80)`,
          transition: 'stroke-dashoffset 0.1s linear',
        }}
      />
    </svg>
  );
}

/* ─── Small Progress Bar ────────────────────────────── */

function ProgressBar({ value, color = '#00FF88' }: { value: number; color?: string }) {
  return (
    <div className="w-full h-2 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden mt-2">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)`, boxShadow: `0 0 10px ${color}60` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      />
    </div>
  );
}

/* ─── Processing Steps ──────────────────────────────── */

function ProcessingSteps({ steps, color }: { steps: string[]; color: string }) {
  return (
    <div className="flex flex-wrap items-start gap-0 mt-3">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          className="flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="flex flex-col items-center min-w-[72px]">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#06141B] shrink-0"
              style={{ background: color, boxShadow: `0 0 12px ${color}50` }}
            >
              {i + 1}
            </div>
            <span className="text-[10px] sm:text-xs text-[#7A9E9F] mt-2 text-center leading-tight max-w-[80px]">
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <motion.div
              className="h-[2px] w-6 sm:w-10 mt-[-18px] shrink-0"
              style={{ background: `linear-gradient(90deg, ${color}60, ${color}20)` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9 + i * 0.15, duration: 0.4 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── AI Processing Loader ──────────────────────────── */

function AIProcessingLoader() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Pulsing rings */}
      <div className="relative w-24 h-24 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-[#00FF88]"
            animate={{
              scale: [1, 2],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
        <div className="absolute inset-3 rounded-full bg-[rgba(0,255,136,0.1)] flex items-center justify-center">
          <motion.div
            className="w-4 h-4 rounded-full bg-[#00FF88]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ boxShadow: '0 0 20px #00FF8880' }}
          />
        </div>
      </div>
      {/* Pulsing text with animated dots */}
      <motion.p
        className="text-lg font-medium text-[#00FF88] tracking-wide"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        AI Processing
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatType: 'reverse' }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.4, repeat: Infinity, repeatType: 'reverse' }}
        >
          .
        </motion.span>
      </motion.p>
      <p className="text-sm text-[#7A9E9F] mt-2">
        Analyzing optimal recycling pathways
      </p>
    </motion.div>
  );
}

/* ─── Results Panel ─────────────────────────────────── */

function ResultsPanel({ data, color }: { data: AIResult; color: string }) {
  const numericValue = parseFloat(data.estimatedValue.replace(/[^0-9.]/g, ''));
  const animatedNum = useAnimatedCounter(numericValue, 1400, true);

  const formatValue = (n: number) => {
    if (n >= 1000) return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    return `$${n.toFixed(0)}`;
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const impactColor =
    data.sustainabilityImpact.startsWith('Critical') ? '#FF6B6B' :
    data.sustainabilityImpact.startsWith('Very High') ? '#00E5FF' :
    data.sustainabilityImpact.startsWith('High') ? '#00FF88' :
    '#FFD93D';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Recommendation */}
      <motion.div
        variants={cardVariants}
        className="bg-[rgba(6,20,27,0.5)] border border-[rgba(0,255,136,0.05)] rounded-2xl p-5 md:col-span-2"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded-full" style={{ background: color }} />
          <h4 className="text-sm font-medium text-[#7A9E9F] uppercase tracking-wider">
            AI Recommendation
          </h4>
        </div>
        <p className="text-lg font-semibold text-[#E8F4F0]">{data.recommendation}</p>
      </motion.div>

      {/* Industry Match */}
      <motion.div
        variants={cardVariants}
        className="bg-[rgba(6,20,27,0.5)] border border-[rgba(0,255,136,0.05)] rounded-2xl p-5"
      >
        <h4 className="text-sm font-medium text-[#7A9E9F] uppercase tracking-wider mb-2">
          Industry Match
        </h4>
        <p className="text-[#E8F4F0] font-medium text-sm">{data.industryMatch}</p>
        <ProgressBar value={data.matchConfidence} color={color} />
        <p className="text-xs text-[#7A9E9F] mt-1">{data.matchConfidence}% confidence</p>
      </motion.div>

      {/* Estimated Value */}
      <motion.div
        variants={cardVariants}
        className="bg-[rgba(6,20,27,0.5)] border border-[rgba(0,255,136,0.05)] rounded-2xl p-5"
      >
        <h4 className="text-sm font-medium text-[#7A9E9F] uppercase tracking-wider mb-2">
          Estimated Value
        </h4>
        <p className="text-3xl font-bold" style={{ color }}>
          {formatValue(animatedNum)}<span className="text-base font-normal text-[#7A9E9F]">/tonne</span>
        </p>
      </motion.div>

      {/* Sustainability Impact */}
      <motion.div
        variants={cardVariants}
        className="bg-[rgba(6,20,27,0.5)] border border-[rgba(0,255,136,0.05)] rounded-2xl p-5"
      >
        <h4 className="text-sm font-medium text-[#7A9E9F] uppercase tracking-wider mb-2">
          Sustainability Impact
        </h4>
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: `${impactColor}20`,
              color: impactColor,
              border: `1px solid ${impactColor}40`,
            }}
          >
            {data.sustainabilityImpact.split(' - ')[0]}
          </span>
        </div>
        <p className="text-sm text-[#E8F4F0] mt-2">
          {data.sustainabilityImpact.split(' - ')[1]}
        </p>
      </motion.div>

      {/* Carbon Reduction */}
      <motion.div
        variants={cardVariants}
        className="bg-[rgba(6,20,27,0.5)] border border-[rgba(0,255,136,0.05)] rounded-2xl p-5"
      >
        <h4 className="text-sm font-medium text-[#7A9E9F] uppercase tracking-wider mb-2">
          Carbon Reduction
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-xl">🍃</span>
          <p className="text-sm text-[#E8F4F0] font-medium">{data.carbonReduction}</p>
        </div>
      </motion.div>

      {/* Recovery Rate */}
      <motion.div
        variants={cardVariants}
        className="bg-[rgba(6,20,27,0.5)] border border-[rgba(0,255,136,0.05)] rounded-2xl p-5 flex items-center gap-5"
      >
        <div className="relative shrink-0">
          <CircularProgress value={data.recoveryRate} color={color} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#E8F4F0]">{data.recoveryRate}%</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#7A9E9F] uppercase tracking-wider">
            Recovery Rate
          </h4>
          <p className="text-xs text-[#7A9E9F] mt-1">Material successfully recovered</p>
        </div>
      </motion.div>

      {/* Processing Steps */}
      <motion.div
        variants={cardVariants}
        className="bg-[rgba(6,20,27,0.5)] border border-[rgba(0,255,136,0.05)] rounded-2xl p-5 md:col-span-2 overflow-x-auto"
      >
        <h4 className="text-sm font-medium text-[#7A9E9F] uppercase tracking-wider mb-1">
          Processing Pipeline
        </h4>
        <ProcessingSteps steps={data.processingSteps} color={color} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────── */

export default function RecommendationSection() {
  const [selectedWaste, setSelectedWaste] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultKey, setResultKey] = useState<string | null>(null);

  const handleSelect = useCallback((key: string) => {
    if (key === selectedWaste) return;
    setSelectedWaste(key);
    setShowResults(false);
    setIsProcessing(true);
    setResultKey(null);

    const timer = setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
      setResultKey(key);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedWaste]);

  const selectedType = wasteTypes.find((w) => w.key === selectedWaste);

  return (
    <section
      id="recommendation"
      className="relative section-padding overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.12), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.1), transparent 70%)' }}
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
              AI Recommendation Engine
            </span>
          </h2>
          <p className="text-lg text-[#7A9E9F] max-w-2xl mx-auto">
            Select a waste type and watch our AI generate optimal recycling pathways
          </p>
        </motion.div>

        {/* Waste Type Selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {wasteTypes.map((wt) => {
            const isSelected = selectedWaste === wt.key;
            return (
              <motion.button
                key={wt.key}
                onClick={() => handleSelect(wt.key)}
                className="relative bg-[rgba(11,29,38,0.5)] backdrop-blur-xl rounded-2xl p-6 cursor-pointer w-[140px] text-center transition-colors duration-300"
                style={{
                  border: isSelected
                    ? `2px solid ${wt.color}`
                    : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: isSelected
                    ? `0 0 30px ${wt.color}30, inset 0 0 20px ${wt.color}10`
                    : 'none',
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: wt.color,
                  boxShadow: `0 0 24px ${wt.color}25`,
                }}
                whileTap={{ scale: 0.97 }}
                animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span className="text-3xl block mb-2">{wt.icon}</span>
                <span className="text-sm font-medium text-[#E8F4F0]">{wt.label}</span>
                {/* Glow dot indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="waste-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{ background: wt.color, boxShadow: `0 0 8px ${wt.color}` }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {isProcessing && (
            <motion.div
              key="loader"
              className="relative bg-[rgba(11,29,38,0.3)] backdrop-blur-2xl border border-[rgba(0,255,136,0.15)] rounded-3xl p-8 scan-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <AIProcessingLoader />
            </motion.div>
          )}

          {showResults && resultKey && aiResults[resultKey] && selectedType && (
            <motion.div
              key={`results-${resultKey}`}
              className="relative bg-[rgba(11,29,38,0.3)] backdrop-blur-2xl border border-[rgba(0,255,136,0.15)] rounded-3xl p-6 sm:p-8 scan-line overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {/* Holographic sweep */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${selectedType.color}05 0%, transparent 40%, ${selectedType.color}03 100%)`,
                }}
              />
              <ResultsPanel data={aiResults[resultKey]} color={selectedType.color} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!selectedWaste && (
          <motion.div
            className="text-center py-16 text-[#7A9E9F]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-5xl mb-4">♻️</div>
            <p className="text-lg">Select a waste type above to see AI recommendations</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
