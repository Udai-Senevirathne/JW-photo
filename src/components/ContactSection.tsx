import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-lg p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { icon: Mail, label: "Email", value: "hello@jwphoto.com" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: MapPin, label: "Location", value: "Los Angeles, CA" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <p className="text-muted-foreground font-body text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-foreground font-body text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <Button variant="hero" size="lg">
              Get Started
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
