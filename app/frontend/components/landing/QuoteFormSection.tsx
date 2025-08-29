import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import * as z from "zod";
import { toast } from "sonner";
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
  Building2,
  ShoppingCart,
  Truck,
  Wrench,
  Banknote,
  Gamepad2,
  Megaphone,
  Bitcoin,
  Dumbbell,
  Calendar,
  Heart,
  GraduationCap,
  BookOpen,
  Briefcase,
  Users2,
  Target,
  Car,
  Route,
  CalendarDays,
  Globe,
  Gamepad,
  Calendar as CalendarIcon,
  FileText,
  Newspaper,
  Package,
  BookOpen as BookIcon,
  Building,
  Settings,
  Play,
  Briefcase as BriefcaseIcon,
  Star as StarIcon,
  Box,
  MessageSquare,
  Wrench as WrenchIcon,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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

// Zod schema for form validation (for client-side validation if needed)
const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  useCase: z.string().min(1, "Please select a project type"),
  velocity: z.string().min(1, "Please select a velocity"),
  deliveryAddress: z.string().min(2, "Please enter a delivery address"),
  specialRequirements: z
    .string()
    .refine(
      (val) => val.split(/\s+/).filter((word) => word.length > 0).length >= 25,
      "Please provide at least 25 words in the project requirements"
    ),
  selectedFeatures: z.array(z.string()),
  redesignCount: z.number().min(0),
  customizationLevel: z.string().min(1, "Please select a customization level"),
  integrationComplexity: z
    .string()
    .min(1, "Please select integration complexity"),
  pricingModel: z.string().min(1, "Please select a pricing model"),
  inspiration: z.string().optional(),
  selectedLanguages: z.array(z.string()),
  selectedSocialProviders: z.array(z.string()),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface QuoteFormSectionProps {
  id?: string;
}

