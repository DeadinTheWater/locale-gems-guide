import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import citiesData from "@/content/cities.json";
import postsData from "@/content/posts.json";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FallbackImage from "@/components/FallbackImage";
import ShareBar from "@/components/ShareBar";

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

  // Strip the H1 from content since we render it in the header
  const contentWithoutH1 = post.content.replace(/^# .+\n\n?/, "");

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

        {/* Hero Image */}
        {post.image && (
          <div className="max-w-3xl mb-10">
            <FallbackImage
              src={post.image}
              alt={post.title}
              className="w-full rounded-lg object-cover max-h-[500px]"
            />
          </div>
        )}

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
          <ShareBar title={post.title} className="mt-6" />
        </header>

        {/* Content */}
        <div className="max-w-2xl prose-custom">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="mt-10 mb-4 text-2xl font-serif font-semibold text-foreground">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 mb-3 text-xl font-serif font-semibold text-foreground">
                  {children}
                </h3>
              ),
              p: ({ children, node }) => {
                const hasOnlyImage =
                  node?.children?.length === 1 && node.children[0].type === "element" && node.children[0].tagName === "img";
                if (hasOnlyImage) {
                  return <>{children}</>;
                }
                return (
                  <p className="mb-4 text-foreground/85 font-sans leading-[1.8] text-base md:text-[17px]">
                    {children}
                  </p>
                );
              },
              img: ({ src, alt }) => (
                <figure className="my-6">
                  <FallbackImage
                    src={src || ""}
                    alt={alt || ""}
                    className="w-full rounded-lg object-cover max-h-[500px]"
                    loading="lazy"
                  />
                </figure>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong>{children}</strong>,
              hr: () => <hr className="my-8 border-border" />,
            }}
          >
            {contentWithoutH1}
          </ReactMarkdown>
        </div>

        {/* Share bar bottom */}
        <div className="max-w-2xl mt-12">
          <ShareBar title={post.title} />
        </div>

        {/* Disclosure */}
        <div className="max-w-2xl mt-8 pt-8 border-t border-border">
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
