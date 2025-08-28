import { Head } from "@inertiajs/react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, FileText, Shield } from "lucide-react";

interface LegalTermsOfServiceProps {
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

export default function LegalTermsOfService({
  page,
  user,
}: LegalTermsOfServiceProps) {
  // Provide default values if page is null
  const pageData = page || {
    title: "Terms of Service",
    content:
      "<h1>Terms of Service</h1><p>These Terms of Service govern your use of our services and website.</p>",
    excerpt:
      "Read our terms of service that govern your use of our services and website.",
  };

  return (
    <PageLayout user={user}>
      <Head>
        <title>{pageData.title} | Terms of Service</title>
        <meta name="description" content={pageData.excerpt} />
      </Head>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 pt-12 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {pageData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {pageData.excerpt}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-gray max-w-none">
                <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Legal Documents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Privacy Policy
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn about how we protect and handle your data.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/privacy-policy")}
                >
                  View Privacy
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cookie Policy
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn about how we use cookies on our website.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/cookie-policy")}
                >
                  View Policy
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  GDPR
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Information about our GDPR compliance and your rights.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/gdpr")}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Questions About Our Terms?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            If you have any questions about our terms of service or need
            clarification on any section, please contact our legal team.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            onClick={() => (window.location.href = "/#contact")}
          >
            Contact Legal Team
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
