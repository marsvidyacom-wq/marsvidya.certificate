import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("presents the complete offer and connects both decision paths", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { level: 1, name: /learn in-demand skills/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) =>
        element?.tagName === "P" && element.textContent === "Get 5 Certifications"),
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) =>
        element?.tagName === "P" && element.textContent === "Just ₹199"),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /join the program/i })).toHaveAttribute(
      "href",
      "#register",
    );
    expect(screen.getByRole("link", { name: /explore the curriculum/i })).toHaveAttribute(
      "href",
      "#program",
    );
    expect(screen.getByRole("link", { name: /register now for ₹199/i })).toHaveAttribute(
      "href",
      "#register",
    );
  });

  it("shows one consolidated partner logo grid and poster-style offer highlights", () => {
    render(<Hero />);

    expect(
      screen.getByAltText(/marsvidya, vaiket and startup ecosystem partners/i),
    ).toBeInTheDocument();
    expect(screen.queryByAltText(/^meta business partner$/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/^startup india$/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/^dpiit recognised$/i)).not.toBeInTheDocument();
    expect(
      screen.getByAltText(/four indian students ready to learn together/i),
    ).toBeInTheDocument();
    expect(screen.getByText("5 Certifications")).toBeInTheDocument();
    expect(screen.getByText("7 Days Live Program")).toBeInTheDocument();
    expect(screen.getByText("Placement Support")).toBeInTheDocument();
    expect(screen.getByText("Lifetime Access")).toBeInTheDocument();
  });
});
