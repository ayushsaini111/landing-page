import { SEO_CONFIG } from "@/lib/seo-config";

export default async function sitemap() {
  const baseUrl = SEO_CONFIG.siteUrl.replace(/\/$/, "");

  const url = (path) => `${baseUrl}${path}`;

  // ---------------- Core Pages ----------------
  const coreRoutes = [
    "",
    "/about",
    "/contact-us",
    "/team",
    "/legal-services",
    "/what-should-i-do-now",
    "/daily-legal-content",
    "/blog",
    "/privacy-policy",
    "/terms-of-use",
  ].map((route) => ({
    url: url(route),
    lastModified: new Date("2026-01-01"),
    changeFrequency: route === "" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // ---------------- Service Pages ----------------
  const serviceRoutes = [
    "/services/bail-anticipatory-bail",
    "/services/challenges-against-government-orders",
    "/services/cheating-threats-harassment-cases",
    "/services/family-matters",
    "/services/fundamental-rights-protection",
    "/services/government-document-licensing-issues",
    "/services/land-ownership-title-verification",
    "/services/property-disputes",
    "/services/property-transfer-registration",
    "/services/public-interest-related-matters",
    "/services/rights-violation-complaints",
    "/services/writ-petitions",
  ].map((route) => ({
    url: url(route),
    lastModified: new Date("2026-01-01"),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // ---------------- Blog Pages (TEMP: ID-based) ----------------
  let blogRoutes = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?limit=1000`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const json = await res.json();
      const blogs = json.data?.blogs || [];

      blogRoutes = blogs.map((post) => ({
        url: url(`/blog/${post._id}`), // will change to slug later
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Sitemap Blog Fetch Error:", e);
  }

  return [...coreRoutes, ...serviceRoutes, ...blogRoutes];
}
