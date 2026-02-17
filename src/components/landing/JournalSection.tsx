import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import postsData from "@/content/posts.json";
import FallbackImage from "@/components/FallbackImage";

const JournalSection = () => {
  const latestPosts = postsData.slice(0, 4);

  return (
    <section className="container py-20 md:py-28">
      <div className="mb-12 md:mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary font-sans mb-3">
          Latest
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
          From the Journal
        </h2>
        <p className="mt-3 text-muted-foreground font-sans max-w-lg">
          Stories from the ground — authentic dispatches from our travel experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {latestPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link
              to={`/${post.cityId}/${post.id}`}
              className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              {post.image && (
                <FallbackImage
                  src={post.image}
                  alt={post.title}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-md object-cover flex-shrink-0"
                  loading="lazy"
                />
              )}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-xs text-muted-foreground font-sans mb-1.5">
                  {post.date}
                </span>
                <h3 className="text-base md:text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground font-sans line-clamp-1">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JournalSection;
