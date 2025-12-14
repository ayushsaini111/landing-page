import Image from "next/image";

export default function TeamCard({ image, heading, content, imagePosition = "left" }) {
    const isRight = imagePosition === "right";

    return (
        <div className="w-full">
            <div className={`flex flex-col gap-s16 lg:gap-0 lg:flex-row ${isRight ? 'lg:flex-row-reverse' : ''} lg:items-center`}>

                {/* IMAGE */}
                <div className="rounded-r16 overflow-hidden shrink-0">
                    <Image
                        src={image}
                        alt={heading}
                        width={500}
                        height={560}
                        className="aspect-video lg:aspect-5/7 object-cover w-full lg:h-full"
                    />
                </div>

                {/* CARD */}
                <div className={`w-full px-s16 lg:px-0 ${isRight ? '-translate-y-s56 lg:translate-x-s56 lg:translate-y-0' : '-translate-y-s56 lg:-translate-x-s56 lg:translate-y-0 '}`}>
                    <div className="relative z-20 bg-secondary-light rounded-r16 shadow-lg p-s16 lg:p-s32  space-y-s16">
                        <h2 className="page-title-h2 text-accent-main">{heading}</h2>
                        <p className="body-large">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
