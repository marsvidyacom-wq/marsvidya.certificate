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
});
