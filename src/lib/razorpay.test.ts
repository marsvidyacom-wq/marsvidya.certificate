import { describe, expect, it, vi } from "vitest";
import {
  createRazorpayClient,
  verifyRazorpayPaymentSignature,
  verifyRazorpayWebhookSignature,
} from "@/lib/razorpay";

describe("createRazorpayClient", () => {
  it("creates an order through the authenticated Razorpay Orders API", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: "order_MarsVidya123",
          entity: "order",
          amount: 19900,
          amount_paid: 0,
          amount_due: 19900,
          currency: "INR",
          receipt: "mv_test_receipt",
          offer_id: null,
          status: "created",
          attempts: 0,
          notes: [],
          created_at: 1791536400,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    const client = createRazorpayClient({
      keyId: "rzp_test_public",
      keySecret: "test_secret",
      fetchImpl,
      createReceipt: () => "mv_test_receipt",
    });

    const order = await client.createOrder({ amount: 19900, currency: "INR" });

    expect(order).toEqual({ id: "order_MarsVidya123", amount: 19900, currency: "INR" });
    expect(fetchImpl).toHaveBeenCalledWith("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from("rzp_test_public:test_secret").toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 19900,
        currency: "INR",
        receipt: "mv_test_receipt",
      }),
    });
  });

  it("accepts only the expected HMAC-SHA256 payment signature", () => {
    const input = {
      orderId: "order_123",
      paymentId: "pay_456",
      signature: "18bfc0baafae8f6367711ee362f2201aaa3654274683100e5367bb9a2bd29cbe",
    };

    expect(verifyRazorpayPaymentSignature(input, "secret")).toBe(true);
    expect(
      verifyRazorpayPaymentSignature({ ...input, signature: "0".repeat(64) }, "secret"),
    ).toBe(false);
  });

  it("fetches the authoritative payment status from Razorpay", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: "pay_MarsVidya123",
          entity: "payment",
          amount: 19900,
          currency: "INR",
          status: "captured",
          order_id: "order_MarsVidya123",
          invoice_id: null,
          international: false,
          method: "upi",
          amount_refunded: 0,
          refund_status: null,
          captured: true,
          description: "Mars Vidya program",
          card_id: null,
          bank: null,
          wallet: null,
          vpa: "success@razorpay",
          email: "meera@example.com",
          contact: "+919876543210",
          notes: [],
          fee: 470,
          tax: 72,
          error_code: null,
          error_description: null,
          error_source: null,
          error_step: null,
          error_reason: null,
          acquirer_data: {},
          created_at: 1791536400,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    const client = createRazorpayClient({
      keyId: "rzp_test_public",
      keySecret: "test_secret",
      fetchImpl,
    });

    const payment = await client.fetchPayment("pay_MarsVidya123");

    expect(payment).toEqual({
      id: "pay_MarsVidya123",
      orderId: "order_MarsVidya123",
      amount: 19900,
      currency: "INR",
      status: "captured",
    });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.razorpay.com/v1/payments/pay_MarsVidya123",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from("rzp_test_public:test_secret").toString("base64")}`,
        },
      },
    );
  });

  it("verifies webhook signatures against the unmodified request body", () => {
    const rawBody = '{"event":"payment.captured"}';

    expect(
      verifyRazorpayWebhookSignature(
        rawBody,
        "63482aecf393ec15e418daab94dffe6cd7a1ddeec5ade268106920e9f1c8363d",
        "webhook_secret",
      ),
    ).toBe(true);
    expect(
      verifyRazorpayWebhookSignature(
        '{ "event": "payment.captured" }',
        "63482aecf393ec15e418daab94dffe6cd7a1ddeec5ade268106920e9f1c8363d",
        "webhook_secret",
      ),
    ).toBe(false);
  });
});
