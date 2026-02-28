const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-display font-bold text-xs">F</span>
        </div>
        <span className="font-display text-sm text-muted-foreground">
          Fep<span className="text-foreground">Tech</span> © 2026
        </span>
      </div>
      <div className="flex gap-6 text-xs text-muted-foreground">
        <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
        <a href="#" className="hover:text-primary transition-colors">Términos</a>
        <a href="#" className="hover:text-primary transition-colors">Soporte</a>
      </div>
    </div>
  </footer>
);

export default Footer;
