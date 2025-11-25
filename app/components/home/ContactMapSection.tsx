"use client";

import Link from "next/link";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export function ContactMapSection() {
  return (
    <section className="page-section bg-white">
      <div className="page-container">
        <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-16">

          {/* LEFT — CONTACT DETAILS */}
          <div className="w-full md:w-[42%]">
            <h2 className="title mb-6">Let's Connect</h2>

            <ul className="space-y-4">

              {/* ADDRESS */}
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <FiMapPin className="h-4 w-4" />
                </div>

                <Link
                  href="https://maps.app.goo.gl/AjgbWm9trt7HZd6T8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="para leading-relaxed hover:underline"
                >
                  221, Madras Thiruvallur High Rd,
                  <br />
                  Villivakkam, Chennai,
                  <br />
                  Tamil Nadu 600049
                </Link>
              </li>

              {/* EMAIL */}
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <FiMail className="h-4 w-4" />
                </div>

                <Link
                  href="mailto:selviharshisdentalcare@gmail.com"
                  className="para leading-relaxed hover:underline break-all"
                >
                  selviharshisdentalcare@gmail.com
                </Link>
              </li>

              {/* PHONE */}
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <FiPhone className="h-4 w-4" />
                </div>

                <Link
                  href="tel:+917339527771"
                  className="para leading-relaxed hover:underline"
                >
                  73395 27771
                </Link>
              </li>

            </ul>
          </div>

          {/* RIGHT — EMBED MAP */}
          <div className="w-full md:w-[58%]">
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <div className="relative w-full aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.9279823101556!2d80.20423670000001!3d13.1037488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265beee8e1885%3A0x6daa173ea7cc2ddd!2sSelviharshi's%20Dental%20Care!5e0!3m2!1sen!2sin!4v1763988839430!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
