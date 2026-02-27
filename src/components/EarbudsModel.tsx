import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Single earbud built from primitives */
const Earbud = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => (
  <group position={position} rotation={rotation}>
    {/* Main body */}
    <mesh>
      <sphereGeometry args={[0.45, 32, 32]} />
      <meshPhysicalMaterial color="#f0f0f0" metalness={0.2} roughness={0.1} clearcoat={1} clearcoatRoughness={0.05} />
    </mesh>
    {/* Stem */}
    <mesh position={[0, -0.7, 0]}>
      <capsuleGeometry args={[0.12, 0.6, 16, 16]} />
      <meshPhysicalMaterial color="#e8e8e8" metalness={0.3} roughness={0.1} clearcoat={1} />
    </mesh>
    {/* Speaker mesh */}
    <mesh position={[0, 0, 0.42]}>
      <circleGeometry args={[0.2, 32]} />
      <meshPhysicalMaterial color="#333" metalness={0.8} roughness={0.3} />
    </mesh>
    {/* Sensor dot */}
    <mesh position={[0, 0.15, 0.43]}>
      <circleGeometry args={[0.04, 16]} />
      <meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={2} />
    </mesh>
  </group>
);

const EarbudsModel = ({ mouseX = 0 }: { mouseX?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX * 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1,
      0.05
    );
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Earbud position={[-0.7, 0, 0]} rotation={[0.2, 0.3, 0.1]} />
      <Earbud position={[0.7, 0, 0]} rotation={[0.2, -0.3, -0.1]} />
    </group>
  );
};

export default EarbudsModel;
