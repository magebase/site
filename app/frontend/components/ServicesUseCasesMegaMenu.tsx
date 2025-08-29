import React from "react";
import { Link } from "@inertiajs/react";
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  ChevronRight,
  Heart,
  Users,
  Gamepad2,
  Zap,
  MessageSquare,
  Video,
  Stethoscope,
  Dumbbell,
  Wrench,
  Calendar,
  Clock,
  Hammer,
  Utensils,
  Play,
  GraduationCap,
  BookOpen,
  Code,
  Star,
} from "lucide-react";

// Services & Lifestyle use case data
const servicesUseCaseCategories = {
  "Health & Medical": {
    icon: Heart,
    color: "from-red-500 to-red-600",
    items: [
      {
        slug: "healthcare-management-system",
        title: "Healthcare Management System",
        subtitle: "Medical practice management",
        description: "Comprehensive healthcare solutions",
        icon: "Heart",
      },
      {
        slug: "telemedicine",
        title: "Telemedicine",
        subtitle: "Remote healthcare delivery",
        description: "Virtual consultation platforms",
        icon: "Video",
      },
      {
        slug: "doctor-s-office",
        title: "Doctor's Office",
        subtitle: "Medical practice websites",
        description: "Healthcare provider websites",
        icon: "Stethoscope",
      },
      {
        slug: "veterinary-clinic",
        title: "Veterinary Clinic",
        subtitle: "Animal healthcare management",
        description: "Veterinary practice solutions",
        icon: "Heart",
      },
      {
        slug: "fitness-wellness",
        title: "Fitness & Wellness",
        subtitle: "Health and fitness apps",
        description: "Wellness tracking apps",
        icon: "Dumbbell",
      },
    ],
  },
  "Service Management": {
    icon: Users,
    color: "from-purple-500 to-purple-600",
    items: [
      {
        slug: "equipment-hire",
        title: "Equipment Hire",
        subtitle: "Equipment rental platforms",
        description: "Rental and booking systems",
        icon: "Wrench",
      },
      {
        slug: "service-booking",
        title: "Service Booking",
        subtitle: "Appointment scheduling",
        description: "Service provider booking",
        icon: "Calendar",
      },
      {
        slug: "appointment-scheduling",
        title: "Appointment Scheduling",
        subtitle: "Booking management",
        description: "Appointment booking platforms",
        icon: "Clock",
      },
      {
        slug: "tradesperson-service-app",
        title: "Tradesperson Service App",
        subtitle: "Service provider platforms",
        description: "Connect tradespeople with customers",
        icon: "Hammer",
      },
      {
        slug: "food-delivery",
        title: "Food Delivery",
        subtitle: "Restaurant delivery platforms",
        description: "Food ordering systems",
        icon: "Utensils",
      },
    ],
  },
  "Media & Learning": {
    icon: Gamepad2,
    color: "from-pink-500 to-pink-600",
    items: [
      {
        slug: "gambling-or-igaming",
        title: "Gambling/iGaming",
        subtitle: "Online gaming platforms",
        description: "Casino and betting applications",
        icon: "Gamepad2",
      },
      {
        slug: "video-gaming",
        title: "Video Gaming",
        subtitle: "Gaming applications",
        description: "Video game platforms",
        icon: "Gamepad2",
      },
      {
        slug: "streaming-service",
        title: "Streaming Service",
        subtitle: "Video/audio streaming",
        description: "Media streaming platforms",
        icon: "Play",
      },
      {
        slug: "educational",
        title: "Educational",
        subtitle: "Learning management systems",
        description: "Education and training platforms",
        icon: "GraduationCap",
      },
      {
        slug: "e-learning",
        title: "E-learning",
        subtitle: "Online learning platforms",
        description: "Digital education solutions",
        icon: "BookOpen",
      },
    ],
  },
  "Community & Enterprise": {
    icon: Zap,
    color: "from-gray-500 to-gray-600",
    items: [
      {
        slug: "social-networking",
        title: "Social Networking",
        subtitle: "Social media platforms",
        description: "Community and social applications",
        icon: "Users",
      },
      {
        slug: "learning-management-system",
        title: "Learning Management System",
        subtitle: "Course management",
        description: "Comprehensive LMS solutions",
        icon: "BookOpen",
      },
      {
        slug: "custom-application",
        title: "Custom Application",
        subtitle: "Tailored software solutions",
        description: "Custom-built applications",
        icon: "Code",
      },
      {
        slug: "review-rating",
        title: "Review & Rating",
        subtitle: "Feedback and rating systems",
        description: "Review and rating platforms",
        icon: "Star",
      },
      {
        slug: "community-forum",
        title: "Community Forum",
        subtitle: "Discussion and community platforms",
        description: "Online community forums",
        icon: "MessageSquare",
      },
    ],
  },
};

interface ServicesUseCasesMegaMenuProps {
  children?: React.ReactNode;
}

const ServicesUseCasesMegaMenu: React.FC<
  ServicesUseCasesMegaMenuProps
> = () => {
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Heart,
      Users,
      Gamepad2,
      Zap,
      MessageSquare,
      Video,
      Stethoscope,
      Dumbbell,
      Wrench,
      Calendar,
      Clock,
      Hammer,
      Utensils,
      Play,
      GraduationCap,
      BookOpen,
      Code,
      Star,
    };
    return icons[iconName] || Users;
  };

  return (
    <NavigationMenuContent className="left-1/2 transform -translate-x-1/2">
      <div className="w-[1100px] p-6">
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(servicesUseCaseCategories).map(([category, data]) => {
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

export default ServicesUseCasesMegaMenu;
