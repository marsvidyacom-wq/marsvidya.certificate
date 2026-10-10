import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

describe("root layout analytics", () => {
  it("initializes the production Google Analytics property", async () => {
    render(<GoogleAnalytics />);

    await waitFor(() => {
      expect(
        document.querySelector(
          'script[src="https://www.googletagmanager.com/gtag/js?id=G-30HMF2Q391"]',
        ),
      ).not.toBeNull();
    });
    expect(document.querySelector("#google-analytics")?.textContent).toContain(
      "gtag('config', 'G-30HMF2Q391')",
    );
  });
});
