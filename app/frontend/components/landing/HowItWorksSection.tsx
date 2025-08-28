import { Search, Code, Rocket, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Discovery & Planning",
      description:
        "We analyze your business needs, review your requirements, and create a detailed project roadmap with AI-powered insights.",
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-50 to-purple-50",
      features: [
        "AI Project Analysis",
        "Detailed Roadmap",
        "Requirements Gathering",
        "Timeline Planning",
      ],
    },
    {
      icon: Code,
      title: "Agile Development",
      description:
        "Our expert team builds your solution using modern technologies, with regular updates and transparent communication throughout.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      features: [
        "Modern Tech Stack",
        "Daily Updates",
        "Code Reviews",
        "Quality Assurance",
      ],
    },
    {
      icon: Rocket,
      title: "Launch & Support",
      description:
        "We deploy your application, provide comprehensive testing, and offer ongoing support to ensure your success.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      features: [
        "Production Deployment",
        "Performance Testing",
        "24/7 Support",
        "Maintenance Plans",
      ],
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.05'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-200/50 shadow-sm"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span>Our Process</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            From Concept to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Launch
            </span>
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Three streamlined steps to transform your idea into a successful
            digital product
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 200 + 600}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0" />
              )}

              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200/50">
                {/* Step Number */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  data-aos="fade-down"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 700}
                >
                  <span className="text-white font-bold text-xl">
                    {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${step.bgGradient} rounded-xl mb-6`}
                  data-aos="fade-in"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 800}
                >
                  <step.icon
                    className={`w-6 h-6 bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`}
                  />
                </div>

                <h3
                  className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 900}
                >
                  {step.title}
                </h3>

                <p
                  className="text-gray-600 leading-relaxed font-medium mb-6"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 1000}
                >
                  {step.description}
                </p>

                {/* Features List */}
                <div
                  className="space-y-3"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 1100}
                >
                  {step.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-3"
                      data-aos="fade-right"
                      data-aos-duration="500"
                      data-aos-delay={index * 200 + 1100 + featureIndex * 100}
                    >
                      <div
                        className={`w-2 h-2 bg-gradient-to-br ${step.gradient} rounded-full flex-shrink-0`}
                      />
                      <span className="text-sm text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="text-center"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="1200"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
            <div className="relative z-10">
              <h3
                className="text-3xl font-bold mb-4"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1300"
              >
                Ready to Start Your Project?
              </h3>
              <p
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1400"
              >
                Get a free consultation and project roadmap within 24 hours
              </p>
              <button
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1500"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
