import { motion, useInView } from "framer-motion";
import { useRef, useState, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import ColorPicker from "./ColorPicker";

const HeadphonesModel = ({ mouseX = 0, color = "#1a1a1a" }: { mouseX?: number; color?: string }) => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouseX * 0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08, 0.04);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 1.1, 0]}><torusGeometry args={[0.9, 0.08, 16, 48, Math.PI]} /><meshPhysicalMaterial color={color} metalness={0.6} roughness={0.2} clearcoat={1} /></mesh>
      <mesh position={[0, 1.18, 0]}><torusGeometry args={[0.9, 0.05, 8, 48, Math.PI]} /><meshPhysicalMaterial color="#333" roughness={0.8} /></mesh>
      <group position={[-0.9, 0.2, 0]}>
        <mesh><cylinderGeometry args={[0.45, 0.45, 0.25, 32]} /><meshPhysicalMaterial color={color} metalness={0.4} roughness={0.15} clearcoat={1} /></mesh>
        <mesh position={[0, 0, 0.13]}><torusGeometry args={[0.35, 0.1, 16, 32]} /><meshPhysicalMaterial color="#222" roughness={0.9} /></mesh>
        <mesh position={[0, 0, -0.13]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[0.15, 32]} /><meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={1.5} metalness={0.8} /></mesh>
      </group>
      <group position={[0.9, 0.2, 0]}>
        <mesh><cylinderGeometry args={[0.45, 0.45, 0.25, 32]} /><meshPhysicalMaterial color={color} metalness={0.4} roughness={0.15} clearcoat={1} /></mesh>
        <mesh position={[0, 0, 0.13]}><torusGeometry args={[0.35, 0.1, 16, 32]} /><meshPhysicalMaterial color="#222" roughness={0.9} /></mesh>
        <mesh position={[0, 0, -0.13]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[0.15, 32]} /><meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={1.5} metalness={0.8} /></mesh>
      </group>
      <mesh position={[-0.88, 0.65, 0]}><boxGeometry args={[0.06, 0.6, 0.06]} /><meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} /></mesh>
      <mesh position={[0.88, 0.65, 0]}><boxGeometry args={[0.06, 0.6, 0.06]} /><meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} /></mesh>
    </group>
  );
};

const specs = [
  { label: "Driver", value: "50mm Neodimio" },
  { label: "Respuesta", value: "4Hz – 40kHz" },
  { label: "ANC", value: "Híbrido Adaptativo" },
  { label: "Batería", value: "60h continuas" },
  { label: "Carga", value: "USB-C rápida" },
  { label: "Peso", value: "250g ultraligero" },
];

const HeadphonesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [mouseX, setMouseX] = useState(0);
  const [color, setColor] = useState("#1a1a1a");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 2);
  }, []);

  return (
    <section id="headphones" ref={ref} className="relative min-h-screen section-padding" onMouseMove={handleMouseMove}>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Inmersión Total</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">FepBand</span><br /><span className="text-foreground">Max</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="text-muted-foreground text-lg mb-4 max-w-md">
            Diadema over-ear con cancelación de ruido híbrida y audio espacial. Diseñada para sesiones prolongadas con máximo confort.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}>
            <ColorPicker selected={color} onChange={setColor} />
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
            {specs.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.08 }} className="glass rounded-xl p-4 text-center hover-scale">
                <p className="text-primary text-lg font-bold font-display">{s.value}</p>
                <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="h-[400px] lg:h-[500px]">
          <Canvas camera={{ position: [0, 0.5, 4], fov: 38 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[3, 4, 5]} intensity={1.2} angle={0.4} penumbra={0.8} color="#3b82f6" />
            <spotLight position={[-3, 2, 4]} intensity={0.5} color="#93c5fd" />
            <Suspense fallback={null}>
              <HeadphonesModel mouseX={mouseX} color={color} />
              <ContactShadows position={[0, -0.8, 0]} opacity={0.3} blur={2} scale={5} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default HeadphonesSection;
