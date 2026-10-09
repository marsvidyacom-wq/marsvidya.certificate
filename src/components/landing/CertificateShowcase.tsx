"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import {
  type CSSProperties,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const certificates = [
  {
    title: "Cybersecurity",
    src: "/images/cerificate/Cybersecurity Certificate of Completion.png",
  },
  {
    title: "Generative Commerce",
    src: "/images/cerificate/Generative Commerce Certification Certificate.png",
  },
  {
    title: "MarsVidya Web Development",
    src: "/images/cerificate/MarsVidya Web Development Certificate.png",
  },
  {
    title: "Social Media Marketing",
    src: "/images/cerificate/Premium Social Media Marketing Certificate.png",
  },
  {
    title: "Web Development",
    src: "/images/cerificate/Web Development Certificate of Completion.png",
  },
] as const;

function getCircularOffset(index: number, activeIndex: number) {
  let offset = index - activeIndex;
  const midpoint = certificates.length / 2;

  if (offset > midpoint) offset -= certificates.length;
  if (offset < -midpoint) offset += certificates.length;

  return offset;
}

export function CertificateShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const suppressSwipeClick = useRef(false);
  const swipeResetTimer = useRef<number | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + certificates.length) % certificates.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % certificates.length);
  };

  const closePreview = useCallback(() => {
    setPreviewIndex(null);
    cardRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  useEffect(() => {
    if (previewIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const keepFocusInPreview = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (
        focusableElements.length === 1 ||
        (event.shiftKey && document.activeElement === firstElement) ||
        (!event.shiftKey && document.activeElement === lastElement) ||
        !modalRef.current?.contains(document.activeElement)
      ) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
      }
    };

    document.addEventListener("keydown", keepFocusInPreview);
    return () => {
      document.removeEventListener("keydown", keepFocusInPreview);
      document.body.style.overflow = previousOverflow;
    };
  }, [closePreview, previewIndex]);

  useEffect(() => {
    return () => {
      if (swipeResetTimer.current !== null) window.clearTimeout(swipeResetTimer.current);
    };
  }, []);

  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const distance = dragStartX.current - event.clientX;
    dragStartX.current = null;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(distance) < 40) return;
    suppressSwipeClick.current = true;
    swipeResetTimer.current = window.setTimeout(() => {
      suppressSwipeClick.current = false;
      swipeResetTimer.current = null;
    }, 0);
    if (distance > 0) showNext();
    else showPrevious();
  };

  const activeCertificate = certificates[activeIndex];
  const previewCertificate = previewIndex === null ? null : certificates[previewIndex];

  return (
    <section className="certificate-showcase" aria-labelledby="certificate-showcase-title">
      <div className="certificate-glow" aria-hidden="true" />
      <div className="section-shell certificate-showcase-inner">
        <header className="certificate-heading">
          <span className="eyebrow">Proof that moves with you</span>
          <h2 id="certificate-showcase-title">
            Add <em>5 Certificates</em> to Your Portfolio in Just 7 Days
          </h2>
          <p>Swipe the deck, choose any certificate, and open it for a complete view.</p>
        </header>

        <div className="certificate-stage">
          <button
            className="certificate-arrow certificate-arrow-previous"
            type="button"
            aria-label="Previous certificate"
            onClick={showPrevious}
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <div
            className="certificate-deck"
            aria-label="Certificate carousel"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") showPrevious();
              if (event.key === "ArrowRight") showNext();
            }}
            onPointerDown={(event) => {
              if (swipeResetTimer.current !== null) {
                window.clearTimeout(swipeResetTimer.current);
                swipeResetTimer.current = null;
              }
              suppressSwipeClick.current = false;
              dragStartX.current = event.clientX;
            }}
            onPointerMove={(event) => {
              if (
                dragStartX.current !== null &&
                Math.abs(dragStartX.current - event.clientX) >= 8 &&
                !event.currentTarget.hasPointerCapture?.(event.pointerId)
              ) {
                event.currentTarget.setPointerCapture?.(event.pointerId);
              }
            }}
            onPointerUp={finishSwipe}
            onPointerCancel={(event) => {
              dragStartX.current = null;
              if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
            }}
            onClickCapture={(event) => {
              if (!suppressSwipeClick.current) return;
              event.preventDefault();
              event.stopPropagation();
              suppressSwipeClick.current = false;
            }}
          >
            {certificates.map((certificate, index) => {
              const offset = getCircularOffset(index, activeIndex);
              const distance = Math.abs(offset);
              const style = {
                "--card-x": `${offset * 92}px`,
                "--card-y": `${distance * 18}px`,
                "--card-rotation": `${offset * -5}deg`,
                "--card-scale": `${1 - distance * 0.075}`,
                zIndex: certificates.length - distance,
                opacity: 1 - distance * 0.2,
              } as CSSProperties;

              return (
                <button
                  key={certificate.src}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className="certificate-card"
                  data-active={index === activeIndex ? "true" : "false"}
                  type="button"
                  aria-label={
                    index === activeIndex
                      ? `View full-size ${certificate.title} certificate`
                      : `Select ${certificate.title} certificate`
                  }
                  aria-pressed={index === activeIndex}
                  style={style}
                  onClick={() => {
                    if (index === activeIndex) setPreviewIndex(index);
                    else setActiveIndex(index);
                  }}
                >
                  <Image
                    src={certificate.src}
                    alt={`${certificate.title} certificate`}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 620px) 92vw, (max-width: 900px) 78vw, 760px"
                  />
                  {index === activeIndex ? (
                    <span className="certificate-open-cue">
                      <Expand aria-hidden="true" size={16} /> Open full view
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <button
            className="certificate-arrow certificate-arrow-next"
            type="button"
            aria-label="Next certificate"
            onClick={showNext}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="certificate-meta">
          <p className="certificate-status" role="status" aria-live="polite">
            <strong>Certificate {activeIndex + 1} of {certificates.length}</strong>
            <span>{activeCertificate.title}</span>
          </p>
          <div className="certificate-dots" aria-label="Choose a certificate">
            {certificates.map((certificate, index) => (
              <button
                key={certificate.src}
                type="button"
                aria-label={`Show ${certificate.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="certificate-seat-cta">
          <div className="certificate-seat-content">
            <div className="certificate-seat-message">
              <span className="certificate-seat-pulse" aria-hidden="true" />
              <div>
                <span>Enrollment update</span>
                <p>Only 8 Seats Left <small>out of 200</small></p>
              </div>
            </div>
            <div className="certificate-seat-meter-wrap">
              <div
                className="certificate-seat-meter"
                role="progressbar"
                aria-label="192 of 200 seats booked"
                aria-valuemin={0}
                aria-valuemax={200}
                aria-valuenow={192}
              >
                <span />
              </div>
              <div className="certificate-seat-numbers" aria-hidden="true">
                <span>192 seats booked</span>
                <span>200 total</span>
              </div>
            </div>
          </div>
          <a className="certificate-seat-button" href="#register">
            Reserve Your Seat
            <span>₹199</span>
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>

      </div>

      {previewCertificate ? (
        <div
          ref={modalRef}
          className="certificate-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-preview-title"
          onClick={closePreview}
        >
          <div className="certificate-modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="certificate-modal-header">
              <div>
                <span>Full certificate view</span>
                <h3 id="certificate-preview-title">{previewCertificate.title} Certificate Preview</h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close certificate preview"
                onClick={closePreview}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="certificate-modal-image">
              <Image
                src={previewCertificate.src}
                alt={`Full-size ${previewCertificate.title} certificate`}
                width={1536}
                height={1024}
                sizes="(max-width: 900px) 96vw, 1200px"
                loading="eager"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
