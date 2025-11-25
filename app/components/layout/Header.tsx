"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const services = [
  "Orthodontic Treatment",
  "Pediatric Dental Treatment",
  "Dental Implant",
  "Root Canal Treatment",
  "Complete Denture",
  "Dental Crown And Bridges",
  "Wisdom Teeth Removal",
  "Dental Fillings",
];

export function Header() {
  const pathname = usePathname();

  // dropdown
  const [open, setOpen] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // transparent on scroll
  const [scrolled, setScrolled] = useState(false);

  const isServicesActive = pathname.startsWith("/services");

  const pillActive =
    "inline-flex items-center px-4 py-1.5 rounded-full bg-[#111111] text-white shadow-md";
  const pillIdle =
    "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-[#111111] hover:text-white";

  const handleMouseDown = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => setOpen(true), 800);
  };

  const handleMouseUp = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  const handleAreaEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleAreaLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  // click outside close
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  // SCROLL HANDLER — transparent header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        w-full pt-4 sticky top-0 z-40
        transition-all duration-300
        ${scrolled ? "bg-transparent" : ""}
      `}
    >
      <div className="page-container">
        <nav
          className="
            relative flex items-center justify-between
            rounded-full bg-white shadow-soft
            px-4 sm:px-6 lg:px-8 py-3
            max-w-[500px] mx-auto w-full
          "
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Selviharshi's Dental Care"
              width={40}
              height={40}
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4 text-black">
            <Link
              href="/"
              className={`${pathname === "/" ? pillActive : pillIdle} ${
                pathname === "/" ? "header-text-active" : "header-text"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`${pathname === "/about" ? pillActive : pillIdle} ${
                pathname === "/about" ? "header-text-active" : "header-text"
              }`}
            >
              About
            </Link>

            {/* SERVICES */}
            <div
              className="relative"
              onMouseEnter={handleAreaEnter}
              onMouseLeave={handleAreaLeave}
            >
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className={`${open || isServicesActive ? pillActive : pillIdle} ${
                  open || isServicesActive ? "header-text-active" : "header-text"
                }`}
              >
                Services
              </button>

              <div
                className={`absolute left-1/2 top-full mt-6 w-64 -translate-x-1/2 transition-all duration-300 z-30
                  ${
                    open
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
                onMouseEnter={handleAreaEnter}
                onMouseLeave={handleAreaLeave}
              >
                <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
                  <ul className="max-h-80 overflow-y-auto text-sm font-primary text-black">
                    {services.map((service) => {
                      const slug = service.toLowerCase().replace(/ /g, "-");
                      return (
                        <Link key={slug} href={`/services/${slug}`}>
                          <li className="px-4 py-2.5 hover:bg-[#AFC8C8] hover:text-white transition cursor-pointer">
                            {service}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className={`${pathname === "/contact" ? pillActive : pillIdle} ${
                pathname === "/contact" ? "header-text-active" : "header-text"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden h-9 w-9 rounded-full bg-[#111111] text-white flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-3xl bg-white shadow-soft px-4 py-4 text-black max-w-[500px] mx-auto">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className={`px-3 py-2 rounded-full ${
                  pathname === "/" ? "bg-[#111111] text-white" : "hover:bg-[#111111] hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-full ${
                  pathname === "/about" ? "bg-[#111111] text-white" : "hover:bg-[#111111] hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <button
                className={`flex items-center justify-between px-3 py-2 rounded-full ${
                  mobileServicesOpen ? "bg-[#111111] text-white" : "hover:bg-[#111111] hover:text-white"
                }`}
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services
                <span className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}>▾</span>
              </button>

              {mobileServicesOpen && (
                <div className="mt-2 ml-3 flex flex-col gap-1">
                  {services.map((service) => {
                    const slug = service.toLowerCase().replace(/ /g, "-");
                    return (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        className="px-3 py-2 rounded-xl text-xs bg-slate-50 hover:bg-[#AFC8C8] hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {service}
                      </Link>
                    );
                  })}
                </div>
              )}

              <Link
                href="/contact"
                className={`px-3 py-2 rounded-full ${
                  pathname === "/contact" ? "bg-[#111111] text-white" : "hover:bg-[#111111] hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
