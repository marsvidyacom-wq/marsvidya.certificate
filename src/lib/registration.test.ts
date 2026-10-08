import { describe, expect, it } from "vitest";
import { validateRegistration } from "./registration";

describe("validateRegistration", () => {
  it("rejects blank required fields", () => {
    expect(validateRegistration({ name: " ", email: "", phone: "" })).toEqual({
      name: "Please enter your name.",
      email: "Please enter your email address.",
      phone: "Please enter your phone number.",
    });
  });

  it("rejects malformed email and phone values", () => {
    expect(
      validateRegistration({
        name: "Aarav Sharma",
        email: "aarav.example.com",
        phone: "98-76",
      }),
    ).toEqual({
      email: "Enter a valid email address.",
      phone: "Enter a phone number with 10 to 13 digits.",
    });
  });

  it("accepts a punctuated phone number when its normalized length is valid", () => {
    expect(
      validateRegistration({
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+91 98765-43210",
      }),
    ).toEqual({});
  });

  it("rejects phone numbers longer than 13 normalized digits", () => {
    expect(
      validateRegistration({
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+91 98765 43210 99",
      }),
    ).toEqual({
      phone: "Enter a phone number with 10 to 13 digits.",
    });
  });

  it("rejects phone numbers containing letters", () => {
    expect(
      validateRegistration({
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "abc9876543210",
      }),
    ).toEqual({
      phone: "Use only digits, spaces, +, hyphens, or parentheses.",
    });
  });
});
