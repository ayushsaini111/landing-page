"use client";
import { useState } from "react";
import Accordion from "./ui/Acordian";

export default function FaqSection({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  return (
    <div className="space-y-s16 lg:space-y-s32">
      <h2 className="page-title-h2 text-accent-main">FAQ</h2>

      <div>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            question={faq.question}
            answer={faq.answer}
            isLast={index === faqs.length - 1}
            isOpen={activeIndex === index}
            onToggle={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
}
