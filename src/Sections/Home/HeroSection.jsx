"use client";
import Data from "@/Data/HomePage.json";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";

export default function Hero() {
    const [supportsWebM, setSupportsWebM] = useState(false);
    const isSafari =
        typeof window !== "undefined" &&
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const hero = Data?.heroSection;
    if (!hero) return null;
    useEffect(() => {
        const video = document.createElement("video");

        const isWebMSupported =
            video.canPlayType('video/webm; codecs="vp9"') ||
            video.canPlayType('video/webm');

        setSupportsWebM(!!isWebMSupported);
    }, []);


    return (
        <section>
            {/* -------------------- MOBILE VIEW -------------------- */}
            {/* MOBILE VIEW */}
            <div className="lg:hidden flex flex-col justify-between items-center " >
                {/* IMAGE + GRADIENT */}
                <div className="relative max-w-lg overflow-hidden flex justify-center">
                    <div className="relative flex justify-center">
                        <video
                            src="/Images/website.webm"

                            autoPlay
                            loop
                            preload="auto"
                            muted
                            playsInline
                            alt="Lady Justice"
                            className="w-full h-[400px] object-cover scale-[1.35] origin-top"
                        />
                        {/* GRADIENT OVERLAY */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                            style={{
                                height: "400px",
                                background: `linear-gradient(to bottom,rgba(255,250,238,0) 30%,rgba(255, 254, 249, 1) 60%,rgba(255, 254, 249, 1) 65%,rgba(255, 254, 249, 1) 100%)`,
                            }}
                        />
                    </div>
                </div>
                {/* TEXT CONTENT */}
                <div className="relative -mt-50 w-full text-center space-y-s24 z-10 px-s32 md:px-s32">
                    <h1 className="heading-h1  text-primary-main ">{hero.mainHeading}</h1>
                    <p className="heading-h6 text-main">
                        {hero.subHeading}
                    </p>
                    <Button children={hero.ctaButton} variant={"ctaAccent"} as="link" href="/contact-us" />
                </div>
            </div>


            {/* -------------------- DESKTOP VIEW -------------------- */}
            <div className=" min-h-screen hidden bg-gradient-to-r from-secondary-dark  to-background lg:flex   mx-auto items-center justify-between px-s48 py-48 md:p-s48">
                <div className="max-w-2xl space-y-s16">
                    <h1
                        className="heading-h1 text-primary-main"
                        dangerouslySetInnerHTML={{
                            __html: hero.mainHeading.replace(/\.\s*/g, ".<br/>")
                        }}
                    />
                    <p className="heading-h6 text-main">
                        {hero.subHeading}
                    </p>
                    <Button children={hero.ctaButton} variant={"ctaAccent"} as="link" href="/contact-us" />
                </div>
                <div className="relative w-[800px] aspect-[3/4] overflow-hidden">
                    {supportsWebM && !isSafari ? (
                        <video autoPlay loop muted playsInline preload="auto" className="hero-video">
                            <source src="/Images/hellfire.webm" type="video/webm" />
                        </video>
                    ) : (
                        <img
                            src="/Images/statue-web.webp"
                            className="hero-video"
                            alt=""
                            preload="auto"
                        />
                    )}
                </div>

            </div>
        </section>
    );
}
