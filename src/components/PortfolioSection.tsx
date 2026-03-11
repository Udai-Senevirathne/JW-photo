import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Eye } from "lucide-react";
import camera1 from "@/assets/camera-1.jpg";
import lens1 from "@/assets/lens-1.jpg";
import gear1 from "@/assets/gear-1.jpg";
import lighting1 from "@/assets/lighting-1.jpg";
import heroImage from "@/assets/hero-camera.jpg";
import aboutPhoto from "@/assets/about-photo.jpg";

const categories = ["All", "Portraits", "Events", "Commercial", "Nature"] as const;

const portfolioItems = [
  { src: heroImage, alt: "Dramatic portrait with cinematic lighting", category: "Portraits" },
  { src: camera1, alt: "Corporate event coverage at annual gala", category: "Events" },
  { src: lens1, alt: "Product photography for luxury brand", category: "Commercial" },
  { src: aboutPhoto, alt: "Golden hour landscape photography", category: "Nature" },
  { src: gear1, alt: "Wedding ceremony candid moment", category: "Events" },
  { src: lighting1, alt: "Studio portrait with dramatic shadows", category: "Portraits" },
];

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState<(typeof categories)[number]>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const headerScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const filtered = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 overflow-hidden relative">
      {/* Ambient glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto relative">
        <motion.div
          style={{ scale: headerScale, opacity: headerOpacity }}
          className="text-center mb-14"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-primary font-body text-sm uppercase mb-3"
          >
            Our Work
          </motion.p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Featured <span className="text-shimmer">Portfolio</span>
          </h2>
          <motion.div
            className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.06 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full font-body text-xs tracking-widest uppercase transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 glow-primary"
                  : "border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.alt}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -10, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              >
                <motion.img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover overlay with staggered content */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <motion.div
                    initial={false}
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-primary" />
                      <p className="text-primary font-body text-xs uppercase tracking-wider">{item.category}</p>
                    </div>
                    <p className="text-foreground font-display text-base font-semibold">{item.alt}</p>
                  </motion.div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-bl-lg" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
