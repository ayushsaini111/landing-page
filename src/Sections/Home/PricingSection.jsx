"use client";
import React from "react";
import Data from "@/Data/HomePage.json";
import PricingCard from "@/components/ui/Pricing";

export default function PricingSection() {
    const data = Data.pricingSection;
    const pricingList = data.pricing;

    return (
        <div className="flex flex-col gap-s48 lg:gap-s64">
            {/* Heading */}
           <div>
             <h2 className="heading-h3 text-primary-main">
                {data.title}
            </h2>
            <p className="mt-s24 heading-h6 text-secondary">
{data.subtitle}
            </p>
           </div>
            <div className="flex flex-col gap-s16 items-center">
                {/* Cards Grid */}
                <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s32 md:gap-s32 lg:gap-s48 px-s16">
                    {pricingList.map((item, index) => (
                        <div key={index} className="flex justify-center">
                            <PricingCard
                                title={item.title}
                                star={item.star}
                                price={item.price}
                                details={item.details}
                                buttonText={item.buttonText}
                                variant={item.variant}
                            />
                        </div>
                    ))}
                </div>
                {/* Footer Note */}
            </div>
                <p className="text-center caption text-main mt-s32">{data.footerNote}</p>
        </div>
    );
}
