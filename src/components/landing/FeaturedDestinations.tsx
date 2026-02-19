import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import citiesData from "@/content/cities.json";
import postsData from "@/content/posts.json";
import { getCityImage } from "@/lib/cityImages";
import FallbackImage from "@/components/FallbackImage";

const FEATURED_SLUGS = ["new-york", "london", "honolulu", "kyoto", "los-angeles"];

const FeaturedDestinations = () => {
  const featured = FEATURED_SLUGS.map((slug) => {
    const city = citiesData.find((c) => c.slug === slug)!;
    const post = postsData.find((p) => p.cityId === slug);
    const image = post?.image || getCityImage(slug);
    return { ...city, image };
  });

  return (
    <section className="container py-20 md:py-28">
      <div className="mb-12 md:mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary font-sans mb-3">
          Featured Destinations
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground max-w-xl">
          Start your journey here
        </h2>
        <p className="mt-3 text-muted-foreground font-sans max-w-lg">
          Our top affiliate-ready cities, curated for the most unforgettable experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Large featured card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 lg:col-span-2 lg:row-span-2"
        >
          <Link
            to={`/${featured[0].slug}`}
            className="group relative block aspect-[4/5] md:aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden rounded-lg"
          >
            <FallbackImage
              src={featured[0].image}
              alt={`${featured[0].name}, ${featured[0].country}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70 font-sans mb-2">
                {featured[0].country}
              </p>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">
                {featured[0].name}
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80 font-sans max-w-md">
                {featured[0].description}
              </p>
              <span className="inline-flex items-center gap-2 mt-4 text-sm font-sans font-medium text-primary-foreground/90 group-hover:text-primary-foreground transition-colors">
                Explore {featured[0].name}'s Secrets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Smaller cards */}
        {featured.slice(1).map((city, i) => (
          <motion.div
            key={city.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
          >
            <Link
              to={`/${city.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
            >
              <FallbackImage
                src={city.image}
                alt={`${city.name}, ${city.country}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70 font-sans mb-1">
                  {city.country}
                </p>
                <h3 className="text-xl font-serif font-semibold text-primary-foreground">
                  {city.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-sans font-medium text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
