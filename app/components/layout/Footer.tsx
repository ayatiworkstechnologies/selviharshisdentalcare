// components/layout/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full">
      {/* Top Navigation Strip */}
      <div className="bg-secondary">
        <nav
          aria-label="Footer navigation"
          className="
            page-container
            flex flex-wrap items-center justify-center
            gap-6 sm:gap-10
            py-3
            font-primary text-white text-base sm:text-sm md:text-lg
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
        </nav>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-white">
        <div className="page-container py-2 text-center font-primary">
          <p
            className="
              flex flex-wrap items-center justify-center
              gap-1 sm:gap-2
              text-[11px] sm:text-xs md:text-sm
              text-slate-800
            "
          >
            <span>
              © 2025 Selviharshi&apos;s Dental Care · All rights reserved |
              Designed &amp; Developed by
            </span>

            {/* In-line Ayatiworks logo */}
            <Link
              href="https://ayatiwors.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Image
                src="/web_logo.png"
                alt="Ayatiworks Logo"
                width={60}
                height={18}
                className="
      inline-block ml-1 object-contain align-middle
      brightness-0 invert-[0.15]
    "
              />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
