'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ─── Scene Data ────────────────────────────────────────────── */

interface Scene {
  title: string;
  description: string;
}

const SCENES: Scene[] = [
  {
    title: 'A Planet Overwhelmed',
    description:
      'Every year, 2.01 billion tonnes of waste are generated globally. Our planet is suffocating under mountains of discarded materials.',
  },
  {
    title: 'AI Begins Analysis',
    description:
      'Our artificial intelligence scans, categorizes, and understands every waste stream in real-time.',
  },
  {
    title: 'Intelligent Processing',
    description:
      'A neural network of processing facilities, connected by AI-optimized logistics routes.',
  },
  {
    title: 'Resources Recovered',
    description:
      'Valuable materials are extracted, sorted, and prepared for their next life cycle.',
  },
  {
    title: 'Industries Transformed',
    description:
      'Recovered materials flow into manufacturing, construction, and energy production.',
  },
  {
    title: 'Sustainable Tomorrow',
    description:
      'Smart cities powered by circular economies. Zero waste. Infinite possibilities.',
  },
];

/* ─── Scene Background Components (Pure CSS) ─────────────────── */

function CrisisBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Pulsing red/orange gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(255,80,40,0.35) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(200,50,20,0.25) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(139,69,19,0.2) 0%, transparent 70%), #06141B',
          animation: 'crisis-pulse 4s ease-in-out infinite alternate',
        }}
      />
      {/* Floating debris */}
      {Array.from({ length: 18 }).map((_, i) => {
        const size = 12 + Math.random() * 40;
        const isCircle = i % 3 === 0;
        const colors = ['#E8453C', '#FF6B35', '#8B4513', '#CC4422', '#A0522D'];
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            className="absolute"
            style={{
              width: size,
              height: isCircle ? size : size * 0.6,
              borderRadius: isCircle ? '50%' : '4px',
              background: color,
              opacity: 0.25 + Math.random() * 0.35,
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animation: `debris-float-${i % 4} ${6 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes crisis-pulse {
          0% { filter: brightness(0.9); }
          100% { filter: brightness(1.15); }
        }
        @keyframes debris-float-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, -25px) rotate(45deg); }
          50% { transform: translate(-10px, -40px) rotate(90deg); }
          75% { transform: translate(20px, -15px) rotate(135deg); }
        }
        @keyframes debris-float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, -30px) rotate(-60deg); }
          66% { transform: translate(15px, -50px) rotate(-120deg); }
        }
        @keyframes debris-float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, -35px) rotate(180deg); }
        }
        @keyframes debris-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(10deg); }
          40% { transform: translate(-15px, -20px) rotate(-30deg); }
          80% { transform: translate(10px, -45px) rotate(50deg); }
        }
      `}</style>
    </div>
  );
}

function AIAwakensBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark base with cyan tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 70%), #06141B',
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* Horizontal scan lines */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-0 w-full"
          style={{
            height: '2px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.6) 30%, rgba(0,229,255,0.8) 50%, rgba(0,229,255,0.6) 70%, transparent 100%)',
            animation: `scan-h ${3 + i * 0.7}s linear infinite`,
            animationDelay: `${i * 1.2}s`,
            boxShadow: '0 0 15px rgba(0,229,255,0.4), 0 0 30px rgba(0,229,255,0.2)',
          }}
        />
      ))}
      {/* Vertical scan line */}
      <div
        className="absolute top-0 h-full"
        style={{
          width: '2px',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.7) 30%, rgba(0,229,255,0.9) 50%, rgba(0,229,255,0.7) 70%, transparent 100%)',
          animation: 'scan-v 4s linear infinite',
          boxShadow: '0 0 20px rgba(0,229,255,0.5), 0 0 40px rgba(0,229,255,0.2)',
        }}
      />
      {/* Data dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            background: '#00E5FF',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            opacity: 0,
            animation: `data-blink 2s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: '0 0 6px rgba(0,229,255,0.8)',
          }}
        />
      ))}
      <style>{`
        @keyframes scan-h {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes scan-v {
          0% { left: -2px; }
          100% { left: 100%; }
        }
        @keyframes data-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function ProcessingNetworkBackground() {
  const nodes = [
    { x: 20, y: 25 },
    { x: 45, y: 15 },
    { x: 75, y: 22 },
    { x: 15, y: 55 },
    { x: 50, y: 50 },
    { x: 80, y: 48 },
    { x: 30, y: 78 },
    { x: 60, y: 75 },
    { x: 85, y: 72 },
    { x: 35, y: 40 },
    { x: 65, y: 38 },
    { x: 10, y: 80 },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
    [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
    [6, 7], [7, 8], [0, 9], [9, 10], [10, 2],
    [9, 4], [10, 5], [3, 11], [11, 6],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,168,255,0.1) 0%, transparent 65%), #06141B',
        }}
      />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(0,168,255,0.2)"
            strokeWidth="0.15"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.1;0.5;0.1"
              dur={`${2 + (i % 4) * 0.5}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.3) % 3}s`}
            />
          </line>
        ))}
        {/* Animated pulses along connections */}
        {connections.slice(0, 8).map(([a, b], i) => (
          <circle key={`pulse-${i}`} r="0.4" fill="#00A8FF" opacity="0.8">
            <animateMotion
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
              path={`M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`}
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0"
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
            />
          </circle>
        ))}
      </svg>
      {/* Node dots with glow */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            background: '#00A8FF',
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow:
              '0 0 10px rgba(0,168,255,0.6), 0 0 25px rgba(0,168,255,0.3)',
            animation: `node-pulse ${2 + (i % 3) * 0.5}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes node-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ResourceRecoveryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 80%, rgba(0,255,136,0.12) 0%, transparent 60%), radial-gradient(ellipse at 30% 40%, rgba(0,229,255,0.06) 0%, transparent 50%), #06141B',
        }}
      />
      {/* Flowing energy streams */}
      {Array.from({ length: 12 }).map((_, i) => {
        const left = 8 + (i / 12) * 84;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              bottom: 0,
              width: '2px',
              height: '100%',
              background: `linear-gradient(0deg, rgba(0,255,136,0.4), rgba(0,255,136,0.15) 30%, transparent 60%)`,
              animation: `stream-up ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.4 + Math.random() * 0.4,
            }}
          />
        );
      })}
      {/* Rising particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            background: i % 3 === 0 ? '#00E5FF' : '#00FF88',
            left: `${5 + Math.random() * 90}%`,
            bottom: `${Math.random() * 20}%`,
            opacity: 0,
            animation: `particle-rise ${4 + Math.random() * 4}s ease-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 8px ${i % 3 === 0 ? 'rgba(0,229,255,0.5)' : 'rgba(0,255,136,0.5)'}`,
          }}
        />
      ))}
      <style>{`
        @keyframes stream-up {
          0% { transform: translateY(30px); opacity: 0; }
          30% { opacity: 0.6; }
          70% { opacity: 0.4; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        @keyframes particle-rise {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 0.8; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function IndustryBackground() {
  const buildings = [
    { x: 8, w: 50, h: 180 },
    { x: 14, w: 40, h: 220 },
    { x: 22, w: 55, h: 160 },
    { x: 30, w: 45, h: 250 },
    { x: 38, w: 60, h: 200 },
    { x: 48, w: 35, h: 280 },
    { x: 55, w: 50, h: 190 },
    { x: 63, w: 45, h: 240 },
    { x: 72, w: 55, h: 170 },
    { x: 80, w: 40, h: 260 },
    { x: 87, w: 50, h: 210 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 90%, rgba(0,255,136,0.08) 0%, transparent 50%), #06141B',
        }}
      />
      {/* Factory/building shapes */}
      {buildings.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${b.x}%`,
            bottom: '15%',
            width: b.w,
            height: b.h,
            background: `linear-gradient(180deg, rgba(11,29,38,0.9) 0%, rgba(17,24,39,0.95) 100%)`,
            border: '1px solid rgba(0,255,136,0.08)',
            borderBottom: 'none',
          }}
        >
          {/* Green glowing input at bottom */}
          <div
            className="absolute bottom-0 left-1/2"
            style={{
              width: '60%',
              height: '4px',
              transform: 'translateX(-50%)',
              background: '#00FF88',
              boxShadow:
                '0 0 15px rgba(0,255,136,0.6), 0 0 30px rgba(0,255,136,0.3), 0 2px 20px rgba(0,255,136,0.4)',
              animation: `glow-input ${2 + (i % 3) * 0.5}s ease-in-out infinite alternate`,
            }}
          />
          {/* Windows */}
          {Array.from({ length: Math.floor(b.h / 45) }).map((_, j) => (
            <div
              key={j}
              className="absolute"
              style={{
                left: '20%',
                top: 15 + j * 45,
                width: '60%',
                height: 6,
                background: `rgba(0,255,136,${0.05 + Math.random() * 0.15})`,
              }}
            />
          ))}
        </div>
      ))}
      {/* Energy streams flowing into buildings */}
      {[20, 45, 70].map((x, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${x}%`,
            top: '10%',
            width: '2px',
            height: '70%',
            background: `linear-gradient(180deg, transparent 0%, rgba(0,255,136,0.3) 30%, rgba(0,255,136,0.5) 100%)`,
            animation: `energy-down ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes glow-input {
          0% { opacity: 0.5; box-shadow: 0 0 10px rgba(0,255,136,0.3); }
          100% { opacity: 1; box-shadow: 0 0 20px rgba(0,255,136,0.7), 0 0 40px rgba(0,255,136,0.4); }
        }
        @keyframes energy-down {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(10px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function FutureCityBackground() {
  const skyline = [
    { x: 2, w: 35, h: 120 },
    { x: 6, w: 25, h: 200 },
    { x: 11, w: 30, h: 160 },
    { x: 16, w: 20, h: 300 },
    { x: 20, w: 35, h: 240 },
    { x: 26, w: 28, h: 180 },
    { x: 31, w: 22, h: 320 },
    { x: 36, w: 30, h: 200 },
    { x: 42, w: 25, h: 270 },
    { x: 47, w: 35, h: 150 },
    { x: 52, w: 20, h: 350 },
    { x: 56, w: 30, h: 220 },
    { x: 61, w: 25, h: 280 },
    { x: 66, w: 35, h: 190 },
    { x: 72, w: 22, h: 310 },
    { x: 76, w: 28, h: 170 },
    { x: 81, w: 30, h: 250 },
    { x: 86, w: 25, h: 200 },
    { x: 91, w: 35, h: 140 },
    { x: 95, w: 20, h: 230 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #06141B 0%, #071E28 40%, #082838 70%, #093040 100%)',
        }}
      />
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: 1 + Math.random() * 2,
            height: 1 + Math.random() * 2,
            background: '#fff',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            opacity: 0.2 + Math.random() * 0.5,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      {/* City silhouette */}
      {skyline.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${b.x}%`,
            bottom: '12%',
            width: b.w,
            height: b.h,
            background: 'linear-gradient(180deg, #0B1D26 0%, #0D2430 100%)',
            borderTop: '1px solid rgba(0,255,136,0.12)',
            borderLeft: '1px solid rgba(0,255,136,0.05)',
            borderRight: '1px solid rgba(0,255,136,0.05)',
          }}
        >
          {/* Lit windows */}
          {Array.from({ length: Math.floor(b.h / 30) }).map((_, j) =>
            Array.from({ length: Math.floor(b.w / 10) }).map((_, k) =>
              Math.random() > 0.4 ? (
                <div
                  key={`${j}-${k}`}
                  className="absolute"
                  style={{
                    left: 4 + k * 10,
                    top: 8 + j * 30,
                    width: 5,
                    height: 8,
                    background:
                      Math.random() > 0.5
                        ? 'rgba(0,255,136,0.15)'
                        : 'rgba(0,229,255,0.12)',
                  }}
                />
              ) : null,
            ),
          )}
        </div>
      ))}
      {/* Ground glow */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: '25%',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(0,255,136,0.06) 40%, rgba(0,229,255,0.1) 100%)',
        }}
      />
      {/* Aura behind city */}
      <div
        className="absolute w-full"
        style={{
          bottom: '12%',
          height: '200px',
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(0,255,136,0.15) 0%, rgba(0,229,255,0.08) 40%, transparent 70%)',
          animation: 'city-aura 5s ease-in-out infinite alternate',
        }}
      />
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes city-aura {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const SCENE_BACKGROUNDS = [
  CrisisBackground,
  AIAwakensBackground,
  ProcessingNetworkBackground,
  ResourceRecoveryBackground,
  IndustryBackground,
  FutureCityBackground,
];

/* ─── Main ScrollStory Component ────────────────────────────── */

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const scenes = container.querySelectorAll<HTMLDivElement>('.scroll-scene');
    const textEls = container.querySelectorAll<HTMLDivElement>('.scroll-scene-text');

    /* Build a single scrubbed timeline */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const idx = Math.min(
            SCENES.length - 1,
            Math.floor(self.progress * SCENES.length),
          );
          setActiveScene(idx);
        },
      },
    });

    /* Each scene gets an equal portion of the timeline.
       Scene 0 starts visible; subsequent scenes fade-in while the previous fades-out. */
    const sceneDur = 1; // relative duration per scene

    for (let i = 1; i < SCENES.length; i++) {
      const overlap = sceneDur * 0.05; // 5 % crossfade overlap
      const position = i * sceneDur - overlap;

      // fade out previous scene
      tl.to(
        scenes[i - 1],
        { opacity: 0, duration: sceneDur * 0.25, ease: 'power1.inOut' },
        position,
      );
      tl.to(
        textEls[i - 1],
        { opacity: 0, y: -30, duration: sceneDur * 0.2, ease: 'power1.in' },
        position,
      );

      // fade in current scene
      tl.fromTo(
        scenes[i],
        { opacity: 0 },
        { opacity: 1, duration: sceneDur * 0.25, ease: 'power1.inOut' },
        position,
      );
      tl.fromTo(
        textEls[i],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: sceneDur * 0.25, ease: 'power2.out' },
        position + sceneDur * 0.08,
      );

      // hold the scene for the rest of its duration (no-op tween)
      tl.to(scenes[i], { opacity: 1, duration: sceneDur * 0.7 }, position + sceneDur * 0.25);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '600vh' }}
      aria-label="Scroll Story"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scenes */}
        {SCENES.map((scene, i) => {
          const Bg = SCENE_BACKGROUNDS[i];
          return (
            <div
              key={i}
              className="scroll-scene absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0, zIndex: i }}
            >
              {/* Background visual */}
              <Bg />

              {/* Text overlay */}
              <div
                className="scroll-scene-text absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <span className="mb-4 inline-block rounded-full border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.05)] px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-[#00FF88]">
                  {String(i + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
                </span>
                <h2 className="gradient-text mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  {scene.title}
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#7A9E9F] sm:text-lg md:text-xl">
                  {scene.description}
                </p>
              </div>
            </div>
          );
        })}

        {/* Scene indicator dots (right side) */}
        <div className="absolute right-6 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 md:right-10">
          {SCENES.map((_, i) => (
            <div key={i} className="group relative flex items-center justify-end">
              {/* Tooltip */}
              <span
                className="pointer-events-none absolute right-7 whitespace-nowrap rounded bg-[rgba(11,29,38,0.85)] px-2.5 py-1 text-xs text-[#7A9E9F] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                {SCENES[i].title}
              </span>
              <div
                className="transition-all duration-500"
                style={{
                  width: activeScene === i ? 12 : 6,
                  height: activeScene === i ? 12 : 6,
                  borderRadius: '50%',
                  background:
                    activeScene === i ? '#00FF88' : 'rgba(0,255,136,0.2)',
                  boxShadow:
                    activeScene === i
                      ? '0 0 10px rgba(0,255,136,0.6), 0 0 20px rgba(0,255,136,0.3)'
                      : 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
