"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type HeroBannerProps = {
  titleWord?: string;
  imageSrc: string;
  imageAlt: string;
  sideText?: string;
  bgClassName?: string;
  topRightIconSrc?: string;
  topRightIconAlt?: string;

  /** [startIndex, endIndex] letters to FILL */
  centerRange?: [number, number];
};

export function HeroBanner({
  titleWord = "AESTHETICS",
  centerRange = [3, 5],
  sideText = "Transforming\nSmiles with\nPrecision, Care",
  imageSrc,
  imageAlt,
  bgClassName = "bg-secondary",
  topRightIconSrc,
  topRightIconAlt = "icon",
}: HeroBannerProps) {
  const [start, end] = centerRange;

  const splitLetters = titleWord.split("").map((char, idx) => {
    const isFilled = idx >= start && idx <= end;
    return (
      <span
        key={idx}
        className={isFilled ? "hero-word-outline" : "hero-word-filled"}
      >
        {char}
      </span>
    );
  });

  return (
    <section
      className={`relative overflow-hidden ${bgClassName} -mt-20 pt-20 pb-10 md:pt-24 md:pb-16`}
    >
      {/* ========== TOP-LEFT TEXT (DESKTOP) ========== */}
      <div className="absolute left-25 top-10 z-20 hidden md:block max-w-xs">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="whitespace-pre-line text-lg font-medium text-white/90"
        >
          {sideText}
        </motion.p>
      </div>

      {/* ========== TOP-RIGHT ICON (DESKTOP) ========== */}
      {topRightIconSrc && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute right-25 top-10 z-20 hidden md:block"
        >
          <div className="relative h-15 w-15 ">
            <Image
              src={topRightIconSrc}
              alt={topRightIconAlt}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}

      {/* ========== CENTER BLOCK (TEXT + IMAGE) ========== */}
      <div className="page-container relative flex flex-col items-center justify-center text-center">
        {/* CENTER TITLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="
    pointer-events-none
    absolute z-10
    sm:top-1/2 lg:top:90 
    w-full text-center
    text-[12vw]         
    sm:text-[10vw]       
    md:text-[7vw]        
    font-secondary font-extrabold uppercase 
    tracking-[0.18em] leading-none
  "
        >
          {splitLetters}
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-0 w-[90%] sm:w-[75%] md:w-[60%]"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={700}
            height={700}
            className="mx-auto object-contain"
            priority
          />
        </motion.div>

        {/* MOBILE SIDE TEXT UNDER IMAGE */}
        <div className="mt-6 block md:hidden">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="whitespace-pre-line text-base text-white/90 font-medium text-center"
          >
            {sideText}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
