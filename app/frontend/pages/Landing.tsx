import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnnouncementBar } from "../components/landing/AnnouncementBar";
import { HeroSection } from "../components/landing/HeroSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { QuoteFormSection } from "../components/landing/QuoteFormSection";
import { InfiniteTestimonialsSection } from "../components/landing/InfiniteTestimonialsSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { FAQSection } from "../components/landing/FAQSection";
import { FinalCTASection } from "../components/landing/FinalCTASection";
import { FeaturesSectionDemo } from "./FeaturesSectionDemo";

export default function Landing() {
  const scrollToQuoteForm = () => {
    const element = document.getElementById("quote-form");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <Header />

      {/* Announcement Bar */}
      <AnnouncementBar />

      <main className="w-full">
        {/* Hero */}
        <HeroSection onQuoteFormClick={scrollToQuoteForm} />

        {/* How it works */}
        <HowItWorksSection />

        {/* Features */}
        <FeaturesSection />

        {/* Quote Form */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-24 overflow-hidden">
          <QuoteFormSection id="quote-form" />
        </section>

        {/* New Features Section */}
        <section className="py-24 bg-white">
          <FeaturesSectionDemo />
        </section>

        {/* Infinite Testimonials */}
        <InfiniteTestimonialsSection />

        {/* Services */}
        <ServicesSection />

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <FinalCTASection onQuoteFormClick={scrollToQuoteForm} />
      </main>

      <Footer />
    </div>
  );
}
