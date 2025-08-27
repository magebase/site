import { Phone, Shield, Truck, Wrench, Zap, DollarSign } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why choose Magebase?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional software development with reliable service you can
            trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Reliable code quality
            </h3>
            <p className="text-gray-600">
              Clean, maintainable code following industry best practices and
              modern development standards.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              24/7 technical support
            </h3>
            <p className="text-gray-600">
              Round-the-clock technical support and emergency assistance when
              you need it most.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Fast development
            </h3>
            <p className="text-gray-600">
              Quick turnaround times and flexible delivery scheduling to meet
              your project timelines.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Secure & scalable
            </h3>
            <p className="text-gray-600">
              Built with security best practices and designed to scale with your
              business growth.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Expert development
            </h3>
            <p className="text-gray-600">
              Professional development and deployment by experienced software
              engineers.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Competitive pricing
            </h3>
            <p className="text-gray-600">
              Transparent pricing with no hidden fees and flexible payment
              terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
