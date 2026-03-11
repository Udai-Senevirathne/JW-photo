import { motion } from "framer-motion";
import { Camera, Film, Users, Sparkles } from "lucide-react";

const services = [
  { icon: Camera, title: "Portrait Sessions", desc: "Professional portrait photography for individuals and families." },
  { icon: Film, title: "Event Coverage", desc: "Weddings, corporate events, and special occasions captured beautifully." },
  { icon: Users, title: "Commercial Shoots", desc: "Product photography and brand content for your business." },
  { icon: Sparkles, title: "Photo Editing", desc: "Professional retouching and color grading for your images." },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">What We Do</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Our <span className="text-gradient">Services</span>
          </h2>
          <motion.div
            className="w-16 h-[2px] bg-primary mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                borderColor: "hsl(36 80% 55% / 0.3)",
                transition: { duration: 0.25 },
              }}
              className="glass-card rounded-lg p-8 group cursor-pointer border border-transparent"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <service.icon className="w-8 h-8 text-primary mb-4" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.desc}</p>
              <motion.div
                className="h-[1px] bg-primary/30 mt-5"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
