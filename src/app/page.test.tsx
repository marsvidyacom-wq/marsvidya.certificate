import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "./page";

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

  it("labels sample social proof and answers conversion questions", () => {
    render(<Page />);

    expect(screen.getByText(/demo content/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /questions before you join/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/is the registration fee ₹199/i)).toBeInTheDocument();
  });
});
