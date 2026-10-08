import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RegistrationSection } from "./RegistrationSection";

describe("RegistrationSection", () => {
  it("shows field-specific errors and no success state for an empty submission", async () => {
    const user = userEvent.setup();
    render(<RegistrationSection />);

    await user.click(screen.getByRole("button", { name: /reserve my seat/i }));

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your phone number.")).toBeInTheDocument();
    expect(screen.queryByText(/demo request received/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    expect(screen.getByRole("alert")).toHaveTextContent(/please correct 3 fields/i);
  });

  it("acknowledges a valid demo request without claiming payment", async () => {
    const user = userEvent.setup();
    render(<RegistrationSection />);

    await user.type(screen.getByLabelText(/full name/i), "Meera Kapoor");
    await user.type(screen.getByLabelText(/email address/i), "meera@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "+91 98765 43210");
    await user.click(screen.getByRole("button", { name: /reserve my seat/i }));

    expect(
      screen.getByText("Demo request received — no payment was processed."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /reserve my seat/i }));

    expect(screen.queryByText(/demo request received/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveFocus();
  });

  it("rejects a phone number containing letters", async () => {
    const user = userEvent.setup();
    render(<RegistrationSection />);

    await user.type(screen.getByLabelText(/full name/i), "Meera Kapoor");
    await user.type(screen.getByLabelText(/email address/i), "meera@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "abc9876543210");
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

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
