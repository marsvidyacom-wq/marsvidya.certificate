"use client";

import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  validateRegistration,
  type RegistrationErrors,
  type RegistrationInput,
} from "@/lib/registration";

const initialInput: RegistrationInput = { name: "", email: "", phone: "" };

export function RegistrationSection() {
  const [input, setInput] = useState<RegistrationInput>(initialInput);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof RegistrationInput, value: string) => {
    setInput((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRegistration(input);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setInput(initialInput);
    }
  };

  return (
    <section className="registration-section section-spacing" id="register" aria-labelledby="register-title">
      <div className="section-shell registration-layout">
        <div className="registration-copy">
          <span className="eyebrow">Your next move starts here</span>
          <h2 id="register-title">Start building five practical skills for <em>₹199</em></h2>
          <p>
            Share your details to reserve interest in the student program. This demo does not
            collect payment or send your information anywhere.
          </p>
          <div className="registration-assurances">
            <span><ShieldCheck aria-hidden="true" /> Clear pricing</span>
            <span><LockKeyhole aria-hidden="true" /> Local demo form</span>
            <span><CheckCircle2 aria-hidden="true" /> No surprise charges</span>
          </div>
        </div>

        <form className="registration-form glass-card" onSubmit={handleSubmit} noValidate>
          <div className="form-heading">
            <span>Student special</span>
            <strong>₹199</strong>
          </div>

          <div className="field-group">
            <label htmlFor="registration-name">Full name</label>
            <input
              id="registration-name"
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

          <button className="primary-cta form-submit" type="submit">
            Reserve my seat <ArrowRight aria-hidden="true" size={20} />
          </button>

          {submitted && (
            <p className="form-success" role="status">
              <CheckCircle2 aria-hidden="true" size={19} />
              Demo request received — no payment was processed.
            </p>
          )}
          <small>Demo experience · Your information stays in this browser session.</small>
        </form>
      </div>
    </section>
  );
}
