# Mars Vidya Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive Next.js marketing page for the Mars Vidya ₹199 student learning offer, including an original generated student hero asset and an accessible demo registration flow.

**Architecture:** Use a Next.js App Router application with TypeScript and Tailwind CSS. Keep presentation in focused section components, shared marketing content in typed data, and browser-only behavior in small client components. Store the generated student group image in `public/images` and serve it with `next/image`.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Lucide React, Vitest, React Testing Library, built-in image generation

**Spec:** `docs/superpowers/specs/2026-10-08-mars-vidya-landing-page-design.md`

## Global Constraints

- Build from the current empty workspace using the Next.js App Router and TypeScript.
- Use an original midnight-blue, electric-blue, violet, and yellow composition; do not reproduce the supplied poster pixel-for-pixel.
- Use `next/font` for display and body typography and Lucide React for code-native interface icons.
- Store every runtime asset inside the workspace; the generated hero image must live under `public/images`.
- The registration flow is client-side demo behavior only and must not imply that payment was processed.
- Do not publish unverified partner logos, learner counts, ratings, testimonials, placement figures, or certification claims as factual endorsements.
- Preserve keyboard navigation, visible focus, sufficient contrast, semantic structure, and reduced-motion support.
- Support small mobile, tablet, and desktop layouts without horizontal overflow.

## Review Focus

- A 320px-wide viewport must show the complete offer, CTA, and form without horizontal overflow; cover in Task 4 browser checks.
- Opening and closing the mobile menu must update `aria-expanded`, move focus predictably, and allow Escape to close; cover in Task 3 component tests.
- Empty, malformed-email, and malformed-phone submissions must show field-specific errors without a success message; cover in Task 3 component tests.
- A valid registration submission must show a demo acknowledgement that explicitly says no payment was processed; cover in Task 3 component tests.
- With reduced motion enabled or the hero image unavailable, all core copy and controls must remain usable; cover in Task 4 CSS and browser checks.

---

## File Structure

