import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { certificateTopics } from "@/content/landing";

export function ProgramSection() {
  return (
    <section className="program-section section-spacing" id="program" aria-labelledby="program-title">
      <div className="section-shell program-layout">
        <div className="program-intro">
          <span className="eyebrow">Five focused outcomes</span>
          <h2 id="program-title">Skills built for the real world</h2>
          <p>
            Move from learning to doing with five connected tracks designed for modern work.
          </p>
          <ul className="program-points" aria-label="Program highlights">
            <li><CheckCircle2 aria-hidden="true" size={19} /> Live expert-led learning</li>
            <li><CheckCircle2 aria-hidden="true" size={19} /> Guided practical assignments</li>
            <li><CheckCircle2 aria-hidden="true" size={19} /> Portfolio-ready outcomes</li>
          </ul>
          <a className="text-cta" href="#register">
            Reserve your seat for ₹199 <ArrowUpRight aria-hidden="true" size={19} />
          </a>
        </div>

        <div className="topic-list">
          {certificateTopics.map((topic) => (
            <article className="topic-card" key={topic.number}>
              <span>{topic.number}</span>
              <div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
