import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import GlowPoints, { gauss, makeBuffers } from '../three/GlowPoints';

const TEMPS = ['#aac4ff', '#dbe6ff', '#ffffff', '#fff1d6', '#ffd2a1', '#ffae86'];

/* Scattered stars with real colour temperatures */
function buildStars(count) {
  const d = makeBuffers(count);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const r = 60 + Math.random() * 50;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    d.positions.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
    c.set(TEMPS[Math.floor(Math.pow(Math.random(), 1.3) * TEMPS.length)]);
    d.colors.set([c.r, c.g, c.b], i * 3);
    d.sizes[i] = Math.random() < 0.04 ? 0.9 + Math.random() * 0.6 : 0.18 + Math.random() * 0.3;
  }
  return d;
}

/* A dense, faint band of distant stars = our own Milky Way */
function buildMilkyWay(count) {
  const d = makeBuffers(count);
  const c = new THREE.Color();
  const m = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.7, 0.2, 0.45));
  const v = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const lat = gauss() * 0.13;
    const r = 95;
    v.set(Math.cos(a) * Math.cos(lat), Math.sin(lat), Math.sin(a) * Math.cos(lat)).multiplyScalar(r).applyMatrix4(m);
    d.positions.set([v.x, v.y, v.z], i * 3);
    c.set(Math.random() < 0.7 ? '#c9d6ff' : '#ffe2c0').multiplyScalar(0.55);
    d.colors.set([c.r, c.g, c.b], i * 3);
    d.sizes[i] = 0.1 + Math.random() * 0.18;
  }
  return d;
}

function Rig({ reduced, isMobile }) {
  const g = useRef();
  const stars = useMemo(() => buildStars(isMobile ? 2500 : 5000), [isMobile]);
  const band = useMemo(() => buildMilkyWay(isMobile ? 7000 : 16000), [isMobile]);

  useFrame((state) => {
    if (!g.current) return;
    const y = window.scrollY;
    const t = reduced ? 0 : state.clock.elapsedTime;
    g.current.rotation.y = y * 0.00026 + t * 0.006;
    g.current.rotation.x = y * 0.0001;
  });

  return (
    <group ref={g}>
      <GlowPoints data={stars} scale={420} twinkle={reduced ? 0 : 0.45} />
      <GlowPoints data={band} scale={420} twinkle={0} />
    </group>
  );
}

export default function GalaxyBackground() {
  const reduced = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
  return (
    <div className="galaxy-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
        <Suspense fallback={null}>
          <Rig reduced={reduced} isMobile={isMobile} />
        </Suspense>
      </Canvas>
      {!reduced && (
        <>
          <span className="shooting-star" style={{ top: '14%', left: '78%', animationDelay: '3s' }} />
          <span className="shooting-star" style={{ top: '46%', left: '92%', animationDelay: '8s' }} />
        </>
      )}
    </div>
  );
}