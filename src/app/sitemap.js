// /src/app/sitemap.js
import { SEO_CONFIG } from '@/lib/seo-config';

// Generate sitemap including static routes + dynamic service pages + sub-service cards
export default async function sitemap() {
  const baseUrl = SEO_CONFIG.siteUrl.replace(/\/$/, '');

  // 1) Static routes — add any static top-level pages you want indexed
  const staticRoutes = ['/', '/about', '/services', '/contact', '/privacy-policy'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '/' ? 1 : 0.8,
    })
  );

  // Helper: create clean, SEO-friendly slugs from titles (fallback if no explicit slug)
  const toSlug = (input = '') =>
    String(input || '')
      .toLowerCase()
      // convert ampersand to 'and'
      .replace(/&/g, 'and')
      // remove other non-alphanumeric characters and replace with hyphen
      .replace(/[^a-z0-9]+/g, '-')
      // collapse multiple hyphens
      .replace(/-+/g, '-')
      // trim leading/trailing hyphens
      .replace(/^-|-$/g, '');

  // 2) Dynamic routes from Data.subServices (and their cards)
  let dynamicRoutes = [];
  try {
    const { default: Data } = await import('@/Data/data.json');
    const services = Data?.subServices || {};

    dynamicRoutes = Object.entries(services).flatMap(([key, svc]) => {
      // Prefer explicit slug/path if provided in the data.json
      const explicitService = svc?.slug || svc?.path || svc?.url;
      const serviceSlug = explicitService
        ? String(explicitService).replace(/^\/+/, '').replace(/\/+$/, '')
        : toSlug(svc?.title || key);

      const routes = [
        {
          url: `${baseUrl}/services/${serviceSlug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
      ];

      // Add subservice card routes — common location: whatThisServiceCovers.cards
      const cards = svc?.whatThisServiceCovers?.cards || svc?.cards || [];
      if (Array.isArray(cards)) {
        cards.forEach((card) => {
          const explicitCard = card?.slug || card?.path || card?.url || card?.link;
          const cardSlug = explicitCard
            ? String(explicitCard).replace(/^\/+/, '').replace(/\/+$/, '')
            : toSlug(card?.title || card?.name || '');

          if (cardSlug) {
            routes.push({
              url: `${baseUrl}/services/${serviceSlug}/${cardSlug}`,
              lastModified: new Date(),
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          }
        });
      }

      return routes;
    });
  } catch (err) {
    // If data.json can't be loaded at build time, return static routes only
    console.warn('sitemap: failed to load data.json, returning static routes only', err);
    dynamicRoutes = [];
  }

  // 3) Combine and return (Next.js will convert this into sitemap.xml automatically)
  return [...staticRoutes, ...dynamicRoutes];
}
