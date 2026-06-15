"use client";

import { useRef, useEffect } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  // Spring config derived from desired duration
  const springValue = useSpring(motionValue, {
    stiffness: 100 / duration,
    damping: 30,
    duration: duration * 1000,
  });

  // Transform the number into a formatted display string
  const displayValue = useTransform(springValue, (latest: number) => {
    const clamped = Math.min(latest, target);
    const formatted = clamped.toFixed(decimals);
    // Add thousands separators
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${prefix}${parts.join(".")}${suffix}`;
  });

  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}
