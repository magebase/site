export function HowItWorksSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How Magebase Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From concept to launch in just three streamlined steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Discovery & Planning
            </h3>
            <p className="text-gray-600">
              We analyze your business needs, review your requirements, and
              create a detailed project roadmap with AI-powered insights.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Agile Development
            </h3>
            <p className="text-gray-600">
              Our expert team builds your solution using modern technologies,
              with regular updates and transparent communication throughout.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Launch & Support
            </h3>
            <p className="text-gray-600">
              We deploy your application, provide comprehensive testing, and
              offer ongoing support to ensure your success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
