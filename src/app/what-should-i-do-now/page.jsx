// /src/app/what-should-i-do-now/page.jsx
import React from 'react';
import WhatShouldIDoNow from '@/components/WhatShouldIDoNow';
import FaqSection from '@/components/FaqSection';
import GetInTouch from '@/components/GetInTouch';
import Gradient from '@/components/ui/Gradient';
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getOrganizationSchema,
} from "@/utils/schema";


// ISR: revalidate this route every 60 seconds (adjust to your needs)
export const revalidate = 60;

export const metadata = {
  title: "What Should I Do Now? — Immediate Steps & Safe First Actions",
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
      "Clear, practical guidance on the first steps to take when you're facing a legal notice or dispute. Preserve evidence, avoid self-incriminating statements, and get professional advice.",
    url: canonicalize("/what-should-i-do-now"),
    siteName: SEO_CONFIG.siteName,
    type: "article",
    images: [
      {
        url: `${SEO_CONFIG.siteUrl}/images/what-should-i-do-now-og.jpg`,
        width: 1200,
        height: 630,
        alt: "What Should I Do Now - Arshiv Legal",
      },
    ],
  },
};

export default async function Page() {
    // Page schema
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/what-should-i-do-now"),
    type: "Article",
  });

  // Breadcrumbs
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "What Should I Do Now?", url: canonicalize("/what-should-i-do-now") },
  ]);

  // Organization (site identity)
  const organizationSchema = getOrganizationSchema();

  // FAQ content visible on the page (matches screenshot)
  const faqseo = [
    {
      question: "I just received a notice/complaint. What should I do first?",
      answer:
        "Stay calm. Read the notice carefully, preserve the original document, do not delete messages or documents, and do not sign or send replies without legal advice. Contact a lawyer to understand deadlines and options.",
    },
    {
      question: "Do I really need a lawyer right now?",
      answer:
        "Not every situation requires immediate litigation, but early legal advice can protect your position and prevent mistakes. If the notice threatens legal action, consult a lawyer promptly.",
    },
    {
      question: "Can I talk to the other party directly and sort it out?",
      answer:
        "You may attempt a direct discussion, but avoid admitting fault or making binding statements. If the matter is sensitive, take a pause and seek legal guidance before negotiating.",
    },
    {
      question: "What if I don't understand the legal terms in my documents?",
      answer:
        "Keep a copy and ask a legal professional to explain the terms. Do not sign or respond until you understand the implications.",
    },
  ];

  // FAQ schema for structured data
  const faqSchema = getFAQSchema(faqseo.map((f) => ({ question: f.question, answer: f.answer })));

  // Aggregate all JSON-LD objects
  const ld = [pageSchema, breadcrumbSchema, organizationSchema, faqSchema];


    // Load large JSON at render time to keep the module bundle smaller
    const { default: Data } = await import('@/Data/data.json');

    const faqs = Data?.primaryServices?.faqs ?? [];
    const whatShouldIDoNow = Data?.whatShouldIDoNow;

    if (!whatShouldIDoNow) {
        return (

            <main className="mx-auto max-w-7xl px-4 py-20">
                <section>
                    <p className="text-red-main p-s16">Content not available right now. Please check back later.</p>
                </section>
            </main>
        );
    }

    const { title } = whatShouldIDoNow;

    return (
         <>
      <JsonLd data={ld} />
        <main>
            <Gradient title={title} />

            <section className="max-w-7xl mx-auto px-s16 md:px-s32">
                {/* Primary content: server-rendered component (keeps JS minimal) */}
                <WhatShouldIDoNow />

                {/* FAQ: safe, uses data from JSON */}
                <div>
                    <FaqSection faqs={faqs} />
                </div>

                {/* CTAs */}
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
