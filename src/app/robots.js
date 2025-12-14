// /src/app/robots.js
import { SEO_CONFIG } from '@/lib/seo-config';

export default function robots() {
  return {
    // Use an array of rules for clarity and easy extension
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // still block sensitive paths
        disallow: ['/private/', '/admin/'],
      },
    ],
    // Point to the sitemap that Next.js generates from /src/app/sitemap.js
    sitemap: `${SEO_CONFIG.siteUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}
