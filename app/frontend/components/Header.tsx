import React, { useState } from "react";
import { Zap, Phone, Calculator, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Magebase
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Software Development Since 2024
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="/#features"
                className="text-white hover:text-white font-medium transition-colors duration-200 relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="/#equipment"
                className="text-white hover:text-white font-medium transition-colors duration-200 relative group"
              >
                Equipment
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="/blog"
                className="text-white hover:text-white font-medium transition-colors duration-200 relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center gap-2 md:gap-4">
              <a
                href="tel:+61412345678"
                className="hidden md:flex items-center gap-2 text-white hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">0412 345 678</span>
              </a>
              <a
                href="/#quote"
                className="hidden sm:flex px-3 py-2 md:px-4 md:py-2 bg-white text-gray-900 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-100 items-center gap-1 md:gap-2 text-sm md:text-base"
              >
                <Calculator className="w-3 h-3 md:w-4 md:h-4" />
                <span>Get Quote</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-white p-2 -mr-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="/#features"
                className="text-white hover:text-gray-300 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="/#equipment"
                className="text-white hover:text-gray-300 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Equipment
              </a>
              <a
                href="/blog"
                className="text-white hover:text-gray-300 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="/#quote"
                className="text-white hover:text-gray-300 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </a>
              <div className="border-t border-gray-700 pt-4 mt-4">
                <a
                  href="tel:+61412345678"
                  className="flex items-center gap-2 text-white hover:text-gray-300 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  <span>0412 345 678</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
