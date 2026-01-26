import { Suspense } from "react";
import FaqSection from "@/components/FaqSection";
import PrimaryServices from "@/components/PrimaryServices";
import GetInTouch from "@/components/GetInTouch";
import Data from "@/Data/PrimaryServices.json";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getFAQSchema,
} from "@/utils/schema";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title:
    "Legal Services — Civil, Criminal, Property & Public Law | Arshiv Legal",
  description:
    "Arshiv Legal provides legal guidance across civil, criminal, administrative, public, constitutional, and property law matters. Explore our services to find the right legal support.",
  alternates: {
    canonical: canonicalize("/legal-services"),
  },
  keywords: [
    "legal services kanpur",
    "civil law services",
    "criminal law services",
    "property law",
    "administrative law",
    "public law",
    "constitutional law",
    "Arshiv Legal",
  ],
  openGraph: {
    title: "Legal Services | Arshiv Legal",
    description:
      "Explore Arshiv Legal’s legal services across civil, criminal, property, administrative and constitutional law.",
    url: canonicalize("/legal-services"),
    siteName: SEO_CONFIG.siteName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Arshiv Legal – Legal Services",
      },
    ],
  },
};

const faqs = Data?.faqs || [];

export default function Page() {
  // WebPage schema (service hub)
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/legal-services"),
    type: "CollectionPage",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "Legal Services", url: canonicalize("/legal-services") },
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
    <main>
      <JsonLd data={ld} />

      <Suspense fallback={<div>Loading services...</div>}>
        <PrimaryServices />
      </Suspense>
<div className="max-w-7xl px-s16 w-full mx-auto pb-[100px] md:pb-[200px]">
  
        <WhyChooseUs />
</div>
        <div className="bg-secondary-main px-s16 py-[100px] md:py-[200px]">
          <Testimonials />
        </div>
      <div className="max-w-7xl px-s16 w-full mx-auto space-y-[100px] md:space-y-[200px] py-[100px] md:py-[200px]">
        <FaqSection faqs={faqs} />
        <GetInTouch
          variant="blue"
          height="470px"
          title="Need guidance?"
          subtitle="If you're dealing with an issue related to this service, feel free to reach out. We'll explain your options clearly and guide you through the right next steps."
        />
      </div>
    </main>
  );
}
