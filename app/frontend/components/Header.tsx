import React, { useState } from "react";
import { Zap, Calculator, LogIn, LogOut, User } from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "./ui/resizable-navbar";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Features", link: "/#features" },
    { name: "Blog", link: "/blog" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    // This will be handled by Rails/Devise
    window.location.href = "/users/sign_out";
  };

  return (
    <Navbar className="top-0">
      <NavBody>
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Magebase
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
              Software Development Since 2024
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <NavItems
          items={navItems}
          onItemClick={() => setIsMobileMenuOpen(false)}
        />

        {/* CTA Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-gray-900 dark:text-white">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="font-medium">{user.name}</span>
              </div>
              <NavbarButton
                onClick={handleSignOut}
                variant="secondary"
                className="inline-flex place-items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </NavbarButton>
            </div>
          ) : (
            <>
              <NavbarButton
                href="/signin"
                variant="secondary"
                className="inline-flex place-items-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </NavbarButton>
              <NavbarButton
                href="/#quote"
                variant="gradient"
                className="inline-flex place-items-center"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Get Quote
              </NavbarButton>
            </>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-black dark:text-white">
              Magebase
            </h1>
          </div>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="block py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              onClick={toggleMobileMenu}
            >
              {item.name}
            </a>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="font-medium">{user.name}</span>
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignOut();
                  }}
                  className="block py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2 inline" />
                  Sign Out
                </a>
              </div>
            ) : (
              <>
                <a
                  href="/signin"
                  className="block py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <LogIn className="w-4 h-4 mr-2 inline" />
                  Sign In
                </a>
                <a
                  href="/#quote"
                  className="block py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <Calculator className="w-4 h-4 mr-2 inline" />
                  Get Quote
                </a>
              </>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default Header;
