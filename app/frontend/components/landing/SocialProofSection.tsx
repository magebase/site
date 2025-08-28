import {
  Star,
  Users,
  Clock,
  TrendingUp,
  Award,
  Shield,
  CheckCircle,
} from "lucide-react";

export function SocialProofSection() {
  const stats = [
    {
      icon: Star,
      label: "4.9/5 Rating",
      value: "50+ Reviews",
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: "50+ Projects",
      color: "from-blue-400 to-purple-400",
    },
    {
      icon: Clock,
      label: "On-Time Delivery",
      value: "98%",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: TrendingUp,
      label: "Growth",
      value: "300% Avg",
      color: "from-purple-400 to-pink-400",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Delivered exactly what they promised, on time and within budget.",
      rating: 5,
      avatar: "SJ",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      name: "Mike Chen",
      company: "GrowthCo",
      text: "The AI-powered planning saved us weeks of back-and-forth.",
      rating: 5,
      avatar: "MC",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      name: "Emily Rodriguez",
      company: "InnovateLab",
      text: "Professional team that actually understands business needs.",
      rating: 5,
      avatar: "ER",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={index * 100}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div
                className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={index * 100 + 200}
              >
                {stat.value}
              </div>
              <div
                className="text-sm text-gray-600 font-medium"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={index * 100 + 300}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div
          className="text-center mb-20"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-200/50 shadow-sm"
            data-aos="fade-down"
            data-aos-duration="600"
            data-aos-delay="500"
          >
            <Award className="w-4 h-4 text-blue-600" />
            <span>Trusted by Industry Leaders</span>
          </div>
          <div
            className="flex flex-wrap justify-center items-center gap-8"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
          >
            <div
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="700"
            >
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Professional Team
              </span>
            </div>
            <div
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="800"
            >
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                ISO Certified
              </span>
            </div>
            <div
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="900"
            >
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                GDPR Compliant
              </span>
            </div>
            <div
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="1000"
            >
              <Shield className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">
                PCI DSS Ready
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 200 + 800}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200/50">
                <div
                  className="flex items-center mb-6"
                  data-aos="fade-right"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 900}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p
                      className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay={index * 200 + 1000}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-gray-600 text-sm font-medium"
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay={index * 200 + 1100}
                    >
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <div
                  className="flex text-yellow-400 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 1200}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p
                  className="text-gray-700 leading-relaxed font-medium"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 1300}
                >
                  "{testimonial.text}"
                </p>
                <div
                  className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  data-aos="fade-in"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 1400}
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
