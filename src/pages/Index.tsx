import { Link } from "react-router-dom";
import PostCard from "@/components/PostCard";
import heroImage from "@/assets/hero.jpg";
import citiesData from "@/content/cities.json";
import postsData from "@/content/posts.json";
import CityCard from "@/components/CityCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  const latestPosts = postsData.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Beautiful coastal destination at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/10" />
        <div className="container relative flex h-full flex-col items-center justify-center text-center">
          <p className="animate-fade-in text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/80 font-sans mb-4">
            Curated local experiences worldwide
          </p>
          <h1 className="animate-fade-in text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground max-w-3xl leading-[1.1] text-balance [animation-delay:100ms]">
            Discover what's interesting here
          </h1>
          <p className="animate-fade-in mt-4 text-base md:text-lg text-primary-foreground/80 font-sans max-w-lg [animation-delay:200ms]">
            Expert-curated guides to the best hidden gems, tours, and experiences in cities around the world.
          </p>
        </div>
      </section>

      {/* Cities Grid */}
      <main>
        <section className="container py-16 md:py-24">
          <div className="mb-10 md:mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary font-sans mb-2">
              Explore
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
              Choose your city
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {citiesData.map((city) => (
              <CityCard
                key={city.slug}
                slug={city.slug}
                name={city.name}
                country={city.country}
                tagline={city.tagline}
              />
            ))}
          </div>
        </section>

        {/* Latest Posts */}
        <section className="container pb-16 md:pb-24">
          <div className="mb-10 md:mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary font-sans mb-2">
              Latest
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
              Recent stories
            </h2>
          </div>
          <div className="max-w-2xl">
            {latestPosts.map((post) => (
              <PostCard
                key={post.id}
                slug={post.id}
                citySlug={post.city.toLowerCase().replace(/\s+/g, '-')}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                image={post.heroImage}
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
