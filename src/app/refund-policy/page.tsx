import type { Metadata } from "next";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata: Metadata = {
  title: "Refund Policy | MarsVidya",
  description: "Eligibility, process, and timelines for MarsVidya refund requests.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund Policy"
      description="This policy explains when a program fee may be refunded and how to submit a request."
    >
      <section>
        <h2>1. Refund eligibility</h2>
        <p>A refund may be approved when:</p>
        <ul>
          <li>You were charged more than once for the same enrollment.</li>
          <li>
            Your account was debited but enrollment was not confirmed after payment
            reconciliation.
          </li>
          <li>MarsVidya cancels the program and does not provide a suitable alternative.</li>
          <li>A refund is required under applicable consumer law.</li>
        </ul>
      </section>

      <section>
        <h2>2. Non-refundable situations</h2>
        <p>
          Except where required by law, the enrollment fee is non-refundable after program
          access, a live session, or digital learning material has been provided. A change of
          mind, missed session, scheduling conflict, or a learner&apos;s device or connectivity
          problem does not normally qualify for a refund.
        </p>
      </section>

      <section>
        <h2>3. How to request a refund</h2>
        <p>
          Contact MarsVidya through the official support channel shown on our website. Include
          your registered name and phone number, payment ID, payment date, and the reason for
          your request. Never send an OTP, UPI PIN, banking password, or complete card details.
        </p>
      </section>

      <section>
        <h2>4. Review process</h2>
        <p>
          We generally review a complete request within 5 business days. We may ask for a
          receipt or other information needed to verify the transaction. Approval depends on
          the payment record and the eligibility rules above.
        </p>
      </section>

      <section>
        <h2>5. Refund timeline</h2>
        <p>
          An approved refund is sent to the original payment method, usually within 7–10
          business days after approval. Your bank or payment provider may take additional
          time to display the credit.
        </p>
      </section>

      <section>
        <h2>6. Rescheduled programs and partial delivery</h2>
        <p>
          If a session is rescheduled, we will normally offer the revised session or another
          reasonable learning option. If MarsVidya permanently stops a partly delivered
          program, any remedy will reflect the portion already supplied and applicable law.
        </p>
      </section>

      <section>
        <h2>7. Consumer rights and contact</h2>
        <p>
          This policy does not limit rights that cannot be waived under applicable consumer
          law. If you believe a payment issue remains unresolved, contact us through the
          official MarsVidya support channel before initiating a payment dispute so we can
          investigate promptly.
        </p>
      </section>
    </PolicyPage>
  );
}
