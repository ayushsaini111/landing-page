"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function GetInTouch({
  variant = "blue",
  title,
  subtitle,
  text,
}) {
  const isBlue = variant === "blue";
  const router = useRouter();

  return (
    <section
      className={`  rounded-r16 px-s32 py-s24  md:p-s48 lg:p-s64 flex flex-col items-center text-center gap-s24  md:gap-s24 lg:gap-s32
        ${isBlue ? "bg-primary-main text-background" : "bg-background text-main"}
      `}
    >
      <div className="flex max-w-2xl flex-col gap-s8 px-s8 lg:gap-s16">
        <h2
          className={`text-[21px] leading-relaxed font-primary md:text-[32px] md:leading-relaxed  ${
            isBlue ? "text-background" : "text-primary-main"
          }`}
        >
          {title}
        </h2>

        <p
          className={`text-sm md:text-[16px] md:leading-relaxed  ${
            isBlue
              ? "text-background/70 max-w-2xl"
              : "text-secondary max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      </div>

      {/* CTA */}
      <Button
        variant="ctaAccent"
        onClick={() => {
          router.push("/contact-us?scroll=contact");
        }}
      >
        {text || "Get in touch"}
      </Button>
    </section>
  );
}
