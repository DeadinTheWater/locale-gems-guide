import { ExternalLink } from "lucide-react";

interface AffiliateCTAProps {
  label: string;
  description: string;
  url: string;
}

const AffiliateCTA = ({ label, description, url }: AffiliateCTAProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group my-8 block rounded-sm border border-primary/20 bg-secondary p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-primary font-sans mb-1">
            Recommended
          </p>
          <h4 className="text-lg font-serif font-semibold text-foreground">
            {label}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground font-sans">
            {description}
          </p>
        </div>
        <ExternalLink className="mt-1 h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
};

export default AffiliateCTA;
