import { motion } from "framer-motion";
import { User, Search, CheckCircle } from "lucide-react";

const trustPillars = [
  {
    icon: User,
    title: "100% Human Curated",
    description: "Every recommendation vetted by real travelers with first-hand experience.",
  },
  {
    icon: Search,
    title: "Direct Insider Access",
    description: "Unlocking secrets only locals know — no recycled tourist lists.",
  },
  {
    icon: CheckCircle,
    title: "Hidden Gem Verified",
    description: "Discover experiences off the beaten path, rigorously fact-checked.",
  },
];

const TrustSection = () => {
  return (
    <section className="bg-secondary/50 border-y border-border">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary font-sans mb-3">
            Why Trust InterestingHere?
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
            Travel that transforms
          </h2>
          <p className="mt-4 text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
            We believe in travel that transforms. Our guides are built on genuine experiences, local insights, and a passion for discovery.
          </p>
        </div>

        {/* Trust pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
          {trustPillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <pillar.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-xs mx-auto">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Meet Our Experts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto border border-border rounded-lg bg-background p-8 md:p-10"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary font-sans mb-4">
            Meet Our Experts
          </p>
          <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
            Founded by Passionate Travelers
          </h3>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            InterestingHere was born from a love of off-the-beaten-path exploration. Our founder's extensive travel network and obsession with authentic, local-first experiences drives every recommendation we make. We don't do generic — we do genuine.
          </p>
          <p className="mt-4 text-xs text-muted-foreground/70 font-sans italic">
            Coming Soon: Meet our Local Insiders — expert contributors in every city we cover.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
