import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-10 px-6 md:px-12 border-t border-border/20 relative overflow-hidden"
    >
      {/* Top gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.a
          href="#"
          className="font-display text-2xl font-bold text-foreground relative"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          JW<motion.span className="text-primary" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>.</motion.span>
        </motion.a>

        <div className="flex items-center gap-4">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.2, y: -3, borderColor: "hsl(36 80% 55% / 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300 hover:shadow-[0_0_12px_-4px_hsl(36_80%_55%/0.3)]"
            >
              <social.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground font-body text-xs tracking-wider"
          initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Terms</a>
          </div>
          <p>© 2026 JW Photography. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
