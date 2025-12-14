"use client";
import Data from "@/Data/data.json";
import Button from "@/components/ui/Button";

export default function Hero() {
    const hero = Data?.homePage?.heroSection;
    if (!hero) return null;

    return (
        <section>
            {/* -------------------- MOBILE VIEW -------------------- */}
            {/* MOBILE VIEW */}
            <div className="lg:hidden flex flex-col items-center">
                {/* IMAGE + GRADIENT */}
                <div className="relative max-w-lg overflow-hidden flex justify-center">
                    <div className="relative flex justify-center">
                        <video
                            src="/Images/hero-m.mp4"

                            autoPlay
                        loop
                        muted
                        playsInline
                            alt="Lady Justice"
                            className="w-full h-[400px] object-cover scale-[1.35] origin-top"
                        />
                        {/* GRADIENT OVERLAY */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                            style={{
                                height: "400px",
                                background: `linear-gradient(to bottom,rgba(255,250,238,0) 30%,rgba(255,250,238,0.8) 60%,rgba(255,250,238,1) 65%,rgba(255,250,238,1) 100%)`,
                            }}
                        />
                    </div>
                </div>
                {/* TEXT CONTENT */}
                <div className="relative -mt-50 w-full text-center space-y-s16 z-10 px-s16 md:px-s32">
                    <h1 className="hero-h1 text-primary-main">{hero.mainHeading}</h1>
                    <p className="body-large text-secondary">
                        {hero.subHeading}
                    </p>
                    <Button children={hero.ctaButton} variant={"ctaAccent"} as="link" href="/contact-us"/>
                </div>
            </div>


            {/* -------------------- DESKTOP VIEW -------------------- */}
            <div className="hidden lg:flex max-w-[1600px] mx-auto items-center justify-between px-s16 md:px-s32">
                <div className="max-w-2xl space-y-s16">
                    <h1
                        className="hero-h1 text-primary-main"
                        dangerouslySetInnerHTML={{
                            __html: hero.mainHeading.replace(/\.\s*/g, ".<br/>")
                        }}
                    />
                    <p className="body-large text-secondary">
                        {hero.subHeading}
                    </p>
                    <Button children={hero.ctaButton} variant={"ctaAccent"} as="link" href="/contact-us"/>
                </div>
                <div>
                    <video
                        src="/Images/hero.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover max-h-[800px]"
                    />
                </div>
            </div>
        </section>
    );
}
