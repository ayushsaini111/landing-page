import React from "react";
import ContactForm from "@/Sections/contact/ContactForm";
import dynamic from "next/dynamic";
import Gradient from "@/components/ui/Gradient";
import { MapPinHouse, PhoneForwarded } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import Data from "@/Data/ContactSection.json";
import { Suspense } from "react";

import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getFAQSchema,
} from "@/utils/schema";

// Lazy-load client-heavy components (maps, carousel/testimonials)
const ContactMap = dynamic(() => import("@/Sections/contact/map"), {
  loading: () => <div className="py-8">Loading map…</div>,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="py-8">Loading testimonials…</div>,
});
const FaqSection = dynamic(() => import("@/components/FaqSection"), {
  loading: () => <div className="py-6">Loading FAQs…</div>,
});

// ISR
export const revalidate = 60;

// Data
const contactSection = Data || {};
const initialFaqs = contactSection?.faqs || [];

const testimonialRaw = Data?.testimonials;
const testimonials = Array.isArray(testimonialRaw)
  ? testimonialRaw
  : Array.isArray(testimonialRaw?.list)
    ? testimonialRaw.list
    : [];

// Metadata
export const metadata = {
  title: contactSection?.title || "Contact Us | Arshiv Legal",
  description:
    contactSection?.subtitle ||
    contactSection?.description ||
    "Contact Arshiv Legal for clear, reliable legal guidance in civil, criminal, property, and public law matters.",
  alternates: {
    canonical: canonicalize("/contact-us"),
  },
  keywords: [
    "contact arshiv legal",
    "law firm kanpur",
    "legal consultation kanpur",
    "talk to a lawyer",
    "legal help kanpur",
  ],
  openGraph: {
    title: contactSection?.title || "Contact Arshiv Legal",
    description:
      contactSection?.subtitle ||
      "Reach out to Arshiv Legal for responsible and structured legal guidance.",
    url: canonicalize("/contact-us"),
    siteName: SEO_CONFIG.siteName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Arshiv Legal",
      },
    ],
  },
};

export default function ContactPage() {
  // Schemas
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/contact-us"),
    type: "ContactPage",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "Contact", url: canonicalize("/contact-us") },
  ]);

  const organizationSchema = getOrganizationSchema();

  const faqSchema =
    initialFaqs.length > 0
      ? getFAQSchema(
        initialFaqs.map((f) => ({
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

  if (!contactSection) {
    return (
      <main
        className="space-y-s40 md:space-y-s48 lg:space-y-s64"
        role="main"
        aria-label="contact page"
      >
        <Gradient title="Contact" />
        <section className="max-w-7xl mx-auto px-s16 md:px-s32">
          <p className="text-red-main p-s16">
            Contact information is currently unavailable.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main
      className="space-y-s40 md:space-y-s48 lg:space-y-s64 "
      role="main"
      aria-label="contact page"
    >
      <JsonLd data={ld} />
     <Gradient title={contactSection.title} />

      <section className="max-w-7xl  mx-auto px-s16 space-y-[100px] md:space-y-[150px] ">
        <div className="space-y-s16 md:space-y-s40 px-s16">
          <h2 className="heading-h2 text-primary-main">
            {contactSection.subtitle}
          </h2>
          <p className="text-md md:text-lg md:font-medium">{contactSection.description}</p>

        </div>

        {/* CONTACT BOX */}
        <div id="contact-form" className="max-w-5xl flex flex-col mx-auto md:flex-row bg-secondary-main p-s24 md:p-s64 rounded-r16 gap-s32 shadow">
          {/* LEFT */}
          <div className="md:w-1/2 heading-h4 space-y-s24">
            <h3 className="text-primary-main">
              {contactSection.address.title}
            </h3>
            <div className="flex gap-s8">
              <MapPinHouse size={24} color="#804012" />
              <div>
                <p className="body-default">{contactSection.address.line1}</p>
                <p className="body-default">{contactSection.address.line2}</p>
                <p className="body-default">{contactSection.address.line3}</p>
              </div>
            </div>

            <h3 className="text-primary-main">
              {contactSection.address.phoneTitle}
            </h3>
            <div className="flex gap-s8">
              <PhoneForwarded size={24} color="#804012" />
              <p className="body-default">
                {contactSection.address.phoneNumber}
              </p>
            </div>
          </div>

          {/* RIGHT */}
        <div className="md:w-1/2">
  <Suspense fallback={<div className="py-4">Loading form…</div>}>
    <ContactForm formData={contactSection.form} />
  </Suspense>
</div>

        </div>

        {/* MAP */}
        <ContactMap embedUrl={contactSection.map?.embedUrl} />

        {/* TESTIMONIALS */}
      </section >
      <div className="space-y-[100px] md:space-y-[200px] py-[100px] md:py-[200px]">
        <div className="py-[100px] md:py-[200px] px-s16 bg-secondary-main">
          <Testimonials list={testimonials} />
        </div>

        {/* FAQ */}
        <div className="max-w-7xl mx-auto px-s16 md:px-s32 pb-s40 md:pb-s48 lg:pb-s64">
          <FaqSection faqs={initialFaqs} />
        </div>
      </div>
    </main>
  );
}
