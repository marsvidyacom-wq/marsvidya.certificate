"use client";

import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";
import {
  PROFESSIONS,
  validateRegistration,
  type RegistrationErrors,
  type RegistrationInput,
} from "@/lib/registration";

const initialInput: RegistrationInput = { name: "", email: "", phone: "", profession: "" };

type PaymentStage = "idle" | "processing" | "opening" | "verifying";

interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckout {
  open: () => void;
  on: (event: "payment.failed", handler: () => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
  }
}

export function RegistrationSection() {
  const [input, setInput] = useState<RegistrationInput>(initialInput);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [paymentStage, setPaymentStage] = useState<PaymentStage>("idle");
  const [successOpen, setSuccessOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const professionRef = useRef<HTMLSelectElement>(null);
  const errorCount = Object.values(errors).filter(Boolean).length;

  const updateField = (field: keyof RegistrationInput, value: string) => {
    setInput((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccessOpen(false);
    setSubmitError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRegistration(input);
    setErrors(validationErrors);
    setSuccessOpen(false);
    setSubmitError("");

    if (Object.keys(validationErrors).length === 0) {
      setPaymentStage("processing");
      try {
        const response = await fetch("/api/registrations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });

        const result = (await response.json().catch(() => null)) as {
          keyId?: string;
          orderId?: string;
          amount?: number;
          currency?: string;
          message?: string;
        } | null;
        if (
          !response.ok ||
          !result?.keyId ||
          !result.orderId ||
          typeof result.amount !== "number" ||
          !result.currency
        ) {
          throw new Error(result?.message || "We couldn’t start your payment. Please try again.");
        }

        if (!window.Razorpay) {
          throw new Error("Razorpay checkout is still loading. Please try again.");
        }

        setPaymentStage("opening");
        const checkout = new window.Razorpay({
          key: result.keyId,
          amount: result.amount,
          currency: result.currency,
          name: "Mars Vidya",
          description: "7-day live learning program",
          order_id: result.orderId,
          prefill: {
            name: input.name.trim(),
            email: input.email.trim(),
            contact: input.phone.trim(),
          },
          theme: { color: "#28d7ff" },
          modal: {
            ondismiss: () => setPaymentStage("idle"),
          },
          handler: async (payment: RazorpaySuccessResponse) => {
            setPaymentStage("verifying");
            setSubmitError("");

            try {
              const verificationResponse = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payment),
              });
              const verification = (await verificationResponse.json().catch(() => null)) as {
                ok?: boolean;
                message?: string;
              } | null;

              if (!verificationResponse.ok || !verification?.ok) {
                throw new Error(
                  verification?.message || "We couldn’t verify your payment. Please contact support.",
                );
              }

              setInput(initialInput);
              setPaymentStage("idle");
              setSuccessOpen(true);
            } catch (error) {
              setPaymentStage("idle");
              setSubmitError(
                error instanceof Error
                  ? error.message
                  : "We couldn’t verify your payment. Please contact support.",
              );
            }
          },
        });
        checkout.on("payment.failed", () => {
          setPaymentStage("idle");
          setSubmitError("Payment failed. Please try again.");
        });
        checkout.open();
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "We couldn’t start your payment. Please try again.",
        );
        setPaymentStage("idle");
      }
      return;
    }

    if (validationErrors.name) nameRef.current?.focus();
    else if (validationErrors.email) emailRef.current?.focus();
    else if (validationErrors.phone) phoneRef.current?.focus();
    else if (validationErrors.profession) professionRef.current?.focus();
  };

  const buttonLabel = {
    idle: "Reserve my seat",
    processing: "Processing…",
    opening: "Opening Razorpay…",
    verifying: "Verifying…",
  }[paymentStage];

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onError={() => setSubmitError("Razorpay checkout could not load. Please refresh and try again.")}
      />
      <section className="registration-section section-spacing" id="register" aria-labelledby="register-title">
      <div className="section-shell registration-layout">
        <div className="registration-copy">
          <span className="eyebrow">Your next move starts here</span>
          <h2 id="register-title">Start building five practical skills for <em>₹199</em></h2>
          <p>
            Share your details to reserve interest in the program. We’ll securely save your
            registration and contact you with the next steps.
          </p>
          <div className="registration-assurances">
            <span><ShieldCheck aria-hidden="true" /> Clear pricing</span>
            <span><LockKeyhole aria-hidden="true" /> Secure registration</span>
            <span><CheckCircle2 aria-hidden="true" /> No surprise charges</span>
          </div>
        </div>

        <form className="registration-form glass-card" onSubmit={handleSubmit} noValidate>
          <div className="form-heading">
            <span>Student special</span>
            <strong>₹199</strong>
          </div>

          {errorCount > 0 && (
            <p className="form-error-summary" role="alert">
              Please correct {errorCount} {errorCount === 1 ? "field" : "fields"} below.
            </p>
          )}

          <div className="field-group">
            <label htmlFor="registration-name">Full name</label>
            <input
              id="registration-name"
              ref={nameRef}
              name="name"
              value={input.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "registration-name-error" : undefined}
              autoComplete="name"
              placeholder="Your name"
            />
            {errors.name && <span className="field-error" id="registration-name-error">{errors.name}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="registration-email">Email address</label>
            <input
              id="registration-email"
              ref={emailRef}
              name="email"
              type="email"
              value={input.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "registration-email-error" : undefined}
              autoComplete="email"
              placeholder="you@example.com"
            />
            {errors.email && <span className="field-error" id="registration-email-error">{errors.email}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="registration-phone">Phone number</label>
            <input
              id="registration-phone"
              ref={phoneRef}
              name="phone"
              type="tel"
              value={input.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "registration-phone-error" : undefined}
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 98765 43210"
            />
            {errors.phone && <span className="field-error" id="registration-phone-error">{errors.phone}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="registration-profession">Profession</label>
            <select
              id="registration-profession"
              ref={professionRef}
              name="profession"
              value={input.profession}
              onChange={(event) => updateField("profession", event.target.value)}
              aria-invalid={Boolean(errors.profession)}
              aria-describedby={errors.profession ? "registration-profession-error" : undefined}
            >
              <option value="" disabled>Select your profession</option>
              {PROFESSIONS.map((profession) => (
                <option key={profession} value={profession}>{profession}</option>
              ))}
            </select>
            {errors.profession && (
              <span className="field-error" id="registration-profession-error">
                {errors.profession}
              </span>
            )}
          </div>

          <button className="primary-cta form-submit" type="submit" disabled={paymentStage !== "idle"}>
            {buttonLabel} <ArrowRight aria-hidden="true" size={20} />
          </button>

          {submitError && <p className="form-error-summary" role="alert">{submitError}</p>}

          <small>Secure ₹199 payment powered by Razorpay.</small>
        </form>
      </div>
      </section>

      {successOpen && (
        <div className="payment-modal-backdrop" role="presentation">
          <div
            className="payment-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-success-title"
          >
            <CheckCircle2 aria-hidden="true" size={48} />
            <h3 id="payment-success-title">Payment successful!</h3>
            <p>We will connect with you very soon.</p>
            <button type="button" className="primary-cta" onClick={() => setSuccessOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
