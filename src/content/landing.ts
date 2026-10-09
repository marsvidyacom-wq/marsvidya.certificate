export type BenefitIcon = "award" | "calendar" | "briefcase" | "infinity";

export interface Benefit {
  icon: BenefitIcon;
  eyebrow: string;
  title: string;
  description: string;
}

export interface CertificateTopic {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const benefits: Benefit[] = [
  {
    icon: "award",
    eyebrow: "Build your proof",
    title: "5 career certificates",
    description: "Complete five focused learning tracks and build a stronger starter portfolio.",
  },
  {
    icon: "calendar",
    eyebrow: "Learn with momentum",
    title: "7-day live program",
    description: "A focused live-learning sprint designed to turn ideas into practical output.",
  },
  {
    icon: "briefcase",
    eyebrow: "Prepare for opportunity",
    title: "Career support",
    description: "Get structured guidance for your portfolio, profile, and next career move.",
  },
  {
    icon: "infinity",
    eyebrow: "Keep learning",
    title: "Lifetime access",
    description: "Revisit the learning material whenever you need a practical refresher.",
  },
];

export const certificateTopics: CertificateTopic[] = [
  {
    number: "01",
    title: "Digital Marketing",
    description: "Build campaigns around a clear audience, message, and measurable goal.",
  },
  {
    number: "02",
    title: "Social Media Strategy",
    description: "Plan content that earns attention and supports a consistent brand presence.",
  },
  {
    number: "03",
    title: "AI Productivity",
    description: "Use modern AI workflows to research, create, and work more efficiently.",
  },
  {
    number: "04",
    title: "Visual Design",
    description: "Turn ideas into polished, high-impact social and presentation graphics.",
  },
  {
    number: "05",
    title: "Career Readiness",
    description: "Package your skills with a focused profile, portfolio, and action plan.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "The live format made it easier to stay consistent and actually finish the work.",
    name: "Sample learner",
    role: "Student · Demo testimonial",
  },
  {
    quote: "Every topic felt practical, focused, and connected to a real career outcome.",
    name: "Sample learner",
    role: "Graduate · Demo testimonial",
  },
  {
    quote: "A clear starting point for anyone who wants to build skills without feeling lost.",
    name: "Sample learner",
    role: "Early-career learner · Demo testimonial",
  },
];

export const faqs = [
  {
    question: "Is the registration fee ₹199?",
    answer:
      "Yes. The complete student-special offer is ₹199, paid securely through Razorpay during registration.",
  },
  {
    question: "How long is the live program?",
    answer:
      "The core experience is structured as a focused seven-day live program with clear daily outcomes.",
  },
  {
    question: "What will I learn?",
    answer:
      "The five learning tracks cover digital marketing, social media strategy, AI productivity, visual design, and career readiness.",
  },
  {
    question: "Will I keep access after the program?",
    answer:
      "The offer includes ongoing access to the included learning material so you can revisit it later.",
  },
  {
    question: "What happens after I register?",
    answer:
      "After your ₹199 payment is verified, your registration is confirmed and our team will connect with you very soon.",
  },
];
