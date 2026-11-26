// //sculpture
// import { useRef, useMemo } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { MeshTransmissionMaterial, Icosahedron, Torus } from '@react-three/drei';
// import * as THREE from 'three';

// export default function Sculpture({ mouse, reduced = false, isMobile = false }) {
//   const group = useRef();
//   const core = useRef();
//   const ringA = useRef();
//   const ringB = useRef();
//   const ringC = useRef();
//   const target = useMemo(() => new THREE.Vector2(0, 0), []);

//   useFrame((state, delta) => {
//     if (!group.current) return;
//     const t = state.clock.getElapsedTime();

//     target.set(mouse.current.x * 0.4, mouse.current.y * 0.4);
//     const lerp = Math.min(1, delta * 3);
//     group.current.rotation.y += (target.x - group.current.rotation.y) * lerp;
//     group.current.rotation.x += (-target.y - group.current.rotation.x) * lerp;

//     if (reduced) return;

//     group.current.position.y = Math.sin(t * 0.5) * 0.15;

//     if (ringA.current) ringA.current.rotation.z = t * 0.16;
//     if (ringB.current) {
//       ringB.current.rotation.z = -t * 0.12;
//       ringB.current.rotation.x = Math.sin(t * 0.35) * 0.4;
//     }
//     if (ringC.current) {
//       ringC.current.rotation.y = t * 0.2;
//       ringC.current.rotation.x = Math.cos(t * 0.3) * 0.5;
//     }
//     if (core.current) {
//       core.current.rotation.y = t * 0.1;
//       core.current.rotation.x = t * 0.06;
//     }
//   });

//   return (
//     <group ref={group} scale={isMobile ? 1.1 : 1.55}>
//       {/* Central glass icosahedron — big dramatic focal point */}
//       <Icosahedron ref={core} args={[1.5, 0]} castShadow receiveShadow>
//         <MeshTransmissionMaterial
//           backside
//           samples={isMobile ? 4 : 8}
//           thickness={0.8}
//           chromaticAberration={0.12}
//           anisotropy={0.3}
//           distortion={0.15}
//           distortionScale={0.4}
//           temporalDistortion={0.08}
//           ior={1.44}
//           color="#eaf4ff"
//           attenuationColor="#7DF9FF"
//           attenuationDistance={2}
//           background={new THREE.Color('#06070A')}
//         />
//       </Icosahedron>

//       {/* Wireframe ghost inside */}
//       <Icosahedron args={[1.52, 1]}>
//         <meshBasicMaterial color="#7DF9FF" wireframe transparent opacity={0.12} />
//       </Icosahedron>

//       {/* Concentric rings — thinner, more elegant */}
//       <Torus ref={ringA} args={[2.4, 0.008, 16, 160]} rotation={[Math.PI / 2.4, 0, 0]}>
//         <meshStandardMaterial
//           color="#7DF9FF"
//           emissive="#7DF9FF"
//           emissiveIntensity={1.2}
//           metalness={1}
//           roughness={0.2}
//         />
//       </Torus>

//       <Torus ref={ringB} args={[2.85, 0.006, 16, 200]} rotation={[0, 0, Math.PI / 3]}>
//         <meshStandardMaterial
//           color="#B69CFF"
//           emissive="#B69CFF"
//           emissiveIntensity={1}
//           metalness={1}
//           roughness={0.25}
//         />
//       </Torus>

//       <Torus ref={ringC} args={[3.4, 0.004, 16, 220]}>
//         <meshStandardMaterial
//           color="#ffffff"
//           emissive="#7DF9FF"
//           emissiveIntensity={0.5}
//           metalness={0.9}
//           roughness={0.15}
//           transparent
//           opacity={0.6}
//         />
//       </Torus>

//       {/* Accent dots */}
//       <mesh position={[2.4, 0.5, 0]}>
//         <sphereGeometry args={[0.055, 16, 16]} />
//         <meshBasicMaterial color="#7DF9FF" />
//       </mesh>
//       <mesh position={[-2.85, -0.35, 0.5]}>
//         <sphereGeometry args={[0.04, 16, 16]} />
//         <meshBasicMaterial color="#B69CFF" />
//       </mesh>
//     </group>
//   );
// }

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* Spiral galaxy: thousands of coloured points on logarithmic arms */
function Arms({ count }) {
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const core = new THREE.Color('#ffe2b8');
    const mid = new THREE.Color('#B69CFF');
    const rim = new THREE.Color('#8BE9FF');
    const c = new THREE.Color();
    const ARMS = 3, RADIUS = 4.2, SPIN = 1.35;
    const jitter = () => Math.pow(Math.random(), 2.4) * (Math.random() < 0.5 ? 1 : -1);

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.5) * RADIUS;
      const angle = ((i % ARMS) / ARMS) * Math.PI * 2 + r * SPIN;
      const spread = 0.12 + r * 0.16;
      pos[i * 3]     = Math.cos(angle) * r + jitter() * spread * 2.2;
      pos[i * 3 + 1] = jitter() * spread * 0.9;
      pos[i * 3 + 2] = Math.sin(angle) * r + jitter() * spread * 2.2;

      const t = r / RADIUS;
      if (t < 0.5) c.copy(core).lerp(mid, t * 2);
      else c.copy(mid).lerp(rim, (t - 0.5) * 2);
      if (Math.random() < 0.06) c.set('#FF8AD8');      // rare pink nebula stars
      col.set([c.r, c.g, c.b], i * 3);
    }
    return { positions: pos, colors: col };
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Glowing galactic core built from stacked additive spheres */
function Core() {
  return (
    <group>
      {[0.28, 0.5, 0.85, 1.4].map((r, i) => (
        <mesh key={r}>
          <sphereGeometry args={[r, 32, 32]} />
          <meshBasicMaterial
            color={i < 2 ? '#fff1d6' : '#B69CFF'}
            transparent
            opacity={[0.95, 0.35, 0.14, 0.06][i]}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* A small ringed planet orbiting the galaxy */
function Planet({ reduced }) {
  const orbit = useRef();
  const planet = useRef();
  useFrame((s) => {
    if (reduced) return;
    const t = s.clock.getElapsedTime();
    orbit.current.rotation.y = t * 0.22;
    planet.current.rotation.y = t * 0.6;
  });
  return (
    <group ref={orbit}>
      <group position={[3.3, 0.35, 0]} ref={planet}>
        <mesh>
          <sphereGeometry args={[0.2, 48, 48]} />
          <meshStandardMaterial color="#8BE9FF" roughness={0.35} metalness={0.25} emissive="#2b5cff" emissiveIntensity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0, 0.3]}>
          <ringGeometry args={[0.32, 0.5, 64]} />
          <meshBasicMaterial color="#FF8AD8" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function Sculpture({ mouse, reduced = false, isMobile = false }) {
  const group = useRef();
  const spin = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const lerp = Math.min(1, delta * 2.5);
    // mouse parallax on a fixed tilt
    group.current.rotation.x += (0.95 + mouse.current.y * 0.25 - group.current.rotation.x) * lerp;
    group.current.rotation.z += (0.18 + mouse.current.x * 0.12 - group.current.rotation.z) * lerp;
    if (!reduced && spin.current) spin.current.rotation.y = state.clock.getElapsedTime() * 0.07;
  });

  return (
    <group ref={group} scale={isMobile ? 0.8 : 1.15}>
      <group ref={spin}>
        <Arms count={isMobile ? 14000 : 32000} />
        <Core />
        <Planet reduced={reduced} />
      </group>
    </group>
  );
}