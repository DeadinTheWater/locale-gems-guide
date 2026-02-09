import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Facebook, Link as LinkIcon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import posts from "../data/posts.json";

const PostPage = () => {
  const { city, id } = useParams();
  const { toast } = useToast();
  
  // Find the post matching the URL parameters
  // The URL city slug is lowercase and hyphenated (e.g., 'new-york')
  // The JSON city field is also lowercase and hyphenated (e.g., 'new-york')
  const post = posts.find((p) => p.id === id && p.city === city);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to all cities
          </Button>
        </Link>
      </div>
    );
  }

  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + shareUrl)}`, '_blank');
  };

  const ShareBar = () => (
    <div className="flex items-center gap-2 my-6 py-4 border-y border-border">
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      <Button variant="outline" size="sm" onClick={shareOnFacebook} className="flex items-center gap-2">
        <Facebook className="h-4 w-4 text-[#1877F2]" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>
      <Button variant="outline" size="sm" onClick={shareOnWhatsApp} className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-[#25D366]" />
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>
      <Button variant="outline" size="sm" onClick={handleCopyLink} className="flex items-center gap-2">
        <LinkIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Copy Link</span>
      </Button>
    </div>
  );

  // Helper to split content into sections based on "###" headers
  const renderContent = () => {
    if (!post.content) return null;
    
    const sections = post.content.split(/### \d+\. /).filter(Boolean);
    const intro = sections.shift(); // The first part is the intro text

    return (
      <div className="space-y-12">
        {/* Intro Text */}
        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
          {intro?.split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
        </div>

        {/* Sections with Images */}
        {sections.map((section, index) => {
          const [title, ...textLines] = section.split('\n');
          const imageKey = `image${index + 1}` as keyof typeof post;
          const image = post[imageKey];

          return (
            <section key={index} className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {index + 1}. {title}
              </h2>
              {image && (
                <div className="aspect-video rounded-xl overflow-hidden shadow-md">
                  <img src={image as string} alt={title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {textLines.map((p, i) => p.trim() && <p key={i}>{p}</p>)}
              </div>
            </section>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link to={`/${post.city}`}>
          <Button variant="ghost" className="mb-8 flex items-center gap-2 hover:bg-transparent p-0">
            <ArrowLeft className="h-4 w-4" /> Back to <span className="capitalize ml-1">{post.city.replace(/-/g, ' ')}</span>
          </Button>
        </Link>

        <article className="animate-fade-in">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <time>{post.date}</time>
              <span>•</span>
              <span className="capitalize">{post.city.replace(/-/g, ' ')}</span>
            </div>
            
            <ShareBar />
          </header>

          <div className="aspect-video mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {renderContent()}

          <footer className="mt-16">
            <ShareBar />
          </footer>
        </article>
      </div>
    </div>
  );
};

export default PostPage;
