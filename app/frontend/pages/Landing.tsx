import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnnouncementBar } from "../components/landing/AnnouncementBar";
import { HeroSection } from "../components/landing/HeroSection";
import { SocialProofSection } from "../components/landing/SocialProofSection";
import { ValuePropositionSection } from "../components/landing/ValuePropositionSection";
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

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <Header user={user} />

      {/* Announcement Bar - URGENCY */}
      <AnnouncementBar />

      <main className="w-full">
        {/* Hero - VALUE PROPOSITION */}
        <HeroSection onQuoteFormClick={scrollToQuoteForm} />

        {/* Social Proof - TRUST */}
        <SocialProofSection />

        {/* Value Proposition - BENEFITS */}
        <ValuePropositionSection />

        {/* Quote Form - CONVERSION */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-24 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
          <QuoteFormSection id="quote-form" />
        </section>

        {/* How It Works - EDUCATION */}
        <HowItWorksSection />

        {/* Guarantee - RISK REVERSAL */}
        <GuaranteeSection />

        {/* Features - MORE BENEFITS */}
        <FeaturesSection />

        {/* Testimonials - SOCIAL PROOF */}
        <TestimonialsSection />

        {/* FAQ - OBJECTION HANDLING */}
        <FAQSection />

        {/* Final CTA - LAST CHANCE */}
        <FinalCTASection onQuoteFormClick={scrollToQuoteForm} />
      </main>

      <Footer />
    </div>
  );
}
