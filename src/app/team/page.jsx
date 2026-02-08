"use client";

import Image from "next/image";
import Data from "@/Data/OurTeam.json";
import GetInTouch from "@/components/GetInTouch";

export default function OurTeam() {
  const { header, intro, leadProfile, practiceFlow, note, trust } = Data;

  return (
     <main className="w-full relative">


      {/* INTRO */}

      <header
        className="
    relative
    w-full mx-auto
    mt-[66px] md:mt-[83px]
    py-[80px] pb-[150px]
    md:py-[100px] md:[150px] lg:py-[200px]
    flex items-center justify-center
    overflow-hidden
    bg-background
  "
      >
        {/* TEXT CONTENT */}
        <section className="relative z-10 max-w-7xl  mb-[100px] flex flex-col px-s40 gap-s16 md:gap-s24 mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-relaxed font-primary text-primary-main">
            {header.title}
          </h1>

          <p className="max-w-xs sm:max-w-md text-sm md:text-lg md:font-medium md:leading-relaxed   text-main  md:max-w-lg lg:max-w-2xl mx-auto">
            {header.subtitle}
          </p>
        </section>

        {/* INK POT IMAGE */}
        <figure
          className="
      absolute
      right-0 top-0
      w-[85px] md:[250px] lg:w-[350px]  xl:w-[450px]
      pointer-events-none
    "
        >
          <Image
            src="/Images/inkPot.png"
            alt="Ink pot spilling ink"
            width={300}
            height={300}
            priority
            className="object-cover scale-500 md:scale-380 mt-40 md:mt-40 lg:scale-250"
          />

        </figure>
      </header>

      <section className="min-h-screen relative flex flex-col px-s24 justify-center gap-20 bg-secondary-main items-center bg-[url('/Images/pattern.png')] bg-center ">

        <Image
          src="/Images/cap.png"
          width={200}
          height={50}
          priority
          alt="Cap icon"
          className="absolute top-0 mt-[100px] w-[150px] md:w-[200px] md:translate-x-[130px] -translate-y-[200px]"
        />

        <div className="flex flex-col  items-center md:flex-row max-w-5xl  justify-center pt-[100px] px-s16">
          <p className="text-2xl font-primary font-medium md:text-5xl  text-accent-main lg:pt-[150px]">{intro.heading}</p>
          <div className="">
            <Image
              src={"/Images/pen.png"}
              width={950}
              height={550}
              alt="pen"
              className=" transfrom w-[150px]  md:w-[1500px] rotate-40 hidden justify-center lg:flex  lg:rotate-10"
            />
            {/* STRING – Mobile & Tablet */}
            <div className="flex justify-center lg:hidden">
              <Image
                src={"/Images/pen2.png"}
                width={950}
                height={550}
                alt="pen"

                className="absolute z-40 lg:hidden w-[250px] justify-center flex  lg:rotate-10"
              />
              <Image
                src={"/Images/mo8.png"}
                width={1250}
                height={150}
                className="absolute w-[250px] h-[2760]   -translate-x-[8px] translate-y-[195px] mx-auto"
                alt="decorative string mobile"
              />
            </div>

            {/* STRING – Desktop only */}
            <div className="hidden justify-center lg:flex">
              <Image
                src={"/Images/string-2.png"}
                width={1250}
                height={150}
                className="absolute mx-auto h-[2400px] -translate-y-[25px]"
                alt="decorative string desktop"
              />
            </div>

          </div>
          <p className="max-w-sm z-30  pt-[250px] md:pt-[50px] heading-h6  text-secondary pl-[70px]  text-center md:text-left lg:pt-[150px]">{intro.description}</p>
          <div>

          </div>



          {/* PROFILE */}
        </div>
        <div className="z-[100] max-w-4xl mt-10 rounded-t-r16 w-full mx-auto bg-white flex justify-center px-s16 sm:px-s64">
          <div className="w-full flex pt-[70px] pb-[40px] md:pt-[100px] flex-col items-center gap-s48">

            {/* IMAGE CARD */}
            <div className="w-full flex justify-center">
              <div
                className="
          w-full
          max-w-xl
          rounded-r16
        bg-gradient-to-b from-secondary-main to-background
          px-[50px] pt-[70px]
          md:px-[100px] md:pt-[100px]
          flex
          justify-center
        "
              >
                <Image
                  src={leadProfile.image}
                  alt={leadProfile.name}
                  width={420}
                  height={520}
                  className="
            object-cover
            rounded-r12
            w-full
            h-auto
          "
                  priority
                />
              </div>
            </div>

            {/* TEXT CONTENT */}
            <div className="max-w-xl text-center flex flex-col gap-s16 px-s16">
              <p className="heading-h5 text-accent-main">
                {leadProfile.role}
              </p>

              <p className="body-default text-text-muted">
                {leadProfile.description}
              </p>
            </div>

          </div>
        </div>


      </section>


      <section className="relative lg:mb-[900px] mx-auto">
        <div className="max-w-7xl mx-auto px-s32 py-[150px] md:pt-[250px]">

          <header className="max-w-lg md:max-w-3xl my-[100px] lg:mt-[200px]">
            <p className="caption text-secondary">Our Team’s Approach</p>

            <h2 className="heading-h2 text-accent-main">
              {practiceFlow.title}
            </h2>

            <p className="heading-h6 text-secondary max-w-xl">
              {practiceFlow.subtitle}
            </p>
          </header>

          {/* GRID */}
          <div
            className="
        
        lg:absolute
        lg:left-1/2
        lg:-translate-x-1/2
        w-full
        max-w-6xl
        grid
        grid-cols-1
        lg:grid-cols-3
        lg:grid-rows-2
        gap-s32
        lg:gap-[70px]
        justify-items-center
        items-center
        md:px-s32
        md:mt-[100px]
        lg:mt-0
      "
          >
            {[0, 1, 2, 3, 4, 5].map((cellIndex) => {
              const stepIndex = Math.floor(cellIndex / 2);
              const isContent =
                cellIndex % 2 === 0 &&
                stepIndex < practiceFlow.steps.length;

              return (
                <div key={cellIndex} className="w-full flex justify-center">
                  {isContent ? (
                    <article
                      className="
                  bg-secondary-main
                  shadow-md
                  p-s48 md:p-s32
                  max-w-xs
                  lg:min-h-[300px]
                  text-center
                  mx-auto
                "
                    >
                      <h3 className="heading-h4 text-primary-main">
                        {practiceFlow.steps[stepIndex].title}
                      </h3>

                      <p className="body-default text-primary-main mt-s8">
                        {practiceFlow.steps[stepIndex].description}
                      </p>
                    </article>
                  ) : (
                    <div className="hidden md:block w-full h-full" />
                  )}
                </div>
              );
            })}

            <p className="col-span-full mx-auto text-center caption text-accent-main mt-s64">
              {note}
            </p>
          </div>
        </div>
      </section>


      <section className="w-full bg-background ">
        {/* MOBILE + TABLET */}
        <div className="block xl:hidden">
          {/* IMAGE */}
          <img
            src="/Images/Frame-176.svg"
            alt="Supreme Court of India"
            className="w-full h-auto object-contain"
          />

          {/* TEXT */}
          <div className="px-s32 py-[100px] text-center flex flex-col gap-s16">
            <p className="heading-h3 text-accent-main">
              {trust.title}
            </p>

            <p className="body-default text-text-muted">
              {trust.description}
            </p>
          </div>
        </div>

        {/* DESKTOP / LARGE SCREENS */}
        <div
          className="
      hidden
      xl:block
      min-h-[1000px]
      py-[200px]
      bg-[url('/Images/Frame-176.svg')]
      bg-cover
      bg-top
      bg-no-repeat
      relative
    "
        >
          {/* OPTIONAL DARK OVERLAY (REMOVE IF NOT NEEDED) */}
          {/* <div className="absolute inset-0 bg-black/10" /> */}

          {/* CONTENT */}
          <div
            className="
        relative
        max-w-8xl
        mx-auto
        px-s32 md:px-[100px]
        pt-[50px]
        flex
        justify-between
        items-start
      "
          >
            <p className="heading-h3 text-accent-main max-w-sm">
              {trust.title}
            </p>

            <p className="heading-h6 text-main max-w-sm">
              {trust.description}
            </p>
          </div>
        </div>
      </section>

      <div className="pb-[100px] mb:pb-[200px]">
        <GetInTouch
          variant="white"
          height="220px"
          text="Get Guidance"
          title="Start the Conversation That Can Change Everything"
          subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
        />

      </div>

    </main>
  );
}
