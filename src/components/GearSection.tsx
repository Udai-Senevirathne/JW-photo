import { motion, useScroll, useTransform } from "framer-motion";
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

const GearSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerX = useTransform(scrollYProgress, [0, 0.3], [-60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="rentals" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto">
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
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Rental <span className="text-gradient">Gear</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gear.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 60, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{
                y: -12,
                boxShadow: "0 20px 40px -15px hsl(36 80% 55% / 0.2)",
                transition: { duration: 0.3 },
              }}
              className="group glass-card rounded-lg overflow-hidden cursor-pointer"
              style={{ perspective: "800px" }}
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="text-muted-foreground text-sm font-body mt-1">{item.desc}</p>
                <motion.p
                  className="text-primary font-body font-semibold text-sm mt-3"
                  whileHover={{ x: 4 }}
                >
                  {item.price} →
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GearSection;
