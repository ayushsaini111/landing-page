"use client";

import BlogContentPage from "@/Sections/Blog/BlogContentPage";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const slug = params?.slug;

  return <BlogContentPage slug={slug} />;
}