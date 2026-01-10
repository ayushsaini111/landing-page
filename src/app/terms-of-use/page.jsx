import React from "react";
import TermsOfUse from "@/components/TermsOfUse";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getOrganizationSchema,
} from "@/utils/schema";

// --------------------------
// SEO Metadata
// --------------------------
export const metadata = {
  title: "Terms of Use — Arshiv Legal",
  description:
    "Read the Terms of Use governing access to and use of the Arshiv Legal website, including disclaimers, limitations of liability, user responsibilities, and legal compliance.",
  alternates: {
    canonical: canonicalize("/terms-of-use"),
  },
  keywords: [
    "arshiv legal terms of use",
    "website terms and conditions",
    "legal website disclaimer",
    "user responsibilities",
    "terms of service arshiv legal",
  ],
  openGraph: {
    title: "Terms of Use — Arshiv Legal",
    description:
      "Understand the terms, conditions, and disclaimers applicable to the use of the Arshiv Legal website.",
    url: canonicalize("/terms-of-use"),
    siteName: SEO_CONFIG.siteName,
    type: "article",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Terms of Use - Arshiv Legal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use — Arshiv Legal",
    description:
      "Terms and conditions governing the use of the Arshiv Legal website.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  // --------------------------
  // JSON-LD
  // --------------------------
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/terms-of-use"),
    type: "WebPage",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "Terms of Use", url: canonicalize("/terms-of-use") },
  ]);

  const organizationSchema = getOrganizationSchema();

  const ld = [pageSchema, breadcrumbSchema, organizationSchema];

  return (
    <>
      <JsonLd data={ld} />
      <TermsOfUse />
    </>
  );
}
