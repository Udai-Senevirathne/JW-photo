import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import aboutPhoto from "@/assets/about-photo.jpg";

const AnimatedCounter = ({ target, label }: { target: string; label: string }) => {
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
    <div ref={ref}>
      <motion.p
        className="font-display text-2xl md:text-3xl font-bold text-primary"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {display}
      </motion.p>
      <p className="text-muted-foreground font-body text-xs tracking-wider uppercase mt-1">{label}</p>
    </div>
  );
};

const AboutSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [5, -5]);
  const rotateY = useTransform(mouseX, [-150, 150], [-5, 5]);

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
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 800 }}
          >
            <motion.div
              className="aspect-[4/3] rounded-lg overflow-hidden"
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img src={aboutPhoto} alt="JW Photography studio session" className="w-full h-full object-cover" />
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary rounded-lg"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            />
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 border border-primary/30 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.p
              className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              About Us
            </motion.p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {"The Story Behind ".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="text-gradient inline-block"
                initial={{ opacity: 0, scale: 0.5 }}
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
              className="text-muted-foreground font-body leading-relaxed mb-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Whether you're a seasoned professional or just starting out, we believe everyone deserves access to the best tools to bring their creative vision to life.
            </motion.p>
            <div className="flex gap-12">
              <AnimatedCounter target="500+" label="Gear Available" />
              <AnimatedCounter target="1200+" label="Happy Clients" />
              <AnimatedCounter target="8+" label="Years Experience" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
