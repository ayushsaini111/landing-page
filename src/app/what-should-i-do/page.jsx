import Image from "next/image";
import Data from "@/Data/WhatShouldIDo.json";
import FirstSafeSteps from "@/components/FirstSafeSteps";
import { ShieldAlert } from 'lucide-react';
import FaqSection from "@/components/FaqSection";
import GetInTouch from "@/components/GetInTouch";
export default function WhatShouldIDo() {

    const {
        badge,
        heading,
        subHeading,
        image,
        warningBox,
        stepsTitle,
        steps,
        faqs
    } = Data;

    return (
        <section className="bg-background space-y-[102px] md:py-[102px]">
            <div className="bg-[#FFE0BC]/50 flex flex-col justify-center items-center text-center gap-s48 py-s32 px-[50px] md:py-[102px]">
                <div className="space-y-s16">
                    <span className="default text-primary-light">
                        {badge}
                    </span>

                    <h1 className="hero-h1 text-center text-accent-main">
                        {heading}
                    </h1>

                    <p className="body-large mx-auto max-w-lg text-center text-primary-main">
                        {subHeading}
                    </p>
                </div>

                {/* IMAGE */}
                <div className="max-w-7xl mx-auto ">
                    <Image
                        src={image.url}
                        alt={image.alt}
                        width={1200}
                        height={600}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                        className="rounded-r16 object-cover w-full h-auto"
                        priority
                    />
                </div>
            </div>
            {/* HEADER */}


            <div className="max-w-7xl mx-auto px-s16 md:px-s32 space-y-[102px]">
            {/* WARNING BOX */}
            <div
                className="
            bg-secondary-light
             border-2 border-accent-main
           rounded-r16
              px-s16 py-s24
            sm:px-s24 sm:py-s32
            lg:px-s40 lg:py-s48"
            >
                <div
                    className="
                            flex  
                            gap-s8 sm:gap-s16
                            items-start"
                >
                    {/* ICON */}
                    <Image
                        src={warningBox.icon}
                        alt={warningBox.title}
                        width={40}
                        height={40}
                        priority
                        className="shrink-0"
                    />

                    {/* TEXT */}
                    <div className="space-y-s8">
                        <p className="subheading-h3 text-accent-main">
                            {warningBox.title}
                        </p>

                        <p className="title-h4 text-secondary">
                            {warningBox.description}
                        </p>
                    </div>
                </div>
            </div>


            {/* FIRST SAFE STEPS */}

            <FirstSafeSteps title={stepsTitle} steps={steps} />

                <FaqSection faqs={faqs} />

            {/* CTA */}
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
