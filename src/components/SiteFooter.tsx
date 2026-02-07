import { Link } from "react-router-dom";
import citiesData from "@/content/cities.json";

const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground">InterestingHere</h4>
            <p className="mt-2 text-sm text-muted-foreground font-sans leading-relaxed max-w-xs">
              Curated local experiences, tours, and accommodations for curious travelers.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground font-sans mb-3">
              Cities
            </h5>
            <div className="grid grid-cols-2 gap-1">
              {citiesData.map((city) => (
                <Link
                  key={city.slug}
                  to={`/${city.slug}`}
                  className="text-sm text-foreground hover:text-primary transition-colors font-sans py-1"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground font-sans mb-3">
              Legal
            </h5>
            <div className="flex flex-col gap-1">
              <Link to="/about" className="text-sm text-foreground hover:text-primary transition-colors font-sans py-1">
                About Us
              </Link>
              <Link to="/privacy" className="text-sm text-foreground hover:text-primary transition-colors font-sans py-1">
                Privacy Policy
              </Link>
              <Link to="/disclosure" className="text-sm text-foreground hover:text-primary transition-colors font-sans py-1">
                Affiliate Disclosure
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground font-sans">
            © {new Date().getFullYear()} InterestingHere.com — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
