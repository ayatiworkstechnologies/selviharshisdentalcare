"use client";

import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";

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
    experience: "Over 10+ years of clinical experience in advanced dentistry and dental implants.",
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
    <section className="page-section">
      {/* Heading */}
      <div className="page-container text-center mb-10">
        <p className="tag-text">DOCTORS</p>
        <h2 className="title-xl mt-1">Expert Dental Care You Can Trust</h2>
      </div>

      <div className="relative page-container">
        {/* LEFT desktop arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 hidden md:flex items-center justify-center
          bg-white rounded-full shadow-soft hover:bg-primary hover:text-white transition"
        >
          <FaArrowLeft />
        </button>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth gap-8 px-4 md:px-0 pb-6 snap-x scrollbar-none 
          justify-center md:justify-start"
        >
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="snap-center bg-white shadow-soft rounded-2xl overflow-hidden 
              min-w-[90%] sm:min-w-[80%] md:min-w-[900px] flex flex-col md:flex-row"
            >
              {/* LEFT — IMAGE BLOCK (Single solid block like reference) */}
              <div className=" flex flex-col">
                <div className="relative h-64 md:h-full w-full">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-contain "
                  />
                </div>

                {/* Name + Role inside white bottom block */}
                <div className="bg-white p-4  text-left">
                  <h3 className="text-lg font-semibold">{doc.name}</h3>
                  <p className="text-sm text-muted">{doc.role}</p>
                </div>
              </div>

              {/* RIGHT — TEXT BLOCK */}
              <div className="md:w-2/3 p-6 md:p-8 text-left">
                {doc.bio.map((para, idx) => (
                  <p key={idx} className="body-md leading-relaxed mb-4">
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

                <p className="body-md leading-relaxed mt-4">
                  <strong>Experience:</strong>
                  <br />
                  {doc.experience}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT desktop arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 hidden md:flex items-center justify-center
          bg-white rounded-full shadow-soft hover:bg-primary hover:text-white transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
