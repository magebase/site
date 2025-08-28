import { Head } from "@inertiajs/react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Shield, FileText } from "lucide-react";

interface LegalGdprProps {
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

export default function LegalGdpr({ page, user }: LegalGdprProps) {
  // Provide default values if page is null
  const pageData = page || {
    title: "GDPR Compliance",
    content:
      "<h1>GDPR Compliance</h1><p>We are committed to protecting your personal data and complying with GDPR regulations.</p>",
    excerpt:
      "Learn about our GDPR compliance and how we protect your personal data.",
  };

  return (
    <PageLayout user={user}>
      <Head>
        <title>{pageData.title} | GDPR</title>
        <meta name="description" content={pageData.excerpt} />
      </Head>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 pt-12 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
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

      {/* Your Rights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Your GDPR Rights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Right to Access
                </h3>
                <p className="text-gray-600 text-sm">
                  You have the right to request a copy of the personal data we
                  hold about you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Right to Rectification
                </h3>
                <p className="text-gray-600 text-sm">
                  You can request correction of inaccurate personal data or
                  completion of incomplete data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Right to Erasure
                </h3>
                <p className="text-gray-600 text-sm">
                  You can request deletion of your personal data under certain
                  circumstances.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Right to Data Portability
                </h3>
                <p className="text-gray-600 text-sm">
                  You can request transfer of your data to another service
                  provider.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Right to Object
                </h3>
                <p className="text-gray-600 text-sm">
                  You can object to processing of your personal data for direct
                  marketing purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Right to Restriction
                </h3>
                <p className="text-gray-600 text-sm">
                  You can request restriction of processing of your personal
                  data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Terms of Service
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Read our terms of service and usage conditions.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/terms-of-service")}
                >
                  View Terms
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-4" />
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help with GDPR?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            If you have questions about your GDPR rights or need to exercise any
            of them, please contact our Data Protection Officer.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => (window.location.href = "/#contact")}
          >
            Contact DPO
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
