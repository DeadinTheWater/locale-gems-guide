import { Link } from "react-router-dom";
import postsData from "@/content/posts.json";
import { getCityImage } from "@/lib/cityImages";
import FallbackImage from "@/components/FallbackImage";

interface CityCardProps {
  slug: string;
  name: string;
  country: string;
  tagline: string;
}

const CityCard = ({ slug, name, country, tagline }: CityCardProps) => {
  const cityPost = postsData.find((p) => p.city.toLowerCase().replace(/\s+/g, '-') === slug);
  const imageSrc = cityPost?.heroImage || getCityImage(slug);

  return (
    <Link
      to={`/${slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-sm"
    >
      <FallbackImage
        src={imageSrc}
        alt={`${name}, ${country}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70 font-sans">
          {country}
        </p>
        <h3 className="text-2xl font-semibold text-primary-foreground font-serif">
          {name}
        </h3>
        <p className="mt-1 text-sm text-primary-foreground/80 font-sans">
          {tagline}
        </p>
      </div>
    </Link>
  );
};

export default CityCard;
