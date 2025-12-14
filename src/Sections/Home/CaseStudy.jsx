"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Data from "@/Data/data.json";
import AnimatedGavelIcon from "@/components/AnimatedGavelIcon";

const MODAL_DURATION = 450;

export default function CaseStudy() {
    const { caseStudies } = Data.homePage.servicesSection;

    const [open, setOpen] = useState(false);
    const [activeCase, setActiveCase] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleOpen = useCallback((caseItem) => {
        setActiveCase(caseItem);
        setImageLoaded(false);
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setTimeout(() => {
            setActiveCase(null);
            setImageLoaded(false);
        }, MODAL_DURATION);
    }, []);

    // Simple overflow hidden like navbar - prevents background scroll
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => (document.body.style.overflow = "");
    }, [open]);

    return (
        <section>
            {/* CASE STUDIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-s32 my-s32">
                {caseStudies.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleOpen(item)}
                        className="group flex justify-center"
                    >
                        <Image
                            src={item.image}
                            alt={item.title || "Case Study"}
                            width={302}
                            height={400}
                            className="rounded-lg object-contain max-h-[400px] transition-transform duration-300 group-hover:-translate-y-3"
                        />
                    </button>
                ))}
            </div>

            {/* MODAL */}
            {/* MODAL */}
            <AnimatePresence mode="wait">
                {open && activeCase && (
                    <>
                        {/* Backdrop — now same for mobile + desktop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={handleClose}
                            aria-hidden="true"
                        />

                        {/* Modal Container */}
                        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
                            <motion.div
                                key="modal"
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "100%", opacity: 0 }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="pointer-events-auto w-full max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl bg-background rounded-t-r16 shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] overflow-hidden"
                            >
                                {/* Header */}
                                <div className="h-20 flex items-center justify-center shrink-0">
                                    <button onClick={handleClose} className="p-2">
                                        <AnimatedGavelIcon isOpen={open} variant="brown" />
                                    </button>
                                </div>

                                {/* Scroll Content */}
                                <div className="flex-1 overflow-y-auto overflow-x-hidden sm:px-s16 py-s16">
                                    {activeCase.case && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: imageLoaded ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Image
                                                src={activeCase.case}
                                                width={2000}
                                                height={2600}
                                                alt="Case Study"
                                                onLoadingComplete={() => setImageLoaded(true)}
                                                priority
                                                className="w-full mx-auto object-contain scale-110 md:scale-100"
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

        </section>
    );
}
