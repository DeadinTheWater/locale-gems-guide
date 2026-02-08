import { useParams, Link } from "react-router-dom";
import citiesData from "@/content/cities.json";
import postsData from "@/content/posts.json";
import PostCard from "@/components/PostCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const CityHub = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citiesData.find((c) => c.slug === citySlug);
  const cityPosts = postsData.filter((p) => p.cityId === citySlug);
  const heroImage = cityPosts[0]?.image || "";

  if (!city) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-serif font-semibold text-foreground">City not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary font-sans text-sm hover:underline">
            ← Back to all cities
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* City Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={getCityImage(city.slug)}
          alt={`${city.name}, ${city.country}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <p className="animate-fade-in text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/70 font-sans mb-2">
            {city.country}
          </p>
          <h1 className="animate-fade-in text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground [animation-delay:100ms]">
            {city.name}
          </h1>
          <p className="animate-fade-in mt-3 text-base text-primary-foreground/80 font-sans max-w-lg [animation-delay:200ms]">
            {city.description}
          </p>
        </div>
      </section>

      {/* Posts List */}
      <main className="container py-12 md:py-20">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary font-sans mb-2">
            {cityPosts.length} {cityPosts.length === 1 ? "guide" : "guides"}
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Things to do in {city.name}
          </h2>
        </div>
        <div className="max-w-2xl">
          {cityPosts.length > 0 ? (
            cityPosts.map((post) => (
              <PostCard
                key={post.id}
                slug={post.id}
                citySlug={post.cityId}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                image={post.image}
              />
            ))
          ) : (
            <p className="text-muted-foreground font-sans">
              New guides for {city.name} are coming soon. Check back later!
            </p>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CityHub;
