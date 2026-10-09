import type { Metadata } from "next";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | MarsVidya",
  description: "Terms governing access to and use of MarsVidya programs and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      description="These terms explain the rules that apply when you visit MarsVidya, register for a program, or use our learning services."
    >
      <section>
        <h2>1. Acceptance of these terms</h2>
        <p>
          By using this website or enrolling in a MarsVidya program, you agree to these
          Terms &amp; Conditions. MarsVidya programs may be offered in association with
          Vaiket. If you do not agree, please do not register or use the services.
        </p>
      </section>

      <section>
        <h2>2. Eligibility and registration</h2>
        <p>
          You must provide accurate and current information while registering. You must
          also be legally able to enter into this agreement. If you are under the age of
          legal majority, a parent or legal guardian must approve your enrollment.
        </p>
      </section>

      <section>
        <h2>3. Fees and payments</h2>
        <p>
          The enrollment fee shown for the current program is ₹199. Payments are processed
          through Razorpay or another disclosed payment provider. Prices, offers, and taxes
          may change, but the total applicable amount will be shown before you complete a
          payment.
        </p>
      </section>

      <section>
        <h2>4. Program delivery</h2>
        <p>
          Program dates, modules, instructors, and session timings may be adjusted when
          reasonably necessary. If a material change occurs, we will try to provide a
          suitable replacement, rescheduled session, or another reasonable solution. You
          are responsible for having a compatible device and reliable internet access.
        </p>
      </section>

      <section>
        <h2>5. Certificates and outcomes</h2>
        <p>
          Certificates may require attendance, task completion, assessments, or other
          published criteria. Enrollment or certification does not guarantee employment,
          placement, promotion, income, funding, or any particular career result.
        </p>
      </section>

      <section>
        <h2>6. Acceptable use and intellectual property</h2>
        <p>
          Learning materials are provided for your personal, non-transferable use. You may
          not copy, resell, publicly distribute, record, or share access to program content
          unless we give written permission. You must not misuse the website, disrupt a
          session, impersonate another person, or attempt unauthorized access.
        </p>
      </section>

      <section>
        <h2>7. Third-party services</h2>
        <p>
          Some features rely on third parties such as payment, communication, or video
          platforms. Their own terms and privacy practices may also apply when you use those
          services.
        </p>
      </section>

      <section>
        <h2>8. Disclaimers and liability</h2>
        <p>
          We work to keep program information accurate and services available, but cannot
          promise uninterrupted or error-free access. To the extent permitted by law,
          MarsVidya is not responsible for indirect, incidental, or consequential loss.
          Nothing in these terms excludes rights or remedies that cannot legally be excluded.
        </p>
      </section>

      <section>
        <h2>9. Suspension or termination</h2>
        <p>
          Access may be suspended or ended for fraud, payment reversal, abusive conduct,
          unauthorized sharing, or a serious breach of these terms. Where appropriate, we
          will provide notice and a reasonable opportunity to address the issue.
        </p>
      </section>

      <section>
        <h2>10. Changes and contact</h2>
        <p>
          We may update these terms to reflect changes in our programs, operations, or legal
          obligations. The effective date above will show the latest revision. For questions,
          contact MarsVidya through the official support channel shown on our website.
        </p>
      </section>
    </PolicyPage>
  );
}
