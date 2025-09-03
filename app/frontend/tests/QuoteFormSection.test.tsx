import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QuoteFormSection from "../components/landing/QuoteFormSection";

describe("QuoteFormSection", () => {
  it("renders the velocity field", () => {
    render(<QuoteFormSection />);
    expect(screen.getByLabelText(/velocity/i)).toBeInTheDocument();
  });

  it("does not render the timeline field", () => {
    render(<QuoteFormSection />);
    expect(screen.queryByLabelText(/timeline/i)).not.toBeInTheDocument();
  });

  it("renders the form with required fields", () => {
    render(<QuoteFormSection />);

    // Check that required fields are present
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project requirements/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/velocity/i)).toBeInTheDocument();

    // Check that the main heading is present
    expect(
      screen.getByText(/get your custom quote in 60 seconds/i),
    ).toBeInTheDocument();
  });
});
