//scene3d
import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import Lights from './Lights';
import Sculpture from './Sculpture';
import Particles from './Particles';
import SceneFallback from './SceneFallback';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

export default function Scene3D({ reduced = false }) {
  const [webgl, setWebgl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    setWebgl(hasWebGL());
    const mql = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  const dpr = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.85);
  }, [isMobile]);

  if (webgl === false) {
    return <div className="scene-wrap"><SceneFallback /></div>;
  }

  return (
    <div className="scene-wrap" ref={containerRef}>
      {webgl === null && <div className="scene-loader">Loading scene</div>}
      {webgl && (
        <Canvas
          dpr={dpr}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0, 6.4], fov: 48 }}
          frameloop={visible ? 'always' : 'never'}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <Lights isMobile={isMobile} />
            <Sculpture mouse={mouse} reduced={reduced} isMobile={isMobile} />
            <Particles count={isMobile ? 140 : 320} reduced={reduced} />
            <Preload all />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
      )}
    </div>
  );
}