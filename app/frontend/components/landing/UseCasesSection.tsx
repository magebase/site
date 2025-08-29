import React from "react";
import { Link } from "@inertiajs/react";
import {
  Building2,
  ShoppingCart,
  Heart,
  Users,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Zap,
  Stethoscope,
  Truck,
  CreditCard,
  Plane,
  Home,
  Car,
  Coffee,
  Dumbbell,
  Video,
  FileText,
  Globe,
  Wrench,
  DollarSign,
  Gamepad2,
  Megaphone,
  Bitcoin,
  Phone,
  BookOpen,
  UserCheck,
  Gavel,
  MapPin,
} from "lucide-react";

interface UseCase {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
  textColor: string;
  slug: string;
}

const featuredUseCases: UseCase[] = [
  {
    icon: Building2,
    title: "Business Management Software",
    subtitle: "Streamline operations",
    description:
      "Custom software for business processes, CRM systems, and project management tools.",
    features: [
      "Process Automation",
      "Team Collaboration",
      "Data Analytics",
      "Custom Workflows",
    ],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    slug: "business-management-software",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    subtitle: "Online stores & marketplaces",
    description:
      "Complete e-commerce platforms with payment integration and inventory management.",
    features: [
      "Payment Processing",
      "Inventory Management",
      "Order Tracking",
      "Customer Portal",
    ],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    slug: "e-commerce",
  },
  {
    icon: Heart,
    title: "Healthcare Management",
    subtitle: "Medical practice solutions",
    description:
      "Comprehensive healthcare solutions including telemedicine and patient management.",
    features: [
      "Patient Records",
      "Appointment Scheduling",
      "Telemedicine",
      "Compliance",
    ],
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    slug: "healthcare-management-system",
  },
  {
    icon: Users,
    title: "Service Booking Platform",
    subtitle: "Appointment scheduling",
    description:
      "Service provider booking systems for appointments, reservations, and scheduling.",
    features: [
      "Online Booking",
      "Calendar Integration",
      "Automated Reminders",
      "Payment Processing",
    ],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    slug: "service-booking",
  },
  {
    icon: Briefcase,
    title: "FinTech Applications",
    subtitle: "Modern banking solutions",
    description:
      "Next-generation financial applications including neo-banks and payment systems.",
    features: [
      "Secure Transactions",
      "Real-time Processing",
      "Compliance",
      "Mobile Banking",
    ],
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    slug: "neo-banks-fintech-apps",
  },
  {
    icon: GraduationCap,
    title: "Learning Management System",
    subtitle: "Education & training platforms",
    description:
      "Comprehensive LMS solutions for online learning, course management, and training.",
    features: [
      "Course Creation",
      "Progress Tracking",
      "Certification",
      "Interactive Content",
    ],
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    slug: "learning-management-system",
  },
  {
    icon: Truck,
    title: "Logistics & Delivery",
    subtitle: "Supply chain management",
    description:
      "Complete logistics platforms for tracking, delivery management, and fleet operations.",
    features: [
      "Real-time Tracking",
      "Route Optimization",
      "Fleet Management",
      "Delivery Scheduling",
    ],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    slug: "logistics-delivery",
  },
  {
    icon: Home,
    title: "Property Management",
    subtitle: "Rental property solutions",
    description:
      "Comprehensive property management systems for landlords and property managers.",
    features: [
      "Tenant Management",
      "Rent Collection",
      "Maintenance Tracking",
      "Financial Reporting",
    ],
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    textColor: "text-teal-700",
    slug: "property-management-system",
  },
  {
    icon: Coffee,
    title: "Restaurant Management",
    subtitle: "Food service solutions",
    description:
      "Complete restaurant management systems including POS, inventory, and online ordering.",
    features: [
      "POS System",
      "Inventory Management",
      "Online Ordering",
      "Table Management",
    ],
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    slug: "food-delivery",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Wellness",
    subtitle: "Health tracking platforms",
    description:
      "Fitness apps and wellness platforms for personal training and health management.",
    features: [
      "Workout Tracking",
      "Nutrition Planning",
      "Progress Analytics",
      "Community Features",
    ],
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    slug: "fitness-wellness",
  },
  {
    icon: Video,
    title: "Streaming Service",
    subtitle: "Video/audio streaming",
    description:
      "Custom streaming platforms for video content, live streaming, and media distribution.",
    features: [
      "Video Streaming",
      "Live Broadcasting",
      "Content Management",
      "User Analytics",
    ],
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    slug: "streaming-service",
  },
  {
    icon: FileText,
    title: "Content Management",
    subtitle: "CMS & publishing platforms",
    description:
      "Custom content management systems for publishing, blogging, and digital content.",
    features: [
      "Content Creation",
      "SEO Optimization",
      "Multi-user Editing",
      "Version Control",
    ],
    color: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-50",
    textColor: "text-slate-700",
    slug: "content-management-system",
  },
  {
    icon: Globe,
    title: "Small Business Websites",
    subtitle: "Professional online presence",
    description:
      "Custom branded websites for local businesses, startups, and entrepreneurs.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Contact Forms",
      "Social Integration",
    ],
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-700",
    slug: "small-business-branded-site",
  },
  {
    icon: Wrench,
    title: "Equipment Hire Platform",
    subtitle: "Rental management solutions",
    description:
      "Streamline equipment rental operations with booking systems and inventory management.",
    features: [
      "Equipment Catalog",
      "Booking System",
      "Inventory Tracking",
      "Payment Processing",
    ],
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    slug: "equipment-hire",
  },
  {
    icon: DollarSign,
    title: "Financial Services",
    subtitle: "Secure banking solutions",
    description:
      "Enterprise-grade financial applications with compliance and security features.",
    features: [
      "Account Management",
      "Transaction Processing",
      "Security & Compliance",
      "Mobile Banking",
    ],
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    slug: "financial-services-banking",
  },
  {
    icon: Gamepad2,
    title: "iGaming Platform",
    subtitle: "Gaming & betting solutions",
    description:
      "Full-featured iGaming platform with responsible gambling and compliance features.",
    features: [
      "Game Management",
      "Player Accounts",
      "Responsible Gambling",
      "Regulatory Compliance",
    ],
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
    slug: "gambling-or-igaming",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Agency",
    subtitle: "Agency management platform",
    description:
      "Professional websites for digital marketing agencies with portfolio and lead generation.",
    features: [
      "Portfolio Showcase",
      "Lead Generation",
      "Service Pages",
      "Blog Integration",
    ],
    color: "from-lime-500 to-lime-600",
    bgColor: "bg-lime-50",
    textColor: "text-lime-700",
    slug: "digital-marketing-agency-site",
  },
  {
    icon: Bitcoin,
    title: "Cryptocurrency Exchange",
    subtitle: "Crypto trading platform",
    description:
      "Secure cryptocurrency exchange with trading engine and wallet management.",
    features: [
      "Trading Engine",
      "Wallet Management",
      "KYC/AML Compliance",
      "Security Features",
    ],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    slug: "cryptocurrency-exchange",
  },
  {
    icon: Phone,
    title: "Telemedicine Platform",
    subtitle: "Remote healthcare solutions",
    description:
      "Complete telemedicine solution with video consultations and patient management.",
    features: [
      "Video Consultations",
      "Appointment Scheduling",
      "Patient Management",
      "EHR Integration",
    ],
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    slug: "telemedicine",
  },
  {
    icon: BookOpen,
    title: "Educational Platform",
    subtitle: "Learning management systems",
    description:
      "Comprehensive LMS with course management, progress tracking, and assessments.",
    features: [
      "Course Management",
      "Progress Tracking",
      "Assessment Tools",
      "Multimedia Content",
    ],
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    slug: "educational",
  },
  {
    icon: UserCheck,
    title: "CRM Systems",
    subtitle: "Customer relationship management",
    description:
      "Comprehensive CRM platform with contact management and sales automation.",
    features: [
      "Contact Management",
      "Sales Pipeline",
      "Marketing Automation",
      "Customer Service",
    ],
    color: "from-fuchsia-500 to-fuchsia-600",
    bgColor: "bg-fuchsia-50",
    textColor: "text-fuchsia-700",
    slug: "customer-relationship-management",
  },
  {
    icon: Gavel,
    title: "Project Management",
    subtitle: "Team collaboration tools",
    description:
      "Full-featured project management with task tracking and team collaboration.",
    features: [
      "Task Management",
      "Team Collaboration",
      "Time Tracking",
      "Resource Management",
    ],
    color: "from-stone-500 to-stone-600",
    bgColor: "bg-stone-50",
    textColor: "text-stone-700",
    slug: "project-management-tool",
  },
  {
    icon: MapPin,
    title: "Real Estate Platform",
    subtitle: "Property management solutions",
    description:
      "Complete real estate platform with property listings and transaction processing.",
    features: [
      "Property Listings",
      "Advanced Search",
      "Agent Management",
      "Transaction Processing",
    ],
    color: "from-neutral-500 to-neutral-600",
    bgColor: "bg-neutral-50",
    textColor: "text-neutral-700",
    slug: "real-estate",
  },
];

