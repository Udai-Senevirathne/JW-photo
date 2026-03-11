import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = ["Rentals", "Services", "About", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/30"
    >
      <a href="#" className="font-display text-3xl font-bold tracking-tight text-foreground">
        JW<span className="text-primary">.</span>
      </a>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            {link}
          </a>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/30 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
