"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

const whatsappMessage =
  "Hi, I’m interested in the 7-Day Certification Program covering 5 skill segments. Could you please help me with the details and enrollment process?";

const whatsappUrl = `https://wa.me/916388381855?text=${encodeURIComponent(whatsappMessage)}`;

export function WhatsAppSupport() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

    function handleScroll() {
      setIsScrolling(true);
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => setIsScrolling(false), 500);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollEndTimer);
    };
  }, []);

  return (
    <a
      aria-label="Chat with MarsVidya on WhatsApp"
      className="whatsapp-support"
      data-scrolling={isScrolling}
      href={whatsappUrl}
      rel="noreferrer"
      target="_blank"
    >
      <DotLottieReact
        aria-hidden="true"
        autoplay
        className="whatsapp-support-animation"
        loop
        src="/Whatsapp%20icon%20animation.lottie"
      />
    </a>
  );
}
