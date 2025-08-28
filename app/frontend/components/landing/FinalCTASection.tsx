import {
  ArrowRight,
  Phone,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Star,
  Award,
  Sparkles,
  Rocket,
} from "lucide-react";
import { SparklesCore } from "../ui/sparkles";

interface FinalCTASectionProps {
  onQuoteFormClick: () => void;
}

export function FinalCTASection({ onQuoteFormClick }: FinalCTASectionProps) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Enhanced Background Effects */}
      <SparklesCore
        id="cta-sparkles"
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={80}
        className="absolute inset-0"
        particleColor="#ffffff"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Enhanced Urgency Banner */}
        <div
          className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full text-sm font-semibold mb-10 animate-pulse shadow-lg"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          <Clock className="w-5 h-5" />
          <span>⏰ Only 3 consultation spots left this month</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h2
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          Get your personalized
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            quote in seconds
          </span>
          <br />
          and start building
          <Rocket
            className="inline-block w-12 h-12 ml-4 text-blue-400"
            data-aos="fade-in"
            data-aos-duration="600"
            data-aos-delay="400"
          />
        </h2>

        <p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          Get a professional software solution with AI-powered timeline
          estimation, transparent pricing, and guaranteed delivery. Join 50+
          businesses who've already transformed their ideas into successful
          products.
        </p>

        {/* Enhanced Key Benefits */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
        >
          <div
            className="group relative"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="700"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:border-yellow-400/50 transition-all duration-300">
              <Zap
                className="w-10 h-10 text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="800"
              />
              <div
                className="text-left"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="900"
              >
                <div className="font-bold text-lg mb-2">Lightning Fast</div>
                <div className="text-gray-300 font-medium">
                  Instant quote delivery within seconds
                </div>
              </div>
            </div>
          </div>

          <div
            className="group relative"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="800"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:border-green-400/50 transition-all duration-300">
              <Shield
                className="w-10 h-10 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="900"
              />
              <div
                className="text-left"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1000"
              >
                <div className="font-bold text-lg mb-2">Quality Focused</div>
                <div className="text-gray-300 font-medium">
                  Professional development standards
                </div>
              </div>
            </div>
          </div>

          <div
            className="group relative"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="900"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:border-blue-400/50 transition-all duration-300">
              <Award
                className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="1000"
              />
              <div
                className="text-left"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1100"
              >
                <div className="font-bold text-lg mb-2">Proven Results</div>
                <div className="text-gray-300 font-medium">
                  4.9/5 client rating from 50+ projects
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Social Proof */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="1200"
        >
          <div
            className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="1300"
          >
            <div
              className="flex -space-x-3"
              data-aos="fade-in"
              data-aos-duration="600"
              data-aos-delay="1400"
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center text-sm font-bold shadow-lg"
                  data-aos="fade-in"
                  data-aos-duration="400"
                  data-aos-delay={1500 + i * 100}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span
              className="font-semibold"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="1600"
            >
              Join 50+ happy clients
            </span>
          </div>

          <div
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            data-aos="fade-left"
            data-aos-duration="600"
            data-aos-delay="1400"
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
                data-aos="fade-in"
                data-aos-duration="400"
                data-aos-delay={1500 + i * 100}
              />
            ))}
            <span
              className="font-semibold ml-2"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="1600"
            >
              4.9/5 rating
            </span>
          </div>
        </div>

        {/* Enhanced Primary CTA */}
        <div
          className="mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="1700"
        >
          <button
            onClick={onQuoteFormClick}
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="1800"
          >
            <span>Get Your FREE Quote Now</span>
            <ArrowRight
              className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
              data-aos="fade-in"
              data-aos-duration="600"
              data-aos-delay="1900"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
          </button>
        </div>

        {/* Enhanced Secondary CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="2000"
        >
          <a
            href="tel:+61412345678"
            className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="2100"
          >
            <Phone
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
              data-aos="fade-in"
              data-aos-duration="600"
              data-aos-delay="2200"
            />
            Call +61 412 345 678
          </a>
          <button
            onClick={onQuoteFormClick}
            className="group inline-flex items-center gap-3 bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="2200"
          >
            Schedule Free Consultation
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              data-aos="fade-in"
              data-aos-duration="600"
              data-aos-delay="2300"
            />
          </button>
        </div>

        {/* Enhanced Trust Indicators */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="2400"
        >
          {[
            {
              icon: CheckCircle,
              text: "Professional Team",
              color: "text-green-400",
            },
            {
              icon: CheckCircle,
              text: "Quality Assurance",
              color: "text-blue-400",
            },
            {
              icon: CheckCircle,
              text: "Fast Delivery",
              color: "text-purple-400",
            },
            {
              icon: CheckCircle,
              text: "24/7 Support",
              color: "text-orange-400",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 group"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={2500 + index * 200}
            >
              <div
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay={2600 + index * 200}
              >
                <item.icon
                  className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}
                  data-aos="fade-in"
                  data-aos-duration="600"
                  data-aos-delay={2700 + index * 200}
                />
              </div>
              <span
                className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors duration-300"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={2800 + index * 200}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Enhanced Final Urgency */}
        <div
          className="relative"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="3000"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl" />
          <div
            className="relative bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl p-8 border border-red-500/30 backdrop-blur-sm"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="3100"
          >
            <div
              className="flex items-center justify-center gap-2 mb-4"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="3200"
            >
              <Sparkles
                className="w-5 h-5 text-red-400"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="3300"
              />
              <p
                className="text-red-300 font-bold text-lg"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="3400"
              >
                Limited Time: Free Strategy Session Worth $500
              </p>
              <Sparkles
                className="w-5 h-5 text-red-400"
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-delay="3500"
              />
            </div>
            <p
              className="text-gray-300 font-medium leading-relaxed"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="3600"
            >
              Book your free consultation this week and get a complimentary
              project strategy session (valued at $500) with our senior
              developers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
