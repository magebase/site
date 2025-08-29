import React from "react";
import { Link } from "@inertiajs/react";
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  ChevronRight,
  Building2,
  ShoppingCart,
  Briefcase,
  Building,
  Megaphone,
  Home,
  Key,
  FileText,
  Package,
  Store,
  Coins,
  Utensils,
  Banknote,
  Car,
  Truck,
  Calendar,
  Settings,
} from "lucide-react";

// Business & Commerce use case data
const businessUseCaseCategories = {
  "Web & Digital Presence": {
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    items: [
      {
        slug: "small-business-branded-site",
        title: "Small Business Branded Site",
        subtitle: "Professional online presence",
        description: "Custom websites",
        icon: "Building2",
      },
      {
        slug: "digital-marketing-agency-site",
        title: "Digital Marketing Agency Site",
        subtitle: "Showcase your expertise",
        description: "Portfolio sites",
        icon: "Megaphone",
      },
      {
        slug: "property-management-system",
        title: "Property Management System",
        subtitle: "Rental property management",
        description: "Rental solutions",
        icon: "Key",
      },
      {
        slug: "content-management-system",
        title: "Content Management System",
        subtitle: "Content creation and publishing",
        description: "CMS platforms",
        icon: "FileText",
      },
      {
        slug: "news-website",
        title: "News Website",
        subtitle: "News and media platforms",
        description: "News websites",
        icon: "FileText",
      },
    ],
  },
  "Commerce & Marketplaces": {
    icon: ShoppingCart,
    color: "from-green-500 to-green-600",
    items: [
      {
        slug: "e-commerce",
        title: "E-commerce",
        subtitle: "Online stores and marketplaces",
        description: "Online stores",
        icon: "ShoppingCart",
      },
      {
        slug: "subscription-box-service",
        title: "Subscription Box Service",
        subtitle: "Recurring revenue platforms",
        description: "Subscription boxes",
        icon: "Package",
      },
      {
        slug: "marketplace-platform",
        title: "Marketplace Platform",
        subtitle: "Multi-vendor marketplaces",
        description: "Marketplaces",
        icon: "Store",
      },
      {
        slug: "cryptocurrency-exchange",
        title: "Cryptocurrency Exchange",
        subtitle: "Crypto trading platforms",
        description: "Crypto exchanges",
        icon: "Coins",
      },
      {
        slug: "food-delivery",
        title: "Food Delivery",
        subtitle: "Restaurant delivery platforms",
        description: "Food delivery",
        icon: "Utensils",
      },
    ],
  },
  "Business Operations": {
    icon: Briefcase,
    color: "from-indigo-500 to-indigo-600",
    items: [
      {
        slug: "business-management-software",
        title: "Business Management Software",
        subtitle: "Streamline operations",
        description: "Business software",
        icon: "Briefcase",
      },
      {
        slug: "customer-relationship-management",
        title: "Customer Relationship Management",
        subtitle: "Manage customer relationships",
        description: "CRM systems",
        icon: "Users",
      },
      {
        slug: "project-management-tool",
        title: "Project Management Tool",
        subtitle: "Organize and track projects",
        description: "Project management",
        icon: "ClipboardList",
      },
      {
        slug: "inventory-management-system",
        title: "Inventory Management System",
        subtitle: "Stock and inventory control",
        description: "Inventory tracking",
        icon: "Package",
      },
      {
        slug: "internal-tool",
        title: "Internal Tool",
        subtitle: "Custom business applications",
        description: "Internal tools",
        icon: "Settings",
      },
    ],
  },
  "Transportation & Finance": {
    icon: Building,
    color: "from-teal-500 to-teal-600",
    items: [
      {
        slug: "financial-services-or-banking",
        title: "Financial Services/Banking",
        subtitle: "Banking and finance platforms",
        description: "Financial services",
        icon: "Banknote",
      },
      {
        slug: "ride-sharing",
        title: "Ride-Sharing",
        subtitle: "Transportation platforms",
        description: "Ride-sharing apps",
        icon: "Car",
      },
      {
        slug: "logistics-delivery",
        title: "Logistics & Delivery",
        subtitle: "Supply chain management",
        description: "Logistics platforms",
        icon: "Truck",
      },
      {
        slug: "event-management-system",
        title: "Event Management System",
        subtitle: "Event planning and management",
        description: "Event management",
        icon: "Calendar",
      },
      {
        slug: "job-board",
        title: "Job Board",
        subtitle: "Employment platforms",
        description: "Job boards",
        icon: "Briefcase",
      },
    ],
  },
};

interface BusinessUseCasesMegaMenuProps {
  children?: React.ReactNode;
}

const BusinessUseCasesMegaMenu: React.FC<
  BusinessUseCasesMegaMenuProps
> = () => {
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Building2,
      ShoppingCart,
      Briefcase,
      Building,
      Megaphone,
      Home,
      Key,
      FileText,
      Package,
      Store,
      Coins,
      Utensils,
      Banknote,
      Car,
      Truck,
      Calendar,
      Settings,
    };
    return icons[iconName] || Briefcase;
  };

  return (
    <NavigationMenuContent className="left-1/2 transform -translate-x-1/2">
      <div className="w-[1000px] p-6">
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(businessUseCaseCategories).map(([category, data]) => {
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
                  {data.items.map((item) => {
                    const ItemIconComponent = getIconComponent(item.icon);
                    return (
                      <NavigationMenuLink key={item.slug} asChild>
                        <Link
                          href={`/use-cases/${item.slug}`}
                          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group h-20"
                        >
                          <div className="flex items-start gap-3 h-full">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                              <ItemIconComponent className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex-1 flex flex-col justify-start">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {item.subtitle}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    );
                  })}
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
  );
};

export default BusinessUseCasesMegaMenu;
