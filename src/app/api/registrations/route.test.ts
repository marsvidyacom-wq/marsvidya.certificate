import { describe, expect, it, vi } from "vitest";
import { createRegistrationHandler } from "@/lib/registration-handler";

describe("POST /api/registrations", () => {
  const order = { id: "order_MarsVidya123", amount: 19900, currency: "INR" };

  it("creates a fixed-price Razorpay order and stores the pending registration", async () => {
    const createOrder = vi.fn().mockResolvedValue({
      id: "order_MarsVidya123",
      amount: 19900,
      currency: "INR",
    });
    const saveRegistration = vi.fn().mockResolvedValue(undefined);
    const handler = createRegistrationHandler({
      createOrder,
      saveRegistration,
      keyId: "rzp_test_public",
    });
    const request = new Request("http://localhost/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "  Meera Kapoor  ",
        email: "  MEERA@example.com ",
        phone: " +91 98765 43210 ",
        profession: "Freelancer",
      }),
    });

    const response = await handler(request);

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({
      keyId: "rzp_test_public",
      orderId: "order_MarsVidya123",
      amount: 19900,
      currency: "INR",
    });
    expect(createOrder).toHaveBeenCalledWith({ amount: 19900, currency: "INR" });
    expect(saveRegistration).toHaveBeenCalledWith({
      registration: {
        name: "Meera Kapoor",
        email: "meera@example.com",
        phone: "+91 98765 43210",
        profession: "Freelancer",
      },
      order: {
        id: "order_MarsVidya123",
        amount: 19900,
        currency: "INR",
      },
    });
  });

  it("rejects unsupported profession values without writing", async () => {
    const saveRegistration = vi.fn().mockResolvedValue(undefined);
    const handler = createRegistrationHandler({
      createOrder: vi.fn().mockResolvedValue(order),
      saveRegistration,
      keyId: "rzp_test_public",
    });
    const request = new Request("http://localhost/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Meera Kapoor",
        email: "meera@example.com",
        phone: "+91 98765 43210",
        profession: "Astronaut",
      }),
    });

    const response = await handler(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Please check the highlighted fields.",
      errors: { profession: "Please select a valid profession." },
    });
    expect(saveRegistration).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON input without writing", async () => {
    const saveRegistration = vi.fn().mockResolvedValue(undefined);
    const handler = createRegistrationHandler({
      createOrder: vi.fn().mockResolvedValue(order),
      saveRegistration,
      keyId: "rzp_test_public",
    });
    const request = new Request("http://localhost/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });

    const response = await handler(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Invalid registration data.",
    });
    expect(saveRegistration).not.toHaveBeenCalled();
  });

  it("returns a safe message when payment setup fails", async () => {
    const saveRegistration = vi.fn().mockRejectedValue(new Error("database unavailable"));
    const handler = createRegistrationHandler({
      createOrder: vi.fn().mockResolvedValue(order),
      saveRegistration,
      keyId: "rzp_test_public",
    });
    const request = new Request("http://localhost/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Meera Kapoor",
        email: "meera@example.com",
        phone: "+91 98765 43210",
        profession: "Student",
      }),
    });

    const response = await handler(request);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      message: "We couldn’t start your payment. Please try again.",
    });
  });
});
