import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = ["Rentals", "Services", "About", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/30"
    >
      <motion.a
        href="#"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="font-display text-3xl font-bold tracking-tight text-foreground"
      >
        JW<motion.span
          className="text-primary inline-block"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >.</motion.span>
      </motion.a>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
            whileHover={{ y: -2, color: "hsl(36 80% 55%)" }}
            className="text-sm font-body font-medium tracking-widest uppercase text-muted-foreground transition-colors duration-300"
          >
            {link}
          </motion.a>
        ))}
      </div>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        className="md:hidden text-foreground"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/30 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-sm font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
