"use client";

import Image from "next/image";
import Data from "@/Data/data.json";
import Gradient from "./ui/Gradient";
import HowWeWork from "@/Sections/Home/HowWeWork";

export default function AboutSection() {
    // ✔ Correct JSON path
    const { about } = Data;

    if (!about) return <p>About data missing.</p>;

    const { aboutSection, title, description } = about;

    if (!aboutSection) return <p>About section missing.</p>;

    const {
        mission,
        whatWeDo,
        whyArshivLegal,
        ourAssurance
    } = aboutSection;

    return (
        <section className="w-full space-y-s40 md:space-y-s48 lg:space-y-s64">
            <Gradient title={title} description={description} />
            <div className="w-full">
                <Image
                src="/Images/aboutImage.webp"
                alt="Ashoka Pillar"
                width={5376}
                height={2304}
                className="w-full max-h-[400px] object-cover"
            />
            </div>
            <div className="max-w-7xl mx-auto px-s16 md:px-s32 space-y-s40 md:space-y-s48 lg:space-y-s64">
                {/* MISSION */}
                <div className="space-y-s16">
                    <h2 className="page-title-h2 text-accent-main">
                        {mission.title}
                    </h2>
                    <p className="body-large">
                        {mission.description}
                    </p>
                </div>

                {/* WHAT WE DO */}
                <div className="space-y-s16">
                    <h2 className="page-title-h2 text-accent-main">
                        {whatWeDo.title}
                    </h2>
                    <p className="body-large">
                        {whatWeDo.description}
                    </p>
                    <ul className="list-disc ml-s24 md:ml-s32 lg:ml-s48 space-y-s6 body-large">
                        {whatWeDo.points.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                    <p className="body-large">
                        {whatWeDo.footerNote}
                    </p>
                </div>

                {/* HOW WE HELP */}
                <HowWeWork />

                {/* WHY ARSHIV LEGAL (WITH PILLAR IMAGE) */}
                <div className="flex gap-s16 lg:gap-s64 items-start">

                    {/* Image */}
                        <Image
                        src="/Images/pillar.webp"
                        alt="Ashoka Pillar"
                        width={855}
                        height={3427}
                        className="lg:max-w-28 md:max-w-22 max-w-20 h-full"
                    />

                    {/* Text Block */}
                    <div className="space-y-s16 w-full">
                        {/* Why Arshiv Legal */}
                        <div className="space-y-s16">
                            <h2 className="subheading-h3 text-accent-main">
                                {whyArshivLegal.title}
                            </h2>
                            <p className="body-large">
                                {whyArshivLegal.description}
                            </p>
                        </div>

                        {/* OUR ASSURANCE */}
                        <div className="space-y-s16">
                            <h2 className="subheading-h3 text-accent-main">
                                {ourAssurance.title}
                            </h2>

                            <ul className="list-disc ml-s32 space-y-s6 body-large">
                                {ourAssurance.points.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        </div>

                        <p className="body-large">
                            {ourAssurance.footerNote}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
