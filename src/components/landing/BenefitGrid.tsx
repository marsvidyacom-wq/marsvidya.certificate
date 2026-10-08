import { Award, BriefcaseBusiness, CalendarDays, Infinity } from "lucide-react";
import type { ComponentType } from "react";
import { benefits, type BenefitIcon } from "@/content/landing";

const iconMap: Record<BenefitIcon, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  award: Award,
  calendar: CalendarDays,
  briefcase: BriefcaseBusiness,
  infinity: Infinity,
};

export function BenefitGrid() {
  return (
    <section className="section-shell section-spacing" id="benefits" aria-labelledby="benefits-title">
      <div className="section-heading">
        <span className="eyebrow">More value. Less friction.</span>
        <h2 id="benefits-title">Everything you need to move forward</h2>
        <p>One focused program built around practical output—not endless theory.</p>
      </div>

      <div className="benefit-grid">
        {benefits.map((benefit) => {
          const Icon = iconMap[benefit.icon];
          return (
            <article className="benefit-card glass-card" key={benefit.title}>
              <span className="icon-orbit" aria-hidden="true">
                <Icon size={25} strokeWidth={2.1} />
              </span>
              <span className="card-eyebrow">{benefit.eyebrow}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
