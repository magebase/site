export function FAQSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our software development services
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How quickly can you deliver a project?
            </h3>
            <p className="text-gray-600">
              Project timelines vary based on complexity, but we typically
              deliver MVPs within 4-8 weeks and full applications within 3-6
              months.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Do you provide ongoing maintenance?
            </h3>
            <p className="text-gray-600">
              Yes, we offer comprehensive maintenance packages including bug
              fixes, security updates, performance optimization, and feature
              enhancements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What technologies do you work with?
            </h3>
            <p className="text-gray-600">
              We specialize in modern web technologies including React, Next.js,
              Node.js, Python, and cloud platforms like AWS and Vercel.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Do you offer project management?
            </h3>
            <p className="text-gray-600">
              Yes, all projects include dedicated project management with
              regular updates, milestone reviews, and transparent communication
              throughout the development process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
