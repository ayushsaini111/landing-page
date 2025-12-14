"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BlogContentPage({ params }) {
  const { id } = React.use(params);

const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  const cacheRef = useRef({});
  const abortRef = useRef(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!id) return;

      // 🔥 Instant cache hit
      if (cacheRef.current[id]) {
        setBlog(cacheRef.current[id]);
        return;
      }

      // Cancel old request
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
          {
            signal: abortRef.current.signal,
            cache: "no-cache" // more reliable for SSR
          }
        );

        console.log("API response:", res);

        if (!res.ok) throw new Error("Failed to fetch blog");

        const result = await res.json();
        console.log("Parsed blog:", result);

        const blogData = result?.data;

        if (!blogData) throw new Error("Missing blog data");

        cacheRef.current[id] = blogData;
        setBlog(blogData);

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      }
    }

    fetchBlog();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [id]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/blog/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description || blog.title,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  // ⏳ Skeleton Loader
  if (!blog) {
    return (
      <main className="w-full min-h-screen bg-background">
        <div className="bg-gradient-to-b from-accent-light to-background border-b-2 border-accent-main/20">
          <div className="max-w-4xl mx-auto px-s64 py-s32">
            <div className="h-6 w-32 bg-accent-main/20 rounded animate-pulse mb-s24"></div>
            <div className="h-8 w-24 bg-accent-main/30 rounded-full mb-s16 animate-pulse"></div>
            <div className="h-12 w-3/4 bg-primary-main/20 rounded mb-s24 animate-pulse"></div>
            <div className="flex gap-s24 mb-s16">
              <div className="h-6 w-32 bg-text-secondary/20 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-text-secondary/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
<main className="w-full min-h-screen bg-background mt-24">

  {/* ===== HEADER SECTION ===== */}
  <div className="max-w-5xl mx-auto flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-0 py-s32">

    {/* Back Button */}
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-accent-main hover:text-accent-dark transition-colors group hover:underline"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      Back to Blogs
    </button>

    {/* Title */}
    <h1 className="hero-h1 text-primary-main break-words">
      {blog.title}
    </h1>

    {/* Description Box */}
    {blog.description && (
      <div className="my-s8 p-s16 sm:p-s20 md:p-s24 bg-secondary-main/30 border-l-4 border-accent-main rounded-r8">
        <p className="text-secondary text-sm sm:text-base leading-relaxed">
          {blog.description}
        </p>
      </div>
    )}

    {/* Category + Meta */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">

      {/* Category */}
      {blog.category && (
        <div className="body-default px-s12 py-s6 sm:px-s16 sm:py-s8 text-main text-sm sm:text-base">
          <span className="text-accent-main">Category: </span>
          {blog.category}
        </div>
      )}

      {/* Date + Share */}
      <div className="flex items-center gap-s16 sm:gap-s24 text-sm sm:text-base">
        <div className="flex items-center gap-s6">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-s8 text-accent-main hover:text-accent-dark hover:scale-105 active:scale-95 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span className="body-small">Share</span>
        </button>
      </div>
    </div>
  </div>

  {/* ===== DIVIDER ===== */}
  <div className="h-[1px] max-w-5xl mx-auto bg-accent-main/40 rounded-full"></div>

  {/* ===== CONTENT SECTION ===== */}
  <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-0 py-s24">

    {/* Thumbnail */}
    {blog.thumbnail && (
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        width={1200}
        height={800}
        loading="eager"
        className="w-full aspect-video object-cover rounded-xl shadow-xl"
      />
    )}

    {/* Blog Content */}
    <article
      className="blog-content prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none animate-fadeIn py-s24"
      dangerouslySetInnerHTML={{ __html: blog.content }}
    />

    {/* Footer Note */}
    <div className="max-w-4xl mx-auto">
      <div className="h-[1px] bg-accent-main/40 rounded-full"></div>
      <div className="py-s24 max-w-2xl mx-auto text-center">
        <p className="body-small text-secondary text-sm sm:text-base leading-relaxed">
          biosubvof isbvo brwoib roib freoib fdowifoibio biosubvof isbvo brwoib roib freoib fdowifoisubvof isbvo brwoib roib freoib fdowifoi
        </p>
      </div>
    </div>

  </div>
</main>


  );
}
