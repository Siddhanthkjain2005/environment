'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Earth from '@/components/hero/Earth';
import WasteParticles from '@/components/hero/WasteParticles';

export default function EarthScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Only render frames while the hero is on screen — saves GPU/CPU on scroll
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduced) {
      setActive(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 3, 4]} intensity={1.4} color="#ffffff" />
          <pointLight position={[-4, 2, -3]} intensity={0.6} color="#00E5FF" />

          {/* Scene objects */}
          <Earth />
          <WasteParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
