"use client";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { navLinks, services } from "@/Data/Navlink";
import Button from "./ui/Button";
import AnimatedGavelIcon from "./AnimatedGavelIcon";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showServices, setShowServices] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (isMenuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => (document.body.style.overflow = "");
    }, [isMenuOpen]);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        handleScroll(); // run once on mount

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);


    useEffect(() => {
        setOpenDropdown(false);
    }, [pathname]);


    return (
        <nav
            className={`
                        fixed z-500 top-0 left-0 w-full z-50
                        flex justify-between items-center
                        px-s16 md:px-s24 lg:px-s32
                        py-s8 lg:py-s16 body-default transition-colors duration-300
                        

                        ${isScrolled ? "backdrop-blur-md bg-secondary-dark/50" : "bg-background border-b border-primary-main"}
                     `}
        >

            {/* LOGO */}
            <Link href="/" className="shrink-0">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    height={40}
                    width={121}
                    className="h-13 w-30"
                />
            </Link>

            {/* DESKTOP MENU */}
            <ul className="hidden w-full xl:flex gap-s32 items-center justify-center flex-1">
                {navLinks.map((item) => {
                    const isActive = pathname === item.href;
                    const isServices = item.label === "Legal Services";

                    return (
                        <li
                            key={item.href}
                            className="relative"
                            onMouseEnter={() => {
                                if (isServices) setOpenDropdown(true);
                                else setOpenDropdown(false);   // ← CLOSE ON HOVER ANY OTHER ITEM
                            }}
                        >
                            {isServices ? (
                                <Link href={item.href} className="flex items-center gap-s6 p-s6 transition text-text-main hover:text-accent-main">
                                    {item.label}
                                    <ChevronDown
                                        className={`w-s16 h-s16 transition-transform duration-300 ${openDropdown ? "rotate-180" : ""
                                            }`}
                                    />
                                </Link>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`relative p-s6 text-default transition-colors origin-center duration-300
                                    ${isActive ? "text-accent-main" : "hover:text-accent-main"}
  `}
                                >
                                    {item.label}

                                    <span
                                        className={`absolute  left-0 -bottom-1 h-0.5 rounded-full bg-accent-main
                                        transition-all duration-300 ease-in-out
                                      ${isActive ? "w-full  opacity-100" : "w-0  opacity-0"}
    `}
                                    />
                                </Link>

                            )}
                        </li>
                    );
                })}
            </ul>


            {/* ---------------------- */}
            {/* CENTERED MEGA DROPDOWN */}
            {/* ---------------------- */}
            <div
                className={`
          absolute left-1/2 -translate-x-1/2 top-full
          bg-primary-main shadow-xl rounded-b-r8
          overflow-hidden transition-all duration-200 ease-in-out
          ${openDropdown ? "opacity-100 max-h-[700px]" : "opacity-0 max-h-0"}
        `}
                onMouseLeave={() => setOpenDropdown(false)}
            >
                <div className="px-s24 py-s24">
                    <div
                        className="
              grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
              gap-s24 w-max max-w-7xl
            "
                    >
                        {Object.entries(services).map(([category, items]) => (
                            <div key={category} className="flex flex-col gap-s12">

                                {/* Category Title */}
                                <h3 className="title-h4 text-secondary-dark">{category}</h3>

                                {/* Items */}
                                <div className="flex flex-col gap-s6">
                                    {items.map((service) => (
                                        <Link
                                            key={service.href}
                                            href={service.href}
                                            onClick={() => setOpenDropdown(false)}   // ✅ CLOSE DROPDOWN
                                            className="
                                            body-default block rounded-r8 px-s12 py-s6 
                                            text-background/80  hover:opacity-100 
                                            hover:text-secondary-main transition"
                                        >
                                            {service.label}
                                            <span className="caption font-extrabold ml-1">
                                                ↗
                                            </span>
                                        </Link>
                                    ))}
                                </div>


                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE BUTTON */}
            <div className="flex items-center gap-s16">
                <div className="hidden xl:block">
                    <Button href={"/contact-us"} children={"Contact us"} as={"link"} />
                </div>

                {/* MOBILE TOGGLE ICON */}
                <div className="block xl:hidden">
                    <AnimatedGavelIcon isOpen={isMenuOpen} onClick={toggleMenu} />
                </div>
            </div>

            
            {/* OVERLAY FOR MOBILE CLOSE ON OUTSIDE CLICK */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 not-last-of-type: xl:hidden"
                    onClick={() => {
                        setIsMenuOpen(false);
                        setShowServices(false);
                    }}
                />
            )}


            {/* MOBILE MENU (unchanged) */}
            {/* MOBILE MENU (unchanged) */}
<div
  className={`
    absolute top-full left-0 w-full
    bg-primary-main text-background
    overflow-hidden
    transition-all duration-300 ease-in-out
    xl:hidden
    rounded-b-r16
    shadow-2xl
    ${
      isMenuOpen
        ? "max-h-[85vh] py-s8"
        : "max-h-0 py-0"
    }
  `}
>
  {/* MAIN MOBILE MENU */}
  <div
    className={`
      transition-transform duration-300
      ${
        showServices
          ? "-translate-x-full"
          : "translate-x-0"
      }
    `}
  >
    {navLinks.map(({ label, href }) => {
      const isActive = pathname === href;

      return (
        <div key={href} className="px-s16 py-s8">
          {label === "Legal Services" ? (
            <button
              onClick={() => setShowServices(true)}
              className="
                flex justify-between items-center
                w-full
                px-s16 py-s8
                rounded-r8
                hover:bg-secondary-dark
                hover:text-accent-main
                transition
              "
            >
              <span>{label}</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <Link
              href={href}
              onClick={closeMenu}
              className={`
                block
                px-s16 py-s8
                rounded-r8
                transition
                ${
                  isActive
                    ? "bg-secondary-dark text-accent-main"
                    : "hover:bg-secondary-dark hover:text-accent-main"
                }
              `}
            >
              {label}
            </Link>
          )}
        </div>
      );
    })}

    {/* CONTACT BUTTON */}
    <div className="mx-s16 my-s8">
      <Button
        href="/contact-us"
        variant="secondary"
        as="link"
        onClick={closeMenu}
        className="w-full"
      >
        Contact us
      </Button>
    </div>
  </div>

  {/* LEGAL SERVICES SUBMENU */}
  <div
    className={`
      fixed left-0 right-0 bottom-0 top-[0] 
      bg-primary-main
      transition-transform duration-300
      ${
        showServices
          ? "translate-x-0"
          : "translate-x-full"
      }
      min-h-screen
      overflow-y-auto
      overscroll-contain
      touch-pan-y
      scroll-smooth
      pb-s24
    `}
  >
    {/* BACK BUTTON */}
    <button
      onClick={() => setShowServices(false)}
      className="
        sticky top-0 z-10
        flex items-center gap-s8
        w-full
        px-s16 py-s8
        bg-primary-light
        hover:text-secondary-main
      "
    >
      <ChevronLeft className="w-s16 h-s16" />
      Back
    </button>

    {/* SERVICES LIST */}
    <div className="flex flex-col mt-s8 gap-s16 pb-s24">
      {Object.entries(services).map(([category, items]) => (
        <div key={category}>
          <h3 className="title-h4 text-secondary-dark px-s16 py-s8">
            {category}
          </h3>

          {items.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => {
                closeMenu();
                setShowServices(false);
              }}
              className="
                block
                px-s32 py-s8
                body-default
                rounded-r8
                transition
                hover:bg-secondary-dark
                hover:text-accent-main
              "
            >
              {label}
              <span className="caption font-extrabold ml-1">↗</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  </div>
</div>

        </nav>
    );
}
