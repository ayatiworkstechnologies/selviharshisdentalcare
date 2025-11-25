"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function HeroWelcome() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // animate only once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className=" py-10">
      {/* Top floating pill ------------------------------------------ */}
      <div className="page-container">
        <div className="flex justify-center mb-8">
          <div className="pill-floating inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-full bg-white px-5 sm:px-6 py-3 shadow-soft max-w-full">
            <p className="text-xs sm:text-sm text-muted text-center px-2">
              Quick and easy online appointment scheduling
            </p>
            <Link
              href="/contact"
              className="btn btn-sm sm:btn-md btn-primary btn-fill"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main hero band --------------------------------------------- */}
      <div className="bg-third">
        <div className="page-container flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 py-10 lg:py-14">
          {/* Left: Doctor image */}
          <div
            className={`w-full lg:w-1/2 flex justify-center lg:justify-start transition-all duration-700
            ${
              isVisible
                ? "opacity-100 translate-y-0 hero-image-float"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="relative aspect-4/5 max-w-[300px] sm:max-w-[360px] lg:max-w-[450px] w-full">
              <Image
                src="/assets/about-img.png"
                alt="Friendly dentist giving thumbs up"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`w-full lg:w-1/2 text-center lg:text-left transition-all duration-700 delay-150
            ${
              isVisible
                ? "opacity-100 translate-y-0 hero-content-fade"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* uses .tag from your utilities */}
            <p className="tag mb-2">Welcome to</p>

            {/* uses .title from your utilities */}
            <h1 className="title mb-4">
              Selviharshi's Dental Care
            </h1>

            {/* uses .para from your utilities */}
            <p className="para mb-4 max-w-2xl mx-auto lg:mx-0">
              Selviharshi's Dental Care – We are one of the best
              multispeciality dental clinics offering top dental solutions for
              all oral issues. Our experienced dentists are well-versed in
              modern dentistry and have earned the trust of thousands of happy
              patients in and around Coimbatore.
            </p>

            <p className="para mb-6 max-w-2xl mx-auto lg:mx-0">
              With advanced equipment, our expert doctors provide specialized
              treatments such as dental fillings, root canal treatment,
              pediatric dental care, full mouth rehabilitation with implants,
              cosmetic procedures, orthodontics, and many more services at
              affordable prices in Coimbatore.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link href="/about" className="btn btn-md btn-secondary btn-fill">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
