import {
  validateRegistration,
  type RegistrationInput,
} from "@/lib/registration";

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface RegistrationOrderDependencies {
  createOrder: (input: { amount: number; currency: "INR" }) => Promise<RazorpayOrder>;
  saveRegistration: (input: {
    registration: RegistrationInput;
    order: RazorpayOrder;
  }) => Promise<void>;
  keyId: string;
}

export const PROGRAM_PRICE_PAISE = 19_900;

function readRegistrationInput(value: unknown): RegistrationInput | null {
  if (!value || typeof value !== "object") return null;

  const input = value as Record<string, unknown>;
  if (
    typeof input.name !== "string" ||
    typeof input.email !== "string" ||
    typeof input.phone !== "string" ||
    typeof input.profession !== "string"
  ) {
    return null;
  }

  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    profession: input.profession.trim(),
  };
}

export function createRegistrationHandler({
  createOrder,
  saveRegistration,
  keyId,
}: RegistrationOrderDependencies) {
  return async function handleRegistration(request: Request): Promise<Response> {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json({ message: "Invalid registration data." }, { status: 400 });
    }

    const input = readRegistrationInput(body);
    if (!input) {
      return Response.json({ message: "Invalid registration data." }, { status: 400 });
    }

    const errors = validateRegistration(input);
    if (Object.keys(errors).length > 0) {
      return Response.json(
        { message: "Please check the highlighted fields.", errors },
        { status: 400 },
      );
    }

    try {
      const order = await createOrder({ amount: PROGRAM_PRICE_PAISE, currency: "INR" });
      await saveRegistration({ registration: input, order });
      return Response.json(
        {
          keyId,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
        },
        { status: 201 },
      );
    } catch (error) {
      if (process.env.NODE_ENV !== "test") {
        console.error("Failed to save registration", error);
      }
      return Response.json(
        { message: "We couldn’t start your payment. Please try again." },
        { status: 500 },
      );
    }
  };
}
