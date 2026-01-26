import React from "react";
import Link from "next/link";

function Button({ variant = "primary", children, href, as = "button", className = "", ...props }) {
    const baseClass = "inline-flex items-center justify-center px-s24 py-s8 h-fit rounded-r8 hover:cursor-pointer";

    const variants = {
        primary: "text-base bg-primary-main text-background hover:bg-primary-light",
        secondary: "text-base text-accent-main bg-secondary-main hover:bg-secondary-dark hover:text-accent-main",
        ctaAccent: "text-xl lg:text-2xl text-background bg-accent-main hover:bg-secondary-main hover:text-accent-main",
        ctaSecondary: "text-xl lg:text-2xl text-accent-main bg-secondary-main hover:bg-secondary-dark hover:text-accent-main",
        outliner:"text-base text-primary-main hover:bg-primary-main hover:text-background border-primary-main border-2",
        destructive: "text-base text-background bg-red-main hover:bg-red-dark",
    };

    // ✅ Merge variant + base + extra custom classes
    const allClasses = `${baseClass} ${variants[variant] || variants.primary} ${className}`;

    if (as === "link" && href) {
        return (
            <Link href={href} className={allClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={allClasses} {...props}>
            {children}
        </button>
    );
}

export default Button;
