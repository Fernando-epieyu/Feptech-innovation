import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const PhoneModel = ({ mouseX = 0, mouseY = 0, color = "#111827" }: { mouseX?: number; mouseY?: number; color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.3, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.15, 0.05);
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[2.4, 4.8, 0.3]} radius={0.2} smoothness={8}>
        <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={1.5} />
      </RoundedBox>
      <RoundedBox args={[2.1, 4.4, 0.02]} radius={0.15} smoothness={4} position={[0, 0, 0.17]}>
        <meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={0.3} metalness={0.1} roughness={0.2} transmission={0.3} thickness={0.1} />
      </RoundedBox>
      <group position={[-0.6, 1.8, -0.18]}>
        <mesh><cylinderGeometry args={[0.35, 0.35, 0.12, 32]} /><meshPhysicalMaterial color="#1f2937" metalness={0.9} roughness={0.1} /></mesh>
        <mesh position={[0, 0, -0.03]}><cylinderGeometry args={[0.18, 0.18, 0.08, 32]} /><meshPhysicalMaterial color="#0d1117" metalness={1} roughness={0} clearcoat={1} /></mesh>
      </group>
      <group position={[-0.6, 1.1, -0.18]}>
        <mesh><cylinderGeometry args={[0.18, 0.18, 0.08, 32]} /><meshPhysicalMaterial color="#0d1117" metalness={1} roughness={0} clearcoat={1} /></mesh>
      </group>
    </group>
  );
};

export default PhoneModel;
