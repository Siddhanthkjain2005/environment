'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 500;
const MIN_RADIUS = 2.5;
const MAX_RADIUS = 4.0;

/* waste-type palette */
const COLORS: [number, number, number][] = [
  [1.0, 0.267, 0.267],   // #FF4444 plastic
  [1.0, 0.667, 0.0],     // #FFAA00 e-waste
  [0.8, 0.8, 0.8],       // #CCCCCC paper
  [0.533, 0.533, 0.533],  // #888888 metal
];

export default function WasteParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  /* pre-computed orbit parameters */
  const { positions, colors, sizes, orbits } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    /* Each particle stores: radius, speed, phase, inclinationX, inclinationZ */
    const orbits = new Float32Array(PARTICLE_COUNT * 5);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
      const speed = 0.08 + Math.random() * 0.22;
      const phase = Math.random() * Math.PI * 2;
      const incX = (Math.random() - 0.5) * 1.2; // tilt
      const incZ = (Math.random() - 0.5) * 1.2;

      orbits[i * 5 + 0] = radius;
      orbits[i * 5 + 1] = speed;
      orbits[i * 5 + 2] = phase;
      orbits[i * 5 + 3] = incX;
      orbits[i * 5 + 4] = incZ;

      /* initial position (will be overridden in useFrame) */
      const angle = phase;
      positions[i * 3 + 0] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(incX) * Math.sin(angle) * radius * 0.3;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      /* colour */
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      colors[i * 3 + 0] = col[0];
      colors[i * 3 + 1] = col[1];
      colors[i * 3 + 2] = col[2];

      /* size */
      sizes[i] = 0.02 + Math.random() * 0.04;
    }

    return { positions, colors, sizes, orbits };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = orbits[i * 5 + 0];
      const speed = orbits[i * 5 + 1];
      const phase = orbits[i * 5 + 2];
      const incX = orbits[i * 5 + 3];
      const incZ = orbits[i * 5 + 4];

      const angle = phase + t * speed;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * Math.sin(incX + angle * 0.3) * radius * 0.35;
      const z = Math.sin(angle) * radius * Math.cos(incZ);

      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.7}
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
