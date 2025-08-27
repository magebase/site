import { Head } from "@inertiajs/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  Zap,
  Code,
  Rocket,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function InertiaExample() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      <Head title="Inertia.js Example - Genfix" />
      <Header />

      <main className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16" data-aos="fade-down">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Inertia.js + React Example
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the power of modern monolith architecture with
              Inertia.js
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Inertia.js eliminates the need for separate API calls, providing
                instant page loads with server-side rendering.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Modern Stack
              </h3>
              <p className="text-gray-600">
                Built with Rails 8, React 19, and TypeScript for a robust and
                maintainable codebase.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Developer Experience
              </h3>
              <p className="text-gray-600">
                Single codebase, hot reloading, and seamless development
                workflow with Vite.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Production Ready
              </h3>
              <p className="text-gray-600">
                Optimized for performance with Kamal deployment and PostgreSQL
                for reliable data persistence.
              </p>
            </div>
          </div>

          {/* Code Example */}
          <div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-16"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <pre className="text-sm text-gray-800 overflow-x-auto">
                {`// Controller (Rails)
class ExampleController < ApplicationController
  def index
    @data = { message: "Hello from Rails!" }
  end
end

// View (ERB)
<div data-page="<%= @data.to_json %>"></div>

// React Component
import { usePage } from '@inertiajs/react';

export default function Example() {
  const { props } = usePage();
  return <div>{props.data.message}</div>;
}`}
              </pre>
            </div>
            <p className="text-gray-600">
              Inertia.js seamlessly bridges your Rails backend with React
              frontend, allowing you to write modern JavaScript while
              maintaining server-side routing and data fetching.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the power of Inertia.js with our modern Rails + React
              stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-semibold transition-all duration-300 border border-gray-200"
              >
                View Blog
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
