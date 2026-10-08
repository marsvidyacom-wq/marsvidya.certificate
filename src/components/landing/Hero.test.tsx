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
  });

  it("provides meaningful image text and non-claim trust cues", () => {
    render(<Hero />);

    expect(
      screen.getByAltText(/four indian students ready to learn together/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Clear ₹199 pricing")).toBeInTheDocument();
    expect(screen.getByText("7-day live format")).toBeInTheDocument();
    expect(screen.getByText("Lifetime learning access")).toBeInTheDocument();
  });
});
