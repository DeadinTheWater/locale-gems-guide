import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-16 md:py-24 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">About InterestingHere</h1>
        <div className="space-y-4 text-foreground/85 font-sans leading-[1.8]">
          <p>
            InterestingHere is a curated travel guide built for curious explorers. We partner with local experts and seasoned travelers to surface the best hidden gems, tours, and experiences in cities around the world.
          </p>
          <p>
            Our editorial team personally vets every recommendation. We believe the best travel experiences aren't found in guidebooks — they're discovered through trusted word of mouth.
          </p>
          <p>
            This site is part of a network of "Interesting Things To Do In [City]" communities, connecting millions of local experience seekers with high-quality, curated content.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Affiliate Disclosure</h2>
          <p className="text-foreground/85 font-sans leading-[1.8]">
            InterestingHere.com contains affiliate links. When you book a tour, hotel, or experience through our links, we may earn a small commission at no additional cost to you. This revenue supports our editorial team and helps us continue providing free, high-quality travel content.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default About;
