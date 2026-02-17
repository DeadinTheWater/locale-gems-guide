import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import collectionsData from "@/content/collections.json";
import citiesData from "@/content/cities.json";
import FallbackImage from "@/components/FallbackImage";

const ThemedCollections = () => {
  return (
    <section className="container py-20 md:py-28">
      <div className="mb-12 md:mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary font-sans mb-3">
          Collections
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
          Explore by theme
        </h2>
        <p className="mt-3 text-muted-foreground font-sans max-w-lg">
          Curated journeys across cities, united by a single passion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {collectionsData.map((collection, i) => {
          const collectionCities = collection.cities
            .map((slug) => citiesData.find((c) => c.slug === slug))
            .filter(Boolean);
          // Link to the first city in the collection
          const firstCity = collectionCities[0];

          return (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={firstCity ? `/${firstCity.slug}` : "/"}
                className="group relative block aspect-[16/9] overflow-hidden rounded-lg"
              >
                <FallbackImage
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/30 to-foreground/5" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-primary-foreground">
                    {collection.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-primary-foreground/80 font-sans line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {collectionCities.slice(0, 3).map((city) => (
                      <span
                        key={city!.slug}
                        className="text-xs font-sans text-primary-foreground/60 bg-primary-foreground/10 px-2 py-0.5 rounded-full"
                      >
                        {city!.name}
                      </span>
                    ))}
                    {collectionCities.length > 3 && (
                      <span className="text-xs font-sans text-primary-foreground/50">
                        +{collectionCities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ThemedCollections;
