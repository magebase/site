import {
  Shield,
  Truck,
  Wrench,
  Zap,
  DollarSign,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { CardHoverEffect } from "../ui/card-hover-effect";
import { SparklesCore } from "../ui/sparkles";
import { WobbleCard } from "../ui/wobble-card";

export function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Estimation",
      description:
        "AI analyzes your project requirements to provide accurate timelines and pricing with detailed project breakdowns. Save time with our intelligent estimation system.",
      link: "#",
      icon: <Zap className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Reliable Delivery",
      description:
        "AI-calculated delivery estimates with priority-based scheduling to ensure your project is completed efficiently. Focus on quality and timely delivery.",
      link: "#",
      icon: <Truck className="w-6 h-6 text-orange-500" />,
    },
    {
      title: "Secure Cloud Infrastructure",
      description:
        "Deployed on secure, scalable cloud platforms with built-in security features and compliance with industry standards. Enterprise-grade security included.",
      link: "#",
      icon: <Shield className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Modern Tech Stack",
      description:
        "Development using modern technologies and frameworks, delivering robust and maintainable web applications. Years of proven expertise.",
      link: "#",
      icon: <Wrench className="w-6 h-6 text-indigo-500" />,
    },
    {
      title: "Transparent Milestone Billing",
      description:
        "Clear pricing breakdown with milestone-based payments, no hidden fees, and detailed cost explanations. No hidden fees ever.",
      link: "#",
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
    },
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <SparklesCore
        id="features-sparkles"
        background="transparent"
        minSize={0.2}
        maxSize={0.8}
        particleDensity={30}
        className="absolute inset-0"
        particleColor="#9ca3af"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-gray-200"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>Why 50+ businesses choose Magebase</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            Everything you need to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              launch faster
            </span>
          </h2>

          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            From AI-powered project planning to secure deployment, we handle
            every aspect of your custom software development
          </p>

          {/* Trust badges */}
          <div
            className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
          >
            <div
              className="flex items-center gap-2"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="700"
            >
              <CheckCircle
                className="w-4 h-4 text-green-500"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="800"
              />
              <span>Free project consultation</span>
            </div>
            <div
              className="flex items-center gap-2"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="900"
            >
              <CheckCircle
                className="w-4 h-4 text-green-500"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="1000"
              />
              <span>No hidden fees</span>
            </div>
            <div
              className="flex items-center gap-2"
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="1100"
            >
              <CheckCircle
                className="w-4 h-4 text-green-500"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="1200"
              />
              <span>24/7 support</span>
            </div>
          </div>
        </div>

        <CardHoverEffect
          items={features}
          className="mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="1400"
        />

        {/* Conversion-focused CTA */}
        <WobbleCard
          containerClassName="w-full"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="1800"
        >
          <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
            <h3
              className="text-3xl font-bold mb-4"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="1900"
            >
              Ready to start your project?
            </h3>
            <p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="2000"
            >
              Get a free, detailed quote with AI-powered timeline estimation
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="2100"
            >
              <div
                className="flex items-center gap-4 text-sm text-gray-300"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="2200"
              >
                <div
                  className="flex items-center gap-1"
                  data-aos="fade-right"
                  data-aos-duration="600"
                  data-aos-delay="2300"
                >
                  <Clock
                    className="w-4 h-4 text-green-400"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="2400"
                  />
                  <span>5 min setup</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="2500"
                >
                  <Zap
                    className="w-4 h-4 text-yellow-400"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="2600"
                  />
                  <span>AI analysis</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  data-aos="fade-left"
                  data-aos-duration="600"
                  data-aos-delay="2700"
                >
                  <DollarSign
                    className="w-4 h-4 text-blue-400"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="2800"
                  />
                  <span>Free estimate</span>
                </div>
              </div>
            </div>

            <button
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="2900"
            >
              Get Your Free Quote Now
              <ArrowRight
                className="w-4 h-4"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="3000"
              />
            </button>
          </div>
        </WobbleCard>
      </div>
    </section>
  );
}
