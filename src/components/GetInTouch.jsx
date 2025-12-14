"use client";
import Button from "@/components/ui/Button";

export default function GetInTouch({
    variant = "blue",
    title,
    subtitle,
}) {
    const isBlue = variant === "blue";

    return (
        <section
            className={`rounded-r16 p-s32 md:p-s48 lg:p-s64 flex flex-col items-center text-center gap-s16 md:gap-s24 lg:gap-s32
        ${isBlue ? "bg-primary-main text-background" : "bg-background text-main"}
      `}>
            <div className="flex flex-col gap-s8 lg:gap-s16">
                {/* Title */}
                <h2
                    className={`
          subheading-h3
          ${isBlue ? "text-background" : "text-primary-main"}
        `}
                >
                    {title}
                </h2>
                {/* Subtitle */}
                <p
                    className={`
          body-default
          ${isBlue ? "text-background max-w-3xl" : "text-secondary max-w-2xl"}
        `}
                >
                    {subtitle}
                </p>
            </div>
            {/* Button */}
            <Button
                variant="ctaSecondary"
                as="link"
                href="/contact-us"
            >
                Get in touch
            </Button>
        </section>
    );
}
