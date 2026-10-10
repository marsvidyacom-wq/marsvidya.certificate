import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Page from "./page";

vi.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: ({ className }: { className?: string }) => <div className={className} />,
}));

describe("landing page shell", () => {
  it("presents the core student offer as the primary heading", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { level: 1, name: /learn in-demand skills/i }),
    ).toBeInTheDocument();
  });

  it("renders each decision section with a stable navigation target", () => {
    const { container } = render(<Page />);

    expect(container.querySelectorAll("#benefits")).toHaveLength(1);
    expect(container.querySelectorAll("#program")).toHaveLength(1);
    expect(container.querySelectorAll("#reviews")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: /everything you need to move forward/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /skills built for the real world/i }),
    ).toBeInTheDocument();
  });

  it("shows the press image and answers conversion questions", () => {
    render(<Page />);

    expect(
      screen.getByRole("img", {
        name: /hindi newspaper feature about vaiket and marsvidya/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /questions before you join/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/is the registration fee ₹199/i)).toBeInTheDocument();
  });

  it("keeps a mobile conversion shortcut connected to registration", () => {
    render(<Page />);

    const conversionLinks = screen.getAllByRole("link", { name: /join for ₹199/i });
    expect(conversionLinks.some((link) => link.getAttribute("href") === "#register")).toBe(true);
  });

  it("opens WhatsApp support with the certification enquiry ready to send", () => {
    render(<Page />);

    const whatsappLink = screen.getByRole("link", { name: /chat with marsvidya on whatsapp/i });
    const whatsappUrl = new URL(whatsappLink.getAttribute("href") ?? "");

    expect(`${whatsappUrl.hostname}${whatsappUrl.pathname}`).toBe("wa.me/916388381855");
    expect(whatsappUrl.searchParams.get("text")).toMatch(/7-day certification program/i);
    expect(whatsappUrl.searchParams.get("text")).toMatch(/5 skill segments/i);
  });

  it("hides WhatsApp support while scrolling and restores it after scrolling stops", () => {
    vi.useFakeTimers();
    render(<Page />);
    const whatsappLink = screen.getByRole("link", { name: /chat with marsvidya on whatsapp/i });

    fireEvent.scroll(window);
    expect(whatsappLink).toHaveAttribute("data-scrolling", "true");

    act(() => vi.advanceTimersByTime(499));
    expect(whatsappLink).toHaveAttribute("data-scrolling", "true");

    act(() => vi.advanceTimersByTime(1));
    expect(whatsappLink).toHaveAttribute("data-scrolling", "false");
    vi.useRealTimers();
  });

  it("links the footer to every customer policy", () => {
    render(<Page />);

    expect(screen.getByRole("link", { name: /terms & conditions/i })).toHaveAttribute(
      "href",
      "/terms-and-conditions",
    );
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
    expect(screen.getByRole("link", { name: /refund policy/i })).toHaveAttribute(
      "href",
      "/refund-policy",
    );
    expect(screen.getByText(/© 2026 marsvidya\. all rights reserved\./i)).toBeInTheDocument();
  });

  it("presents all five portfolio certificates directly below the hero", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        name: /add 5 certificates to your portfolio in just 7 days/i,
      }),
    ).toBeInTheDocument();
    expect(document.querySelectorAll(".certificate-card")).toHaveLength(5);
  });

  it("shows certificate seat availability and links the urgency CTA to registration", () => {
    const { container } = render(<Page />);

    expect(screen.getByText(/only 8 seats left/i)).toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { name: /192 of 200 seats booked/i }),
    ).toHaveAttribute("aria-valuenow", "192");
    expect(
      screen.getByRole("link", { name: /^reserve your seat ₹199$/i }),
    ).toHaveAttribute("href", "#register");

    const certificateInner = container.querySelector(".certificate-showcase-inner");
    const certificateChildren = Array.from(certificateInner?.children ?? []);
    const metaIndex = certificateChildren.findIndex((element) =>
      element.classList.contains("certificate-meta"),
    );
    const seatCtaIndex = certificateChildren.findIndex((element) =>
      element.classList.contains("certificate-seat-cta"),
    );

    expect(seatCtaIndex).toBeGreaterThan(metaIndex);
    expect(container.querySelector(".hero .certificate-seat-cta")).toBeNull();
  });

  it("moves through certificates with the carousel controls", async () => {
    const user = userEvent.setup();
    const { container } = render(<Page />);
    const certificateStatus = container.querySelector(".certificate-status");

    expect(certificateStatus).toHaveTextContent(/certificate 1 of 5.*cybersecurity/i);
    await user.click(screen.getByRole("button", { name: /next certificate/i }));
    expect(certificateStatus).toHaveTextContent(/certificate 2 of 5.*generative commerce/i);
  });

  it("supports swipe gestures for touch-friendly certificate browsing", () => {
    const { container } = render(<Page />);

    const carousel = screen.getByLabelText(/certificate carousel/i);
    fireEvent(carousel, new MouseEvent("pointerdown", { bubbles: true, clientX: 240 }));
    fireEvent(carousel, new MouseEvent("pointerup", { bubbles: true, clientX: 120 }));
    expect(container.querySelector(".certificate-status")).toHaveTextContent(/certificate 2 of 5/i);
  });

  it("does not let the click generated after a swipe undo the slide", () => {
    const { container } = render(<Page />);

    const activeCard = screen.getByRole("button", {
      name: /view full-size cybersecurity certificate/i,
    });
    fireEvent(activeCard, new MouseEvent("pointerdown", { bubbles: true, clientX: 240 }));
    fireEvent(activeCard, new MouseEvent("pointerup", { bubbles: true, clientX: 120 }));
    fireEvent.click(activeCard);

    expect(container.querySelector(".certificate-status")).toHaveTextContent(/certificate 2 of 5/i);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the active certificate full size and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(
      screen.getByRole("button", { name: /view full-size cybersecurity certificate/i }),
    );
    expect(
      screen.getByRole("dialog", { name: /cybersecurity certificate preview/i }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps keyboard focus inside the full certificate view", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(
      screen.getByRole("button", { name: /view full-size cybersecurity certificate/i }),
    );
    const closeButton = screen.getByRole("button", {
      name: /close certificate preview/i,
    });
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
    await user.tab({ shift: true });
    expect(closeButton).toHaveFocus();
  });
});
