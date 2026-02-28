import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#hero" },
  { label: "FepPods", href: "#earbuds" },
  { label: "FepBand", href: "#headphones" },
  { label: "Diademas", href: "#diademas" },
  { label: "FepSwitch", href: "#switch" },
  { label: "Specs", href: "#specs" },
  { label: "Contacto", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <a href="#hero" onClick={(e) => scrollToSection(e, "#hero")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">F</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            Fep<span className="text-primary">Tech</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Comprar
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                Comprar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
