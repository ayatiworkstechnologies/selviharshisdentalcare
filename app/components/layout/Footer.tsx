// components/layout/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full">
      {/* Top Navigation Strip */}
      <div className="bg-[#9fb8b5]">
        <div
          className="
            page-container
            flex flex-wrap items-center justify-center
            gap-6 sm:gap-10
            py-3
            text-xs sm:text-sm md:text-base
            font-primary text-white
          "
        >
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-white">
        <div className="page-container py-4 text-center font-primary">
          <p
            className="
              flex flex-wrap items-center justify-center
              gap-1 sm:gap-2
              text-[11px] sm:text-xs md:text-sm
              text-slate-800
            "
          >
            <span>
              Copyright ©2025 selviharshisdentalcare · All rights reserved |
              Designed &amp; Developed by
            </span>

            {/* IN-LINE AYATIWORKS LOGO */}
            <Link href="https://ayatiworks.com" target="_blank">
              <Image
                src="/web_logo.png"
                alt="Ayatiworks Logo"
                width={50}
                height={80}
                className="inline-block ml-1 object-contain"
                style={{ filter: "invert(1)" }}
              />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
