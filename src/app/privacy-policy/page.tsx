import type { Metadata } from "next";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | MarsVidya",
  description: "How MarsVidya collects, uses, shares, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="This policy explains what information we collect, why we use it, and the choices available to you."
    >
      <section>
        <h2>1. Information we collect</h2>
        <p>
          When you register or contact us, we may collect your name, email address, phone
          number, profession or education details, messages, and program preferences. We may
          also receive payment references, transaction status, amount, and timestamps needed
          to confirm enrollment and resolve payment issues.
        </p>
      </section>

      <section>
        <h2>2. Payment information</h2>
        <p>
          Payments are handled by Razorpay or another disclosed payment provider. MarsVidya
          does not receive or store your complete card number, UPI PIN, banking password, or
          one-time password. The payment provider processes those details under its own
          privacy and security terms.
        </p>
      </section>

      <section>
        <h2>3. How we use information</h2>
        <ul>
          <li>To register you, confirm payment, and provide program access.</li>
          <li>To send schedules, reminders, certificates, and service updates.</li>
          <li>To answer questions and provide learner support.</li>
          <li>To secure our website, prevent fraud, and troubleshoot issues.</li>
          <li>To improve programs and meet accounting or legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of information</h2>
        <p>
          We share information only when reasonably needed with service providers that help
          us operate payments, communications, learning sessions, analytics, or hosting; with
          professional advisers; or when required by law. We do not sell your personal
          information.
        </p>
      </section>

      <section>
        <h2>5. Retention</h2>
        <p>
          We retain information only for as long as needed to provide the program, maintain
          records, resolve disputes, prevent abuse, and satisfy legal or tax requirements.
          Retention periods may vary by record type.
        </p>
      </section>

      <section>
        <h2>6. Security</h2>
        <p>
          We use reasonable administrative and technical safeguards designed to protect your
          information. No online system can be guaranteed completely secure, so please avoid
          sending passwords, OTPs, UPI PINs, or complete card details to our support team.
        </p>
      </section>

      <section>
        <h2>7. Your choices and rights</h2>
        <p>
          Depending on applicable law, you may ask to access, correct, update, or delete your
          personal information, or withdraw consent for optional communications. Some records
          may still be kept where required for legal, security, or transaction purposes.
        </p>
      </section>

      <section>
        <h2>8. Children&apos;s privacy</h2>
        <p>
          Our services are not intended for a child to purchase independently. If a minor
          joins a program, registration should be completed with the consent and supervision
          of a parent or legal guardian.
        </p>
      </section>

      <section>
        <h2>9. Updates and contact</h2>
        <p>
          We may revise this policy when our practices or legal obligations change. The
          effective date above identifies the latest version. To make a privacy request,
          contact MarsVidya through the official support channel shown on our website.
        </p>
      </section>
    </PolicyPage>
  );
}
