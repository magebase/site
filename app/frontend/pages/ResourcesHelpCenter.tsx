import { Head } from "@inertiajs/react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  ArrowRight,
  Search,
  MessageCircle,
  FileText,
  Video,
  Users,
} from "lucide-react";

interface ResourcesHelpCenterProps {
  page: {
    title: string;
    content: string;
    excerpt: string;
  } | null;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ResourcesHelpCenter({
  page,
  user,
}: ResourcesHelpCenterProps) {
  // Provide default values if page is null
  const pageData = page || {
    title: "Help Center",
    content:
      "<h1>Help Center</h1><p>Get the help you need with our comprehensive documentation, guides, and support resources.</p>",
    excerpt:
      "Get comprehensive help and support with our detailed documentation and guides.",
  };

  const helpCategories = [
    {
      title: "Frequently Asked Questions",
      description: "Find answers to the most common questions",
      icon: MessageCircle,
      href: "#faq",
    },
    {
      title: "Guides & Tutorials",
      description: "Step-by-step guides to help you succeed",
      icon: FileText,
      href: "#guides",
    },
    {
      title: "Video Tutorials",
      description: "Watch our video guides and walkthroughs",
      icon: Video,
      href: "#videos",
    },
    {
      title: "Community Support",
      description: "Get help from our community of developers",
      icon: Users,
      href: "#community",
    },
  ];

  return (
    <PageLayout user={user}>
      <Head>
        <title>{pageData.title} | Help Center</title>
        <meta name="description" content={pageData.excerpt} />
      </Head>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 pt-12 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {pageData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {pageData.excerpt}
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help..."
                className="pl-10 pr-4 py-3 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Can We Help?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.title}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                      onClick={() =>
                        document
                          .querySelector(category.href)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account & Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• How to update payment information</li>
                  <li>• Understanding your bill</li>
                  <li>• Subscription management</li>
                  <li>• Refund policy</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Troubleshooting common issues</li>
                  <li>• System requirements</li>
                  <li>• Performance optimization</li>
                  <li>• Bug reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Quick start guide</li>
                  <li>• Setting up your account</li>
                  <li>• First project setup</li>
                  <li>• Basic configuration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our support team is here to help you 24/7. Get in touch with us and
            we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={() => (window.location.href = "/#contact")}
            >
              Contact Support
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => (window.location.href = "/community")}
            >
              Ask Community
              <Users className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
