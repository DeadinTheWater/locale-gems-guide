import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import citiesData from "@/content/cities.json";
import postsData from "@/content/posts.json";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PostPage = () => {
  const { citySlug, postSlug } = useParams<{ citySlug: string; postSlug: string }>();
  const city = citiesData.find((c) => c.slug === citySlug);
  const post = postsData.find((p) => p.id === postSlug && p.cityId === citySlug);

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

  // Render markdown content with headings, paragraphs, bold, and links
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("# ")) {
        return null; // Skip H1 since we show it in the header
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="mt-10 mb-4 text-2xl font-serif font-semibold text-foreground">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="mt-8 mb-3 text-xl font-serif font-semibold text-foreground">
            {block.replace("### ", "")}
          </h3>
        );
      }
      if (block.startsWith("---")) {
        return <hr key={i} className="my-8 border-border" />;
      }
      // Render paragraphs with inline markdown (bold, links)
      return (
        <p
          key={i}
          className="mb-4 text-foreground/85 font-sans leading-[1.8] text-base md:text-[17px]"
          dangerouslySetInnerHTML={{
            __html: block
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\s*\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
              .replace(/\n/g, '<br />')
          }}
        />
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
