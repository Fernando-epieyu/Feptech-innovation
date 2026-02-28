import { useState, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import PhoneModel from "./PhoneModel";
import ColorPicker from "./ColorPicker";

const HeroSection = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#111827");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 section-padding pt-32">
        <div className="flex flex-col justify-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            El futuro en tus manos
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            <span className="gradient-text">Fep X1</span><br /><span className="text-foreground">Pro Series</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-muted-foreground text-lg max-w-md mb-4 leading-relaxed">
            Ingeniería de precisión. Pantalla AMOLED 6.8" 120Hz. Chip FepTech A1. La perfección no es un accidente.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <ColorPicker selected={color} onChange={setColor} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-4 mt-8">
            <a href="#contact" className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover-scale animate-pulse-glow">Comprar ahora</a>
            <a href="#specs" className="px-8 py-3.5 rounded-full glass text-foreground font-medium hover-scale">Especificaciones</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="h-[500px] lg:h-[600px]">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <spotLight position={[5, 5, 5]} intensity={1} angle={0.3} penumbra={0.8} color="#3b82f6" />
            <spotLight position={[-5, 3, 5]} intensity={0.5} color="#60a5fa" />
            <pointLight position={[0, -3, 3]} intensity={0.3} color="#1d4ed8" />
            <Suspense fallback={null}>
              <PhoneModel mouseX={mouse.x} mouseY={mouse.y} color={color} />
              <ContactShadows position={[0, -3, 0]} opacity={0.4} blur={2.5} scale={10} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-1 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
