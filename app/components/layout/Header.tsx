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

  const [open, setOpen] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <header className="w-full pt-4 bg-[#9fb8b5]">
      <div className="page-container">
        {/* TOP BAR: logo + desktop nav + mobile hamburger */}
        <nav
          className="
            relative flex items-center justify-between
            rounded-full bg-white px-4 sm:px-6 lg:px-8 py-3 shadow-soft
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
          <div className="hidden md:flex items-center gap-4 text-sm font-primary text-black">
            <Link href="/" className={pathname === "/" ? pillActive : pillIdle}>
              Home
            </Link>

            <Link
              href="/about"
              className={pathname === "/about" ? pillActive : pillIdle}
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
                type="button"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className={open || isServicesActive ? pillActive : pillIdle}
              >
                <span>Services</span>
              </button>

              <div
                className={`absolute left-1/2 top-full mt-6 w-64 -translate-x-1/2 transition-all duration-300 z-30 ${
                  open
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
                onMouseEnter={handleAreaEnter}
                onMouseLeave={handleAreaLeave}
              >
                <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
                  <ul className="max-h-[320px] overflow-y-auto text-sm font-primary text-black">
                    {services.map((service) => {
                      const slug = service.toLowerCase().replace(/ /g, "-");
                      return (
                        <Link href={`/services/${slug}`} key={slug}>
                          <li className="px-4 py-2.5 cursor-pointer hover:bg-[#AFC8C8] hover:text-white transition">
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
              className={pathname === "/contact" ? pillActive : pillIdle}
            >
              Contact
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#111111] text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className="text-lg">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </nav>

        {/* MOBILE MENU PANEL */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-3xl bg-white shadow-soft px-4 py-4 text-sm font-primary text-black max-w-[500px] mx-auto">
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
                type="button"
                className={`flex items-center justify-between px-3 py-2 rounded-full ${
                  isServicesActive || mobileServicesOpen
                    ? "bg-[#111111] text-white"
                    : "hover:bg-[#111111] hover:text-white"
                }`}
                onClick={() => setMobileServicesOpen((prev) => !prev)}
              >
                <span>Services</span>
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
                    const href = `/services/${slug}`;
                    const active = pathname === href;
                    return (
                      <Link
                        key={slug}
                        href={href}
                        className={`px-3 py-2 rounded-xl text-xs ${
                          active
                            ? "bg-[#AFC8C8] text-white"
                            : "bg-slate-50 hover:bg-[#AFC8C8] hover:text-white"
                        }`}
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
