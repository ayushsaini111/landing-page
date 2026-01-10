"use client";
import React from "react";
import Data from "@/Data/HomePage.json";
import PricingCard from "@/components/ui/Pricing";

export default function PricingSection() {
    const data = Data.pricingSection;
    const pricingList = data.pricing;

    return (
        <div className="flex flex-col gap-s24 lg:gap-s32">
            {/* Heading */}
            <h2 className="page-title-h2 text-accent-main">
                Consultancy Charges
            </h2>
            <div className="flex flex-col gap-s16 items-center">
                {/* Cards Grid */}
                <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s24 md:gap-s32 lg:gap-s48 px-s32">
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
                <p className="text-center body-small text-disable">{data.footerNote}</p>
            </div>
        </div>
    );
}
