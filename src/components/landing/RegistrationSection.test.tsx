import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RegistrationSection } from "./RegistrationSection";

describe("RegistrationSection", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows field-specific errors and no success state for an empty submission", async () => {
    const user = userEvent.setup();
    render(<RegistrationSection />);

    await user.click(screen.getByRole("button", { name: /reserve my seat/i }));

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your phone number.")).toBeInTheDocument();
    expect(screen.getByText("Please select your profession.")).toBeInTheDocument();
    expect(screen.queryByText(/registration received/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    expect(screen.getByRole("alert")).toHaveTextContent(/please correct 4 fields/i);
  });

  it("shows each payment stage before opening the success dialog", async () => {
    const user = userEvent.setup();
    let resolveOrder!: (response: Response) => void;
    let resolveVerification!: (response: Response) => void;
    const orderResponse = new Promise<Response>((resolve) => {
      resolveOrder = resolve;
    });
    const verificationResponse = new Promise<Response>((resolve) => {
      resolveVerification = resolve;
    });
    const fetchMock = vi
      .fn()
      .mockReturnValueOnce(orderResponse)
      .mockReturnValueOnce(verificationResponse);
    const openCheckout = vi.fn();
    let checkoutOptions: {
      handler: (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => Promise<void>;
    } | null = null;
    class RazorpayMock {
      constructor(options: typeof checkoutOptions) {
        checkoutOptions = options;
      }
      open = openCheckout;
      on = vi.fn();
    }
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("Razorpay", RazorpayMock);
    render(<RegistrationSection />);

    await user.type(screen.getByLabelText(/full name/i), "Meera Kapoor");
    await user.type(screen.getByLabelText(/email address/i), "meera@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "+91 98765 43210");
    await user.selectOptions(screen.getByLabelText(/profession/i), "Freelancer");
    await user.click(screen.getByRole("button", { name: /reserve my seat/i }));

    expect(screen.getByRole("button", { name: /processing/i })).toBeDisabled();

    await act(async () => {
      resolveOrder(
        new Response(
          JSON.stringify({
            keyId: "rzp_test_public",
            orderId: "order_MarsVidya123",
            amount: 19900,
            currency: "INR",
          }),
          { status: 201, headers: { "Content-Type": "application/json" } },
        ),
      );
    });

    expect(await screen.findByRole("button", { name: /opening razorpay/i })).toBeDisabled();
    expect(openCheckout).toHaveBeenCalledOnce();

    await act(async () => {
      void checkoutOptions!.handler({
        razorpay_order_id: "order_MarsVidya123",
        razorpay_payment_id: "pay_MarsVidya123",
        razorpay_signature: "valid_signature",
      });
    });

    expect(await screen.findByRole("button", { name: /verifying/i })).toBeDisabled();

    await act(async () => {
      resolveVerification(
        new Response(
          JSON.stringify({
            ok: true,
            message: "Payment successful! We will connect with you very soon.",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
    });

    const dialog = await screen.findByRole("dialog", { name: /payment successful/i });
    expect(dialog).toHaveTextContent("We will connect with you very soon.");
    expect(fetchMock).toHaveBeenCalledWith("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Meera Kapoor",
        email: "meera@example.com",
        phone: "+91 98765 43210",
        profession: "Freelancer",
      }),
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: "order_MarsVidya123",
        razorpay_payment_id: "pay_MarsVidya123",
        razorpay_signature: "valid_signature",
      }),
    });
    expect(screen.getByLabelText(/profession/i)).toHaveValue("");
  });

  it("rejects a phone number containing letters", async () => {
    const user = userEvent.setup();
    render(<RegistrationSection />);

    await user.type(screen.getByLabelText(/full name/i), "Meera Kapoor");
    await user.type(screen.getByLabelText(/email address/i), "meera@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "abc9876543210");
    await user.selectOptions(screen.getByLabelText(/profession/i), "Student");
    await user.click(screen.getByRole("button", { name: /reserve my seat/i }));

    expect(
      screen.getByText("Use only digits, spaces, +, hyphens, or parentheses."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toHaveFocus();
  });

  it("does not announce errors while valid details are being entered", async () => {
    const user = userEvent.setup();
    render(<RegistrationSection />);

    await user.type(screen.getByLabelText(/full name/i), "Meera Kapoor");
    await user.type(screen.getByLabelText(/email address/i), "meera@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "+91 98765 43210");
    await user.selectOptions(screen.getByLabelText(/profession/i), "Startup Founder");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("keeps entered details and shows an error when payment setup fails", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({
          message: "We couldn’t start your payment. Please try again.",
        }),
      }),
    );
    render(<RegistrationSection />);

    await user.type(screen.getByLabelText(/full name/i), "Meera Kapoor");
    await user.type(screen.getByLabelText(/email address/i), "meera@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "+91 98765 43210");
    await user.selectOptions(screen.getByLabelText(/profession/i), "Agency Owner");
    await user.click(screen.getByRole("button", { name: /reserve my seat/i }));

    expect(
      await screen.findByText("We couldn’t start your payment. Please try again."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Meera Kapoor");
    expect(screen.getByLabelText(/profession/i)).toHaveValue("Agency Owner");
  });

  it("returns to retry state when Razorpay reports a failed payment", async () => {
    const user = userEvent.setup();
    let paymentFailed: (() => void) | undefined;
    class RazorpayMock {
      open = vi.fn();
      on(event: string, handler: () => void) {
        if (event === "payment.failed") paymentFailed = handler;
      }
    }
    vi.stubGlobal("Razorpay", RazorpayMock);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            keyId: "rzp_test_public",
            orderId: "order_MarsVidya123",
            amount: 19900,
            currency: "INR",
          }),
          { status: 201, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );
    render(<RegistrationSection />);

    await user.type(screen.getByLabelText(/full name/i), "Meera Kapoor");
    await user.type(screen.getByLabelText(/email address/i), "meera@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "+91 98765 43210");
    await user.selectOptions(screen.getByLabelText(/profession/i), "Student");
    await user.click(screen.getByRole("button", { name: /reserve my seat/i }));
    await screen.findByRole("button", { name: /opening razorpay/i });

    act(() => paymentFailed?.());

    expect(await screen.findByText("Payment failed. Please try again.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reserve my seat/i })).toBeEnabled();
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Meera Kapoor");
  });
});
