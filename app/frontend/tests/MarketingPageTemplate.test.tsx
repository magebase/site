import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MarketingPageTemplate from "../components/marketing/MarketingPageTemplate";

describe("MarketingPageTemplate", () => {
  it("renders the marketing page with correct title and content", () => {
    const mockProps = {
      title: "E-commerce Solutions",
      subtitle: "Build the next generation of online stores",
      description: "Comprehensive e-commerce development services",
      features: ["Shopping Cart", "Payment Integration", "Inventory Management"],
      ctaText: "Get Started",
      useCase: "e-commerce"
    };

    render(<MarketingPageTemplate {...mockProps} />);

    expect(screen.getByText("E-commerce Solutions")).toBeInTheDocument();
    expect(screen.getByText("Build the next generation of online stores")).toBeInTheDocument();
    expect(screen.getByText("Comprehensive e-commerce development services")).toBeInTheDocument();
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Payment Integration")).toBeInTheDocument();
    expect(screen.getByText("Inventory Management")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });
});
