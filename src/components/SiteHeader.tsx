import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import citiesData from "@/content/cities.json";
import logo from "@/assets/logo.png";

const SiteHeader = () => {
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/">
          <img src={logo} alt="InterestingHere" className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative">
            <button
              onClick={() => setCitiesOpen(!citiesOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-sans"
            >
              Cities
              <ChevronDown className={`h-4 w-4 transition-transform ${citiesOpen ? "rotate-180" : ""}`} />
            </button>
            {citiesOpen && (
              <>
                <div className="fixed inset-0" onClick={() => setCitiesOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 rounded-sm border border-border bg-popover p-2 shadow-lg z-50">
                  {citiesData.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/${city.slug}`}
                      onClick={() => setCitiesOpen(false)}
                      className="block rounded-sm px-3 py-2 text-sm font-sans text-popover-foreground hover:bg-accent transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-sans">
            About
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-3 font-sans">
            Cities
          </p>
          {citiesData.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-sans text-foreground"
            >
              {city.name}
            </Link>
          ))}
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block border-t border-border pt-4 text-sm font-sans text-foreground"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
