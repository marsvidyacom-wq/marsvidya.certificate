import Image from "next/image";
import { TestimonialCarousel } from "./TestimonialCarousel";

const featureImage = "/testomonial/7-दिवसीय स्किल प्रोग्राम अवसर.png";

export function SocialProof() {
  return (
    <>
      <section className="section-shell section-spacing" aria-label="Press feature">
        <Image
          className="news-feature-image"
          src={featureImage}
          alt="Hindi newspaper feature about Vaiket and MarsVidya"
          width={1374}
          height={1145}
          sizes="(max-width: 720px) 94vw, (max-width: 1200px) 90vw, 1180px"
        />
      </section>
      <TestimonialCarousel />
    </>
  );
}
