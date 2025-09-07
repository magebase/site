import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How quickly can you deliver a project?',
      answer:
        'Project timelines vary based on complexity, but we typically deliver MVPs within 4-8 weeks and full applications within 3-6 months. Our AI-powered planning helps us provide accurate estimates upfront.',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      question: 'Do you provide ongoing maintenance?',
      answer:
        'Yes, we offer comprehensive maintenance packages including bug fixes, security updates, performance optimization, and feature enhancements. All plans include 24/7 monitoring and support.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      question: 'What technologies do you work with?',
      answer:
        'We specialize in modern web technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS and Vercel. We stay current with the latest frameworks and best practices.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      question: 'Do you offer project management?',
      answer:
        'Yes, all projects include dedicated project management with regular updates, milestone reviews, and transparent communication throughout the development process. We use agile methodologies to keep you informed.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      question: 'What makes your pricing transparent?',
      answer:
        'We provide detailed breakdowns of all costs upfront with no hidden fees. Our AI-powered estimation gives you accurate pricing based on your specific requirements, timeline, and complexity.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      question: 'Do you work with startups and enterprises?',
      answer:
        "Absolutely! We work with businesses of all sizes, from early-stage startups to large enterprises. Our flexible approach adapts to your company's size, culture, and development needs.",
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.05'%3E%3Cpath d='M60 60c0-22.091-17.909-40-40-40s-40 17.909-40 40 17.909 40 40 40 40-17.909 40-40zm40 0c0-22.091-17.909-40-40-40s-40 17.909-40 40 17.909 40 40 40 40-17.909 40-40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-200/50 shadow-sm"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            Got Questions?
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              We've Got Answers
            </span>
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Everything you need to know about our software development services
            and process
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={index * 100 + 600}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 100 + 700}
                >
                  <div
                    className="flex items-center gap-4"
                    data-aos="fade-right"
                    data-aos-duration="600"
                    data-aos-delay={index * 100 + 800}
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${faq.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
                      data-aos="fade-in"
                      data-aos-duration="600"
                      data-aos-delay={index * 100 + 900}
                    >
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay={index * 100 + 1000}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    data-aos="fade-left"
                    data-aos-duration="600"
                    data-aos-delay={index * 100 + 1100}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div
                    className="px-8 pb-6"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay={index * 100 + 1200}
                  >
                    <div
                      className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"
                      data-aos="fade-in"
                      data-aos-duration="600"
                      data-aos-delay={index * 100 + 1300}
                    />
                    <p
                      className="text-gray-600 leading-relaxed font-medium"
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay={index * 100 + 1400}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
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
              <div
                className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="1300"
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-3xl font-bold mb-4"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1400"
              >
                Still Have Questions?
              </h3>
              <p
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1500"
              >
                Our team is here to help! Get personalized answers to your
                specific needs.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1600"
              >
                <button
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="1700"
                >
                  Schedule a Call
                </button>
                <button
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="1800"
                >
                  Send us a Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
