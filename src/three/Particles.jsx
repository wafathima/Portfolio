
import { useMemo } from 'react';
import * as THREE from 'three';
import GlowPoints, { makeBuffers } from './GlowPoints';

/* Faint foreground dust drifting around the galaxy for depth */
export default function Particles({ count = 200, reduced = false }) {
  const data = useMemo(() => {
    const d = makeBuffers(count);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      d.positions.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.7, r * Math.sin(ph) * Math.sin(th)], i * 3);
      c.set(Math.random() < 0.5 ? '#aac4ff' : '#ffe4c4');
      d.colors.set([c.r, c.g, c.b], i * 3);
      d.sizes[i] = 0.4 + Math.random() * 0.8;
    }
    return d;
  }, [count]);

  return <GlowPoints data={data} scale={18} twinkle={reduced ? 0 : 0.5} />;
}