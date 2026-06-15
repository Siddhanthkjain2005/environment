"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/effects/SectionHeading";

/* ─── Scene Data ────────────────────────────────────────────── */

interface Scene {
  step: string;
  title: string;
  description: string;
  accent: string;
}

const SCENES: Scene[] = [
  {
    step: "01",
    title: "A Planet Overwhelmed",
    description:
      "Every year, 2.01 billion tonnes of waste are generated globally — most of it buried, burned, or lost to landfill.",
    accent: "#FF6B4A",
  },
  {
    step: "02",
    title: "AI Begins Analysis",
    description:
      "Our artificial intelligence scans, categorizes, and understands every waste stream in real time.",
    accent: "#00E5FF",
  },
  {
    step: "03",
    title: "Intelligent Processing",
    description:
      "A connected network of processing facilities, linked by AI-optimized logistics routes that cut emissions.",
    accent: "#00A8FF",
  },
  {
    step: "04",
    title: "Resources Recovered",
    description:
      "Valuable materials are extracted, sorted, and prepared for their next life cycle — nothing wasted.",
    accent: "#00FF88",
  },
  {
    step: "05",
    title: "Industries Transformed",
    description:
      "Recovered materials flow back into manufacturing, construction, and clean energy production.",
    accent: "#00FF88",
  },
  {
    step: "06",
    title: "A Sustainable Tomorrow",
    description:
      "Smart cities powered by circular economies. Zero waste. Infinite possibilities.",
    accent: "#00E5FF",
  },
];

/* ─── Component ──────────────────────────────────────────────── */

export default function ScrollStory() {
  return (
    <section
      id="story"
      className="relative overflow-hidden"
      style={{ background: "#06141B" }}
      aria-label="The Journey"
    >
      <div className="section-padding relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 md:mb-20">
          <SectionHeading
            title="The Journey"
            subtitle="From a planet overwhelmed by waste to a self-sustaining circular economy — guided every step by AI."
            align="center"
          />
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,255,136,0.25) 12%, rgba(0,229,255,0.25) 88%, transparent)",
            }}
          />

          <div className="flex flex-col gap-10 md:gap-16">
            {SCENES.map((scene, i) => {
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={scene.step}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex items-start gap-6 pl-12 md:w-1/2 md:pl-0 ${
                    alignRight
                      ? "md:ml-auto md:flex-row md:pl-12"
                      : "md:mr-auto md:flex-row-reverse md:pr-12 md:text-right"
                  }`}
                >
                  {/* Node */}
                  <span
                    className="absolute left-0 top-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold md:static"
                    style={{
                      borderColor: `${scene.accent}55`,
                      background: "rgba(11,29,38,0.8)",
                      color: scene.accent,
                      boxShadow: `0 0 16px ${scene.accent}40`,
                    }}
                  >
                    {scene.step}
                  </span>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border border-[rgba(0,255,136,0.08)] bg-[rgba(11,29,38,0.5)] p-6">
                    <h3 className="mb-2 text-xl font-semibold text-[#E8F4F0] md:text-2xl">
                      {scene.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#7A9E9F] md:text-base">
                      {scene.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
