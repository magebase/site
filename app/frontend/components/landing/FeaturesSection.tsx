import { Phone, Shield, Truck, Wrench, Zap, DollarSign } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Magebase?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered development with Wyoming jurisdiction, transparent pricing, and guaranteed delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI-Powered Estimation
            </h3>
            <p className="text-gray-600">
              RubyLLM analyzes your project requirements to provide accurate timelines and pricing with detailed project breakdowns.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Wyoming Jurisdiction
            </h3>
            <p className="text-gray-600">
              All contracts and legal agreements are governed by Wyoming law, providing clear and favorable terms for your business.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Guaranteed Timelines
            </h3>
            <p className="text-gray-600">
              AI-calculated delivery estimates with priority-based scheduling to ensure your project launches on time.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Secure Cloud Infrastructure
            </h3>
            <p className="text-gray-600">
              Deployed on secure, scalable cloud platforms with built-in security features and compliance with industry standards.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Ruby on Rails Expertise
            </h3>
            <p className="text-gray-600">
              Specialized development using Ruby on Rails with React frontends, delivering robust and maintainable web applications.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Transparent Milestone Billing
            </h3>
            <p className="text-gray-600">
              Clear pricing breakdown with milestone-based payments, no hidden fees, and detailed cost explanations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
