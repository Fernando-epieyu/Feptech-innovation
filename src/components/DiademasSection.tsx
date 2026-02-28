import { motion, useInView } from "framer-motion";
import { useRef, useState, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import ColorPicker from "./ColorPicker";

/* ---------- 3D Diadema Model (more complete) ---------- */
const DiademaModel = ({ mouseX = 0, color = "#111827" }: { mouseX?: number; color?: string }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouseX * 0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08,
      0.04
    );
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <group ref={group}>
      {/* Main headband arc - outer shell */}
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.15, 0.07, 16, 64, Math.PI]} />
        <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      {/* Headband inner padding */}
      <mesh position={[0, 1.05, 0]}>
        <torusGeometry args={[1.08, 0.045, 12, 64, Math.PI]} />
        <meshPhysicalMaterial color="#3a3a3a" roughness={0.95} />
      </mesh>
      {/* Headband top cushion */}
      <mesh position={[0, 1.12, 0]}>
        <torusGeometry args={[0.6, 0.035, 8, 32, Math.PI]} />
        <meshPhysicalMaterial color="#444" roughness={0.9} />
      </mesh>

      {/* Left slider arm */}
      <mesh position={[-1.12, 0.55, 0]}>
        <boxGeometry args={[0.045, 0.75, 0.045]} />
        <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Left slider detail */}
      <mesh position={[-1.12, 0.35, 0.03]}>
        <boxGeometry args={[0.02, 0.25, 0.01]} />
        <meshPhysicalMaterial color="#555" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Right slider arm */}
      <mesh position={[1.12, 0.55, 0]}>
        <boxGeometry args={[0.045, 0.75, 0.045]} />
        <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Right slider detail */}
      <mesh position={[1.12, 0.35, 0.03]}>
        <boxGeometry args={[0.02, 0.25, 0.01]} />
        <meshPhysicalMaterial color="#555" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Left ear cup - outer shell */}
      <group position={[-1.12, -0.05, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 0.14, 48]} />
          <meshPhysicalMaterial color={color} metalness={0.4} roughness={0.12} clearcoat={1} clearcoatRoughness={0.05} />
        </mesh>
        {/* Ear cup rim */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.42, 0.02, 16, 48]} />
          <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} />
        </mesh>
        {/* Ear cushion */}
        <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.32, 0.09, 16, 48]} />
          <meshPhysicalMaterial color="#2a2a2a" roughness={0.95} />
        </mesh>
        {/* Inner mesh grille */}
        <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <circleGeometry args={[0.24, 48]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
        </mesh>
        {/* LED accent ring */}
        <mesh position={[-0.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.35, 0.012, 16, 48]} />
          <meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={1.5} metalness={0.9} />
        </mesh>
        {/* Brand logo circle */}
        <mesh position={[-0.076, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <circleGeometry args={[0.12, 48]} />
          <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1} />
        </mesh>
        {/* Hinge joint */}
        <mesh position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.15} />
        </mesh>
      </group>

      {/* Right ear cup - outer shell */}
      <group position={[1.12, -0.05, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 0.14, 48]} />
          <meshPhysicalMaterial color={color} metalness={0.4} roughness={0.12} clearcoat={1} clearcoatRoughness={0.05} />
        </mesh>
        {/* Ear cup rim */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.42, 0.02, 16, 48]} />
          <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} />
        </mesh>
        {/* Ear cushion */}
        <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.32, 0.09, 16, 48]} />
          <meshPhysicalMaterial color="#2a2a2a" roughness={0.95} />
        </mesh>
        {/* Inner mesh grille */}
        <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <circleGeometry args={[0.24, 48]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
        </mesh>
        {/* LED accent ring */}
        <mesh position={[0.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.35, 0.012, 16, 48]} />
          <meshPhysicalMaterial color="#1a73e8" emissive="#1a73e8" emissiveIntensity={1.5} metalness={0.9} />
        </mesh>
        {/* Brand logo circle */}
        <mesh position={[0.076, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <circleGeometry args={[0.12, 48]} />
          <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1} />
        </mesh>
        {/* Hinge joint */}
        <mesh position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.15} />
        </mesh>
      </group>
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="h-[350px] sm:h-[400px] lg:h-[500px]"
        >
          <Canvas camera={{ position: [0, 0.5, 3.5], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[3, 4, 5]} intensity={1.2} angle={0.4} penumbra={0.8} color="#3b82f6" />
            <spotLight position={[-3, 2, 4]} intensity={0.5} color="#93c5fd" />
            <pointLight position={[0, -1, 3]} intensity={0.3} color="#60a5fa" />
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
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="gradient-text">FepBand</span>
            <br />
            <span className="text-foreground">Lite</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-base sm:text-lg mb-6 max-w-md"
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
                className="glass rounded-xl p-4 sm:p-5 hover-scale"
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
