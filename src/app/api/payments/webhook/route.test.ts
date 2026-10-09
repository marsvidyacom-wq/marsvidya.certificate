import { describe, expect, it, vi } from "vitest";
import { createPaymentWebhookHandler } from "@/lib/payment-webhook";

describe("POST /api/payments/webhook", () => {
  it("marks a valid payment.captured webhook as paid", async () => {
    const rawBody = JSON.stringify({
      event: "payment.captured",
      payload: {
        payment: {
          entity: {
            id: "pay_MarsVidya123",
            order_id: "order_MarsVidya123",
            amount: 19900,
            currency: "INR",
            status: "captured",
          },
        },
      },
    });
    const verifySignature = vi.fn().mockReturnValue(true);
    const markPaid = vi.fn().mockResolvedValue(undefined);
    const handler = createPaymentWebhookHandler({
      verifySignature,
      markPaid,
      markFailed: vi.fn(),
    });
    const request = new Request("http://localhost/api/payments/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": "valid_webhook_signature",
      },
      body: rawBody,
    });

    const response = await handler(request);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(verifySignature).toHaveBeenCalledWith(rawBody, "valid_webhook_signature");
    expect(markPaid).toHaveBeenCalledWith({
      orderId: "order_MarsVidya123",
      paymentId: "pay_MarsVidya123",
    });
  });

  it("rejects an invalid webhook signature without updating a registration", async () => {
    const markPaid = vi.fn();
    const handler = createPaymentWebhookHandler({
      verifySignature: vi.fn().mockReturnValue(false),
      markPaid,
      markFailed: vi.fn(),
    });
    const request = new Request("http://localhost/api/payments/webhook", {
      method: "POST",
      headers: { "x-razorpay-signature": "invalid_signature" },
      body: JSON.stringify({ event: "payment.captured" }),
    });

    const response = await handler(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Invalid webhook signature.",
    });
    expect(markPaid).not.toHaveBeenCalled();
  });

  it("records a valid payment.failed webhook", async () => {
    const markFailed = vi.fn().mockResolvedValue(undefined);
    const handler = createPaymentWebhookHandler({
      verifySignature: vi.fn().mockReturnValue(true),
      markPaid: vi.fn(),
      markFailed,
    });
    const request = new Request("http://localhost/api/payments/webhook", {
      method: "POST",
      headers: { "x-razorpay-signature": "valid_webhook_signature" },
      body: JSON.stringify({
        event: "payment.failed",
        payload: {
          payment: {
            entity: {
              id: "pay_MarsVidyaFailed",
              order_id: "order_MarsVidya123",
              status: "failed",
            },
          },
        },
      }),
    });

    const response = await handler(request);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(markFailed).toHaveBeenCalledWith({
      orderId: "order_MarsVidya123",
      paymentId: "pay_MarsVidyaFailed",
    });
  });
});
