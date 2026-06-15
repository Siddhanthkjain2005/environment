"use client";

import { motion } from "framer-motion";

/* Orbiting node configuration — lightweight, CSS/SVG driven */
const ORBITS = [
  { size: 180, duration: 22, dots: 3, color: "#00FF88" },
  { size: 280, duration: 32, dots: 4, color: "#00E5FF", reverse: true },
  { size: 380, duration: 44, dots: 5, color: "#00A8FF" },
];

export default function NeuralCore() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 420, height: 420, maxWidth: "100%" }}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,136,0.12) 0%, rgba(0,229,255,0.05) 45%, transparent 70%)",
        }}
      />

      {/* Orbit rings + nodes */}
      {ORBITS.map((orbit, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: orbit.size,
            height: orbit.size,
            borderColor: `${orbit.color}22`,
          }}
          animate={{ rotate: orbit.reverse ? -360 : 360 }}
          transition={{
            duration: orbit.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: orbit.dots }).map((_, d) => {
            const angle = (360 / orbit.dots) * d;
            return (
              <span
                key={d}
                className="absolute left-1/2 top-0 h-2.5 w-2.5 rounded-full"
                style={{
                  background: orbit.color,
                  boxShadow: `0 0 10px ${orbit.color}, 0 0 20px ${orbit.color}80`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${orbit.size / 2}px)`,
                  transformOrigin: "center",
                }}
              />
            );
          })}
        </motion.div>
      ))}

      {/* Pulsing core */}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 120,
          height: 120,
          background:
            "radial-gradient(circle at 35% 30%, #00FF88 0%, #00B86B 45%, #047857 100%)",
          boxShadow:
            "0 0 40px rgba(0,255,136,0.45), inset 0 0 30px rgba(0,0,0,0.25)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-16 w-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.5), transparent 60%)",
          }}
        />
      </motion.div>
    </div>
  );
}
