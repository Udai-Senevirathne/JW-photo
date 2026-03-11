import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import aboutPhoto from "@/assets/about-photo.jpg";

const AnimatedCounter = ({ target, label, delay }: { target: string; label: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericPart = parseInt(target.replace(/[^0-9]/g, ""));
    const suffix = target.replace(/[0-9]/g, "");
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numericPart * eased);
      setDisplay(current + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className="text-center"
    >
      <motion.p
        className="font-display text-3xl md:text-4xl font-bold text-primary"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, type: "spring", stiffness: 200, damping: 12 }}
      >
        {display}
      </motion.p>
      <motion.div
        className="w-8 h-[1px] bg-primary/30 mx-auto my-2"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
      />
      <p className="text-muted-foreground font-body text-xs tracking-wider uppercase mt-1">{label}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 overflow-hidden relative">
      {/* Background glow */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/3 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 800 }}
          >
            <motion.div
              className="aspect-[4/3] rounded-xl overflow-hidden group"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <img src={aboutPhoto} alt="JW Photography studio session with professional lighting setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>

            {/* Corner decorative frames */}
            <motion.div
              className="absolute -bottom-3 -right-3 w-28 h-28 border-r-2 border-b-2 border-primary/50 rounded-br-xl"
              initial={{ opacity: 0, scale: 0, originX: 1, originY: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            />
            <motion.div
              className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-xl"
              initial={{ opacity: 0, scale: 0, originX: 0, originY: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring", stiffness: 150 }}
            />
            {/* Floating dot accent */}
            <motion.div
              className="absolute -top-2 right-8 w-3 h-3 rounded-full bg-primary"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, type: "spring" }}
              animate={{ y: [-4, 4, -4] }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.p
              className="text-primary font-body text-sm uppercase mb-3"
              initial={{ opacity: 0, letterSpacing: "0em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              About Us
            </motion.p>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              {"The Story Behind ".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="text-shimmer inline-block"
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                JW
              </motion.span>
            </h2>
            <motion.p
              className="text-muted-foreground font-body leading-relaxed mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Founded with a passion for visual storytelling, JW provides professional-grade camera equipment and photography services to creators of all levels.
            </motion.p>
            <motion.p
              className="text-muted-foreground font-body leading-relaxed mb-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Whether you're a seasoned professional or just starting out, we believe everyone deserves access to the best tools to bring their creative vision to life.
            </motion.p>
            <div className="flex gap-12">
              <AnimatedCounter target="500+" label="Gear Available" delay={0.5} />
              <AnimatedCounter target="1200+" label="Happy Clients" delay={0.65} />
              <AnimatedCounter target="8+" label="Years Experience" delay={0.8} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
