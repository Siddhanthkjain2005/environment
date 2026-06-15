'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Earth from '@/components/hero/Earth';
import WasteParticles from '@/components/hero/WasteParticles';

export default function EarthScene() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
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
