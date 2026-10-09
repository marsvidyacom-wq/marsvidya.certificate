"use client";

import { ChevronLeft, ChevronRight, GraduationCap, Quote, Star, UserRound } from "lucide-react";
import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/landing";

const AUTO_SLIDE_DELAY = 4000;

function getCircularOffset(index: number, activeIndex: number) {
  let offset = index - activeIndex;
  const midpoint = testimonials.length / 2;

  if (offset > midpoint) offset -= testimonials.length;
  if (offset < -midpoint) offset += testimonials.length;

  return offset;
}

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, AUTO_SLIDE_DELAY);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;

    const distance = pointerStartX.current - event.clientX;
    pointerStartX.current = null;

    if (Math.abs(distance) < 45) return;
    if (distance > 0) showNext();
    else showPrevious();
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="testimonial-section" id="reviews" aria-labelledby="testimonial-title">
      <div className="testimonial-glow" aria-hidden="true" />
      <div className="section-shell testimonial-section-inner">
        <header className="testimonial-heading">
          <span className="testimonial-kicker">
            <GraduationCap aria-hidden="true" size={20} />
            Student &amp; Professional Testimonials
          </span>
          <h2 id="testimonial-title">
            Real People. <em>Real Progress.</em>
          </h2>
          <p>
            Hear from students and working professionals who upgraded their
            skills, got certified and are building better careers.
          </p>
        </header>

        <div className="testimonial-stage">
          <button
            className="testimonial-arrow testimonial-arrow-previous"
            type="button"
            aria-label="Previous testimonial"
            onClick={showPrevious}
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <div
            className="testimonial-deck"
            aria-label="Student testimonial carousel"
            tabIndex={0}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") showPrevious();
              if (event.key === "ArrowRight") showNext();
            }}
            onPointerDown={(event) => {
              pointerStartX.current = event.clientX;
            }}
            onPointerUp={finishSwipe}
            onPointerCancel={() => {
              pointerStartX.current = null;
            }}
          >
            {testimonials.map((testimonial, index) => {
              const offset = getCircularOffset(index, activeIndex);
              const distance = Math.abs(offset);
              const style = {
                "--testimonial-x": `${offset * 210}px`,
                "--testimonial-tablet-x": `${offset * 145}px`,
                "--testimonial-mobile-x": `${offset * 28}px`,
                "--testimonial-y": `${distance * 18}px`,
                "--testimonial-rotation": `${offset * 4.5}deg`,
                "--testimonial-scale": `${1 - distance * 0.075}`,
                "--testimonial-hue": `${214 + index * 13}`,
                zIndex: testimonials.length - distance,
              } as CSSProperties;

              return (
                <article
                  className="testimonial-deck-card"
                  data-active={index === activeIndex ? "true" : "false"}
                  aria-hidden={distance > 2 ? "true" : undefined}
                  key={testimonial.name}
                  style={style}
                >
                  <div className="testimonial-person">
                    <span className="testimonial-profile-icon" aria-hidden="true">
                      <UserRound />
                    </span>
                    <div>
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.role}</p>
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                  <div className="testimonial-stars" aria-label="Five out of five stars">
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star key={star} size={17} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote>
                    <Quote aria-hidden="true" size={28} />
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                </article>
              );
            })}
          </div>

          <button
            className="testimonial-arrow testimonial-arrow-next"
            type="button"
            aria-label="Next testimonial"
            onClick={showNext}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="testimonial-meta">
          <p className="testimonial-status" role="status" aria-live="polite">
            <strong>{activeIndex + 1} of {testimonials.length}</strong>
            <span>{activeTestimonial.name}</span>
          </p>
          <div className="testimonial-dots" aria-label="Choose a testimonial">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
