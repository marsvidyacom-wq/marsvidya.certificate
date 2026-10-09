import { createPaymentWebhookHandler } from "@/lib/payment-webhook";
import {
  markRegistrationFailed,
  markRegistrationPaid,
} from "@/lib/registrations-repository";
import {
  getRazorpayWebhookSecret,
  verifyRazorpayWebhookSignature,
} from "@/lib/razorpay";

const webhookSecret = getRazorpayWebhookSecret();

export const POST = createPaymentWebhookHandler({
  verifySignature: (rawBody, signature) =>
    verifyRazorpayWebhookSignature(rawBody, signature, webhookSecret),
  markPaid: markRegistrationPaid,
  markFailed: markRegistrationFailed,
});
