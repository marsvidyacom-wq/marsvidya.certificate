export const PROFESSIONS = [
  "Student",
  "Freelancer",
  "Startup Founder",
  "Business Owner",
  "Agency Owner",
  "Other",
] as const;

export type Profession = (typeof PROFESSIONS)[number];

export interface RegistrationInput {
  name: string;
  email: string;
  phone: string;
  profession: string;
}

export type RegistrationErrors = Partial<Record<keyof RegistrationInput, string>>;

export function validateRegistration(input: RegistrationInput): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const profession = input.profession.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[\d\s+()-]+$/.test(phone)) {
    errors.phone = "Use only digits, spaces, +, hyphens, or parentheses.";
  } else {
    const normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.length < 10 || normalizedPhone.length > 13) {
      errors.phone = "Enter a phone number with 10 to 13 digits.";
    }
  }

  if (!profession) {
    errors.profession = "Please select your profession.";
  } else if (!PROFESSIONS.includes(profession as Profession)) {
    errors.profession = "Please select a valid profession.";
  }

  return errors;
}
