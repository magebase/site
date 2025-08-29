import React from "react";
import { Link } from "@inertiajs/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ChevronRight,
  Zap,
  Users,
  ShoppingCart,
  Heart,
  Briefcase,
  Gamepad2,
  Building2,
} from "lucide-react";

// Use case data organized by categories
const useCaseCategories = {
  "Business Tools": {
    icon: Building2,
    color: "from-blue-500 to-blue-600",
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

interface UseCasesMegaMenuProps {
  children: React.ReactNode;
}

const UseCasesMegaMenu: React.FC<UseCasesMegaMenuProps> = ({ children }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
            {children}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[900px] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(useCaseCategories).map(([category, data]) => {
                  const IconComponent = data.icon;
                  return (
                    <div key={category} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${data.color} rounded-lg flex items-center justify-center`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {category}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {data.items.map((item) => (
                          <NavigationMenuLink key={item.slug} asChild>
                            <Link
                              href={`/use-cases/${item.slug}`}
                              className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                            >
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {item.subtitle}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Can't find your use case?
                    </h4>
                    <p className="text-xs text-gray-600">
                      We build custom solutions for any business need
                    </p>
                  </div>
                  <Link
                    href="/#quote-form"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200"
                  >
                    Get Custom Quote
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default UseCasesMegaMenu;
