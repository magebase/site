import {
  Zap,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Web Development", href: "/#web-apps" },
      { name: "Mobile Apps", href: "/#mobile-apps" },
      { name: "API Development", href: "/#api-development" },
      { name: "AI Integration", href: "/#ai-integration" },
      { name: "Security & Compliance", href: "/#security" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Case Studies", href: "/case-studies" },
    ],
    resources: [
      { name: "Documentation", href: "/documentation" },
      { name: "Help Center", href: "/help-center" },
      { name: "Community", href: "/community" },
      { name: "Webinars", href: "/webinars" },
      { name: "Templates", href: "/templates" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "GDPR", href: "/gdpr" },
      { name: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/magebase",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/magebase",
      icon: Linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      href: "https://github.com/magebase",
      icon: Github,
      color: "hover:text-gray-300",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div
                className="flex items-center gap-4 mb-6 group cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Magebase
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    Custom Software Development
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted partner for custom software development. We
                transform ideas into scalable digital solutions that drive
                business growth and innovation.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <a
                  href="tel:+61412345678"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-medium">0412 345 678</span>
                </a>
                <a
                  href="mailto:hello@magebase.dev"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-purple-600/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium">hello@magebase.dev</span>
                </a>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Remote / Global</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-gray-700/50 transition-all duration-300 ${social.color} hover:scale-110`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white relative">
                Services
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white relative">
                Company
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-400"></div>
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white relative">
                Resources
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white relative">
                Legal
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-400"></div>
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated with Our Latest
              </h3>
              <p className="text-gray-300 mb-8">
                Get the latest updates on new features, blog posts, and
                development insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {currentYear} Magebase. All rights reserved.</span>
                <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
                <span>Made with love for developers</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Fast & Reliable Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
