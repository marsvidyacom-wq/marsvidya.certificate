import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PolicyPage } from "./PolicyPage";

describe("PolicyPage", () => {
  it("uses the same MarsVidya logo shown in the homepage header", () => {
    render(
      <PolicyPage title="Privacy Policy" description="How we protect your data.">
        <p>Policy content</p>
      </PolicyPage>,
    );

    const homeLink = screen.getByRole("link", { name: "MarsVidya home" });
    expect(homeLink).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("img", { name: "MarsVidya Learn Practice Grow" }),
    ).toBeInTheDocument();
  });
});
