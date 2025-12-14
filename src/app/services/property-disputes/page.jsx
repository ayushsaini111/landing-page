// /src/app/services/property-disputes/page.jsx
import React from 'react';
import SubServicePage from '@/components/SubServicePage';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';
import { SEO_CONFIG } from '@/lib/seo-config';
import { canonicalize } from '@/utils/canonical';
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getFAQSchema,
} from '@/utils/schema';

export const revalidate = 60;

// ------------------------------------
// ⭐ DYNAMIC METADATA (Correct Method)
// ------------------------------------
export async function generateMetadata() {
  const { default: Data } = await import('@/Data/data.json');
  const data = Data?.subServices?.propertyDisputes ?? null;

  const title = data
    ? `${data.title} — Arshiv Legal`
    : 'Property Disputes — Arshiv Legal';

  const description =
    data?.description ||
    'Property disputes: resolve ownership, possession and boundary conflicts with clear legal guidance and practical routes for resolution.';

  return {
    title,
    description,
    keywords: [
      'property disputes',
      'land ownership',
      'encroachment',
      'boundary dispute',
      'family partition dispute',
      'Arshiv Legal Kanpur',
    ],
    alternates: {
      canonical: canonicalize('/services/property-disputes'),
    },
    openGraph: {
      title,
      description,
      url: canonicalize('/services/property-disputes'),
      siteName: SEO_CONFIG.siteName,
      type: 'article',
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}/images/property-disputes-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Property Disputes - Arshiv Legal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SEO_CONFIG.siteUrl}/images/property-disputes-og.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}
export default async function Page() {
    const { default: Data } = await import('@/Data/data.json');
  const data = Data?.subServices?.propertyDisputes ?? null;

    if (!data) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-20">
                <section>
                    <p className="text-red-main p-s16">Content not available right now. Please check back later.</p>
                </section>
            </main>
        );
    }

    const faqs = Array.isArray(data.faqs) ? data.faqs : [];
    const covers = data.whatThisServiceCovers ?? {};
    const cards = Array.isArray(covers.cards) ? covers.cards : [];

    const title = `${data.title} — Arshiv Legal`;
  const description = data.description;

  const pageSchema = getWebPageSchema({
    title,
    description,
    url: canonicalize('/services/property-disputes'),
    type: 'Service',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: canonicalize('/') },
    { name: 'Legal Services', url: canonicalize('/legal-services') },
    { name: data.title, url: canonicalize('/services/property-disputes') },
  ]);

  const organizationSchema = getOrganizationSchema();

  const subServiceNames = cards.map((card) => card.title).filter(Boolean);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    description: data.description,
    serviceType: 'Property Disputes',
    provider: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      logo: SEO_CONFIG.logo,
      sameAs: [
        SEO_CONFIG.social.linkedin,
        SEO_CONFIG.social.facebook,
        SEO_CONFIG.social.twitter,
      ].filter(Boolean),
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: canonicalize('/contact-us'),
    },
    serviceOutput: subServiceNames.map((name) => ({
      '@type': 'Thing',
      name,
    })),
    url: canonicalize('/services/property-disputes'),
  };

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
    serviceSchema,
    ...(faqSchema ? [faqSchema] : []),
  ];

    return (
        <main className="space-y-s40 lg:space-y-s64">
            <JsonLd data={ld} />
            <section className="flex flex-col gap-s40 md:gap-s64">
                <SubServicePage
                    title={data.title ?? ''}
                    description={data.description ?? ''}
                    covers={covers}
                    cards={cards}
                />

                <div className="w-full mx-auto max-w-7xl px-s16 md:px-s32">
                    <FaqSection faqs={faqs} />
                </div>
            </section>
        </main>
    );
}
