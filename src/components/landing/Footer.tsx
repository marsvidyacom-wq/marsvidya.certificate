import { ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div>
          <BrandMark />
          <p>Practical skills for ambitious learners.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#benefits">Benefits</a>
          <a href="#program">Program</a>
          <a href="#reviews">Reviews</a>
          <a href="#top" aria-label="Back to top"><ArrowUp size={17} /></a>
        </nav>
      </div>
    </footer>
  );
}
