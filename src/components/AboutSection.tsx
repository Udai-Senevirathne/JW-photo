import { motion } from "framer-motion";
import aboutPhoto from "@/assets/about-photo.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={aboutPhoto} alt="JW Photography studio session" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary rounded-lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">About Us</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              The Story Behind <span className="text-gradient">JW</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Founded with a passion for visual storytelling, JW provides professional-grade camera equipment and photography services to creators of all levels.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Whether you're a seasoned professional or just starting out, we believe everyone deserves access to the best tools to bring their creative vision to life.
            </p>
            <div className="flex gap-12">
              {[
                { num: "500+", label: "Gear Available" },
                { num: "1.2K", label: "Happy Clients" },
                { num: "8+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-primary">{stat.num}</p>
                  <p className="text-muted-foreground font-body text-xs tracking-wider uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
