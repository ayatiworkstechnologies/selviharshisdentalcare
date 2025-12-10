"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BookingModal } from "./BookingModal";

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
  const pathname = usePathname() || "/";

  // dropdown
  const [open, setOpen] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // transparent / solid on scroll
  const [scrolled, setScrolled] = useState(false);

  // book now modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const isServicesActive = pathname.startsWith("/services");

  const pillActive =
    "inline-flex items-center px-4 py-1.5 rounded-full bg-[#111111] text-white shadow-md text-sm font-medium";
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

  // click outside close for services dropdown
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  // SCROLL HANDLER — transparent header at top, solid on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  // 👉 If you want modal to open on refresh, keep this:
  // useEffect(() => {
  //   setIsBookingOpen(true);
  // }, []);
  //
  // If you *don’t* want auto-open, leave it commented.

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-300
          ${scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-transparent"}
        `}
      >
        <div className="page-container">
          <nav className="flex h-16 items-center justify-between gap-6">
            {/* LOGO LEFT */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Selviharshi's Dental Care"
                width={40}
                height={40}
              />
            </Link>

            {/* RIGHT SIDE: NAV + BOOK BUTTON */}
            <div className="flex items-center gap-4">
              {/* DESKTOP MENU */}
              <div className="hidden md:flex items-center gap-3 text-black">
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
                    pathname === "/about"
                      ? "header-text-active"
                      : "header-text"
                  }`}
                >
                  About
                </Link>

                {/* SERVICES DROPDOWN */}
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
                    className={`${
                      open || isServicesActive ? pillActive : pillIdle
                    } ${
                      open || isServicesActive
                        ? "header-text-active"
                        : "header-text"
                    }`}
                  >
                    Services
                  </button>

                  <div
                    className={`absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 transition-all duration-300 z-30
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
                          const slug = service
                            .toLowerCase()
                            .replace(/ /g, "-");
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
                  className={`${
                    pathname === "/contact" ? pillActive : pillIdle
                  } ${
                    pathname === "/contact"
                      ? "header-text-active"
                      : "header-text"
                  }`}
                >
                  Contact
                </Link>
              </div>

              {/* BOOK NOW BUTTON (DESKTOP) */}
              <button
                onClick={openBooking}
                className="hidden md:inline-flex items-center btn btn-md text-2xl btn-secondary btn-fill transition-colors"
              >
                Book Now
              </button>

              {/* MOBILE MENU BUTTON */}
              <button
                className="md:hidden h-9 w-9 rounded-full bg-[#111111] text-white flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </nav>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 rounded-3xl bg-white shadow-soft px-4 py-4 text-black">
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-full ${
                    pathname === "/"
                      ? "bg-[#111111] text-white"
                      : "hover:bg-[#111111] hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className={`px-3 py-2 rounded-full ${
                    pathname === "/about"
                      ? "bg-[#111111] text-white"
                      : "hover:bg-[#111111] hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>

                <button
                  className={`flex items-center justify-between px-3 py-2 rounded-full ${
                    mobileServicesOpen
                      ? "bg-[#111111] text-white"
                      : "hover:bg-[#111111] hover:text-white"
                  }`}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <span
                    className={`transition-transform ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
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
                    pathname === "/contact"
                      ? "bg-[#111111] text-white"
                      : "hover:bg-[#111111] hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                {/* BOOK NOW IN MOBILE MENU */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBooking();
                  }}
                  className="mt-2 px-3 py-2 rounded-full bg-[#111111] text-white text-sm font-semibold"
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* BOOK NOW MODAL (SEPARATE COMPONENT) */}
      <BookingModal
        open={isBookingOpen}
        onClose={closeBooking}
        services={services}
      />
    </>
  );
}
