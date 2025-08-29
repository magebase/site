import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MarketingPageTemplate from "../components/marketing/MarketingPageTemplate";

describe("MarketingPageTemplate", () => {
  it("renders the marketing page with correct title and content", () => {
    const mockProps = {
      title: "E-commerce Solutions",
      subtitle: "Build the next generation of online stores",
      description: "Comprehensive e-commerce development services",
      features: [
        "Shopping Cart",
        "Payment Integration",
        "Inventory Management",
      ],
      ctaText: "Get Started",
      useCase: "e-commerce",
    };

    render(<MarketingPageTemplate {...mockProps} />);

    expect(screen.getByText("E-commerce Solutions")).toBeInTheDocument();
    expect(
      screen.getByText("Build the next generation of online stores")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Comprehensive e-commerce development services")
    ).toBeInTheDocument();
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Payment Integration")).toBeInTheDocument();
    expect(screen.getByText("Inventory Management")).toBeInTheDocument();

    // Test for hero section CTA button specifically by looking for the white background
    const buttons = screen.getAllByRole("button", { name: /get started/i });
    const heroButton = buttons.find((button) =>
      button.classList.contains("bg-white")
    );
    expect(heroButton).toBeInTheDocument();
  });

  it("renders features with correct structure", () => {
    const mockProps = {
      title: "Test App",
      subtitle: "Test subtitle",
      description: "Test description",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      ctaText: "Start Now",
      useCase: "test",
    };

    render(<MarketingPageTemplate {...mockProps} />);

    // Check that all features are rendered
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();

    // Check for feature cards by looking for the card container divs
    const featureCards = document.querySelectorAll('[data-slot="card"]');
    expect(featureCards).toHaveLength(3);
  });
});
