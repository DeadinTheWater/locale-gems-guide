import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedDestinations from "@/components/landing/FeaturedDestinations";
import TrustSection from "@/components/landing/TrustSection";
import ThemedCollections from "@/components/landing/ThemedCollections";
import JournalSection from "@/components/landing/JournalSection";
import CityDirectory from "@/components/landing/CityDirectory";
import JsonLdSchema from "@/components/landing/JsonLdSchema";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <SiteHeader />

      {/* 1. Hero */}
      <HeroSection />

      <main>
        {/* 2. Featured Destinations */}
        <FeaturedDestinations />

        {/* 3. Why Trust InterestingHere? */}
        <TrustSection />

        {/* 4. Themed Collections */}
        <ThemedCollections />

        {/* 5. Latest from the Journal */}
        <JournalSection />

        {/* 6. Full City Directory */}
        <CityDirectory />
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
