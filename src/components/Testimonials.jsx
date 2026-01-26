"use client";

import Image from "next/image";
import Data from "@/Data/Testimonials.json";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { title, text, list } = Data;

  return (
    <section
      className="
        w-full
        bg-secondary-main
        px-s8
      "
    >
      <div
        className="
          bg-background
          mx-auto
          rounded-r16
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-s64
          lg:gap-s64
          px-s16
          sm:px-s24
          lg:px-s64
          py-s64
         
          items-center
          max-w-[360px]
          sm:max-w-[640px]
          md:max-w-[900px]
          lg:max-w-7xl
        "
      >

        {/* LEFT SIDE */}
        <div
          className="
            max-w-sm
            text-center
            lg:text-left
            mx-auto
            flex
            flex-col 
            h-full
            gap-s64 md:gap-0
            justify-between
            items-start
            lg:mx-0
          "
        >
          <div><h2 className="heading-h4 text-main mb-s8">
            {title}
          </h2>

          <p className="text-md md:text-lg md:font-medium text-secondary px-s32 md:px-0  mx-auto lg:mx-0">
            {text}
          </p>
          </div>

          <Image
            src="/images/feather pot 1.svg"
            alt="pot"
            width={450}
            height={550}
            className=""
          />
        </div>

        {/* RIGHT SIDE – CARDS */}
        <div className="flex flex-col gap-s32 ">
          {list.map((item, index) => (
            <div
              key={index}
              className="
                relative
                bg-secondary-main/50
                rounded-r16
                p-s16
                sm:p-s24
                lg:p-s32
                border-r-8
                border-b-8
                border-secondary-dark
              "
            >
              {/* Quote */}
              <p className="text-sm  font-secondary  md:text-[16px]  text-main  mb-s16">
                <span className="text-2xl font-primary text-accent-main leading-0">“</span> {item.text} <span className="text-2xl font-primary text-accent-main">”</span>
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between gap-s8 sm:gap-s16">
                {/* Client */}
                <div className="flex items-center gap-s12 min-w-0 ">
<div className="shrink-0 shadow-lg rounded-full">
  <div className="w-9 h-9 sm:w-10  shadow-lg sm:h-10 rounded-full overflow-hidden border-2 border-accent-main bg-background">
    <Image
      src={item.image}
      alt={item.name}
      width={40}
      height={40}
      className="object-cover"
    />
  </div>
</div>



                  <span className="caption font-primary text-main pl-s8">
                    {item.name}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-accent-main shrink-0">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  {[...Array(5 - item.rating)].map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
