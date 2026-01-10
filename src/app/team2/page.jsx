import Image from "next/image";
import ourTeam from "@/data/OurTeam2.json";
import GetInTouch from "@/components/GetInTouch";

export default function OurTeam() {
    const { header, intro, leadProfile, infoCards } = ourTeam;

    return (
        <section className="bg-background space-y-[102px] py-[102px] ">

            {/* ================= HEADER ================= */}
            <div className="max-w-2xl mx-auto text-center px-s16">
                <h1 className="hero-h1 text-primary-main mb-[10px]">
                    {header.title}
                </h1>
                <p className="body-default text-secondary max-w-[720px] mx-auto">
                    {header.subtitle}
                </p>
            </div>

            {/* ================= INTRO ================= */}
            <div className="max-w-7xl mx-auto px-s16">
                <h2 className="page-title-h2 text-accent-main mb-s16">
                    {intro.heading}
                </h2>
                <p className="body-default text-secondary leading-relaxed">
                    {intro.description}
                </p>
            </div>

            {/* ================= PROFILE CARD ================= */}
            <div className="bg-secondary-light/50 bg-[url(/Images/pattern.png)]  py-[102px]">
                <div className="max-w-5xl mx-auto px-s24">
                    <div className="bg-secondary-main rounded-r24 px-s64  pt-s64 flex flex-col md:flex-row gap-s64 items-center">

                        {/* Image */}
                        <div className="relative w-[356px] h-[400px] rounded-t-r16 overflow-hidden flex-shrink-0">
                            <Image
                                src={leadProfile.image}
                                alt={leadProfile.name}
                                width={356}
                                height={400}

                                className="object-cover"
                            />
                        </div>

                        {/* Text */}
                        <div>
                            <h3 className="subheading-h3 text-primary-main mb-s8">
                                {leadProfile.name} —{" "}
                                <span className="text-accent-main">
                                    {leadProfile.role}
                                </span>

                            </h3>
                            <p className="body-default text-secondary ">
                                {leadProfile.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= INFO CARDS ================= */}
            <div className="max-w-5xl mx-auto  grid md:grid-cols-2 px-s16 gap-s24">
                {infoCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-secondary-light rounded-r16 p-s40"
                    >
                        <h4 className="title-h4 text-primary-main mb-s8">
                            {card.title}
                        </h4>
                        <p className="body-small text-secondary leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>

        <div className="px-s16">
                <GetInTouch
                variant="white"
                height="220px"
                text="Get Guidance"
                title="Start the Conversation That Can Change Everything"
                subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
            />
        </div>

        </section>
    );
}
