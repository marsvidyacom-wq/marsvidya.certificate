import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TestimonialCarousel } from "./TestimonialCarousel";

describe("TestimonialCarousel", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("moves between testimonials with the previous and next controls", () => {
    render(<TestimonialCarousel />);

    expect(screen.getByRole("status")).toHaveTextContent(/1 of 5.*rohit kumar/i);
    fireEvent.click(screen.getByRole("button", { name: /next testimonial/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/2 of 5.*priya sharma/i);
    fireEvent.click(screen.getByRole("button", { name: /previous testimonial/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/1 of 5.*rohit kumar/i);
  });

  it("auto-slides every four seconds and pauses while hovered", () => {
    vi.useFakeTimers();
    render(<TestimonialCarousel />);

    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByRole("status")).toHaveTextContent(/2 of 5.*priya sharma/i);

    const carousel = screen.getByLabelText(/student testimonial carousel/i);
    fireEvent.mouseEnter(carousel);
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("status")).toHaveTextContent(/2 of 5.*priya sharma/i);

    fireEvent.mouseLeave(carousel);
    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByRole("status")).toHaveTextContent(/3 of 5.*aditya verma/i);
  });

  it("supports horizontal swipe gestures on touch screens", () => {
    render(<TestimonialCarousel />);

    const carousel = screen.getByLabelText(/student testimonial carousel/i);
    fireEvent(carousel, new MouseEvent("pointerdown", { bubbles: true, clientX: 240 }));
    fireEvent(carousel, new MouseEvent("pointerup", { bubbles: true, clientX: 120 }));

    expect(screen.getByRole("status")).toHaveTextContent(/2 of 5.*priya sharma/i);
  });
});
