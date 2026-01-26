"use client";

import Image from "next/image";
import Data from "@/Data/HomePage.json";

export default function WhyChooseUs() {
  const { whyChooseUs } = Data;
  if (!whyChooseUs) return null;

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="bg-background w-full flex flex-col gap-s32 px-s16 "
    >
      <article
        className="
          flex flex-col
          xl:flex-row
          items-center
          justify-between
          gap-s64 md:gap-[100px]
        "
      >
        {/* TEXT CONTENT */}
        <div className="flex flex-col gap-s8 max-w-3xl text-left">
          <header>
            <h2
              id="why-choose-us-heading"
              className="heading-h4 text-accent-main "
            >
              {whyChooseUs.title}
            </h2>
          </header>

          <p className="leading-relaxed md:text-xl font-secondary md:font-medium text-main">
       Our approach is built on <strong className="font-primary">clarity, precision,</strong> and <strong className="font-primary">genuine understanding.</strong> We believe that legal help should never feel distant or complicated. Every case we take is handled with professional diligence  but explained in a way that anyone can understand.
          </p>
        </div>

        {/* IMAGE */}
<figure
  className="
    relative
    w-full
    max-w-[280px]
    sm:max-w-[340px]
    md:max-w-[380px]
    lg:max-w-[420px]
    aspect-[420/427]
    rounded-r16
    mx-auto
  "
>
  {/* FRAME BACKGROUND */}
  <div
    className="
      absolute
      inset-0
      bg-[url('/Images/frame.svg')]
      bg-no-repeat
      bg-center
      bg-contain
      z-0
    "
  />

  {/* PERSON IMAGE */}
  <div
    className="
      absolute
      left-1/2
      -translate-x-1/2

      /* vertical positioning */
      -top-[35px]
      xs:-top-[30px]
      sm:-top-[36px]
      md:-top-[25px]
      lg:-top-[51px]

      /* responsive width */
      w-[65%]
      sm:w-[60%]
      md:w-[55%]
      lg:w-[85%]

      h-full
      z-10
    "
  >
    <Image
      src="/Images/Group 1.png"
      alt="Profile"
      fill
      className="object-contain scale-110"
      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 260px"
      priority
    />
  </div>
</figure>


      </article>
    </section>
  );
}
