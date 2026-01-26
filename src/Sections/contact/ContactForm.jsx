"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/validators/contact.validator";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm({ formData }) {
    const searchParams = useSearchParams();
const scrollTarget = searchParams.get("scroll"); // "contact"

useEffect(() => {
  if (scrollTarget === "contact") {
    const el = document.getElementById("contact-form");
    if (!el) return;

    const NAV_HEIGHT = 100; // same as your services page

    const y =
      el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
}, [scrollTarget]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(contactSchema)
    });

    const [submitted, setSubmitted] = useState(false); // ⭐ added

    const onSubmit = async (data) => {
        try {
            const payload = {
                fullName: data.name,
                email: data.email,
                phone: data.phone,
                message: data.query,
            };

            console.log(payload);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            console.log("rrr", res);


            const result = await res.json();

            if (result.success) {
                setSubmitted(true); // ⭐ update state
            }
        } catch (error) {
            console.error("Contact form error:", error);
        }
    };

    return (
        <form 
        
            onSubmit={handleSubmit(onSubmit)}
            className=" rounded-r16 space-y-s16"
        >
            <h3 className="heading-h4 text-primary-main">{formData.title}</h3>

            <Input
                label={formData.fields.name}
                name="name"
                register={register}
                error={errors.name}
                placeholder="Enter your name name"
            />

            <Input
                label={formData.fields.email}
                name="email"
                register={register}
                error={errors.email}
                placeholder="Enter your email"
            />

            <Input
                label={formData.fields.phone}
                name="phone"
                type="tel"
                register={register}
                error={errors.phone}
                placeholder="Enter your phone no."
            />

            <div>
                <label className="body-default text-secondary">case query</label>
                <textarea
                    {...register("query")}
                    placeholder="Describe about your case"
                    className="
            border-2 bg-secondary-dark mt-2 border-accent-main
            rounded-r8 p-s16 w-full h-32 outline-none
            focus:ring-2 focus:ring-accent-main
          "
                />
                {errors.query && (
                    <p className="text-red-main body-small">{errors.query.message}</p>
                )}
            </div>

            <p className="body-default text-text-secondary">
                {formData.privacyText}{" "}
                <span className="text-accent-main underline cursor-pointer">
                    {formData.privacyLink}
                </span>
            </p>

            {/* ⭐ ONLY THIS PART WAS UPDATED */}
            <Button
                type="submit"
                variant={
                    isSubmitting ? "primary" :
                        submitted ? "ctaAccent" :
                            "primary"
                }
                className="w-full"
            >
                {isSubmitting
                    ? "Submitting..."
                    : submitted
                        ? "Submitted"
                        : formData.submitText}
            </Button>
        </form>
    );
}
