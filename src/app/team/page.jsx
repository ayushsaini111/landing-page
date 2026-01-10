import Gradient from "@/components/ui/Gradient";
import Data from "@/Data/OurTeam.json";
import GetInTouch from "@/components/GetInTouch";
import TeamCard from "@/components/teamCard";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getPersonSchema,
} from "@/utils/schema";

const { pageTitle, description, section1, section3, section4 } = Data;
const testimonial = Data || [];

// --------------------------
// SEO Metadata
// --------------------------
export const metadata = {
  title: "Our Legal Team — Arshiv Legal",
  description:
    "Meet Aryan Pandey, Founder and Principal Legal Professional at Arshiv Legal. Learn about the values, approach, and people guiding responsible legal support.",
  alternates: {
    canonical: canonicalize("/team"),
  },
  keywords: [
    "Arshiv Legal team",
    "Aryan Pandey lawyer",
    "founder arshiv legal",
    "principal legal professional",
    "law firm team kanpur",
  ],
  openGraph: {
    title: "Our Legal Team — Arshiv Legal",
    description:
      "Founder-led legal guidance with clarity, responsibility, and trust.",
    url: canonicalize("/team"),
    siteName: SEO_CONFIG.siteName,
    type: "website",
    images: [
      {
        url: "/Images/aryan.png",
        width: 1200,
        height: 630,
        alt: "Aryan Pandey – Founder & Principal Legal Professional, Arshiv Legal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Legal Team — Arshiv Legal",
    description:
      "Meet Aryan Pandey, Founder and Principal Legal Professional at Arshiv Legal.",
    images: ["/Images/aryan.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  // --------------------------
  // JSON-LD Schemas
  // --------------------------
  const pageSchema = getWebPageSchema({
    title: metadata.title,
    description: metadata.description,
    url: canonicalize("/team"),
    type: "AboutPage",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: canonicalize("/") },
    { name: "Team", url: canonicalize("/team") },
  ]);

  const organizationSchema = getOrganizationSchema();

  const personSchema = getPersonSchema({
    name: "Aryan Pandey",
    jobTitle: "Founder & Principal Legal Professional",
    image: `${SEO_CONFIG.siteUrl}/Images/aryan.png`,
    url: canonicalize("/team"),
    description:
      "Aryan Pandey is the Founder and Principal Legal Professional at Arshiv Legal, known for providing structured, responsible, and client-focused legal guidance.",
  });

  const ld = [pageSchema, breadcrumbSchema, organizationSchema, personSchema];

  // --------------------------
  // Page UI
  // --------------------------
  return (
    <>
      <JsonLd data={ld} />

      <Gradient title={pageTitle} description={description} />

      <div className="w-full max-w-7xl mx-auto px-s16 md:px-s32 space-y-s40 md:space-y-s48 lg:space-y-s64">
        {/* INTRO */}
        <div className="space-y-s24">
          <h2 className="page-title-h2 text-accent-main">{section1.heading}</h2>
          <p className="body-large">{section1.content}</p>
        </div>

        {/* TEAM */}
        <div className="lg:space-y-s64">
          {Data.teamMember?.map((member, index) => (
            <TeamCard
              key={index}
              image={member.dpImage}
              heading={member.heading}
              content={member.content}
              imagePosition={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        {/* VALUES / APPROACH */}
        <div className="space-y-s24">
          <h2 className="page-title-h2 text-accent-main">{section3.heading}</h2>
          <p className="body-large">{section3.content}</p>
        </div>

        {/* TESTIMONIALS */}
        <div className="space-y-s24">
          <h2 className="page-title-h2 text-accent-main">{section4.heading}</h2>
          <Testimonials list={testimonial?.list || []} />
          <p className="text-center body-small text-disable">
            {section4.content}
          </p>
        </div>

        {/* CTA */}
        <GetInTouch
          variant="white"
          height="220px"
          title="Start the Conversation That Can Change Everything"
          subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
        />
      </div>
    </>
  );
}
