import { ArrowRight, Award, BookOpenCheck, BriefcaseBusiness, CalendarDays, CircleCheckBig, GraduationCap, Infinity } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
        <span className="hero-grid-lines" />
        <span className="hero-streak hero-streak-one" />
        <span className="hero-streak hero-streak-two" />
      </div>

      <div className="section-shell hero-layout">
        <div className="hero-copy">
          <div className="partner-logo-panel">
            <Image
              src="/images/Transparent Startup Logo Grid.png"
              alt="MarsVidya, Vaiket and startup ecosystem partners"
              width={1760}
              height={880}
              sizes="(max-width: 620px) calc(100vw - 2.5rem), (max-width: 900px) 78vw, 550px"
              loading="eager"
            />
          </div>

          <span className="hero-badge">
            <GraduationCap aria-hidden="true" size={18} /> Student special opportunity
          </span>
          <h1 id="hero-title">Learn In-Demand Skills</h1>
          <p className="hero-certification">Get <strong>5</strong> Certifications</p>
          <p className="hero-price"><span>Just</span> ₹199</p>
          <p className="hero-description">
            Build practical, career-ready skills through a focused live program made for
            ambitious students.
          </p>

          <div className="hero-actions">
            <a className="primary-cta hero-primary" href="#register">
              Join the program <ArrowRight aria-hidden="true" size={20} />
            </a>
            <a className="secondary-cta" href="#program">
              Explore the curriculum
            </a>
          </div>

          <div className="hero-trust" aria-label="Offer highlights">
            <span><Award aria-hidden="true" /><strong>5 Certifications</strong></span>
            <span><CalendarDays aria-hidden="true" /><strong>7 Days Live Program</strong></span>
            <span><BriefcaseBusiness aria-hidden="true" /><strong>Placement Support</strong></span>
            <span><Infinity aria-hidden="true" /><strong>Lifetime Access</strong></span>
          </div>

          <a className="hero-inline-cta" href="#register">
            Register now for ₹199 <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>

        <div className="hero-visual">
          <span className="visual-label visual-label-top" aria-hidden="true">
            <BookOpenCheck size={17} /> Learn. Build. Grow.
          </span>
          <span className="visual-label visual-label-bottom" aria-hidden="true">
            <CircleCheckBig size={17} /> Five focused outcomes
          </span>
          <div className="student-halo" aria-hidden="true" />
          <Image
            className="student-image"
            src="/images/mars-vidya-students.png"
            alt="Four Indian students ready to learn together"
            width={1536}
            height={1024}
            sizes="(max-width: 620px) 126vw, (max-width: 900px) 108vw, 55vw"
            preload
          />
        </div>
      </div>

      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  );
}
