import { ArrowRight } from "lucide-react";

export function StickyMobileCta() {
  return (
    <div className="sticky-mobile-cta">
      <span><small>Student offer</small><strong>₹199</strong></span>
      <a href="#register">Join for ₹199 <ArrowRight aria-hidden="true" size={18} /></a>
    </div>
  );
}
