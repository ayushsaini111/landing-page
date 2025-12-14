// /src/app/page.js
import React from 'react';
import dynamic from 'next/dynamic';
import AboutSection from '@/Sections/Home/AboutSection';
import DontHesitateSection from '@/Sections/Home/DontHesitateSection';
import ServicesSection from '@/Sections/Home/ServiceSecion';
import FaqSection from '@/components/FaqSection';
import GetInTouch from '@/components/GetInTouch';
import HeroSection from '@/Sections/Home/HeroSection';
import Data from '@/Data/data.json';
import { SEO_CONFIG } from "@/lib/seo-config";
import JsonLd from "@/components/JsonLd";
import { canonicalize } from "@/utils/canonical";
import { getWebPageSchema, getWebsiteSchema } from "@/utils/schema";

//-----------------------SEO----------------------

export const metadata = {
    title: "Best Corporate Lawyers in Kanpur",
    description: "Arshiv Legal provides expert legal services for startups, businesses, and civil litigation in Kanpur. Book a consultation today.",
    alternates: {
        canonical: canonicalize("/"),
    },
    // Added keywords for semantic understanding
    keywords: ["corporate lawyer kanpur", "civil lawyer kanpur", "startup legal services", "legal consultancy"],
    // Explicit Open Graph fields as requested
    openGraph: {
        title: "Best Corporate Lawyers in Kanpur",
        description: "Arshiv Legal provides expert legal services for startups, businesses, and civil litigation in Kanpur.",
        url: canonicalize("/"),
        siteName: SEO_CONFIG.siteName,
        locale: "en_IN",
        type: "website",
        images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Arshiv Legal Office" }],
    }
};
//-----------------------SEO end ----------------------

// Dynamically import heavy or infrequently-critical sections to split bundles
const CaseStudy = dynamic(() => import('@/Sections/Home/CaseStudy'), {
    loading: () => <div aria-hidden className="py-12">Loading case studies…</div>
});
const PricingSection = dynamic(() => import('@/Sections/Home/PricingSection'), {
    loading: () => <div aria-hidden className="py-12">Loading pricing…</div>
});
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), {
    loading: () => <div aria-hidden className="py-12">Loading…</div>
});
const HowWeWork = dynamic(() => import('@/Sections/Home/HowWeWork'), {
    loading: () => <div aria-hidden className="py-12">Loading…</div>
});
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
    loading: () => <div className="py-8">Loading testimonials…</div>
});

// Revalidate the page every 60 seconds (ISR) - adjust as needed
export const revalidate = 60;

const faqs = Data?.homePage?.faqs || [];
const testimonial = Data?.testimonials || [];

export default function Page() {
    const pageSchema = getWebPageSchema({
        title: metadata.title,
        description: metadata.description,
        url: canonicalize("/"),
    });

    // Only the homepage gets the "WebSite" schema (Search Box)
    const websiteSchema = getWebsiteSchema();
    return (
        <>
            <JsonLd data={[pageSchema, websiteSchema]} />
            <main role="main" className="w-full lg:py-s64 lg:px-s64">
                <section aria-labelledby="hero-heading">
                    <HeroSection />
                </section>
                <div className="max-w-7xl mx-auto flex flex-col space-y-s40 md:space-y-s48 lg:space-y-s64 px-s16 md:px-s32 py-s40 md:py-s48 lg:py-s64">
                    {/* Hero: keep server-rendered for SEO / LCP */}

                    <section aria-labelledby="about-heading">
                        <AboutSection />
                    </section>

                    <section aria-labelledby="dont-hesitate-heading">
                        <DontHesitateSection />
                    </section>

                    <section aria-labelledby="services-heading">
                        <ServicesSection />
                    </section>

                    {/* These are dynamic imports - they will be code-split to reduce initial bundle */}
                    <section aria-labelledby="case-study-heading">
                        <CaseStudy />
                    </section>

                    <section aria-labelledby="why-choose-us-heading">
                        <WhyChooseUs />
                    </section>

                    <section aria-labelledby="pricing-heading">
                        <PricingSection />
                    </section>

                    <section className='space-y-s24 md:space-y-s32' aria-labelledby="testimonial-heading">
                        <h2 className='text-accent-main page-title-h2'>Testimonials</h2>
                        <Testimonials list={testimonial?.list || []} />
                    </section>

                    <section aria-labelledby="how-we-work-heading">
                        <HowWeWork />
                    </section>

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
