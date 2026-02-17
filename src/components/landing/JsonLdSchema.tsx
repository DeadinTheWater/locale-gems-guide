import citiesData from "@/content/cities.json";

const JsonLdSchema = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InterestingHere",
    url: "https://interestinghere.com",
    description:
      "Expert-curated guides to the best hidden gems, tours, and experiences in cities around the world.",
    founder: {
      "@type": "Person",
      name: "InterestingHere Founder",
      description:
        "Passionate traveler with an extensive global network, committed to authentic, local-first experiences.",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "InterestingHere — Beyond the Guidebook",
    description:
      "Discover and book unique tours, hidden gems, and local experiences hand-picked by our travel experts.",
    url: "https://interestinghere.com",
    isPartOf: {
      "@type": "WebSite",
      name: "InterestingHere",
      url: "https://interestinghere.com",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: citiesData.map((city, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Place",
          name: city.name,
          description: city.description,
          url: `https://interestinghere.com/${city.slug}`,
          address: {
            "@type": "PostalAddress",
            addressCountry: city.country,
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
};

export default JsonLdSchema;
