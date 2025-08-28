import {
  ArrowRight,
  Phone,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Star,
  Award,
} from "lucide-react";
import { SparklesCore } from "../ui/sparkles";

interface FinalCTASectionProps {
  onQuoteFormClick: () => void;
}

export function FinalCTASection({ onQuoteFormClick }: FinalCTASectionProps) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <SparklesCore
        id="cta-sparkles"
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={60}
        className="absolute inset-0"
        particleColor="#ffffff"
      />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Urgency Banner */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-pulse">
          <Clock className="w-4 h-4" />
          <span>⏰ Only 3 consultation spots left this month</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Get your personalized
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {" "}
            quote in seconds
          </span>
          <br />
          and start building
        </h2>

        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Get a professional software solution with AI-powered timeline
          estimation, transparent pricing, and guaranteed delivery. Join 50+
          businesses who've already transformed their ideas into successful
          products.
        </p>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <Zap className="w-8 h-8 text-yellow-400" />
            <div className="text-left">
              <div className="font-semibold">Lightning Fast</div>
              <div className="text-sm text-gray-300">
                Instant quote delivery
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-green-400" />
            <div className="text-left">
              <div className="font-semibold">Quality Focused</div>
              <div className="text-sm text-gray-300">
                Professional development
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <Award className="w-8 h-8 text-blue-400" />
            <div className="text-left">
              <div className="font-semibold">Proven Results</div>
              <div className="text-sm text-gray-300">4.9/5 client rating</div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-8 mb-12 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>Join 50+ happy clients</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
            <span className="ml-1">4.9/5 rating</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="mb-8">
          <button
            onClick={onQuoteFormClick}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
          >
            Get Your FREE Quote Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Secondary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a
            href="tel:+61412345678"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <Phone className="w-4 h-4" />
            Call +61 412 345 678
          </a>
          <button
            onClick={onQuoteFormClick}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Schedule Free Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-sm text-gray-300">Professional Team</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-sm text-gray-300">Quality Assurance</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-sm text-gray-300">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-sm text-gray-300">24/7 Support</span>
          </div>
        </div>

        {/* Final Urgency */}
        <div className="mt-12 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/30">
          <p className="text-red-300 font-semibold mb-2">
            ⚡ Limited Time: Free Strategy Session Worth $500
          </p>
          <p className="text-sm text-gray-400">
            Book your free consultation this week and get a complimentary
            project strategy session (valued at $500)
          </p>
        </div>
      </div>
    </section>
  );
}
