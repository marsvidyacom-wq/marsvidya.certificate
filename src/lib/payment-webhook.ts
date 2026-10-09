interface PaymentWebhookDependencies {
  verifySignature: (rawBody: string, signature: string) => boolean;
  markPaid: (input: { orderId: string; paymentId: string }) => Promise<void>;
  markFailed: (input: { orderId: string; paymentId: string }) => Promise<void>;
}

export function createPaymentWebhookHandler({
  verifySignature,
  markPaid,
  markFailed,
}: PaymentWebhookDependencies) {
  return async function handlePaymentWebhook(request: Request): Promise<Response> {
    const signature = request.headers.get("x-razorpay-signature");
    const rawBody = await request.text();

    if (!signature || !verifySignature(rawBody, signature)) {
      return Response.json({ message: "Invalid webhook signature." }, { status: 400 });
    }

    let event: Record<string, unknown>;
    try {
      event = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return Response.json({ message: "Invalid webhook payload." }, { status: 400 });
    }

    if (event.event !== "payment.captured" && event.event !== "payment.failed") {
      return Response.json({ ok: true });
    }

    const payload = event.payload as Record<string, unknown> | undefined;
    const paymentWrapper = payload?.payment as Record<string, unknown> | undefined;
    const payment = paymentWrapper?.entity as Record<string, unknown> | undefined;

    if (
      !payment ||
      typeof payment.id !== "string" ||
      typeof payment.order_id !== "string"
    ) {
      return Response.json({ message: "Invalid webhook payload." }, { status: 400 });
    }

    if (event.event === "payment.captured" && payment.status === "captured") {
      await markPaid({ orderId: payment.order_id, paymentId: payment.id });
    } else if (event.event === "payment.failed" && payment.status === "failed") {
      await markFailed({ orderId: payment.order_id, paymentId: payment.id });
    } else {
      return Response.json({ message: "Invalid webhook payload." }, { status: 400 });
    }

    return Response.json({ ok: true });
  };
}
