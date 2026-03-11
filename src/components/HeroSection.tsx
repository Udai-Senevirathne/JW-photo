import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-camera.jpg";

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.8 + i * 0.04, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.65, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) / innerWidth);
      mouseY.set((e.clientY - innerHeight / 2) / innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const line1 = "Capture";
  const line2 = "Every";
  const line3 = "Moment";

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background with mouse tracking */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: imageY,
          scale: imageScale,
          rotate: imageRotate,
          x: useTransform(springX, [-0.5, 0.5], ["-2%", "2%"]),
        }}
      >
        <img
          src={heroImage}
          alt="Premium camera equipment"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay with depth */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
      </motion.div>

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-[15%] w-32 h-32 border border-primary/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-[25%] w-20 h-20 border border-primary/15"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.3, 1],
          borderRadius: ["0%", "50%", "0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[60%] right-[10%] w-2 h-2 bg-primary/40 rounded-full"
        animate={{
          y: [0, -80, 0],
          x: [0, 20, 0],
          scale: [1, 2, 1],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles — enhanced */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 3 === 0 ? "w-1.5 h-1.5 bg-primary/40" : "w-1 h-1 bg-primary/20"}`}
          style={{
            left: `${8 + i * 8}%`,
            top: `${15 + (i % 5) * 18}%`,
          }}
          animate={{
            y: [0, -(20 + i * 8), 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0.1, 0.7, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal animated line */}
      <motion.div
        className="absolute top-[45%] left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.5, duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="relative z-10 container mx-auto px-6 md:px-12 pt-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4 flex items-center"
          >
            <motion.span
              className="inline-block w-12 h-[1px] bg-primary mr-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ originX: 0 }}
            />
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Camera Rental & Photography
            </motion.span>
          </motion.p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6" style={{ perspective: "800px" }}>
            <span className="block overflow-hidden">
              {line1.split("").map((char, i) => (
                <motion.span key={`l1-${i}`} custom={i} variants={letterVariants} initial="hidden" animate="visible" className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {line2.split("").map((char, i) => (
                <motion.span key={`l2-${i}`} custom={i + line1.length} variants={letterVariants} initial="hidden" animate="visible" className="inline-block text-shimmer">
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
            initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground font-body text-lg md:text-xl max-w-md mb-12 leading-relaxed"
          >
            Premium camera gear rentals and professional photography services. Your vision, our equipment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7 }}
            className="flex gap-5"
          >
            <motion.div
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <a href="#rentals">
                <Button variant="hero" size="lg" className="relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  Browse Gear
                </Button>
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <a href="#services">
                <Button variant="heroOutline" size="lg" className="relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-primary/5"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  Our Services
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator — enhanced */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <motion.span
              className="text-muted-foreground font-body text-[10px] tracking-[0.3em] uppercase"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll
            </motion.span>
            <motion.div className="relative w-5 h-8 rounded-full border border-primary/30 flex justify-center">
              <motion.div
                className="w-1 h-2 rounded-full bg-primary mt-1"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
