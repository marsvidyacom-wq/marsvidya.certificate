import { Quote, Sparkles, Star } from "lucide-react";
import { testimonials } from "@/content/landing";

export function SocialProof() {
  return (
    <section className="section-shell section-spacing" id="reviews" aria-labelledby="reviews-title">
      <div className="proof-header">
        <div>
          <span className="eyebrow">Built around learner outcomes</span>
          <h2 id="reviews-title">A learning experience worth talking about</h2>
        </div>
        <span className="demo-badge"><Sparkles aria-hidden="true" size={14} /> Demo content</span>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <article className="testimonial-card glass-card" key={`${testimonial.name}-${index}`}>
            <Quote className="quote-icon" aria-hidden="true" size={28} />
            <div className="stars" aria-label="Sample five star rating">
              {Array.from({ length: 5 }, (_, star) => (
                <Star key={star} size={15} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <blockquote>“{testimonial.quote}”</blockquote>
            <footer>
              <span className="avatar-dot" aria-hidden="true">{index + 1}</span>
              <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
