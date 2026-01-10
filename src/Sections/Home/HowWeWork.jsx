"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ServiceCardSmallll } from "@/components/ui/ServiceCard";
import Data from "@/Data/HomePage.json";

gsap.registerPlugin(ScrollTrigger);

const { heading, description, footerNote } = Data.howWeWork;

export default function HowWeWork() {
    const sectionRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const sliderRef = useRef(null);

    const steps = Data.howWeWork.steps;

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const slider = sliderRef.current;

        if (!slider) return;

        const scrollAmount = slider.scrollWidth - slider.clientWidth;

        const tl = gsap.fromTo(
            slider,
            { x: 0 },
            {
                x: -scrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top 20%",
                    end: "bottom 0%",
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.1,
                    // Prevent scroll jank on other sections
                    onUpdate: (self) => {
                        // Optional: Add custom logic here if needed
                    },
                },
            }
        );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="max-w-7xl relative overflow-hidden  space-y-s24 lg:space-y-s32 z-10"
        >
            {/* Heading */}
            <h2 className="page-title-h2 text-accent-main">{heading}</h2>
            <p className="body-large mb-s16">{description}</p>
            {/* Cards Container */}
            <div
                className="max-w-5xl mx-auto px-s16 relative overflow-hidden"
                ref={sliderWrapperRef}>
                {/* LEFT GRADIENT */}
                <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-background to-transparent pointer-events-none z-20" />
                {/* RIGHT GRADIENT */}
                <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-background to-transparent pointer-events-none z-20" />

                {/* SLIDER */}
                <div ref={sliderRef} className="flex gap-s32 will-change-transform">
                    {steps.map((item) => (
                        <ServiceCardSmallll
                            key={item.number}
                            title={`${item.number}. ${item.title}`}
                            subtitle={item.text}
                        />
                    ))}
                </div>
            </div>
            <p className="text-center body-small mt-s16">{footerNote}</p>
        </section >
    );
}
