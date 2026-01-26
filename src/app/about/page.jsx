import Image from "next/image";
import InfoCard from "@/components/InfoCard";
import Data from "@/Data/About.json"
import GetInTouch from "@/components/GetInTouch";

export default function AboutSection() {
  const { title, description, aboutSection } = Data;

  return (
    <section className="bg-background mt-[66px] md:mt-[83px] ">

      {/* HEADER */}
      <div className="bg-secondary-main text-center  px-s24 py-[100px] space-y-[100px] md:space-y-[200px] ">
        <div className="space-y-s16 max-w-5xl mx-auto">
          <h1 className="heading-h1 text-primary-main">{title}</h1>
          <p className="body-default text-main max-w-3xl px-s16 mx-auto">{description}</p>
        </div>

        {/* MISSION + CARDS */}
        <div className="max-w-7xl mx-auto bg-background rounded-r16 p-s16 py-s40 md:p-s64 space-y-s48">

          {/* Mission */}
          <div className="text-center max-w-7xl mx-auto space-y-s8">
            <h2 className="heading-h3 text-primary-main">
              {aboutSection.mission.title}
            </h2>
            <p className="heading-h6 text-secondary">
              {aboutSection.mission.description}
            </p>
          </div>

          {/* Cards */}
          <div
            className="
    grid grid-cols-1
    lg:grid-cols-3
    
    gap-s32 md:gap-0
    items-center
  "
          >
            <div className="order-1">
              <InfoCard data={aboutSection.whatWeDo} rotate={-9} />
            </div>

            <div className="order-2">
              {/* PILLAR */}
              <div className="flex justify-center order-2 lg:order-none">
                <Image
                  src="/Images/pillar.webp"
                  alt="Justice Pillar"
                  width={90}
                  height={280}
                  className="lg:w-[142px] lg:h-[550px]"
                  priority
                />
              </div>

            </div>

            <div className="order-3">
              <InfoCard data={aboutSection.howWeHelp} rotate={8} />
            </div>
          </div>

        </div>

        {/* WIDE IMAGE */}
      </div>
        <div className="bg-secondary-main pb-[100px] md:pb-[200px]">
          <Image
          src="/Images/aboutImage.webp"
          alt="About visual"
          width={5376}
          height={2304}
          className="w-full max-h-[400px] object-cover"
        />
        </div>
      

      {/* WHY + ASSURANCE */}
      <div className="
        max-w-7xl mx-auto
        flex flex-col lg:flex-row
        items-center
        gap-s32 
        
        px-s32 py-[100px] md:py-[200px]
      ">
        <div className="space-y-s24 max-w-4xl">
          <div className="space-y-s8">
            <h3 className="heading-h4 text-primary-main">
              {aboutSection.whyArshivLegal.title}
            </h3>
            <p className="body-default text-main">
              {aboutSection.whyArshivLegal.description}
            </p>
          </div>

          <div className="space-y-s16">
            <h3 className="heading-h4 text-primary-main">
              {aboutSection.ourAssurance.title}
            </h3>

            <ul className="list-disc pl-s24 space-y-s6">
              {aboutSection.ourAssurance.points.map((point, i) => (
                <li key={i} className="body-default text-main">
                  {point}
                </li>
              ))}
            </ul>

            <p className="body-default text-main">
              {aboutSection.ourAssurance.footerNote}
            </p>
          </div>
        </div>

        {/* PROFILE IMAGE */}
        <Image
          src="/Images/aryan.png"
          alt="Aryan Pandey"
          width={356}
          height={400}
          className="w-full max-w-[280px] sm:max-w-[320px] rounded-r16 object-cover"
        />
      </div>
         <div className="max-w-7xl mx-auto pb-[100px] md:pb-[200px] px-s16">
                     <GetInTouch
                     variant="blue"
                     height="220px"
                     text="Get Guidance"
                     title="Start the Conversation That Can Change Everything"
                     subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
                 />
             </div>
    </section>
  );
}
