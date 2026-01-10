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
  title: "About Arshiv Legal | Law Firm in Kanpur",
  description:
    "Learn about Arshiv Legal, a law firm in Kanpur focused on providing clear, structured legal guidance and responsible preliminary legal assistance for individuals and families.",
  alternates: {
    canonical: canonicalize("/about"),
  },
  keywords: [
    "about arshiv legal",
    "law firm in kanpur",
    "legal guidance kanpur",
    "legal consultation kanpur",
  ],
  openGraph: {
    title: "About Arshiv Legal | Law Firm in Kanpur",
    description:
      "Arshiv Legal is a law firm in Kanpur focused on clarity, structure, and responsible legal guidance for individuals and families.",
    url: canonicalize("/about"),
    siteName: SEO_CONFIG.siteName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-default.jpg", // ensure this exists
        width: 1200,
        height: 630,
        alt: "Arshiv Legal – Law Firm in Kanpur",
      },
    ],
  },
};

//---------------------------------------------------------------------

function Page() {
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/about"),
    type: "AboutPage",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "About", url: canonicalize("/about") },
  ]);

  const organizationSchema = getOrganizationSchema();

  const personSchema = getPersonSchema({
    name: "Aryan Pandey",
    jobTitle: "Founder",
    image: `${SEO_CONFIG.siteUrl}/Images/aryan.png`,
    url: canonicalize("/about"),
    description:
      "Aryan Pandey is the founder of Arshiv Legal, a law firm in Kanpur focused on structured legal guidance and responsible legal assistance for individuals and families.",
    sameAs: [SEO_CONFIG.social.LinkedIn].filter(Boolean),
  });

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

export default Page;
