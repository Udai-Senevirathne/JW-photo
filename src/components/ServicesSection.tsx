import { motion } from "framer-motion";
import { Camera, Film, Users, Sparkles } from "lucide-react";

const services = [
  { icon: Camera, title: "Portrait Sessions", desc: "Professional portrait photography for individuals and families." },
  { icon: Film, title: "Event Coverage", desc: "Weddings, corporate events, and special occasions captured beautifully." },
  { icon: Users, title: "Commercial Shoots", desc: "Product photography and brand content for your business." },
  { icon: Sparkles, title: "Photo Editing", desc: "Professional retouching and color grading for your images." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-lg p-8 group cursor-pointer"
            >
              <service.icon className="w-8 h-8 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
