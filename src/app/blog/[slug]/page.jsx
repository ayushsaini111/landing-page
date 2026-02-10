import BlogContentPage from "@/Sections/Blog/BlogContentPage";

export default async function Page({ params }) {
  const { slug } = await params;

  return <BlogContentPage slug={slug} />;
}
