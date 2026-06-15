'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ────────────────────────────────────────────────
 *  Vertex Shader
 * ──────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

/* ────────────────────────────────────────────────
 *  Fragment Shader — procedural Earth
 * ──────────────────────────────────────────────── */
const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  /* simple 2-D hash / noise helpers */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    /* ----- continent mask -------------------------------- */
    vec2 uv = vUv;
    float continent = fbm(uv * vec2(6.0, 4.0) + vec2(1.3, 0.7));
    continent += 0.35 * fbm(uv * vec2(12.0, 8.0) - vec2(2.1, 1.4));
    float mask = smoothstep(0.44, 0.52, continent);

    /* ----- colours --------------------------------------- */
    vec3 deepOcean  = vec3(0.00, 0.16, 0.42);
    vec3 shallowSea = vec3(0.04, 0.28, 0.56);
    vec3 land       = vec3(0.08, 0.38, 0.18);
    vec3 highland   = vec3(0.18, 0.46, 0.22);
    vec3 desert     = vec3(0.52, 0.44, 0.28);
    vec3 ice        = vec3(0.82, 0.88, 0.94);

    /* ocean depth variation */
    float oceanDetail = fbm(uv * vec2(16.0, 10.0));
    vec3 ocean = mix(deepOcean, shallowSea, oceanDetail);

    /* land biome variation */
    float biome = fbm(uv * vec2(10.0, 6.0) + 3.0);
    vec3 landColor = mix(land, highland, smoothstep(0.35, 0.6, biome));
    landColor = mix(landColor, desert, smoothstep(0.62, 0.78, biome));

    /* polar ice caps */
    float polar = smoothstep(0.12, 0.0, uv.y) + smoothstep(0.88, 1.0, uv.y);
    landColor = mix(landColor, ice, polar * 0.8);
    ocean = mix(ocean, ice * 0.7, polar * 0.5);

    vec3 surface = mix(ocean, landColor, mask);

    /* ----- lighting (simple diffuse + ambient) ----------- */
    vec3 lightDir = normalize(vec3(1.0, 0.6, 0.8));
    float diff = max(dot(vNormal, lightDir), 0.0);
    float ambient = 0.18;
    vec3 lit = surface * (ambient + diff * 0.82);

    /* city lights on dark side */
    float nightMask = 1.0 - smoothstep(-0.05, 0.25, diff);
    float cities = step(0.78, fbm(uv * vec2(40.0, 24.0))) * mask;
    vec3 cityGlow = vec3(1.0, 0.85, 0.45) * cities * 0.6;
    lit += cityGlow * nightMask;

    /* ----- atmosphere fresnel glow ----------------------- */
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.5);
    vec3 atmosColor = vec3(0.0, 0.9, 1.0); /* cyan */
    lit += atmosColor * fresnel * 0.55;

    gl_FragColor = vec4(lit, 1.0);
  }
`;

/* ────────────────────────────────────────────────
 *  Atmosphere glow shell
 * ──────────────────────────────────────────────── */
const atmosVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const atmosFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.8);
    vec3 color = mix(vec3(0.0, 1.0, 0.53), vec3(0.0, 0.9, 1.0), fresnel);
    float alpha = fresnel * 0.45;
    gl_FragColor = vec4(color, alpha);
  }
`;

/* ────────────────────────────────────────────────
 *  Component
 * ──────────────────────────────────────────────── */
export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosRef = useRef<THREE.Mesh>(null);

  const earthMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { uTime: { value: 0 } },
      }),
    [],
  );

  const atmosMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosVertexShader,
        fragmentShader: atmosFragmentShader,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [],
  );

  useFrame((_state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
    if (atmosRef.current) {
      atmosRef.current.rotation.y += delta * 0.05;
    }
    earthMat.uniforms.uTime.value += delta;
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef} material={earthMat}>
        <sphereGeometry args={[1.5, 64, 64]} />
      </mesh>

      {/* Atmosphere glow shell */}
      <mesh ref={atmosRef} material={atmosMat}>
        <sphereGeometry args={[1.62, 64, 64]} />
      </mesh>
    </group>
  );
}
