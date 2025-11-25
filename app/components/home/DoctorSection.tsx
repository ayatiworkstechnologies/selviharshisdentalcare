"use client";

import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { motion } from "framer-motion";

type Doctor = {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  bio: string[];
};

const doctors: Doctor[] = [
  {
    id: "dr-sai",
    name: "Dr. Sai",
    role: "Senior Dentist & Implant Specialist",
    image: "/assets/Profile.jpg",
    experience:
      "Over 10+ years of clinical experience in advanced dentistry and dental implants.",
    bio: [
      "Dr. Sai is an experienced dental professional known for delivering precise, patient-focused care. With expertise in implants, cosmetic dentistry, and full-mouth rehabilitation, he ensures every patient receives the right solution.",
      "His approach combines advanced technology with gentle treatment methods for comfortable, predictable results. Dedicated to excellence, he believes in creating healthy, confident smiles that last a lifetime.",
    ],
  },
];

export default function DoctorSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Heading */}
      <div className="page-container text-center mb-10">
        <p className="tag">DOCTORS</p>
        <h2 className="title mt-1">Expert Dental Care You Can Trust</h2>
      </div>

      <div className="relative page-container">
        {/* LEFT desktop arrow */}
        <button
          onClick={() => scroll("left")}
          aria-label="Previous doctor"
          className="
            hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20
            h-12 w-12 rounded-full
            bg-white text-primary 
            shadow-xl
            items-center justify-center
            transition-all duration-300
            hover:bg-primary hover:text-white
          "
        >
          <FaAngleLeft className="h-7 w-7" />
        </button>

        {/* Slider */}
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="flex overflow-x-auto scroll-smooth gap-8 px-2 pb-6 snap-x scrollbar-none 
                     justify-center md:justify-start"
        >
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="snap-center bg-white shadow-soft rounded-2xl overflow-hidden 
                         min-w-[95%] sm:min-w-[85%] md:min-w-[950px] flex flex-col md:flex-row"
            >
              {/* LEFT — IMAGE FULL COVER + BOTTOM NAME */}
              <div className="md:w-1/3 flex flex-col">
                <div className="relative w-full h-72 md:h-[320px]">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-white px-6 py-4 border-t border-border-subtle text-left">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-muted">{doc.role}</p>
                </div>
              </div>

              {/* RIGHT — TEXT BLOCK */}
              <div className="md:w-2/3 p-6 md:p-8 text-left">
                {doc.bio.map((para, idx) => (
                  <p key={idx} className="para mb-4">
                    {idx === 0 ? (
                      <>
                        <strong>{doc.name}</strong>{" "}
                        {para.replace(doc.name, "").trimStart()}
                      </>
                    ) : (
                      para
                    )}
                  </p>
                ))}

                <p className="para mt-4">
                  <strong>Experience:</strong>
                  <br />
                  {doc.experience}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* RIGHT desktop arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Next doctor"
          className="
            hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20
            h-12 w-12 rounded-full
            bg-white text-primary 
            shadow-xl
            items-center justify-center
            transition-all duration-300
            hover:bg-primary hover:text-white
          "
        >
          <FaAngleRight className="h-7 w-7" />
        </button>
      </div>
    </motion.section>
  );
}
