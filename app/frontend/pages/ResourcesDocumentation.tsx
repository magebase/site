import PageLayout from '../components/PageLayout';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import {
  ArrowRight,
  Search,
  BookOpen,
  Code,
  Download,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';

interface ResourcesDocumentationProps {
  page: {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    meta_title: string;
    meta_description: string;
  } | null;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ResourcesDocumentation({
  page,
  user,
}: ResourcesDocumentationProps) {
  // Provide default values if page is null
  const pageData = {
    title: page?.title || 'Documentation',
    content:
      page?.content ||
      '<h1>Documentation</h1><p>Comprehensive documentation for all our services and APIs.</p><h2>Getting Started</h2><p>Quick start guides to help you get up and running with our platform.</p><h2>API Reference</h2><p>Detailed API documentation with examples and code samples.</p><h2>SDKs & Libraries</h2><p>Download our SDKs and libraries for popular programming languages.</p><h2>Best Practices</h2><p>Learn best practices for integrating with our platform.</p><h2>Troubleshooting</h2><p>Common issues and their solutions.</p>',
    excerpt:
      page?.excerpt ||
      'Access comprehensive documentation for all our services and APIs.',
    meta_title: page?.meta_title || 'Documentation | Magebase',
    meta_description:
      page?.meta_description ||
      'Access comprehensive documentation for all our services and APIs.',
  };

  const docCategories = [
    {
      title: 'Getting Started',
      description:
        'Quick start guides to help you get up and running with our platform',
      icon: BookOpen,
      href: '#getting-started',
    },
    {
      title: 'API Reference',
      description: 'Detailed API documentation with examples and code samples',
      icon: Code,
      href: '#api-reference',
    },
    {
      title: 'SDKs & Libraries',
      description:
        'Download our SDKs and libraries for popular programming languages',
      icon: Download,
      href: '#sdks-libraries',
    },
    {
      title: 'Best Practices',
      description: 'Learn best practices for integrating with our platform',
      icon: Lightbulb,
      href: '#best-practices',
    },
    {
      title: 'Troubleshooting',
      description: 'Common issues and their solutions',
      icon: AlertTriangle,
      href: '#troubleshooting',
    },
  ];

  return (
    <PageLayout
      user={user}
      title={pageData.meta_title}
      description={pageData.meta_description}
    >
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {pageData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {pageData.excerpt}
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search documentation..."
              className="pl-10 pr-4 py-3 w-full"
            />
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Documentation Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore our comprehensive documentation by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {docCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => {
                  const element = document.querySelector(category.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Additional Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => (window.location.href = '/resources/help-center')}
          >
            Visit Help Center
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
