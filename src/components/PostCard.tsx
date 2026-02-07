import { Link } from "react-router-dom";

interface PostCardProps {
  slug: string;
  citySlug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

const PostCard = ({ slug, citySlug, title, excerpt, category, readTime, date }: PostCardProps) => {
  return (
    <Link
      to={`/${citySlug}/${slug}`}
      className="group block border-b border-border py-8 first:pt-0 last:border-b-0"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-primary font-sans">
          {category}
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground font-sans">{readTime}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground font-sans leading-relaxed line-clamp-2">
        {excerpt}
      </p>
    </Link>
  );
};

export default PostCard;
