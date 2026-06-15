"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";

/* ── Heavy, animation-driven sections are client-only ───── */
const ScrollStory = dynamic(() => import("@/components/story/ScrollStory"), {
  ssr: false,
});
const AIBrainSection = dynamic(
  () => import("@/components/ai-brain/AIBrainSection"),
  { ssr: false }
);
const PipelineSection = dynamic(
  () => import("@/components/pipeline/PipelineSection"),
  { ssr: false }
);
const RecommendationSection = dynamic(
  () => import("@/components/recommendation/RecommendationSection"),
  { ssr: false }
);
const IndiaMap = dynamic(() => import("@/components/india/IndiaMap"), {
  ssr: false,
});
const ImpactSection = dynamic(
  () => import("@/components/impact/ImpactSection"),
  { ssr: false }
);
const SustainabilityIndex = dynamic(
  () => import("@/components/sustainability/SustainabilityIndex"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      {/* Navigation */}
      <Navbar />

      {/* ── Sections ──────────────────────────────────── */}
      <main>
        {/* 1. Cinematic hero with 3D Earth */}
        <HeroSection />

        {/* 2. The journey — problem to vision */}
        <ScrollStory />

        {/* 3. How it works — waste-to-resource system */}
        <PipelineSection />

        {/* 4. The AI engine — neural core + recommendations */}
        <AIBrainSection />
        <RecommendationSection />

        {/* 5. The network — India smart-city deployment */}
        <IndiaMap />

        {/* 6. The impact — metrics + sustainability */}
        <ImpactSection />
        <SustainabilityIndex />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScroll>
  );
}
