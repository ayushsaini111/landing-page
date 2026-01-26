"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { services } from "@/Data/Navlink";
import Data from "@/Data/PrimaryServices.json";
import Gradient from "./ui/Gradient";
import { useSearchParams } from "next/navigation";

const { title, description } = Data;

export default function PrimaryServices() {

    const searchParams = useSearchParams();
    const focus = searchParams.get("focus"); // e.g. "CIVIL LAW"

    // refs for each category
    const categoryRefs = useRef({});

    useEffect(() => {
        if (focus && categoryRefs.current[focus]) {
            const el = categoryRefs.current[focus];

            // height of your fixed navbar (change if needed)
            const NAV_HEIGHT = 100;

            const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

            window.scrollTo({
                top: y,
                behavior: "smooth",
            });
        }
    }, [focus]);


    return (
        <section className="w-full flex flex-col  items-center ">

            <Gradient title={title} description={description} />

            <div className="w-full max-w-7xl space-y-s16 px-s32 md:space-y-s32 py-[100px] md:py-[200px]">
                {Object.entries(services).map(([category, items]) => (
                    <div
                        key={category}
                        ref={(el) => (categoryRefs.current[category] = el)} // store refs
                        className="w-full"
                    >
                        <h2 className="heading-h4 text-accent-main mb-s16">
                            {category}
                        </h2>

                        <ul className="ml-s48 list-disc space-y-s8">
                            {items.map((item, idx) => (
                                <li key={idx} className="text-main text-lg font-primary md:text-2xl md:font-medium md:leading-relaxed">
                                    <Link
                                        href={item.href}
                                        className="hover:text-accent-main transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>

        </section>
    );
}
