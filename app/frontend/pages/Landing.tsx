import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnnouncementBar } from "../components/landing/AnnouncementBar";
import { HeroSection } from "../components/landing/HeroSection";
import { SocialProofSection } from "../components/landing/SocialProofSection";
import { ValuePropositionSection } from "../components/landing/ValuePropositionSection";
import { UseCasesSection } from "../components/landing/UseCasesSection";
import { AppleCardsSection } from "../components/landing/AppleCardsSection";
import QuoteFormSection from "../components/landing/QuoteFormSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { GuaranteeSection } from "../components/landing/GuaranteeSection";
import { FAQSection } from "../components/landing/FAQSection";
import { FinalCTASection } from "../components/landing/FinalCTASection";

interface LandingProps {
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function Landing({ user }: LandingProps) {
  const scrollToQuoteForm = () => {
    const element = document.getElementById("quote-form");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-out-cubic",
      once: true,
      offset: 10,
      delay: 0,
    });
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      {/* Announcement Bar - URGENCY - Moved to very top */}
      <div data-aos="fade-down" data-aos-duration="300">
        <AnnouncementBar />
      </div>

      <Header user={user} />

      <main className="w-full">
        {/* Hero - VALUE PROPOSITION */}
        <div data-aos="fade-up" data-aos-duration="400">
          <HeroSection onQuoteFormClick={scrollToQuoteForm} />
        </div>

        {/* Social Proof - TRUST */}
        <SocialProofSection />

        {/* Value Proposition - BENEFITS */}
        <ValuePropositionSection />

        {/* Quote Form - CONVERSION */}
        <section
          className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-24 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <QuoteFormSection id="quote-form" />
        </section>

        {/* Apple Cards - EXPERTISE SHOWCASE */}
        <AppleCardsSection />

        {/* Use Cases - SOCIAL PROOF & CREDIBILITY */}
        <div data-aos="fade-up" data-aos-duration="400">
          <UseCasesSection />
        </div>

        {/* How It Works - EDUCATION */}
        <HowItWorksSection />

        {/* Guarantee - RISK REVERSAL */}
        <GuaranteeSection />

        {/* Features - MORE BENEFITS */}
        <FeaturesSection />

        {/* Testimonials - SOCIAL PROOF */}
        <div data-aos="fade-up" data-aos-duration="400">
          <TestimonialsSection />
        </div>

        {/* FAQ - OBJECTION HANDLING */}
        <FAQSection />

        {/* Final CTA - LAST CHANCE */}
        <FinalCTASection onQuoteFormClick={scrollToQuoteForm} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
