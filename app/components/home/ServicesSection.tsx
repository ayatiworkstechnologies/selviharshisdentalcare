"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string; // icon key, e.g. "tooth"
};

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const amount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="page-section">
      <div className="page-container">
        {/* Top heading + arrows */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <p className="tag-text mb-1">Our Services</p>
            <h2 className="title-xl">
              Expert solutions for lasting oral wellness
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary hover:bg-primary hover:text-white shadow-soft transition"
              aria-label="Previous services"
            >
              <FaArrowLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary hover:bg-primary hover:text-white shadow-soft transition"
              aria-label="Next services"
            >
              <FaArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Cards row / carousel */}
        <div className="relative">
          {/* Mobile arrows */}
          <div className="md:hidden flex justify-end gap-3 mb-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-white text-primary hover:bg-primary hover:text-white shadow-soft transition"
              aria-label="Previous services"
            >
              <FaArrowLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-white text-primary hover:bg-primary hover:text-white shadow-soft transition"
              aria-label="Next services"
            >
              <FaArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-2 snap-x"
          >
            {services.map((service) => {
              const href = `/services/${service.id}`;
              const iconSrc = service.icon
                ? `/assets/icons/${service.icon}.svg`
                : null;

              return (
                <article
                  key={service.id}
                  className="group snap-start min-w-[260px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[340px]
                    card-surface overflow-hidden flex flex-col transition-transform duration-300
                    hover:-translate-y-2 hover:shadow-xl bg-surface"
                >
                  {/* Top image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Text + icon (icon sits on top edge of card) */}
                  <div className="relative px-6 pb-6 pt-10 flex flex-col gap-2 text-left">
                    {/* circle icon */}
                    <div className="absolute -top-6 left-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary shadow-soft">
                        {iconSrc ? (
                          <div className="relative h-6 w-6">
                            <Image
                              src={iconSrc}
                              alt={service.title + " icon"}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <span className="text-xl text-primary">🦷</span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="body-md">{service.description}</p>

                    <Link
                      href={href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary group/link"
                    >
                      Know More
                      <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
