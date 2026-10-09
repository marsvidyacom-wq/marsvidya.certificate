import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("opens the mobile navigation and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const logo = screen.getByRole("img", {
      name: /marsvidya learn practice grow/i,
    });
    expect(logo.closest("a")).toHaveAttribute("aria-label", "MarsVidya home");
    expect(screen.queryByLabelText(/vaiket home/i)).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /open navigation/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Benefits" })).toHaveFocus();
    expect(screen.getByRole("link", { name: "Program" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
});
