# Mars Vidya Landing Page Design

## Goal

Build a polished, responsive Next.js landing page from an empty workspace for Mars Vidya's student learning offer. The page should carry the dark navy, electric-blue, violet, and yellow energy of the supplied reference while using an original composition and project-owned assets.

The primary conversion message is: learn in-demand skills, receive five certifications, and join for ₹199. The first version is a focused marketing page; payment-provider integration is outside this scope.

## Audience and Success Criteria

The page is aimed at Indian students and early-career learners. It succeeds when:

- The ₹199 offer and five-certification value proposition are immediately clear.
- The layout feels trustworthy, modern, and energetic rather than like a stretched poster.
- The main call to action is obvious on desktop and mobile.
- The page remains readable and visually balanced from small phones through large desktop displays.
- Generated imagery is stored locally in the project and loads through Next.js image optimization.
- The production build and lint checks pass without errors.

## Technical Architecture

- Next.js with the App Router and TypeScript.
- Tailwind CSS for responsive layout, typography, color tokens, gradients, and component styling.
- `next/font` for an expressive display typeface paired with a highly readable sans-serif body face.
- Lucide React for consistent interface icons; brand marks will be text-led or code-native rather than copied from the reference.
- A static, component-driven page with no database or authentication.
- The primary CTA will scroll to an in-page registration/contact panel. The panel will collect name, phone number, and email in the UI and show a clear demo acknowledgement instead of pretending to process payment.

## Page Structure

### Navigation

A compact glass-effect header contains the Mars Vidya wordmark, anchor links for Benefits, Program, and Reviews, plus a highlighted Enroll Now button. On mobile, navigation condenses into a controlled menu.

### Hero

The hero uses a layered midnight-blue background with radial lighting, a subtle grid, star-like particles, and diagonal geometric accents. Copy appears on the left on desktop, while an original AI-generated group of confident Indian students appears on the right. On mobile, the copy leads and the students sit below it.

Hero content includes:

- A small “Student Special Opportunity” badge.
- “Learn In-Demand Skills” headline.
- “Get 5 Certifications” supporting headline.
- A large highlighted price of ₹199.
- Brief placement-support copy.
- Primary and secondary calls to action.
- Compact trust markers for secure registration, recognized certificates, and lifetime access.

### Benefits

Four focused cards communicate five certifications, a seven-day live program, placement support, and lifetime access. Cards use a consistent icon system, restrained glow, and concise copy.

### Program Value

A short section explains the learning path and presents the five certificate topics as individual chips or cards. This makes the landing page more useful than a single promotional poster without bloating the scope.

### Social Proof

A trust strip provides the visual structure for a rating, learner avatars, and student-count messaging. Any rating, count, or testimonial shown in the initial build is explicitly marked as demo content until verified figures and real quotes are supplied.

### Registration Panel and Footer

The final section repeats the ₹199 offer and includes a compact client-side form. Submitting validates required fields and displays a demo success state. The footer contains brand and basic navigation links without invented legal claims.

## Visual Asset

Create one original, photorealistic transparent-background hero asset showing four diverse Indian college-age students with notebooks or a laptop. Their expressions should be confident and friendly, clothing should be contemporary and modest, and the lighting should carry subtle blue and violet rim light so the group belongs naturally in the page.

The generated image must contain no logos, text, watermark, certificates, or background scenery. It will be generated with the built-in image tool, visually inspected, copied into the project's public assets, and referenced locally.

## Components and Data Flow

- `Navbar`: responsive navigation and mobile-menu state.
- `Hero`: offer copy, CTA, trust markers, and student image.
- `BenefitGrid`: renders benefits from typed local data.
- `ProgramSection`: renders certificate topics and the compact learning path.
- `SocialProof`: rating and testimonial presentation.
- `RegistrationSection`: client-side form state, validation, and acknowledgement.
- `Footer`: brand and anchor navigation.

All marketing content stays in small typed arrays near the consuming components. No network requests are required. Anchor links provide deterministic navigation between sections.

## Error Handling and Accessibility

- The registration form provides inline messages for missing or invalid fields.
- Form controls have visible labels and keyboard focus states.
- Navigation and CTA controls use semantic elements and descriptive accessible names.
- Decorative backgrounds are hidden from assistive technology.
- Color contrast is maintained even where glow and transparency are used.
- Reduced-motion preferences disable nonessential animation.
- The hero remains complete if the generated image fails to load; the copy and CTA do not depend on it.

## Responsive Behavior

- Mobile: single-column hero, compact typography, scrollable or stacked benefit cards, touch-friendly controls, and no horizontal overflow.
- Tablet: two-column transitions where space permits and a balanced benefits grid.
- Desktop: split hero, layered student visual, four-column benefits, and wider social-proof composition.

## Verification

- Run lint and the optimized production build.
- Check the page at representative mobile, tablet, and desktop widths.
- Verify mobile navigation, anchor scrolling, form validation, success feedback, and reduced-motion behavior.
- Inspect the generated asset for clean edges, appropriate anatomy, no text artifacts, and good contrast against the hero background.
- Confirm that all files required by the running page are inside the workspace.

## Out of Scope

- Payment gateway processing.
- User accounts, a database, or a learning dashboard.
- Claims or logos for Meta, Startup India, the Government of India, placement figures, or certifications that have not been independently provided and verified.
- Publishing unverified learner counts, ratings, or testimonials as factual claims.
- Copying third-party brand marks or reproducing the supplied poster pixel-for-pixel.
