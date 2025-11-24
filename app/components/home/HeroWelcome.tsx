"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroWelcome() {
  return (
    <section className="page-section">
      {/* Top floating pill ------------------------------------------ */}
      <div className="page-container">
        <div className="flex justify-center mb-8">
          <div className="pill-floating inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-full bg-white px-5 sm:px-6 py-3 shadow-soft max-w-full">
            <p className="text-xs sm:text-sm text-muted text-center px-2">
              Quick and easy online appointment scheduling
            </p>
            <Link href="/contact" className="btn btn-sm sm:btn-md btn-primary btn-fill">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main hero band --------------------------------------------- */}
      <div className="bg-[#EEEEEE]">
        <div className="page-container flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 py-10 lg:py-14">
          {/* Left: Doctor image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="hero-image-float relative aspect-[4/5] max-w-[260px] sm:max-w-[320px] lg:max-w-[400px] w-full">
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
          <div className="w-full lg:w-1/2 text-center lg:text-left hero-content-fade">
            <p className="tag-text mb-2">Welcome to</p>

            <h1 className="title-xl mb-4">
              Selviharshi&apos;s Dental Care
            </h1>

            <p className="body-md lg:body-lg mb-4 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Selviharshi&apos;s Dental Care – We are one of the best multispeciality
              dental clinics offering top dental solutions for all oral issues.
              Our experienced dentists are well-versed in modern dentistry and
              have earned the trust of thousands of happy patients in and around
              Coimbatore.
            </p>

            <p className="body-md lg:body-lg mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              With advanced equipment, our expert doctors provide specialized treatments
              such as dental fillings, root canal treatment, pediatric dental care,
              full mouth rehabilitation with implants, cosmetic procedures, orthodontics,
              and many more services at affordable prices in Coimbatore.
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
