import { ArrowRight, Phone } from "lucide-react";

interface FinalCTASectionProps {
  onQuoteFormClick: () => void;
}

export function FinalCTASection({ onQuoteFormClick }: FinalCTASectionProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to build your software?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Get professional software development today with lightning-fast
          delivery and exceptional quality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onQuoteFormClick}
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start your project
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="tel:+61412345678"
            className="inline-flex items-center gap-2 bg-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call now
          </a>
        </div>
      </div>
    </section>
  );
}
