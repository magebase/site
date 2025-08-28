import {
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Rocket,
  Shield,
} from "lucide-react";
import { Button } from "../ui/button";

interface ValuePropositionSectionProps {
  onQuoteFormClick?: () => void;
}

export function ValuePropositionSection({
  onQuoteFormClick,
}: ValuePropositionSectionProps) {
  const benefits = [
    {
      icon: Rocket,
      title: "Quick Project Delivery",
      description:
        "Efficient development process to get your project completed and launched.",
    },
    {
      icon: Target,
      title: "AI-Powered Planning",
      description:
        "Intelligent project planning that saves time and reduces back-and-forth",
    },
    {
      icon: Shield,
      title: "Professional Standards",
      description:
        "Development following industry best practices and quality standards",
    },
    {
      icon: Zap,
      title: "Modern Technology",
      description:
        "Development using current technologies and frameworks for robust applications",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us for Your Next Project?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just developers – we're your strategic partner in building
            software that drives real business results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6">
                <benefit.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Value Stack */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need, Nothing You Don't
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Transparent pricing with no hidden fees
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Dedicated project manager for your timeline
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Ongoing support and maintenance options available
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Source code delivery with full ownership
                  </span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">$0</div>
                <div className="text-sm text-gray-600 mb-4">Setup Fee</div>
                <div className="text-lg font-semibold text-gray-900 mb-6">
                  Start Your Project Today
                </div>
                <Button
                  onClick={onQuoteFormClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Get Your Free Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
