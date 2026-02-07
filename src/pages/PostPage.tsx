import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import citiesData from "@/content/cities.json";
import postsData from "@/content/posts.json";
import AffiliateCTA from "@/components/AffiliateCTA";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PostPage = () => {
  const { citySlug, postSlug } = useParams<{ citySlug: string; postSlug: string }>();
  const city = citiesData.find((c) => c.slug === citySlug);
  const post = postsData.find((p) => p.slug === postSlug && p.citySlug === citySlug);

  if (!city || !post) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-serif font-semibold text-foreground">Post not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary font-sans text-sm hover:underline">
            ← Back to all cities
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="mt-10 mb-4 text-2xl font-serif font-semibold text-foreground">
            {block.replace("## ", "")}
          </h2>
        );
      }
      return (
        <p key={i} className="mb-4 text-foreground/85 font-sans leading-[1.8] text-base md:text-[17px]">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <article className="container py-10 md:py-16">
        {/* Breadcrumb */}
        <Link
          to={`/${city.slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {city.name}
        </Link>

        {/* Header */}
        <header className="max-w-2xl mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-primary font-sans">
              {post.category}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground font-sans">{post.readTime}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground font-sans">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-[1.15] text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground font-sans leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-6 h-px w-16 bg-primary" />
        </header>

        {/* Content */}
        <div className="max-w-2xl">
          {renderContent(post.content)}

          {/* Affiliate CTAs */}
          {post.affiliateLinks.length > 0 && (
            <div className="mt-12 mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground font-sans mb-4">
                Our recommendations
              </p>
              {post.affiliateLinks.map((link, i) => (
                <AffiliateCTA
                  key={i}
                  label={link.label}
                  description={link.description}
                  url={link.url}
                />
              ))}
            </div>
          )}
        </div>

        {/* Disclosure */}
        <div className="max-w-2xl mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground font-sans leading-relaxed">
            <strong>Affiliate Disclosure:</strong> Some links in this article are affiliate links. We may earn a small commission if you make a purchase, at no extra cost to you. This helps us keep creating free content.
          </p>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
};

export default PostPage;
