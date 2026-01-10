import Image from "next/image";
import InfoCard from "@/components/InfoCard";
import Data from "@/Data/About.json"

export default function AboutSection() {
  const { title, description, aboutSection } = Data;

  return (
    <section className="bg-background space-y-s64 py-s40 lg:py-[78px]">

      {/* HEADER */}
      <div className="bg-secondary-light text-center  py-s40 lg:py-[102px] space-y-s48">
        <div className="space-y-s16 max-w-5xl mx-auto">
          <h1 className="hero-h1 text-primary-main">{title}</h1>
          <p className="body-default text-secondary">{description}</p>
        </div>

        {/* MISSION + CARDS */}
        <div className="max-w-7xl mx-auto bg-background rounded-r16 px-s16 py-s40 lg:p-[60px] space-y-s48">

          {/* Mission */}
          <div className="text-center max-w-3xl mx-auto space-y-s8">
            <h2 className="hero-h1 text-primary-main">
              {aboutSection.mission.title}
            </h2>
            <p className="body-default text-secondary">
              {aboutSection.mission.description}
            </p>
          </div>

          {/* Cards */}
          <div
            className="
    grid grid-cols-1
    lg:grid-cols-3
    gap-s32 lg:gap-[72px]
    items-center
  "
          >
            <div className="order-1">
              <InfoCard data={aboutSection.whatWeDo} rotate={-8} />
            </div>

            <div className="order-2">
              {/* PILLAR */}
              <div className="flex justify-center order-2 lg:order-none">
                <Image
                  src="/Images/pillar.webp"
                  alt="Justice Pillar"
                  width={90}
                  height={280}
                  className="lg:w-[120px] lg:h-[360px]"
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
        <Image
          src="/Images/aboutImage.webp"
          alt="About visual"
          width={5376}
          height={2304}
          className="w-full max-h-[240px] sm:max-h-[300px] lg:max-h-[400px] object-cover"
        />
      </div>

      {/* WHY + ASSURANCE */}
      <div className="
        max-w-7xl mx-auto
        flex flex-col lg:flex-row
        items-center
        gap-s32
        px-s16 py-s40
      ">
        <div className="space-y-s32 max-w-4xl">
          <div className="space-y-s8">
            <h3 className="subheading-h3 text-primary-main">
              {aboutSection.whyArshivLegal.title}
            </h3>
            <p className="body-default text-secondary">
              {aboutSection.whyArshivLegal.description}
            </p>
          </div>

          <div className="space-y-s16">
            <h3 className="subheading-h3 text-primary-main">
              {aboutSection.ourAssurance.title}
            </h3>

            <ul className="list-disc pl-s24 space-y-s8">
              {aboutSection.ourAssurance.points.map((point, i) => (
                <li key={i} className="body-default text-secondary">
                  {point}
                </li>
              ))}
            </ul>

            <p className="body-default text-secondary">
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
    </section>
  );
}
