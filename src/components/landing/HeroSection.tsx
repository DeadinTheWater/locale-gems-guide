import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero.jpg";
import citiesData from "@/content/cities.json";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof citiesData>([]);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length > 0) {
      const filtered = citiesData.filter(
        (city) =>
          city.name.toLowerCase().includes(value.toLowerCase()) ||
          city.country.toLowerCase().includes(value.toLowerCase()) ||
          city.tagline.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (slug: string) => {
    setQuery("");
    setSuggestions([]);
    navigate(`/${slug}`);
  };

  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      <img
        src={heroImage}
        alt="Authentic travel destination with local culture and hidden gems"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/10" />

      <div className="container relative flex h-full flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-primary-foreground/70 font-sans mb-5"
        >
          Curated local experiences worldwide
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground max-w-4xl leading-[1.08] text-balance"
        >
          Beyond the Guidebook: Authentic Travel, Expertly Curated.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-base md:text-lg text-primary-foreground/80 font-sans max-w-2xl leading-relaxed font-light"
        >
          Discover and book unique tours, hidden gems, and local experiences hand-picked by our travel experts. Your next unforgettable story starts here.
        </motion.h2>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 w-full max-w-xl relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Find Your Next Adventure (e.g., 'hidden cafes in Kyoto')"
              className="w-full rounded-full bg-background/95 backdrop-blur-sm border border-border/50 pl-12 pr-5 py-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg"
            />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full rounded-lg bg-background border border-border shadow-xl z-50 overflow-hidden">
              {suggestions.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => handleSelect(city.slug)}
                  className="w-full text-left px-5 py-3 text-sm font-sans text-foreground hover:bg-accent/50 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium">{city.name}</span>
                  <span className="text-xs text-muted-foreground">{city.country}</span>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
