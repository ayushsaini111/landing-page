// /src/app/services/family-matters/page.jsx
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

// -------------------------------
// Dynamic Metadata (Correct Method)
// -------------------------------
export async function generateMetadata() {
  const { default: Data } = await import('@/Data/data.json');
  const data = Data?.subServices?.familyMatters ?? null;

  const title = data ? `${data.title} — Arshiv Legal` : 'Family Matters — Arshiv Legal';
  const description =
    data?.description ||
    'Family Matters including divorce consultation, custody, maintenance, domestic violence protection, and legal support for family disputes.';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalize('/services/family-matters'),
    },
    keywords: [
      'family matters',
      'divorce consultation',
      'child custody',
      'maintenance & alimony',
      'domestic violence legal help',
      'family dispute lawyer',
      'Arshiv Legal Kanpur',
    ],
    openGraph: {
      title,
      description,
      url: canonicalize('/services/family-matters'),
      siteName: SEO_CONFIG.siteName,
      type: 'article',
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}/images/family-matters-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Family Matters - Arshiv Legal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SEO_CONFIG.siteUrl}/images/family-matters-og.jpg`],
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
  const data = Data?.subServices?.familyMatters ?? null;

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
    url: canonicalize('/services/family-matters'),
    type: 'Service',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: canonicalize('/') },
    { name: 'Legal Services', url: canonicalize('/legal-services') },
    { name: data.title, url: canonicalize('/services/family-matters') },
  ]);

  const organizationSchema = getOrganizationSchema();

  const subServiceNames = cards.map((c) => c.title).filter(Boolean);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    serviceType: 'Family Matters',
    description: data.description,
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
    serviceOutput: subServiceNames.map((s) => ({ '@type': 'Thing', name: s })),
    url: canonicalize('/services/family-matters'),
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
