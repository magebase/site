import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuoteFormSection from "../components/landing/QuoteFormSection";

describe("QuoteFormSection", () => {
  it("renders the priority field", () => {
    render(<QuoteFormSection />);
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
  });

  it("does not render the timeline field", () => {
    render(<QuoteFormSection />);
    expect(screen.queryByLabelText(/timeline/i)).not.toBeInTheDocument();
  });

  it("submits the form with priority field", async () => {
    const user = userEvent.setup();
    render(<QuoteFormSection />);

    // Fill required fields
    await user.type(screen.getByLabelText(/full name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/phone/i), "1234567890");
    await user.type(
      screen.getByLabelText(/project description/i),
      "Test project"
    );

    // Select priority
    await user.click(screen.getByLabelText(/priority/i));
    await user.click(screen.getByText("High"));

    // Submit
    await user.click(screen.getByText(/get my free quote/i));

    // Check if submitted (this might need adjustment based on actual implementation)
    expect(screen.getByText(/quote request submitted/i)).toBeInTheDocument();
  });
});