const getBorderColor = (colorClass: string): string => {
  const colorMap: Record<string, string> = {
    blue: "#3b82f6",
    green: "#10b981",
    red: "#ef4444",
    purple: "#8b5cf6",
    yellow: "#f59e0b",
    indigo: "#6366f1",
    orange: "#f97316",
    teal: "#14b8a6",
    amber: "#f59e0b",
    pink: "#ec4899",
    violet: "#8b5cf6",
    slate: "#64748b",
    cyan: "#06b6d4",
    gray: "#6b7280",
    emerald: "#10b981",
    rose: "#f43f5e",
    lime: "#84cc16",
    sky: "#0ea5e9",
    fuchsia: "#d946ef",
    stone: "#78716c",
    neutral: "#737373",
  };

  // Extract the base color name from the gradient class (e.g., "from-blue-500" -> "blue")
  const baseColor = colorClass.split("-")[1];
  return colorMap[baseColor] || "#6b7280"; // Default to gray if not found
};

export function UseCasesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Custom Solutions for Every Industry
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We've built software solutions across diverse industries, from
            healthcare to e-commerce, helping businesses transform their
            operations with tailored technology.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredUseCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <div
                key={useCase.slug}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 ${useCase.bgColor} border-l-4`}
                style={{ borderLeftColor: getBorderColor(useCase.color) }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${useCase.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {useCase.title}
                </h3>
                <p className={`text-sm font-medium ${useCase.textColor} mb-4`}>
                  {useCase.subtitle}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {useCase.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {useCase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${useCase.textColor}`} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/use-cases/${useCase.slug}`}
                  className={`inline-flex items-center gap-2 ${useCase.textColor} hover:text-blue-600 font-medium text-sm transition-colors group-hover:gap-3`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Industry?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We build custom solutions for any business need. Our team of
              experts can create tailored software solutions for your unique
              requirements, no matter the industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/use-cases"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View All Use Cases
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/#quote-form"
                className="inline-flex items-center px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
