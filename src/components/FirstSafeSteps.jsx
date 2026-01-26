import Image from "next/image";

export default function FirstSafeSteps({ title, steps }) {
    return (
        <div className="max-w-7xl mx-auto space-y-s24  lg:px-0 typography-md">
            <h2 className="heading-h4 text-accent-main ">
                {title}
            </h2>

            <div className="space-y-s12">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className=""
                    >
                        <div className="flex  min-h-[10vh] items-center bg-secondary-main rounded-r16 mb-s24">

                            <div className="flex justify-center min-h-[10vh]  items-center bg-primary-main rounded-l-r16 p-s16 gap-s6">
                                <Image
                                    src={step.icon}
                                    alt={step.title}
                                    width={24}
                                    height={24}
                                    priority
                                    className=""
                                />
                                <p className="text-sm md:text-xl md:font-medium  text-background ">{step.title}</p>
                            </div>
                            <div className="px-s8 md:px-s16 text-sm md:text-xl md:font-medium  text-secondary">{step.description}</div>

                        </div>



                    </div>
                ))}
            </div>
        </div>
    );
}
