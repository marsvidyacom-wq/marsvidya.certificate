import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

import type { RazorpayOrder } from "@/lib/registration-handler";
import type { RazorpayPayment } from "@/lib/payment-verification";

interface RazorpayClientOptions {
  keyId: string;
  keySecret: string;
  fetchImpl?: typeof fetch;
  createReceipt?: () => string;
}

export function createRazorpayClient({
  keyId,
  keySecret,
  fetchImpl = fetch,
  createReceipt = () => `mv_${randomUUID().replaceAll("-", "").slice(0, 30)}`,
}: RazorpayClientOptions) {
  const authorization = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;

  return {
    async createOrder(input: { amount: number; currency: "INR" }): Promise<RazorpayOrder> {
      const response = await fetchImpl("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: input.amount,
          currency: input.currency,
          receipt: createReceipt(),
        }),
      });

      if (!response.ok) {
        throw new Error("Razorpay order creation failed.");
      }

      const order = (await response.json()) as Record<string, unknown>;
      if (
        typeof order.id !== "string" ||
        typeof order.amount !== "number" ||
        typeof order.currency !== "string"
      ) {
        throw new Error("Razorpay returned an invalid order.");
      }

      return { id: order.id, amount: order.amount, currency: order.currency };
    },

    async fetchPayment(paymentId: string): Promise<RazorpayPayment> {
      const response = await fetchImpl(`https://api.razorpay.com/v1/payments/${paymentId}`, {
        method: "GET",
        headers: { Authorization: authorization },
      });

      if (!response.ok) {
        throw new Error("Razorpay payment lookup failed.");
      }

      const payment = (await response.json()) as Record<string, unknown>;
      if (
        typeof payment.id !== "string" ||
        typeof payment.order_id !== "string" ||
        typeof payment.amount !== "number" ||
        typeof payment.currency !== "string" ||
        typeof payment.status !== "string"
      ) {
        throw new Error("Razorpay returned an invalid payment.");
      }

      return {
        id: payment.id,
        orderId: payment.order_id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
      };
    },
  };
}

export function getRazorpayCredentials(): { keyId: string; keySecret: string } {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are not configured.");
  }

  return { keyId, keySecret };
}

export function getRazorpayWebhookSecret(): string {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured.");
  }
  return webhookSecret;
}

export function verifyRazorpayPaymentSignature(
  input: { orderId: string; paymentId: string; signature: string },
  keySecret: string,
): boolean {
  return verifyHmac(`${input.orderId}|${input.paymentId}`, input.signature, keySecret);
}

export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string,
): boolean {
  return verifyHmac(rawBody, signature, webhookSecret);
}

function verifyHmac(payload: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(payload).digest();
  const received = Buffer.from(signature, "hex");

  return received.length === expected.length && timingSafeEqual(received, expected);
}
