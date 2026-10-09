import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <BrandMark />
            <p>Practical skills for ambitious learners.</p>
          </div>
          <nav className="footer-site-links" aria-label="Footer navigation">
            <a href="#benefits">Benefits</a>
            <a href="#program">Program</a>
            <a href="#reviews">Reviews</a>
            <a className="footer-back-to-top" href="#top" aria-label="Back to top">
              <ArrowUp size={17} />
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© 2026 MarsVidya. All rights reserved.</p>
          <nav className="footer-policy-links" aria-label="Legal policies">
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
