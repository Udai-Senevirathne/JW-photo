import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-camera.jpg";

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, delay: 0.6 + i * 0.05, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const line1 = "Capture";
  const line2 = "Every";
  const line3 = "Moment";

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <img
          src={heroImage}
          alt="Premium camera equipment"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div className="relative z-10 container mx-auto px-6 md:px-12 pt-24" style={{ y: contentY }}>
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4"
          >
            <motion.span
              className="inline-block w-8 h-[1px] bg-primary mr-3 align-middle"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ originX: 0 }}
            />
            Camera Rental & Photography
          </motion.p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6" style={{ perspective: "600px" }}>
            <span className="block overflow-hidden">
              {line1.split("").map((char, i) => (
                <motion.span key={`l1-${i}`} custom={i} variants={letterVariants} initial="hidden" animate="visible" className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {line2.split("").map((char, i) => (
                <motion.span key={`l2-${i}`} custom={i + line1.length} variants={letterVariants} initial="hidden" animate="visible" className="inline-block text-gradient">
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {line3.split("").map((char, i) => (
                <motion.span key={`l3-${i}`} custom={i + line1.length + line2.length} variants={letterVariants} initial="hidden" animate="visible" className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="text-muted-foreground font-body text-lg md:text-xl max-w-md mb-10 leading-relaxed"
          >
            Premium camera gear rentals and professional photography services. Your vision, our equipment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button variant="hero" size="lg">
                Browse Gear
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button variant="heroOutline" size="lg">
                Our Services
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.span className="text-muted-foreground font-body text-[10px] tracking-[0.3em] uppercase">Scroll</motion.span>
            <motion.div
              className="w-[1px] h-8 bg-primary/50"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ originY: 0 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
