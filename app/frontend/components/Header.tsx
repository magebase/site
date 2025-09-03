"use client";

import React, { useState, useEffect } from "react";
import { Zap, FileText, LogIn, LogOut, Menu, X } from "lucide-react";
import { Link } from "@inertiajs/react";
import { AnnouncementBar } from "./landing/AnnouncementBar";
import BusinessUseCasesMegaMenu from "./BusinessUseCasesMegaMenu";
import ServicesUseCasesMegaMenu from "./ServicesUseCasesMegaMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    {
      name: "Business Apps",
      link: "/use-cases",
      hasMegaMenu: true,
      megaMenuType: "business",
    },
    {
      name: "Service Solutions",
      link: "/use-cases",
      hasMegaMenu: true,
      megaMenuType: "services",
    },
    { name: "Blog", link: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    // This will be handled by Rails/Devise
    window.location.href = "/users/sign_out";
  };

  const scrollToQuoteForm = () => {
    const element = document.getElementById("quote-form");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "top-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
            : "top-0 bg-white/90 backdrop-blur-sm"
        }`}
      >
        {/* Announcement Bar */}
        <div
          data-aos="fade-down"
          data-aos-duration="600"
          className={` fixed top-0 transition-all duration-600 ${
            isScrolled ? "transform -translate-y-full" : "relative"
          }`}
        >
          <AnnouncementBar />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-4 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Zap className="w-4 h-4 md:w-7 md:h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  Magebase
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden lg:block font-medium">
                  Custom Software Development
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex items-center space-x-4">
                {navItems.map((item, idx) =>
                  item.hasMegaMenu ? (
                    <NavigationMenuItem key={idx}>
                      <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
                        {item.name}
                      </NavigationMenuTrigger>
                      {item.megaMenuType === "business" ? (
                        <BusinessUseCasesMegaMenu />
                      ) : (
                        <ServicesUseCasesMegaMenu />
                      )}
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link
                          href={item.link}
                          className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200 relative group"
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3 md:gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 text-gray-900">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-300 transition-colors duration-300"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="text-left">
                      <span className="font-semibold text-sm block">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Welcome back!
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg font-medium transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg font-medium transition-all duration-200"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                  <button
                    onClick={scrollToQuoteForm}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Get Free Quote
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 py-2 px-4 bg-gray-50 rounded-xl">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="w-8 h-8 rounded-full border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-sm block text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        toggleMobileMenu();
                      }}
                      className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        window.location.href = "/signin";
                        toggleMobileMenu();
                      }}
                      className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 w-full text-left"
                    >
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        scrollToQuoteForm();
                        toggleMobileMenu();
                      }}
                      className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full"
                    >
                      <FileText className="w-5 h-5" />
                      Get Free Quote
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
