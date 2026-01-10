"use client";
import React, { useState } from "react";
import Data from "@/Data/HomePage.json";
import Button from "@/components/ui/Button";
import ServiceCard from "@/Sections/Home/ServiceCard";
import { services } from "@/Data/Navlink";

export default function ServicesSection() {
    // make sure the path exists in your data.json
    const { topHeading, arrow, tabs, ...laws } = Data.servicesSection;
    const [activeTab, setActiveTab] = useState(tabs?.[0]?.slug || "public-law");
    // convert "criminal-law" → "criminalLaw"
    const toCamel = (slug) => slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const selectedLaw = laws[toCamel(activeTab)] || Object.values(laws)[0] || {};
    // load matters from the global mapping (use uppercase title as your mapping key)
    const matters = services[selectedLaw.title?.toUpperCase()] || [];

    return (
        <section>
            {/* HEADING */}
            <h2 className="subheading-h3 mb-s24 lg:mb-s32">
                <span className="text-accent-main">{arrow}</span>{topHeading}
            </h2>
            <div className="flex flex-col items-center gap-s16">
                {/* DYNAMIC SERVICE CARD */}
                <div className="w-full">
                    <ServiceCard
                        image={selectedLaw.image}
                        title={selectedLaw.title}
                        description={selectedLaw.description}
                        matters={matters}
                        subTitle={selectedLaw.subTitle}
                    />
                </div>
                {/* TABS */}
                <div className="w-full max-w-4xl">
                    {/* MOBILE → horizontal scroll */}
                    <div className="md:hidden w-full px-s16 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 min-w-max">
                            {tabs.map((tab) => (
                                <Button
                                    key={tab.slug}
                                    variant={activeTab === tab.slug ? "primary" : "outliner"}
                                    onClick={() => setActiveTab(tab.slug)}
                                    aria-pressed={activeTab === tab.slug}>
                                    {tab.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    {/* DESKTOP → 4-column grid */}
                    <div className="hidden md:grid grid-cols-4 gap-s16">
                        {tabs.map((tab, idx) => {
                            const colClass = idx === 4 ? "md:col-start-2" : "";

                            return (
                                <div key={tab.slug} className={colClass}>
                                    <Button
                                        variant={activeTab === tab.slug ? "primary" : "outliner"}
                                        className="w-full"
                                        onClick={() => setActiveTab(tab.slug)}
                                        aria-pressed={activeTab === tab.slug}>
                                        {tab.label}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
