// City image imports
import newYork from "@/assets/cities/new-york.jpg";
import london from "@/assets/cities/london.jpg";
import paris from "@/assets/cities/paris.jpg";
import tokyo from "@/assets/cities/tokyo.jpg";
import barcelona from "@/assets/cities/barcelona.jpg";
import lisbon from "@/assets/cities/lisbon.jpg";

const cityImages: Record<string, string> = {
  "new-york": newYork,
  london,
  paris,
  tokyo,
  barcelona,
  lisbon,
};

export function getCityImage(slug: string): string {
  return cityImages[slug] || "";
}
