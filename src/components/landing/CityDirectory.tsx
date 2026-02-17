import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import citiesData from "@/content/cities.json";
import postsData from "@/content/posts.json";
import { getCityImage } from "@/lib/cityImages";
import FallbackImage from "@/components/FallbackImage";

const CityDirectory = () => {
  // Group cities by country/region
  const byRegion: Record<string, typeof citiesData> = {};
  citiesData.forEach((city) => {
    if (!byRegion[city.country]) byRegion[city.country] = [];
    byRegion[city.country].push(city);
  });

  return (
    <section className="bg-secondary/30 border-t border-border">
      <div className="container py-20 md:py-28">
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary font-sans mb-3">
            All Destinations
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
            Explore every city
          </h2>
          <p className="mt-3 text-muted-foreground font-sans max-w-md mx-auto">
            {citiesData.length} cities and counting — each hiding something extraordinary.
          </p>
        </div>

        <div className="grid gap-10 md:gap-12">
          {Object.entries(byRegion).map(([country, cities]) => (
            <motion.div
              key={country}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground font-sans mb-4 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                {country}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {cities.map((city) => {
                  const post = postsData.find((p) => p.cityId === city.slug);
                  const image = post?.image || getCityImage(city.slug);

                  return (
                    <Link
                      key={city.slug}
                      to={`/${city.slug}`}
                      className="group flex items-center gap-3 rounded-md border border-border bg-background p-3 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                    >
                      <FallbackImage
                        src={image}
                        alt={city.name}
                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-sans font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {city.name}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityDirectory;
