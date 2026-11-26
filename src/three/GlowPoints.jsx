import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* Soft round, twinkling, additive star points (default points are square). */
const vertex = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uScale;
  uniform float uTwinkle;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vColor = aColor;
    vTw = 1.0 - uTwinkle + uTwinkle * (0.5 + 0.5 * sin(uTime * (0.6 + aSeed * 2.4) + aSeed * 60.0));
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = max(aSize * uScale / -mv.z, 1.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vTw;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float glow = pow(1.0 - d, 2.4);
    float hot  = smoothstep(0.3, 0.0, d);
    vec3 col = mix(vColor, vec3(1.0), hot * 0.75);
    float a = (glow + hot * 0.6) * vTw;
    gl_FragColor = vec4(col, a);
  }
`;

export default function GlowPoints({ data, scale = 20, twinkle = 0.35, ...rest }) {
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uScale: { value: scale }, uTwinkle: { value: twinkle } }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFrame(({ clock, gl }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uScale.value = scale * gl.getPixelRatio();
    uniforms.uTwinkle.value = twinkle;
  });

  return (
    <points frustumCulled={false} {...rest}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* helpers shared by the scenes */
export const gauss = () =>
  (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.732;

export function makeBuffers(count) {
  return {
    positions: new Float32Array(count * 3),
    colors: new Float32Array(count * 3),
    sizes: new Float32Array(count),
    seeds: Float32Array.from({ length: count }, Math.random),
  };
}