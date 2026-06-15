"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
}

/**
 * Converts a hex color string to an rgba() value with the given alpha.
 */
function hexToRgba(hex: string, alpha: number): string {
  const sanitized = hex.replace("#", "");
  const r = parseInt(sanitized.substring(0, 2), 16);
  const g = parseInt(sanitized.substring(2, 4), 16);
  const b = parseInt(sanitized.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Small L-shaped accent for a corner */
function CornerAccent({
  position,
  color,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
}) {
  const size = 16;
  const thickness = 1;
  const accentColor = hexToRgba(color, 0.35);

  const positionStyles: Record<string, React.CSSProperties> = {
    "top-left": { top: 8, left: 8 },
    "top-right": { top: 8, right: 8 },
    "bottom-left": { bottom: 8, left: 8 },
    "bottom-right": { bottom: 8, right: 8 },
  };

  const horizontalLine: React.CSSProperties = {
    position: "absolute",
    height: thickness,
    width: size,
    background: accentColor,
    ...(position.includes("top") ? { top: 0 } : { bottom: 0 }),
    ...(position.includes("left") ? { left: 0 } : { right: 0 }),
  };

  const verticalLine: React.CSSProperties = {
    position: "absolute",
    width: thickness,
    height: size,
    background: accentColor,
    ...(position.includes("top") ? { top: 0 } : { bottom: 0 }),
    ...(position.includes("left") ? { left: 0 } : { right: 0 }),
  };

  return (
    <div className="pointer-events-none absolute" style={positionStyles[position]}>
      <div style={horizontalLine} />
      <div style={verticalLine} />
    </div>
  );
}

export default function GlassmorphismCard({
  children,
  className = "",
  glowColor = "#00FF88",
  hover = true,
}: GlassmorphismCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{
        background: "rgba(11,29,38,0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${hexToRgba(glowColor, 0.08)}`,
      }}
      whileHover={
        hover
          ? {
              y: -4,
              borderColor: hexToRgba(glowColor, 0.3),
              boxShadow: `0 0 30px ${hexToRgba(glowColor, 0.12)}, 0 20px 60px rgba(0,0,0,0.3)`,
            }
          : undefined
      }
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Corner accents */}
      <CornerAccent position="top-left" color={glowColor} />
      <CornerAccent position="top-right" color={glowColor} />
      <CornerAccent position="bottom-left" color={glowColor} />
      <CornerAccent position="bottom-right" color={glowColor} />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
