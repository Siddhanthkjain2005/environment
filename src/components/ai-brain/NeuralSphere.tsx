'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Fibonacci Sphere Points ────────────────────────────────── */

function generateFibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenRatio = Math.PI * (1 + Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = goldenRatio * i;

    positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = radius * Math.cos(theta);
  }

  return positions;
}

/* ─── Neural Nodes (Points) ──────────────────────────────────── */

function NeuralNodes() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => generateFibonacciSphere(300, 2), []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00FF88"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Wireframe Shell ────────────────────────────────────────── */

function WireframeShell() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 3]} />
      <meshBasicMaterial
        color="#00FF88"
        wireframe
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ─── Glowing Core ───────────────────────────────────────────── */

function GlowingCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.4 + Math.sin(clock.getElapsedTime() * 0.8) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#003322"
        emissive="#00FF88"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ─── Energy Pulse ───────────────────────────────────────────── */

interface EnergyPulseProps {
  speed: number;
  offset: number;
  axisX: number;
  axisY: number;
  axisZ: number;
}

function EnergyPulse({ speed, offset, axisX, axisY, axisZ }: EnergyPulseProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  /* Precompute a rotation axis for this pulse's great-circle */
  const axis = useMemo(() => {
    return new THREE.Vector3(axisX, axisY, axisZ).normalize();
  }, [axisX, axisY, axisZ]);

  const baseDir = useMemo(() => {
    const perp = new THREE.Vector3(1, 0, 0);
    if (Math.abs(axis.dot(perp)) > 0.9) {
      perp.set(0, 1, 0);
    }
    return perp.cross(axis).normalize().multiplyScalar(2);
  }, [axis]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    const pos = baseDir
      .clone()
      .applyAxisAngle(axis, t);
    meshRef.current.position.copy(pos);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color="#00E5FF"
        emissive="#00E5FF"
        emissiveIntensity={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/* ─── Pulse Set ──────────────────────────────────────────────── */

function EnergyPulses() {
  const pulses = useMemo(() => {
    const result: EnergyPulseProps[] = [];
    for (let i = 0; i < 10; i++) {
      const theta = Math.random() * Math.PI;
      const phi = Math.random() * Math.PI * 2;
      result.push({
        speed: 0.4 + Math.random() * 0.6,
        offset: Math.random() * Math.PI * 2,
        axisX: Math.sin(theta) * Math.cos(phi),
        axisY: Math.sin(theta) * Math.sin(phi),
        axisZ: Math.cos(theta),
      });
    }
    return result;
  }, []);

  return (
    <>
      {pulses.map((p, i) => (
        <EnergyPulse key={i} {...p} />
      ))}
    </>
  );
}

/* ─── Scene Content ──────────────────────────────────────────── */

function SphereScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00FF88" distance={12} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#00E5FF" distance={10} />

      <WireframeShell />
      <GlowingCore />
      <NeuralNodes />
      <EnergyPulses />
    </>
  );
}

/* ─── Exported Component ─────────────────────────────────────── */

export default function NeuralSphere() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-16 w-16 rounded-full border-2 border-[rgba(0,255,136,0.2)] border-t-[#00FF88]" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <SphereScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
