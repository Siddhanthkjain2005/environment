"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      className={`flex flex-col gap-6 ${alignment}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Title */}
      <h2
        className="text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
        style={{
          background:
            "linear-gradient(135deg, #00FF88 0%, #00E5FF 50%, #00A8FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </h2>

      {/* Decorative line */}
      <div
        className={`flex gap-1.5 ${align === "center" ? "justify-center" : "justify-start"}`}
      >
        <motion.div
          className="h-[2px] w-12 rounded-full"
          style={{
            background: "linear-gradient(90deg, #00FF88, #00E5FF)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
        <motion.div
          className="h-[2px] w-4 rounded-full bg-[#00A8FF]"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
        <motion.div
          className="h-[2px] w-2 rounded-full bg-[#00FF88] opacity-50"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{ color: "#7A9E9F" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
