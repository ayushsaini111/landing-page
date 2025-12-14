

import { Suspense } from "react";
import FaqSection from "@/components/FaqSection";
import PrimaryServices from "@/components/PrimaryServices";
import GetInTouch from "@/components/GetInTouch";
import Data from "@/Data/data.json";
import JsonLd from "@/components/JsonLd";
import { SEO_CONFIG } from "@/lib/seo-config";
import { canonicalize } from "@/utils/canonical";
import { services as SERVICES_MAP } from "@/Data/Navlink"; // your services map (category -> [{label, href}, ...])
import {
    getWebPageSchema,
    getBreadcrumbSchema,
    getOrganizationSchema,
    getFAQSchema,
} from "@/utils/schema";

export const metadata = {
    title: "Legal Services — Civil, Criminal, Property & Public Law | Arshiv Legal",
    description:
        "Arshiv Legal provides expert guidance across Civil, Criminal, Administrative, Public, Constitutional and Property law. Explore our services and sub-services to find the right legal help.",
    alternates: {
        canonical: canonicalize("/legal-services"),
    },
    keywords: [
        "legal services",
        "civil law services",
        "criminal law services",
        "property law",
        "administrative law",
        "public law",
        "constitutional law",
        "Arshiv Legal Kanpur",
    ],
    openGraph: {
        title: "Legal Services — Arshiv Legal",
        description:
            "Explore Arshiv Legal's practice areas: Civil, Criminal, Administrative, Public, Constitutional and Property law. Clear, prompt legal guidance when it matters.",
        url: canonicalize("/legal-services"),
        siteName: SEO_CONFIG.siteName,
        type: "website",
        images: [
            {
                url: `${SEO_CONFIG.siteUrl}/images/services-og.jpg`, // ensure exists
                width: 1200,
                height: 630,
                alt: "Arshiv Legal - Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Legal Services — Arshiv Legal",
        description:
            "Explore Arshiv Legal's practice areas: Civil, Criminal, Administrative, Public, Constitutional and Property law.",
        images: [`${SEO_CONFIG.siteUrl}/images/services-og.jpg`],
    },
};


const faqs = Data.primaryServices.faqs;

export default function Page() {
    // 1. WebPage schema (Service page)
    const pageSchema = getWebPageSchema({
        title: metadata.title,
        description: metadata.description,
        url: canonicalize("/legal-services"),
        type: "Service", // indicates the page is about services
    });

    // 2. Breadcrumbs
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: canonicalize("/") },
        { name: "Legal Services", url: canonicalize("/legal-services") },
    ]);

    // 3. Organization (site identity)
    const organizationSchema = getOrganizationSchema();

    // 4. Services structured data
    // SERVICES_MAP is expected to be an object: { "Civil Law": [{label, href}, ...], ... }
    // Build a Service object per main category, include subservices as 'serviceOutput' (array of strings)
    const servicesSchema = Object.entries(SERVICES_MAP || {}).map(([category, items]) => {
        const subServices = (items || []).map((it) => it.label || it);
        return {
            "@context": "https://schema.org",
            "@type": "Service",
            name: category,
            serviceType: category,
            description: `${category} — ${subServices.slice(0, 6).join(", ")}`, // concise description
            provider: {
                "@type": "Organization",
                name: SEO_CONFIG.siteName,
                url: SEO_CONFIG.siteUrl,
                logo: SEO_CONFIG.logo,
                sameAs: [SEO_CONFIG.social.linkedin, SEO_CONFIG.social.facebook, SEO_CONFIG.social.twitter].filter(Boolean),
            },
            availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: canonicalize("/contact"),
            },
            // include the list of sub-services to help search engines understand page structure
            serviceOutput: subServices.map((s) => ({ "@type": "Thing", name: s })),
            url: canonicalize("/legal-services"),
        };
    });

    // 5. FAQ on the page (screenshot shows 4 items) -> structured FAQ
    const faqs = Data.primaryServices?.faqs || [
        {
            question: "I'm not sure which service I need. What should I do?",
            answer:
                "If you're unsure, pick the closest category and use our contact form or call us. We will clarify the best path and next steps after a short intake.",
        },
        {
            question: "How do I contact you or get help?",
            answer: "Use the 'Get in touch' button, email contact@arshivlegal.in, or call the phone number listed in the footer. We'll respond promptly.",
        },
        {
            question: "Do I need any documents before contacting you?",
            answer:
                "Bring any notices, contracts, messages or relevant documents you have. If you're unsure, a short description is fine — we'll tell you what else is useful.",
        },
        {
            question: "Will my information stay private?",
            answer:
                "Yes. All client communications are treated as confidential. We will never share your details without consent, except as required by law.",
        },
    ];

    const faqSchema = getFAQSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

    // Aggregate all JSON-LD objects: page, breadcrumb, organization, individual services, faq
    // Note: JsonLd component can accept an array (it will render as a single script with array OR multiple scripts depending on implementation).
    const ld = [pageSchema, breadcrumbSchema, organizationSchema, ...servicesSchema, faqSchema];

    return (
        <main className="">
            <JsonLd data={ld} />
            <Suspense fallback={<div>Loading services...</div>}>
                <PrimaryServices />
            </Suspense>
            <div className="max-w-7xl w-full mx-auto space-y-s40 md:space-y-s48 lg:space-y-s64 pb-s40 md:pb-s48 lg:pb-s64 ">
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
