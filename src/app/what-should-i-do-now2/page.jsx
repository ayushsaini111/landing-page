// /src/app/what-should-i-do-now/page.jsx
import React from "react";
import WhatShouldIDoNow from "@/components/WhatShouldIDoNow";
import FaqSection from "@/components/FaqSection";
import GetInTouch from "@/components/GetInTouch";
import Gradient from "@/components/ui/Gradient";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getOrganizationSchema,
} from "@/utils/schema";

// ISR
export const revalidate = 60;

export const metadata = {
  title:
    "What Should I Do Now? — Immediate Steps & Safe First Actions — Arshiv Legal",
  description:
    "Practical first steps to protect your rights after receiving a notice, complaint or other legal document. Learn what to avoid, what to preserve, and when to seek legal help.",
  alternates: {
    canonical: canonicalize("/what-should-i-do-now"),
  },
  keywords: [
    "what should i do now",
    "received a notice",
    "legal first steps",
    "immediate legal advice",
  ],
  openGraph: {
    title: "What Should I Do Now? — Arshiv Legal",
    description:
      "Clear, practical guidance on the first steps to take when you're facing a legal notice or dispute.",
    url: canonicalize("/what-should-i-do-now"),
    siteName: SEO_CONFIG.siteName,
    type: "article",
    images: [
      {
        url: `${SEO_CONFIG.siteUrl}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "What Should I Do Now - Arshiv Legal",
      },
    ],
  },
};

export default async function Page() {
  // Load JSON once
  const { default: Data } = await import("@/Data/WhatShouldIDoNow.json");

  const whatShouldIDoNow = Data;

  if (!whatShouldIDoNow) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20">
        <section>
          <p className="text-red-main p-s16">
            Content not available right now. Please check back later.
          </p>
        </section>
      </main>
    );
  }

  const { title, faqs = [] } = whatShouldIDoNow;

  // -------------------------------
  // JSON-LD
  // -------------------------------
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/what-should-i-do-now"),
    type: "Article",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    {
      name: "What Should I Do Now?",
      url: canonicalize("/what-should-i-do-now"),
    },
  ]);

  const organizationSchema = getOrganizationSchema();

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
    ...(faqSchema ? [faqSchema] : []),
  ];

  return (
    <>
      <JsonLd data={ld} />

      <main>
        <Gradient title={title} />

        <section className="max-w-7xl mx-auto px-s16 md:px-s32">
          {/* Main content */}
          <WhatShouldIDoNow />

          {/* FAQs (same source as schema) */}
          <div>
            <FaqSection faqs={faqs} />
          </div>

          {/* CTA */}
          <div>
            <GetInTouch
              variant="white"
              height="220px"
              title="Start the Conversation That Can Change Everything"
              subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
            />
          </div>
        </section>
      </main>
    </>
  );
}
