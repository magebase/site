import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  icon: string;
  category: string;
}

interface ServicesShowProps {
  service: Service;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ServicesShow({ service, user }: ServicesShowProps) {
  return (
    <PageLayout
      user={user}
      title={service.meta_title || service.title}
      description={service.meta_description || service.excerpt}
    >
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => (window.location.href = "/#quote-form")}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = "/services")}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: service.content }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Our {service.title} Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Experienced developers with proven track records
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick turnaround without compromising quality
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ongoing Support
              </h3>
              <p className="text-gray-600">
                Continuous support and maintenance included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get a personalized quote for your {service.title.toLowerCase()}{" "}
            project.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => (window.location.href = "/#quote-form")}
          >
            Get Your Quote Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
