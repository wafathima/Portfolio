// //lights
// import { Environment } from '@react-three/drei';

// export default function Lights({ isMobile = false }) {
//   return (
//     <>
//       <ambientLight intensity={0.2} />
//       <directionalLight
//         position={[5, 8, 5]}
//         intensity={1.4}
//         color="#ffffff"
//         castShadow={!isMobile}
//         shadow-mapSize={isMobile ? [512, 512] : [2048, 2048]}
//       />
//       <pointLight position={[-7, -4, -5]} intensity={3.2} color="#7DF9FF" distance={25} decay={2} />
//       <pointLight position={[7, 4, -3]} intensity={2.6} color="#B69CFF" distance={25} decay={2} />
//       <spotLight
//         position={[0, 10, 5]}
//         angle={0.5}
//         penumbra={1}
//         intensity={2}
//         color="#7DF9FF"
//         distance={35}
//       />
//       <Environment preset="night" />
//     </>
//   );
// }

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#6a5cff" />
      <pointLight position={[0, 0, 0]} intensity={6} color="#ffd9a0" distance={14} decay={2} />
      <pointLight position={[-6, 3, 4]} intensity={2.4} color="#8BE9FF" distance={24} decay={2} />
      <pointLight position={[6, -3, 3]} intensity={2.2} color="#FF8AD8" distance={24} decay={2} />
    </>
  );
}