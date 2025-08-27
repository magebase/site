import { ArrowRight, CheckCircle, Phone, Zap } from "lucide-react";
import { BackgroundBeams } from "../ui/background-beams";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { MovingBorder } from "../ui/moving-border";

interface HeroSectionProps {
  onQuoteFormClick: () => void;
}

export function HeroSection({ onQuoteFormClick }: HeroSectionProps) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-24 overflow-hidden">
      <BackgroundBeams className="absolute inset-0" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Digital solutions for modern businesses</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <TypewriterEffect
              words={[
                { text: "Custom" },
                { text: "software" },
                { text: "development" },
                { text: "that", className: "text-gray-600" },
                { text: "drives", className: "text-gray-600" },
                { text: "growth", className: "text-gray-600" },
                { text: "and", className: "text-gray-600" },
                { text: "innovation", className: "text-gray-600" },
              ]}
              className="justify-center"
              cursorClassName="bg-gray-900"
            />
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Custom software development with AI-powered project planning, transparent pricing, and guaranteed delivery timelines.
            Wyoming-based development with expert Ruby on Rails and React expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <MovingBorder duration={3000}>
              <button
                onClick={onQuoteFormClick}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Start your project
                <ArrowRight className="w-4 h-4" />
              </button>
            </MovingBorder>
            <a
              href="tel:+61412345678"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call now
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">AI-powered project estimation</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Wyoming jurisdiction contracts</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Transparent milestone billing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
