"use client";

import Button from "@/components/ui/Button";

export default function PricingCard({
    title,
    star = "",        // NEW PROP
    price,
    details,
    buttonText,
    variant = "free",
}) {
    const isStandard = variant === "standard";

    return (
        <div
            className={`max-w-[350px] min-h-[350px] rounded-r16 p-s16 md:p-s24 flex flex-col gap-s16 transition-all duration-300 shadow-lg
        ${isStandard
                    ? "bg-background border border-primary-main shladow-sm "
                    : "bg-primary-main text-secondary-dark"}
                    `}
        >

            <div className="flex flex-col gap-s16 md:gap-s8 lg:gap-s16">
                {/* Title */}
                <h2
                    className={`
          heading-h4 flex items-center justify-center
          ${isStandard
                            ? "text-accent-main text-center"
                            : "text-background text-center"}
        `}
                >
                    {/* Star (Free only) */}
                    {star && <span className="text-secondary-main">{star}</span>}
                    {title}
                </h2>
                {/* Price */}
                <p
                    className={`
          caption text-left w-full
          ${isStandard ? "text-main" : "text-background"}
        `}
                >
                    {price}
                </p>
                {/* Divider */}
                <div
                    className={`
          w-full h-[1px]
          ${isStandard ? "bg-primary-main" : "bg-secondary-main"}
        `}
                ></div>
                {/* Details */}
                <div
                    className={`
          body-default opacity-90 whitespace-pre-line text-left
          ${isStandard ? "text-main" : "text-background"}
        `}
                >
                    {details}
                </div>
            </div>

            {/* Button */}
            <div className="mt-auto w-full">
                <Button
                    variant={isStandard ? "primary" : "secondary"}
                    className="w-full"
                    as="link"
                    href="/contact-us"
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}
