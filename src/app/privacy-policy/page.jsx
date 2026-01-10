import PrivacyPolicy from "@/components/privacyPolicy";
import React from "react";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getOrganizationSchema,
} from "@/utils/schema";

export const metadata = {
  title: "Privacy Policy — Arshiv Legal",
  description:
    "Read Arshiv Legal's Privacy Policy to understand how we collect, use, store, and protect your personal information. Learn about data security, cookies, user rights, retention, third-party sharing, and policy updates.",
  alternates: {
    canonical: canonicalize("/privacy-policy"),
  },
  keywords: [
    "arshiv legal privacy policy",
    "legal website privacy policy",
    "data protection arshiv legal",
    "how arshiv legal uses data",
    "legal compliance privacy",
  ],
  openGraph: {
    title: "Privacy Policy — Arshiv Legal",
    description:
      "Learn how Arshiv Legal handles your data including collection, security, retention, user rights, cookies, legal basis, and third-party disclosures.",
    url: canonicalize("/privacy-policy"),
    siteName: SEO_CONFIG.siteName,
    type: "article",
    images: [
      {
        url: `${SEO_CONFIG.siteUrl}/og-default.jpg`, // add this image in /public/images/
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Arshiv Legal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Arshiv Legal",
    description:
      "Understand how Arshiv Legal manages, processes, and protects your data. Includes security, retention, rights, cookies, and compliance standards.",
    images: [`${SEO_CONFIG.siteUrl}/og-default.jpg`],
  },
};
function page() {
  // 1. WebPage Schema
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/privacy-policy"),
    type: "PrivacyPolicy",
  });

  // 2. BreadcrumbSchema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "Privacy Policy", url: canonicalize("/privacy-policy") },
  ]);

  // 3. Organization schema (Recommended for legal websites)
  const organizationSchema = getOrganizationSchema();

  const ld = [pageSchema, breadcrumbSchema, organizationSchema];

  return (
    <>
      <JsonLd data={ld} />
      <PrivacyPolicy />
    </>
  );
}

export default page;
