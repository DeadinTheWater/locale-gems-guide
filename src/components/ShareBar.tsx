import { useState } from "react";
import { Facebook, MessageCircle, Link, Share2, Check } from "lucide-react";

const ShareBar = ({ title, className = "" }: { title: string; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {}
  };

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  const btnClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-sans text-muted-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {canNativeShare ? (
        <button onClick={handleNativeShare} className={btnClass}>
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
      ) : (
        <>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={btnClass}
          >
            <Facebook className="h-3.5 w-3.5" />
            Facebook
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={btnClass}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </>
      )}
      <button onClick={handleCopy} className={btnClass}>
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link className="h-3.5 w-3.5" />}
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
};

export default ShareBar;
