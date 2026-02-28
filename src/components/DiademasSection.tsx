import { motion, useInView } from "framer-motion";
import { useRef, useState, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import ColorPicker from "./ColorPicker";

/* ---------- 3D Diadema Model ---------- */
const DiademaModel = ({ mouseX = 0, color = "#111827" }: { mouseX?: number; color?: string }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouseX * 0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08,
      0.04
    );
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Headband arc */}
      <mesh position={[0, 1.0, 0]}>
        <torusGeometry args={[1.1, 0.06, 16, 48, Math.PI]} />
        <meshPhysicalMaterial color={color} metalness={0.5} roughness={0.2} clearcoat={1} />
      </mesh>
      {/* Padded top */}
      <mesh position={[0, 1.06, 0]}>
        <torusGeometry args={[1.1, 0.04, 8, 48, Math.PI]} />
        <meshPhysicalMaterial color="#444" roughness={0.9} />
      </mesh>
      {/* Left ear pad - flat on-ear style */}
      <group position={[-1.08, 0.0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.38, 0.12, 32]} />
          <meshPhysicalMaterial color={color} metalness={0.3} roughness={0.15} clearcoat={1} />
        </mesh>
        <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.28, 0.08, 16, 32]} />
          <meshPhysicalMaterial color="#333" roughness={0.95} />
        </mesh>
        {/* Accent ring */}
        <mesh position={[-0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.32, 0.015, 16, 32]} />
          <meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={1.2} metalness={0.9} />
        </mesh>
      </group>
      {/* Right ear pad */}
      <group position={[1.08, 0.0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.38, 0.12, 32]} />
          <meshPhysicalMaterial color={color} metalness={0.3} roughness={0.15} clearcoat={1} />
        </mesh>
        <mesh position={[-0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.28, 0.08, 16, 32]} />
          <meshPhysicalMaterial color="#333" roughness={0.95} />
        </mesh>
        <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.32, 0.015, 16, 32]} />
          <meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={1.2} metalness={0.9} />
        </mesh>
      </group>
      {/* Connecting arms */}
      <mesh position={[-1.06, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[1.06, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
};

/* ---------- Features ---------- */
const features = [
  { title: "On-Ear Ligeras", desc: "Diseño ultra-liviano de 180g para uso prolongado sin fatiga." },
  { title: "Audio Hi-Res", desc: "Drivers de 40mm con certificación Hi-Res Audio." },
  { title: "Plegables", desc: "Diseño plegable compacto para llevar a todas partes." },
  { title: "30h Batería", desc: "Reproducción continua de hasta 30 horas con carga rápida." },
];

const DiademasSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [mouseX, setMouseX] = useState(0);
  const [color, setColor] = useState("#111827");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 2);
  }, []);

  return (
    <section
      id="diademas"
      ref={ref}
      className="relative min-h-screen section-padding"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="h-[400px] lg:h-[500px]"
        >
          <Canvas camera={{ position: [0, 0.5, 4], fov: 38 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[3, 4, 5]} intensity={1.2} angle={0.4} penumbra={0.8} color="#3b82f6" />
            <spotLight position={[-3, 2, 4]} intensity={0.5} color="#93c5fd" />
            <Suspense fallback={null}>
              <DiademaModel mouseX={mouseX} color={color} />
              <ContactShadows position={[0, -0.8, 0]} opacity={0.3} blur={2} scale={5} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-primary text-sm font-medium tracking-widest uppercase mb-4"
          >
            Estilo y Sonido
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="gradient-text">FepBand</span>
            <br />
            <span className="text-foreground">Lite</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-6 max-w-md"
          >
            Diadema on-ear ultraligera con audio Hi-Res y diseño plegable. Perfecta para el día a día con máximo estilo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
          >
            <ColorPicker selected={color} onChange={setColor} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass rounded-xl p-5 hover-scale"
              >
                <h3 className="text-foreground font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiademasSection;
