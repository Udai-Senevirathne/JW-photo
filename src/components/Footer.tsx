const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-border/30">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="font-display text-2xl font-bold text-foreground">
          JW<span className="text-primary">.</span>
        </a>
        <p className="text-muted-foreground font-body text-xs tracking-wider">
          © 2026 JW Photography. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
