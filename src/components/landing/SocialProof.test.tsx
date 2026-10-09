import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialProof } from "./SocialProof";

describe("SocialProof", () => {
  it("keeps the newspaper image and follows it with five testimonial cards", () => {
    const { container } = render(<SocialProof />);

    expect(
      screen.getByRole("img", {
        name: /hindi newspaper feature about vaiket and marsvidya/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /real people\. real progress/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/student testimonial carousel/i)).toBeInTheDocument();
    expect(container.querySelectorAll(".testimonial-deck-card")).toHaveLength(5);
    expect(container.querySelectorAll(".testimonial-profile-icon")).toHaveLength(5);
  });
});
