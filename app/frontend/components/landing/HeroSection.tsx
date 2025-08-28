import { ArrowRight, CheckCircle, Phone, Zap } from "lucide-react";
import { BackgroundBeams } from "../ui/background-beams";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { MovingBorder } from "../ui/moving-border";
import { Highlight } from "../ui/hero-highlight";
import { FlipWords } from "../ui/flip-words";

interface HeroSectionProps {
  onQuoteFormClick: () => void;
}

export function HeroSection({ onQuoteFormClick }: HeroSectionProps) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <BackgroundBeams className="absolute inset-0" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-10 border border-blue-200/50 shadow-sm"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            <span>
              Digital solutions for
              <FlipWords
                words={[
                  "modern businesses",
                  "growing companies",
                  "startups",
                  "enterprises",
                ]}
                duration={2000}
              />
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
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

          <p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Custom software development with{" "}
            <Highlight>AI-powered project planning</Highlight>, transparent
            pricing, and guaranteed delivery timelines. Wyoming-based
            development with expert Ruby on Rails and React expertise.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
          >
            <MovingBorder duration={3000}>
              <button
                onClick={onQuoteFormClick}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-10 py-5 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start your project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </MovingBorder>
            <a
              href="tel:+61412345678"
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call now
            </a>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="800"
          >
            <div
              className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="900"
            >
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium">
                AI-powered project estimation
              </span>
            </div>
            <div
              className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="1000"
            >
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium">
                Wyoming jurisdiction contracts
              </span>
            </div>
            <div
              className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm"
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="1100"
            >
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium">
                Transparent milestone billing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
