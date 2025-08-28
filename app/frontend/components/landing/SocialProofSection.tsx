import { Star, Users, Clock, TrendingUp } from "lucide-react";

export function SocialProofSection() {
  const stats = [
    { icon: Star, label: "4.9/5 Rating", value: "50+ Reviews" },
    { icon: Users, label: "Happy Clients", value: "50+ Projects" },
    { icon: Clock, label: "On-Time Delivery", value: "98%" },
    { icon: TrendingUp, label: "Growth", value: "300% Avg" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Delivered exactly what they promised, on time and within budget.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      company: "GrowthCo",
      text: "The AI-powered planning saved us weeks of back-and-forth.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      company: "InnovateLab",
      text: "Professional team that actually understands business needs.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-600 mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold text-gray-400">
              Professional Team
            </div>
            <div className="text-lg font-semibold text-gray-400">
              ISO Certified
            </div>
            <div className="text-lg font-semibold text-gray-400">
              GDPR Compliant
            </div>
            <div className="text-lg font-semibold text-gray-400">
              PCI DSS Ready
            </div>
          </div>
        </div>

        {/* Quick Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-gray-600">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
