import PageLayout from '../components/PageLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Shield, FileText } from 'lucide-react';

interface LegalSecurityProps {
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

export default function LegalSecurity({ page, user }: LegalSecurityProps) {
  // Provide default values if page is null
  const pageData = page || {
    title: 'Security Information',
    content:
      '<h1>Security Information</h1><p>Learn about our security practices and how we protect your data and applications.</p>',
    excerpt:
      'Learn about our security practices and how we protect your data and applications.',
  };

  return (
    <PageLayout
      user={user}
      title={pageData.title}
      description={pageData.excerpt}
    >
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 pt-12 overflow-hidden bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* Security Measures */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Security Measures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Encryption
                </h3>
                <p className="text-gray-600 text-sm">
                  All data is encrypted in transit and at rest using
                  industry-standard protocols.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Access Control
                </h3>
                <p className="text-gray-600 text-sm">
                  Strict access controls and multi-factor authentication for all
                  systems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Monitoring
                </h3>
                <p className="text-gray-600 text-sm">
                  24/7 security monitoring and automated threat detection
                  systems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Regular Audits
                </h3>
                <p className="text-gray-600 text-sm">
                  Regular security audits and penetration testing by certified
                  professionals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Compliance
                </h3>
                <p className="text-gray-600 text-sm">
                  Compliant with industry standards including SOC 2, ISO 27001,
                  and GDPR.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Incident Response
                </h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive incident response plan with 24/7 security team
                  availability.
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
                  onClick={() => (window.location.href = '/privacy-policy')}
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
                  onClick={() => (window.location.href = '/terms-of-service')}
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
                  onClick={() => (window.location.href = '/cookie-policy')}
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
            Security Questions?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            If you have questions about our security practices or want to report
            a security concern, please contact our security team immediately.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white"
            onClick={() => (window.location.href = '/#contact')}
          >
            Contact Security Team
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
