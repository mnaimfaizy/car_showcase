export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Car Showcase",
    description:
      "Premium car rental platform featuring 69+ vehicles from top manufacturers",
    url: "https://car-showcase-sepia-sigma.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://car-showcase-sepia-sigma.vercel.app?manufacturer={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Car Showcase",
      logo: {
        "@type": "ImageObject",
        url: "https://car-showcase-sepia-sigma.vercel.app/icon.svg",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
