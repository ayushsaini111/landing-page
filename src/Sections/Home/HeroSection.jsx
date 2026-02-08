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
       <div className="relative w-[520px] h-[520px] overflow-hidden bg-transparent">
  {supportsWebM && !isSafari ? (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="hero-video absolute inset-0 w-full h-full scale-[1.25]"
    >
      <source src="/Images/hellfire.webm" type="video/webm" />
    </video>
  ) : (
    <img
      src="/Images/statue-web.webp" // MUST be animated WebP
      alt=""
      className="hero-video absolute inset-0 w-full h-full scale-[1.25]"
    />
  )}
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
              className="hero-video "
            >
              <source src="/Images/hellfire.webm" type="video/webm" />
            </video>
          ) : (
            <img
              src="/Images/statue-web.webp"
              alt=""
              autoPlay
              className="hero-video "
            />
          )}
        </div>
      </div>
    </section>
  );
}
