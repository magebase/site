import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ArrowRight,
  ChevronRight,
  Zap,
  Users,
  ShoppingCart,
  Heart,
  Briefcase,
  Gamepad2,
  Building2,
} from "lucide-react";
import { Link } from "@inertiajs/react";

// Use case data organized by categories (from UseCasesMegaMenu)
const useCaseCategories = {
  "Business Tools": {
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    items: [
      {
        slug: "small-business-branded-site",
        title: "Small Business Branded Site",
        subtitle: "Professional online presence",
        description: "Custom websites for local businesses and startups",
      },
      {
        slug: "digital-marketing-agency-site",
        title: "Digital Marketing Agency Site",
        subtitle: "Showcase your expertise",
        description: "Portfolio websites for marketing agencies",
      },
      {
        slug: "business-management-software",
        title: "Business Management Software",
        subtitle: "Streamline operations",
        description: "Custom software for business processes",
      },
      {
        slug: "customer-relationship-management",
        title: "Customer Relationship Management",
        subtitle: "Manage customer relationships",
        description: "CRM systems for better customer engagement",
      },
      {
        slug: "project-management-tool",
        title: "Project Management Tool",
        subtitle: "Organize and track projects",
        description: "Custom project management solutions",
      },
      {
        slug: "internal-tool",
        title: "Internal Tool",
        subtitle: "Custom business applications",
        description: "Tailored software for internal use",
      },
    ],
  },
  "Online Commerce": {
    icon: ShoppingCart,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    items: [
      {
        slug: "e-commerce",
        title: "E-commerce Solutions",
        subtitle: "Online stores and marketplaces",
        description: "Complete e-commerce platforms",
      },
      {
        slug: "subscription-box-service",
        title: "Subscription Box Service",
        subtitle: "Recurring revenue platforms",
        description: "Subscription-based e-commerce",
      },
      {
        slug: "marketplace-platform",
        title: "Marketplace Platform",
        subtitle: "Multi-vendor marketplaces",
        description: "Connect buyers and sellers",
      },
    ],
  },
  "Health & Medical": {
    icon: Heart,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    items: [
      {
        slug: "healthcare-management-system",
        title: "Healthcare Management System",
        subtitle: "Medical practice management",
        description: "Comprehensive healthcare solutions",
      },
      {
        slug: "telemedicine",
        title: "Telemedicine",
        subtitle: "Remote healthcare delivery",
        description: "Virtual consultation platforms",
      },
      {
        slug: "fitness-wellness",
        title: "Fitness & Wellness",
        subtitle: "Health and fitness apps",
        description: "Wellness tracking and management",
      },
      {
        slug: "doctor-s-office",
        title: "Doctor's Office",
        subtitle: "Medical practice websites",
        description: "Healthcare provider websites",
      },
      {
        slug: "veterinary-clinic",
        title: "Veterinary Clinic",
        subtitle: "Animal healthcare management",
        description: "Veterinary practice solutions",
      },
    ],
  },
  "Service Management": {
    icon: Users,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    items: [
      {
        slug: "food-delivery",
        title: "Food Delivery",
        subtitle: "Restaurant delivery platforms",
        description: "Food ordering and delivery systems",
      },
      {
        slug: "equipment-hire",
        title: "Equipment Hire",
        subtitle: "Equipment rental platforms",
        description: "Rental and booking systems",
      },
      {
        slug: "service-booking",
        title: "Service Booking",
        subtitle: "Appointment scheduling",
        description: "Service provider booking systems",
      },
      {
        slug: "logistics-delivery",
        title: "Logistics & Delivery",
        subtitle: "Supply chain management",
        description: "Logistics and delivery solutions",
      },
      {
        slug: "appointment-scheduling",
        title: "Appointment Scheduling",
        subtitle: "Booking management",
        description: "Appointment booking platforms",
      },
      {
        slug: "tradesperson-service-app",
        title: "Tradesperson Service App",
        subtitle: "Service provider platforms",
        description: "Connect tradespeople with customers",
      },
      {
        slug: "property-management-system",
        title: "Property Management System",
        subtitle: "Rental property management",
        description: "Property management solutions",
      },
    ],
  },
  "Finance & Banking": {
    icon: Briefcase,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
    items: [
      {
        slug: "financial-services-or-banking",
        title: "Financial Services/Banking",
        subtitle: "Banking and finance platforms",
        description: "Financial service applications",
      },
      {
        slug: "cryptocurrency-exchange",
        title: "Cryptocurrency Exchange",
        subtitle: "Crypto trading platforms",
        description: "Digital currency exchange systems",
      },
      {
        slug: "neo-banks-fintech-apps",
        title: "Neo-banks/FinTech Apps",
        subtitle: "Modern banking solutions",
        description: "Next-generation financial apps",
      },
    ],
  },
  "Gaming & Media": {
    icon: Gamepad2,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    borderColor: "border-pink-200",
    items: [
      {
        slug: "gambling-or-igaming",
        title: "Gambling/iGaming",
        subtitle: "Online gaming platforms",
        description: "Casino and betting applications",
      },
      {
        slug: "video-gaming",
        title: "Video Gaming",
        subtitle: "Gaming applications",
        description: "Video game platforms and tools",
      },
      {
        slug: "streaming-service",
        title: "Streaming Service",
        subtitle: "Video/audio streaming",
        description: "Media streaming platforms",
      },
    ],
  },
  "Learning & Community": {
    icon: Users,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
    items: [
      {
        slug: "educational",
        title: "Educational",
        subtitle: "Learning management systems",
        description: "Education and training platforms",
      },
      {
        slug: "e-learning",
        title: "E-learning",
        subtitle: "Online learning platforms",
        description: "Digital education solutions",
      },
      {
        slug: "learning-management-system",
        title: "Learning Management System",
        subtitle: "Course management",
        description: "Comprehensive LMS solutions",
      },
      {
        slug: "social-networking",
        title: "Social Networking",
        subtitle: "Social media platforms",
        description: "Community and social applications",
      },
      {
        slug: "community-forum",
        title: "Community Forum",
        subtitle: "Discussion platforms",
        description: "Online community solutions",
      },
    ],
  },
  "Specialized Solutions": {
    icon: Zap,
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    borderColor: "border-gray-200",
    items: [
      {
        slug: "ride-sharing",
        title: "Ride-Sharing",
        subtitle: "Transportation platforms",
        description: "Ride-sharing and transportation apps",
      },
      {
        slug: "event-management-system",
        title: "Event Management System",
        subtitle: "Event planning and management",
        description: "Event organization platforms",
      },
      {
        slug: "content-management-system",
        title: "Content Management System",
        subtitle: "Content creation and publishing",
        description: "CMS for content management",
      },
      {
        slug: "inventory-management-system",
        title: "Inventory Management System",
        subtitle: "Stock and inventory control",
        description: "Inventory tracking solutions",
      },
      {
        slug: "job-board",
        title: "Job Board",
        subtitle: "Employment platforms",
        description: "Job posting and recruitment",
      },
      {
        slug: "review-rating",
        title: "Review & Rating",
        subtitle: "Feedback and review systems",
        description: "Review and rating platforms",
      },
      {
        slug: "custom-application",
        title: "Custom Application",
        subtitle: "Tailored software solutions",
        description: "Custom-built applications",
      },
    ],
  },
};

