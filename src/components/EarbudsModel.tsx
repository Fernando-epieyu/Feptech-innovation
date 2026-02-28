import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Earbud = ({ position, rotation, color = "#f0f0f0" }: { position: [number, number, number]; rotation: [number, number, number]; color?: string }) => (
  <group position={position} rotation={rotation}>
    <mesh><sphereGeometry args={[0.45, 32, 32]} /><meshPhysicalMaterial color={color} metalness={0.2} roughness={0.1} clearcoat={1} clearcoatRoughness={0.05} /></mesh>
    <mesh position={[0, -0.7, 0]}><capsuleGeometry args={[0.12, 0.6, 16, 16]} /><meshPhysicalMaterial color={color} metalness={0.3} roughness={0.1} clearcoat={1} /></mesh>
    <mesh position={[0, 0, 0.42]}><circleGeometry args={[0.2, 32]} /><meshPhysicalMaterial color="#333" metalness={0.8} roughness={0.3} /></mesh>
    <mesh position={[0, 0.15, 0.43]}><circleGeometry args={[0.04, 16]} /><meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={2} /></mesh>
  </group>
);

const EarbudsModel = ({ mouseX = 0, color = "#f0f0f0" }: { mouseX?: number; color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1, 0.05);
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Earbud position={[-0.7, 0, 0]} rotation={[0.2, 0.3, 0.1]} color={color} />
      <Earbud position={[0.7, 0, 0]} rotation={[0.2, -0.3, -0.1]} color={color} />
    </group>
  );
};

export default EarbudsModel;
