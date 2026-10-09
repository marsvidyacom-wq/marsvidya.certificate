import { describe, expect, it, vi } from "vitest";
import { createPaymentVerificationHandler } from "@/lib/payment-verification";

describe("POST /api/payments/verify", () => {
  const storedOrder = {
    orderId: "order_MarsVidya123",
    amount: 19900,
    currency: "INR",
  };

  it("marks a matching captured payment as paid", async () => {
    const findOrder = vi.fn().mockResolvedValue({
      orderId: "order_MarsVidya123",
      amount: 19900,
      currency: "INR",
    });
    const verifySignature = vi.fn().mockReturnValue(true);
    const fetchPayment = vi.fn().mockResolvedValue({
      id: "pay_MarsVidya123",
      orderId: "order_MarsVidya123",
      amount: 19900,
      currency: "INR",
      status: "captured",
    });
    const markPaid = vi.fn().mockResolvedValue(undefined);
    const handler = createPaymentVerificationHandler({
      findOrder,
      verifySignature,
      fetchPayment,
      markPaid,
    });
    const request = new Request("http://localhost/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: "order_MarsVidya123",
        razorpay_payment_id: "pay_MarsVidya123",
        razorpay_signature: "valid_signature",
      }),
    });

    const response = await handler(request);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      message: "Payment successful! We will connect with you very soon.",
    });
    expect(verifySignature).toHaveBeenCalledWith({
      orderId: "order_MarsVidya123",
      paymentId: "pay_MarsVidya123",
      signature: "valid_signature",
    });
    expect(markPaid).toHaveBeenCalledWith({
      orderId: "order_MarsVidya123",
      paymentId: "pay_MarsVidya123",
    });
  });

  it("rejects an invalid checkout signature before fetching payment data", async () => {
    const fetchPayment = vi.fn();
    const markPaid = vi.fn();
    const handler = createPaymentVerificationHandler({
      findOrder: vi.fn().mockResolvedValue(storedOrder),
      verifySignature: vi.fn().mockReturnValue(false),
      fetchPayment,
      markPaid,
    });
    const request = new Request("http://localhost/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: "order_MarsVidya123",
        razorpay_payment_id: "pay_MarsVidya123",
        razorpay_signature: "tampered_signature",
      }),
    });

    const response = await handler(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Payment verification failed.",
    });
    expect(fetchPayment).not.toHaveBeenCalled();
    expect(markPaid).not.toHaveBeenCalled();
  });

  it("keeps an authorized but uncaptured payment in processing state", async () => {
    const markPaid = vi.fn();
    const handler = createPaymentVerificationHandler({
      findOrder: vi.fn().mockResolvedValue(storedOrder),
      verifySignature: vi.fn().mockReturnValue(true),
      fetchPayment: vi.fn().mockResolvedValue({
        id: "pay_MarsVidya123",
        orderId: "order_MarsVidya123",
        amount: 19900,
        currency: "INR",
        status: "authorized",
      }),
      markPaid,
    });
    const request = new Request("http://localhost/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: "order_MarsVidya123",
        razorpay_payment_id: "pay_MarsVidya123",
        razorpay_signature: "valid_signature",
      }),
    });

    const response = await handler(request);

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      message: "Payment is still processing. Please wait a moment.",
    });
    expect(markPaid).not.toHaveBeenCalled();
  });

  it("returns a safe error when the stored order cannot be loaded", async () => {
    const handler = createPaymentVerificationHandler({
      findOrder: vi.fn().mockRejectedValue(new Error("database unavailable")),
      verifySignature: vi.fn(),
      fetchPayment: vi.fn(),
      markPaid: vi.fn(),
    });
    const request = new Request("http://localhost/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: "order_MarsVidya123",
        razorpay_payment_id: "pay_MarsVidya123",
        razorpay_signature: "valid_signature",
      }),
    });

    const response = await handler(request);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      message: "We couldn’t verify your payment. Please contact support.",
    });
  });
});
