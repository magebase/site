import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Info,
  Shield,
  Clock,
  Star,
  Users,
  Award,
  Zap,
  Quote,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  useCase: string;
  timeline: string;
  deliveryAddress: string;
  specialRequirements: string;
  selectedFeatures: string[];
  redesignCount: number;
  customizationLevel: string;
  integrationComplexity: string;
  pricingModel: string;
  inspiration: string;
  selectedLanguages: string[];
  selectedSocialProviders: string[];
}

interface QuoteFormSectionProps {
  id?: string;
}

function QuoteFormSection({ id = "quote-form" }: QuoteFormSectionProps) {
  const [formState, setFormState] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    useCase: "",
    timeline: "",
    deliveryAddress: "",
    specialRequirements: "",
    selectedFeatures: [],
    redesignCount: 0,
    customizationLevel: "",
    integrationComplexity: "",
    pricingModel: "",
    inspiration: "",
    selectedLanguages: [],
    selectedSocialProviders: [],
  });
  const [estimatedQuote, setEstimatedQuote] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const features = [
    "user_authentication",
    "payment_processing",
    "admin_dashboard",
    "api_development",
    "real_time_features",
    "analytics_tracking",
    "ai_ml",
    "blockchain",
    "google_play_store_ios",
    "pwa",
    "blog_cms",
    "sales_chatbot",
    "customer_support_chatbot",
    "internationalization",
    "crm",
    "social_login",
    "sso",
    "analytics_dashboard",
  ];

  const featureLabels: { [key: string]: string } = {
    user_authentication: "User Authentication",
    payment_processing: "Payment Processing",
    admin_dashboard: "Admin Dashboard",
    api_development: "API Development",
    real_time_features: "Real-time Features",
    analytics_tracking: "Analytics Tracking",
    ai_ml: "AI/ML Features",
    blockchain: "Blockchain Integration",
    google_play_store_ios: "Google Play Store + iOS App Store",
    pwa: "Progressive Web App (PWA)",
    blog_cms: "Blog with CMS",
    sales_chatbot: "Sales Chatbot",
    customer_support_chatbot: "Customer Support Chatbot",
    internationalization: "Internationalization (Multi-language)",
    crm: "CRM System",
    social_login: "Social Login (Google, GitHub, etc.)",
    sso: "Single Sign-On (SSO)",
    analytics_dashboard: "Analytics Dashboard",
  };

  const pricingModels = [
    {
      value: "flat_fee",
      label: "Flat Fee + Hosting",
      description:
        "One-time payment + monthly hosting costs + optional retainer for unlimited edits",
    },
    {
      value: "monthly_subscription",
      label: "Monthly Subscription",
      description:
        "Monthly fee includes full app build + 2-year minimum support with unlimited edits + 3-month bond",
    },
  ];

  const useCaseTemplates = [
    "E-commerce Platform",
    "Social Networking App",
    "Healthcare Management System",
    "Fitness & Wellness App",
    "Gaming Platform",
    "Financial Services App",
    "Service Booking Platform",
    "Business Management Software",
    "Educational Platform",
    "Real Estate Marketplace",
    "Logistics & Delivery App",
    "Event Management System",
    "SaaS Application",
    "Content Management System",
    "Customer Relationship Management",
    "Project Management Tool",
    "Inventory Management System",
    "Appointment Scheduling App",
    "Learning Management System",
    "Property Management System",
    "Food Delivery Platform",
    "Ride-Sharing App",
    "Streaming Service",
    "E-learning Platform",
    "Telemedicine App",
    "Cryptocurrency Exchange",
    "Job Board Platform",
    "Review & Rating Platform",
    "Subscription Box Service",
    "Community Forum Platform",
  ];

  const timelineOptions = [
    "ASAP (Rush)",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3-6 months",
    "6+ months",
  ];

  const customizationLevels = [
    "Basic (minimal customization)",
    "Standard (moderate customization)",
    "Advanced (extensive customization)",
    "Enterprise (full custom solution)",
  ];

  const integrationComplexities = [
    "Simple (no integrations)",
    "Moderate (1-2 integrations)",
    "Complex (3-5 integrations)",
    "Enterprise (5+ integrations)",
  ];

  useEffect(() => {
    // Initialize AOS if available
    if (typeof window !== "undefined" && (window as any).AOS) {
      (window as any).AOS.init({ once: true, duration: 700 });
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleFeatureToggle(feature: string) {
    setFormState((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter((f) => f !== feature)
        : [...prev.selectedFeatures, feature],
    }));
  }

  function handleSelectChange(name: string, value: string) {
    setFormState({ ...formState, [name]: value });
  }

  function getCompletedFieldsCount() {
    const requiredFields = [
      "name",
      "email",
      "phone",
      "companyName",
      "useCase",
      "timeline",
      "deliveryAddress",
    ];
    return requiredFields.filter(
      (field) =>
        formState[field as keyof QuoteFormData]?.toString().trim() !== ""
    ).length;
  }

  function getWordCount(text: string): number {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }

  function isValidWordCount(text: string): boolean {
    return getWordCount(text) >= 25;
  }

  function calculateEstimatedCost() {
    let baseCost = 5000;
    const featureMultiplier = formState.selectedFeatures.length * 500;
    const customizationMultiplier =
      customizationLevels.indexOf(formState.customizationLevel) + 1;
    const complexityMultiplier =
      integrationComplexities.indexOf(formState.integrationComplexity) + 1;
    const redesignCost = formState.redesignCount * 1000;

    return (
      baseCost +
      featureMultiplier +
      customizationMultiplier * 1000 +
      complexityMultiplier * 1500 +
      redesignCost
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Check word count validation
    if (!isValidWordCount(formState.specialRequirements)) {
      alert(
        "Please provide at least 25 words in the project requirements field."
      );
      return;
    }

    fetch("/quote_requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
      },
      body: JSON.stringify({
        quote_request: {
          ...formState,
          estimatedCost: calculateEstimatedCost(),
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
        } else {
          throw new Error("Failed to submit quote request");
        }
      })
      .catch((error) => {
        console.error("Error submitting quote request:", error);
        alert(
          "There was an error submitting your quote request. Please try again."
        );
      });
  }

  function getQuoteEstimate() {
    setIsCalculating(true);

    fetch("/api/quotes/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
      },
      body: JSON.stringify({
        use_case: formState.useCase,
        timeline: formState.timeline,
        customization_level: formState.customizationLevel,
        integration_complexity: formState.integrationComplexity,
        redesign_count: formState.redesignCount,
        selected_features: formState.selectedFeatures,
        pricing_model: formState.pricingModel,
        inspiration: formState.inspiration,
        selected_languages: formState.selectedLanguages,
        selected_social_providers: formState.selectedSocialProviders,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEstimatedQuote(data.estimate);
        } else {
          throw new Error(data.error || "Failed to get quote estimate");
        }
      })
      .catch((error) => {
        console.error("Error getting quote estimate:", error);
        alert("There was an error calculating your quote. Please try again.");
      })
      .finally(() => {
        setIsCalculating(false);
      });
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Project Request Submitted Successfully!
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for choosing us! Our team will review your requirements and
          get back to you within 1 hour.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            What happens next?
          </h4>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span className="text-gray-700">
                Our team reviews your project details
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="text-gray-700">
                We send you a detailed project proposal
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <span className="text-gray-700">
                Schedule a call to discuss next steps
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-2"
          >
            Submit Another Project
          </Button>
          <Button
            onClick={() => window.open("mailto:hello@magebase.com", "_blank")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Contact Support
          </Button>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div id={id} className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-12">
          {/* Trust Signals Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-6 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-600" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Response in 1 hour</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-purple-600" />
                <span>500+ Projects</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>

            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Get Your Custom Quote in 60 Seconds
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Join 500+ businesses who've transformed their operations with our
              solutions
            </p>

            {/* Urgency Element */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-amber-800">
                <Award className="w-5 h-5" />
                <span className="font-semibold">
                  Limited Time: Free Strategy Session Worth $500
                </span>
              </div>
              <p className="text-amber-700 text-sm mt-1">
                First 10 inquiries today get a complimentary 30-minute strategy
                call with our CTO
              </p>
            </div>
          </div>

          {/* Social Proof Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-1 mb-2">
                <Quote className="w-4 h-4 text-green-600" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-green-800 text-sm font-medium mb-1">
                "Exceeded expectations!"
              </p>
              <p className="text-green-700 text-xs">
                - Sarah M., CEO TechStart
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-1 mb-2">
                <Quote className="w-4 h-4 text-blue-600" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-blue-800 text-sm font-medium mb-1">
                "Delivered on time & budget"
              </p>
              <p className="text-blue-700 text-xs">
                - Mike R., Founder HealthTech
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-1 mb-2">
                <Quote className="w-4 h-4 text-purple-600" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-purple-800 text-sm font-medium mb-1">
                "Outstanding quality & support"
              </p>
              <p className="text-purple-700 text-xs">
                - Jennifer L., CTO FinanceFlow
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Enhanced Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">
                  Project Setup Progress
                </span>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {getCompletedFieldsCount()}/7 completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(getCompletedFieldsCount() / 7) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span
                  className={
                    getCompletedFieldsCount() >= 1
                      ? "text-blue-600 font-medium"
                      : ""
                  }
                >
                  Contact
                </span>
                <span
                  className={
                    getCompletedFieldsCount() >= 3
                      ? "text-blue-600 font-medium"
                      : ""
                  }
                >
                  Project
                </span>
                <span
                  className={
                    getCompletedFieldsCount() >= 5
                      ? "text-blue-600 font-medium"
                      : ""
                  }
                >
                  Details
                </span>
                <span
                  className={
                    getCompletedFieldsCount() >= 7
                      ? "text-blue-600 font-medium"
                      : ""
                  }
                >
                  Complete
                </span>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full name *
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your full legal name for contract purposes</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address *
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>We'll use this for all project communications</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number *
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Include country code for international calls</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="+61 XXX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company name *
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Name of your business or organization</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formState.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Your company name"
                />
              </div>
            </div>

            {/* Pricing Model Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Label className="block text-sm font-medium text-gray-700">
                  Pricing Model *
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose how you'd like to pay for your project</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="space-y-3">
                {pricingModels.map((model) => (
                  <div
                    key={model.value}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      formState.pricingModel === model.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      handleSelectChange("pricingModel", model.value)
                    }
                  >
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="pricingModel"
                        value={model.value}
                        checked={formState.pricingModel === model.value}
                        onChange={() =>
                          handleSelectChange("pricingModel", model.value)
                        }
                        className="mt-1 mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {model.label}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {model.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="block text-sm font-medium text-gray-700">
                    Project type *
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the type of application you want to build</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select
                  value={formState.useCase}
                  onValueChange={(value) =>
                    handleSelectChange("useCase", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {useCaseTemplates.map((template) => (
                      <SelectItem key={template} value={template}>
                        {template}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="block text-sm font-medium text-gray-700">
                    Project timeline *
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How quickly do you need this project completed?</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select
                  value={formState.timeline}
                  onValueChange={(value) =>
                    handleSelectChange("timeline", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="block text-sm font-medium text-gray-700">
                    Customization level *
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        How much customization do you need from our base
                        templates?
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select
                  value={formState.customizationLevel}
                  onValueChange={(value) =>
                    handleSelectChange("customizationLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customization level" />
                  </SelectTrigger>
                  <SelectContent>
                    {customizationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="block text-sm font-medium text-gray-700">
                    Integration complexity *
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How many external services need to be integrated?</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select
                  value={formState.integrationComplexity}
                  onValueChange={(value) =>
                    handleSelectChange("integrationComplexity", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select integration complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    {integrationComplexities.map((complexity) => (
                      <SelectItem key={complexity} value={complexity}>
                        {complexity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="block text-sm font-medium text-gray-700">
                  Company location *
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      City, state, and country for legal and timezone purposes
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative group">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  name="deliveryAddress"
                  value={formState.deliveryAddress}
                  onChange={handleChange}
                  required
                  className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  placeholder="City, State/Country or 'Remote'"
                />
              </div>
            </div>

            {/* Inspiration */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label
                  htmlFor="inspiration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Design Inspiration (Optional)
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Share websites or apps you like. Include URLs for
                      reference.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea
                id="inspiration"
                name="inspiration"
                value={formState.inspiration}
                onChange={handleChange}
                rows={3}
                placeholder="Describe websites, apps, or designs you like. Include URLs if possible (e.g., 'I love the clean design of airbnb.com and the user experience of stripe.com')"
              />
            </div>

            {/* Internationalization - Languages */}
            {formState.selectedFeatures.includes("internationalization") && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Label className="block text-sm font-medium text-gray-700">
                    Languages for Internationalization (Select all that apply)
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select languages your app needs to support</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Italian",
                    "Portuguese",
                    "Russian",
                    "Chinese (Simplified)",
                    "Chinese (Traditional)",
                    "Japanese",
                    "Korean",
                    "Arabic",
                    "Hindi",
                    "Dutch",
                    "Swedish",
                    "Norwegian",
                    "Danish",
                    "Finnish",
                    "Polish",
                    "Turkish",
                    "Hebrew",
                    "Thai",
                    "Vietnamese",
                    "Indonesian",
                    "Malay",
                    "Other",
                  ].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${language}`}
                        checked={formState.selectedLanguages.includes(language)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormState({
                              ...formState,
                              selectedLanguages: [
                                ...formState.selectedLanguages,
                                language,
                              ],
                            });
                          } else {
                            setFormState({
                              ...formState,
                              selectedLanguages:
                                formState.selectedLanguages.filter(
                                  (lang) => lang !== language
                                ),
                            });
                          }
                        }}
                      />
                      <Label
                        htmlFor={`lang-${language}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Login Providers */}
            {formState.selectedFeatures.includes("social_login") && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Label className="block text-sm font-medium text-gray-700">
                    Social Login Providers (Select all that apply)
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose which social platforms users can log in with</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Google",
                    "GitHub",
                    "Facebook",
                    "Twitter/X",
                    "LinkedIn",
                    "Microsoft",
                    "Apple",
                    "Discord",
                    "Slack",
                    "Twitch",
                    "Spotify",
                    "Other",
                  ].map((provider) => (
                    <div key={provider} className="flex items-center space-x-2">
                      <Checkbox
                        id={`social-${provider}`}
                        checked={formState.selectedSocialProviders.includes(
                          provider
                        )}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormState({
                              ...formState,
                              selectedSocialProviders: [
                                ...formState.selectedSocialProviders,
                                provider,
                              ],
                            });
                          } else {
                            setFormState({
                              ...formState,
                              selectedSocialProviders:
                                formState.selectedSocialProviders.filter(
                                  (p) => p !== provider
                                ),
                            });
                          }
                        }}
                      />
                      <Label
                        htmlFor={`social-${provider}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {provider}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Label className="block text-sm font-medium text-gray-700">
                  Select features you need ({formState.selectedFeatures.length}{" "}
                  selected)
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose the features your application requires</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formState.selectedFeatures.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Label
                      htmlFor={feature}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {featureLabels[feature] || feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Redesign Count */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="block text-sm font-medium text-gray-700">
                  Number of UI redesign iterations needed
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>How many design revisions do you anticipate needing?</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={formState.redesignCount.toString()}
                onValueChange={(value) =>
                  handleSelectChange("redesignCount", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select redesign count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 (Use our design)</SelectItem>
                  <SelectItem value="1">1 iteration</SelectItem>
                  <SelectItem value="2">2 iterations</SelectItem>
                  <SelectItem value="3">3 iterations</SelectItem>
                  <SelectItem value="5">5+ iterations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Requirements */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label
                  htmlFor="specialRequirements"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project requirements *
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Describe your project in detail (minimum 25 words
                      required)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formState.specialRequirements}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your project requirements, features, technologies you prefer, or any specific needs..."
                className={
                  getWordCount(formState.specialRequirements) > 0 &&
                  !isValidWordCount(formState.specialRequirements)
                    ? "border-red-300 focus:border-red-500"
                    : ""
                }
              />
              {getWordCount(formState.specialRequirements) > 0 && (
                <div className="mt-1 text-sm">
                  <span
                    className={
                      isValidWordCount(formState.specialRequirements)
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {getWordCount(formState.specialRequirements)} words
                    {!isValidWordCount(formState.specialRequirements) &&
                      " (minimum 25 words required)"}
                  </span>
                </div>
              )}
            </div>

            {/* Enhanced Cost Estimate */}
            {formState.selectedFeatures.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your Custom Project Quote
                  </h3>
                  <p className="text-gray-600 text-sm">
                    AI-powered estimation based on your requirements
                  </p>
                </div>

                {estimatedQuote ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                        $
                        {estimatedQuote.estimated_cost?.toLocaleString() || "0"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Total Project Cost
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-gray-600">Development</p>
                        <p className="font-semibold text-gray-900">
                          ${estimatedQuote.base_cost?.toLocaleString() || "0"}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-gray-600">Monthly Hosting</p>
                        <p className="font-semibold text-gray-900">
                          ${estimatedQuote.monthly_hosting?.toFixed(2) || "0"}
                        </p>
                      </div>
                    </div>

                    {/* Urgency Timer */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-center justify-center gap-2 text-amber-800 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold text-sm">
                          Quote expires in: 24:00:00
                        </span>
                      </div>
                      <p className="text-amber-700 text-xs text-center">
                        Secure this price before it changes
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        ${calculateEstimatedCost().toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-sm">Starting Estimate</p>
                    </div>
                    <Button
                      type="button"
                      onClick={getQuoteEstimate}
                      disabled={isCalculating}
                      variant="outline"
                      className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      {isCalculating
                        ? "🔄 Calculating..."
                        : "🎯 Get AI-Powered Quote"}
                    </Button>
                    <p className="text-xs text-gray-500">
                      Get a precise quote tailored to your specific needs
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* AI Insights Display */}
            {estimatedQuote && estimatedQuote.ai_insights && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  AI Project Insights
                </h3>
                <div className="space-y-3">
                  {estimatedQuote.ai_insights.business_tags &&
                    estimatedQuote.ai_insights.business_tags.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-blue-800 mb-2">
                          Business Tags:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {estimatedQuote.ai_insights.business_tags.map(
                            (tag: string, index: number) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  {estimatedQuote.ai_insights.adjusted_quote && (
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-2">
                        AI-Adjusted Quote Reasoning:
                      </p>
                      <p className="text-sm text-blue-700 bg-white p-3 rounded border">
                        {estimatedQuote.ai_insights.adjusted_quote}
                      </p>
                    </div>
                  )}
                  {estimatedQuote.ai_insights.recommendations &&
                    estimatedQuote.ai_insights.recommendations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-blue-800 mb-2">
                          Recommendations:
                        </p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {estimatedQuote.ai_insights.recommendations.map(
                            (rec: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            )}

            <div className="text-center pt-4 space-y-3">
              {!estimatedQuote && formState.selectedFeatures.length > 0 && (
                <Button
                  type="button"
                  onClick={getQuoteEstimate}
                  disabled={isCalculating}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3"
                >
                  {isCalculating
                    ? "Calculating..."
                    : "🚀 Get Your Custom Quote Now"}
                </Button>
              )}
              {estimatedQuote && (
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3"
                >
                  ✅ Secure Your Project Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}

              {/* Risk Reversal */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-center gap-2 text-green-800 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">
                    100% Risk-Free Guarantee
                  </span>
                </div>
                <p className="text-green-700 text-sm">
                  Not satisfied? Get a full refund within 30 days, no questions
                  asked.
                </p>
              </div>

              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                No commitment required • Response within 1 hour • Free
                consultation
              </p>
            </div>
          </form>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default QuoteFormSection;
