import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import camera1 from "@/assets/camera-1.jpg";
import lens1 from "@/assets/lens-1.jpg";
import gear1 from "@/assets/gear-1.jpg";
import lighting1 from "@/assets/lighting-1.jpg";

const gear = [
  { name: "Camera Bodies", desc: "Mirrorless & DSLR", price: "From $45/day", image: camera1 },
  { name: "Lenses", desc: "Prime & Zoom", price: "From $25/day", image: lens1 },
  { name: "Stabilizers", desc: "Gimbals & Tripods", price: "From $20/day", image: gear1 },
  { name: "Lighting", desc: "Studio & Portable", price: "From $30/day", image: lighting1 },
];

const GearCard = ({ item, index }: { item: (typeof gear)[number]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateY: -20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group glass-card rounded-xl overflow-hidden cursor-pointer glow-primary-hover transition-shadow duration-500"
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.15]"
          loading="lazy"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"
        />
        {/* Floating price tag */}
        <motion.div
          className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-primary-foreground px-3 py-1.5 rounded-full font-body text-xs font-semibold"
          initial={{ opacity: 0, scale: 0, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.12, type: "spring", stiffness: 300 }}
        >
          {item.price}
        </motion.div>
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
      </div>
      <motion.div
        className="p-5 relative"
        style={{ translateZ: 20 }}
      >
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{item.name}</h3>
        <p className="text-muted-foreground text-sm font-body mt-1">{item.desc}</p>
        <motion.div
          className="flex items-center gap-2 mt-3 text-primary font-body font-semibold text-sm"
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span>Explore</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const GearSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerX = useTransform(scrollYProgress, [0, 0.3], [-80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.35], ["0%", "100%"]);

  return (
    <section id="rentals" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 overflow-hidden relative">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 right-0 w-72 h-72 rounded-full bg-primary/3 blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto relative">
        <motion.div
          style={{ x: headerX, opacity: headerOpacity }}
          className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3 overflow-hidden whitespace-nowrap"
          >
            Equipment
          </motion.p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Rental <span className="text-shimmer">Gear</span>
          </h2>
          <motion.div
            className="h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent mt-6"
            style={{ width: lineWidth }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gear.map((item, i) => (
            <GearCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GearSection;
