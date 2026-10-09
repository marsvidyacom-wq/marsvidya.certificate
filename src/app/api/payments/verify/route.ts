import { createPaymentVerificationHandler } from "@/lib/payment-verification";
import {
  findRegistrationOrder,
  markRegistrationPaid,
} from "@/lib/registrations-repository";
import {
  createRazorpayClient,
  getRazorpayCredentials,
  verifyRazorpayPaymentSignature,
} from "@/lib/razorpay";

const credentials = getRazorpayCredentials();
const razorpay = createRazorpayClient(credentials);

export const POST = createPaymentVerificationHandler({
  findOrder: findRegistrationOrder,
  verifySignature: (input) =>
    verifyRazorpayPaymentSignature(input, credentials.keySecret),
  fetchPayment: razorpay.fetchPayment,
  markPaid: markRegistrationPaid,
});
