import { Head } from "@inertiajs/react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowRight, FileText, Download, Eye, Star, Tag } from "lucide-react";

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  pricing: string;
  demo_url: string;
  download_url: string;
  is_free: boolean;
  slug: string;
  featured_image_url: string;
}

interface ResourcesTemplatesIndexProps {
  templates: Template[];
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ResourcesTemplatesIndex({
  templates,
  user,
}: ResourcesTemplatesIndexProps) {
  const freeTemplates = templates.filter((t) => t.is_free);
  const premiumTemplates = templates.filter((t) => !t.is_free);

  return (
    <PageLayout user={user}>
      <Head>
        <title>Templates | Code Templates & Boilerplates</title>
        <meta
          name="description"
          content="Download high-quality code templates, boilerplates, and starter kits to accelerate your development projects."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Code Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jumpstart your projects with our collection of high-quality
            templates, boilerplates, and starter kits. Save time and focus on
            what matters most.
          </p>
        </div>
      </section>

      {/* Free Templates */}
      {freeTemplates.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Free Templates
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {freeTemplates.length} templates
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {freeTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Free
                      </span>
                      <Tag className="w-5 h-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {template.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {template.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {template.category}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {template.demo_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            window.open(template.demo_url, "_blank")
                          }
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Demo
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        onClick={() =>
                          window.open(template.download_url, "_blank")
                        }
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Templates */}
      {premiumTemplates.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Premium Templates
              </h2>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                {premiumTemplates.length} templates
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                        {template.pricing}
                      </span>
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {template.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {template.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {template.category}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {template.demo_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            window.open(template.demo_url, "_blank")
                          }
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Demo
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        onClick={() =>
                          (window.location.href = `/templates/${template.slug}`)
                        }
                      >
                        <ArrowRight className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Template Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Web Apps
                </h3>
                <p className="text-gray-600 text-sm">
                  Full-stack web application templates
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Mobile Apps
                </h3>
                <p className="text-gray-600 text-sm">
                  Cross-platform mobile application starters
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  APIs
                </h3>
                <p className="text-gray-600 text-sm">
                  RESTful API templates and boilerplates
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  UI Components
                </h3>
                <p className="text-gray-600 text-sm">
                  Reusable component libraries and kits
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need a Custom Template?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We can create custom templates tailored to your specific needs and
            requirements.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            onClick={() => (window.location.href = "/#quote-form")}
          >
            Request Custom Template
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
