import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox, Text } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

/** A single component layer in the exploded view */
const ComponentLayer = ({
  position,
  color,
  emissive,
  label,
  size = [2.2, 0.15, 1.2] as [number, number, number],
}: {
  position: [number, number, number];
  color: string;
  emissive?: string;
  label: string;
  size?: [number, number, number];
}) => (
  <group position={position}>
    <RoundedBox args={size} radius={0.05} smoothness={4}>
      <meshPhysicalMaterial
        color={color}
        emissive={emissive || color}
        emissiveIntensity={emissive ? 0.4 : 0.05}
        metalness={0.6}
        roughness={0.2}
        clearcoat={0.5}
        transparent
        opacity={0.9}
      />
    </RoundedBox>
  </group>
);

/** Animated exploded phone view driven by scroll progress */
const ExplodedPhone = ({ progress }: { progress: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  // Spread factor based on scroll
  const spread = progress * 2.5;

  return (
    <group ref={groupRef} scale={0.9}>
      {/* Back cover */}
      <ComponentLayer position={[0, -spread * 1.2, 0]} color="#374151" label="Back Cover" />
      {/* Battery */}
      <ComponentLayer position={[0, -spread * 0.6, 0]} color="#059669" emissive="#10b981" label="Battery" size={[1.8, 0.2, 0.9]} />
      {/* Main board / Chip */}
      <ComponentLayer position={[0, 0, 0]} color="#1e40af" emissive="#3b82f6" label="NovaTech A1 Chip" size={[2, 0.12, 1.1]} />
      {/* Camera module */}
      <ComponentLayer position={[-0.5, spread * 0.4, 0]} color="#1f2937" label="Camera Array" size={[0.8, 0.15, 0.8]} />
      {/* Display */}
      <ComponentLayer position={[0, spread * 0.9, 0]} color="#1a73e8" emissive="#3b82f6" label="AMOLED Display" />
      {/* Glass front */}
      <ComponentLayer position={[0, spread * 1.4, 0]} color="#94a3b8" label="Ceramic Shield" size={[2.3, 0.06, 1.25]} />
    </group>
  );
};

const ExplodedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  return (
    <section
      id="exploded"
      ref={sectionRef}
      className="relative min-h-[120vh] section-padding flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm tracking-widest uppercase mb-4"
          >
            Ingeniería interna
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Cada componente,{" "}
            <span className="gradient-text">una obra maestra</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed"
          >
            Desliza para explorar las capas internas del Nova X1. Desde el Ceramic Shield
            hasta la batería de grafeno, cada pieza está diseñada para la excelencia.
          </motion.p>

          <div className="space-y-4">
            {[
              { label: "Ceramic Shield", desc: "Protección extrema" },
              { label: "Pantalla AMOLED", desc: "6.8\" 120Hz HDR10+" },
              { label: "Chip NovaTech A1", desc: "5nm, 6 núcleos" },
              { label: "Batería Grafeno", desc: "5500mAh, carga 0-100 en 25min" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div>
                  <span className="text-foreground font-medium text-sm">{item.label}</span>
                  <span className="text-muted-foreground text-sm ml-2">— {item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3D exploded view */}
        <motion.div className="h-[500px] lg:h-[600px]">
          <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
            <ambientLight intensity={0.3} />
            <spotLight position={[5, 5, 5]} intensity={1} color="#3b82f6" angle={0.3} penumbra={0.8} />
            <pointLight position={[-3, -2, 3]} intensity={0.4} color="#60a5fa" />
            <Suspense fallback={null}>
              <ExplodedPhoneWrapper scrollProgress={progress} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

/** Wrapper to read motion value inside Canvas */
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";

const ExplodedPhoneWrapper = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollProgress, "change", (v) => setProgress(v));
  return <ExplodedPhone progress={progress} />;
};

export default ExplodedSection;
