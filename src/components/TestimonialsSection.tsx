import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Wedding Photographer",
    quote: "JW's equipment is always in perfect condition. Their Canon R5 kit helped me deliver stunning results for my clients. The team is incredibly professional and reliable.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Commercial Director",
    quote: "We've been renting from JW for over 2 years now. The lighting rigs and stabilizers are top-notch. They understand what professionals need.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Content Creator",
    quote: "As someone just starting out, JW made it easy to access pro gear without the huge upfront cost. Their team even helped me choose the right lenses for my style.",
    rating: 5,
  },
];

const TestimonialCard = ({ t, index }: { t: (typeof testimonials)[number]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
      className="glass-card rounded-xl p-8 relative group border border-transparent hover:border-primary/15 transition-colors duration-500"
    >
      {/* Floating quote icon */}
      <motion.div
        className="absolute -top-4 -left-2 text-primary/10 group-hover:text-primary/20 transition-colors duration-500"
        style={{ translateZ: 30 }}
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.15, duration: 0.5, type: "spring" }}
      >
        <Quote className="w-10 h-10" />
      </motion.div>

      <div style={{ transform: "translateZ(20px)" }}>
        <div className="flex gap-1 mb-5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 + i * 0.08, type: "spring", stiffness: 300 }}
            >
              <Star className="w-4 h-4 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>

        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6 italic">
          &ldquo;{t.quote}&rdquo;
        </p>

        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.12, duration: 0.8 }}
        />

        <div className="flex items-center gap-3">
          <motion.div
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm"
            whileHover={{ scale: 1.15 }}
          >
            {t.name[0]}
          </motion.div>
          <div>
            <p className="text-foreground font-display font-semibold text-sm">{t.name}</p>
            <p className="text-muted-foreground font-body text-xs tracking-wider uppercase mt-0.5">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30 overflow-hidden relative">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-primary/3 blur-[120px]"
        animate={{ y: [-30, 30, -30], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
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
            Testimonials
          </motion.p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            What Our <span className="text-shimmer">Clients</span> Say
          </h2>
          <motion.div
            className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" style={{ perspective: 1000 }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
