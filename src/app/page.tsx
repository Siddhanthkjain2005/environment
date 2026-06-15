"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import ParticleField from "@/components/effects/ParticleField";

/* ── Heavy sections loaded lazily ──────────────────────── */
const ScrollStory = dynamic(
  () => import("@/components/story/ScrollStory"),
  { ssr: false }
);
const AIBrainSection = dynamic(
  () => import("@/components/ai-brain/AIBrainSection"),
  { ssr: false }
);
const PipelineSection = dynamic(
  () => import("@/components/pipeline/PipelineSection"),
  { ssr: false }
);
const CircularRing = dynamic(
  () => import("@/components/circular/CircularRing"),
  { ssr: false }
);
const RecommendationSection = dynamic(
  () => import("@/components/recommendation/RecommendationSection"),
  { ssr: false }
);
const IndiaMap = dynamic(
  () => import("@/components/india/IndiaMap"),
  { ssr: false }
);
const ImpactSection = dynamic(
  () => import("@/components/impact/ImpactSection"),
  { ssr: false }
);
const SustainabilityIndex = dynamic(
  () => import("@/components/sustainability/SustainabilityIndex"),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/layout/Footer"),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScroll>
      {/* Global background particle field */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* ── Sections ──────────────────────────────────── */}
      <main>
        {/* 1. Cinematic Hero with 3D Earth */}
        <HeroSection />

        {/* 2. Scroll Storytelling Journey */}
        <ScrollStory />

        {/* 3. AI Neural Brain */}
        <AIBrainSection />

        {/* 4. Waste-to-Resource Pipeline */}
        <PipelineSection />

        {/* 5. Interactive Circular Economy Ring */}
        <CircularRing />

        {/* 6. AI Recommendation Engine */}
        <RecommendationSection />

        {/* 7. India Smart City Network */}
        <IndiaMap />

        {/* 8. Environmental Impact Metrics */}
        <ImpactSection />

        {/* 9. Sustainability Gauges */}
        <SustainabilityIndex />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScroll>
  );
}
