"use client";

import Image from "next/image";
import Data from "@/Data/OurTeam.json";
import GetInTouch from "@/components/GetInTouch";

export default function OurTeam() {
  const { header, intro, leadProfile, practiceFlow, note, trust } = Data;

  return (
    <main className="w-full">


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
        <section className="relative z-10 max-w-7xl flex flex-col px-s40 gap-s16 md:gap-s24 mx-auto text-center">
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

  <section className="min-h-screen bg-[url('/Images/Frame-258.svg')] lg:bg-[url('/Images/Frame-178.svg')] [1950px]:bg-[url('/Images/Frame-174.svg')] bg-cover [1950px]:bg-contain bg-top">
  <div className="relative max-w-7xl mx-auto px-s24 md:px-s40 pt-[150px] md:pt-[20px] ">

    {/* INTRO ROW */}
    <div className="flex flex-col lg:flex-row justify-between gap-s32 mt-50 md:mt-90 mb-70 xl:mt-100  px-s16 pb-[400px] xl:pb-[600px] bg-contain md:px-0 lg:gap-s64">

      <article className="max-w-sm">
        <h2 className="heading-h3 text-accent-main">
          {intro.heading}
        </h2>
      </article>

      <article className="heading-h6 text-secondary max-w-md">
        {intro.description}
      </article>
    </div>

    {/* PROFILE */}
<div className=" max-w-5xl rounded-t-r16 w-full mx-auto bg-white flex justify-center px-s16 md:px-s64">
  <div className="w-full flex py-[70px] md:py-[100px] flex-col items-center gap-s48">

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

  </div>
</section>


     <section className="min-h-screen bg-[url('/Images/Frame-500.svg')] lg:bg-[url('/Images/Frame177.svg')] bg-cover bg-center">
  <div className="max-w-7xl mx-auto px-s32 py-[150px] sm:py-[200px] md:pt-[350px]">

    <header className="max-w-lg md:max-w-3xl mt-[100px] mb-s64 sm: xl:mb-[200px]">
      <p className="caption text-secondary">Our Team’s Approach</p>

      <h2 className="heading-h2 text-accent-main">
        {practiceFlow.title}
      </h2>

      <p className="heading-h6 text-secondary max-w-xl">
        {practiceFlow.subtitle}
      </p>
    </header> 

    <div className="grid grid-cols-1 md:px-s32 mt-[200px] md:mt-[400px] lg:mt-0  lg:grid-cols-3 lg:grid-rows-2 gap-s32 md:gap-s48 ">

      {[0,1,2,3,4,5].map((cellIndex) => {
        const stepIndex = Math.floor(cellIndex / 2);
        const isContent = cellIndex % 2 === 0 && stepIndex < practiceFlow.steps.length;

        return (
          <div key={cellIndex}>
            {isContent ? (
              <article className="bg-secondary-main shadow-lg p-s48 md:p-s32 content-center lg:min-h-[400px] text-center shadow-secondary-lg">
                <h3 className="heading-h4 text-primary-main">
                  {practiceFlow.steps[stepIndex].title}
                </h3>

                <p className="heading-h6 text-primary-main mt-s8">
                  {practiceFlow.steps[stepIndex].description}
                </p>
              </article>
            ) : (
              <div className="hidden md:block h-full" />
            )}
          </div>
        );
      })}
    </div>

    <p className="text-center caption text-accent-main mt-s64">
      {note}
    </p>

  </div>
</section>


<section className="w-full bg-background">
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
