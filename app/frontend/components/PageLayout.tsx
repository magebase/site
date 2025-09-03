import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/sonner";

interface PageLayoutProps {
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function PageLayout({
  user,
  children,
  title,
  description,
}: PageLayoutProps) {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-out-cubic",
      once: true,
      offset: 10,
      delay: 0,
    });

    // Set page title and meta description if provided
    if (title) {
      document.title = `${title} | Magebase`;
    }
    if (description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    }
  }, [title, description]);

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <Header user={user} />

      {/* Main Content */}
      <main className="w-full   md:pt-20">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
