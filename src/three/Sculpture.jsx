import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GlowPoints, { gauss, makeBuffers } from './GlowPoints';

const R = 4.6;          // galaxy radius
const ARMS = 2;         // two major arms, like the Milky Way
const WIND = 0.78;      // how tightly the arms wind

const armAngle = (arm, r) => (arm / ARMS) * Math.PI * 2 + r * WIND;
const C = (hex) => new THREE.Color(hex);

function buildGalaxy(count) {
  const d = makeBuffers(count);
  const warm = C('#ffcf8a'), cream = C('#fff1da'), yellow = C('#ffe0b0');
  const blue = C('#9fc2ff'), pink = C('#ff6fb5'), ice = C('#cfe4ff');
  const c = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    let x, y, z, size;

    if (roll < 0.2) {
      // central bulge: dense, warm, slightly flattened
      const b = Math.abs(gauss()) * 0.42;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      x = b * Math.sin(ph) * Math.cos(th);
      y = b * Math.cos(ph) * 0.55;
      z = b * Math.sin(ph) * Math.sin(th);
      c.copy(warm).lerp(cream, Math.random());
      size = 0.5 + Math.random() * 0.6;
    } else {
      const r = Math.min(-Math.log(1 - Math.random()) * 1.25 + 0.25, R);
      const inArm = roll < 0.8;                       // 60% arms, 20% diffuse disc
      const a = inArm
        ? armAngle(Math.floor(Math.random() * ARMS), r) + gauss() * 0.26
        : Math.random() * Math.PI * 2;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
      y = gauss() * 0.05 * (1 + r * 0.12);

      const t = r / R;
      c.copy(yellow).lerp(blue, Math.min(1, t * 1.25));
      if (!inArm) c.multiplyScalar(0.5);
      size = 0.35 + Math.random() * 0.55;

      if (inArm) {
        const s = Math.random();
        if (s < 0.03) { c.copy(pink); size = 1.6 + Math.random() * 0.9; }         // star-forming regions
        else if (s < 0.05) { c.copy(ice); size = 2.0 + Math.random() * 1.2; }     // young blue giants
      }
    }
    d.positions.set([x, y, z], i * 3);
    d.colors.set([c.r, c.g, c.b], i * 3);
    d.sizes[i] = size;
  }
  return d;
}

function makeGlowTexture() {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 128;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.3)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(cv);
}

/* Soft gas clouds along the arms + the core glow */
function Nebulae({ isMobile }) {
  const tex = useMemo(makeGlowTexture, []);
  const clouds = useMemo(() => {
    const palette = ['#ff5fa8', '#6fa8ff', '#9a6bff', '#ff8ad8'];
    return Array.from({ length: isMobile ? 16 : 30 }, () => {
      const r = 1.1 + Math.random() * 3.2;
      const a = armAngle(Math.floor(Math.random() * ARMS), r) + gauss() * 0.14;
      return {
        pos: [Math.cos(a) * r, gauss() * 0.04, Math.sin(a) * r],
        scale: 0.9 + Math.random() * 1.1,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: 0.09 + Math.random() * 0.1,
      };
    });
  }, [isMobile]);

  const mat = (color, opacity) => (
    <spriteMaterial map={tex} color={color} opacity={opacity} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
  );

  return (
    <group>
      {clouds.map((n, i) => (
        <sprite key={i} position={n.pos} scale={[n.scale, n.scale, 1]}>{mat(n.color, n.opacity)}</sprite>
      ))}
      <sprite scale={[2.4, 2.4, 1]}>{mat('#ffd9a0', 0.7)}</sprite>
      <sprite scale={[6, 6, 1]}>{mat('#b69cff', 0.14)}</sprite>
    </group>
  );
}

export default function Sculpture({ mouse, reduced = false, isMobile = false }) {
  const group = useRef();
  const spin = useRef();
  const data = useMemo(() => buildGalaxy(isMobile ? 22000 : 65000), [isMobile]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const k = Math.min(1, delta * 2.5);
    group.current.rotation.x += (1.05 + mouse.current.y * 0.2 - group.current.rotation.x) * k;
    group.current.rotation.z += (0.25 + mouse.current.x * 0.12 - group.current.rotation.z) * k;
    if (!reduced && spin.current) spin.current.rotation.y = state.clock.elapsedTime * 0.035;
  });

  return (
    <group ref={group} scale={isMobile ? 0.62 : 0.8}>
      <group ref={spin}>
        <GlowPoints data={data} scale={22} twinkle={reduced ? 0 : 0.3} />
        <Nebulae isMobile={isMobile} />
      </group>
    </group>
  );
}