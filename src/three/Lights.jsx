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