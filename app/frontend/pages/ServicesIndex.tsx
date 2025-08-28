import { Head } from "@inertiajs/react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowRight, Code, Smartphone, Zap, Shield } from "lucide-react";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  icon: string;
  category: string;
}

interface ServicesIndexProps {
  services: Service[];
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

const iconMap = {
  "web-development": Code,
  "mobile-apps": Smartphone,
  "api-development": Zap,
  "ai-integration": Zap,
  "security-compliance": Shield,
};

export default function ServicesIndex({ services, user }: ServicesIndexProps) {
  return (
    <PageLayout user={user}>
      <Head>
        <title>Our Services | Professional Development Solutions</title>
        <meta
          name="description"
          content="Explore our comprehensive range of development services including web development, mobile apps, AI integration, and more."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From concept to deployment, we deliver cutting-edge solutions
            tailored to your business needs. Choose from our comprehensive range
            of professional development services.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started Today
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent =
                iconMap[service.icon as keyof typeof iconMap] || Code;
              return (
                <Card
                  key={service.id}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.excerpt ||
                        service.description.substring(0, 150) + "..."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors duration-300"
                      onClick={() =>
                        (window.location.href = `/services/${service.slug}`)
                      }
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get a personalized quote and project timeline within 1 hour.
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
