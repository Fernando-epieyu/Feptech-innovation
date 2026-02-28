import { useState, Suspense, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import EarbudsModel from "./EarbudsModel";
import ColorPicker from "./ColorPicker";

const features = [
  { title: "Cancelación de Ruido", desc: "ANC adaptativo con 3 niveles de inmersión total." },
  { title: "Audio Espacial", desc: "Sonido 3D envolvente con seguimiento de cabeza." },
  { title: "40h Batería", desc: "Hasta 10h continuas + 30h con el estuche de carga." },
  { title: "Resistencia IPX5", desc: "Protección contra agua y sudor." },
];

const EarbudsSection = () => {
  const [mouseX, setMouseX] = useState(0);
  const [color, setColor] = useState("#f0f0f0");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 2);
  }, []);

  return (
    <section id="earbuds" ref={ref} className="relative min-h-screen section-padding" onMouseMove={handleMouseMove}>
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="h-[400px] lg:h-[500px] order-2 lg:order-1">
          <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[3, 4, 5]} intensity={1.2} angle={0.4} penumbra={0.8} color="#3b82f6" />
            <spotLight position={[-3, 2, 4]} intensity={0.6} color="#93c5fd" />
            <Suspense fallback={null}>
              <EarbudsModel mouseX={mouseX} color={color} />
              <ContactShadows position={[0, -1.5, 0]} opacity={0.3} blur={2} scale={6} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Audio Premium</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">FepPods</span><br /><span className="text-foreground">Ultra</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="text-muted-foreground text-lg mb-4 max-w-md">
            Diseñados para quienes no aceptan menos que la perfección sonora.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}>
            <ColorPicker selected={color} onChange={setColor} />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }} className="glass rounded-xl p-5 hover-scale">
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

export default EarbudsSection;
