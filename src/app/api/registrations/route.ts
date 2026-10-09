import { createRegistrationHandler } from "@/lib/registration-handler";
import { insertRegistration } from "@/lib/registrations-repository";
import { createRazorpayClient, getRazorpayCredentials } from "@/lib/razorpay";

const credentials = getRazorpayCredentials();
const razorpay = createRazorpayClient(credentials);

export const POST = createRegistrationHandler({
  createOrder: razorpay.createOrder,
  saveRegistration: insertRegistration,
  keyId: credentials.keyId,
});
