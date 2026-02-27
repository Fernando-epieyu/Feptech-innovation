import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Battery, Monitor, Camera, Wifi, Shield } from "lucide-react";

const specs = [
  { icon: Monitor, label: "Pantalla", value: '6.8" AMOLED 120Hz', detail: "2K+ · HDR10+ · 2000 nits" },
  { icon: Cpu, label: "Procesador", value: "NovaTech A1", detail: "5nm · 6 núcleos · 3.5GHz" },
  { icon: Camera, label: "Cámara", value: "200MP Triple", detail: "OIS · Zoom óptico 10x" },
  { icon: Battery, label: "Batería", value: "5500mAh", detail: "Carga 65W · Inalámbrica 15W" },
  { icon: Wifi, label: "Conectividad", value: "5G + WiFi 7", detail: "Bluetooth 5.4 · UWB" },
  { icon: Shield, label: "Seguridad", value: "Face ID 3D", detail: "Huella ultrasónica · Titan M3" },
];

const SpecsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="specs" ref={ref} className="section-padding relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">Especificaciones</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Potencia <span className="gradient-text">sin límites</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover-scale group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{spec.label}</p>
                <h3 className="text-foreground font-display font-bold text-xl mb-1">{spec.value}</h3>
                <p className="text-muted-foreground text-sm">{spec.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
