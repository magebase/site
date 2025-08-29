import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Shield,
  Zap,
  FileText,
  Calendar,
  CreditCard,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface QuoteRequest {
  id: number;
  project_name: string;
  project_description: string;
  use_case: string;
  estimated_cost: number;
  monthly_retainer?: number;
  deposit_amount?: number;
  selected_features: Array<{
    id: number;
    name: string;
    category: string;
  }>;
  client?: {
    company_name?: string;
    contact_name?: string;
    email: string;
  };
  ai_pricing_data?: any;
  project_plan_json?: any;
}

interface ProposalShowProps {
  quote_request: QuoteRequest;
  proposal_token: string;
}

export default function ProposalShow({
  quote_request,
  proposal_token,
}: ProposalShowProps) {
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAcceptQuote = async () => {
    setIsAccepting(true);
    try {
      const response = await fetch(`/proposals/${proposal_token}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token":
            document
              .querySelector('meta[name="csrf-token"]')
              ?.getAttribute("content") || "",
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          "Quote accepted successfully! Contract has been generated."
        );
        // Redirect to contract or success page
        window.location.href = "/";
      } else {
        toast.error(
          data.message || "Failed to accept quote. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDownloadPDF = () => {
    // For now, just trigger browser print
    // In a real implementation, you'd generate and download a PDF
    window.print();
  };

  const getPhases = () => {
    // Default phases if no project plan data
    return [
      {
        name: "Discovery & Planning",
        duration: "1-2 weeks",
        cost: Math.round(quote_request.estimated_cost * 0.15),
        deliverables: [
          "Requirements analysis",
          "Technical specification",
          "Project roadmap",
          "Timeline planning",
        ],
      },
      {
        name: "Design",
        duration: "2-3 weeks",
        cost: Math.round(quote_request.estimated_cost * 0.2),
        deliverables: [
          "UI/UX wireframes",
          "Design mockups",
          "User flow diagrams",
          "Design system",
        ],
      },
      {
        name: "Development",
        duration: "6-8 weeks",
        cost: Math.round(quote_request.estimated_cost * 0.5),
        deliverables: [
          "Core functionality",
          "API development",
          "Database setup",
          "Testing implementation",
        ],
      },
      {
        name: "Testing & QA",
        duration: "2-3 weeks",
        cost: Math.round(quote_request.estimated_cost * 0.1),
        deliverables: [
          "Unit testing",
          "Integration testing",
          "User acceptance testing",
          "Performance optimization",
        ],
      },
      {
        name: "Launch & Deployment",
        duration: "1-2 weeks",
        cost: Math.round(quote_request.estimated_cost * 0.05),
        deliverables: [
          "Production deployment",
          "Final testing",
          "Documentation",
          "Training session",
        ],
      },
    ];
  };

  const phases = getPhases();
  const totalCost = phases.reduce((sum, phase) => sum + phase.cost, 0);

  return (
    <>
      <Head title={`Proposal: ${quote_request.project_name}`} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Project Proposal
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {quote_request.project_name}
            </h2>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>
                  {quote_request.client?.company_name ||
                    quote_request.client?.contact_name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Estimated:{" "}
                  {phases.reduce(
                    (sum, phase) =>
                      sum + parseInt(phase.duration.split("-")[1]),
                    0
                  )}{" "}
                  weeks
                </span>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Project Type
                  </h3>
                  <p className="text-gray-600">{quote_request.use_case}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Total Investment
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    ${totalCost.toLocaleString()}
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Project Description
                </h3>
                <p className="text-gray-600">
                  {quote_request.project_description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Selected Features */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                What's Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quote_request.selected_features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Phases */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Project Phases & Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {phases.map((phase, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {phase.name}
                      </h3>
                      <Badge variant="secondary">{phase.duration}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Deliverables:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {phase.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Phase Cost</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${phase.cost.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Pricing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {phases.map((phase, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">{phase.name}</span>
                    <span className="font-medium">
                      ${phase.cost.toLocaleString()}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Project Cost</span>
                  <span className="text-green-600">
                    ${totalCost.toLocaleString()}
                  </span>
                </div>
                {quote_request.monthly_retainer && (
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Monthly Retainer (Optional)</span>
                    <span>
                      ${quote_request.monthly_retainer.toLocaleString()}/month
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* What's Not Included */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900">
                What's Not Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Third-party API costs or subscriptions</p>
                <p>• Custom integrations beyond the specified scope</p>
                <p>• Ongoing maintenance after the warranty period</p>
                <p>• Content creation or copywriting services</p>
                <p>• Mobile app development (if not specified)</p>
                <p>• Advanced analytics setup</p>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Payment Terms
                  </h4>
                  <p>
                    50% deposit required to begin work, remaining 50% upon
                    completion.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Timeline</h4>
                  <p>
                    Project timeline begins upon receipt of deposit. Delays may
                    affect delivery dates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Revisions
                  </h4>
                  <p>
                    Up to 3 rounds of revisions included. Additional revisions
                    billed at $150/hour.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Warranty</h4>
                  <p>
                    30-day warranty on all work delivered. Bugs fixed at no
                    additional cost.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleAcceptQuote}
                disabled={isAccepting}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {isAccepting ? "Processing..." : "Accept Quote & Sign Contract"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownloadPDF}
                className="px-8 py-3"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              By accepting this quote, you agree to our terms and conditions.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-2">Questions about this proposal?</p>
            <p className="text-sm text-gray-500">
              Contact us at{" "}
              <a
                href="mailto:hello@magebase.site"
                className="text-blue-600 hover:underline"
              >
                hello@magebase.site
              </a>{" "}
              or call +61 412 345 678
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
