"use client";

import Image from "next/image";
import Data from "@/Data/HomePage.json";

export default function DontHesitateSection() {
    const dontHesitate = Data["don’tHesitate"];
    if (!dontHesitate) return null;

    return (
        <section
            className="flex flex-col items-center gap-s16 lg:p-12 md:p-8 p-4 rounded-2xl">
            {/* TITLE + GAVEL ICONS */}
            <div className="flex gap-s8 items-center justify-center">
                {/* Left Gavel */}
                <div className="w-1/3 lg:w-1/4">
                    <Image
                        src="/Images/gavel-brown-1.svg"
                        alt="Gavel"
                        width={200}
                        height={40}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="page-title-h2 text-center">
                    {dontHesitate.title}
                </h2>
                {/* Right Gavel */}
                <div className="w-1/3 lg:w-1/4">
                    <Image
                        src="/Images/gavel-brown-1.svg"
                        alt="Gavel"
                        width={200}
                        height={40}
                        className="w-full h-full object-cover rotate-180"
                    />
                </div>
            </div>
            {/* DESCRIPTION */}
            <div className="text-center">
                <span className="text-accent-main body-large">“</span>
                <span
                    className="body-default">
                    {dontHesitate.description}
                </span>
                <span className="text-accent-main body-large">”</span>
            </div>
        </section>
    );
}
