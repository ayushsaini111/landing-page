import AboutSection from "@/components/AboutPage";
import GetInTouch from "@/components/GetInTouch";
import React from "react";
import { SEO_CONFIG } from "@/lib/seo-config";
import JsonLd from "@/components/JsonLd";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getPersonSchema,
  getOrganizationSchema,
} from "@/utils/schema";

//----------------------------------------------------------

export const metadata = {
  title: "About Arshiv Legal — Corporate & Civil Law Experts in Kanpur",
  description:
    "Arshiv Legal provides structured, practical legal guidance. Meet Advocate Arshiv and the team — 15+ years of experience in corporate, startup and civil litigation in Kanpur.",
  alternates: {
    canonical: canonicalize("/about"),
  },
  // keep keywords concise and targeted for the about page
  keywords: [
    "about arshiv legal",
    "corporate lawyer kanpur",
    "civil lawyer kanpur",
    "advocate arshiv",
  ],
  // Open Graph (use absolute image below)
  openGraph: {
    title: "About Arshiv Legal — Experienced Corporate & Civil Lawyers",
    description:
      "Meet Advocate Arshiv and the Arshiv Legal team — experienced lawyers providing corporate, startup and civil litigation assistance in Kanpur.",
    url: canonicalize("/about"),
    siteName: SEO_CONFIG.siteName,
    type: "profile",
    images: [
      {
        url: `${SEO_CONFIG.siteUrl}/images/about-hero-og.jpg`, // ensure this exists in /public/images
        width: 1200,
        height: 630,
        alt: "Arshiv Legal - About",
      },
    ],
  },
};

//---------------------------------------------------------------------

function page() {
  // 1. WebPage / AboutPage schema
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/about"),
    type: "AboutPage",
  });

  // 2. Breadcrumbs for structured navigation
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "About", url: canonicalize("/about") },
  ]);

  // 3. Organization schema (company identity) - uses SEO_CONFIG fields
  //    This strengthens knowledge panel signals and provides organization contact/logo.
  const organizationSchema = getOrganizationSchema();

  // 4. Person (primary lawyer) schema
  //    Use absolute image URL and include social profiles in sameAs for credibility.
  const personSchema = getPersonSchema({
    name: "Advocate Arshiv",
    jobTitle: "Senior Corporate Lawyer",
    image: `${SEO_CONFIG.siteUrl}/images/arshiv.jpg`, // absolute URL (ensure /public/images/arshiv.jpg exists)
    url: canonicalize("/about"),
    description:
      "Advocate Arshiv is a Senior Corporate Lawyer with 15+ years of experience in corporate law, startups and civil litigation based in Kanpur.",
    sameAs: [
      SEO_CONFIG.social.linkedin,
      SEO_CONFIG.social.facebook,
      SEO_CONFIG.social.twitter,
    ],
  });

  // NOTE: We are intentionally NOT including an FAQ schema since the page (screenshot)
  //       does not contain an FAQ block. If you later add a Q&A section, we can add it.

  // Pass schemas as an array (your existing JsonLd component serializes this)
  const ld = [pageSchema, breadcrumbSchema, organizationSchema, personSchema];

  return (
    <>
      <JsonLd data={ld} />
      <AboutSection />
      <GetInTouch
        variant="white"
        height="220px"
        title="Start the Conversation That Can Change Everything"
        subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
      />
    </>
  );
}

export default page;
