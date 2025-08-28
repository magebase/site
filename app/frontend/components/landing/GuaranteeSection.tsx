import { Shield, Clock, CheckCircle, Award, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface GuaranteeSectionProps {
  onQuoteFormClick?: () => void;
}

export function GuaranteeSection({ onQuoteFormClick }: GuaranteeSectionProps) {
  const guarantees = [
    {
      icon: Clock,
      title: "Quick Delivery",
      description:
        "Your project will be developed efficiently with clear timelines and regular updates.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every line of code is tested, reviewed, and optimized for performance.",
    },
    {
      icon: CheckCircle,
      title: "Satisfaction Guarantee",
      description:
        "Not happy with the results? We'll work with you until you're satisfied.",
    },
    {
      icon: Award,
      title: "Expert Team",
      description:
        "Senior developers with extensive experience in modern web technologies.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Our Quality Commitments
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Success is Our Priority
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We focus on delivering high-quality solutions with transparent
            communication and professional development practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <guarantee.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {guarantee.title}
              </h3>
              <p className="text-gray-600 text-sm">{guarantee.description}</p>
            </div>
          ))}
        </div>

        {/* Quality Focus CTA */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Development Process
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We follow industry best practices to deliver high-quality solutions
            that meet your business needs and exceed expectations.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">Fast</div>
              <div className="text-sm text-gray-600">Quote Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">Free</div>
              <div className="text-sm text-gray-600">Project Planning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">No</div>
              <div className="text-sm text-gray-600">Hidden Fees</div>
            </div>
          </div>

          <Button
            onClick={onQuoteFormClick}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Get Your Quote in Seconds
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
