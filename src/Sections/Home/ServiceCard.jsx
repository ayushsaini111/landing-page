"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({
    image,
    title,
    description,
    matters,
    subTitle,
}) {
    return (
        <div
            className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-center gap-s16">
            {/* LEFT IMAGE */}
            <div
                className="lg:w-1/3 aspect-video overflow-hidden rounded-r16">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                />
            </div>
            {/* RIGHT CARD */}
            <div
                className="w-fit h-full rounded-r16  flex flex-col justify-between gap-s16 p-s16 md:p-s24 lg:p-s32 shadow-[inset_4px_4px_6px_rgba(0,0,0,0.25),inset_-4px_-4px_6px_rgba(0,0,0,0.25)]">
                <h2 className="page-title-h2 text-accent-main">
                    {title}
                </h2>
                <p className="body-default">
                    {description}
                </p>
                <h4 className="title-h4 text-disable">{subTitle}</h4>
                <div className="flex flex-col lg:flex-row gap-s16 flex-1 justify-between">
                    <ul className="list-disc body-default ml-s24 md:ml-s32 lg:ml-s40 w-fit space-y-s6">
                        {matters.map((m, idx) => (
                            <li key={idx}>
                                <Link href={m.href} className="hover:text-accent-main">
                                    {m.label}
                                    <span className="caption"> ↗</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* CTA */}
                    <div className="mt-auto lg:self-end w-full lg:w-auto">
                        <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => {
                                const focus = title.toUpperCase();
                                window.location.href = `/legal-services?focus=${encodeURIComponent(
                                    focus
                                )}`;
                            }}
                            children={"More Services"}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}
