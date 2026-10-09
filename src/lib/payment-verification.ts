interface StoredOrder {
  orderId: string;
  amount: number;
  currency: string;
}

export interface RazorpayPayment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
}

interface PaymentVerificationDependencies {
  findOrder: (orderId: string) => Promise<StoredOrder | null>;
  verifySignature: (input: {
    orderId: string;
    paymentId: string;
    signature: string;
  }) => boolean;
  fetchPayment: (paymentId: string) => Promise<RazorpayPayment>;
  markPaid: (input: { orderId: string; paymentId: string }) => Promise<void>;
}

interface VerificationInput {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

function readVerificationInput(value: unknown): VerificationInput | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;

  if (
    typeof input.razorpay_order_id !== "string" ||
    typeof input.razorpay_payment_id !== "string" ||
    typeof input.razorpay_signature !== "string"
  ) {
    return null;
  }

  return {
    razorpay_order_id: input.razorpay_order_id,
    razorpay_payment_id: input.razorpay_payment_id,
    razorpay_signature: input.razorpay_signature,
  };
}

export function createPaymentVerificationHandler({
  findOrder,
  verifySignature,
  fetchPayment,
  markPaid,
}: PaymentVerificationDependencies) {
  return async function handlePaymentVerification(request: Request): Promise<Response> {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ message: "Invalid payment response." }, { status: 400 });
    }

    const input = readVerificationInput(body);
    if (!input) {
      return Response.json({ message: "Invalid payment response." }, { status: 400 });
    }

    let storedOrder: StoredOrder | null;
    try {
      storedOrder = await findOrder(input.razorpay_order_id);
    } catch (error) {
      if (process.env.NODE_ENV !== "test") {
        console.error("Payment order lookup failed", error);
      }
      return Response.json(
        { message: "We couldn’t verify your payment. Please contact support." },
        { status: 500 },
      );
    }
    if (!storedOrder) {
      return Response.json({ message: "Payment order was not found." }, { status: 404 });
    }

    const signatureIsValid = verifySignature({
      orderId: storedOrder.orderId,
      paymentId: input.razorpay_payment_id,
      signature: input.razorpay_signature,
    });
    if (!signatureIsValid) {
      return Response.json({ message: "Payment verification failed." }, { status: 400 });
    }

    try {
      const payment = await fetchPayment(input.razorpay_payment_id);
      const paymentMatches =
        payment.id === input.razorpay_payment_id &&
        payment.orderId === storedOrder.orderId &&
        payment.amount === storedOrder.amount &&
        payment.currency === storedOrder.currency;

      if (!paymentMatches) {
        return Response.json({ message: "Payment verification failed." }, { status: 400 });
      }

      if (payment.status !== "captured") {
        return Response.json(
          { ok: false, message: "Payment is still processing. Please wait a moment." },
          { status: 202 },
        );
      }

      await markPaid({ orderId: storedOrder.orderId, paymentId: payment.id });
      return Response.json({
        ok: true,
        message: "Payment successful! We will connect with you very soon.",
      });
    } catch (error) {
      if (process.env.NODE_ENV !== "test") {
        console.error("Payment verification failed", error);
      }
      return Response.json(
        { message: "We couldn’t verify your payment. Please contact support." },
        { status: 500 },
      );
    }
  };
}
