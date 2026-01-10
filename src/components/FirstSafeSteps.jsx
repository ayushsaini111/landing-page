import Image from "next/image";

export default function FirstSafeSteps({ title, steps }) {
    return (
        <div className="max-w-7xl mx-auto space-y-s24 px-s16 lg:px-0 ">
            <h2 className="subheading-h3 text-accent-main ">
                {title}
            </h2>

            <div className="space-y-s12">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className=""
                    >
                        <div className="flex bg-secondary-light rounded-r16 mb-s24">

                            <div className="flex justify-center items-center bg-accent-main rounded-l-r16 p-[20px] gap-s6">
                                <Image
                                    src={step.icon}
                                    alt={step.title}
                                    width={24}
                                    height={24}
                                    priority
                                    className="shrink-0"
                                />
                                <p className="title-h4 text-background">{step.title}</p>
                            </div>
                            <div className="p-[20px] body-large text-secondary">{step.description}</div>

                        </div>



                    </div>
                ))}
            </div>
        </div>
    );
}
