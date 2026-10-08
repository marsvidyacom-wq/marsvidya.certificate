import { faqs } from "@/content/landing";

export function FaqSection() {
  return (
    <section className="section-shell section-spacing faq-layout" aria-labelledby="faq-title">
      <div className="faq-intro">
        <span className="eyebrow">Clear answers</span>
        <h2 id="faq-title">Questions before you join?</h2>
        <p>Everything you need to make a confident decision, with no hidden surprises.</p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0}>
            <summary>{faq.question}<span aria-hidden="true">+</span></summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
