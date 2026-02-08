
import Image from "next/image";
import Data from "@/Data/WhatShouldIDoNow.json";
import FirstSafeSteps from "@/components/FirstSafeSteps";
import { ShieldAlert } from 'lucide-react';
import FaqSection from "@/components/FaqSection";
import GetInTouch from "@/components/GetInTouch";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getOrganizationSchema,
} from "@/utils/schema";

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


export default function WhatShouldIDo() {

    const {
        badge,
        heading,
        subHeading,
        image,
        warningBox,
        stepsTitle,
        steps,
        faqs
    } = Data;
    
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
        <section className="bg-background space-y-[100px] md:space-y-[200px]  mt-[66px] md:mt-[83px]">
            <div className="bg-secondary-main flex flex-col justify-center items-center text-center gap-s48  px-s24 py-[100px] md:py-[200px]">
                <div className="space-y-s16">
                    <span className="caption text-primary-light">
                        {badge}
                    </span>

                    <h1 className="heading-h2 text-center text-accent-main">
                        {heading}
                    </h1>

                    <p className="body-default mx-auto max-w-lg text-center text-primary-main">
                        {subHeading}
                    </p>
                </div>

                {/* IMAGE */}
                <div className="max-w-7xl mx-auto ">
                    <Image
                        src={image.url}
                        alt={image.alt}
                        width={1200}
                        height={600}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                        className="rounded-r16 object-cover w-full h-auto"
                        priority
                    />
                </div>
            </div>
            {/* HEADER */}

            <div className="max-w-7xl mx-auto  md:px-s32 space-y-[100px] md:space-y-[200px] typography-lg  pb-[100px] md:pb-[200px]">
                {/* WARNING BOX */}
                <div className="px-s24">
                    <div
                    className="
            bg-secondary-main
             border-2 border-accent-main
           rounded-r16
              px-s16 py-s24
            sm:px-s24 sm:py-s32
            lg:px-s40 lg:py-s48"
                >
                    <div
                        className="
                            flex  
                            gap-s8 sm:gap-s16
                            items-start"
                    >
                        {/* ICON */}
                        <Image
                            src={warningBox.icon}
                            alt={warningBox.title}
                            width={40}
                            height={40}
                            priority
                            className="shrink-0"
                        />

                        {/* TEXT */}
                        <div className="space-y-s8">
                            <p className=" text-xl font-primary font-medium md:text-3xl  text-accent-main">
                                {warningBox.title}
                            </p>

                            <p className="text-sm font-primary md:text-2xl font-medium text-secondary">
                                {warningBox.description}
                            </p>
                        </div>
                    </div>
                </div>
                </div>


                {/* FIRST SAFE STEPS */}

                <div className="px-s24"><FirstSafeSteps title={stepsTitle} steps={steps} /></div>
<div className="px-s16">
    
                <FaqSection faqs={faqs} />
</div>

                {/* CTA */}
                <GetInTouch
                    variant="white"
                    height="220px"
                    text="Get Guidance"
                    title="Start the Conversation That Can Change Everything"
                    subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
                />
            </div>

        </section>
        </>
    );
}
