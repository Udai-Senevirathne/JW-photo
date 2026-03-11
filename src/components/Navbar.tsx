import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = ["Rentals", "Portfolio", "Services", "About", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <motion.a
        href="#"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        className="font-display text-3xl font-bold tracking-tight text-foreground relative"
      >
        <motion.span
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          JW
        </motion.span>
        <motion.span
          className="text-primary inline-block"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 15, 0],
            textShadow: [
              "0 0 0px hsl(36 80% 55%)",
              "0 0 20px hsl(36 80% 55%)",
              "0 0 0px hsl(36 80% 55%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        >
          .
        </motion.span>
      </motion.a>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
            className="relative text-sm font-body font-medium tracking-widest uppercase text-muted-foreground transition-colors duration-300 group"
          >
            <motion.span
              whileHover={{ y: -3, color: "hsl(36 80% 55%)" }}
              className="inline-block"
            >
              {link}
            </motion.span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] bg-primary"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.a>
        ))}
      </div>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.85, rotate: 15 }}
        whileHover={{ scale: 1.1 }}
        className="md:hidden text-foreground relative"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 right-0 bg-background/95 border-b border-primary/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 8, color: "hsl(36 80% 55%)" }}
                  className="text-sm font-body font-medium tracking-widest uppercase text-muted-foreground py-3 border-b border-border/20 transition-colors"
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
