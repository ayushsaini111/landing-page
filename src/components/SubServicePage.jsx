import React from 'react';
import Gradient from '@/components/ui/Gradient';
import ServiceCardSmall from '@/components/ui/ServiceCard';
import WhyChooseUs from './WhyChooseUs';

function slugify(value) {
    return String(value || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function SubServicePage({ title = '', covers = {}, cards = [], description = '' }) {
    const total = Array.isArray(cards) ? cards.length : 0;

    // Precompute spans so we don't run logic in the render body repeatedly
    const spans = React.useMemo(() => {
        if (total <= 2) return Array.from({ length: total }).map(() => 'lg:col-span-3');

        if (total % 3 === 0) return Array.from({ length: total }).map(() => 'col-span-1');

        const remainder = total % 3;
        const lastRowStart = total - remainder;

        return Array.from({ length: total }).map((_, idx) => (idx >= lastRowStart ? 'lg:col-span-3' : 'col-span-1'));
    }, [total]);

    // defensive render: if there are no cards, show a friendly message
    const hasCards = total > 0;

    return (
        <main className="space-y-s40 lg:space-y-s64">
            <Gradient title={title} description={description} />

            <section className="max-w-7xl mx-auto flex flex-col px-s16 md:px-s32 gap-s40 md:gap-s64">
                {/* WHAT THIS SERVICE COVERS (optional) */}
                {covers?.heading && <h2 className="page-title-h2 text-accent-main">{covers.heading}</h2>}
                {covers?.intro && <p className="body-large text-muted mt-s8">{covers.intro}</p>}

                {/* DYNAMIC GRID */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s24"
                    aria-label={covers?.heading ? `${covers.heading} - items` : 'service items'}
                >
                    {hasCards ? (
                        cards.map((card, index) => {
                            const key = card?.id || slugify(card?.title) || `card-${index}`;
                            const spanClass = spans[index] || 'col-span-1';

                            return (
                                <div key={key} className={`${spanClass}`}>
                                    <ServiceCardSmall title={card?.title} subtitle={card?.subtitle} {...(card?.props || {})} />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full">
                            <p className="body-large text-muted">No items available at the moment.</p>
                        </div>
                    )}
                </div>

                {/* Why Choose Us - render only if component exists or if it makes sense */}
                {WhyChooseUs ? (
                    <div>
                        <WhyChooseUs />
                    </div>
                ) : null}
            </section>
        </main>
    );
}
