import { AfMayoristaSite } from "@/src/components/AfMayoristaSite";
import { siteContent } from "@/src/data/siteContent";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteContent.brand.name,
    url: siteContent.seo.siteUrl,
    logo: `${siteContent.seo.siteUrl}/assets/af-logo.png`,
    description: siteContent.seo.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "AR",
      availableLanguage: "es-AR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AfMayoristaSite />
    </>
  );
}
