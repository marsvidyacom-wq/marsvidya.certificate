import { BenefitGrid } from "@/components/landing/BenefitGrid";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
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
        <section className="placeholder-hero section-shell">
          <span className="eyebrow">Student special opportunity</span>
          <h1>Learn In-Demand Skills</h1>
          <p>Build practical career confidence with one focused live program.</p>
        </section>
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
