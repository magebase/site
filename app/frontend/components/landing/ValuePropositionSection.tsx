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
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            Why Choose Us for Your Next Project?
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            We're not just developers – we're your strategic partner in building
            software that drives real business results.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={500 + index * 150}
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay={600 + index * 150}
              >
                <benefit.icon
                  className="w-8 h-8 text-blue-600"
                  data-aos="fade-in"
                  data-aos-duration="600"
                  data-aos-delay={700 + index * 150}
                />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-3"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={800 + index * 150}
              >
                {benefit.title}
              </h3>
              <p
                className="text-gray-600"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={900 + index * 150}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Value Stack */}
        <div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="1100"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="1200"
            >
              <h3
                className="text-3xl font-bold text-gray-900 mb-6"
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="1300"
              >
                Everything You Need, Nothing You Don't
              </h3>
              <ul className="space-y-4">
                <li
                  className="flex items-start gap-3"
                  data-aos="fade-right"
                  data-aos-duration="600"
                  data-aos-delay="1400"
                >
                  <CheckCircle
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="1500"
                  />
                  <span
                    className="text-gray-700"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1600"
                  >
                    Transparent pricing with no hidden fees
                  </span>
                </li>
                <li
                  className="flex items-start gap-3"
                  data-aos="fade-right"
                  data-aos-duration="600"
                  data-aos-delay="1700"
                >
                  <CheckCircle
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="1800"
                  />
                  <span
                    className="text-gray-700"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1900"
                  >
                    Dedicated project manager for your timeline
                  </span>
                </li>
                <li
                  className="flex items-start gap-3"
                  data-aos="fade-right"
                  data-aos-duration="600"
                  data-aos-delay="2000"
                >
                  <CheckCircle
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="2100"
                  />
                  <span
                    className="text-gray-700"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="2200"
                  >
                    Ongoing support and maintenance options available
                  </span>
                </li>
                <li
                  className="flex items-start gap-3"
                  data-aos="fade-right"
                  data-aos-duration="600"
                  data-aos-delay="2300"
                >
                  <CheckCircle
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="2400"
                  />
                  <span
                    className="text-gray-700"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="2500"
                  >
                    Source code delivery with full ownership
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="text-center"
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="1200"
            >
              <div
                className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1300"
              >
                <div
                  className="text-4xl font-bold text-green-600 mb-2"
                  data-aos="fade-down"
                  data-aos-duration="600"
                  data-aos-delay="1400"
                >
                  $0
                </div>
                <div
                  className="text-sm text-gray-600 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="1500"
                >
                  Setup Fee
                </div>
                <div
                  className="text-lg font-semibold text-gray-900 mb-6"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="1600"
                >
                  Start Your Project Today
                </div>
                <Button
                  onClick={onQuoteFormClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="1700"
                >
                  Get Your Free Quote
                  <ArrowRight
                    className="w-4 h-4 ml-2"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="1800"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
