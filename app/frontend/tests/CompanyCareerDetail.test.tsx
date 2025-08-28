import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CompanyCareerDetail from "../pages/CompanyCareerDetail";

const mockCareer = {
  id: 1,
  title: "Software Engineer",
  department: "Engineering",
  location: "Remote",
  employment_type: "Full-time",
  salary_range: "$80,000 - $100,000",
  description: "We are looking for a skilled software engineer...",
  requirements: "Bachelor's degree in Computer Science\n5+ years experience",
  benefits: "Health insurance\n401k",
  slug: "software-engineer",
};

describe("CompanyCareerDetail", () => {
  it("does not render phone input field", () => {
    render(<CompanyCareerDetail career={mockCareer} />);
    expect(screen.queryByText("Phone")).not.toBeInTheDocument();
  });
});
