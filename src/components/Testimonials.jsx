"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials({ title, list }) {
    const [index, setIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isSliding, setIsSliding] = useState(false);

    const sliderRef = useRef(null);
    const wheelTimeoutRef = useRef(null);
    const autoSlideRef = useRef(null); // ⭐ NEW AUTO SLIDE

    const extendedList = [...list, ...list, ...list];
    const listLength = list.length;
    const minSwipeDistance = 50;

    const prevSlide = () => {
        if (isSliding) return;
        setIsSliding(true);
        setIsTransitioning(true);
        setIndex((prev) => prev - 1);
        setTimeout(() => setIsSliding(false), 600);
    };

    const nextSlide = () => {
        if (isSliding) return;
        setIsSliding(true);
        setIsTransitioning(true);
        setIndex((prev) => prev + 1);
        setTimeout(() => setIsSliding(false), 600);
    };

    const onTouchStart = (e) => {
        setTouchEnd(0);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) nextSlide();
        else if (distance < -minSwipeDistance) prevSlide();
    };

    const onWheel = (e) => {
        if (isSliding) return;

        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5) {
            e.preventDefault();

            if (wheelTimeoutRef.current)
                clearTimeout(wheelTimeoutRef.current);

            wheelTimeoutRef.current = setTimeout(() => {
                if (e.deltaX > 0) nextSlide();
                else if (e.deltaX < 0) prevSlide();
            }, 50);
        }
    };

    useEffect(() => {
        if (index >= listLength * 2) {
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(listLength);
            }, 500);
        } else if (index < listLength) {
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(listLength * 2 - 1);
            }, 500);
        }
    }, [index, listLength]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        slider.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            slider.removeEventListener("wheel", onWheel);
            if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        };
    }, [index, isSliding]);

    // ⭐ AUTO SLIDER — Runs every 3 seconds
    useEffect(() => {
        if (isSliding) return; // don't auto slide while sliding

        autoSlideRef.current = setTimeout(() => {
            nextSlide();
        }, 2000);

        return () => clearTimeout(autoSlideRef.current);
    }, [index, isSliding]);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
            <div
                ref={sliderRef}
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${index * 100}%)` }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {extendedList.map((t, i) => (
                    <div key={i} className="w-full shrink-0 flex justify-center p-s16">
                        <div className="bg-secondary-light max-w-xl lg:max-w-2xl w-full p-s16 md:p-s32 space-y-s64 rounded-r16 shadow-lg">
                            <p className="body-default md:body-large text-main mb-s32">
                                <span className="text-accent-main body-default md:body-large">"</span>
                                {t.text}
                                <span className="text-accent-main body-default md:body-large">"</span>
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-s8">
                                    <img
                                        src={t.image}
                                        className="w-10 h-10 rounded-full object-cover"
                                        alt={t.name}
                                    />
                                    <span className="body-default">{t.name}</span>
                                </div>

                                <div className="flex gap-1 text-accent-main">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" />
                                    ))}
                                    {[...Array(5 - t.rating)].map((_, i) => (
                                        <Star key={i} size={16} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 text-accent-main hover:scale-110 transition -left-2 sm:-left-1"
                aria-label="Previous testimonial"
            >
                <ChevronLeft size={24} className="sm:hidden" />
                <ChevronLeft size={50} className="hidden sm:block" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 text-accent-main hover:scale-110 transition -right-2 sm:right-1"
                aria-label="Next testimonial"
            >
                <ChevronRight size={24} className="sm:hidden" />
                <ChevronRight size={50} className="hidden sm:block" />
            </button>
        </div>
    );
}
