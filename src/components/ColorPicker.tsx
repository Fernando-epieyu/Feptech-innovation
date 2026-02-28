import { motion } from "framer-motion";

const colors = [
  { name: "Negro", value: "#111827" },
  { name: "Plata", value: "#94a3b8" },
  { name: "Azul", value: "#1a73e8" },
  { name: "Rosa", value: "#e8457a" },
  { name: "Verde", value: "#10b981" },
];

interface ColorPickerProps {
  selected: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ selected, onChange }: ColorPickerProps) => (
  <div className="flex items-center gap-3 mt-6">
    <span className="text-xs text-muted-foreground uppercase tracking-wider">Color</span>
    <div className="flex gap-2">
      {colors.map((c) => (
        <motion.button
          key={c.value}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(c.value)}
          className={`w-7 h-7 rounded-full border-2 transition-all ${
            selected === c.value ? "border-primary scale-110 shadow-[0_0_10px_hsl(var(--primary)/0.5)]" : "border-border"
          }`}
          style={{ backgroundColor: c.value }}
          title={c.name}
        />
      ))}
    </div>
  </div>
);

export default ColorPicker;
