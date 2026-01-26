"use client";

import Image from "next/image";
import Data from "@/Data/HomePage.json";

export default function DontHesitateSection() {
  const dontHesitate = Data["don’tHesitate"];
  if (!dontHesitate) return null;

  const { title, description, footerNote } = dontHesitate;

  return (
    <section
      className="w-full bg-background relative mb-[50px] md:mb-[100px]"
    >
      {/* IMAGE WRAPPER */}
      <div
        className="
          relative w-full overflow-hidden 
          min-h-[350px]
          sm:min-h-[600px]
          md:min-h-[1000px]
          xl:min-h-[1500px]
        "
      >
        <Image
          src="/Images/BigGavel.svg"
          alt="Legal gavel representing justice and law"
          fill
          priority
          sizes="100vw"
          className="
            object-cover object-center
            xl:object-contain
          "
        />

        {/* DESKTOP (XL+) OVERLAY CONTENT */}
        <article className="hidden xl:block absolute inset-0">
          <div className="relative max-w-7xl mx-auto">
            <header className="absolute top-30 right-s64 max-w-lg">
              <h2
                className="heading-h3 text-accent-main mb-s16"
              >
                {title}
              </h2>

              <p className="heading-h6 text-main">
               <strong className="text-primary-light">If you’ve reached this point, you probably need answers — </strong >and that’s completely okay. Legal problems can feel heavy, but you don’t have to face them alone. You deserve guidance, clarity, and someone who truly listens before offering solutions. We understand how overwhelming it can be when rights, responsibilities, and emotions collide. That’s why we’re here — to help you understand where you stand, what the law says, and how you can move forward confidently.
You’ve already taken the first step by being here. Let’s take the next one together.
              </p>
            </header>
          </div>
        </article>

        {/* FOOTER — XL ONLY (OVER IMAGE) */}
        {footerNote && (
          <footer className="hidden xl:flex absolute inset-x-0 bottom-50 justify-center">
            <p className="caption text-main text-center max-w-3xl px-s24">
              {footerNote}
            </p>
          </footer>
        )}
      </div>

      {/* MOBILE + TABLET CONTENT */}
      <article className="xl:hidden px-s24 py-s40 typography-lg">
        <header>
          <h2 className="heading-h4 text-accent-main mb-s16">
            {title}
          </h2>
        </header>

        <p className="body-default text-main ">
        <strong className="text-primary-light">If you’ve reached this point, you probably need answers — </strong >and that’s completely okay. Legal problems can feel heavy, but you don’t have to face them alone. You deserve guidance, clarity, and someone who truly listens before offering solutions. We understand how overwhelming it can be when rights, responsibilities, and emotions collide. That’s why we’re here — to help you understand where you stand, what the law says, and how you can move forward confidently.
You’ve already taken the first step by being here. Let’s take the next one together.
        </p>

        {/* FOOTER — MOBILE/TABLET (NORMAL FLOW) */}
        {footerNote && (
          <footer className="mt-s24 flex justify-center px-s16">
            <p className="caption text-main  text-center max-w-4xl">
              {footerNote}
            </p>
          </footer>
        )}
      </article>
    </section>
  );
}
