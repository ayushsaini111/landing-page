// /src/app/services/land-ownership-title-verification/page.jsx
import React from "react";
import SubServicePage from "@/components/SubServicePage";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getFAQSchema,
} from "@/utils/schema";

export const revalidate = 60;

// -------------------------------
// Dynamic metadata
// -------------------------------
export async function generateMetadata() {
  const { default: Data } = await import("@/Data/SubServices.json");
  const data = Data?.landVerification ?? null;

  const title = data
    ? `${data.title} — Arshiv Legal`
    : "Land Ownership & Title Verification — Arshiv Legal";

  const description =
    data?.description ||
    "Verification of land ownership, title history, encumbrances and records to ensure safe and dispute-free property transactions.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalize("/services/land-ownership-title-verification"),
    },
    keywords: [
      "land ownership verification",
      "title verification",
      "property title check",
      "encumbrance check",
      "property lawyer kanpur",
    ],
    openGraph: {
      title,
      description,
      url: canonicalize("/services/land-ownership-title-verification"),
      siteName: SEO_CONFIG.siteName,
      type: "article",
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: "Land Ownership & Title Verification - Arshiv Legal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page() {
  const { default: Data } = await import("@/Data/SubServices.json");
  const data = Data?.landVerification ?? null;

  if (!data) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20">
        <p className="text-red-main p-s16">
          Content not available right now. Please check back later.
        </p>
      </main>
    );
  }

  const faqs = Array.isArray(data.faqs) ? data.faqs : [];
  const covers = data.whatThisServiceCovers ?? {};
  const cards = Array.isArray(covers.cards) ? covers.cards : [];

  // -------------------------------
  // JSON-LD
  // -------------------------------
  const pageSchema = getWebPageSchema({
    title: `${data.title} — Arshiv Legal`,
    description: data.description,
    url: canonicalize("/services/land-ownership-title-verification"),
    type: "Service",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "Legal Services", url: canonicalize("/legal-services") },
    {
      name: data.title,
      url: canonicalize("/services/land-ownership-title-verification"),
    },
  ]);

  const organizationSchema = getOrganizationSchema();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    serviceType: "Land Ownership & Title Verification",
    description: data.description,
    provider: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      logo: SEO_CONFIG.logo,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: canonicalize("/contact-us"),
    },
    serviceOutput: cards.map((c) => ({
      "@type": "Thing",
      name: c.title,
    })),
    url: canonicalize("/services/land-ownership-title-verification"),
  };

  const faqSchema =
    faqs.length > 0
      ? getFAQSchema(
          faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))
        )
      : null;

  const ld = [
    pageSchema,
    breadcrumbSchema,
    organizationSchema,
    serviceSchema,
    ...(faqSchema ? [faqSchema] : []),
  ];

 return (
    <main >
      <JsonLd data={ld} />

      <section className="flex flex-col gap-[100px] md:gap-[200px]">
        <SubServicePage
          title={data.title}
          description={data.description}
          covers={covers}
          cards={cards}
        />

        <div className="w-full mx-auto max-w-7xl px-s16 md:px-s32">
          <FaqSection faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
