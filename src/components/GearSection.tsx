import { motion } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const GearSection = () => {
  return (
    <section id="rentals" className="py-24 md:py-32 px-6 md:px-12">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Equipment</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Rental <span className="text-gradient">Gear</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gear.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group glass-card rounded-lg overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="text-muted-foreground text-sm font-body mt-1">{item.desc}</p>
                <p className="text-primary font-body font-semibold text-sm mt-3">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GearSection;
