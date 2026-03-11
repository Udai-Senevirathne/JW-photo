import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 px-6 md:px-12 border-t border-border/30"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.a
          href="#"
          className="font-display text-2xl font-bold text-foreground"
          whileHover={{ scale: 1.05 }}
        >
          JW<span className="text-primary">.</span>
        </motion.a>
        <p className="text-muted-foreground font-body text-xs tracking-wider">
          © 2026 JW Photography. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
