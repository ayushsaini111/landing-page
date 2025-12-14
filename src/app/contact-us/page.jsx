import React from 'react';
import ContactForm from '@/Sections/contact/ContactForm';
import dynamic from 'next/dynamic';
import Gradient from '@/components/ui/Gradient';
import { MapPinHouse, PhoneForwarded } from 'lucide-react';
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import Data from "@/Data/data.json";
import {
    getWebPageSchema,
    getBreadcrumbSchema,
    getOrganizationSchema,
    getFAQSchema,
} from "@/utils/schema";

// Lazy-load client-heavy components (maps, carousel/testimonials)
const ContactMap = dynamic(() => import('@/Sections/contact/map'), {
    loading: () => <div className="py-8">Loading map…</div>
});
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
    loading: () => <div className="py-8">Loading testimonials…</div>
});
const FaqSection = dynamic(() => import('@/components/FaqSection'), {
    loading: () => <div className="py-6">Loading FAQs…</div>
});

// ISR: revalidate this route every 60 seconds (adjust to taste)
export const revalidate = 60;
// Use multiple fallbacks to find contact data in your provided data.json
const contactSection = Data?.contactSection || {};

// Some contact JSONs put faqs/testimonials at other places; try sensible fallbacks
const initialFaqs = contactSection?.faqs || Data?.homePage?.faqs || Data?.primaryServices?.faqs || [];
const testimonialRaw = Data?.testimonials;
const testimonials = Array.isArray(testimonialRaw)
  ? testimonialRaw
  : Array.isArray(testimonialRaw?.list)
  ? testimonialRaw.list
  : [];
const embedUrl = contactSection?.map?.embedUrl || "";

// Metadata
export const metadata = {
    title: contactSection?.title || "Contact us - Arshiv Legal",
    description:
        contactSection?.subtitle ||
        contactSection?.description ||
        "Contact Arshiv Legal for reliable legal guidance in civil, criminal, property and public law matters.",
    alternates: {
        canonical: canonicalize("/contact-us"),
    },
    keywords: [
        "contact arshiv legal",
        "legal consultation kanpur",
        "talk to a lawyer",
        "legal help",
    ],
    openGraph: {
        title: contactSection?.ogTitle || contactSection?.title || "Contact Arshiv Legal",
        description:
            contactSection?.ogDescription ||
            contactSection?.subtitle ||
            "Reach out to Arshiv Legal for expert legal consultation.",
        url: canonicalize("/contact-us"),
        siteName: SEO_CONFIG.siteName,
        type: "website",
        images: [
            {
                url: `${SEO_CONFIG.siteUrl}/images/contact-og.jpg`,
                width: 1200,
                height: 630,
                alt: "Contact Arshiv Legal",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: contactSection?.ogTitle || contactSection?.title || "Contact Arshiv Legal",
        description:
            contactSection?.ogDescription || contactSection?.subtitle || "Reach out to Arshiv Legal for expert legal consultation.",
        images: [`${SEO_CONFIG.siteUrl}/images/contact-og.jpg`],
    },
};

export default async function ContactSection() {
    // Build JSON-LD objects using helpers
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

    const faqSchema = initialFaqs.length > 0
        ? getFAQSchema(initialFaqs.map((f) => ({ question: f.question, answer: f.answer })))
        : null;

    // Try to extract coordinates from standard Google Maps embed patterns (best-effort)
    let latitude = null;
    let longitude = null;
    try {
        const match = embedUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
        if (match) {
            latitude = match[1];
            longitude = match[2];
        }
    } catch (e) {
        // ignore parse errors
    }

    const locationSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: SEO_CONFIG.siteName,
        url: canonicalize("/contact-us"),
        image: SEO_CONFIG.logo,
        telephone: contactSection?.address?.phoneNumber || SEO_CONFIG.contact.phone,
        address: {
            "@type": "PostalAddress",
            streetAddress: contactSection?.address?.line1 || contactSection?.address?.street || "",
            addressLocality: contactSection?.address?.line2 || contactSection?.address?.city || "",
            addressRegion: contactSection?.address?.line3 || contactSection?.address?.region || "",
            postalCode: contactSection?.address?.postalCode || "",
            addressCountry: contactSection?.address?.country || SEO_CONFIG.contact?.address?.country || "IN",
        },
        geo: latitude && longitude ? { "@type": "GeoCoordinates", latitude, longitude } : undefined,
        sameAs: [SEO_CONFIG.social.linkedin, SEO_CONFIG.social.facebook, SEO_CONFIG.social.twitter].filter(Boolean),
    };

    const reviews = testimonials.map((t) => ({
        "@type": "Review",
        reviewBody: t.message || t.text || t.review || "",
        author: { "@type": "Person", name: t.name || t.author || "Client" },
    }));

    const ld = [pageSchema, breadcrumbSchema, organizationSchema, locationSchema, ...(faqSchema ? [faqSchema] : []), ...reviews];

    if (!contactSection) {
        return (
            <main className="space-y-s40 md:space-y-s48 lg:space-y-s64" role="main" aria-label="contact page">
                <Gradient title="Contact" />
                <section className="max-w-7xl mx-auto px-s16 md:px-s32 space-y-s40 md:space-y-s48 lg:space-y-s64">
                    <p className="text-red-main p-s16">Contact information is currently unavailable. Please try again later.</p>
                </section>
            </main>
        );
    }

    return (

        <main className="space-y-s40 md:space-y-s48 lg:space-y-s64" role="main" aria-label="contact page">
            <JsonLd data={ld} />
            <Gradient title={contactSection.title} />

            <section className="max-w-7xl mx-auto px-s16 md:px-s32 space-y-s40 md:space-y-s48 lg:space-y-s64">

                <h2 className="page-title-h2 text-primary-main">{contactSection.subtitle}</h2>

                <p className="body-large">{contactSection.description}</p>

                {/* CONTACT BOX */}
                <div className="max-w-5xl flex flex-col  mx-auto md:flex-row bg-secondary-main/20 p-s24 md:p-s32 rounded-r16 gap-s32 shadow" aria-label="contact details and form">

                    {/* LEFT SIDE (Address) */}
                    <div className="md:w-1/2 title-h4 space-y-s24">
                        <h3 className=" text-primary-main">{contactSection.address.title}</h3>
                        <div className="flex gap-s8">
                            <MapPinHouse size={24} color={"#804012"} />
                            <div>
                                <p className="body-default">{contactSection.address.line1}</p>
                                <p className="body-default">{contactSection.address.line2}</p>
                                <p className="body-default">{contactSection.address.line3}</p>
                            </div>
                        </div>

                        <h3 className=" text-primary-main">{contactSection.address.phoneTitle}</h3>
                        <div className="flex gap-s8">
                            <PhoneForwarded size={24} color={"#804012"} />
                            <p className="body-default">{contactSection.address.phoneNumber}</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE (Form) */}
                    <div className="md:w-1/2 ">
                        <ContactForm formData={contactSection.form} />
                    </div>
                </div>

                {/* MAP */}
                <ContactMap embedUrl={contactSection.map?.embedUrl} />

                {/* TESTIMONIALS */}
                <div className='space-y-s24 md:space-y-s32'>
                    <h2 className='text-accent-main page-title-h2'>Testimonials</h2>
                    <Testimonials list={testimonials} />
                </div>

            </section>

            <div className='max-w-7xl mx-auto px-s16 md:px-s32 pb-s40 md:pb-s48 lg:pb-s64' aria-label="frequently asked questions">
                <FaqSection faqs={initialFaqs} />
            </div>
        </main>
    );
}
