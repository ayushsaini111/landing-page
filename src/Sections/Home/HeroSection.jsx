"use client";

import { useEffect, useState } from "react";
import Data from "@/Data/HomePage.json";
import Button from "@/components/ui/Button";

export default function Hero() {
  const hero = Data?.heroSection;
  if (!hero) return null;

  const [isSafari, setIsSafari] = useState(false);
  const [supportsWebM, setSupportsWebM] = useState(false);

  useEffect(() => {
    // ✅ SAFARI DETECTION (REQUIRED)
    const ua = navigator.userAgent.toLowerCase();
    const safari =
      ua.includes("safari") &&
      !ua.includes("chrome") &&
      !ua.includes("android");

    setIsSafari(safari);

    // ✅ WebM capability (non-Safari only)
    const video = document.createElement("video");
    const canWebM =
      video.canPlayType('video/webm; codecs="vp9"') ||
      video.canPlayType("video/webm");

    setSupportsWebM(!!canWebM);
  }, []);

  return (
    <section>
      {/* ---------------- MOBILE ---------------- */}
      <div className="lg:hidden flex flex-col items-center">
        <div className="relative max-w-lg w-full overflow-hidden bg-background">
          {!isSafari ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-video w-full h-[400px] object-contain scale-[1.35] origin-top"
            >
              <source src="/Images/website.webm" type="video/webm" />
            </video>
          ) : (
            <img
              src="/Images/statue-web.webp"
              alt="Lady Justice"
              className="hero-video w-full h-[400px] object-contain scale-[1.35] origin-top"
            />
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,250,238,0) 30%, rgba(255,254,249,1) 65%, rgba(255,254,249,1) 100%)",
            }}
          />
        </div>

        {/* Text */}
        <div className="relative -mt-40 text-center px-s32 space-y-s24 z-10">
          <h1 className="heading-h1 text-primary-main">
            {hero.mainHeading}
          </h1>
          <p className="heading-h6 text-main">
            {hero.subHeading}
          </p>
          <Button
            as="link"
            href="/contact-us"
            variant="ctaAccent"
          >
            {hero.ctaButton}
          </Button>
        </div>
      </div>

      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden lg:flex bg-gradient-to-r from-secondary-dark to-background items-center justify-between px-s48 py-s48">
        <div className="max-w-2xl space-y-s16">
          <h1
            className="heading-h1 text-primary-main"
            dangerouslySetInnerHTML={{
              __html: hero.mainHeading.replace(/\.\s*/g, ".<br/>"),
            }}
          />
          <p className="heading-h6 text-main">
            {hero.subHeading}
          </p>
          <Button
            as="link"
            href="/contact-us"
            variant="ctaAccent"
          >
            {hero.ctaButton}
          </Button>
        </div>

        <div className="bg-transparent">
          {supportsWebM && !isSafari ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-video"
            >
              <source src="/Images/hellfire.webm" type="video/webm" />
            </video>
          ) : (
            <img
              src="/Images/statue-web.webp"
              alt=""
              className="hero-video "
            />
          )}
        </div>
      </div>
    </section>
  );
}
