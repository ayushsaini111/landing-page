// /src/components/WhatShouldIDoNow.jsx
import React from 'react';
import Image from 'next/image';

// Revalidate this server-rendered page every 60 seconds (adjust as needed)
export const revalidate = 60;

function slugify(str) {
    return String(str || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default async function WhatShouldIDoNow() {
    // Dynamically import the JSON at render time (keeps module-level bundle smaller)
    const { default: Data } = await import('@/Data/data.json');
    const whatShouldIDoNow = Data?.whatShouldIDoNow;

    if (!whatShouldIDoNow) {
        return <p className="text-red-main p-s32">Data not found.</p>;
    }

    const { sections = [] } = whatShouldIDoNow;

    return (
        <main className="mx-auto max-w-7xl py-s40 lg:py-s64" role="main">
            {/* Use semantic grouping and accessible headings/ids for better SEO & A11y */}
            <div className="flex flex-col gap-s40 lg:gap-s64">
                {sections.map((section = {}, index) => {
                    const heading = section.heading;
                    const id = section?.heading ? `what-${slugify(section.heading)}` : `what-section-${index}`;
                    const descId = `${id}-desc`;

                    return (
                        <article
                            key={id}
                            role="article"
                            aria-labelledby={heading ? `${id}-title` : undefined}
                            aria-describedby={section.paragraphs && section.paragraphs.length > 0 ? descId : undefined}
                            className="flex flex-col"
                        >
                            {/* SECTION HEADING */}
                            {heading && (
                                <h2 id={`${id}-title`} className="page-title-h2 text-accent-main">
                                    {heading}
                                </h2>
                            )}

                            <div className="flex flex-col mt-s16 md:gap-s24">
                                {/* PARAGRAPHS */}
                                {section.paragraphs && section.paragraphs.length > 0 && (
                                    <div className="body-large space-y-s8" id={descId}>
                                        {section.paragraphs.map((p, i) => (
                                            <p key={`p-${i}`}>{p}</p>
                                        ))}
                                    </div>
                                )}

                                {/* BULLETS */}
                                {section.bullets && section.bullets.length > 0 && (
                                    <ol className="list-decimal ml-s32 md:ml-s40 lg:ml-s48 space-y-s8 body-large">
                                        {section.bullets.map((b, i) => (
                                            <li key={`b-${i}`}>{b}</li>
                                        ))}
                                    </ol>
                                )}
                            </div>

                            {/* IMAGE — optimized usage of next/image for responsive loading */}
                            {section.image && (
                                <figure className="w-full rounded-r8 md:rounded-r16 overflow-hidden">
                                    <Image
                                        src={section.image}
                                        alt={section.imageAlt ?? heading}
                                        width={1200}
                                        height={600}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                                        className="w-full h-auto object-cover"
                                        // Make only the very first image eager/priority to help LCP; others lazy-load
                                        priority={index === 0}
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        // reasonable default quality — tune if you have high-res originals
                                        quality={75}
                                        placeholder={section.blurDataURL ? 'blur' : undefined}
                                        blurDataURL={section.blurDataURL}
                                    />

                                    {/* Accessible caption (only rendered if provided) */}
                                    {section.imageCaption && (
                                        <figcaption className="sr-only">{section.imageCaption}</figcaption>
                                    )}
                                </figure>
                            )}
                        </article>
                    );
                })}
            </div>
        </main>
    );
}
