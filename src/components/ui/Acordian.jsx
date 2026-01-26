import Image from "next/image";

export default function Accordion({
  question,
  answer,
  isLast,
  isOpen,
  onToggle,
}) {
  return (
    <div className={`${!isLast ? "border-b border-accent-main/20 mb-s16" : ""}`}>
      
      {/* HEADER */}
      <button
        onClick={onToggle}
        className="
          w-full flex justify-between items-center
          py-s8 text-left
          transition-all duration-200 hover:cursor-pointer
        "
        aria-expanded={isOpen}
      >
        <span className="text-lg font-normal md:text-xl md:font-medium text-main">{question}</span>

        {/* CUSTOM ICON */}
        <Image
          src={isOpen ? "/Images/balance_open.png" : "/Images/balance_close.png"}
          alt="toggle"
          width={30}
          height={30}
          className="transition-transform duration-300"
        />
      </button>

      {/* CONTENT */}
      <div
        className={`
          overflow-hidden transition-all duration-300
          ${isOpen ? "max-h-[300px] py-s8" : "max-h-0 py-0"}
        `}
      >
        <p className="md:leading-relaxed md:text-md text-main/80">{answer}</p>
      </div>
    </div>
  );
}
