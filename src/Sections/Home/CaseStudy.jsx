"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Data from "@/Data/HomePage.json";
import AnimatedGavelIcon from "@/components/AnimatedGavelIcon";
import Button from "@/components/ui/Button";

const MODAL_DURATION = 450;

export default function CaseStudy() {
  const { caseStudies } = Data.servicesSection;
  const description = "Our approach is built on clarity, precision, and genuine understanding.";

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

  // 🔒 Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="max-w-7xl bg-background mx-auto px-s16 md:px-s24 py-[50px] md:py-[150px] rounded-r16">
      {/* SECTION HEADING */}

      <header className="mb-s64 ">
        <h2 className="heading-h1 text-primary-main md:pl-s24 text-center md:text-left">Case Study</h2>
      </header>
      <div className="flex flex-col  items-center gap-[100px] ">
        {/* CASE 1 */}
        <div className="w-full max-w-5xl  bg-secondary-main rounded-r16 px-s24 pt-s24 md:px-s64 md:pt-s64 flex flex-col items-center gap-s32">

          <div className="flex flex-col items-center gap-s16">
            <p className="heading-h6 text-secondary text-center max-w-lg">
              {description}
            </p>

            <Button variant="primary" onClick={() => handleOpen(caseStudies[0])}>
              View case study
            </Button>
          </div>
          <div className="w-full bg-gradient-to-t h-[250px] md:h-[600px] from-secondary-main to-background rounded-r16 px-s16  md:px-s64 pt-s64 flex justify-center hover:cursor-pointer"
            onClick={() => handleOpen(caseStudies[0])}
          >
            <Image
              src={caseStudies[0].image}
              alt="Case study"
              width={520}
              height={70}
              className="object-cover object-top"
            />
          </div>

        </div>

        {/* CASE 2 */}
        <div className="flex flex-col max-w-5xl lg:flex-row items-center justify-center gap-s32 text-center">
          <p className="heading-h6 text-secondary max-w-sm lg:text-left ">
            {description}
          </p>

          <div className="flex flex-col items-center gap-s32 px-s32 hover:cursor-pointer"
            onClick={() => handleOpen(caseStudies[1])}>
            <Image
              src={caseStudies[1].image}

              alt="Case study"
              width={280}
              height={380}
              className="object-cover  w-[350px] md:w-[600px] lg:w-[700px]"
            />

            <Button variant="primary" onClick={() => handleOpen(caseStudies[1])}>
              View case study
            </Button>
          </div>

          <p className="heading-h6 text-secondary max-w-xs lg:text-left">
            {description}
          </p>
        </div>

        {/* CASE 3 */}
        <div className="w-full max-w-5xl  bg-secondary-main rounded-r16 px-s24 py-s24 md:p-s64 flex flex-col items-center gap-s32">

          <div className="w-full bg-gradient-to-b h-[250px] md:h-[600px] from-secondary-main to-background rounded-r16 px-s16  md:px-s64 pt-s64 flex justify-center hover:cursor-pointer"
            onClick={() => handleOpen(caseStudies[2])}>
            <Image
              src={caseStudies[0].image}
              alt="Case study"
              width={520}
              height={70}
              className="object-cover object-top "
            />
          </div>
          <div className="flex flex-col items-center gap-s16">
            <p className="heading-h6 text-secondary text-center max-w-lg">
              {description}
            </p>

            <Button variant="primary" onClick={() => handleOpen(caseStudies[2])}>
              View case study
            </Button>
          </div>
        </div>
      </div>

      {/* MODAL — SAME AS YOUR ORIGINAL */}
      <AnimatePresence mode="wait">
        {open && activeCase && (
          <>
            {/* Backdrop */}
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
                className="
                  pointer-events-auto
                  w-full max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl
                  bg-background
                  rounded-t-r16
                  shadow-2xl
                  flex flex-col
                  max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh]
                  overflow-hidden
                "
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