interface UseCasesIndexProps {
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function UseCasesIndex({ user }: UseCasesIndexProps) {
  return (
    <PageLayout
      user={user}
      title="Use Cases - Custom Software Development Solutions"
      description="Explore our comprehensive collection of software development use cases and find the perfect solution for your business needs."
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Custom Software Solutions
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Discover how we've helped businesses across industries transform
              their operations with tailored software solutions
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => (window.location.href = "/#quote-form")}
              >
                Get Your Custom Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600 mt-2">Use Cases Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-gray-600 mt-2">Industry Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-gray-600 mt-2">Custom Solutions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases by Category */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our Use Cases
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              From startups to enterprises, we've built solutions for every type
              of business across all major industries
            </p>
          </div>

          <div className="space-y-16">
            {Object.entries(useCaseCategories).map(([category, data]) => {
              const IconComponent = data.icon;
              return (
                <div key={category} className="space-y-8">
                  {/* Category Header */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${data.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {category}
                      </h3>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Specialized software solutions for{" "}
                      {category.toLowerCase()} businesses
                    </p>
                  </div>

                  {/* Use Cases Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.items.map((item) => (
                      <Card
                        key={item.slug}
                        className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 ${data.bgColor} ${data.borderColor} border`}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-3">
                            <Badge
                              className={`${data.textColor} ${data.bgColor} border ${data.borderColor} hover:${data.bgColor}`}
                            >
                              {category}
                            </Badge>
                          </div>
                          <CardTitle className="group-hover:text-blue-600 transition-colors text-lg">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="text-base font-medium text-gray-700">
                            {item.subtitle}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            {item.description}
                          </p>
                          <Link
                            href={`/use-cases/${item.slug}`}
                            className={`inline-flex items-center gap-2 ${data.textColor} hover:text-blue-600 font-medium text-sm transition-colors group-hover:gap-3`}
                          >
                            Learn More
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Can't Find Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find your specific use case?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              We build custom solutions for any business need. Our team of
              experts can create tailored software solutions for your unique
              requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={() => (window.location.href = "/#quote-form")}
              >
                Get Custom Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Get a personalized quote for your custom software development
              needs. Our team will work with you to create the perfect solution.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => (window.location.href = "/#quote-form")}
              >
                Get Your Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
