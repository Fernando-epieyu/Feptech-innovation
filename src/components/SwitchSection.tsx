import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Power, Wifi, Shield, Zap } from "lucide-react";

const features = [
  { icon: Power, title: "Control Táctil", desc: "Panel táctil capacitivo con respuesta háptica." },
  { icon: Wifi, title: "WiFi + Bluetooth", desc: "Compatible con Alexa, Google Home y HomeKit." },
  { icon: Shield, title: "Protección IP44", desc: "Resistente a salpicaduras y polvo." },
  { icon: Zap, title: "Bajo Consumo", desc: "Consumo standby menor a 0.5W." },
];

const SwitchSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="switch" ref={ref} className="relative min-h-screen section-padding">
      <div className="absolute top-1/4 left-0 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-primary text-sm font-medium tracking-widest uppercase mb-4"
          >
            Smart Home
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            <span className="gradient-text">FepSwitch</span>{" "}
            <span className="text-foreground">Pro</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Controla tu hogar con un toque. Diseño minimalista que se integra perfectamente en cualquier espacio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D-style visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative w-[280px] h-[400px]">
              {/* Switch body */}
              <div className="absolute inset-0 rounded-[2rem] glass-strong glow-box flex flex-col items-center justify-center gap-8 p-8">
                {/* Top button */}
                <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all hover:bg-primary/30 hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] cursor-pointer">
                  <Power className="w-8 h-8 text-primary" />
                </div>
                {/* Middle indicator */}
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                {/* Bottom button */}
                <div className="w-20 h-20 rounded-2xl bg-secondary border border-border flex items-center justify-center hover:bg-secondary/80 transition-all cursor-pointer">
                  <Power className="w-8 h-8 text-muted-foreground" />
                </div>
                {/* Label */}
                <span className="text-xs text-muted-foreground tracking-widest uppercase mt-2">FepSwitch</span>
              </div>
              {/* Ambient glow */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/5 blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass rounded-xl p-6 hover-scale"
              >
                <f.icon className="w-8 h-8 text-primary mb-3" />
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

export default SwitchSection;
