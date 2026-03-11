import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState, useRef } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactItems = [
  { icon: Mail, label: "Email", value: "hello@jwphoto.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Location", value: "Los Angeles, CA" },
];

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), { stiffness: 150, damping: 20 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCardMouse = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleCardLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(36_80%_55%/0.3)] transition-all duration-300";

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30 overflow-hidden relative">
      {/* Background glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto max-w-4xl relative">
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
            Get In Touch
          </motion.p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Let&apos;s <span className="text-shimmer">Connect</span>
          </h2>
          <motion.div
            className="w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          onMouseMove={handleCardMouse}
          onMouseLeave={handleCardLeave}
          style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
          className="glass-card rounded-xl p-8 md:p-12 border border-transparent hover:border-primary/10 transition-colors duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10" style={{ transform: "translateZ(15px)" }}>
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="text-center group"
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <p className="text-muted-foreground font-body text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-foreground font-body text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4" style={{ transform: "translateZ(20px)" }}>
            {(["name", "email", "message"] as const).map((field, i) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
              >
                {field === "message" ? (
                  <textarea
                    {...register("message")}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className={`${inputClasses} resize-none`}
                  />
                ) : (
                  <input
                    {...register(field)}
                    type={field === "email" ? "email" : "text"}
                    placeholder={field === "name" ? "Your name" : "Your email address"}
                    className={inputClasses}
                  />
                )}
                {errors[field] && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-xs font-body mt-1"
                  >
                    {errors[field]?.message}
                  </motion.p>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="hero" size="lg" type="submit" disabled={isSubmitting} className="w-full relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && (
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.span>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
