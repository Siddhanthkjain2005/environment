"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Raw motion values for the magnetic offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring-driven values
  const springX = useSpring(x, { stiffness: 300, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 25, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Clamp to max 10px offset
    const maxOffset = 10;
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * 0.3));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * 0.3));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const innerContent = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`
        relative cursor-pointer select-none
        rounded-full px-8 py-4
        text-sm font-semibold tracking-wide
        transition-all duration-300
        ${className}
      `}
    >
      {/* Glass background */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: "rgba(11,29,38,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Border glow layer */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          border: hovered
            ? "1px solid rgba(0,255,136,0.5)"
            : "1px solid rgba(0,255,136,0.15)",
          boxShadow: hovered
            ? "0 0 30px rgba(0,255,136,0.2), inset 0 0 30px rgba(0,255,136,0.05)"
            : "0 0 10px rgba(0,255,136,0.05)",
        }}
      />

      {/* Gradient border on hover */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,229,255,0.15), rgba(0,168,255,0.15))",
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 text-white">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block no-underline">
        {innerContent}
      </a>
    );
  }

  return innerContent;
}
