// City image imports
import newYork from "@/assets/cities/new-york.jpg";
import losAngeles from "@/assets/cities/los-angeles.jpg";
import sanFrancisco from "@/assets/cities/san-francisco.jpg";
import denver from "@/assets/cities/denver.jpg";
import santaFe from "@/assets/cities/santa-fe.jpg";
import albuquerque from "@/assets/cities/albuquerque.jpg";
import honolulu from "@/assets/cities/honolulu.jpg";
import bangkok from "@/assets/cities/bangkok.jpg";
import london from "@/assets/cities/london.jpg";
import mexicoCity from "@/assets/cities/mexico-city.jpg";

const cityImages: Record<string, string> = {
  "new-york": newYork,
  "los-angeles": losAngeles,
  "san-francisco": sanFrancisco,
  denver,
  "santa-fe": santaFe,
  albuquerque,
  honolulu,
  bangkok,
  london,
};

export function getCityImage(slug: string): string {
  return cityImages[slug] || "";
}
