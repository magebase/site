import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import QuotePDF from "../QuotePDF";
import TimelinePDF from "../TimelinePDF";

// Mock @react-pdf/renderer
vi.mock("@react-pdf/renderer", () => ({
  Document: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="document">{children}</div>
  ),
  Page: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page">{children}</div>
  ),
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
  View: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  StyleSheet: {
    create: (styles: any) => styles,
  },
}));

const mockQuoteRequest = {
  id: 1,
  project_name: "Test Project",
  project_description: "A test project description",
  use_case: "Web Application",
  estimated_cost: 15000,
  deposit_amount: 3000,
  monthly_retainer: 2500,
  selected_features: [
    {
      id: 1,
      name: "User Authentication",
      base_cost: 2000,
    },
  ],
  project_milestones: [
    {
      id: 1,
      name: "Planning Phase",
      description: "Initial project planning and requirements gathering",
      due_date: "2024-02-01",
      status: "completed",
      milestone_data: {
        duration_weeks: 2,
        deliverables: ["Requirements Document", "Project Timeline"],
      },
    },
  ],
  created_at: "2024-01-15T10:00:00Z",
};

describe("PDF Components", () => {
  describe("QuotePDF", () => {
    it("renders with default company information", () => {
      render(<QuotePDF quoteRequest={mockQuoteRequest} />);

      expect(screen.getAllByText("Magebase")).toHaveLength(2); // Header and footer
      expect(screen.getByText("Test Project")).toBeInTheDocument();
      expect(screen.getByText("Project Quote")).toBeInTheDocument();
    });

    it("renders with custom company information", () => {
      render(
        <QuotePDF
          quoteRequest={mockQuoteRequest}
          companyName="Custom Company"
          companyWebsite="www.customcompany.com"
          companyEmail="info@customcompany.com"
          companyPhone="+1 (555) 987-6543"
        />,
      );

      expect(screen.getAllByText("Custom Company")).toHaveLength(2); // Header and footer
      expect(screen.getAllByText("www.customcompany.com")).toHaveLength(2); // Header and footer
      expect(screen.getByText("info@customcompany.com")).toBeInTheDocument();
      expect(screen.getByText("+1 (555) 987-6543")).toBeInTheDocument();
    });
  });

  describe("TimelinePDF", () => {
    it("renders with default company information", () => {
      render(<TimelinePDF quoteRequest={mockQuoteRequest} />);

      expect(screen.getAllByText("Magebase")).toHaveLength(2); // Header and footer
      expect(screen.getByText("Project Timeline")).toBeInTheDocument();
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    it("renders with custom company information", () => {
      render(
        <TimelinePDF
          quoteRequest={mockQuoteRequest}
          companyName="Custom Company"
          companyWebsite="www.customcompany.com"
          companyEmail="info@customcompany.com"
          companyPhone="+1 (555) 987-6543"
        />,
      );

      expect(screen.getAllByText("Custom Company")).toHaveLength(2); // Header and footer
      expect(screen.getAllByText("www.customcompany.com")).toHaveLength(2); // Header and footer
      expect(screen.getByText("+1 (555) 987-6543")).toBeInTheDocument();
    });
  });
});
