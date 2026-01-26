// /src/app/page.js
import React from "react";
import dynamic from "next/dynamic";
import AboutSection from "@/Sections/Home/AboutSection";
import DontHesitateSection from "@/Sections/Home/DontHesitateSection";
import ServicesSection from "@/Sections/Home/ServiceSecion";
import FaqSection from "@/components/FaqSection";
import GetInTouch from "@/components/GetInTouch";
import HeroSection from "@/Sections/Home/HeroSection";
import Data from "@/Data/HomePage.json";
import Data2 from "@/Data/Testimonials.json";
import { SEO_CONFIG } from "@/lib/seo-config";
import JsonLd from "@/components/JsonLd";
import { canonicalize } from "@/utils/canonical";
import {
    getWebPageSchema,
    getWebsiteSchema,
    getFAQSchema,
} from "@/utils/schema";

//-----------------------SEO----------------------

export const metadata = {
    title: "Arshiv Legal | Law Firm in Kanpur",
    description:
        "Arshiv Legal is a law firm in Kanpur offering legal consultation and representation across civil, criminal, and constitutional matters for individuals and families.",
    alternates: {
        canonical: canonicalize("/"),
    },
    openGraph: {
        title: "Arshiv Legal | Law Firm in Kanpur",
        description:
            "Arshiv Legal is a law firm in Kanpur offering legal consultation and representation across civil, criminal, and constitutional matters for individuals and families.",
        url: canonicalize("/"),
        siteName: SEO_CONFIG.siteName,
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/og-default.jpg",
                width: 1200,
                height: 630,
                alt: "Arshiv Legal – Law Firm in Kanpur",
            },
        ],
    },
};

//-----------------------SEO end ----------------------

// Dynamically import heavy or infrequently-critical sections to split bundles
const CaseStudy = dynamic(() => import("@/Sections/Home/CaseStudy"), {
    loading: () => (
        <div aria-hidden className="py-12">
            Loading case studies…
        </div>
    ),
});
const PricingSection = dynamic(() => import("@/Sections/Home/PricingSection"), {
    loading: () => (
        <div aria-hidden className="py-12">
            Loading pricing…
        </div>
    ),
});
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
    loading: () => (
        <div aria-hidden className="py-12">
            Loading…
        </div>
    ),
});
const HowWeWork = dynamic(() => import("@/Sections/Home/HowWeWork"), {
    loading: () => (
        <div aria-hidden className="py-12">
            Loading…
        </div>
    ),
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
    loading: () => <div className="py-8">Loading testimonials…</div>,
});

// Revalidate the page every 60 seconds (ISR) - adjust as needed
export const revalidate = 60;

const faqs = Data?.faqs || [];
const testimonial = Data2 || [];

export default function Page() {
    const pageSchema = getWebPageSchema({
        title: metadata.title,
        description: metadata.description,
        url: canonicalize("/"),
    });

    // Only the homepage gets the "WebSite" schema (Search Box)
    const websiteSchema = getWebsiteSchema();
    const faqSchema = faqs && faqs.length > 0 ? getFAQSchema(faqs) : null;

    return (
        <>
            <JsonLd data={[pageSchema, websiteSchema, faqSchema].filter(Boolean)} />

            <main role="main" className="w-full mt-[66px] md:mt-[83px] ">
                <section aria-labelledby="hero-heading ">
                    <HeroSection />
                </section>

                <div className="max-w-7xl mx-auto flex flex-col px-s16 md:px-s32 py-[100px] md:py-[200px]">
                    {/* Hero: keep server-rendered for SEO / LCP */}

                    <section aria-labelledby="about-heading">
                        <AboutSection />
                    </section>
                </div>

                <div className="bg-secondary-main ">

                    <section aria-labelledby="dont-hesitate-heading">
                        <DontHesitateSection />
                    </section>
                </div>


                <div className="bg-secondary-main space-y-[100px]  md:space-y-[200px] py-[100px] md:py-[200px] px-s24 md:px-s32">
                    <section aria-labelledby="services-heading">
                        <ServicesSection />
                    </section>

                    {/* These are dynamic imports - they will be code-split to reduce initial bundle */}
                    <section aria-labelledby="case-study-heading">
                        <CaseStudy />
                    </section>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col space-y-[100px]  md:space-y-[200px] px-s16 md:px-s32 py-[100px] md:py-[200px]">
                    <section aria-labelledby="why-choose-us-heading">
                        <WhyChooseUs />
                    </section>

                    <section aria-labelledby="pricing-heading">
                        <PricingSection />
                    </section>
                </div>
                <section
                    className="bg-secondary-main py-[100px] md:py-[200px] px-s16 md:px-s32"
                    aria-labelledby="testimonial-heading"
                >

                    <Testimonials list={testimonial?.list || []} />
                </section>

                {/* <section aria-labelledby="how-we-work-heading">
                        <HowWeWork />
                    </section> */}
                    
                <div className="max-w-7xl mx-auto flex flex-col space-y-[100px]  md:space-y-[200px] py-[100px] md:py-[200px] px-s16 md:px-s32">
                    <section aria-labelledby="faq-heading">
                        <FaqSection faqs={faqs} />
                    </section>

                    <section aria-labelledby="contact-heading">
                        <GetInTouch
                            variant="blue"
                            title="Start the Conversation That Can Change Everything"
                            subtitle={
                                "If you're dealing with an issue related to this service, feel free to reach out. We'll explain your options clearly and guide you through the right next steps."
                            }
                        />
                    </section>
                </div>
            </main>
        </>
    );
}
