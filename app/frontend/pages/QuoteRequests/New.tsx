import { Head, Link, router, useForm } from "@inertiajs/react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";

interface Feature {
  id: number;
  name: string;
  description: string;
  category: string;
  base_cost: number;
  complexity_level: number;
  dependencies: any;
  requires_customization: boolean;
}

interface Props {
  quote_request: {
    id?: number;
    project_name: string;
    project_description: string;
    use_case: string;
  };
  features: Feature[];
}

export default function New({ quote_request, features }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    project_name: quote_request.project_name || "",
    project_description: quote_request.project_description || "",
    use_case: quote_request.use_case || "",
    client_name: "",
    client_email: "",
    client_phone: "",
    feature_ids: [] as number[],
  });

  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [monthlyRetainer, setMonthlyRetainer] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);

  // Automatically include marketing pages feature
  useEffect(() => {
    const marketingPagesFeature = features.find(
      (f) => f.name === "5_high_converting_seo_marketing_pages"
    );
    if (
      marketingPagesFeature &&
      !selectedFeatures.includes(marketingPagesFeature.id)
    ) {
      const newFeatures = [...selectedFeatures, marketingPagesFeature.id];
      setSelectedFeatures(newFeatures);
      setData("feature_ids", newFeatures);
      calculatePricing(newFeatures, data.use_case);
    }
  }, [features]);

  const handleFeatureToggle = (featureId: number, checked: boolean) => {
    let newSelectedFeatures;
    if (checked) {
      newSelectedFeatures = [...selectedFeatures, featureId];
    } else {
      newSelectedFeatures = selectedFeatures.filter((id) => id !== featureId);
    }
    setSelectedFeatures(newSelectedFeatures);
    setData("feature_ids", newSelectedFeatures);
    calculatePricing(newSelectedFeatures, data.use_case);
  };

  const calculatePricing = (featureIds: number[], useCase: string) => {
    const selectedFeatureObjects = features.filter((f) =>
      featureIds.includes(f.id)
    );
    const baseCosts = {
      "E-commerce Platform": 15000,
      "Social Networking App": 20000,
      "Tenant Management System": 18000,
      "Fitness Tracking App": 16000,
      "Casino/Gaming Application": 25000,
      "Sports Betting Platform": 30000,
      "Neo-bank/FinTech App": 35000,
      "Generator Hire Service": 12000,
      "Tradesperson Service App": 14000,
      "Doctor's Office": 18000,
      "Veterinary Clinic": 16000,
      Dispensary: 20000,
      "Digital Marketing Agency": 15000,
      "Educational Platform": 22000,
      "Logistics and Delivery App": 17000,
      "Event Management System": 16000,
      "Marketplace Platform": 24000,
      "SaaS Application": 28000,
      Other: 15000,
    };

    let baseCost = baseCosts[useCase as keyof typeof baseCosts] || 15000;
    const featureCost = selectedFeatureObjects.reduce(
      (sum, feature) => sum + feature.base_cost,
      0
    );
    const complexityMultiplier = Math.min(
      1 + selectedFeatureObjects.length * 0.1,
      1.8
    );

    const totalCost = (baseCost + featureCost) * complexityMultiplier;
    const retainer = (totalCost * 0.2) / 12;
    const deposit = totalCost * 0.3;

    setEstimatedCost(Math.round(totalCost));
    setMonthlyRetainer(Math.round(retainer));
    setDepositAmount(Math.round(deposit));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/quote_requests", {
      onSuccess: () => {
        router.visit("/quote_requests");
      },
    });
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  const useCaseOptions = [
    "E-commerce Platform",
    "Social Networking App",
    "Tenant Management System",
    "Fitness Tracking App",
    "Casino/Gaming Application",
    "Sports Betting Platform",
    "Neo-bank/FinTech App",
    "Generator Hire Service",
    "Tradesperson Service App",
    "Doctor's Office",
    "Veterinary Clinic",
    "Dispensary",
    "Digital Marketing Agency",
    "Educational Platform",
    "Logistics and Delivery App",
    "Event Management System",
    "Marketplace Platform",
    "SaaS Application",
    "Other",
  ];

  return (
    <>
      <Head title="New Quote Request" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/quote_requests">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quote Requests
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create New Quote Request</h1>
          <p className="text-gray-600 mt-2">
            Fill out the form below to request a quote for your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Company/Client Name</Label>
                  <Input
                    id="client_name"
                    value={data.client_name}
                    onChange={(e) => setData("client_name", e.target.value)}
                    placeholder="Enter company or client name"
                  />
                  {errors.client_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.client_name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="client_email">Email Address</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={data.client_email}
                    onChange={(e) => setData("client_email", e.target.value)}
                    placeholder="Enter email address"
                  />
                  {errors.client_email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.client_email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="client_phone">Phone Number (Optional)</Label>
                <Input
                  id="client_phone"
                  value={data.client_phone}
                  onChange={(e) => setData("client_phone", e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project_name">Project Name</Label>
                <Input
                  id="project_name"
                  value={data.project_name}
                  onChange={(e) => setData("project_name", e.target.value)}
                  placeholder="Enter project name"
                  required
                />
                {errors.project_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.project_name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="use_case">Use Case</Label>
                <Select
                  value={data.use_case}
                  onValueChange={(value) => {
                    setData("use_case", value);
                    calculatePricing(selectedFeatures, value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a use case" />
                  </SelectTrigger>
                  <SelectContent>
                    {useCaseOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.use_case && (
                  <p className="text-red-500 text-sm mt-1">{errors.use_case}</p>
                )}
              </div>

              <div>
                <Label htmlFor="project_description">Project Description</Label>
                <Textarea
                  id="project_description"
                  value={data.project_description}
                  onChange={(e) =>
                    setData("project_description", e.target.value)
                  }
                  placeholder="Describe your project requirements, goals, and any specific features you need..."
                  rows={4}
                  required
                />
                {errors.project_description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.project_description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Requirements</CardTitle>
              <p className="text-sm text-gray-600">
                Select the features and functionality you need for your project.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedFeatures).map(
                  ([category, categoryFeatures]) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold mb-3">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryFeatures.map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-start space-x-3 p-3 border rounded-lg"
                          >
                            <Checkbox
                              id={`feature-${feature.id}`}
                              checked={selectedFeatures.includes(feature.id)}
                              onCheckedChange={(checked) =>
                                handleFeatureToggle(
                                  feature.id,
                                  checked as boolean
                                )
                              }
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={`feature-${feature.id}`}
                                className="font-medium cursor-pointer"
                              >
                                {feature.name ===
                                "5_high_converting_seo_marketing_pages"
                                  ? "5 High Converting, SEO Optimized Marketing Pages"
                                  : feature.name
                                      .replace(/_/g, " ")
                                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">
                                {feature.description}
                              </p>
                              {feature.requires_customization && (
                                <p className="text-xs text-orange-600 mt-1">
                                  ⚠️ Requires customization
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Estimated Pricing</CardTitle>
              <p className="text-sm text-gray-600">
                Real-time cost calculation based on your selections
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Project Cost</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${estimatedCost.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Monthly Retainer</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${monthlyRetainer.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Deposit Required</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${depositAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This is an estimate. Final pricing will
                  be confirmed after our team reviews your specific
                  requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={processing} className="min-w-32">
              {processing ? (
                "Creating..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Create Quote Request
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
