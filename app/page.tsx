import Image from "next/image";
import { HeroBanner } from "./components/HeroSection";
import { HeroWelcome } from "./components/home/HeroWelcome";
import { ServicesSection } from "./components/home/ServicesSection";
import myServices from "./data/services.js";
import DoctorSection from "./components/home/DoctorSection";
import { TestimonialsSection } from "./components/home/TestimonialsSection";
import { ContactMapSection } from "./components/home/ContactMapSection";

export default function HomePage() {
  return (
    <>
      <HeroBanner
        titleWord="AESTHETICS"
        imageSrc="/banner/hero-banner-1.png"
        imageAlt="Smiling dentist with tools"
        bgClassName="bg-[#9fb8b5]"
        centerRange={[3, 6]} // fill E–T–H (indexes 3,4,5)
        sideText={"Transforming\nSmiles with\nPrecision, Care"}
        topRightIconSrc="/logo.svg"
      />
      <HeroWelcome />
       <ServicesSection services={myServices} />
       <DoctorSection />
       <TestimonialsSection />
       <ContactMapSection />
    </>
  );
}