function QuoteFormSection({ id = "quote-form" }: QuoteFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      useCase: "",
      velocity: "",
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
    },
  });

  const features = [
    "user_authentication",
    "payment_processing",
    "admin_dashboard",
    "api_development",
    "real_time_features",
    "gambling_or_igaming",
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
    "automated_digital_marketing",
    "autoblogger",
    "publisher",
  ];

  const featureLabels: { [key: string]: string } = {
    user_authentication: "User Authentication",
    payment_processing: "Payment Processing",
    admin_dashboard: "Admin Dashboard",
    api_development: "API Development",
    gambling_or_igaming: "Gambling or iGaming",
    real_time_features: "Real-time Features",
    analytics_tracking: "Analytics Tracking",
    marketing: "5 High Converting, SEO Optimized Marketing Pages",
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
    automated_digital_marketing: "Automated Ad Media and Digital Marketing",
    autoblogger: "Autoblogger (AI Content Generation)",
    publisher: "Earn Ad Revenue as a Publisher",
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
    "Small Business Branded Site",
    "E-commerce",
    "Food Delivery",
    "Equipment Hire",
    "Financial Services or Banking",
    "Gambling or iGaming",
    "Digital Marketing Agency Site",
    "Cryptocurrency Exchange",
    "Fitness & Wellness",
    "Service Booking",
    "Healthcare Management System",
    "Telemedicine",
    "Educational",
    "E-learning",
    "Business Management Software",
    "Customer Relationship Management",
    "Project Management Tool",
    "Ride-Sharing",
    "Logistics & Delivery",
    "Appointment Scheduling",
    "Social Networking",
    "Video Gaming",
    "Event Management System",
    "Content Management System",
    "News Website",
    "Inventory Management System",
    "Learning Management System",
    "Property Management System",
    "Internal Tool",
    "Streaming Service",
    "Job Board",
    "Review & Rating",
    "Subscription Box Service",
    "Community Forum",
    "Custom Application",
  ];

  // Icon mapping for use cases
  const useCaseIcons: Record<
    string,
    React.ComponentType<{ className?: string }>
  > = {
    "Small Business Branded Site": Building2,
    "E-commerce": ShoppingCart,
    "Food Delivery": Truck,
    "Equipment Hire": Wrench,
    "Financial Services or Banking": Banknote,
    "Gambling or iGaming": Gamepad2,
    "Digital Marketing Agency Site": Megaphone,
    "Cryptocurrency Exchange": Bitcoin,
    "Fitness & Wellness": Dumbbell,
    "Service Booking": Calendar,
    "Healthcare Management System": Heart,
    Telemedicine: Heart,
    Educational: GraduationCap,
    "E-learning": BookOpen,
    "Business Management Software": Briefcase,
    "Customer Relationship Management": Users2,
    "Project Management Tool": Target,
    "Ride-Sharing": Car,
    "Logistics & Delivery": Route,
    "Appointment Scheduling": CalendarDays,
    "Social Networking": Globe,
    "Video Gaming": Gamepad,
    "Event Management System": CalendarIcon,
    "Content Management System": FileText,
    "News Website": Newspaper,
    "Inventory Management System": Package,
    "Learning Management System": BookIcon,
    "Property Management System": Building,
    "Internal Tool": Settings,
    "Streaming Service": Play,
    "Job Board": BriefcaseIcon,
    "Review & Rating": StarIcon,
    "Subscription Box Service": Box,
    "Community Forum": MessageSquare,
    "Custom Application": WrenchIcon,
  };

  const velocityOptions = ["Standard", "Fast", "Express"];

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

  function getCompletedFieldsCount() {
    const values = form.getValues();
    const requiredFields = [
      "name",
      "email",
      "phone",
      "companyName",
      "useCase",
      "velocity",
      "deliveryAddress",
    ];
    return requiredFields.filter(
      (field) => values[field as keyof QuoteFormData]?.toString().trim() !== ""
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
    const values = form.getValues();
    const featureMultiplier = (values.selectedFeatures?.length || 0) * 500;
    const customizationMultiplier =
      customizationLevels.indexOf(values.customizationLevel || "") + 1;
    const integrationMultiplier =
      integrationComplexities.indexOf(values.integrationComplexity || "") + 1;
    const redesignCost = (values.redesignCount || 0) * 1000;

    return Math.max(
      5000,
      baseCost +
        featureMultiplier +
        customizationMultiplier * 2000 +
        integrationMultiplier * 1500 +
        redesignCost
    );
  }

  function onSubmit(values: QuoteFormData) {
    if (!isValidWordCount(values.specialRequirements)) {
      return;
    }

    // Calculate estimated cost before submission
    const estimatedCost = calculateEstimatedCost();

    router.post(
      "/quote_requests",
      {
        quote_request: {
          ...values,
          estimatedCost,
        },
      },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
        onError: (errors) => {
          console.error("Form submission errors:", errors);
          toast.error(
            "There was an error submitting your quote request. Please try again."
          );
        },
      }
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          📧 Proposal Sent!
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Check your email for your personalized project proposal with detailed
          timeline and pricing.
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
                Check your email for the proposal link
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="text-gray-700">
                Click the link to view your detailed proposal
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <span className="text-gray-700">
                Review your detailed quote and project timeline
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">4</span>
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
                  FREE DETAILED QUOTE WITH PROJECT TIMELINE
                </span>
              </div>
              <p className="text-amber-700 text-sm mt-1">
                Get your personalized quote with detailed project timeline
                delivered to your email
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

          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                    style={{
                      width: `${(getCompletedFieldsCount() / 7) * 100}%`,
                    }}
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Full name *
                          </FormLabel>
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
                          <FormControl>
                            <Input
                              {...field}
                              className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                              placeholder="Your full name"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Email address *
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                We'll use this for all project communications
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                              placeholder="your@email.com"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Phone number *
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Include country code for international calls
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                              placeholder="+61 XXX XXX XXX"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Company name *
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Name of your business or organization</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="Your company name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Pricing Model Selection */}
              <FormField
                control={form.control}
                name="pricingModel"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mb-4">
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Pricing Model *
                      </FormLabel>
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
                            field.value === model.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => field.onChange(model.value)}
                        >
                          <div className="flex items-start">
                            <input
                              type="radio"
                              name="pricingModel"
                              value={model.value}
                              checked={field.value === model.value}
                              onChange={() => field.onChange(model.value)}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormField
                    control={form.control}
                    name="useCase"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Project type *
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Select the type of application you want to build
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {useCaseTemplates.map((template) => {
                              const IconComponent = useCaseIcons[template];
                              return (
                                <SelectItem key={template} value={template}>
                                  <div className="flex items-center gap-2">
                                    {IconComponent && (
                                      <IconComponent className="w-4 h-4" />
                                    )}
                                    <span>{template}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="velocity"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Project velocity *
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                How quickly do you need this project completed?
                                Higher velocities cost more.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select velocity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {velocityOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="customizationLevel"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Customization level *
                          </FormLabel>
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
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select customization level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customizationLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="integrationComplexity"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Integration complexity *
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                How many external services need to be
                                integrated?
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select integration complexity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {integrationComplexities.map((complexity) => (
                              <SelectItem key={complexity} value={complexity}>
                                {complexity}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Company Location */}
              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Company location *
                      </FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            City, state, and country for legal and timezone
                            purposes
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <FormControl>
                        <Input
                          {...field}
                          className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          placeholder="City, State/Country or 'Remote'"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Inspiration */}
              <FormField
                control={form.control}
                name="inspiration"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Design Inspiration (Optional)
                      </FormLabel>
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
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        placeholder="Describe websites, apps, or designs you like. Include URLs if possible (e.g., 'I love the clean design of airbnb.com and the user experience of stripe.com')"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Internationalization - Languages */}
              {form
                .watch("selectedFeatures")
                ?.includes("internationalization") && (
                <FormField
                  control={form.control}
                  name="selectedLanguages"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-4">
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          Languages for Internationalization (Select all that
                          apply)
                        </FormLabel>
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
                          <div
                            key={language}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`lang-${language}`}
                              checked={field.value?.includes(language) || false}
                              onCheckedChange={(checked) => {
                                const currentLanguages = field.value || [];
                                const updatedLanguages = checked
                                  ? [...currentLanguages, language]
                                  : currentLanguages.filter(
                                      (lang: string) => lang !== language
                                    );
                                field.onChange(updatedLanguages);
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Social Login Providers */}
              {form.watch("selectedFeatures")?.includes("social_login") && (
                <FormField
                  control={form.control}
                  name="selectedSocialProviders"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-4">
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          Social Login Providers (Select all that apply)
                        </FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Choose which social platforms users can log in
                              with
                            </p>
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
                          <div
                            key={provider}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`social-${provider}`}
                              checked={field.value?.includes(provider) || false}
                              onCheckedChange={(checked) => {
                                const currentProviders = field.value || [];
                                const updatedProviders = checked
                                  ? [...currentProviders, provider]
                                  : currentProviders.filter(
                                      (p: string) => p !== provider
                                    );
                                field.onChange(updatedProviders);
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Features Selection */}
              <FormField
                control={form.control}
                name="selectedFeatures"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mb-4">
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Select features you need ({field.value?.length || 0}{" "}
                        selected)
                      </FormLabel>
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
                      {features.map((feature, index) => (
                        <div
                          key={`feature-${index}-${feature}`}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={feature}
                            checked={field.value?.includes(feature) || false}
                            onCheckedChange={(checked) => {
                              const currentFeatures = field.value || [];
                              const newFeatures = checked
                                ? [...currentFeatures, feature]
                                : currentFeatures.filter((f) => f !== feature);
                              field.onChange(newFeatures);
                            }}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Redesign Count */}
              <FormField
                control={form.control}
                name="redesignCount"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Number of UI redesign iterations needed
                      </FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            How many design revisions do you anticipate needing?
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString() || "0"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select redesign count" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">0 (Use our design)</SelectItem>
                        <SelectItem value="1">1 iteration</SelectItem>
                        <SelectItem value="2">2 iterations</SelectItem>
                        <SelectItem value="3">3 iterations</SelectItem>
                        <SelectItem value="5">5+ iterations</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Requirements */}
              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Project requirements *
                      </FormLabel>
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
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Describe your project requirements, features, or any specific needs..."
                        className={
                          getWordCount(field.value) > 0 &&
                          !isValidWordCount(field.value)
                            ? "border-red-300 focus:border-red-500"
                            : ""
                        }
                      />
                    </FormControl>
                    {getWordCount(field.value) > 0 && (
                      <div className="mt-1 text-sm">
                        <span
                          className={
                            isValidWordCount(field.value)
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {getWordCount(field.value)} words
                          {!isValidWordCount(field.value) &&
                            " (minimum 25 words required)"}
                        </span>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quote Request Message */}
              {form.watch("selectedFeatures") &&
                form.watch("selectedFeatures").length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Ready to Get Your Quote?
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Submit your project details and we'll send you a
                        personalized quote via email
                      </p>
                    </div>

                    <div className="text-center space-y-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          📧 Check your email after submission
                        </p>
                        <p className="text-gray-600 text-sm">
                          We'll send you a secure link to view your detailed
                          project proposal
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Your proposal will include project timeline, detailed
                        breakdown, and next steps
                      </p>
                    </div>
                  </div>
                )}

              <div className="text-center pt-4 space-y-3">
                {form.watch("selectedFeatures") &&
                  form.watch("selectedFeatures").length > 0 && (
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3"
                    >
                      📧 Send Me My Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}

                {/* Risk Reversal */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-center gap-2 text-green-800 mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">
                      MVP 100% GUARANTEE IN 30 DAYS
                    </span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Get your minimum viable product delivered within 30 days or
                    your money back, guaranteed.
                  </p>
                </div>

                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  No commitment required • Response within 1 hour • Free
                  consultation
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default QuoteFormSection;
