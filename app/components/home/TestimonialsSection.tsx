"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  message: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Raman",
    role: "Patient",
    avatar: "/assets/avatar.svg",
    message:
      "The treatment was smooth and painless. Dr. Sai explained everything clearly and made me feel completely comfortable. I'm truly happy with my smile now.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Rahul Menon",
    role: "Patient",
    avatar: "/assets/avatar.svg",
    message:
      "Very professional and friendly team. The clinic is clean and the treatment was done with great care. Highly recommended for anyone with dental anxiety.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Anitha S",
    role: "Patient",
    avatar: "/assets/avatar.svg",
    message:
      "From consultation to follow-up, everything was handled so well. I finally feel confident smiling in photos again.",
    rating: 4.5,
  },
  {
    id: "t4",
    name: "Priya Raman",
    role: "Patient",
    avatar: "/assets/avatar.svg",
    message:
      "The treatment was smooth and painless. Dr. Sai explained everything clearly and made me feel completely comfortable. I'm truly happy with my smile now.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Rahul Menon",
    role: "Patient",
    avatar: "/assets/avatar.svg",
    message:
      "Very professional and friendly team. The clinic is clean and the treatment was done with great care. Highly recommended for anyone with dental anxiety.",
    rating: 5,
  },
  {
    id: "t6",
    name: "Anitha S",
    role: "Patient",
    avatar: "/assets/avatar.svg",
    message:
      "From consultation to follow-up, everything was handled so well. I finally feel confident smiling in photos again.",
    rating: 4.5,
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // AUTO-SLIDE FUNCTION
  const startAutoSlide = () => {
    if (!scrollRef.current) return;

    intervalRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const amount = container.clientWidth * 0.6;

      container.scrollBy({ left: amount, behavior: "smooth" });

      // Reset to start when near end
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }, 800);
      }
    }, 3500); // 3.5 sec per slide
  };

  // START AUTO-SLIDE ON MOUNT
  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // STOP AUTO-SLIDE ON USER INTERACTION
  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <section className="page-section bg-white">
      <div className="page-container">
        {/* Heading */}
        <div className="flex flex-col gap-2 mb-8">
          <p className="tag-text">PATIENT TESTIMONIALS</p>
          <h2 className="title-xl max-w-xl">
            Patient Experiences That Inspire Confidence
          </h2>
        </div>

        <div className="relative">
          {/* Slider */}
          <div
            ref={scrollRef}
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
            onTouchStart={stopAutoSlide}
            onTouchEnd={startAutoSlide}
            className="
              flex gap-6 pb-6
              overflow-x-auto scroll-smooth scrollbar-none snap-x touch-pan-x
              justify-start
            "
          >
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="
                  snap-start bg-white card-surface
                  min-w-[280px] sm:min-w-[300px] md:min-w-[340px]
                  rounded-2xl shadow-lg
                  px-6 py-6 flex flex-col justify-between
                "
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: Math.floor(item.rating ?? 5) }).map(
                    (_, idx) => (
                      <FaStar key={idx} className="h-4 w-4 text-[#FDB022]" />
                    )
                  )}

                  {/* Half star */}
                  {item.rating && item.rating % 1 !== 0 && (
                    <FaStar className="h-4 w-4 text-[#FDB022] opacity-50" />
                  )}
                </div>

                {/* Message */}
                <p className="body-md text-slate-700 mb-5">“{item.message}”</p>

                {/* Avatar + name */}
                <div className="mt-auto flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full shadow-lg overflow-hidden">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover "
                    />
                  </div>

                  <div className="text-sm text-left">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    {item.role && (
                      <p className="text-xs text-muted">{item.role}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
