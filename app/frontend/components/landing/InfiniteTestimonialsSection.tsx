import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import {
  Star,
  Quote,
  ArrowRight,
  CheckCircle,
  Award,
  TrendingUp,
  Play,
} from "lucide-react";
import { SparklesCore } from "../ui/sparkles";

export function InfiniteTestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Magebase delivered our e-commerce platform 2 weeks early and increased our conversion rate by 40%. Their AI timeline estimation was spot-on!",
      name: "John Smith",
      title: "CEO, TechCorp",
      company: "TechCorp",
      result: "+40% conversion rate",
      avatar: "JS",
    },
    {
      quote:
        "Transparent pricing saved us $15K compared to other agencies. The mobile app launched perfectly and our user acquisition increased by 200%.",
      name: "Sarah Johnson",
      title: "Founder, StartupXYZ",
      company: "StartupXYZ",
      result: "$15K saved + 200% user growth",
      avatar: "SJ",
    },
    {
      quote:
        "From concept to launch in 28 days! Their development expertise is unmatched. Our web app now handles 10x the traffic we projected.",
      name: "Mike Chen",
      title: "CTO, InnovateLab",
      company: "InnovateLab",
      result: "10x traffic increase",
      avatar: "MC",
    },
    {
      quote:
        "Outstanding service! The SaaS platform launched exactly when promised. We've already onboarded 500+ paying customers thanks to their quality work.",
      name: "Lisa Rodriguez",
      title: "Director, DataFlow",
      company: "DataFlow",
      result: "500+ paying customers",
      avatar: "LR",
    },
    {
      quote:
        "Fast development, reliable code, and exceptional service. They delivered our fintech app under budget and ahead of schedule. 5-star experience!",
      name: "David Kim",
      title: "Product Manager, InnovateCo",
      company: "InnovateCo",
      result: "Under budget delivery",
      avatar: "DK",
    },
    {
      quote:
        "The team at Magebase is professional and delivers high-quality work. Our SaaS platform is running smoothly and we hit our revenue goals 3 months early.",
      name: "Emma Wilson",
      title: "Founder, SaaSFlow",
      company: "SaaSFlow",
      result: "3 months early to revenue",
      avatar: "EW",
    },
    {
      quote:
        "Impressed by their technical skills and project management. They kept us updated throughout and delivered exactly what we envisioned.",
      name: "Robert Brown",
      title: "CTO, DataTech",
      company: "DataTech",
      result: "100% vision accuracy",
      avatar: "RB",
    },
    {
      quote:
        "Best development experience we've had. Clean code, great communication, and delivered on time. Our marketplace app is now live and growing rapidly!",
      name: "Jennifer Lee",
      title: "CEO, AppWorks",
      company: "AppWorks",
      result: "Rapid market growth",
      avatar: "JL",
    },
    {
      quote:
        "Their attention to detail and commitment to quality is outstanding. The mobile app they built increased our customer retention by 60%.",
      name: "Alex Thompson",
      title: "Founder, MobileFirst",
      company: "MobileFirst",
      result: "+60% retention rate",
      avatar: "AT",
    },
    {
      quote:
        "Professional, reliable, and innovative. They understood our vision perfectly and brought it to life with exceptional quality. Highly recommended!",
      name: "Maria Garcia",
      title: "CEO, InnovateNow",
      company: "InnovateNow",
      result: "Perfect vision execution",
      avatar: "MG",
    },
    {
      quote:
        "The web application they developed has significantly improved our operational efficiency by 80%. Best investment we've made this year!",
      name: "Chris Anderson",
      title: "Operations Director, BizTech",
      company: "BizTech",
      result: "+80% efficiency increase",
      avatar: "CA",
    },
    {
      quote:
        "Fast, efficient, and professional. They delivered our complex platform ahead of schedule and within budget. Exceptional work quality!",
      name: "Rachel Green",
      title: "CTO, PlatformPro",
      company: "PlatformPro",
      result: "Ahead of schedule delivery",
      avatar: "RG",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <SparklesCore
        id="testimonials-sparkles"
        background="transparent"
        minSize={0.3}
        maxSize={0.9}
        particleDensity={40}
        className="absolute inset-0"
        particleColor="#fbbf24"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Social Proof Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 text-gray-800 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-yellow-200">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>Loved by 50+ businesses worldwide</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Don't just take our word for it
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            See how we've helped businesses like yours launch faster, scale
            better, and achieve remarkable results
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-sm text-gray-600">Client Retention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">Fast</div>
              <div className="text-sm text-gray-600">Average Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                $2.5M+
              </div>
              <div className="text-sm text-gray-600">
                Client Revenue Generated
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Top Rated Agency</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span>Proven Results</span>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="h-[500px] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden mb-16">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        {/* Case Study Preview */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="text-blue-400 font-medium">Case Study</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                How TechCorp increased conversions by 40%
              </h3>
              <p className="text-gray-300 mb-6">
                See how we transformed their outdated platform into a
                high-converting e-commerce solution using AI-powered development
                and modern UX principles.
              </p>
              <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Watch Case Study
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-xl p-6 mb-4">
                <div className="text-3xl font-bold text-blue-400 mb-2">40%</div>
                <div className="text-sm text-gray-400">
                  Conversion Rate Increase
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 mb-4">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  2 Weeks
                </div>
                <div className="text-sm text-gray-400">Early Delivery</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  $50K
                </div>
                <div className="text-sm text-gray-400">
                  Monthly Revenue Increase
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <Quote className="w-12 h-12 mx-auto mb-6 text-white/20" />
          <h3 className="text-3xl font-bold mb-4">
            Join 50+ successful businesses
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to transform your idea into a successful product? Get started
            with a free consultation and project quote.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Your Free Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
