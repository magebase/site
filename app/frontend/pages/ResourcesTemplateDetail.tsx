import { Head } from "@inertiajs/react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowRight, Download, Eye, CheckCircle } from "lucide-react";

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
  features: string;
  requirements: string;
  installation_instructions: string;
}

interface ResourcesTemplateDetailProps {
  template: Template;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ResourcesTemplateDetail({
  template,
  user,
}: ResourcesTemplateDetailProps) {
  return (
    <PageLayout user={user}>
      <Head>
        <title>{template.title} | Template</title>
        <meta
          name="description"
          content={`${template.title} - ${template.description.substring(
            0,
            150
          )}...`}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                template.is_free
                  ? "bg-green-100 text-green-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {template.is_free ? "Free" : template.pricing}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
              {template.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {template.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">{template.description}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            {template.demo_url && (
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => window.open(template.demo_url, "_blank")}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Demo
              </Button>
            )}
            <Button
              size="lg"
              className={`${
                template.is_free
                  ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              }`}
              onClick={() => window.open(template.download_url, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              {template.is_free ? "Download Free" : "Download Now"}
            </Button>
          </div>
        </div>
      </section>

      {/* Template Details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {template.features.split("\n").map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    {template.requirements
                      .split("\n")
                      .map((requirement, index) => (
                        <p key={index}>{requirement}</p>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Installation Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    {template.installation_instructions
                      .split("\n")
                      .map((instruction, index) => (
                        <p key={index}>{instruction}</p>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Template Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Template Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium">{template.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pricing</p>
                    <p className="font-medium">
                      {template.is_free ? "Free" : template.pricing}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">License</p>
                    <p className="font-medium">MIT License</p>
                  </div>
                </CardContent>
              </Card>

              {/* Download Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Get This Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {template.demo_url && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(template.demo_url, "_blank")}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Live Demo
                    </Button>
                  )}
                  <Button
                    className={`w-full ${
                      template.is_free
                        ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    }`}
                    onClick={() => window.open(template.download_url, "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>

              {/* Related Templates */}
              <Card>
                <CardHeader>
                  <CardTitle>More Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => (window.location.href = "/templates")}
                  >
                    View All Templates
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help with This Template?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our support team is here to help you get started and make the most
            of this template.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            onClick={() => (window.location.href = "/help-center")}
          >
            Get Support
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
