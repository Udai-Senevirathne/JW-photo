import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Camera, Film, Users, Sparkles } from "lucide-react";
import { useRef } from "react";

const services = [
  { icon: Camera, title: "Portrait Sessions", desc: "Professional portrait photography for individuals and families.", color: "36 80% 55%" },
  { icon: Film, title: "Event Coverage", desc: "Weddings, corporate events, and special occasions captured beautifully.", color: "40 70% 60%" },
  { icon: Users, title: "Commercial Shoots", desc: "Product photography and brand content for your business.", color: "32 75% 50%" },
  { icon: Sparkles, title: "Photo Editing", desc: "Professional retouching and color grading for your images.", color: "44 65% 55%" },
];

const ServiceCard = ({ service, index }: { service: (typeof services)[number]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onMouseMove={handleMouseMove}
      className="glass-card rounded-xl p-8 group cursor-pointer border border-transparent hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
    >
      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, hsl(${service.color} / 0.08) 0%, transparent 70%)`,
          x: useTransform(spotlightX, (v) => v - 80),
          y: useTransform(spotlightY, (v) => v - 80),
        }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300"
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <service.icon className="w-7 h-7 text-primary" />
        </motion.div>

        <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
        <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.desc}</p>

        <motion.div className="flex items-center gap-2 mt-5 text-primary/60 group-hover:text-primary transition-colors duration-300">
          <motion.div
            className="h-[1px] bg-primary/30 group-hover:bg-primary transition-colors duration-300"
            initial={{ width: 0 }}
            whileInView={{ width: "2rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
          />
          <span className="font-body text-xs tracking-wider uppercase">Learn More</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30 overflow-hidden relative">
      {/* Background accent */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/3 blur-[100px]"
        animate={{ x: [-50, 50, -50], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-primary font-body text-sm uppercase mb-3"
          >
            What We Do
          </motion.p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Our <span className="text-shimmer">Services</span>
          </h2>
          <motion.div
            className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
