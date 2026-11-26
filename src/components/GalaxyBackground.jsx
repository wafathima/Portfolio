import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';

/* Star field that drifts and turns with page scroll */
function Rig({ reduced }) {
  const g = useRef();
  useFrame((state) => {
    if (!g.current) return;
    const y = window.scrollY;
    const t = reduced ? 0 : state.clock.getElapsedTime();
    g.current.rotation.y = y * 0.00028 + t * 0.008;
    g.current.rotation.x = y * 0.00012;
  });
  return (
    <group ref={g}>
      <Stars radius={60} depth={50} count={4500} factor={3.2} saturation={0.6} fade speed={reduced ? 0 : 0.8} />
    </group>
  );
}

export default function GalaxyBackground() {
  const reduced = useReducedMotion();
  return (
    <div className="galaxy-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
        <Suspense fallback={null}>
          <Rig reduced={reduced} />
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