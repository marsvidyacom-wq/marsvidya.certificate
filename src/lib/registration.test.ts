import { describe, expect, it } from "vitest";
import { validateRegistration } from "./registration";

describe("validateRegistration", () => {
  it("rejects blank required fields", () => {
    expect(
      validateRegistration({ name: " ", email: "", phone: "", profession: "" }),
    ).toEqual({
      name: "Please enter your name.",
      email: "Please enter your email address.",
      phone: "Please enter your phone number.",
      profession: "Please select your profession.",
    });
  });

  it("rejects malformed email and phone values", () => {
    expect(
      validateRegistration({
        name: "Aarav Sharma",
        email: "aarav.example.com",
        phone: "98-76",
        profession: "Student",
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
        profession: "Freelancer",
      }),
    ).toEqual({});
  });

  it("rejects phone numbers longer than 13 normalized digits", () => {
    expect(
      validateRegistration({
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+91 98765 43210 99",
        profession: "Business Owner",
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
        profession: "Agency Owner",
      }),
    ).toEqual({
      phone: "Use only digits, spaces, +, hyphens, or parentheses.",
    });
  });

  it("rejects a profession outside the supported options", () => {
    expect(
      validateRegistration({
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+91 98765 43210",
        profession: "Astronaut",
      }),
    ).toEqual({ profession: "Please select a valid profession." });
  });
});