- `package.json`: scripts and project dependencies.
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`: framework and tooling configuration.
- `src/app/layout.tsx`: root metadata, fonts, and page shell.
- `src/app/page.tsx`: composes the landing-page sections.
- `src/app/globals.css`: design tokens, background treatments, animations, and responsive utilities.
- `src/components/brand/BrandMark.tsx`: original Mars Vidya code-native wordmark.
- `src/components/navigation/Navbar.tsx`: desktop and accessible mobile navigation.
- `src/components/landing/Hero.tsx`: offer messaging, CTAs, trust markers, and generated image.
- `src/components/landing/BenefitGrid.tsx`: four program-benefit cards.
- `src/components/landing/ProgramSection.tsx`: five learning topics and program flow.
- `src/components/landing/SocialProof.tsx`: explicitly demo-labelled trust and testimonial presentation.
- `src/components/landing/RegistrationSection.tsx`: validated demo registration form.
- `src/components/landing/Footer.tsx`: brand and section anchors.
- `src/content/landing.ts`: typed marketing content consumed by sections.
- `src/lib/registration.ts`: pure registration validation.
- `src/lib/registration.test.ts`: validation unit tests.
- `src/components/navigation/Navbar.test.tsx`: mobile-menu interaction tests.
- `src/components/landing/RegistrationSection.test.tsx`: form behavior tests.
- `src/test/setup.ts`, `vitest.config.ts`: DOM test environment.
- `public/images/mars-vidya-students.png`: generated transparent hero asset.

### Task 1: Scaffold and Validate the Application Shell

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

**Interfaces:**
- Consumes: approved design spec only.
- Produces: Next.js App Router shell, global font variables `--font-display` and `--font-body`, scripts `dev`, `build`, `lint`, and `test`.

- [ ] **Step 1: Create the minimal Next.js, TypeScript, Tailwind, ESLint, and Vitest configuration**

Set package scripts to `next dev`, `next build`, `eslint .`, and `vitest run`. Configure the `@/*` alias to `src/*` and use jsdom with `src/test/setup.ts`.

- [ ] **Step 2: Create the root layout and smoke-test page**

Load Space Grotesk as `--font-display` and Manrope as `--font-body` with `next/font/google`, export Mars Vidya metadata, import `globals.css`, and render a semantic `<main>` containing the initial heading “Learn In-Demand Skills”.

- [ ] **Step 3: Install dependencies and verify the shell**

Run: `npm install`

Run: `npm run lint && npm run build && npm test`

Expected: all commands exit 0 and the `/` route is statically generated.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs vitest.config.ts src
git commit -m "chore: scaffold Mars Vidya landing page"
```

### Task 2: Add Typed Content, Brand, and Static Landing Sections

**Files:**
- Create: `src/content/landing.ts`
- Create: `src/components/brand/BrandMark.tsx`
- Create: `src/components/landing/BenefitGrid.tsx`
- Create: `src/components/landing/ProgramSection.tsx`
- Create: `src/components/landing/SocialProof.tsx`
- Create: `src/components/landing/Footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: global font variables and App Router shell from Task 1.
- Produces: exported `benefits`, `certificateTopics`, and `testimonials` typed arrays; server-rendered sections with IDs `benefits`, `program`, and `reviews`.

- [ ] **Step 1: Define the typed landing content**

Create `Benefit`, `CertificateTopic`, and `Testimonial` interfaces. Use concise offer copy; mark sample ratings/testimonials with a visible `Demo content` label and avoid unsupported partner or placement claims.

- [ ] **Step 2: Implement the original brand mark and four static sections**

Use semantic headings, Lucide icons selected through explicit component mappings, and section anchors. Keep each component focused on rendering its corresponding typed content.

- [ ] **Step 3: Compose the sections and apply the visual system**

Add reusable CSS classes/tokens for navy surfaces, cyan/violet glow, yellow accent, glass panels, focus rings, a subtle grid, and reduced-motion overrides. Ensure content remains readable without animations.

- [ ] **Step 4: Verify and commit**

Run: `npm run lint && npm run build`

Expected: both commands exit 0; all four section IDs occur once in the rendered route.

```bash
git add src/app src/components/brand src/components/landing src/content
git commit -m "feat: add Mars Vidya landing sections"
```

### Task 3: Implement Tested Navigation and Registration Behavior

**Files:**
- Create: `src/components/navigation/Navbar.tsx`
- Create: `src/components/navigation/Navbar.test.tsx`
- Create: `src/lib/registration.ts`
- Create: `src/lib/registration.test.ts`
- Create: `src/components/landing/RegistrationSection.tsx`
- Create: `src/components/landing/RegistrationSection.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `BrandMark`, section IDs, and global focus styles from Tasks 1–2.
- Produces: `validateRegistration(input: RegistrationInput): RegistrationErrors`, `Navbar`, and `RegistrationSection` with section ID `register`.

- [ ] **Step 1: Write failing validation tests**

Test `validateRegistration` for blank values, email without a valid address shape, phone values outside 10–13 digits after punctuation is removed, and a valid `{ name, email, phone }` object returning `{}`.

- [ ] **Step 2: Run the validation tests and confirm failure**

Run: `npm test -- src/lib/registration.test.ts`

Expected: FAIL because `validateRegistration` is not implemented.

- [ ] **Step 3: Implement pure registration validation**

Export `RegistrationInput`, `RegistrationErrors`, and `validateRegistration(input: RegistrationInput): RegistrationErrors` from `src/lib/registration.ts`.

- [ ] **Step 4: Write failing interaction tests**

Test that the mobile-menu button toggles `aria-expanded`, Escape closes the menu, invalid registration shows specific errors, and valid registration shows “Demo request received — no payment was processed.”

- [ ] **Step 5: Run interaction tests and confirm failure**

Run: `npm test -- src/components/navigation/Navbar.test.tsx src/components/landing/RegistrationSection.test.tsx`

Expected: FAIL because the interactive components are not implemented.

- [ ] **Step 6: Implement navigation and registration components**

Make both client components. The navigation links target the stable section IDs; the form uses the pure validator, connects errors through `aria-describedby`, and never makes a network request.

- [ ] **Step 7: Run the focused and full checks**

Run: `npm test && npm run lint && npm run build`

Expected: all tests pass and both static checks exit 0.

- [ ] **Step 8: Commit**

```bash
git add src/components/navigation src/components/landing/RegistrationSection.tsx src/components/landing/RegistrationSection.test.tsx src/lib src/app/page.tsx
git commit -m "feat: add accessible navigation and registration"
```

### Task 4: Generate the Hero Asset and Complete the Responsive Hero

**Files:**
- Create: `public/images/mars-vidya-students.png`
- Create: `src/components/landing/Hero.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: section ID `register`, global visual tokens, and original `BrandMark`.
- Produces: responsive `Hero` with optimized image, offer copy, CTA anchors, and fallback-safe layout.

- [ ] **Step 1: Generate and inspect the project-bound student asset**

Use the built-in image tool with the `photorealistic-natural` taxonomy: four diverse Indian college-age students, waist-up group, notebooks and one laptop, contemporary modest clothing, confident friendly expressions, blue/violet rim light, transparent background, no text, logos, watermark, certificates, or scenery. Inspect anatomy, edges, transparency, and unwanted text artifacts; iterate once if necessary.

- [ ] **Step 2: Copy the selected image into the project**

Create `public/images` and copy the selected output to `public/images/mars-vidya-students.png`. Confirm that the page does not reference the generated-images cache path.

- [ ] **Step 3: Implement the hero**

Render the exact core offer hierarchy “Learn In-Demand Skills”, “Get 5 Certifications”, and “Just ₹199”; add a student-opportunity badge, concise supporting copy, primary `#register` CTA, secondary `#program` CTA, and three non-claim trust cues. Give the image descriptive alt text and keep the copy complete if it cannot load.

- [ ] **Step 4: Complete responsive and reduced-motion styles**

Use a one-column mobile layout and split desktop layout. At 320px, prevent overflow; at desktop widths, anchor the group image to the bottom of the hero. Disable decorative movement under `prefers-reduced-motion: reduce`.

- [ ] **Step 5: Run automated verification**

Run: `npm test && npm run lint && npm run build`

Expected: all tests pass, lint exits 0, and production build succeeds.

- [ ] **Step 6: Run browser verification**

Start the dev server and inspect widths 320×800, 768×1024, and 1440×1000. Verify no horizontal overflow, readable CTA/price, menu keyboard behavior, anchor navigation, invalid/valid form states, image loading, and reduced-motion usability.

- [ ] **Step 7: Commit**

```bash
git add public/images src/components/landing/Hero.tsx src/app/page.tsx src/app/globals.css
git commit -m "feat: complete responsive Mars Vidya hero"
```

### Task 5: Final Accessibility and Delivery Audit

**Files:**
- Modify: only files with defects found during the audit.

**Interfaces:**
- Consumes: completed Tasks 1–4.
- Produces: a release-ready local landing page with passing automated checks and documented asset provenance.

- [ ] **Step 1: Audit the complete page**

Check heading order, landmarks, link names, label associations, focus order, contrast, missing alt text, console errors, 404s, overflow, and unsupported factual claims.

- [ ] **Step 2: Fix one audit issue per focused edit and rerun the relevant check**

Do not add new features. For every fix, rerun its focused test or browser scenario before moving to the next issue.

- [ ] **Step 3: Run the final verification suite**

Run: `npm test && npm run lint && npm run build`

Expected: all commands exit 0.

- [ ] **Step 4: Commit the audit result**

```bash
git add src public package.json package-lock.json
git commit -m "chore: finalize landing page accessibility"
```
