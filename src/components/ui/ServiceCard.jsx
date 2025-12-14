"use client";

export default function ServiceCardSmall({ title, subtitle }) {
    return (
        <div
            className="
        bg-secondary-light
        p-s16
        flex-col
        rounded-r16
        gap-s8
        border-2
        border-b-8
        h-full
        border-accent-main
        w-full cursor-pointer
        "
        >
            <h3 className="title-h4 text-primary-main">{title}</h3>
            <p className="body-default text-seconadry">{subtitle}</p>
        </div>
    );
}


export function ServiceCardSmallll({ title, subtitle }) {
    return (
        <div
            className="
        bg-secondary-light
        p-s16
        rounded-r16
        border-2 border-b-8
        border-accent-main
        w-[250px]
        md:w-[350px]
        shrink-0
        "
        >
            <h3 className="title-h4 text-primary-main">{title}</h3>
            <p className="body-small text-seconadry">{subtitle}</p>
        </div>
    );
}
