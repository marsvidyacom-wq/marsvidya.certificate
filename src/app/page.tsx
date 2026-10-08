import { BenefitGrid } from "@/components/landing/BenefitGrid";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { ProgramSection } from "@/components/landing/ProgramSection";
import { RegistrationSection } from "@/components/landing/RegistrationSection";
import { SocialProof } from "@/components/landing/SocialProof";
import { StickyMobileCta } from "@/components/landing/StickyMobileCta";
import { Navbar } from "@/components/navigation/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <BenefitGrid />
        <ProgramSection />
        <SocialProof />
        <RegistrationSection />
        <FaqSection />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
